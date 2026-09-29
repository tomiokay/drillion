import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { PACKS, type Pack } from "@/lib/prompts";
import { UnlimitedClient } from "./unlimited-client";

export const metadata: Metadata = { title: "Unlimited · Drillion" };

export default async function UnlimitedPage({ searchParams }: PageProps<"/unlimited">) {
  const { pack } = await searchParams;
  const valid = PACKS.find((p) => p.id === pack)?.id ?? "all";

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-4 pb-20 sm:px-6">
        {/* Keyed by pack so switching packs starts a fresh session. */}
        <UnlimitedClient key={valid} pack={valid as Pack | "all"} />
      </main>
    </>
  );
}
