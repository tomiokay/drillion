"use client";

import dynamic from "next/dynamic";

// The game reads progress from localStorage, so it renders in the browser only.
// That avoids a server/client mismatch and a flash of the wrong state.
export const DailyClient = dynamic(() => import("./daily-game").then((m) => m.DailyGame), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">Loading today&apos;s dig…</p>,
});
