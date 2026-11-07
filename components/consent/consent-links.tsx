"use client";

import { openConsentPreferences } from "@/lib/consent";

/** Button that reopens the cookie / privacy choices panel. Safe to drop into server components. */
export function ConsentSettingsButton({
  children = "Cookie settings",
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <button type="button" onClick={() => openConsentPreferences()} className={className}>
      {children}
    </button>
  );
}

/** Footer pair: "Cookie settings" + "Your Privacy Choices" (US state-law opt-out of sale/share). */
export function ConsentFooterLinks({ className = "" }: { className?: string }) {
  return (
    <>
      <ConsentSettingsButton className={className}>Cookie settings</ConsentSettingsButton>
      <ConsentSettingsButton className={className}>
        Your Privacy Choices / Do Not Sell or Share My Personal Information
      </ConsentSettingsButton>
    </>
  );
}
