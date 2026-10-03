"use client";

import dynamic from "next/dynamic";
import type { DigMode } from "@/components/dive-game";

// The game reads saved progress from localStorage and picks dates in the player's
// own timezone, so it renders in the browser only. That avoids a hydration mismatch.
const DiveGame = dynamic(() => import("@/components/dive-game").then((m) => m.DiveGameEntry), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-dvh items-center justify-center">
      <p className="font-pixel animate-pulse text-xs tracking-[0.4em] text-[#f3e3c0]/60">Drilling…</p>
    </div>
  ),
});

export function DiveClient({ mode }: { mode: DigMode | { kind: "today" } }) {
  return <DiveGame key={JSON.stringify(mode)} mode={mode} />;
}
