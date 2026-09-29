import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

// Archivo is variable on width, so one family covers both the stretched
// display type and the normal-width body text.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
});

export const metadata: Metadata = {
  title: "Drillion",
  description: "Name the answers nobody else thinks of. Rarer answers drill deeper.",
};

export const viewport: Viewport = {
  themeColor: "#221d1a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
