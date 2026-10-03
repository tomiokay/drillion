"use client";

import { useState } from "react";
import { CountUp } from "@/components/count-up";
import { TierSprite } from "@/components/sprite";
import { TIER_TEXT } from "@/components/reveal-card";
import { cn } from "@/lib/utils";
import { RANK_LINES, RANK_MINS, TIERS, metersOf, rankFor, totalOf, type Answer } from "@/lib/game";
import { MARKERS, formatMeters } from "@/lib/depth";
import type { Prompt } from "@/lib/prompts";

type Props = {
  title: string;
  answers: Answer[];
  prompts: Prompt[];
  shareLabel: string | null;
  children?: React.ReactNode;
};

// One emoji per answer for the share text, by tier.
const SHARE_SQUARE: Record<string, string> = {
  topsoil: "🟫",
  clay: "🟧",
  bedrock: "🟦",
  magma: "🟥",
  drillion: "🟨",
  dud: "⬛",
};

export function Results({ title, answers, prompts, shareLabel, children }: Props) {
  const total = totalOf(answers);
  const meters = metersOf(total);
  const rank = rankFor(total);
  const rankIdx = TIERS.findIndex((t) => t.id === rank);
  // The last real-world signpost the player drilled past.
  const passed = [...MARKERS].reverse().find((m) => !m.zone && m.m <= meters);
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const text = `${shareLabel}: ${total} pts, ${formatMeters(meters)}\n${answers.map((a) => SHARE_SQUARE[a.tier]).join("")}\n${location.origin}`;
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
    <div className="panel animate-tag-in mx-auto flex w-full max-w-xl flex-col gap-6 p-6 sm:p-8">
      <div className="flex flex-col items-center gap-2 text-center">
        <p className="font-pixel text-xs tracking-[0.3em] text-[#f3e3c0]/60">{title}</p>
        <p className="font-pixel text-6xl text-[#f3e3c0] tabular-nums">
          <CountUp to={total} duration={1600} />
        </p>
        <p className="font-pixel text-sm text-tier-drillion">{formatMeters(meters)} down</p>
        {passed && (
          <p className="text-sm text-[#f3e3c0]/70">
            Last landmark passed: {passed.text} ({formatMeters(passed.m)})
          </p>
        )}
      </div>

      <ol className="flex justify-center gap-2" aria-label="Your answers">
        {answers.map((a, i) => (
          <li
            key={a.promptId}
            className="animate-ladder-in"
            style={{ animationDelay: `${200 + i * 90}ms` }}
            title={`${prompts[i]?.text}: ${a.canonical ?? "no answer"}`}
          >
            <TierSprite tier={a.tier} scale={3} />
          </li>
        ))}
      </ol>

      <section className="flex flex-col">
        <h2 className="font-pixel mb-1 text-[11px] tracking-[0.3em] text-[#f3e3c0]/50">The log</h2>
        <ol className="flex flex-col divide-y divide-[#f3e3c0]/10">
          {TIERS.map((t, i) => {
            const min = RANK_MINS[i];
            const next = RANK_MINS[i + 1];
            const on = i === rankIdx;
            return (
              <li
                key={t.id}
                className={cn(
                  "animate-ladder-in grid grid-cols-[24px_72px_minmax(0,1fr)] items-center gap-3 py-2.5",
                  on ? "text-[#f3e3c0]" : "text-[#f3e3c0]/35",
                )}
                style={{ animationDelay: `${900 + i * 140}ms` }}
                aria-current={on ? "step" : undefined}
              >
                <TierSprite tier={t.id} scale={2.2} className={on ? "animate-rank-pop" : "opacity-50 grayscale"} />
                <span className={cn("font-pixel text-xs tabular-nums", on && TIER_TEXT[t.id])}>
                  {next === undefined ? `${min}+` : `${min}-${next - 1}`}
                </span>
                <span className={cn("text-sm", on && "font-semibold")}>{RANK_LINES[t.id]}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <details className="text-sm text-[#f3e3c0]/80">
        <summary className="font-pixel cursor-pointer text-[11px] tracking-[0.3em] text-[#f3e3c0]/50 hover:text-[#f3e3c0]">
          Every answer
        </summary>
        <ol className="mt-3 flex flex-col gap-2">
          {answers.map((a, i) => (
            <li key={a.promptId} className="flex items-baseline justify-between gap-4">
              <span className="text-[#f3e3c0]/60">{prompts[i]?.text}</span>
              <span className={cn("shrink-0 font-semibold capitalize", TIER_TEXT[a.tier])}>
                {a.canonical ?? "none"} +{a.points}
              </span>
            </li>
          ))}
        </ol>
      </details>

      <div className="flex flex-wrap justify-center gap-3">
        {shareLabel && (
          <button type="button" className="btn-frame" onClick={share}>
            {copied ? "Copied" : "Share result"}
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
