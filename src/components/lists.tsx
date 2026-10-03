"use client";

import { useState } from "react";
import Link from "next/link";
import { TierSprite } from "@/components/sprite";
import { cn } from "@/lib/utils";
import { CHAPTERS_PER_PACK, PROMPTS_PER_DIG, digDate, rankFor, todaysDig, totalOf } from "@/lib/game";
import { PACKS, PROMPTS, type Pack } from "@/lib/prompts";
import { digKey, loadDig } from "@/lib/storage";

type Status = { done: boolean; started: boolean; total: number };

function statusOf(key: string): Status {
  const answers = loadDig(key)?.answers ?? [];
  return { done: answers.length >= PROMPTS_PER_DIG, started: answers.length > 0, total: totalOf(answers) };
}

function Shell({ title, subtitle, back, children }: { title: string; subtitle: string; back: { href: string; label: string }; children: React.ReactNode }) {
  return (
    <main className="relative min-h-dvh px-4 pt-20 pb-16">
      <div className="scanlines" aria-hidden />
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-8">
        <header className="flex flex-col gap-2">
          <h1 className="font-pixel title-glitch text-4xl sm:text-5xl">{title}</h1>
          <p className="font-pixel text-[11px] tracking-[0.3em] text-[#f3e3c0]/55">{subtitle}</p>
        </header>
        {children}
        <Link href={back.href} className="font-pixel self-start text-[11px] tracking-[0.3em] text-[#f3e3c0]/60 hover:text-[#f3e3c0]">
          ← {back.label}
        </Link>
      </div>
    </main>
  );
}

function StatusBadge({ s }: { s: Status }) {
  if (s.done) {
    return (
      <span className="flex items-center gap-2">
        <TierSprite tier={rankFor(s.total)} scale={1.8} />
        <span className="font-pixel text-sm text-tier-drillion tabular-nums">{s.total}</span>
      </span>
    );
  }
  return (
    <span className="font-pixel text-[10px] tracking-[0.2em] text-[#f3e3c0]/45">{s.started ? "in progress" : "unplayed"}</span>
  );
}

export function ArchiveList() {
  const [today] = useState(todaysDig);
  // Newest first, including today's.
  const [rows] = useState(() =>
    Array.from({ length: today }, (_, i) => today - i).map((dig) => ({ dig, s: statusOf(digKey.daily(dig)) })),
  );

  return (
    <Shell title="Archive" subtitle="Every daily dig, still open" back={{ href: "/", label: "Today's dig" }}>
      <ol className="panel flex flex-col divide-y divide-[#f3e3c0]/10">
        {rows.map(({ dig, s }) => (
          <li key={dig}>
            <Link
              href={dig === today ? "/" : `/archive/${dig}`}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-[#f3e3c0]/5 focus-visible:bg-[#f3e3c0]/5 focus-visible:outline-none"
            >
              <span className="flex flex-col">
                <span className="font-pixel text-sm tracking-[0.15em]">
                  Dig #{dig} {dig === today && <span className="text-tier-drillion">today</span>}
                </span>
                <span className="text-xs text-[#f3e3c0]/50">
                  {digDate(dig).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                </span>
              </span>
              <StatusBadge s={s} />
            </Link>
          </li>
        ))}
      </ol>
    </Shell>
  );
}

export function PackList() {
  const [rows] = useState(() =>
    PACKS.map((p) => {
      const done = Array.from({ length: CHAPTERS_PER_PACK }, (_, i) => statusOf(digKey.pack(p.id, i + 1))).filter((s) => s.done).length;
      return { ...p, done, prompts: PROMPTS.filter((x) => x.pack === p.id).length };
    }),
  );

  return (
    <Shell title="Themed packs" subtitle="Beyond the daily dig" back={{ href: "/", label: "Today's dig" }}>
      <ul className="grid gap-4 sm:grid-cols-2">
        {rows.map((p) => (
          <li key={p.id}>
            <Link
              href={`/packs/${p.id}`}
              className="panel flex h-full flex-col gap-3 p-5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#fff6d6]"
            >
              <span className="font-pixel text-lg tracking-[0.1em]">{p.name}</span>
              <span className="text-sm text-[#f3e3c0]/60">
                {p.blurb}. {CHAPTERS_PER_PACK} chapters from {p.prompts} prompts.
              </span>
              <span className="mt-auto flex items-center justify-between">
                <span className="font-pixel text-[10px] tracking-[0.2em] text-[#f3e3c0]/50">
                  {p.done}/{CHAPTERS_PER_PACK} done
                </span>
                <span className="font-pixel text-[11px] tracking-[0.2em] text-tier-drillion">Open →</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}

export function ChapterList({ pack }: { pack: Pack }) {
  const info = PACKS.find((p) => p.id === pack)!;
  const [rows] = useState(() =>
    Array.from({ length: CHAPTERS_PER_PACK }, (_, i) => ({ ch: i + 1, s: statusOf(digKey.pack(pack, i + 1)) })),
  );

  return (
    <Shell title={info.name} subtitle={`${CHAPTERS_PER_PACK} chapters, 7 prompts each`} back={{ href: "/packs", label: "All packs" }}>
      <ol className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {rows.map(({ ch, s }) => (
          <li key={ch}>
            <Link
              href={`/packs/${pack}/${ch}`}
              className={cn(
                "panel flex flex-col gap-3 p-4 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#fff6d6]",
                s.done && "border-tier-drillion/60",
              )}
            >
              <span className="font-pixel text-sm tracking-[0.15em]">Chapter {ch}</span>
              <StatusBadge s={s} />
            </Link>
          </li>
        ))}
      </ol>
    </Shell>
  );
}
