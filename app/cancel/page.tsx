import Link from "next/link";

export default function CancelPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-16 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Checkout canceled
        </p>
        <h1 className="mt-4 text-3xl font-semibold">No worries.</h1>
        <p className="mt-3 text-sm text-white/70">
          If you still want a site in 48 hours, you can restart your plan
          whenever you&apos;re ready.
        </p>
        <Link
          href="/#pricing"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          View pricing
        </Link>
      </div>
    </main>
  );
}
