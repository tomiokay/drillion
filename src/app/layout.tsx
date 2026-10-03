import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Silkscreen } from "next/font/google";
import { Menu } from "@/components/menu";
import "./globals.css";

// Silkscreen is a bitmap-style face for titles, labels and numbers.
// Plex Mono keeps longer text (prompts, answers) easy to read.
const pixel = Silkscreen({ variable: "--font-pixel", subsets: ["latin"], weight: ["400", "700"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono-body", subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: "Drillion · the daily dig",
  description: "7 prompts, 25 seconds each. Rarer answers drill deeper.",
};

export const viewport: Viewport = {
  themeColor: "#1a0f07",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${pixel.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Menu />
        {children}
      </body>
    </html>
  );
}
