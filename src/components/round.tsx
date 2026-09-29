"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDownIcon, ClockIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CoreSample, TIER_TEXT } from "@/components/core-sample";
import { cn } from "@/lib/utils";
import { ROUND_SECONDS, entriesFor, judge, scoreOf, tierById, type Entry, type GuessResult } from "@/lib/game";
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
  const [remaining, setRemaining] = useState(ROUND_SECONDS);
  const endAt = useRef(0);
  const finished = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const start = () => {
    endAt.current = Date.now() + ROUND_SECONDS * 1000;
    setPhase("playing");
  };

  // Timer runs off a fixed end time, so a throttled background tab stays accurate.
  useEffect(() => {
    if (phase !== "playing") return;
    inputRef.current?.focus();
    const id = setInterval(() => {
      const left = Math.max(0, Math.ceil((endAt.current - Date.now()) / 1000));
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        finish();
      }
    }, 200);
    return () => clearInterval(id);
  }, [phase, finish]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const typed = value.trim();
    if (!typed || phase !== "playing") return;
    const found = new Set(hits.map((h) => h.canonical));
    const result = judge(entries, typed, found);
    setLast(result);
    if (result.kind === "hit") setHits((h) => [...h, result.entry]);
    if (result.kind === "miss") setMisses((m) => m + 1);
    setValue("");
  };

  const score = scoreOf(hits);
  const urgent = phase === "playing" && remaining <= 10;

  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_300px] md:gap-10">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <span>{label}</span>
          <span
            className={cn(
              "inline-flex items-center gap-1.5 font-semibold tabular-nums",
              urgent ? "text-tier-magma" : "text-foreground",
            )}
            aria-live="off"
          >
            <ClockIcon className="size-4" aria-hidden />
            0:{String(remaining).padStart(2, "0")}
          </span>
        </div>

        {/* Depletes like a drill running out of pipe. */}
        <div className="h-1 overflow-hidden rounded-full bg-muted" aria-hidden>
          <div
            className={cn("h-full transition-[width] duration-200 ease-linear", urgent ? "bg-tier-magma" : "bg-tier-drillion")}
            style={{ width: `${(remaining / ROUND_SECONDS) * 100}%` }}
          />
        </div>

        {phase === "ready" ? (
          <div className="flex flex-col items-start gap-6 py-6">
            <p className="max-w-md text-lg text-muted-foreground">
              You&apos;ll get one prompt and {ROUND_SECONDS} seconds. Type as many answers as you can. The ones fewer
              people think of drill deeper and score more.
            </p>
            <Button size="lg" className="h-12 px-6 text-base font-bold" onClick={start} autoFocus>
              <ArrowDownIcon className="size-5" aria-hidden />
              Start drilling
            </Button>
          </div>
        ) : (
          <>
            <h1 className="font-wide text-3xl leading-tight font-extrabold text-balance sm:text-4xl">{prompt.text}</h1>

            <form onSubmit={submit} className="flex gap-2">
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
                className={cn(
                  "h-14 flex-1 px-4 text-lg md:text-lg",
                  last?.kind === "miss" && "animate-nudge",
                )}
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
                <dd className="font-wide text-2xl font-extrabold tabular-nums">{score}</dd>
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

      <CoreSample hits={hits} latest={last?.kind === "hit" ? last.entry.canonical : null} className="min-h-[420px]" />
    </div>
  );
}

function Feedback({ last }: { last: GuessResult | null }) {
  let content: React.ReactNode = <span className="text-muted-foreground">Misspellings close enough to count are accepted.</span>;

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
