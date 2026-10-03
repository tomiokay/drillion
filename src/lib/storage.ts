import type { Answer } from "./game";

// localStorage can throw (private mode, blocked storage), so every access is
// guarded. Failures are logged and the game keeps working without persistence.

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (err) {
    console.warn(`[drillion] could not read ${key}`, err);
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[drillion] could not save ${key}`, err);
  }
}

// One record per dig. Saved after every answer, so reloading mid-dig picks up
// at the next prompt instead of offering a second try.
export type DigRecord = { answers: Answer[] };

export const digKey = {
  daily: (dig: number) => `drillion:dig:${dig}`,
  pack: (pack: string, chapter: number) => `drillion:pack:${pack}:${chapter}`,
};

export const loadDig = (key: string) => read<DigRecord | null>(key, null);
export const saveDig = (key: string, rec: DigRecord) => write(key, rec);

// Daily streak: consecutive digs finished on the day they aired.
export type Streak = { current: number; best: number; lastDig: number };
export const loadStreak = () => read<Streak>("drillion:streak", { current: 0, best: 0, lastDig: 0 });

export function recordDailyFinish(dig: number): Streak {
  const s = loadStreak();
  if (s.lastDig === dig) return s;
  const current = s.lastDig === dig - 1 ? s.current + 1 : 1;
  const next = { current, best: Math.max(s.best, current), lastDig: dig };
  write("drillion:streak", next);
  return next;
}

/** A streak only counts if yesterday's (or today's) dig was finished. */
export function liveStreak(today: number): number {
  const s = loadStreak();
  return s.lastDig >= today - 1 ? s.current : 0;
}

export type UnlimitedStats = { digs: number; best: number; drillions: number };
export const loadUnlimited = () => read<UnlimitedStats>("drillion:unlimited", { digs: 0, best: 0, drillions: 0 });
export const saveUnlimited = (s: UnlimitedStats) => write("drillion:unlimited", s);

export const loadRecent = () => read<string[]>("drillion:recent", []);
export const saveRecent = (ids: string[]) => write("drillion:recent", ids.slice(-28));
