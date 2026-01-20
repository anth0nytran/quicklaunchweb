"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import { GlassCard, GlassButton, GlassDivider, GlassInput, AmbientGlow } from "@/components/ui/glass";

type SupportForm = {
  name: string;
  email: string;
  message: string;
};

const createEmptySupportForm = (): SupportForm => ({
  name: "",
  email: "",
  message: "",
});

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export default function SupportPage() {
  const [supportForm, setSupportForm] = useState<SupportForm>(createEmptySupportForm());
  const [supportLoading, setSupportLoading] = useState(false);
  const [supportError, setSupportError] = useState("");
  const [supportSuccess, setSupportSuccess] = useState("");

  const submitSupportRequest = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSupportError("");
    setSupportSuccess("");

    const name = supportForm.name.trim();
    const email = supportForm.email.trim().toLowerCase();
    const message = supportForm.message.trim();

    if (!name || !email || !message) {
      setSupportError("Please include your name, email, and message.");
      return;
    }

    if (!isValidEmail(email)) {
      setSupportError("Please enter a valid email address.");
      return;
    }

    setSupportLoading(true);
    setSupportSuccess("Sending....");
    
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      // Use web3forms to send email
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_SUPPORT_ACCESS_KEY;
      if (!accessKey) {
        throw new Error("Web3Forms access key is not configured.");
      }

      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("subject", "Support Request - QuickLaunchWeb");

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(data?.message || `Server error (${res.status})`);
      }

      setSupportSuccess("Form Submitted Successfully");
      setSupportForm(createEmptySupportForm());
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setSupportError("Request timed out. Please try again.");
        } else {
          setSupportError(error.message || "Failed to send request. Please try again.");
        }
      } else {
        setSupportError("An unexpected error occurred. Please try again.");
      }
      console.error("Support request error:", error);
    } finally {
      setSupportLoading(false);
    }
  }, [supportForm]);

  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="dots" mask="fade-center" size={32} fill="rgba(255,255,255,0.03)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-20" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-wider text-muted">Support</p>
            <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">Support Request</h1>
            <p className="mt-3 text-sm text-secondary text-balance max-w-lg">
              Tell us what you need and we&apos;ll follow up quickly.
            </p>
            <p className="mt-2 text-xs text-muted">Typical response: 1 business day.</p>
          </div>
          <Link href="/">
            <GlassButton variant="ghost" size="md" className="w-full md:w-auto">
              Back to home
            </GlassButton>
          </Link>
        </div>

        <GlassCard variant="elevated" className="p-6 md:p-10">
          <div className="grid gap-4 text-xs text-muted md:grid-cols-2">
            <div>
              <p className="uppercase tracking-wider text-white/50">Email</p>
              <p className="mt-1 text-sm text-white/90">anthotranllc@gmail.com</p>
            </div>
            <div>
              <p className="uppercase tracking-wider text-white/50">Support Hours</p>
              <p className="mt-1 text-sm text-white/90">Mon–Fri, 9am–6pm CST</p>
            </div>
          </div>
          <GlassDivider className="my-6" />
          <form
            className="space-y-3"
            onSubmit={submitSupportRequest}
          >
            <GlassInput
              type="text"
              value={supportForm.name}
              onChange={(e) =>
                setSupportForm((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Name"
            />
            <GlassInput
              type="email"
              value={supportForm.email}
              onChange={(e) =>
                setSupportForm((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email"
            />
            <textarea
              value={supportForm.message}
              onChange={(e) =>
                setSupportForm((prev) => ({ ...prev, message: e.target.value }))
              }
              placeholder="How can we help?"
              rows={4}
              className="w-full rounded-xl border bg-white/[0.03] backdrop-blur-sm px-4 py-3 text-sm text-white placeholder:text-white/30 border-white/[0.08] hover:border-white/[0.15] focus:border-accent/50 focus:bg-white/[0.05] focus:outline-none focus:ring-2 focus:ring-accent/20 focus:ring-offset-0 transition-all duration-200 ease-smooth"
            />

            {supportError && (
              <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {supportError}
              </div>
            )}
            {supportSuccess && (
              <div className="rounded-lg border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                {supportSuccess}
              </div>
            )}

            <GlassDivider className="my-4" />

            <GlassButton
              variant="secondary"
              size="lg"
              type="submit"
              loading={supportLoading}
              className="w-full"
            >
              Submit Support Request
            </GlassButton>
          </form>
        </GlassCard>
      </div>
    </main>
  );
}
