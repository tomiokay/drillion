import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DiveClient } from "@/components/dive-client";

export async function generateMetadata({ params }: PageProps<"/archive/[dig]">): Promise<Metadata> {
  const { dig } = await params;
  return { title: `Dig #${dig} · Drillion` };
}

export default async function ArchiveDigPage({ params }: PageProps<"/archive/[dig]">) {
  const { dig } = await params;
  const n = Number(dig);
  if (!Number.isInteger(n) || n < 1) notFound();
  return <DiveClient mode={{ kind: "daily", dig: n }} />;
}
