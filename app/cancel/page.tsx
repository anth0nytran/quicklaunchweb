import Link from "next/link";
import { GlassCard, GlassButton, GlassPill, AmbientGlow } from "@/components/ui/glass";

function XCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16 relative">
      {/* Ambient background */}
      <AmbientGlow color="white" position="center" intensity="subtle" />
      
      <GlassCard variant="elevated" className="w-full max-w-lg p-10 text-center relative overflow-hidden">
        {/* Inner subtle glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Cancel icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/[0.08] ring-1 ring-white/[0.15]">
            <XCircleIcon className="h-8 w-8 text-muted" />
          </div>
          
          <GlassPill className="mb-4">
            Checkout canceled
          </GlassPill>
          
          <h1 className="text-3xl font-bold text-white">No worries.</h1>
          
          <p className="mt-4 text-secondary leading-relaxed">
            If you still want a site in{" "}
            <span className="text-white font-medium">48 hours</span>, you can
            restart your plan whenever you&apos;re ready.
          </p>
          
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/#pricing">
              <GlassButton variant="primary" size="lg" className="w-full group">
                View pricing
                <ArrowRightIcon className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </GlassButton>
            </Link>
            <Link href="/">
              <GlassButton variant="ghost" size="md" className="w-full">
                Back to home
              </GlassButton>
            </Link>
          </div>
          
          {/* Reassurance */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <p className="text-sm text-muted">
              Questions? Just reply to any of our emails.
            </p>
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
