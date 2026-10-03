"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { World } from "@/components/world";
import { TimerRing } from "@/components/timer-ring";
import { RevealCard, TierScale } from "@/components/reveal-card";
import { Results } from "@/components/results";
import { DrillionFlash, HitFx, makeFx, type FxEvent } from "@/components/hit-fx";
import { cn } from "@/lib/utils";
import {
  ANSWER_SECONDS,
  CHAPTERS_PER_PACK,
  PROMPTS_PER_DIG,
  answerFrom,
  dailyPrompts,
  deeperPicks,
  entriesFor,
  findEntry,
  metersOf,
  packPrompts,
  todaysDig,
  totalOf,
  unlimitedPrompts,
  type Answer,
} from "@/lib/game";
import { formatMeters, zoneAt } from "@/lib/depth";
import { PACKS, type Pack, type Prompt } from "@/lib/prompts";
import {
  digKey,
  liveStreak,
  loadDig,
  loadRecent,
  loadUnlimited,
  recordDailyFinish,
  saveDig,
  saveRecent,
  saveUnlimited,
} from "@/lib/storage";

export type DigMode =
  | { kind: "daily"; dig: number }
  | { kind: "pack"; pack: Pack; chapter: number }
  | { kind: "unlimited" };

type Phase = "intro" | "asking" | "reveal" | "done";

function promptsFor(mode: DigMode): Prompt[] {
  if (mode.kind === "daily") return dailyPrompts(mode.dig);
  if (mode.kind === "pack") return packPrompts(mode.pack, mode.chapter);
  return unlimitedPrompts(loadRecent());
}

function storageKey(mode: DigMode): string | null {
  if (mode.kind === "daily") return digKey.daily(mode.dig);
  if (mode.kind === "pack") return digKey.pack(mode.pack, mode.chapter);
  return null;
}

