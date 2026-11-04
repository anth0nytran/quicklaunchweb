"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import {
  Eyebrow,
  IconTile,
  KitIcon,
  bodyText,
  card,
  container,
  focusRing,
  outlineBtn,
  pageH1,
  primaryBtn,
} from "@/components/brand/primitives";
import { usePageTracker, useFormTracker } from "@/lib/analytics";

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

const inputClass =
  "w-full rounded-xl border border-[#E5EDF6] bg-white px-4 py-3.5 text-[16px] text-[#07143F] placeholder:text-[#46516B]/60 transition-colors hover:border-[#0866FF]/40 focus:border-[#0866FF] focus:outline-none focus:ring-4 focus:ring-[#0866FF]/15";
const labelClass = "mb-1.5 block text-[14px] font-semibold text-[#07143F]";

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

export default function SupportPage() {
  // Analytics tracking
  usePageTracker('QuickLaunchWeb - Support', 'support');
  const { trackFormStart, trackFormSubmit, trackFormError } = useFormTracker('support', 'support_page');

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
      const errorMsg = "Please include your name, email, and message.";
      setSupportError(errorMsg);
      trackFormError(errorMsg);
      return;
    }

    if (!isValidEmail(email)) {
      const errorMsg = "Please enter a valid email address.";
      setSupportError(errorMsg);
      trackFormError(errorMsg);
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

      // Track successful form submission
      trackFormSubmit();

      setSupportSuccess("Form Submitted Successfully");
      setSupportForm(createEmptySupportForm());
    } catch (error) {
      let errorMsg = "An unexpected error occurred. Please try again.";
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          errorMsg = "Request timed out. Please try again.";
        } else {
          errorMsg = error.message || "Failed to send request. Please try again.";
        }
      }
      setSupportError(errorMsg);
      trackFormError(errorMsg);
      console.error("Support request error:", error);
    } finally {
      setSupportLoading(false);
    }
  }, [supportForm]);

  return (
    <BrandShell>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pb-14 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="max-w-3xl">
            <Eyebrow>Support</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>Support Request</h1>
            <p className={`mt-4 max-w-[36rem] ${bodyText}`}>
              Tell us what you need and we&apos;ll follow up quickly.
            </p>
            <p className="mt-2 text-[14px] font-medium text-[#46516B]">Typical response: 1 business day.</p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={`${container} grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-10`}>
          <div className="space-y-4">
            <a
              href="mailto:anthotranllc@gmail.com"
              className={`${card} group flex items-start gap-4 p-5 transition-colors hover:border-[#0866FF]/40 sm:p-6 ${focusRing}`}
            >
              <IconTile name="mail" />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Email</p>
                <p className="mt-1 break-words text-[17px] font-bold text-[#07143F] group-hover:text-[#0866FF]">
                  anthotranllc@gmail.com
                </p>
              </div>
            </a>
            <div className={`${card} flex items-start gap-4 p-5 sm:p-6`}>
              <IconTile name="clock" />
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Support Hours</p>
                <p className="mt-1 text-[17px] font-bold text-[#07143F]">Mon-Fri, 9am-6pm CST</p>
              </div>
            </div>
            <div className={`${card} flex items-start gap-4 p-5 sm:p-6`}>
              <IconTile name="message" />
              <div>
                <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">Typical Response</p>
                <p className="mt-1 text-[17px] font-bold text-[#07143F]">1 business day</p>
              </div>
            </div>
            <Link href="/" className={`${outlineBtn} w-full px-6 py-3.5 text-[15px] sm:w-auto`}>
              Back to home
            </Link>
          </div>

          <div className={`${card} p-5 sm:p-8`}>
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#07143F] sm:text-[26px]">Send us a message</h2>
            <p className="mt-1.5 text-[15px] text-[#46516B]">We&apos;ll reply by email.</p>
            <form className="mt-6 space-y-4" onSubmit={submitSupportRequest}>
              <div>
                <label htmlFor="support-name" className={labelClass}>Name</label>
                <input
                  id="support-name"
                  type="text"
                  autoComplete="name"
                  value={supportForm.name}
                  onChange={(e) =>
                    setSupportForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  onFocus={trackFormStart}
                  placeholder="Name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="support-email" className={labelClass}>Email</label>
                <input
                  id="support-email"
                  type="email"
                  autoComplete="email"
                  value={supportForm.email}
                  onChange={(e) =>
                    setSupportForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Email"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="support-message" className={labelClass}>Message</label>
                <textarea
                  id="support-message"
                  value={supportForm.message}
                  onChange={(e) =>
                    setSupportForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  placeholder="How can we help?"
                  rows={5}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {supportError && (
                <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[15px] text-red-700">
                  {supportError}
                </div>
              )}
              {supportSuccess && (
                <div role="status" className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-[15px] text-green-700">
                  {supportSuccess}
                </div>
              )}

              <button
                type="submit"
                disabled={supportLoading}
                className={`${primaryBtn} w-full px-7 py-4 text-[16px] disabled:cursor-not-allowed disabled:opacity-70`}
              >
                {supportLoading ? "Sending..." : "Submit Support Request"}
                {!supportLoading && (
                  <KitIcon name="arrow-right" white className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                )}
              </button>
            </form>
          </div>
        </div>
      </section>
    </BrandShell>
  );
}

