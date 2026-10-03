import type { ResultTier } from "@/lib/game";

// All art in Drillion is drawn here as character grids: one character per pixel,
// "." for transparent. Rendered as crisp SVG rects so it scales without blurring.
const PALETTE: Record<string, string> = {
  // greens and soil
  G: "#7fb35a",
  g: "#4f7d3a",
  B: "#8a6644",
  b: "#5e4430",
  // clay
  C: "#cf7042",
  c: "#9c4f2a",
  // rock and crystal
  W: "#dfe6ee",
  S: "#8fa3b8",
  s: "#c9d6e3",
  // heat
  R: "#c7321a",
  O: "#ee6a2f",
  Y: "#f6c945",
  w: "#fff6d6",
  // metal and rig
  K: "#1c1a22",
  k: "#3a3742",
  M: "#8d8a94",
  m: "#cfcbd4",
  F: "#e8492b", // flag
  // misc
  P: "#e7a7b8", // worm
  p: "#c47c90",
  E: "#efe3c8", // bone
  e: "#bfae8c",
  X: "#5b5650",
  V: "#7a7a7a",
};

export type SpriteName = keyof typeof SPRITES;

export const SPRITES = {
  // ----- tier badges (10x10) -----
  topsoil: ["....GG....", "...GGGG.G.", "....GG.GG.", ".....GGG..", ".....G....", ".....G....", "..BBBBBB..", ".BBbBBbBB.", "BBBBBBBBBB", ".BBbBBBBb."],
  clay: ["..........", ".CCCCCCCC.", "..CccccC..", ".CCCCCCCC.", "CCCCCCCCCC", "CCccCCCCCC", "CCCCCCccCC", "CCCCCCCCCC", ".CCCCCCCC.", "..CCCCCC.."],
  bedrock: ["....WW....", "...WSSW...", "..WSsSSW..", ".WSSsSSSW.", ".WSSsSSSW.", ".WSSsSSSW.", "..WSSSSW..", "...WSSW...", "....WW....", ".........."],
  magma: ["....R.....", "...RR.....", "...RRR..R.", "..RRORR.R.", "..ROOORRR.", ".RROOYORR.", ".ROOYYOOR.", ".ROYYYYOR.", "..ROYYOR..", "...RRRR..."],
  drillion: ["....Y.....", ".Y..Y..Y..", "..Y.Y.Y...", "...YwY....", "YYYwwwYYY.", "...YwY....", "..Y.Y.Y...", ".Y..Y..Y..", "....Y.....", ".........."],
  dud: ["..........", "...XXXX...", "..X....X..", ".X.X..X.X.", ".X..XX..X.", ".X..XX..X.", ".X.X..X.X.", "..X....X..", "...XXXX...", ".........."],

  // ----- the rig: a small lattice derrick on a skid, with a pennant (20x26) -----
  rig: [
    ".........F..........",
    ".........FFF........",
    ".........FFFFF......",
    ".........F..........",
    ".........K..........",
    "........KKK.........",
    "........K.K.........",
    ".......K.k.K........",
    ".......KkKkK........",
    ".......K.k.K........",
    "......K.k.k.K.......",
    "......KkKkKkK.......",
    "......K.k.k.K.......",
    ".....K.k.k.k.K......",
    ".....KkKkKkKkK......",
    ".....K.k.k.k.K......",
    "....K.k.k.k.k.K.....",
    "....KkKkKkKkKkK.....",
    "....K.k.k.k.k.K.....",
    "...K.k.k.k.k.k.K....",
    "...KKKKKKKKKKKKK.MMM",
    "..KkkkkkkkkkkkkkKMmM",
    "..KkMMkMMkMMkMMkKMMM",
    "..KkkkkkkkkkkkkkKK..",
    "..KKKKKKKKKKKKKKKK..",
    "...KK..........KK...",
  ],

  // ----- drill bit, pointing down (8x12) -----
  bit: ["..XXXX..", ".XmmmmX.", ".XMMMMX.", "XmMmMmMX", "XMmMmMmX", ".XmMmMX.", ".XMmMmX.", "..XmMX..", "..XMmX..", "...XX...", "...XX...", "....X..."],

  // ----- sky -----
  cloud: [
    "......wwww..............",
    "....wwwwwwww....www.....",
    "...wwwwwwwwwww.wwwwww...",
    ".wwwwwwwwwwwwwwwwwwwwww.",
    "wwwwwwwwwwwwwwwwwwwwwwww",
    ".mmmmmmmmmmmmmmmmmmmmmm.",
  ],

  // ----- buried things -----
  worm: ["..PPP...", ".P...P..", ".....P..", "....P...", "...P....", "..P.....", "..PP....", "...pPP.."],
  bone: ["EE......EE", "EEE....EEE", ".EEEEEEEE.", ".eEEEEEEe.", "EEE....EEE", "EE......EE"],
  ammonite: ["..eeee..", ".eEEEEe.", "eEeeeeEe", "eEeEEeEe", "eEeEeeEe", "eEeeeEEe", ".eEEEEe.", "..eeee.."],
  gem: ["..WWW..", ".WsSsW.", "WsSSSsW", ".WSSSW.", "..WSW..", "...W..."],
  ember: ["..O..", ".OYO.", "OYwYO", ".OYO.", "..O.."],
} satisfies Record<string, string[]>;

type Props = {
  name: SpriteName;
  /** Size of one pixel in CSS px. */
  scale?: number;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
};

export function Sprite({ name, scale = 2, className, style, title }: Props) {
  const rows = SPRITES[name];
  const w = Math.max(...rows.map((r) => r.length));
  const h = rows.length;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={w * scale}
      height={h * scale}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "." || !PALETTE[ch] ? null : (
            <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[ch]} />
          ),
        ),
      )}
    </svg>
  );
}

export function TierSprite({ tier, scale = 2, className }: { tier: ResultTier; scale?: number; className?: string }) {
  return <Sprite name={tier} scale={scale} className={className} />;
}
