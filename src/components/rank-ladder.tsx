import { PixelIcon } from "@/components/pixel-icon";
import { TIER_TEXT } from "@/components/core-sample";
import { cn } from "@/lib/utils";
import { RANK_LINES, TIERS, rankIndex, type RankScale } from "@/lib/game";

type Props = { score: number; scale: RankScale; title: string };

// Every rank with its score range. The one you reached is lit and the rest are dimmed,
// and rows fade in top to bottom as if the drill is passing through them.
export function RankLadder({ score, scale, title }: Props) {
  const reached = rankIndex(score, scale);

  return (
    <section className="flex flex-col gap-2">
      <h2 className="font-wide text-lg font-bold">{title}</h2>
      <ol className="flex flex-col divide-y divide-border/70">
        {TIERS.map((t, i) => {
          const min = scale.mins[i];
          const next = scale.mins[i + 1];
          const range = next === undefined ? `${min}+` : `${min}–${next - 1}`;
          const active = i === reached;
          return (
            <li
              key={t.id}
              className={cn(
                "animate-ladder-in grid grid-cols-[28px_76px_minmax(0,1fr)] items-center gap-3 py-2.5",
                active ? "text-foreground" : "text-muted-foreground/60",
              )}
              style={{ animationDelay: `${300 + i * 160}ms` }}
              aria-current={active ? "step" : undefined}
            >
              <PixelIcon
                tier={t.id}
                size={22}
                className={cn(active ? "animate-rank-pop" : "opacity-50 grayscale-[60%]")}
              />
              <span className={cn("font-semibold tabular-nums", active ? TIER_TEXT[t.id] : "")}>{range}</span>
              <span className={cn("text-sm", active && "font-semibold")}>
                <span className="font-wide font-bold">{t.name}.</span> {RANK_LINES[t.id]}
              </span>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
