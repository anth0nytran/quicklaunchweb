import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, AmbientGlow } from "@/components/ui/glass";

export default function PrivacyPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Legal</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Privacy Policy</h1>
            <p className="mt-3 text-sm text-secondary">
              This policy explains how we collect and use information.
            </p>
          </div>
          <Link href="/">
            <GlassButton variant="ghost" size="md" className="w-full md:w-auto">
              Back to home
            </GlassButton>
          </Link>
        </div>

        <GlassCard variant="elevated" className="p-6 md:p-10">
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-5 text-sm text-secondary md:grid md:grid-cols-2 md:gap-6">
            <div className="space-y-2">
              <p><span className="text-white font-medium">Effective Date:</span> October 2025</p>
              <p><span className="text-white font-medium">Owner/Operator:</span> Anthony Tran (QuickLaunchWeb, we, us)</p>
            </div>
            <div className="mt-4 space-y-2 md:mt-0">
              <p><span className="text-white font-medium">Website:</span> quicklaunchweb.com</p>
              <p><span className="text-white font-medium">Contact:</span> anthotranllc@gmail.com</p>
            </div>
          </div>

          <GlassDivider className="my-8" />

          <div className="space-y-10 text-sm text-secondary leading-relaxed">
            <section>
              <h2 className="text-base font-semibold text-white">1) Information We Collect</h2>
              <p className="mt-3">We may collect information in the following ways:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Information you submit through forms (name, email, phone, business details)</li>
                <li>Onboarding details you provide (services, city, photos, and content)</li>
                <li>Basic website usage data (page views, device/browser) via analytics tools</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">2) How We Use Information</h2>
              <p className="mt-3">We use collected information to:</p>
              <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-white/30">
                <li>Provide and manage our Services</li>
                <li>Communicate about onboarding, updates, and support</li>
                <li>Process payments and subscription billing</li>
                <li>Improve our website and customer experience</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">3) Analytics + Cookies</h2>
              <p className="mt-3">
                We may use tools such as Umami analytics and/or Google Analytics to understand website traffic.
                These tools may use cookies or similar technologies depending on configuration.
              </p>
              <p className="mt-3">
                You can disable cookies through your browser settings, but parts of the website may not function properly.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">4) Sharing Your Information</h2>
              <p className="mt-3">
                We do not sell your personal information. We may share information with trusted service
                providers only as needed to operate our services (e.g., payment processing, hosting,
                analytics).
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">5) Data Security</h2>
              <p className="mt-3">
                We take reasonable steps to protect information, but no system is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">6) Your Choices</h2>
              <p className="mt-3">
                You may request access, correction, or deletion of your personal information by contacting:
                anthotranllc@gmail.com
              </p>
            </section>

            <section>
              <h2 className="text-base font-semibold text-white">7) Contact</h2>
              <p className="mt-3">Questions about this Privacy Policy? Email: anthotranllc@gmail.com</p>
            </section>
          </div>
        </GlassCard>
      </div>
    </main>
  );
}
