import Link from "next/link";
import { BGPattern } from "@/components/ui/bg-pattern";
import {
  AmbientGlow,
  GlassButton,
  GlassCard,
  GlassDivider,
  GlassInput,
  GlassPill,
} from "@/components/ui/glass";

const featuredPost = {
  title: "The 48-Hour Launch Checklist: from intake to live site",
  excerpt:
    "A step-by-step blueprint we follow to ship a conversion-ready site in two days - without sacrificing polish, clarity, or speed.",
  category: "Launch System",
  date: "Jan 24, 2026",
  readTime: "7 min read",
  tags: ["Intake", "Copy", "SEO", "QA"],
};

const posts = [
  {
    title: "Homepage copy that gets calls: a 9-line framework",
    excerpt:
      "Cut the fluff, highlight the offer, and guide the visitor to one clear next step.",
    category: "Copywriting",
    date: "Jan 22, 2026",
    readTime: "4 min read",
    tags: ["Messaging", "CTA", "Clarity"],
  },
  {
    title: "Local SEO basics we bake into every launch",
    excerpt:
      "Service-area targeting, structured data, and content blocks that help you show up locally.",
    category: "Local SEO",
    date: "Jan 20, 2026",
    readTime: "5 min read",
    tags: ["Schema", "GMB", "On-page"],
  },
  {
    title: "Speed wins: the 3 changes that cut load time fast",
    excerpt:
      "Optimize images, trim third-party scripts, and ship a lean UI to keep bounce rate low.",
    category: "Performance",
    date: "Jan 18, 2026",
    readTime: "3 min read",
    tags: ["Core Web Vitals", "Assets", "UX"],
  },
  {
    title: "The $99/mo pricing page structure that converts",
    excerpt:
      "Position the offer, handle objections, and anchor value without overwhelming the buyer.",
    category: "Conversion",
    date: "Jan 16, 2026",
    readTime: "6 min read",
    tags: ["Pricing", "Objections", "Trust"],
  },
  {
    title: "Before-and-after: lead form upgrade in 20 minutes",
    excerpt:
      "A clean, short form that feels premium and captures better quality leads.",
    category: "UX",
    date: "Jan 14, 2026",
    readTime: "4 min read",
    tags: ["Forms", "Lead Gen", "UX"],
  },
  {
    title: "How we keep websites fresh without bloated revisions",
    excerpt:
      "Update cadence, change request triage, and a simple content library system.",
    category: "Operations",
    date: "Jan 12, 2026",
    readTime: "5 min read",
    tags: ["Process", "Maintenance", "Client Ops"],
  },
];

const signals = [
  {
    label: "Avg. response lift",
    value: "+38%",
    detail: "post-launch lead form rate",
  },
  {
    label: "Typical launch",
    value: "48 hours",
    detail: "from onboarding to live site",
  },
  {
    label: "Retention",
    value: "92%",
    detail: "clients still active after 6 months",
  },
];

const collections = [
  "48-Hour Launch Playbook",
  "Local Service Positioning",
  "SEO-Ready Page Structure",
  "Design Systems for Small Biz",
];

const topics = ["Launches", "Copy", "SEO", "Conversion", "Performance"];

