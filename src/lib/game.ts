import { PROMPTS, type Pack, type Prompt } from "./prompts";

export const ROUND_SECONDS = 60;
export const DAILY_ROUNDS = 5;

export type TierId = "topsoil" | "clay" | "bedrock" | "magma" | "drillion";

export type Tier = {
  id: TierId;
  name: string;
  points: number;
  depth: string;
  line: string;
};

// Shallowest first. `upTo` is the share of the ranked list that falls in this tier.
export const TIERS: (Tier & { upTo: number })[] = [
  { id: "topsoil", name: "Topsoil", points: 1, depth: "0 m", line: "The one everybody says first.", upTo: 0.15 },
  { id: "clay", name: "Clay", points: 2, depth: "40 m", line: "Solid. Most people get here.", upTo: 0.4 },
  { id: "bedrock", name: "Bedrock", points: 4, depth: "900 m", line: "Now you're drilling.", upTo: 0.65 },
  { id: "magma", name: "Magma", points: 7, depth: "35 km", line: "Hot. Very few reach this.", upTo: 0.87 },
  { id: "drillion", name: "Drillion", points: 12, depth: "6,371 km", line: "Straight through to the core.", upTo: 1 },
];

export const tierById = (id: TierId) => TIERS.find((t) => t.id === id)!;

export type Entry = {
  canonical: string;
  aliases: string[];
  rank: number;
  tier: TierId;
};

export type GuessResult =
  | { kind: "hit"; entry: Entry; typed: string }
  | { kind: "duplicate"; entry: Entry; typed: string }
  | { kind: "miss"; typed: string };

export function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "")
    .replace(/^the/, "");
}

// Parsed once per prompt and cached, since the answer strings are long.
const entryCache = new Map<string, Entry[]>();

export function entriesFor(prompt: Prompt): Entry[] {
  const cached = entryCache.get(prompt.id);
  if (cached) return cached;

  const seen = new Set<string>();
  const raw = prompt.answers
    .split(",")
    .map((a) => a.trim())
    .filter((a) => {
      const key = normalize(a.split("/")[0]);
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    });

  const entries = raw.map((a, i) => {
    const [canonical, ...rest] = a.split("/").map((s) => s.trim());
    const pct = (i + 1) / raw.length;
    const tier = TIERS.find((t) => pct <= t.upTo) ?? TIERS[TIERS.length - 1];
    return { canonical, aliases: [canonical, ...rest].map(normalize), rank: i, tier: tier.id };
  });

  entryCache.set(prompt.id, entries);
  return entries;
}

function editDistance(a: string, b: string, max: number): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let rowMin = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + cost);
      rowMin = Math.min(rowMin, cur[j]);
    }
    if (rowMin > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}

// Exact match first, then plurals, then small typos scaled by word length.
export function findEntry(entries: Entry[], typed: string): Entry | null {
  const n = normalize(typed);
  if (!n) return null;

  const variants = [n, n.replace(/es$/, ""), n.replace(/s$/, ""), n + "s"];
  for (const v of variants) {
    const hit = entries.find((e) => e.aliases.includes(v));
    if (hit) return hit;
  }

  const allowed = n.length >= 9 ? 2 : n.length >= 5 ? 1 : 0;
  if (allowed === 0) return null;

  let best: Entry | null = null;
  let bestDist = allowed + 1;
  for (const e of entries) {
    for (const alias of e.aliases) {
      const d = editDistance(n, alias, allowed);
      if (d < bestDist) {
        bestDist = d;
        best = e;
      }
    }
  }
  return best;
}

export function judge(entries: Entry[], typed: string, found: Set<string>): GuessResult {
  const entry = findEntry(entries, typed);
  if (!entry) return { kind: "miss", typed };
  if (found.has(entry.canonical)) return { kind: "duplicate", entry, typed };
  return { kind: "hit", entry, typed };
}

export function scoreOf(hits: Entry[]): number {
  return hits.reduce((sum, e) => sum + tierById(e.tier).points, 0);
}

// Small deterministic PRNG so every player gets the same daily prompts.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// Day 1 is the launch date, used for the "Dig #N" label.
const LAUNCH = new Date(2026, 8, 28);
export function digNumber(d = new Date()): number {
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor((start.getTime() - LAUNCH.getTime()) / 86_400_000) + 1;
}

export function dailyPrompts(key = todayKey()): Prompt[] {
  const rand = mulberry32(Number(key.replace(/-/g, "")));
  const pool = [...PROMPTS];
  const picked: Prompt[] = [];
  while (picked.length < DAILY_ROUNDS && pool.length) {
    picked.push(pool.splice(Math.floor(rand() * pool.length), 1)[0]);
  }
  return picked;
}

// Unlimited mode: random prompt, avoiding the ones played recently.
export function randomPrompt(pack: Pack | "all", recent: string[]): Prompt {
  const pool = PROMPTS.filter((p) => pack === "all" || p.pack === pack);
  const fresh = pool.filter((p) => !recent.includes(p.id));
  const from = fresh.length ? fresh : pool;
  return from[Math.floor(Math.random() * from.length)];
}

export function deepestHit(hits: Entry[]): Entry | null {
  return hits.reduce<Entry | null>((best, e) => (!best || e.rank > best.rank ? e : best), null);
}
