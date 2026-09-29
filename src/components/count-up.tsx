"use client";

import { useEffect, useState } from "react";

// Ticks a number up from 0 with an ease-out, timed to land as the drill finishes descending.
export function CountUp({ to, duration = 1400 }: { to: number; duration?: number }) {
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const id = requestAnimationFrame(() => setShown(to));
      return () => cancelAnimationFrame(id);
    }
    const startAt = performance.now();
    let id = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - startAt) / duration);
      setShown(Math.round(to * (1 - Math.pow(1 - t, 3))));
      if (t < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [to, duration]);

  return <>{shown}</>;
}
