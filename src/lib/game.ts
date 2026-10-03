import { PROMPTS, type Pack, type Prompt } from "./prompts";

// A dig is 7 prompts. Each prompt takes exactly one answer, against a 25 second clock.
export const PROMPTS_PER_DIG = 7;
export const ANSWER_SECONDS = 25;

// Every point drills this many metres. A perfect dig (7 x 120) reaches 12,600 m,
// just past the deepest hole people have ever drilled.
export const METERS_PER_POINT = 15;

export type TierId = "topsoil" | "clay" | "bedrock" | "magma" | "drillion";
export type ResultTier = TierId | "dud";

export type Tier = {
  id: TierId;
  name: string;
  points: number;
  line: string;
  /** Share of the ranked answer list that falls in this tier (cumulative). */
  upTo: number;
};

// Shallowest first.
export const TIERS: Tier[] = [
  { id: "topsoil", name: "Topsoil", points: 10, line: "Everyone digs here first.", upTo: 0.15 },
  { id: "clay", name: "Clay", points: 25, line: "Past the roots. Plenty of company.", upTo: 0.4 },
  { id: "bedrock", name: "Bedrock", points: 50, line: "Hard rock. The crowd thins out.", upTo: 0.65 },
  { id: "magma", name: "Magma", points: 80, line: "Hot enough to melt the bit. Few get here.", upTo: 0.87 },
  { id: "drillion", name: "Drillion", points: 120, line: "One in a drillion. Nobody saw that coming.", upTo: 1 },
];

export const DUD = { id: "dud" as const, name: "Stalled", points: 0, line: "The bit spun in place. No depth gained." };

export const tierById = (id: TierId) => TIERS.find((t) => t.id === id)!;
export const tierInfo = (id: ResultTier) => (id === "dud" ? DUD : tierById(id));

// Ranks for a whole dig, by total score. The names match the layers.
export const RANK_MINS = [0, 150, 300, 450, 630];
export const RANK_LINES: Record<TierId, string> = {
  topsoil: "A scratch in the dirt. The worms barely noticed.",
  clay: "A tidy hole. The rig is warming up.",
  bedrock: "Through solid rock. Sparks off the bit.",
  magma: "The casing glows. The crew is getting nervous.",
  drillion: "Clean through the crust. They'll name the hole after you.",
};

export function rankFor(score: number): TierId {
  let i = 0;
  RANK_MINS.forEach((min, idx) => {
    if (score >= min) i = idx;
  });
  return TIERS[i].id;
}

export type Entry = {
  canonical: string;
  aliases: string[];
  rank: number;
  tier: TierId;
};

export type Answer = {
  promptId: string;
  typed: string;
  /** Canonical answer that matched, or null if the clock ran out. */
  canonical: string | null;
  tier: ResultTier;
  points: number;
};

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

export function answerFrom(prompt: Prompt, entry: Entry | null, typed: string): Answer {
  if (!entry) return { promptId: prompt.id, typed, canonical: null, tier: "dud", points: 0 };
  return { promptId: prompt.id, typed, canonical: entry.canonical, tier: entry.tier, points: tierById(entry.tier).points };
}

export const totalOf = (answers: Answer[]) => answers.reduce((s, a) => s + a.points, 0);
export const metersOf = (score: number) => score * METERS_PER_POINT;

// Small deterministic PRNG so every player gets the same prompts for a given seed.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick(pool: Prompt[], count: number, rand: () => number): Prompt[] {
  const left = [...pool];
  const out: Prompt[] = [];
  while (out.length < count && left.length) out.push(left.splice(Math.floor(rand() * left.length), 1)[0]);
  return out;
}

// Dig #1 is launch day. Uses local midnight so the dig flips at the player's midnight.
const LAUNCH = new Date(2026, 8, 28);
export function todaysDig(d = new Date()): number {
  const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.round((start.getTime() - LAUNCH.getTime()) / 86_400_000) + 1;
}

export function digDate(dig: number): Date {
  return new Date(LAUNCH.getFullYear(), LAUNCH.getMonth(), LAUNCH.getDate() + dig - 1);
}

export function dailyPrompts(dig: number): Prompt[] {
  return pick(PROMPTS, PROMPTS_PER_DIG, mulberry32(dig * 7919));
}

export const CHAPTERS_PER_PACK = 12;

export function packPrompts(pack: Pack, chapter: number): Prompt[] {
  const pool = PROMPTS.filter((p) => p.pack === pack);
  const salt = [...pack].reduce((h, c) => h * 31 + c.charCodeAt(0), 7);
  return pick(pool, PROMPTS_PER_DIG, mulberry32(salt + chapter * 104729));
}

// Unlimited: 7 random prompts, avoiding the ones seen most recently.
export function unlimitedPrompts(recent: string[]): Prompt[] {
  const fresh = PROMPTS.filter((p) => !recent.includes(p.id));
  const pool = fresh.length >= PROMPTS_PER_DIG ? fresh : PROMPTS;
  return pick(pool, PROMPTS_PER_DIG, Math.random);
}

// The rarer answers the player could have given, for the reveal card.
export function deeperPicks(prompt: Prompt, than: TierId | "dud", count = 3): string[] {
  const order = TIERS.map((t) => t.id);
  const floor = than === "dud" ? -1 : order.indexOf(than);
  return entriesFor(prompt)
    .filter((e) => order.indexOf(e.tier) > floor)
    .slice(-count * 3)
    .filter((_, i, arr) => i % Math.max(1, Math.floor(arr.length / count)) === 0)
    .slice(0, count)
    .map((e) => e.canonical);
}
