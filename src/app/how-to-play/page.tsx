import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { TIER_BG } from "@/components/core-sample";
import { cn } from "@/lib/utils";
import { DAILY_ROUNDS, ROUND_SECONDS, TIERS } from "@/lib/game";

export const metadata: Metadata = { title: "How to play · Drillion" };

export default function HowToPlay() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-10 px-4 pt-6 pb-20 sm:px-6">
        <h1 className="font-wide text-4xl font-black">How to play</h1>

        {/* These really are steps in order, so a numbered list fits. */}
        <ol className="flex list-decimal flex-col gap-3 pl-5 text-lg marker:font-bold marker:text-muted-foreground">
          <li>You get a prompt, like &ldquo;a kind of bird.&rdquo;</li>
          <li>You have {ROUND_SECONDS} seconds to type as many answers as you can. Press Enter after each one.</li>
          <li>Every correct answer lands in a rock layer. The fewer people who&apos;d think of it, the deeper it goes.</li>
        </ol>

        <section className="flex flex-col gap-4">
          <h2 className="font-wide text-2xl font-extrabold">The layers</h2>
          <ul className="flex flex-col overflow-hidden rounded-xl border border-border">
            {TIERS.map((t) => (
              <li
                key={t.id}
                className={cn("flex items-baseline justify-between gap-4 px-4 py-3 text-[#1a120b]", TIER_BG[t.id])}
              >
                <span>
                  <span className="font-wide font-extrabold">{t.name}</span>
                  <span className="ml-3 text-sm opacity-80">{t.line}</span>
                </span>
                <span className="font-wide font-extrabold tabular-nums">+{t.points}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-3 text-muted-foreground">
          <h2 className="font-wide text-2xl font-extrabold text-foreground">Modes</h2>
          <p>
            <Link href="/daily" className="font-semibold text-foreground underline underline-offset-4">
              Daily dig
            </Link>{" "}
            gives everyone the same {DAILY_ROUNDS} prompts each day. You get one try, then you can share your score.
          </p>
          <p>
            <Link href="/unlimited" className="font-semibold text-foreground underline underline-offset-4">
              Unlimited
            </Link>{" "}
            serves random prompts forever, from every pack or just the one you pick. It&apos;s free, with no cap.
          </p>
          <p>Small typos and plurals still count. Repeating an answer does nothing, and wrong answers cost nothing.</p>
        </section>
      </main>
    </>
  );
}
