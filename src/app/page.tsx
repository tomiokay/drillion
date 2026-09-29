import Link from "next/link";
import { ArrowDownIcon, ArrowPathIcon } from "@heroicons/react/24/solid";
import { SiteHeader } from "@/components/site-header";
import { CoreSample } from "@/components/core-sample";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PACKS, PROMPTS } from "@/lib/prompts";
import { entriesFor } from "@/lib/game";

// A real round from the data, so the hero demo always matches the scoring.
const demoPrompt = PROMPTS.find((p) => p.id === "ocean-animals")!;
const demoHits = ["shark", "seahorse", "anglerfish", "cuttlefish", "goblin shark"]
  .map((name) => entriesFor(demoPrompt).find((e) => e.canonical === name))
  .filter((e) => e !== undefined);

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-20 px-4 pt-6 pb-20 sm:px-6 md:pt-12">
        <section className="grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_320px] md:gap-16">
          <div className="flex flex-col gap-6">
            <h1 className="font-wide text-5xl leading-[0.95] font-black tracking-tight text-balance sm:text-7xl">
              Say what nobody else says.
            </h1>
            <p className="max-w-md text-lg text-muted-foreground">
              One prompt, sixty seconds. Obvious answers stay near the surface. Rare ones drill all the way down to the
              core and score twelve times as much.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/daily" className={cn(buttonVariants({ size: "lg" }), "h-12 px-6 text-base font-bold")}>
                <ArrowDownIcon className="size-5" aria-hidden />
                Play today&apos;s dig
              </Link>
              <Link
                href="/unlimited"
                className={cn(buttonVariants({ size: "lg", variant: "outline" }), "h-12 px-6 text-base font-bold")}
              >
                <ArrowPathIcon className="size-5" aria-hidden />
                Play unlimited
              </Link>
            </div>
          </div>

          <figure className="flex flex-col gap-3">
            <CoreSample hits={demoHits} className="min-h-[380px]" />
            <figcaption className="text-sm text-muted-foreground">
              Five answers to &ldquo;{demoPrompt.text.toLowerCase()}&rdquo;, sorted by how few people think of them.
            </figcaption>
          </figure>
        </section>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <h2 className="font-wide text-2xl font-extrabold">Pick a pack</h2>
            <p className="text-muted-foreground">Unlimited rounds from one topic. No daily cap, no paywall.</p>
          </div>
          <ul className="grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {PACKS.map((pack) => {
              const count = PROMPTS.filter((p) => p.pack === pack.id).length;
              return (
                <li key={pack.id}>
                  <Link
                    href={`/unlimited?pack=${pack.id}`}
                    className="flex h-full flex-col gap-1 bg-card px-5 py-4 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                  >
                    <span className="font-wide font-bold">{pack.name}</span>
                    <span className="text-sm text-muted-foreground">
                      {pack.blurb}, {count} prompts
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </main>
    </>
  );
}
