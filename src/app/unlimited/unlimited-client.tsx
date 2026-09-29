"use client";

import dynamic from "next/dynamic";

// Random prompt plus localStorage stats: browser-only to avoid hydration mismatches.
export const UnlimitedClient = dynamic(() => import("./unlimited-game").then((m) => m.UnlimitedGame), {
  ssr: false,
  loading: () => <p className="text-muted-foreground">Finding a prompt…</p>,
});