export default function BlogPage() {
  return (
    <main className="relative min-h-screen px-6 py-24 md:py-32">
      <BGPattern variant="grid" mask="fade-center" size={32} fill="rgba(255,255,255,0.035)" />
      <AmbientGlow color="accent" position="top" intensity="subtle" className="-top-24" />
      <AmbientGlow color="white" position="bottom" intensity="subtle" className="opacity-60" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-16">
        <header className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <GlassPill variant="accent" className="mb-4">
              QuickLaunch Journal
            </GlassPill>
            <h1 className="text-4xl font-bold text-white md:text-5xl text-balance">
              Launch smarter, convert faster.
              <span
                className="block text-transparent bg-clip-text"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(var(--color-accent-rgb)), rgb(var(--color-accent-gradient-to)))",
                }}
              >
                Practical growth notes for local businesses.
              </span>
            </h1>
            <p className="mt-4 text-sm text-secondary text-balance">
              Short, tactical reads on copy, design, and launch systems that help service
              businesses turn website visitors into booked calls.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <GlassPill key={topic} className="uppercase">
                  {topic}
                </GlassPill>
              ))}
            </div>
          </div>

          <div className="flex w-full flex-col gap-3 sm:flex-row md:w-auto">
            <Link href="/">
              <GlassButton variant="ghost" size="md" className="w-full sm:w-auto">
                Back to home
              </GlassButton>
            </Link>
            <Link href="/#pricing">
              <GlassButton variant="secondary" size="md" className="w-full sm:w-auto">
                Start My Free Website
              </GlassButton>
            </Link>
          </div>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <GlassCard variant="elevated" className="relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-white/5" />
            <div className="absolute -top-24 right-6 h-40 w-40 rounded-full bg-accent/20 blur-3xl" />
            <div className="relative z-10">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="uppercase tracking-wider text-accent">Featured</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{featuredPost.date}</span>
                <span className="h-1 w-1 rounded-full bg-white/30" />
                <span>{featuredPost.readTime}</span>
              </div>

              <h2 className="mt-4 text-2xl font-semibold text-white md:text-3xl">
                {featuredPost.title}
              </h2>
              <p className="mt-3 text-sm text-secondary">{featuredPost.excerpt}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <GlassPill variant="accent">{featuredPost.category}</GlassPill>
                {featuredPost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] uppercase tracking-widest text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <GlassDivider className="my-6" />

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-muted">
                  <p className="uppercase tracking-wider text-white/50">Goal</p>
                  <p className="mt-1 text-sm text-white/90">
                    Ship a live site with messaging, SEO, and lead capture ready on day one.
                  </p>
                </div>
                <div className="flex gap-3">
                  <GlassButton variant="ghost" size="sm">
                    Read article
                  </GlassButton>
                  <GlassButton variant="outline" size="sm">
                    Save for later
                  </GlassButton>
                </div>
              </div>
            </div>
          </GlassCard>

          <div className="space-y-6">
            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wider text-muted">Signals</p>
              <div className="mt-4 space-y-4">
                {signals.map((signal) => (
                  <div key={signal.label} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                    <p className="text-[10px] uppercase tracking-widest text-white/40">
                      {signal.label}
                    </p>
                    <p className="mt-2 text-2xl font-semibold text-white">{signal.value}</p>
                    <p className="mt-1 text-xs text-secondary">{signal.detail}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <p className="text-xs uppercase tracking-wider text-muted">Collections</p>
              <div className="mt-4 space-y-3 text-sm text-secondary">
                {collections.map((collection) => (
                  <div
                    key={collection}
                    className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3"
                  >
                    <span className="text-white/90">{collection}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted">
                      4-6 posts
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </section>

        <section className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">Latest</p>
              <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                Fresh tactical reads
              </h2>
              <p className="mt-2 text-sm text-secondary">
                Quick wins, fast audits, and the systems we repeat for every launch.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <GlassPill key={`${topic}-latest`} className="uppercase">
                  {topic}
                </GlassPill>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <GlassCard key={post.title} hover className="p-6">
                <div className="flex items-center justify-between text-xs text-muted">
                  <GlassPill variant="default">{post.category}</GlassPill>
                  <span>{post.date}</span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-secondary">{post.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest text-white/40">
                      {tag}
                    </span>
                  ))}
                </div>
                <GlassDivider className="my-5" />
                <div className="flex items-center justify-between text-xs text-muted">
                  <span>{post.readTime}</span>
                  <GlassButton variant="ghost" size="sm">
                    Read
                  </GlassButton>
                </div>
              </GlassCard>
            ))}
          </div>
        </section>

        <section>
          <GlassCard variant="solid" className="relative overflow-hidden p-6 md:p-8">
            <div className="absolute inset-0 bg-gradient-to-r from-white/[0.04] via-transparent to-accent/10" />
            <div className="relative z-10 grid gap-6 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <p className="text-xs uppercase tracking-wider text-muted">Subscribe</p>
                <h2 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                  Get the launch playbook in your inbox.
                </h2>
                <p className="mt-3 text-sm text-secondary">
                  Weekly notes on conversion, local SEO, and friction-free website updates.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <GlassInput
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  className="flex-1"
                />
                <GlassButton variant="secondary" size="md" type="submit" className="w-full sm:w-auto">
                  Get updates
                </GlassButton>
              </form>
            </div>
            <p className="relative z-10 mt-4 text-xs text-muted">
              No spam, just practical launch notes. Unsubscribe anytime.
            </p>
          </GlassCard>
        </section>
      </div>
    </main>
  );
}
