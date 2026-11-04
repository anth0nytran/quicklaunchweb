// Clients we run SOCIAL MEDIA / ADS for. This list is separate from the web
// design testimonials in components/social-proof.tsx on purpose — only put a
// business here if we actually run their social or their ads.
//
// TO ADD A REAL RESULT: fill in `result` (a short number-based outcome) and
// `quote` (their own words). Both are optional — anything left as an empty
// string simply does not render, so the page never shows a placeholder.

export type SocialClient = {
  name: string;
  trade: string;
  city: string;
  /** Short outcome, e.g. "18 booked estimates in 30 days". Leave "" if unknown. */
  result: string;
  /** Their own words. Leave "" if we don't have a quote yet. */
  quote: string;
  /** Optional logo path under /public. */
  logo?: string;
  /** Optional headshot under /public for the testimonial card. */
  photo?: string;
  /** Person quoted, e.g. "Jose N., Owner". Falls back to the business name. */
  person?: string;
};

export const socialClients: SocialClient[] = [
  {
    name: "South Coast Quality Painting",
    trade: "Painting",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "Jerry's Roofing",
    trade: "Roofing",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "Tex Mex Roofing",
    trade: "Roofing",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "JN Ornamental Design",
    trade: "Fencing & Ironwork",
    city: "Houston, TX",
    result: "Steady new leads every month",
    quote:
      "we started using their system with facebook ads and its been bringing in a solid amount of extra leads every month. best decision we made for the business.",
    logo: "/logos/jnornamentaldesign.svg",
  },
  {
    name: "Solivance Electric",
    trade: "Electrical",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "The Greatest Insulation",
    trade: "Insulation",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "Vences House Painters",
    trade: "Painting",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
  {
    name: "MJB Entertainment USA",
    trade: "Entertainment",
    city: "Houston, TX",
    result: "",
    quote: "",
  },
];
