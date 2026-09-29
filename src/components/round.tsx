"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoreSample, TIER_TEXT } from "@/components/core-sample";
import { DrillionFlash, HitFx, makeFx, type FxEvent } from "@/components/hit-fx";
import { cn } from "@/lib/utils";
import {
  ANSWER_SECONDS,
  ROUND_RANKS,
  entriesFor,
  judge,
  scoreOf,
  scoreToDepth,
  tierById,
  type Entry,
  type GuessResult,
} from "@/lib/game";
import type { Prompt } from "@/lib/prompts";

export type RoundOutcome = { hits: Entry[]; misses: number };

type Props = {
  prompt: Prompt;
  label: string;
  onFinish: (outcome: RoundOutcome) => void;
};

export function Round({ prompt, label, onFinish }: Props) {
  const entries = useMemo(() => entriesFor(prompt), [prompt]);
  const [phase, setPhase] = useState<"ready" | "playing">("ready");
  const [value, setValue] = useState("");
  const [hits, setHits] = useState<Entry[]>([]);
  const [misses, setMisses] = useState(0);
  const [last, setLast] = useState<GuessResult | null>(null);
  const [remaining, setRemaining] = useState(ANSWER_SECONDS * 1000);
  const [fx, setFx] = useState<FxEvent[]>([]);
  const [flash, setFlash] = useState<{ id: number; word: string } | null>(null);
  const [refills, setRefills] = useState(0);
  const endAt = useRef(0);
  const finished = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Refs mirror state so the timer callback always sees the latest values.
  const hitsRef = useRef(hits);
  const missesRef = useRef(misses);
  useEffect(() => {
    hitsRef.current = hits;
    missesRef.current = misses;
  }, [hits, misses]);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    onFinish({ hits: hitsRef.current, misses: missesRef.current });
  }, [onFinish]);

  const resetClock = () => {
    endAt.current = Date.now() + ANSWER_SECONDS * 1000;
    setRemaining(ANSWER_SECONDS * 1000);
  };

  const start = () => {
    resetClock();
    setPhase("playing");
  };

  // Countdown runs off an end timestamp, so a throttled background tab stays accurate.
  // A correct answer just moves the timestamp forward.
  useEffect(() => {
    if (phase !== "playing") return;
    inputRef.current?.focus();
    const id = setInterval(() => {
      const left = Math.max(0, endAt.current - Date.now());
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        finish();
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, finish]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const typed = value.trim();
    if (!typed || phase !== "playing" || finished.current) return;
    const found = new Set(hits.map((h) => h.canonical));
    const result = judge(entries, typed, found);
    setLast(result);
    setValue("");

    if (result.kind === "miss") {
      setMisses((m) => m + 1);
      return;
    }
    if (result.kind !== "hit") return;

    const tier = result.entry.tier;
    setHits((h) => [...h, result.entry]);
    resetClock();
    setRefills((r) => r + 1);

    // Effects clean themselves up once their animation has played out.
    const event = makeFx(tier);
    setFx((list) => [...list, event]);
    setTimeout(() => setFx((list) => list.filter((f) => f.id !== event.id)), 1200);

    if (tier === "magma" || tier === "drillion") shakeBoard(tier === "drillion");
    if (tier === "drillion") {
      setFlash({ id: event.id, word: result.entry.canonical });
      setTimeout(() => setFlash((f) => (f?.id === event.id ? null : f)), 1500);
    }
  };

  // Restart the CSS animation on the live node. Remounting via key would drop input focus.
  const shakeBoard = (big: boolean) => {
    const el = boardRef.current;
    if (!el) return;
    el.classList.remove("animate-shake", "animate-shake-big");
    void el.offsetWidth; // force reflow so the animation restarts
    el.classList.add(big ? "animate-shake-big" : "animate-shake");
  };

  const score = scoreOf(hits);
  const depth = scoreToDepth(score, ROUND_RANKS);
  const seconds = Math.ceil(remaining / 1000);
  const urgent = phase === "playing" && seconds <= 7;

  return (
    <div ref={boardRef} className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10">
      {flash && <DrillionFlash key={flash.id} word={flash.word} />}

      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{label}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-semibold tabular-nums",
              urgent ? "animate-pulse text-tier-magma" : "text-foreground",
            )}
          >
            <ClockIcon className="size-4" aria-hidden />
            0:{String(seconds).padStart(2, "0")}
          </span>
        </div>

        {/* Drains over 25s and snaps back full on every correct answer. */}
        <div key={refills} className={cn("h-1.5 overflow-hidden rounded-full bg-muted", refills > 0 && "animate-refill")} aria-hidden>
          <div
            className={cn("h-full ease-linear", urgent ? "bg-tier-magma" : "bg-tier-drillion")}
            style={{ width: `${(remaining / (ANSWER_SECONDS * 1000)) * 100}%`, transition: "width 100ms linear" }}
          />
        </div>

        {phase === "ready" ? (
          <div className="flex flex-col items-start gap-6 py-6">
            <p className="max-w-md text-lg text-muted-foreground">
              You get {ANSWER_SECONDS} seconds to land an answer. Every correct one refills the clock, so keep them
              coming. The ones fewer people think of drill deeper and score more.
            </p>
            <Button size="lg" className="h-12 px-6 text-base font-bold" onClick={start} autoFocus>
              <ArrowDownIcon className="size-5" aria-hidden />
              Start drilling
            </Button>
          </div>
        ) : (
          <>
            <h1 className="font-wide text-3xl leading-tight font-extrabold text-balance sm:text-4xl">{prompt.text}</h1>

            <form onSubmit={submit} className="relative flex gap-2">
              <HitFx events={fx} />
              <Input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Type an answer, press Enter"
                aria-label={`Answer for: ${prompt.text}`}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                enterKeyHint="send"
                className={cn("h-14 flex-1 px-4 text-lg md:text-lg", last?.kind === "miss" && "animate-nudge")}
                key={last?.kind === "miss" ? `m${misses}` : "input"}
                autoFocus
              />
              <Button type="submit" size="lg" className="h-14 px-5 text-base font-bold">
                Drill
              </Button>
            </form>

            <Feedback last={last} />

            <dl className="flex gap-8 text-sm">
              <div>
                <dt className="text-muted-foreground">Score</dt>
                <dd key={score} className="font-wide animate-drop-in text-2xl font-extrabold tabular-nums">
                  {score}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Answers</dt>
                <dd className="font-wide text-2xl font-extrabold tabular-nums">{hits.length}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Misses</dt>
                <dd className="font-wide text-2xl font-extrabold tabular-nums">{misses}</dd>
              </div>
            </dl>

            <div>
              <Button variant="ghost" size="sm" onClick={finish} className="text-muted-foreground">
                End round early
              </Button>
            </div>
          </>
        )}
      </div>

      <CoreSample
        hits={hits}
        latest={last?.kind === "hit" ? last.entry.canonical : null}
        depth={depth}
        spinning={phase === "playing"}
        className="min-h-[420px]"
      />
    </div>
  );
}

function Feedback({ last }: { last: GuessResult | null }) {
  let content: React.ReactNode = (
    <span className="text-muted-foreground">Misspellings close enough to count are accepted.</span>
  );

  if (last?.kind === "hit") {
    const tier = tierById(last.entry.tier);
    content = (
      <span>
        <span className="capitalize">{last.entry.canonical}</span>{" "}
        <span className={cn("font-bold", TIER_TEXT[tier.id])}>
          hit {tier.name}, +{tier.points}
        </span>
      </span>
    );
  } else if (last?.kind === "duplicate") {
    content = (
      <span className="text-muted-foreground">
        You already drilled <span className="text-foreground capitalize">{last.entry.canonical}</span>.
      </span>
    );
  } else if (last?.kind === "miss") {
    content = (
      <span className="text-muted-foreground">
        <span className="text-foreground">&ldquo;{last.typed}&rdquo;</span> isn&apos;t on the answer sheet.
      </span>
    );
  }

  return (
    <p className="min-h-6 text-base" role="status" aria-live="polite">
      {content}
    </p>
  );
}
