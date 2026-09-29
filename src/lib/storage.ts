// localStorage can throw (private mode, blocked storage), so every access is
// guarded. Failures are logged and the game keeps working without persistence.

export type DailyRecord = {
  rounds: { promptId: string; hits: string[]; misses: number }[];
};

export type Stats = {
  unlimitedRounds: number;
  bestRound: number;
  drillions: number;
};

const EMPTY_STATS: Stats = { unlimitedRounds: 0, bestRound: 0, drillions: 0 };

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

export const loadDaily = (day: string) => read<DailyRecord | null>(`drillion:daily:${day}`, null);
export const saveDaily = (day: string, rec: DailyRecord) => write(`drillion:daily:${day}`, rec);

export const loadStats = () => ({ ...EMPTY_STATS, ...read<Partial<Stats>>("drillion:stats", {}) });
export const saveStats = (s: Stats) => write("drillion:stats", s);

export const loadRecent = () => read<string[]>("drillion:recent", []);
export const saveRecent = (ids: string[]) => write("drillion:recent", ids.slice(-15));
