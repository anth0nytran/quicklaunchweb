"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { GlassCard, AmbientGlow, GlassDivider } from "@/components/ui/glass";
import { useEventTracker } from "@/lib/analytics";

// =============================================================================
// Icons
// =============================================================================

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

// =============================================================================
// Testimonial Data
// =============================================================================

type Testimonial = {
  text: string;
  name: string;
  company: string;
  role: string;
  url: string;
  stat: string;
};

const testimonials: Testimonial[] = [
  {
    text: "was paying some seo guy 250 a month for a website that looked honestly like crap. zero calls from it. decided to go with Anthony because hes local and it was the best choice. he actually cared and worked with us 1:1 to get exactly what we wanted. dude was available 24/7 to answer questions. got 3 real jobs from google in the first month. highly recommend",
    name: "Jose",
    company: "Elite Home Repairs",
    role: "Home Remodeling · Houston, TX",
    url: "elitehomerepairs.us",
    stat: "3 new jobs from Google in 30 days",
  },
  {
    text: "really glad i found them. we were just doing word of mouth and facebook groups before. Anthony met with us 1 on 1 to figure out what we needed. now when people search pressure washing near me we actually show up. getting quote requests straight to my email every few days now without doing anything.",
    name: "Blake",
    company: "Made New Pressure Washing",
    role: "Pressure Washing · Houston, TX",
    url: "madenewpressurewashing.com",
    stat: "Ranking on Google in weeks",
  },
  {
    text: "we had a site but it didnt even have a way for people to call us from their phone easily... Anthony built us a whole new site in like 2 days. loved that hes local and actually cared about my business. phone definitely rings more now. should have just done this a year ago tbh.",
    name: "Juan",
    company: "JN Ornamental Design",
    role: "Fencing & Fabrication · Houston, TX",
    url: "jnornamentaldesign.com",
    stat: "40% more calls in week one",
  },
  {
    text: "man we were losing bids to guys doing worse work than us just cause their website looked better. customers judge u before they even call. Anthony worked with me 1:1 and was literally replying to me 24/7 to get the design exactly how I wanted. quicklaunch gave us a site that actually looks professional. closing way more people now",
    name: "David",
    company: "3D Fencing",
    role: "Fencing Contractor · Houston, TX",
    url: "3dfencing.com",
    stat: "Leads within the first week",
  },
  {
    text: "Tried making my own wix site and it was a mess. was honestly embarrassed to send it to homeowners. went with anthony cause hes local and u can tell he actually cares. turned it around in 2 days and it looks super clean. booked 4 solid painting jobs just from people finding the site so far",
    name: "Jamie",
    company: "AN Painting Renovations",
    role: "Painting & Renovation · Houston, TX",
    url: "anpaintingrenovations.com",
    stat: "4 jobs booked from website",
  },
  {
    text: "had absolutely nothing for my tree service just a facebook page. Anthony is the man, completely hands on 1:1 process and answered my texts 24/7. they built me a site that actually shows up when people search in baytown... went from basically invisible online to getting a few calls a week. best investment ive made for the business",
    name: "Cristian",
    company: "Jimenez Tree Pro",
    role: "Tree & Junk Removal · Baytown, TX",
    url: "jimeneztreepro.com",
    stat: "Calls every week from Google",
  },
  {
    text: "business was too up and down. good weeks then dead weeks. needed people to find us when they needed an electrician fast. Loved working with Anthony since he's local. he really took the time to understand what we needed 1:1. they set up the site with tap to call buttons and its been steady leads from google since",
    name: "Juan",
    company: "Landeros Electrical",
    role: "Electrical Contractor · Houston, TX",
    url: "landeroselectrical.com",
    stat: "Steady leads from Google",
  },
  {
    text: "In real estate everyone looks the same. needed something that made us look like top producers in our area. even though hes out of state, anthony felt like he was right down the street. incredible communication and super responsive 24/7. the site he built captures leads instantly instead of losing them to zillow. got 3 new listings directly from the site!",
    name: "Jack",
    company: "The Toro Group Corp",
    role: "Real Estate Team · San Dimas, CA",
    url: "soldbytoro.com",
    stat: "3 new listings from website",
  },
  {
    text: "our old site looked super cheap compared to the actual jewelry we sell... people literally told us that. Anthony worked with us 1:1 and he was so patient and actually cared about getting it perfect. definitely seeing more foot traffic from people finding us online first.",
    name: "Tomi",
    company: "Tomi Jewelry",
    role: "Jewelry Store · Houston, TX",
    url: "tomijewelry.com",
    stat: "More foot traffic from Google",
  },
  {
    text: "was running my whole business out of instagram DMs which was getting annoying. quick launch got me set up fast. was worried about hiring someone out of state but anthony was awesome. crazy communicative and basically available 24/7 whenever I had a question. we show up for local searches now and had 12 inquiries come in last month. process was super easy too",
    name: "Brian",
    company: "Becreativesco",
    role: "Marketing & Branding · Boston, MA",
    url: "becreativesco.com",
    stat: "12 new inquiries in 6 weeks",
  },
];

