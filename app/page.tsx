"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";

type Plan = "starter" | "pro";

type AddOns = {
  hasDomain: boolean | null;
  domainRouting: "us" | "self" | null;
  textAlerts: boolean;
  unlimitedEdits: boolean;
  googleBoost: boolean;
};

// =============================================================================
// Validation Helpers
// =============================================================================

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

// --- Components ---

function XIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17 8l4 4m0 0l-4 4m4-4H3"
      />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="none"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ChevronDownIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function HomePage() {
  const [loadingPlan, setLoadingPlan] = useState<Plan | null>(null);
  const [checkoutError, setCheckoutError] = useState("");
  const [portalLoading, setPortalLoading] = useState(false);
  const [portalEmail, setPortalEmail] = useState("");
  const [portalError, setPortalError] = useState("");
  
  // Upsell Modal State
  const [showUpsellModal, setShowUpsellModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [addOns, setAddOns] = useState<AddOns>({
    hasDomain: null,
    domainRouting: null,
    textAlerts: false,
    unlimitedEdits: false,
    googleBoost: false,
  });
  // const [scrolled, setScrolled] = useState(false); // Removed unused state

  // useEffect(() => {
  //   const handleScroll = () => setScrolled(window.scrollY > 50);
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  const year = useMemo(() => new Date().getFullYear(), []);

  // Open upsell modal instead of going directly to checkout
  const openUpsellModal = (plan: Plan) => {
    setSelectedPlan(plan);
    setAddOns({
      hasDomain: null,
      domainRouting: null,
      textAlerts: false,
      unlimitedEdits: false,
      googleBoost: false,
    });
    setShowUpsellModal(true);
  };

  // Calculate monthly total based on selections
  const calculateTotal = () => {
    const basePrices = { starter: 99, pro: 149 };
    let monthly = selectedPlan ? basePrices[selectedPlan] : 0;
    
    if (addOns.textAlerts) monthly += 29;
    if (addOns.unlimitedEdits) monthly += 99;
    
    let oneTime = addOns.googleBoost ? 199 : 0;
    if (addOns.domainRouting === "us") oneTime += 99; // $99 flat fee to connect domain
    const domainFee = addOns.hasDomain === false ? 50 : 0; // $50/year domain
    
    return { monthly, oneTime, domainFee };
  };

  // Proceed to Stripe checkout with add-ons
  const startCheckout = useCallback(async (plan: Plan) => {
    setLoadingPlan(plan);
    setCheckoutError("");

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const res = await fetch(`/api/stripe/checkout?plan=${plan}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ addOns }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Server error (${res.status})`);
      }

      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Invalid checkout response.");
      }

      // Redirect to Stripe
      window.location.href = data.url;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setCheckoutError("Request timed out. Please try again.");
        } else {
          setCheckoutError(error.message);
        }
      } else {
        setCheckoutError("An unexpected error occurred. Please try again.");
      }
      console.error("Checkout error:", error);
    } finally {
      setLoadingPlan(null);
    }
  }, [addOns]);

  const handleUpsellContinue = useCallback(() => {
    setCheckoutError("");
    
    if (addOns.hasDomain === null) {
      setCheckoutError("Please select whether you have a domain.");
      return;
    }
    if (addOns.hasDomain && addOns.domainRouting === null) {
      setCheckoutError("Please select who will handle domain routing.");
      return;
    }
    if (selectedPlan) {
      setShowUpsellModal(false);
      startCheckout(selectedPlan);
    }
  }, [addOns.hasDomain, addOns.domainRouting, selectedPlan, startCheckout]);

  const startPortal = useCallback(async () => {
    setPortalError("");
    const email = portalEmail.trim().toLowerCase();

    if (!email) {
      setPortalError("Enter the email you used at checkout.");
      return;
    }

    if (!isValidEmail(email)) {
      setPortalError("Please enter a valid email address.");
      return;
    }

    setPortalLoading(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

      const res = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || `Server error (${res.status})`);
      }

      if (!data?.url || typeof data.url !== "string") {
        throw new Error("Invalid portal response.");
      }

      window.location.href = data.url;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === "AbortError") {
          setPortalError("Request timed out. Please try again.");
        } else {
          setPortalError(error.message);
        }
      } else {
        setPortalError("An unexpected error occurred. Please try again.");
      }
      console.error("Portal error:", error);
    } finally {
      setPortalLoading(false);
    }
  }, [portalEmail]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white selection:bg-orange-500/30 font-sans">
      {/* Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 py-6">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 rounded-2xl bg-black/50 backdrop-blur-md border border-white/5 py-4 shadow-lg shadow-black/20">
          <div className="flex items-center gap-1 font-bold tracking-tight">
            <span className="text-orange-500 font-black text-lg">QL</span>
            <span className="text-white/30 font-light">|</span>
            <span className="text-white">QuickLaunchWeb</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-white transition-colors">How it Works</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-white transition-colors">FAQ</Link>
          </nav>

          <button
            onClick={() => openUpsellModal("starter")}
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-orange-500 hover:text-white hover:scale-105 active:scale-95"
          >
            Start Now
          </button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex flex-col items-center justify-center overflow-hidden px-6 pb-24 pt-32 md:pb-32 md:pt-48">
          <BGPattern variant="dots" mask="fade-center" size={24} fill="rgba(255,255,255,0.08)" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-orange-400 backdrop-blur-md mb-8 hover:bg-white/10 transition-colors">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Accepting New Clients for {new Date().toLocaleString('default', { month: 'long' })}
            </div>

            <h1 className="mx-auto max-w-4xl text-center text-5xl font-bold tracking-tighter text-white sm:text-7xl lg:text-8xl text-balance drop-shadow-2xl">
              Free Website. <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Live in 48h.</span>
            </h1>
            
            <p className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/60 md:text-xl text-balance">
              We build it free. You just pay <span className="text-white font-medium">$99/mo</span> for hosting + support. <br className="hidden md:block"/>
              Cancel anytime. No contracts.
            </p>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
              <button
                onClick={() => openUpsellModal("starter")}
                className="group flex items-center gap-2 rounded-full bg-orange-500 px-8 py-4 text-base font-semibold text-black transition-all hover:bg-orange-400 hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/25"
              >
                {loadingPlan === "starter" ? "Processing..." : "Get My Free Website"}
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <Link
                href="#pricing"
                className="rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-semibold text-white transition hover:bg-white/10"
              >
                See Plans
              </Link>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center gap-6 md:gap-12">
               {[
                 { value: "FREE", label: "Website Build" },
                 { value: "48h", label: "Launch Time" },
                 { value: "$99", label: "/mo Hosting" },
                 { value: "∞", label: "Cancel Anytime" },
               ].map((stat) => (
                  <div key={stat.label} className="text-center">
                     <p className="text-2xl md:text-3xl font-bold text-orange-500">{stat.value}</p>
                     <p className="text-xs text-white/50 uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
               ))}
            </div>
          </div>
        </section>

        {/* Value Props Grid */}
        <section id="features" className="relative border-t border-white/5 bg-neutral-950 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Built to convert <span className="text-orange-500">clicks into calls</span>.
              </h2>
              <p className="mt-4 text-lg text-white/60 md:mx-auto md:max-w-2xl">
                We don&apos;t just build websites; we build revenue engines. 
                Every site is optimized for speed, SEO, and lead generation.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  title: "Mobile First Design",
                  desc: "Your site will look perfect on every device. 60%+ of traffic is mobile — we prioritize it.",
                  icon: (
                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                  )
                },
                {
                  title: "Lightning Fast",
                  desc: "Slow sites lose customers. We build on Next.js for sub-second load times.",
                  icon: (
                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  )
                },
                {
                  title: "SEO Optimized",
                  desc: "We include proper meta tags, headings, and semantic HTML so Google finds you.",
                  icon: (
                    <svg className="h-6 w-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  )
                }
              ].map((feature, i) => (
                <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:bg-white/10 hover:-translate-y-1">
                  <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500/10 group-hover:bg-orange-500/20 transition-colors">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-white/60 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="relative bg-black px-6 py-24 md:py-32">
          <BGPattern variant="dots" mask="fade-center" size={24} fill="rgba(255,255,255,0.08)" />
          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                  From zero to live in <br/>
                  <span className="text-white/40">three simple steps.</span>
                </h2>
                <div className="mt-12 space-y-12">
                  {[
                    {
                      step: "01",
                      title: "Subscribe & Start",
                      desc: "Choose your plan and complete checkout. No setup fees, no hidden costs."
                    },
                    {
                      step: "02",
                      title: "Send Us Details",
                      desc: "Fill out a simple form with your services, photos, and contact info."
                    },
                    {
                      step: "03",
                      title: "Launch in 48 Hours",
                      desc: "We build, polish, and launch your site. You start getting calls."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 text-lg font-bold text-white shadow-inner shadow-white/5">
                        {item.step}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                        <p className="mt-2 text-white/60">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative rounded-3xl border border-white/10 bg-neutral-900/50 p-3 shadow-2xl">
                 <div className="aspect-[4/5] w-full rounded-2xl bg-neutral-950 overflow-hidden relative group">
                    {/* Abstract animated gradient background */}
                    <div className="absolute inset-0 z-0 bg-gradient-to-br from-orange-500/10 via-transparent to-white/5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.15),transparent_50%)]" />
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.05),transparent_50%)]" />
                    </div>
                    
                    {/* Simulated browser frame */}
                    <div className="absolute inset-x-6 top-6 bottom-0 rounded-t-xl bg-neutral-900/80 border-t border-l border-r border-white/10 overflow-hidden backdrop-blur-sm">
                       <div className="h-10 border-b border-white/5 flex items-center px-4 gap-2 bg-neutral-950/50">
                          <div className="h-2.5 w-2.5 rounded-full bg-red-500/40"/>
                          <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/40"/>
                          <div className="h-2.5 w-2.5 rounded-full bg-green-500/40"/>
                          <div className="flex-1 mx-4">
                            <div className="h-5 bg-white/5 rounded-full max-w-[180px]" />
                          </div>
                       </div>
                       <div className="p-6 space-y-4">
                          <div className="h-6 w-2/3 rounded bg-white/5 animate-pulse"/>
                          <div className="h-24 w-full rounded-lg bg-white/5"/>
                          <div className="grid grid-cols-2 gap-3">
                             <div className="h-16 rounded bg-white/5"/>
                             <div className="h-16 rounded bg-white/5"/>
                          </div>
                          <div className="h-10 w-1/2 rounded-full bg-orange-500/20"/>
                       </div>
                    </div>

                    {/* Floating success card */}
                    <div className="absolute bottom-8 right-4 left-4 rounded-xl border border-white/10 bg-black/80 backdrop-blur-md p-5 shadow-2xl transform transition-all duration-500 hover:scale-105">
                       <div className="flex items-center gap-4">
                          <div className="h-11 w-11 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 ring-1 ring-green-500/50">
                             <CheckIcon className="h-5 w-5"/>
                          </div>
                          <div className="flex-1">
                             <p className="text-sm font-medium text-white/90">Website Launched</p>
                             <div className="flex items-center gap-2 mt-1">
                               <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                               <p className="text-xs text-white/60 font-mono">yourbusiness.com</p>
                             </div>
                          </div>
                          <div className="px-2 py-1 rounded bg-white/10 text-[10px] text-white/50 font-medium">
                            Live
                          </div>
                       </div>
                       
                       <div className="mt-5 grid grid-cols-2 gap-3">
                          <div className="rounded-lg bg-white/5 p-3 text-center">
                             <p className="text-[10px] text-white/40 uppercase tracking-wider">Speed</p>
                             <p className="mt-1 text-lg font-semibold text-white">99</p>
                          </div>
                          <div className="rounded-lg bg-white/5 p-3 text-center">
                             <p className="text-[10px] text-white/40 uppercase tracking-wider">SEO</p>
                             <p className="mt-1 text-lg font-semibold text-white">100</p>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="relative border-t border-white/5 bg-neutral-950 px-6 py-24 md:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 md:text-center">
              <p className="text-sm font-medium text-orange-500 uppercase tracking-wider mb-4">Stop paying $1,000+ upfront</p>
              <h2 className="text-3xl font-bold tracking-tight text-white md:text-5xl">
                Free website. Just pay hosting.
              </h2>
              <p className="mt-4 text-lg text-white/60 max-w-2xl mx-auto">
                Most designers charge $500–$2,000 upfront. We don&apos;t. Monthly fee covers hosting, maintenance, and keeping your site converting.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
              {/* Starter Plan */}
              <div className="relative flex flex-col rounded-3xl border border-white/10 bg-black p-8 shadow-2xl transition hover:border-white/20">
                <div className="mb-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider">1-Page Site</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Starter</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-white/40 line-through">$799</span>
                    <span className="text-xs text-orange-500 font-medium">FREE BUILD</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">$99</span>
                    <span className="text-white/60">/mo</span>
                  </div>
                  <p className="mt-3 text-sm text-white/50">Hosting + support. Cancel anytime.</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Mobile-first design
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Click-to-call button
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Quote request form → your email
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Hosting + SSL included
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Basic SEO setup
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    1 revision included
                  </li>
                </ul>

                <button
                  onClick={() => openUpsellModal("starter")}
                  className="w-full rounded-full border border-white/20 py-4 text-sm font-semibold text-white transition hover:bg-white hover:text-black hover:border-white"
                >
                   {loadingPlan === "starter" ? "Processing..." : "Start Free Build"}
                </button>
              </div>

              {/* Pro Plan */}
              <div className="relative flex flex-col rounded-3xl border border-orange-500/50 bg-neutral-900/80 p-8 shadow-2xl shadow-orange-500/10 backdrop-blur-sm">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-xs font-bold uppercase tracking-wider text-black">
                  Best Value
                </div>
                
                <div className="mb-6">
                  <p className="text-xs text-white/40 uppercase tracking-wider">3-Page Site</p>
                  <h3 className="text-xl font-semibold text-white mt-1">Pro</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="text-sm text-white/40 line-through">$1,499</span>
                    <span className="text-xs text-orange-500 font-medium">FREE BUILD</span>
                  </div>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-5xl font-bold text-white">$149</span>
                    <span className="text-white/60">/mo</span>
                  </div>
                  <p className="mt-3 text-sm text-white/50">Hosting + support. Cancel anytime.</p>
                </div>

                <ul className="mb-8 flex-1 space-y-3 text-sm text-white/80">
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    <span><span className="font-semibold text-white">3 pages:</span> Home / Services / Contact</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Service details + gallery
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Click-to-call + quote form
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Hosting + SSL included
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Advanced SEO setup
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckIcon className="h-5 w-5 text-orange-500 shrink-0" />
                    Priority support
                  </li>
                </ul>

                <button
                  onClick={() => openUpsellModal("pro")}
                  className="w-full rounded-full bg-orange-500 py-4 text-sm font-semibold text-black transition hover:bg-orange-400 transform hover:scale-[1.02]"
                >
                  {loadingPlan === "pro" ? "Processing..." : "Start Free Build"}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="relative bg-black px-6 py-24">
          <BGPattern variant="dots" mask="fade-center" size={24} fill="rgba(255,255,255,0.08)" />
          <div className="relative z-10 mx-auto max-w-3xl">
            <h2 className="mb-12 text-center text-3xl font-bold text-white">
              Questions & Objections
            </h2>
            <div className="space-y-3">
              {[
                {
                  q: "Is this actually free?",
                  a: "The build is free. You pay $99/mo for hosting + support. Most designers charge $500–$2,000 upfront — we don't."
                },
                {
                  q: "Why is it monthly instead of one-time?",
                  a: "Monthly covers hosting, maintenance, updates, and keeping your site converting. No big upfront cost, no surprise fees."
                },
                {
                  q: "What if I cancel?",
                  a: "Cancel anytime. Site stays live until end of billing period. No penalties, no contracts."
                },
                {
                  q: "Do I own the website?",
                  a: "It's a service — cancel and it goes offline. Want full ownership? We offer a buyout option."
                },
                {
                  q: "How fast will my site be live?",
                  a: "48 hours after you submit your business info."
                },
                {
                  q: "What if I need changes?",
                  a: "1 revision included. Extra edits available as add-ons."
                },
                {
                  q: "Can I use my own domain?",
                  a: "Yes. If you want us to connect it for you, there's a flat $99 setup fee. Or you can point it yourself for free."
                }
              ].map((item, i) => (
                <details key={i} className="group rounded-xl border border-white/10 bg-white/5 transition-colors open:bg-white/10">
                  <summary className="flex cursor-pointer items-center justify-between p-5 font-medium text-white text-sm">
                    {item.q}
                    <ChevronDownIcon className="h-4 w-4 text-white/40 transition-transform group-open:rotate-180 shrink-0 ml-4" />
                  </summary>
                  <div className="px-5 pb-5 text-sm text-white/60">
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-white/10 bg-black py-16 text-sm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
               <div className="flex items-center gap-1 font-bold tracking-tight mb-4">
                  <span className="text-orange-500 font-black">QL</span>
                  <span className="text-white/30 font-light">|</span>
                  <span className="text-white">QuickLaunchWeb</span>
               </div>
               <p className="max-w-xs text-white/50">
                 Helping local businesses win online with high-converting, mobile-first websites.
               </p>
            </div>
            
            <div>
              <h4 className="mb-4 font-semibold text-white">Links</h4>
              <ul className="space-y-3 text-white/50">
                <li><Link href="#features" className="hover:text-white">Features</Link></li>
                <li><Link href="#pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="#faq" className="hover:text-white">FAQ</Link></li>
              </ul>
            </div>

            <div>
               <h4 className="mb-4 font-semibold text-white">Customer Portal</h4>
               <p className="mb-4 text-xs text-white/50">Manage your subscription</p>
               <div className="flex flex-col gap-3">
                <input
                  type="email"
                  value={portalEmail}
                  onChange={(e) => setPortalEmail(e.target.value)}
                  placeholder="Billing Email"
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white placeholder:text-white/20 focus:border-orange-500 focus:outline-none"
                />
                <button
                  onClick={startPortal}
                  disabled={portalLoading}
                  className="rounded-lg bg-white/10 py-2 font-medium text-white hover:bg-white/20 disabled:opacity-50"
                >
                  {portalLoading ? "Loading..." : "Manage Subscription"}
                </button>
                {portalError && <p className="text-xs text-red-400">{portalError}</p>}
               </div>
            </div>
          </div>
          
          <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row text-white/40">
            <p>© {year} QuickLaunchWeb. All rights reserved.</p>
            <p>Made for speed.</p>
          </div>
        </div>
      </footer>

      {/* Upsell Modal */}
      {showUpsellModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-neutral-900 p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowUpsellModal(false)}
              className="absolute right-4 top-4 text-white/40 hover:text-white transition"
            >
              <XIcon className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-bold text-white mb-2">
              Customize Your {selectedPlan === "pro" ? "Pro" : "Starter"} Plan
            </h3>
            <p className="text-sm text-white/50 mb-6">
              Answer a quick question and choose any add-ons.
            </p>

            {/* Domain Question - Required */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white mb-3">
                Do you have your own domain? <span className="text-orange-500">*</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setAddOns({ ...addOns, hasDomain: true, domainRouting: null })}
                  className={`flex-1 rounded-lg border py-3 text-sm font-medium transition ${
                    addOns.hasDomain === true
                      ? "border-orange-500 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  Yes, I have one
                </button>
                <button
                  onClick={() => setAddOns({ ...addOns, hasDomain: false, domainRouting: null })}
                  className={`flex-1 rounded-lg border py-3 text-sm font-medium transition ${
                    addOns.hasDomain === false
                      ? "border-orange-500 bg-orange-500/10 text-orange-400"
                      : "border-white/10 bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  No, I need one
                </button>
              </div>
            </div>

            {/* Domain Routing - Only if they have domain */}
            {addOns.hasDomain === true && (
              <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-medium text-white mb-3">
                  Who will connect your domain? <span className="text-orange-500">*</span>
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => setAddOns({ ...addOns, domainRouting: "us" })}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      addOns.domainRouting === "us"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">We handle it</span>
                      <span className="text-blue-500 font-semibold">$99 one-time</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">One-time fee. We&apos;ll connect your domain for you.</p>
                  </button>
                  <button
                    onClick={() => setAddOns({ ...addOns, domainRouting: "self" })}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      addOns.domainRouting === "self"
                        ? "border-orange-500 bg-orange-500/10"
                        : "border-white/10 bg-white/5 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">I&apos;ll do it myself</span>
                      <span className="text-green-500 font-semibold">Free</span>
                    </div>
                    <p className="text-xs text-white/50 mt-1">We&apos;ll send you simple instructions.</p>
                  </button>
                </div>
              </div>
            )}

            {addOns.hasDomain === false && (
              <div className="mb-6 rounded-xl border border-orange-500/30 bg-orange-500/10 p-4">
                <p className="text-sm text-orange-300">
                  <span className="font-medium">We&apos;ll get you one!</span> Flat fee: <span className="text-white font-semibold">$50/year</span>. We&apos;ll pick the best available domain for your business and contact you if your first choice isn&apos;t available.
                </p>
              </div>
            )}

            {/* Add-ons */}
            <div className="mb-6">
              <p className="text-sm font-medium text-white mb-3">Optional Add-ons</p>
              <div className="space-y-2">
                {/* Text Alerts */}
                <button
                  onClick={() => setAddOns({ ...addOns, textAlerts: !addOns.textAlerts })}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    addOns.textAlerts
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">Instant Text Alerts</span>
                    <span className="text-orange-500 font-semibold">+$29/mo</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Every lead texts your phone instantly.</p>
                </button>

                {/* Unlimited Edits */}
                <button
                  onClick={() => setAddOns({ ...addOns, unlimitedEdits: !addOns.unlimitedEdits })}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    addOns.unlimitedEdits
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">Unlimited Small Edits</span>
                    <span className="text-orange-500 font-semibold">+$99/mo</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Change prices, swap photos, update services anytime.</p>
                </button>

                {/* Google Boost */}
                <button
                  onClick={() => setAddOns({ ...addOns, googleBoost: !addOns.googleBoost })}
                  className={`w-full rounded-lg border p-4 text-left transition ${
                    addOns.googleBoost
                      ? "border-orange-500 bg-orange-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-white">Google Business Boost</span>
                    <span className="text-blue-400 font-semibold">$199 one-time</span>
                  </div>
                  <p className="text-xs text-white/50 mt-1">Get your Google profile tightened so you rank better.</p>
                </button>
              </div>
            </div>

            {/* Total & Continue */}
            <div className="border-t border-white/10 pt-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/70">Monthly Total</span>
                <span className="text-2xl font-bold text-white">${calculateTotal().monthly}/mo</span>
              </div>
              {calculateTotal().domainFee > 0 && (
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span className="text-white/50">+ Domain (yearly)</span>
                  <span className="text-white/70">${calculateTotal().domainFee}/yr</span>
                </div>
              )}
              {calculateTotal().oneTime > 0 && (
                <div className="flex items-center justify-between mb-4 text-sm">
                  <span className="text-white/50">+ One-time</span>
                  <span className="text-white/70">${calculateTotal().oneTime}</span>
                </div>
              )}
              
              {/* Error Display */}
              {checkoutError && (
                <div className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                  {checkoutError}
                </div>
              )}
              
              <button
                onClick={handleUpsellContinue}
                disabled={loadingPlan !== null}
                className="w-full rounded-full bg-orange-500 py-4 text-base font-semibold text-black transition hover:bg-orange-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loadingPlan ? "Processing..." : "Continue to Checkout"}
              </button>
              <p className="text-xs text-white/40 text-center mt-3">
                You&apos;ll be redirected to Stripe for secure payment.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