// Browser-only (mounted via next/dynamic with ssr: false), so reading
// localStorage in the state initializers below is safe.
export function DiveGame({ mode }: { mode: DigMode }) {
  const key = storageKey(mode);
  const [prompts, setPrompts] = useState<Prompt[]>(() => promptsFor(mode));
  const [answers, setAnswers] = useState<Answer[]>(() => (key ? (loadDig(key)?.answers ?? []) : []));
  const [phase, setPhase] = useState<Phase>("intro");
  const [howTo, setHowTo] = useState(false);
  const [value, setValue] = useState("");
  const [miss, setMiss] = useState<{ n: number; typed: string } | null>(null);
  const [remaining, setRemaining] = useState(ANSWER_SECONDS * 1000);
  const [fx, setFx] = useState<FxEvent[]>([]);
  const [flash, setFlash] = useState<{ id: number; word: string } | null>(null);
  const [streak] = useState(() => liveStreak(todaysDig()));
  const endAt = useRef(0);
  const committed = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);

  const today = todaysDig();
  const idx = answers.length;
  const complete = idx >= PROMPTS_PER_DIG;
  const current = prompts[Math.min(idx, prompts.length - 1)];
  const last = answers[answers.length - 1];
  const total = totalOf(answers);
  const meters = metersOf(total);
  const notAired = mode.kind === "daily" && mode.dig > today;

  const resetClock = () => {
    endAt.current = Date.now() + ANSWER_SECONDS * 1000;
    setRemaining(ANSWER_SECONDS * 1000);
    committed.current = false;
  };

  // Restart a CSS animation on a live node. Remounting via key would drop input focus.
  const shake = (big: boolean) => {
    const el = shellRef.current;
    if (!el) return;
    el.classList.remove("animate-shake", "animate-shake-big");
    void el.offsetWidth;
    el.classList.add(big ? "animate-shake-big" : "animate-shake");
  };

  const commit = useCallback(
    (answer: Answer) => {
      if (committed.current) return;
      committed.current = true;
      const next = [...answers, answer];
      if (key) saveDig(key, { answers: next });
      setAnswers(next);
      setPhase("reveal");
      setValue("");
      setMiss(null);

      if (answer.tier !== "dud") {
        const event = makeFx(answer.tier);
        setFx((list) => [...list, event]);
        setTimeout(() => setFx((list) => list.filter((f) => f.id !== event.id)), 1200);
        if (answer.tier === "magma" || answer.tier === "drillion") shake(answer.tier === "drillion");
        if (answer.tier === "drillion") {
          setFlash({ id: event.id, word: answer.canonical ?? "" });
          setTimeout(() => setFlash((f) => (f?.id === event.id ? null : f)), 1500);
        }
      }

      if (next.length >= PROMPTS_PER_DIG) {
        if (mode.kind === "daily" && mode.dig === todaysDig()) recordDailyFinish(mode.dig);
        if (mode.kind === "unlimited") {
          const s = loadUnlimited();
          saveUnlimited({
            digs: s.digs + 1,
            best: Math.max(s.best, totalOf(next)),
            drillions: s.drillions + next.filter((a) => a.tier === "drillion").length,
          });
        }
      }
    },
    [answers, key, mode],
  );

  // Countdown runs off an end timestamp so a throttled background tab stays accurate.
  useEffect(() => {
    if (phase !== "asking") return;
    inputRef.current?.focus();
    const id = setInterval(() => {
      const left = Math.max(0, endAt.current - Date.now());
      setRemaining(left);
      if (left === 0) {
        clearInterval(id);
        commit(answerFrom(current, null, ""));
      }
    }, 100);
    return () => clearInterval(id);
  }, [phase, commit, current]);

  const begin = () => {
    if (complete) return setPhase("done");
    if (mode.kind === "unlimited") saveRecent([...loadRecent(), ...prompts.map((p) => p.id)]);
    resetClock();
    setPhase("asking");
  };

  const proceed = () => {
    if (complete) return setPhase("done");
    resetClock();
    setPhase("asking");
  };

  const digAgain = () => {
    const fresh = unlimitedPrompts(loadRecent());
    saveRecent([...loadRecent(), ...fresh.map((p) => p.id)]);
    setPrompts(fresh);
    setAnswers([]);
    resetClock();
    setPhase("asking");
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const typed = value.trim();
    if (!typed || phase !== "asking") return;
    const entry = findEntry(entriesFor(current), typed);
    if (!entry) {
      // Not on the list: shake, keep the clock running, let them try again.
      setMiss((m) => ({ n: (m?.n ?? 0) + 1, typed }));
      setValue("");
      return;
    }
    commit(answerFrom(current, entry, typed));
  };

  const heading = intro(mode);
  const camera = phase === "intro" ? "surface" : "follow";

  return (
    <div ref={shellRef} className="relative min-h-dvh">
      <World depth={phase === "intro" ? 0 : meters} camera={camera} drilling={phase === "asking"} />
      <div className="scanlines" aria-hidden />
      {flash && <DrillionFlash key={flash.id} word={flash.word} />}

      {/* ---------- Intro, framed on the rig ---------- */}
      {phase === "intro" && (
        <div className="relative z-10 flex min-h-dvh flex-col items-center px-4 pt-[12vh] text-center">
          <h1 className="font-pixel title-glitch text-6xl sm:text-8xl">{heading.title}</h1>
          <p className="font-pixel mt-4 text-sm tracking-[0.4em] text-[#3c6f8f]">{heading.subtitle}</p>
          <p className="font-pixel mt-3 text-xs text-[#4a5d6b]">7 prompts, 25 seconds each, rarer answers drill deeper</p>

          <div className="mt-auto mb-[8vh] flex w-full max-w-md flex-col items-stretch gap-4">
            <button
              type="button"
              className="font-pixel self-start text-[11px] tracking-[0.3em] text-[#f3e3c0]/60 hover:text-[#f3e3c0]"
              onClick={() => setHowTo((v) => !v)}
              aria-expanded={howTo}
            >
              {howTo ? "▾" : "▸"} How to play
            </button>
            {howTo && (
              <ul className="font-pixel animate-tag-in flex flex-col gap-2 text-left text-[11px] leading-relaxed text-[#f3e3c0]/80">
                <li>You get 7 prompts. Type one answer for each.</li>
                <li>25 seconds per answer. Wrong guesses don&apos;t count, so try again.</li>
                <li>Answers few people think of score big. The obvious ones barely scratch the dirt.</li>
                <li>Every point drills you 15 metres down.</li>
                <li>{mode.kind === "daily" ? "One dig a day. No do-overs." : "No limits here. Dig as often as you like."}</li>
              </ul>
            )}

            {notAired ? (
              <p className="panel font-pixel p-4 text-sm text-[#f3e3c0]">Dig #{(mode as { dig: number }).dig} hasn&apos;t aired yet.</p>
            ) : (
              <button type="button" className="btn-frame btn-big" onClick={begin} autoFocus>
                {complete ? "See your log" : idx > 0 ? "▼ Resume drilling ▼" : "▼ Start drilling ▼"}
              </button>
            )}

            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="font-pixel text-[10px] tracking-[0.2em] text-[#f3e3c0]/50">{heading.footer(streak)}</span>
              <span className="flex flex-wrap gap-2">
                <Link href="/archive" className="chip-frame">Archive</Link>
                <Link href="/packs" className="chip-frame">Packs</Link>
                <Link href="/unlimited" className="chip-frame">Unlimited</Link>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ---------- HUD ---------- */}
      {phase !== "intro" && (
        <header className="pointer-events-none fixed inset-x-0 top-0 z-20 flex items-start justify-between gap-3 px-16 pt-4 sm:px-20">
          <div className="hud-box">
            <span className="hud-label">Depth</span>
            <span key={meters} className="hud-value animate-drop-in">{formatMeters(meters)}</span>
            <span className="hud-label">{meters === 0 ? "surface" : zoneAt(meters)}</span>
          </div>
          <ol className="mt-2 flex gap-1.5" aria-label="Progress">
            {prompts.map((p, i) => {
              const a = answers[i];
              return (
                <li
                  key={p.id}
                  className={cn(
                    "size-3 border border-black/40",
                    !a && (i === idx ? "animate-pulse bg-[#f3e3c0]" : "bg-[#f3e3c0]/20"),
                  )}
                  style={a ? { background: a.tier === "dud" ? "#5b5650" : `var(--tier-${a.tier})` } : undefined}
                />
              );
            })}
          </ol>
          <div className="hud-box items-end text-right">
            <span className="hud-label">Score</span>
            <span key={total} className="hud-value animate-drop-in text-tier-magma">{total}</span>
          </div>
        </header>
      )}

      {/* ---------- Asking ---------- */}
      {phase === "asking" && (
        <>
          <div className="relative z-10 flex min-h-dvh flex-col px-4 pt-28 pb-32 sm:pr-[8vw] sm:pl-[30vw]">
            <div key={current.id} className="sample-tag animate-tag-in w-full max-w-md p-5">
              <p className="font-pixel text-[10px] tracking-[0.3em] text-[#9c4f2a]">
                Sample {idx + 1} of {PROMPTS_PER_DIG}
              </p>
              <h2 className="mt-2 text-2xl leading-snug font-semibold text-balance text-[#2b2117]">{current.text}</h2>
              <p className="font-pixel mt-3 text-[10px] tracking-[0.2em] text-[#6b5a45]">▶ rarer answers drill deeper ▶</p>
            </div>
          </div>

          <form onSubmit={submit} className="answer-bar fixed inset-x-0 bottom-0 z-20 flex justify-center px-4 pt-6 pb-5">
            <div className="relative flex w-full max-w-xl items-center gap-3">
              <TimerRing ms={remaining} />
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  key={miss ? `m${miss.n}` : "input"}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  placeholder="type one answer…"
                  aria-label={`Answer for: ${current.text}`}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  enterKeyHint="send"
                  className={cn("answer-input w-full", miss && "animate-nudge")}
                  autoFocus
                />
                {miss && (
                  <p className="font-pixel absolute -top-6 left-0 text-[10px] tracking-[0.15em] text-tier-magma" role="status">
                    &ldquo;{miss.typed}&rdquo; isn&apos;t in the survey. Try another.
                  </p>
                )}
              </div>
              <button type="submit" className="btn-frame">Drill</button>
            </div>
          </form>
        </>
      )}

      {/* ---------- Reveal ---------- */}
      {phase === "reveal" && last && (
        <div className="relative z-10 flex min-h-dvh flex-col items-center px-4 pt-28 pb-10 sm:flex-row sm:items-start sm:justify-between sm:pr-[6vw] sm:pl-[30vw]">
          <div className="relative w-full max-w-sm">
            <HitFx events={fx} />
            <RevealCard answer={last} deeper={deeperPicks(prompts[idx - 1], last.tier)} />
          </div>
          <div className="panel mt-6 hidden px-4 py-3 sm:mt-10 sm:block">
            <TierScale active={last.tier} />
          </div>
          <div className="fixed inset-x-0 bottom-8 z-20 flex justify-center">
            <button type="button" className="btn-frame btn-big" onClick={proceed} autoFocus>
              {complete ? "Read the log →" : "Keep drilling →"}
            </button>
          </div>
        </div>
      )}

      {/* ---------- Done ---------- */}
      {phase === "done" && (
        <div className="relative z-10 flex min-h-dvh items-start justify-center px-4 pt-28 pb-16">
          <Results title={heading.resultTitle} answers={answers} prompts={prompts} shareLabel={heading.share}>
            <DoneActions mode={mode} today={today} onDigAgain={digAgain} />
          </Results>
        </div>
      )}

      {/* Last answer's tier, for screen readers */}
      <p className="sr-only" aria-live="polite">
        {phase === "reveal" && last ? `${last.canonical ?? "No answer"}: ${last.tier}, plus ${last.points}` : ""}
      </p>
    </div>
  );
}

