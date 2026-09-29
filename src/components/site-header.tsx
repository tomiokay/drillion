import Link from "next/link";

const NAV = [
  { href: "/daily", label: "Daily dig" },
  { href: "/unlimited", label: "Unlimited" },
  { href: "/how-to-play", label: "How to play" },
];

export function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-4 py-5 sm:px-6">
      <Link
        href="/"
        className="font-wide rounded-sm text-xl font-black tracking-tight focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
      >
        drillion
      </Link>
      <nav className="flex items-center gap-1 text-sm sm:gap-2">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className="rounded-md px-2 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none sm:px-3"
          >
            {n.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
