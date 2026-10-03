"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";

const LINKS = [
  { href: "/", label: "Today's dig", note: "7 prompts, once a day" },
  { href: "/unlimited", label: "Unlimited", note: "dig as much as you like" },
  { href: "/archive", label: "Archive", note: "every past daily" },
  { href: "/packs", label: "Themed packs", note: "chapters by topic" },
];

export function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="icon-frame fixed top-4 left-4 z-40"
        aria-label="Open menu"
        aria-expanded={open}
      >
        <Bars3Icon className="size-5" />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Menu">
          <button type="button" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} aria-label="Close menu" />
          <nav className="panel animate-drawer-in absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col gap-1 p-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="font-pixel title-glitch text-xl">Drillion</span>
              <button type="button" className="icon-frame" onClick={() => setOpen(false)} aria-label="Close menu" autoFocus>
                <XMarkIcon className="size-5" />
              </button>
            </div>
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-2.5 transition-colors hover:bg-[#f3e3c0]/10 focus-visible:bg-[#f3e3c0]/10 focus-visible:outline-none"
              >
                <span className="font-pixel block text-sm tracking-[0.15em] text-[#f3e3c0]">{l.label}</span>
                <span className="block text-xs text-[#f3e3c0]/50">{l.note}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
