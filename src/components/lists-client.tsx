"use client";

import dynamic from "next/dynamic";
import type { Pack } from "@/lib/prompts";

// These lists show saved scores from localStorage, so they render in the browser only.
const loading = () => <div className="min-h-dvh" />;
const Archive = dynamic(() => import("@/components/lists").then((m) => m.ArchiveList), { ssr: false, loading });
const Packs = dynamic(() => import("@/components/lists").then((m) => m.PackList), { ssr: false, loading });
const Chapters = dynamic(() => import("@/components/lists").then((m) => m.ChapterList), { ssr: false, loading });

export const ArchiveClient = () => <Archive />;
export const PacksClient = () => <Packs />;
export const ChaptersClient = ({ pack }: { pack: Pack }) => <Chapters pack={pack} />;
