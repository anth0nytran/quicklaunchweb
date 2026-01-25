import type { Metadata } from "next";
import { BGPattern } from "@/components/ui/bg-pattern";
import { AmbientGlow } from "@/components/ui/glass";
import { DemoLoginForm } from "@/components/demo/DemoLoginForm";

export const metadata: Metadata = {
  title: "Demo Access | QuickLaunchWeb",
  description: "Private demo access for QuickLaunchWeb previews.",
  robots: {
    index: false,
    follow: false,
  },
};

type DemoLoginPageProps = {
  searchParams?: Record<string, string | string[] | undefined>;
};

export default function DemoLoginPage({ searchParams }: DemoLoginPageProps) {
  const nextParam = Array.isArray(searchParams?.next) ? searchParams?.next[0] : searchParams?.next;

  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />

      <div className="relative z-10 mx-auto max-w-md">
        <DemoLoginForm nextPath={nextParam} />
      </div>
    </main>
  );
}
