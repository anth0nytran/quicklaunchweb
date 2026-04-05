"use client";

import Link from "next/link";
import { Navigation } from "@/components/Navigation";

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navigation />
      {children}
      <footer className="border-t border-white/[0.06] px-6 py-12">
        <div className="mx-auto max-w-3xl flex flex-col items-center gap-4 text-center">
          <Link href="/" className="flex items-center gap-1.5 font-bold tracking-tight">
            <span className="text-accent font-black text-lg">QL</span>
            <span className="text-white/20 font-light">|</span>
            <span className="text-white/90">QuickLaunchWeb</span>
          </Link>
          <p className="text-xs text-muted max-w-md">
            The system that gets local businesses more calls, more reviews, and more jobs — without paying for ads.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link href="/#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="/guides" className="hover:text-white transition-colors">Guides</Link>
          </div>
        </div>
      </footer>
    </>
  );
}
