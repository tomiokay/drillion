import { DiveClient } from "@/components/dive-client";

export default function Home() {
  return <DiveClient mode={{ kind: "today" }} />;
}
