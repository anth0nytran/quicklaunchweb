import Link from "next/link";

export default function SuccessPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-5 py-16 text-white">
      <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-white/60">
          Payment complete
        </p>
        <h1 className="mt-4 text-3xl font-semibold">You&apos;re in!</h1>
        <p className="mt-3 text-sm text-white/70">
          Thanks for starting your plan. We&apos;ll email you a quick intake
          form to get your business details and launch your site in 48 hours.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
