import type { Metadata } from 'next';
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

export default function DemoPage() {
  return <DemoShell />;
}
