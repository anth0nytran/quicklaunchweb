import type { Metadata } from 'next';
import { Suspense } from 'react';
import { DemoShell } from '@/components/demo/DemoShell';

export const metadata: Metadata = {
  title: 'Demo Templates | QuickLaunchWeb',
  description:
    'Preview premium, conversion-focused website templates for local businesses. Customize copy, services, and colors instantly.',
  openGraph: {
    title: 'Demo Templates | QuickLaunchWeb',
    description:
      'Preview premium, conversion-focused website templates for local businesses.',
    type: 'website',
  },
  robots: {
    index: false,
    follow: false,
  },
};

function DemoLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="animate-pulse text-sm text-white/60">Loading demo…</div>
    </div>
  );
}

export default function DemoPage() {
  return (
    <Suspense fallback={<DemoLoading />}>
      <DemoShell />
    </Suspense>
  );
}
