import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChaptersClient } from "@/components/lists-client";
import { PACKS } from "@/lib/prompts";

export const metadata: Metadata = { title: "Themed pack · Drillion" };

export default async function PackPage({ params }: PageProps<"/packs/[pack]">) {
  const { pack } = await params;
  const p = PACKS.find((x) => x.id === pack);
  if (!p) notFound();
  return <ChaptersClient pack={p.id} />;
}
