import { cn } from "@/lib/utils";
import { ANSWER_SECONDS } from "@/lib/game";

// Circular countdown. The ring drains clockwise; the number turns red in the last 7s.
export function TimerRing({ ms }: { ms: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const frac = ms / (ANSWER_SECONDS * 1000);
  const seconds = Math.ceil(ms / 1000);
  const urgent = seconds <= 7;

  return (
    <div className={cn("relative size-14 shrink-0", urgent && "animate-tick")} role="timer" aria-label={`${seconds} seconds left`}>
      <svg viewBox="0 0 48 48" className="size-full -rotate-90">
        <circle cx="24" cy="24" r={r} fill="#14100c" stroke="#3a3128" strokeWidth="4" />
        <circle
          cx="24"
          cy="24"
          r={r}
          fill="none"
          stroke={urgent ? "var(--tier-magma)" : "var(--tier-drillion)"}
          strokeWidth="4"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - frac)}
          style={{ transition: "stroke-dashoffset 100ms linear" }}
        />
      </svg>
      <span
        className={cn(
          "font-pixel absolute inset-0 flex items-center justify-center text-lg tabular-nums",
          urgent ? "text-tier-magma" : "text-[#f3e3c0]",
        )}
      >
        {seconds}
      </span>
    </div>
  );
}
