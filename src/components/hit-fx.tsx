import { PixelIcon } from "@/components/pixel-icon";
import { cn } from "@/lib/utils";
import { HIT_CALL, tierById, type TierId } from "@/lib/game";

export type FxEvent = {
  id: number;
  tier: TierId;
  particles: { dx: number; dy: number; size: number; delay: number }[];
};

// Deeper tiers throw more debris further. Built in the event handler (not during
// render) so render stays pure and each burst looks different.
const BURST: Record<TierId, { count: number; reach: number }> = {
  topsoil: { count: 6, reach: 36 },
  clay: { count: 10, reach: 52 },
  bedrock: { count: 14, reach: 70 },
  magma: { count: 22, reach: 100 },
  drillion: { count: 34, reach: 150 },
};

let nextId = 1;
export function makeFx(tier: TierId): FxEvent {
  const { count, reach } = BURST[tier];
  const particles = Array.from({ length: count }, () => {
    const angle = Math.random() * Math.PI * 2;
    const dist = reach * (0.45 + Math.random() * 0.55);
    return {
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist - reach * 0.25,
      size: 3 + Math.round(Math.random() * (tier === "drillion" ? 6 : 4)),
      delay: Math.round(Math.random() * 80),
    };
  });
  return { id: nextId++, tier, particles };
}

// Popups and debris, anchored over the answer box. Bedrock throws sparks
// (streaks), everything else throws square rock chips in its layer color.
export function HitFx({ events }: { events: FxEvent[] }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-visible" aria-hidden>
      {events.map((e) => {
        const tier = tierById(e.tier);
        return (
          <div key={e.id} className="absolute top-1/2 left-1/3">
            {e.particles.map((p, i) => (
              <span
                key={i}
                className={cn("fx-chip absolute", e.tier === "bedrock" && "fx-spark")}
                style={
                  {
                    "--dx": `${p.dx}px`,
                    "--dy": `${p.dy}px`,
                    width: p.size,
                    height: e.tier === "bedrock" ? 2 : p.size,
                    background: `var(--tier-${e.tier})`,
                    animationDelay: `${p.delay}ms`,
                  } as React.CSSProperties
                }
              />
            ))}
            <span
              className={cn(
                "fx-pop font-wide absolute flex -translate-x-1/2 items-center gap-1.5 font-black whitespace-nowrap drop-shadow-[0_2px_0_rgba(0,0,0,0.6)]",
                e.tier === "drillion" ? "text-3xl" : e.tier === "magma" ? "text-2xl" : "text-xl",
              )}
              style={{ color: `var(--tier-${e.tier})` }}
            >
              <PixelIcon tier={e.tier} size={e.tier === "drillion" ? 28 : 20} />+{tier.points} {HIT_CALL[e.tier]}
            </span>
          </div>
        );
      })}
    </div>
  );
}

// Full-screen moment for the rarest tier: a gold flash, radiating rays and the word itself.
export function DrillionFlash({ word }: { word: string }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center" aria-hidden>
      <div className="fx-flash absolute inset-0" />
      <div className="fx-rays absolute top-1/2 left-1/2 size-[140vmax]" />
      <div className="fx-banner relative flex flex-col items-center gap-2 text-center">
        <PixelIcon tier="drillion" size={64} />
        <span className="font-wide text-6xl font-black text-[#2a1f05] sm:text-8xl">Drillion!</span>
        <span className="font-wide rounded-md bg-[#2a1f05] px-3 py-1 text-xl font-bold text-tier-drillion capitalize">
          {word}
        </span>
      </div>
    </div>
  );
}
