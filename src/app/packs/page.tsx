import type { Metadata } from "next";
import { PacksClient } from "@/components/lists-client";

export const metadata: Metadata = { title: "Themed packs · Drillion" };

export default function PacksPage() {
  return <PacksClient />;
}
