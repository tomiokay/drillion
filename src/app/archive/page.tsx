import type { Metadata } from "next";
import { ArchiveClient } from "@/components/lists-client";

export const metadata: Metadata = { title: "Archive · Drillion" };

export default function ArchivePage() {
  return <ArchiveClient />;
}
