import type { Metadata } from "next";
import { DiveClient } from "@/components/dive-client";

export const metadata: Metadata = { title: "Unlimited · Drillion" };

export default function UnlimitedPage() {
  return <DiveClient mode={{ kind: "unlimited" }} />;
}
