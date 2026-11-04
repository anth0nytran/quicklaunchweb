"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { KitIcon, focusRing } from "@/components/brand/primitives";
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
    text: "honestly the only reason i gave Anthony a shot was cause hes local. i trusted him and he made it happen. we started using their system with facebook ads and its been bringing in a solid amount of extra leads every month. best decision we made for the business.",
    name: "Juan",
    company: "JN Ornamental Design",
    role: "Fencing & Fabrication · Houston, TX",
    url: "jnornamentaldesign.com",
    stat: "Consistent new leads monthly",
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

  const navBtn = `flex h-11 w-11 items-center justify-center rounded-full border border-[#E5EDF6] bg-white text-[#07143F] shadow-sm transition-colors hover:border-[#0866FF] hover:bg-[#EFF8FF] hover:text-[#0866FF] disabled:cursor-default disabled:opacity-40 disabled:hover:border-[#E5EDF6] disabled:hover:bg-white disabled:hover:text-[#07143F] ${focusRing}`;

  return (
    <section id="work" className="relative scroll-mt-24 bg-white py-12 sm:py-20">
      <div className="relative">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-[1200px] px-4 text-center sm:px-6">
          <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#0866FF]">Recent Work</p>
          <h2 className="mt-3 text-[28px] font-extrabold leading-[1.15] tracking-[-0.03em] text-[#07143F] sm:text-[36px]">
            They turned it on. The calls started coming in.
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-[16px] leading-[1.5] text-[#46516B] sm:text-[18px]">
            Real businesses using this system. More calls, more reviews, more jobs.
          </p>
        </div>

        {/* Scroll container */}
        <div className="relative mx-auto max-w-[1200px]">
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory scroll-pl-4 gap-5 overflow-x-auto scroll-smooth px-4 pb-4 pt-1 sm:scroll-pl-6 sm:px-6"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {testimonials.map((t, i) => (
              <div key={i} className="w-[300px] flex-none snap-start sm:w-[340px] md:w-[370px]">
                <figure className="flex h-full flex-col rounded-xl border border-[#E5EDF6] bg-white p-6 shadow-[0_8px_30px_-14px_rgba(7,20,63,0.15)]">
                  {/* Stars + Stat */}
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <div className="flex shrink-0 gap-0.5" aria-label="5 out of 5 stars" role="img">
                      {[...Array(5)].map((_, j) => (
                        <StarIcon key={j} className="h-4 w-4 text-[#FBBC04]" />
                      ))}
                    </div>
                    <span className="whitespace-nowrap rounded-full bg-[#EFF8FF] px-2.5 py-1 text-[10px] font-semibold uppercase leading-tight tracking-wider text-[#0866FF]">
                      {t.stat}
                    </span>
                  </div>

                  {/* Quote */}
                  <div className="flex flex-1 gap-3 pb-5">
                    <KitIcon name="quote" className="mt-0.5 h-5 w-5 shrink-0 opacity-80" />
                    <blockquote className="text-[15px] leading-[1.6] text-[#46516B]">&ldquo;{t.text}&rdquo;</blockquote>
                  </div>

                  {/* Attribution */}
                  <figcaption className="flex min-w-0 items-center justify-between gap-3 border-t border-[#E5EDF6] pt-4">
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#0866FF] text-base font-bold text-white">
                        {t.name.charAt(0)}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-bold text-[#07143F]">{t.name}</p>
                        <p className="mt-0.5 truncate text-[13px] text-[#46516B]">{t.role}</p>
                      </div>
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
                      className={`flex max-w-[45%] shrink-0 items-center gap-1.5 rounded text-[13px] font-semibold text-[#0866FF] hover:text-[#0753CF] ${focusRing}`}
                    >
                      <span className="truncate">{t.company}</span>
                      <ArrowIcon className="h-3.5 w-3.5 shrink-0" />
                      <span className="sr-only">(opens in a new tab)</span>
                    </a>
                  </figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation — centered below cards */}
        <div className="mt-6 flex items-center justify-center gap-3 px-4">
          <button type="button" onClick={() => scroll("left")} disabled={!canScrollLeft} className={navBtn} aria-label="Scroll left">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Scroll position dots */}
          <div className="flex items-center gap-0">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                type="button"
                key={i}
                onClick={() => scrollToPage(i)}
                className={`group flex h-11 w-9 shrink-0 items-center justify-center rounded-full ${focusRing}`}
                aria-label={`Go to page ${i + 1}`}
                aria-current={i === activePage ? "true" : undefined}
              >
                <span
                  className="h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-x-[1.8]"
                  style={{
                    backgroundColor: i === activePage ? "#0866FF" : "#C9D6E8",
                    transform: i === activePage ? "scaleX(3)" : "scaleX(1)",
                  }}
                />
              </button>
            ))}
          </div>

          <button type="button" onClick={() => scroll("right")} disabled={!canScrollRight} className={navBtn} aria-label="Scroll right">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