// =============================================================================
// Social Proof Section
// =============================================================================

export function SocialProofSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { track } = useEventTracker();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activePage, setActivePage] = useState(0);
  const [totalPages, setTotalPages] = useState(3);

  const checkScroll = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    const atEnd = scrollLeft >= scrollWidth - clientWidth - 10;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(!atEnd);

    // Calculate pages based on how many cards fit in view
    const cardWidth = scrollRef.current.firstElementChild
      ? (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 20
      : 390;
    const visibleCards = Math.floor(clientWidth / cardWidth);
    const pages = Math.ceil(testimonials.length / Math.max(visibleCards, 1));
    setTotalPages(pages);

    // Calculate active page
    if (atEnd) {
      setActivePage(pages - 1);
    } else {
      const currentCard = Math.round(scrollLeft / cardWidth);
      const page = Math.floor(currentCard / Math.max(visibleCards, 1));
      setActivePage(Math.min(page, pages - 1));
    }
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  const getCardWidth = () => {
    if (!scrollRef.current?.firstElementChild) return 390;
    return (scrollRef.current.firstElementChild as HTMLElement).offsetWidth + 20;
  };

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    if (direction === "right" && activePage < totalPages - 1) {
      scrollToPage(activePage + 1);
    } else if (direction === "left" && activePage > 0) {
      scrollToPage(activePage - 1);
    }
  };

  const scrollToPage = (page: number) => {
    if (!scrollRef.current) return;
    const { clientWidth, scrollWidth } = scrollRef.current;
    const cardWidth = getCardWidth();
    const visibleCards = Math.floor(clientWidth / cardWidth);
    if (page >= totalPages - 1) {
      // Last page — scroll to end
      scrollRef.current.scrollTo({ left: scrollWidth, behavior: "smooth" });
    } else {
      scrollRef.current.scrollTo({ left: page * visibleCards * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section id="work" className="relative pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden">
      <AmbientGlow color="white" position="center" intensity="subtle" className="opacity-30" />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-14 md:text-center px-6">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-white md:text-4xl">
              Don&apos;t Take Our Word For It. <span className="text-accent">See the Results.</span>
            </h2>
            <p className="mt-3 text-secondary">
              Real businesses. Real results. All built and launched in under 48 hours.
            </p>
          </div>
        </div>

        {/* Scroll container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-2 pl-6 pr-6 scrollbar-hide snap-x snap-mandatory scroll-pl-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="flex-none w-[320px] md:w-[370px] snap-start">
                <GlassCard className="p-6 h-full flex flex-col" hover>
                  {/* Stars + Stat */}
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex gap-0.5 shrink-0">
                      {[...Array(5)].map((_, j) => (
                        <StarIcon key={j} className="h-3.5 w-3.5 text-[#FBBC04]" />
                      ))}
                    </div>
                    <span className="text-[9px] font-semibold text-accent bg-accent/10 border border-accent/20 px-2 py-0.5 rounded-full uppercase tracking-wider leading-tight whitespace-nowrap">
                      {t.stat}
                    </span>
                  </div>

                  {/* Quote */}
                  <p className="text-sm text-secondary leading-relaxed italic mb-auto pb-5 flex-1">
                    &ldquo;{t.text}&rdquo;
                  </p>

                  {/* Attribution */}
                  <GlassDivider className="mb-4" />
                  <div className="flex items-center justify-between gap-3 min-w-0">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{t.name}</p>
                      <p className="text-xs text-muted mt-0.5 truncate">{t.role}</p>
                    </div>
                    <a
                      href={`https://${t.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        track("social_proof_clicked", {
                          item_name: t.company,
                          item_url: t.url,
                          item_index: i,
                          event_category: "engagement",
                          event_label: t.company,
                        });
                      }}
                      className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-hover transition-colors shrink-0 max-w-[45%]"
                    >
                      <span className="truncate">{t.company}</span>
                      <ArrowIcon className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                </GlassCard>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation — centered below cards */}
        <div className="flex items-center justify-center gap-3 mt-8 px-6">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className="h-10 w-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-default disabled:hover:text-muted disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.03] transition-all duration-200"
            aria-label="Scroll left"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scroll position dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToPage(i)}
                style={{
                  width: i === activePage ? 24 : 8,
                  height: 8,
                  borderRadius: 9999,
                  backgroundColor: i === activePage ? "rgb(20, 184, 166)" : "rgba(255,255,255,0.2)",
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s ease",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (i !== activePage) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.4)";
                }}
                onMouseLeave={(e) => {
                  if (i !== activePage) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.2)";
                }}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className="h-10 w-10 rounded-full border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted hover:text-white hover:border-white/[0.15] hover:bg-white/[0.06] disabled:opacity-20 disabled:cursor-default disabled:hover:text-muted disabled:hover:border-white/[0.08] disabled:hover:bg-white/[0.03] transition-all duration-200"
            aria-label="Scroll right"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
