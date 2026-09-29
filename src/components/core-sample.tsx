import { cn } from "@/lib/utils";
import { TIERS, type Entry, type TierId } from "@/lib/game";

// Band background per tier. Kept as full class strings so Tailwind can see them.
export const TIER_BG: Record<TierId, string> = {
  topsoil: "bg-tier-topsoil",
  clay: "bg-tier-clay",
  bedrock: "bg-tier-bedrock",
  magma: "bg-tier-magma",
  drillion: "bg-tier-drillion",
};

export const TIER_TEXT: Record<TierId, string> = {
  topsoil: "text-tier-topsoil",
  clay: "text-tier-clay",
  bedrock: "text-tier-bedrock",
  magma: "text-tier-magma",
  drillion: "text-tier-drillion",
};

// Dark text reads better on the lighter bands, light text on the darker ones.
const CHIP_TEXT: Record<TierId, string> = {
  topsoil: "text-[#1d140c]",
  clay: "text-[#200d04]",
  bedrock: "text-[#10151c]",
  magma: "text-[#1f0600]",
  drillion: "text-[#2a1f05]",
};

type Props = {
  hits: Entry[];
  latest?: string | null;
  className?: string;
};

// The signature element: a vertical core sample. Each answer lands in the rock
// layer that matches its rarity, so the deeper the sample fills, the better the run.
export function CoreSample({ hits, latest, className }: Props) {
  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-xl border border-border", className)}
      aria-label="Core sample of your answers by depth"
    >
      {TIERS.map((tier, i) => {
        const inTier = hits.filter((h) => h.tier === tier.id);
        return (
          <section
            key={tier.id}
            className={cn(
              "relative flex min-h-16 flex-1 flex-col gap-2 px-3 py-2.5",
              i > 0 && "border-t border-black/25",
              TIER_BG[tier.id],
              CHIP_TEXT[tier.id],
            )}
            style={{ filter: inTier.length ? undefined : "saturate(0.35) brightness(0.55)" }}
          >
            <header className="flex items-baseline justify-between gap-2">
              <h3 className="font-wide text-sm font-extrabold">{tier.name}</h3>
              <span className="text-xs font-medium tabular-nums opacity-70">
                {tier.depth} · +{tier.points}
              </span>
            </header>
            {inTier.length > 0 && (
              <ul className="flex flex-wrap gap-1.5">
                {inTier.map((h) => (
                  <li
                    key={h.canonical}
                    className={cn(
                      "rounded-md bg-black/15 px-2 py-0.5 text-sm font-semibold capitalize",
                      latest === h.canonical && "animate-drop-in",
                    )}
                  >
                    {h.canonical}
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}
    </div>
  );
}
