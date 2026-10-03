import type { TierId } from "./game";

// The underground is drawn as five equal-height zones even though their real
// depths differ wildly, so the topsoil isn't a sliver and the core isn't endless.
export const ZONE_PX = 900;
export const ZONES: { tier: TierId; from: number; to: number }[] = [
  { tier: "topsoil", from: 0, to: 150 },
  { tier: "clay", from: 150, to: 1500 },
  { tier: "bedrock", from: 1500, to: 5000 },
  { tier: "magma", from: 5000, to: 10000 },
  { tier: "drillion", from: 10000, to: 12600 },
];
export const UNDERGROUND_PX = ZONE_PX * ZONES.length;

/** Metres below the surface -> pixels below the surface line. */
export function depthToPx(m: number): number {
  const clamped = Math.max(0, Math.min(m, ZONES[ZONES.length - 1].to));
  const i = ZONES.findIndex((z) => clamped <= z.to);
  const z = ZONES[i];
  return i * ZONE_PX + ((clamped - z.from) / (z.to - z.from)) * ZONE_PX;
}

export function zoneAt(m: number): TierId {
  return (ZONES.find((z) => m < z.to) ?? ZONES[ZONES.length - 1]).tier;
}

// Signposts on the way down. Real figures, rounded.
export const MARKERS: { m: number; text: string; side: "left" | "right"; zone?: boolean }[] = [
  { m: 1, text: "grass roots give up", side: "right" },
  { m: 10, text: "where the earthworms stop", side: "left" },
  { m: 40, text: "tree roots rarely reach past here", side: "right" },
  { m: 150, text: "CLAY", side: "left", zone: true },
  { m: 300, text: "typical depth of a water well", side: "right" },
  { m: 830, text: "as deep as the Burj Khalifa is tall", side: "left" },
  { m: 1200, text: "floor of the biggest open-pit mine", side: "right" },
  { m: 1500, text: "BEDROCK", side: "left", zone: true },
  { m: 2200, text: "deepest cave anyone has explored", side: "right" },
  { m: 3000, text: "rock here is hot enough to boil water", side: "left" },
  { m: 4000, text: "deepest mine on earth, a gold mine", side: "right" },
  { m: 5000, text: "MAGMA", side: "left", zone: true },
  { m: 6000, text: "most oil wells never get this far", side: "right" },
  { m: 8000, text: "the drill pipe now weighs hundreds of tonnes", side: "left" },
  { m: 9100, text: "Germany's research borehole stopped here", side: "right" },
  { m: 10000, text: "DRILLION", side: "left", zone: true },
  { m: 11000, text: "rock flows like putty around the bit", side: "right" },
  { m: 12262, text: "deepest hole ever drilled, in 1989", side: "left" },
  { m: 12600, text: "past anything people have reached. a perfect dig ends here.", side: "right" },
];

export function formatMeters(m: number): string {
  return `${Math.round(m).toLocaleString("en-US")}m`;
}
