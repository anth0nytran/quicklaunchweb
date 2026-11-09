// Home page media: client videos and proof, in one place.
//
// Drop real items into these lists and they show up in the matching slot on the home page,
// already framed to match the hero (frosted glass, blueprint blue). Empty lists show nothing
// on the live site; on your local preview (npm run dev) empty slots show a dashed outline so
// you can see where media will go.
//
// Video files: put them in /public/media/ (MP4, H.264) with a poster image, e.g.
//   { kind: "video", src: "/media/roofing-ad.mp4", poster: "/media/roofing-ad.jpg", title: "Roof replacement ad", client: "ABC Roofing" }
// Review:
//   { kind: "review", quote: "We booked 3 jobs the first week.", name: "Mike", business: "ABC Roofing" }
// Image (screenshot, before/after, result):
//   { kind: "image", src: "/media/leads-screenshot.png", alt: "Lead dashboard", caption: "First month of leads" }
// Never put real client numbers here unless the client has said yes.

export type HomeMedia =
  | { kind: "video"; src: string; poster?: string; title: string; client?: string; vertical?: boolean }
  | { kind: "image"; src: string; alt: string; caption?: string }
  | { kind: "review"; quote: string; name: string; business?: string };

/** One list per How It Works step: 0 Plan, 1 Video, 2 Ads, 3 Testing, 4 Booked jobs. */
export const STEP_MEDIA: HomeMedia[][] = [
  [], // 01 Plan: e.g. a short clip of a strategy call, or the plan one-pager
  [], // 02 Video: your best client videos (vertical reels work great here)
  [], // 03 Ads: real ads you ran for clients
  [], // 04 Testing: two or three ad versions side by side
  [], // 05 Booked jobs: a review, a calendar screenshot, a text-back example
];

/** The studio wall in the Proof section: your strongest client videos. */
export const STUDIO_REEL: HomeMedia[] = [];

/** How many empty frames each slot shows on the local preview. */
export const SLOT_PREVIEW = { step: [1, 3, 2, 3, 2], studio: 3 };
