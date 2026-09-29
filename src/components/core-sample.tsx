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
  /** 0 = surface, 5 = core. See scoreToDepth. */
  depth?: number;
  /** Bit spins while the round is live. */
  spinning?: boolean;
  /** Play the drill descending from the surface on mount (results screens). */
  descend?: boolean;
  className?: string;
};

// The signature element: a vertical core sample with a borehole down its left side.
// Answers land in the rock layer matching their rarity, and the drill bit sinks as
// your score climbs. The drill is drawn per layer: layers above the bit get a full
// pipe, the current layer gets a partial pipe plus the bit, so it stays exact even
// when layers stretch to fit their chips.
export function CoreSample({ hits, latest, depth = 0, spinning = false, descend = false, className }: Props) {
  const current = Math.min(4, Math.floor(depth));

  return (
    <div
      className={cn("flex flex-col overflow-hidden rounded-xl border border-border", className)}
      aria-label="Core sample of your answers by depth"
    >
      {TIERS.map((tier, i) => {
        const inTier = hits.filter((h) => h.tier === tier.id);
        const fill = Math.max(0, Math.min(1, depth - i));
        const reached = i <= current && depth > 0;
        const delay = `${i * 280}ms`;
        return (
          <section
            key={tier.id}
            className={cn(
              "relative flex min-h-16 flex-[1_1_0] flex-col gap-2 py-2.5 pr-3 pl-12 transition-[filter] duration-500",
              i > 0 && "border-t border-black/25",
              TIER_BG[tier.id],
              CHIP_TEXT[tier.id],
            )}
            style={{ filter: inTier.length || reached ? undefined : "saturate(0.35) brightness(0.55)" }}
          >
            {/* Borehole channel */}
            <div className="absolute inset-y-0 left-0 w-9 bg-black/30 shadow-[inset_-2px_0_0_rgba(0,0,0,0.25)]" aria-hidden>
              <div
                className={cn(
                  "absolute top-0 left-1/2 w-1.5 -translate-x-1/2 bg-[linear-gradient(90deg,#8b8680,#e9e4dc,#8b8680)] transition-[height] duration-500 ease-out",
                  descend && "animate-pipe-grow",
                )}
                style={{ height: `${fill * 100}%`, animationDelay: descend ? delay : undefined }}
              >
                {i === current && (
                  <DrillBit
                    spinning={spinning}
                    className={cn(descend && "animate-bit-arrive")}
                    style={{ animationDelay: descend ? delay : undefined }}
                  />
                )}
              </div>
            </div>

            <header className="flex items-baseline justify-between gap-2">
              <h3 className="font-wide text-sm font-extrabold">{tier.name}</h3>
              <span className="text-xs font-medium tabular-nums opacity-70">
                {tier.depth}, +{tier.points}
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

// A tapered auger bit. Moving diagonal stripes fake the rotation.
function DrillBit({ spinning, className, style }: { spinning: boolean; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={cn("absolute top-full left-1/2 -translate-x-1/2", className)} style={style}>
      <div className="h-1.5 w-5 rounded-sm bg-[#5b5650]" />
      <div
        className={cn("drill-auger h-7 w-5", spinning && "drill-auger-spin")}
        style={{ clipPath: "polygon(0 0, 100% 0, 60% 100%, 40% 100%)" }}
      />
      {spinning && <div className="drill-dust" />}
    </div>
  );
}
