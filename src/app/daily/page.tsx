import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { DailyClient } from "./daily-client";

export const metadata: Metadata = { title: "Daily dig · Drillion" };

export default function DailyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pt-4 pb-20 sm:px-6">
        <DailyClient />
      </main>
    </>
  );
}
