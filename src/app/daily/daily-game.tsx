"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon, ClipboardDocumentIcon, CheckIcon } from "@heroicons/react/24/solid";
import { Button, buttonVariants } from "@/components/ui/button";
import { Round, type RoundOutcome } from "@/components/round";
import { RoundSummary } from "@/components/round-summary";
import { CoreSample, TIER_TEXT } from "@/components/core-sample";
import { CountUp } from "@/components/count-up";
import { RankLadder } from "@/components/rank-ladder";
import { cn } from "@/lib/utils";
import {
  DAILY_RANKS,
  DAILY_ROUNDS,
  dailyPrompts,
  deepestHit,
  digNumber,
  entriesFor,
  scoreOf,
  scoreToDepth,
  tierById,
  todayKey,
  type Entry,
} from "@/lib/game";
import { loadDaily, saveDaily, type DailyRecord } from "@/lib/storage";

type Played = { hits: Entry[]; misses: number };

// Stored hits are just names; turn them back into full entries for scoring.
function revive(rec: DailyRecord, prompts: ReturnType<typeof dailyPrompts>): Played[] {
  return rec.rounds.map((r, i) => {
    const entries = entriesFor(prompts[i]);
    const hits = r.hits.map((name) => entries.find((e) => e.canonical === name)).filter((e) => e !== undefined);
    return { hits, misses: r.misses };
  });
}

// Share text uses one square per round, colored by the deepest tier reached.
const TIER_SQUARE: Record<string, string> = {
  topsoil: "🟫",
  clay: "🟧",
  bedrock: "⬜",
  magma: "🟥",
  drillion: "🟨",
};

export function DailyGame() {
  const [day] = useState(todayKey);
  const prompts = useMemo(() => dailyPrompts(day), [day]);
  // Safe to read storage here: this component only renders in the browser (see daily-client.tsx).
  const [played, setPlayed] = useState<Played[]>(() => {
    const rec = loadDaily(day);
    return rec ? revive(rec, prompts) : [];
  });
  const [viewing, setViewing] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const onFinish = useCallback(
    (outcome: RoundOutcome) => {
      const next = [...played, outcome];
      saveDaily(day, {
        rounds: next.map((p, i) => ({
          promptId: prompts[i].id,
          hits: p.hits.map((h) => h.canonical),
          misses: p.misses,
        })),
      });
      setPlayed(next);
      setViewing(next.length - 1);
    },
    [day, prompts, played],
  );

  const idx = played.length;
  const total = played.reduce((s, p) => s + scoreOf(p.hits), 0);

  // Just finished a round: show its summary before moving on.
  if (viewing !== null && viewing === idx - 1) {
    const p = played[viewing];
    const isLast = idx >= DAILY_ROUNDS;
    return (
      <RoundSummary prompt={prompts[viewing]} hits={p.hits} misses={p.misses}>
        <div>
          <Button
            size="lg"
            className="h-12 px-6 text-base font-bold"
            onClick={() => setViewing(isLast ? -1 : null)}
            autoFocus
          >
            {isLast ? "See today's results" : `Next prompt (${idx + 1} of ${DAILY_ROUNDS})`}
            <ArrowRightIcon className="size-5" aria-hidden />
          </Button>
        </div>
      </RoundSummary>
    );
  }

  if (idx < DAILY_ROUNDS) {
    return (
      <Round
        key={prompts[idx].id}
        prompt={prompts[idx]}
        label={`Dig #${digNumber()}, prompt ${idx + 1} of ${DAILY_ROUNDS}`}
        onFinish={onFinish}
      />
    );
  }

  const share = async () => {
    const squares = played.map((p) => {
      const d = deepestHit(p.hits);
      return d ? TIER_SQUARE[d.tier] : "⬛";
    });
    const text = `Drillion dig #${digNumber()}: ${total} points\n${squares.join("")}\n${location.origin}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("[drillion] clipboard write failed", err);
      window.prompt("Copy your result:", text);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10">
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">Dig #{digNumber()} is done. A new one opens at midnight.</p>
          <p className="font-wide text-7xl font-black tabular-nums">
            <CountUp to={total} duration={1600} />
            <span className="ml-3 text-xl font-semibold text-muted-foreground">points</span>
          </p>
        </div>

        <ol className="flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border">
          {played.map((p, i) => {
            const d = deepestHit(p.hits);
            return (
              <li
                key={prompts[i].id}
                className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 bg-card px-5 py-4"
              >
                <span className="font-semibold">{prompts[i].text}</span>
                <span className="flex items-baseline gap-4 text-sm">
                  {d && (
                    <span className={cn("font-semibold capitalize", TIER_TEXT[d.tier])}>
                      {d.canonical}, {tierById(d.tier).name}
                    </span>
                  )}
                  <span className="font-wide text-lg font-extrabold tabular-nums">{scoreOf(p.hits)}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap gap-3">
          <Button size="lg" className="h-12 px-6 text-base font-bold" onClick={share}>
            {copied ? (
              <CheckIcon className="size-5" aria-hidden />
            ) : (
              <ClipboardDocumentIcon className="size-5" aria-hidden />
            )}
            {copied ? "Copied" : "Copy result"}
          </Button>
          <Link
            href="/unlimited"
            className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-6 text-base font-bold")}
          >
            Keep drilling in unlimited
          </Link>
        </div>

        <RankLadder score={total} scale={DAILY_RANKS} title="Today's rank" />
      </div>
      <CoreSample
        hits={played.flatMap((p) => p.hits)}
        depth={scoreToDepth(total, DAILY_RANKS)}
        descend
        className="min-h-[420px] md:sticky md:top-6"
      />
    </div>
  );
}
