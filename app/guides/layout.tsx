"use client";

import { BrandShell } from "@/components/brand/brand-shell";

// Every guide renders inside the light brand frame (header, navy footer, sticky
// mobile CTA, booking context). Pages start with a hero padded for the fixed header.
export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BrandShell>{children}</BrandShell>;
}
