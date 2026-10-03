import { TierSprite } from "@/components/sprite";
import { cn } from "@/lib/utils";
import { TIERS, METERS_PER_POINT, tierInfo, type Answer } from "@/lib/game";
import { formatMeters } from "@/lib/depth";

export const TIER_TEXT: Record<string, string> = {
  topsoil: "text-tier-topsoil",
  clay: "text-tier-clay",
  bedrock: "text-tier-bedrock",
  magma: "text-tier-magma",
  drillion: "text-tier-drillion",
  dud: "text-[#8d8a94]",
};

// The core-sample tag that pops up after each answer.
export function RevealCard({ answer, deeper }: { answer: Answer; deeper: string[] }) {
  const info = tierInfo(answer.tier);
  const shown = answer.canonical ?? answer.typed;

  return (
    <div className="sample-tag animate-tag-in relative w-full max-w-sm px-6 pt-6 pb-5 text-center">
      <div className="flex justify-center">
        <TierSprite tier={answer.tier} scale={5} className="animate-sprite-bob" />
      </div>
      <p className={cn("font-pixel mt-3 text-3xl tracking-[0.15em]", TIER_TEXT[answer.tier])}>{info.name}</p>
      {shown ? (
        <p className="mt-2 text-lg font-semibold text-[#2b2117] capitalize">&ldquo;{shown}&rdquo;</p>
      ) : (
        <p className="mt-2 text-lg font-semibold text-[#2b2117]">No answer in time</p>
      )}
      <p className="font-pixel mt-2 text-sm text-[#6b5a45]">
        <span className={TIER_TEXT[answer.tier]}>+{answer.points} pts</span>, down {formatMeters(answer.points * METERS_PER_POINT)}
      </p>
      <p className="mt-3 text-sm text-[#6b5a45] italic">{info.line}</p>
      {deeper.length > 0 && answer.tier !== "drillion" && (
        <p className="mt-4 border-t border-dashed border-[#bfae8c] pt-3 text-xs text-[#6b5a45]">
          Deeper picks: <span className="text-[#2b2117] capitalize">{deeper.join(", ")}</span>
        </p>
      )}
    </div>
  );
}

// Vertical legend down the side: every tier, with the one you just hit pointed at.
export function TierScale({ active }: { active: Answer["tier"] | null }) {
  return (
    <ol className="flex flex-col gap-3" aria-label="Tiers">
      {[...TIERS].map((t) => {
        const on = active === t.id;
        return (
          <li
            key={t.id}
            className={cn(
              "font-pixel flex items-center justify-end gap-2 text-[10px] tracking-[0.2em] transition-all duration-300",
              on ? cn("scale-125", TIER_TEXT[t.id]) : "text-[#f3e3c0]/40",
            )}
          >
            {on && <span className="animate-pointer">◀</span>}
            {t.name}
            <TierSprite tier={t.id} scale={1.6} className={on ? "" : "opacity-40 grayscale"} />
          </li>
        );
      })}
    </ol>
  );
}
