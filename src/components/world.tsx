import { Sprite, type SpriteName } from "@/components/sprite";
import { cn } from "@/lib/utils";
import { MARKERS, UNDERGROUND_PX, ZONES, ZONE_PX, depthToPx } from "@/lib/depth";

export const SKY_PX = 640;
const RIG_X = "22%";

// Per-zone rock colors plus a tiny tiled pebble texture (an inline SVG).
const ZONE_STYLE: Record<string, { from: string; to: string; pebble: string }> = {
  topsoil: { from: "#5c3f28", to: "#47301f", pebble: "#7a5638" },
  clay: { from: "#8a4a2a", to: "#6a3520", pebble: "#a8603a" },
  bedrock: { from: "#4c5665", to: "#323945", pebble: "#66727f" },
  magma: { from: "#3d1510", to: "#260a07", pebble: "#7a2414" },
  drillion: { from: "#2b1b06", to: "#533a0a", pebble: "#8a6a1c" },
};

function pebbles(color: string) {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' shape-rendering='crispEdges'><g fill='${color}'><rect x='6' y='8' width='4' height='2'/><rect x='30' y='4' width='2' height='2'/><rect x='20' y='22' width='6' height='2'/><rect x='38' y='30' width='4' height='4'/><rect x='8' y='36' width='2' height='2'/><rect x='26' y='42' width='4' height='2'/></g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

// Hand-placed buried objects. Positions are fixed so the world looks the same every visit.
const BURIED: { sprite: SpriteName; m: number; x: string; scale?: number; flicker?: boolean }[] = [
  { sprite: "worm", m: 4, x: "64%" },
  { sprite: "worm", m: 25, x: "38%" },
  { sprite: "bone", m: 70, x: "80%" },
  { sprite: "worm", m: 110, x: "10%" },
  { sprite: "ammonite", m: 400, x: "70%", scale: 3 },
  { sprite: "bone", m: 700, x: "40%" },
  { sprite: "ammonite", m: 1100, x: "12%", scale: 3 },
  { sprite: "gem", m: 2000, x: "76%", scale: 3 },
  { sprite: "gem", m: 2700, x: "44%", scale: 2 },
  { sprite: "gem", m: 3600, x: "9%", scale: 3 },
  { sprite: "gem", m: 4500, x: "62%", scale: 2 },
  { sprite: "ember", m: 5600, x: "70%", scale: 3, flicker: true },
  { sprite: "ember", m: 6800, x: "35%", scale: 2, flicker: true },
  { sprite: "ember", m: 7900, x: "84%", scale: 3, flicker: true },
  { sprite: "ember", m: 8800, x: "12%", scale: 2, flicker: true },
  { sprite: "ember", m: 9500, x: "55%", scale: 3, flicker: true },
  { sprite: "ember", m: 10600, x: "78%", scale: 3, flicker: true },
  { sprite: "ember", m: 11400, x: "30%", scale: 3, flicker: true },
  { sprite: "ember", m: 12100, x: "66%", scale: 4, flicker: true },
];

type Props = {
  /** Where the drill bit is, in metres. */
  depth: number;
  /** "surface" frames the rig for the intro; "follow" tracks the bit. */
  camera: "surface" | "follow";
  drilling: boolean;
};

// The whole scene is one tall column that slides up as the drill goes down.
export function World({ depth, camera, drilling }: Props) {
  const bitPx = depthToPx(depth);
  const focus = camera === "surface" ? `calc(64vh - ${SKY_PX}px)` : `calc(40vh - ${SKY_PX + bitPx}px)`;

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#1a0f07]" aria-hidden>
      <div
        className="world-camera absolute inset-x-0 top-0"
        style={{ height: SKY_PX + UNDERGROUND_PX + 400, transform: `translateY(${focus})` }}
      >
        <Sky />

        {/* Underground */}
        <div className="absolute inset-x-0" style={{ top: SKY_PX, height: UNDERGROUND_PX + 400 }}>
          {ZONES.map((z, i) => {
            const st = ZONE_STYLE[z.tier];
            return (
              <div
                key={z.tier}
                className="absolute inset-x-0"
                style={{
                  top: i * ZONE_PX,
                  height: i === ZONES.length - 1 ? ZONE_PX + 400 : ZONE_PX,
                  backgroundImage: `${pebbles(st.pebble)}, linear-gradient(${st.from}, ${st.to})`,
                  backgroundSize: "48px 48px, 100% 100%",
                }}
              >
                {/* Jagged seam where one layer meets the next */}
                {i > 0 && <div className="zone-seam absolute inset-x-0 -top-2 h-4" style={{ color: st.from }} />}
                {z.tier === "magma" && <div className="magma-glow absolute inset-0" />}
                {z.tier === "drillion" && <div className="core-glow absolute inset-0" />}
              </div>
            );
          })}

          {/* Grass lip on the surface */}
          <div className="grass absolute inset-x-0 -top-3 h-5" />

          {MARKERS.map((mk) => (
            <div
              key={mk.m}
              className={cn(
                "absolute inset-x-0 flex items-center gap-3 px-4 sm:px-10",
                mk.side === "right" ? "flex-row-reverse text-right" : "",
              )}
              style={{ top: depthToPx(mk.m) }}
            >
              <span
                className={cn(
                  "font-pixel whitespace-nowrap",
                  mk.zone ? "text-sm tracking-[0.3em] text-[#f3e3c0]/80" : "text-[11px] text-[#f3e3c0]/45",
                )}
              >
                {mk.zone ? mk.text : `${mk.text}  ${mk.m.toLocaleString("en-US")}m`}
              </span>
              <span className="h-px flex-1 border-t border-dashed border-[#f3e3c0]/15" />
            </div>
          ))}

          {BURIED.map((b) => (
            <Sprite
              key={`${b.sprite}-${b.m}`}
              name={b.sprite}
              scale={b.scale ?? 3}
              className={cn("absolute", b.flicker && "animate-ember")}
              style={{ top: depthToPx(b.m), left: b.x }}
            />
          ))}

          {/* Drill string: pipe from the rig down to the bit */}
          <div className="absolute top-0" style={{ left: RIG_X, height: bitPx }}>
            <div className="drill-pipe absolute top-0 left-1/2 h-full w-2 -translate-x-1/2" />
            <div className="absolute left-1/2 -translate-x-1/2" style={{ top: bitPx }}>
              <div className={cn("relative", drilling && "animate-bit-judder")}>
                <Sprite name="bit" scale={3} className="-translate-y-1" />
                {drilling && <div className="bit-grit" />}
              </div>
            </div>
          </div>
        </div>

        {/* Rig sits on the surface line */}
        <div className="absolute -translate-x-1/2" style={{ left: RIG_X, top: SKY_PX - 26 * 5 + 8 }}>
          <Sprite name="rig" scale={5} />
        </div>
      </div>
    </div>
  );
}

function Sky() {
  return (
    <div className="sky absolute inset-x-0 top-0" style={{ height: SKY_PX }}>
      <Sprite name="cloud" scale={6} className="drift-slow absolute top-[12%] left-[6%] opacity-90" />
      <Sprite name="cloud" scale={4} className="drift-fast absolute top-[30%] left-[58%] opacity-80" />
      <Sprite name="cloud" scale={5} className="drift-slow absolute top-[6%] left-[78%] opacity-90" />
      <div className="hills absolute inset-x-0 bottom-0 h-24" />
    </div>
  );
}
