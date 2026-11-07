"use client";

// Keyboard users can jump past the header. Targets #main-content if a page has it,
// otherwise the first <main> on the page.
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      onClick={(e) => {
        const target =
          document.getElementById("main-content") || document.querySelector<HTMLElement>("main");
        if (!target) return;
        e.preventDefault();
        if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start" });
      }}
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-lg focus:bg-[#0866FF] focus:px-4 focus:py-2 focus:text-[14px] focus:font-semibold focus:text-white focus:outline-none focus:ring-2 focus:ring-white"
    >
      Skip to main content
    </a>
  );
}
