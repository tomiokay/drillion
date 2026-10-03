import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiveClient } from "@/components/dive-client";
import { CHAPTERS_PER_PACK } from "@/lib/game";
import { PACKS } from "@/lib/prompts";

export const metadata: Metadata = { title: "Themed pack · Drillion" };

export default async function ChapterPage({ params }: PageProps<"/packs/[pack]/[chapter]">) {
  const { pack, chapter } = await params;
  const p = PACKS.find((x) => x.id === pack);
  const n = Number(chapter);
  if (!p || !Number.isInteger(n) || n < 1 || n > CHAPTERS_PER_PACK) notFound();
  return <DiveClient mode={{ kind: "pack", pack: p.id, chapter: n }} />;
}