function intro(mode: DigMode) {
  if (mode.kind === "daily") {
    return {
      title: "Drillion",
      subtitle: "The daily dig",
      footer: (streak: number) => `Dig #${mode.dig}  streak ${streak}`,
      resultTitle: `Dig #${mode.dig} complete`,
      share: `Drillion dig #${mode.dig}`,
    };
  }
  if (mode.kind === "pack") {
    const pack = PACKS.find((p) => p.id === mode.pack);
    return {
      title: "Drillion",
      subtitle: `${pack?.name ?? "Pack"}, chapter ${mode.chapter}`,
      footer: () => `Chapter ${mode.chapter} of ${CHAPTERS_PER_PACK}`,
      resultTitle: `${pack?.name} chapter ${mode.chapter}`,
      share: `Drillion ${pack?.name} ch.${mode.chapter}`,
    };
  }
  return {
    title: "Drillion",
    subtitle: "Unlimited",
    footer: () => "Free, forever, no cap",
    resultTitle: "Dig complete",
    share: null,
  };
}

function DoneActions({ mode, today, onDigAgain }: { mode: DigMode; today: number; onDigAgain: () => void }) {
  if (mode.kind === "unlimited") {
    const s = loadUnlimited();
    return (
      <>
        <button type="button" className="btn-frame" onClick={onDigAgain} autoFocus>
          Dig again
        </button>
        <p className="font-pixel w-full text-center text-[10px] tracking-[0.2em] text-[#f3e3c0]/50">
          {s.digs} digs, best {s.best}, {s.drillions} drillions
        </p>
      </>
    );
  }
  if (mode.kind === "pack") {
    return mode.chapter < CHAPTERS_PER_PACK ? (
      <Link href={`/packs/${mode.pack}/${mode.chapter + 1}`} className="btn-frame">
        Next chapter
      </Link>
    ) : (
      <Link href="/packs" className="btn-frame">
        All packs
      </Link>
    );
  }
  return (
    <>
      <Link href="/unlimited" className="btn-frame">
        Keep digging, unlimited
      </Link>
      {mode.dig === today && (
        <p className="font-pixel w-full text-center text-[10px] tracking-[0.2em] text-[#f3e3c0]/50">
          A new dig opens at midnight
        </p>
      )}
    </>
  );
}

// "today" can only be resolved in the browser, since the dig flips at the player's local midnight.
export function DiveGameEntry({ mode }: { mode: DigMode | { kind: "today" } }) {
  const [resolved] = useState<DigMode>(() => (mode.kind === "today" ? { kind: "daily", dig: todaysDig() } : mode));
  return <DiveGame mode={resolved} />;
}
