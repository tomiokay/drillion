import { CoreSample, TIER_TEXT } from "@/components/core-sample";
import { cn } from "@/lib/utils";
import { deepestHit, entriesFor, scoreOf, tierById, type Entry } from "@/lib/game";
import type { Prompt } from "@/lib/prompts";

type Props = {
  prompt: Prompt;
  hits: Entry[];
  misses: number;
  children?: React.ReactNode;
};

export function RoundSummary({ prompt, hits, misses, children }: Props) {
  const score = scoreOf(hits);
  const deepest = deepestHit(hits);
  const found = new Set(hits.map((h) => h.canonical));
  // Show the rarest answers the player didn't reach, deepest first.
  const missed = entriesFor(prompt)
    .filter((e) => !found.has(e.canonical))
    .slice(-8)
    .reverse();

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">{prompt.text}</p>
          <p className="font-wide text-6xl font-extrabold tabular-nums">
            {score}
            <span className="ml-2 text-lg font-semibold text-muted-foreground">points</span>
          </p>
          <p className="text-muted-foreground">
            {hits.length} {hits.length === 1 ? "answer" : "answers"}, {misses} {misses === 1 ? "miss" : "misses"}
          </p>
        </div>

        {deepest ? (
          <div className="border-l-4 border-current pl-4" style={{ color: `var(--tier-${deepest.tier})` }}>
            <p className="text-sm text-muted-foreground">Deepest answer</p>
            <p className="font-wide text-2xl font-extrabold capitalize">{deepest.canonical}</p>
            <p className="text-sm text-foreground">{tierById(deepest.tier).line}</p>
          </div>
        ) : (
          <p className="text-muted-foreground">No answers this round. Next time, type anything that fits and press Enter fast.</p>
        )}

        {missed.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="font-wide text-lg font-bold">Deep answers you missed</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {missed.map((e) => (
                <li key={e.canonical} className="capitalize">
                  <span className={cn("font-semibold", TIER_TEXT[e.tier])}>{e.canonical}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {children}
      </div>

      <CoreSample hits={hits} className="min-h-[420px]" />
    </div>
  );
}
