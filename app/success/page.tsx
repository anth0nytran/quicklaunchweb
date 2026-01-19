import Link from "next/link";
import { GlassCard, GlassButton, GlassPill, AmbientGlow } from "@/components/ui/glass";

function CheckCircleIcon({ className }: { className?: string }) {
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
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}

function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
    </svg>
  );
}

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-5 py-16 relative">
      {/* Ambient background */}
      <AmbientGlow color="accent" position="center" intensity="medium" />
      <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-green-500/5 rounded-full blur-[100px] pointer-events-none" />
      
      <GlassCard variant="elevated" className="w-full max-w-lg p-10 text-center relative overflow-hidden">
        {/* Inner glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none" />
        
        <div className="relative z-10">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 ring-1 ring-green-500/30">
            <CheckCircleIcon className="h-8 w-8 text-green-400" />
          </div>
          
          <GlassPill variant="success" className="mb-4">
            Payment complete
          </GlassPill>
          
          <h1 className="text-3xl font-bold text-white">You&apos;re in!</h1>
          
          <p className="mt-4 text-secondary leading-relaxed">
            Thanks for starting your plan. We&apos;ll email you a quick intake
            form to get your business details and launch your site in{" "}
            <span className="text-white font-medium">48 hours</span>.
          </p>
          
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/">
              <GlassButton variant="primary" size="lg" className="w-full group">
                <ArrowLeftIcon className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to home
              </GlassButton>
            </Link>
          </div>
          
          {/* Next steps */}
          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <p className="text-xs text-muted uppercase tracking-wider mb-3">What happens next</p>
            <div className="text-sm text-secondary space-y-2">
              <p>1. Check your email for the intake form</p>
              <p>2. Fill in your business details</p>
              <p>3. We build your site in 48h</p>
            </div>
          </div>
        </div>
      </GlassCard>
    </main>
  );
}
