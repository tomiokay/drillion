import type { TierId } from "@/lib/game";

// Hand-drawn 10x10 sprites, one per layer. Each character is a pixel; "." is empty.
const PALETTE: Record<string, string> = {
  G: "#7fb35a", // leaf
  B: "#8a6644", // soil
  b: "#5e4430",
  C: "#cf7042", // clay
  c: "#9c4f2a",
  W: "#dfe6ee", // crystal edge
  S: "#8fa3b8", // crystal face
  s: "#c9d6e3",
  R: "#c7321a", // flame
  O: "#ee6a2f",
  Y: "#f6c945", // gold
  w: "#fff6d6",
};

const SPRITES: Record<TierId, string[]> = {
  topsoil: [
    "....GG....",
    "...GGGG.G.",
    "....GG.GG.",
    ".....GGG..",
    ".....G....",
    ".....G....",
    "..BBBBBB..",
    ".BBbBBbBB.",
    "BBBBBBBBBB",
    ".BBbBBBBb.",
  ],
  clay: [
    "..........",
    ".CCCCCCCC.",
    "..CccccC..",
    ".CCCCCCCC.",
    "CCCCCCCCCC",
    "CCccCCCCCC",
    "CCCCCCccCC",
    "CCCCCCCCCC",
    ".CCCCCCCC.",
    "..CCCCCC..",
  ],
  bedrock: [
    "....WW....",
    "...WSSW...",
    "..WSsSSW..",
    ".WSSsSSSW.",
    ".WSSsSSSW.",
    ".WSSsSSSW.",
    "..WSSSSW..",
    "...WSSW...",
    "....WW....",
    "..........",
  ],
  magma: [
    "....R.....",
    "...RR.....",
    "...RRR..R.",
    "..RRORR.R.",
    "..ROOORRR.",
    ".RROOYORR.",
    ".ROOYYOOR.",
    ".ROYYYYOR.",
    "..ROYYOR..",
    "...RRRR...",
  ],
  drillion: [
    "....Y.....",
    ".Y..Y..Y..",
    "..Y.Y.Y...",
    "...YwY....",
    "YYYwwwYYY.",
    "...YwY....",
    "..Y.Y.Y...",
    ".Y..Y..Y..",
    "....Y.....",
    "..........",
  ],
};

export function PixelIcon({ tier, size = 20, className }: { tier: TierId; size?: number; className?: string }) {
  const rows = SPRITES[tier];
  return (
    <svg
      viewBox="0 0 10 10"
      width={size}
      height={size}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      {rows.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={PALETTE[ch]} />,
        ),
      )}
    </svg>
  );
}
