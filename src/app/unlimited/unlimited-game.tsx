"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { Button } from "@/components/ui/button";
import { Round, type RoundOutcome } from "@/components/round";
import { RoundSummary } from "@/components/round-summary";
import { cn } from "@/lib/utils";
import { randomPrompt, scoreOf } from "@/lib/game";
import { PACKS, type Pack, type Prompt } from "@/lib/prompts";
import { loadRecent, loadStats, saveRecent, saveStats, type Stats } from "@/lib/storage";

type Props = { pack: Pack | "all" };

function pickPrompt(pack: Pack | "all"): Prompt {
  const recent = loadRecent();
  const p = randomPrompt(pack, recent);
  saveRecent([...recent, p.id]);
  return p;
}

export function UnlimitedGame({ pack }: Props) {
  // Browser-only component (see unlimited-client.tsx), so storage reads are safe here.
  const [prompt, setPrompt] = useState<Prompt>(() => pickPrompt(pack));
  const [result, setResult] = useState<RoundOutcome | null>(null);
  const [stats, setStats] = useState<Stats>(loadStats);
  const [round, setRound] = useState(1);

  const next = () => {
    setPrompt(pickPrompt(pack));
    setResult(null);
  };

  const onFinish = useCallback(
    (outcome: RoundOutcome) => {
      const s = loadStats();
      const updated: Stats = {
        unlimitedRounds: s.unlimitedRounds + 1,
        bestRound: Math.max(s.bestRound, scoreOf(outcome.hits)),
        drillions: s.drillions + outcome.hits.filter((h) => h.tier === "drillion").length,
      };
      saveStats(updated);
      setStats(updated);
      setResult(outcome);
    },
    [],
  );

  return (
    <div className="flex flex-col gap-8">
      <nav aria-label="Packs" className="-mx-1 flex flex-wrap gap-1.5">
        {[{ id: "all" as const, name: "All packs" }, ...PACKS].map((p) => (
          <Link
            key={p.id}
            href={p.id === "all" ? "/unlimited" : `/unlimited?pack=${p.id}`}
            aria-current={pack === p.id ? "page" : undefined}
            className={cn(
              "rounded-full border px-3 py-1 text-sm transition-colors focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
              pack === p.id
                ? "border-primary bg-primary font-semibold text-primary-foreground"
                : "border-border text-muted-foreground hover:border-input hover:text-foreground",
            )}
          >
            {p.name}
          </Link>
        ))}
      </nav>

      {result ? (
        <RoundSummary prompt={prompt} hits={result.hits} misses={result.misses}>
          <div className="flex flex-wrap items-center gap-6">
            <Button
              size="lg"
              className="h-12 px-6 text-base font-bold"
              onClick={() => {
                setRound((r) => r + 1);
                next();
              }}
              autoFocus
            >
              Next prompt
              <ArrowRightIcon className="size-5" aria-hidden />
            </Button>
            <p className="text-sm text-muted-foreground">
              Best round {stats.bestRound}, {stats.drillions} drillion {stats.drillions === 1 ? "answer" : "answers"}{" "}
              across {stats.unlimitedRounds} rounds
            </p>
          </div>
        </RoundSummary>
      ) : (
        <Round key={`${prompt.id}-${round}`} prompt={prompt} label={`Unlimited, round ${round}`} onFinish={onFinish} />
      )}
    </div>
  );
}
