import type { Metadata } from "next";
import Link from "next/link";
import { BrandShell } from "@/components/brand/brand-shell";
import { Eyebrow } from "@/components/brand/primitives";
import { buildPageMetadata } from "@/lib/seo";
import { focusRing, container, pageH1, bodyText } from "@/components/brand/tokens";
import { ConsentSettingsButton } from "@/components/consent/consent-links";
import {
  LEGAL_BUSINESS_NAME,
  LEGAL_CITY_STATE,
  LEGAL_EFFECTIVE_DATE,
  LEGAL_EMAIL,
  LEGAL_OWNER_NAME,
  LEGAL_PHONE_DISPLAY,
} from "@/lib/legal";

// Plain-English privacy notice written to match what the code actually does
// (see components/consent, app/api/lead, app/api/instagram, app/api/stripe).
// Update it whenever a vendor, form, or tracking tool is added or removed.
// Not legal advice: have a lawyer review before relying on it.

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy | QuickLaunchWeb",
  description:
    "What QuickLaunchWeb collects, why, who we share it with, the cookies we use, and how to access, correct, delete, or opt out.",
  path: "/privacy",
});

const legalH2 =
  "scroll-mt-28 text-[22px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#07143F] sm:text-[24px]";
const legalH3 = "mt-7 text-[18px] font-bold text-[#07143F]";
const tocLink = `block rounded-md py-1 text-[15px] leading-[1.4] text-[#46516B] transition-colors hover:text-[#0866FF] ${focusRing}`;
const list = "mt-3 list-disc space-y-2 pl-5 marker:text-[#0866FF]";
const strong = "font-semibold text-[#07143F]";
const link = "font-medium text-[#0753CF] underline underline-offset-2 hover:text-[#07143F]";
const th = "border-b border-[#E5EDF6] px-3 py-2 text-left text-[13px] font-semibold text-[#07143F]";
const td = "border-b border-[#E5EDF6] px-3 py-2 align-top text-[14px] leading-[1.5]";

const sections = [
  ["summary", "The short version"],
  ["who-we-are", "Who we are"],
  ["what-we-collect", "What we collect"],
  ["how-we-use", "How we use it"],
  ["who-we-share-with", "Who we share it with"],
  ["cookies", "Cookies and tracking"],
  ["targeted-ads", "Targeted ads, “sale,” and your opt-out"],
  ["sms", "Text messages (SMS)"],
  ["retention", "How long we keep it"],
  ["your-rights", "Your rights and how to use them"],
  ["appeals", "Appeals"],
  ["client-data", "Data we handle for our clients"],
  ["children", "Children"],
  ["security", "Security"],
  ["changes", "Changes to this policy"],
  ["contact", "Contact us"],
] as const;

const vendors: { name: string; what: string; when: string }[] = [
  {
    name: "Vercel",
    what: "Hosts the website and runs our forms' servers. Vercel Analytics counts page views without cookies and without identifying you.",
    when: "Every visit",
  },
  {
    name: "Google Analytics (Google LLC)",
    what: "Pages viewed, clicks, device and browser type, approximate location from IP (IP is anonymized), and how you found us.",
    when: "Only if you allow Analytics",
  },
  {
    name: "Meta Pixel and Meta Conversions API (Meta Platforms, Inc.)",
    what: "Page views and actions such as submitting the free-call form or booking a call, browser and device details, IP address, Meta cookie IDs (_fbp, _fbc) and ad click IDs. When you submit the free-call form, our server also sends Meta a hashed (scrambled) copy of your phone number and first name plus your form answers (trade, job size, ad spend and revenue range) so Meta can measure and improve our ads. Meta may combine this with what it already knows about you.",
    when: "Only if you allow Advertising and your browser does not send Global Privacy Control",
  },
  {
    name: "HighLevel (GoHighLevel / LeadConnector)",
    what: "Our CRM. Stores what you enter in our forms (name, phone, answers, page and ad source, SMS consent record) and sends our follow-up texts and emails through its messaging carriers.",
    when: "When you submit a form",
  },
  {
    name: "Calendly",
    what: "Runs the booking calendar embedded on our pages. Collects the name, email, phone and answers you give when booking, and sets its own cookies inside the calendar.",
    when: "When the calendar loads or you book",
  },
  {
    name: "Web3Forms",
    what: "Emails us a backup copy of form submissions (free-call form, support form, website-project form).",
    when: "When you submit a form",
  },
  {
    name: "Stripe",
    what: "Processes payments on its own secure checkout page. We receive your name, email, plan, and payment status. We never see or store your full card number.",
    when: "When you buy",
  },
  {
    name: "Resend",
    what: "Sends our transactional emails (for example, purchase confirmations and next steps) and internal lead alerts.",
    when: "When you buy or submit some forms",
  },
  {
    name: "Google Workspace (Gmail and Google Sheets)",
    what: "Our business email, and spreadsheets where we log some leads, checklist requests, and purchases.",
    when: "When you email us, submit some forms, or buy",
  },
];

export default function PrivacyPage() {
  return (
    <BrandShell stickyCta={false}>
      <section className="bg-gradient-to-b from-[#EFF8FF] to-[#f7fbff] pb-10 pt-[104px] sm:pb-14 sm:pt-28 lg:pt-32">
        <div className={container}>
          <div className="mx-auto max-w-[760px]">
            <Eyebrow>Legal</Eyebrow>
            <h1 className={`mt-4 ${pageH1}`}>Privacy Policy</h1>
            <p className={`mt-4 max-w-[40rem] ${bodyText}`}>
              What we collect, why, who we share it with, and how you control it. In plain English.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white pb-16 pt-10 sm:pb-24 sm:pt-14">
        <div className={container}>
          <article className="mx-auto max-w-[760px]">
            <div className="rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-5 sm:p-6 md:grid md:grid-cols-2 md:gap-6">
              <div className="space-y-4">
                <Fact label="Effective date" value={LEGAL_EFFECTIVE_DATE} />
                <Fact label="Business" value={`${LEGAL_BUSINESS_NAME}, owned and run by ${LEGAL_OWNER_NAME}`} />
              </div>
              <div className="mt-4 space-y-4 md:mt-0">
                <Fact label="Privacy email" value={LEGAL_EMAIL} />
                <Fact label="Phone / text" value={`${LEGAL_PHONE_DISPLAY} (${LEGAL_CITY_STATE})`} />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 rounded-xl border border-[#0866FF]/30 bg-[#EFF8FF] p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-[14px] leading-relaxed text-[#07143F]">
                Change your cookie choices or opt out of targeted ads at any time.
              </p>
              <ConsentSettingsButton
                className={`inline-flex min-h-[40px] items-center justify-center rounded-lg bg-[#0866FF] px-4 text-[14px] font-semibold text-white hover:bg-[#0753CF] ${focusRing}`}
              >
                Your Privacy Choices
              </ConsentSettingsButton>
            </div>

            <nav
              aria-label="Contents"
              className="mt-8 rounded-xl border border-[#E5EDF6] bg-white p-5 shadow-[0_4px_20px_-10px_rgba(7,20,63,0.12)] sm:p-6"
            >
              <p className="text-[12px] font-semibold uppercase tracking-[0.2em] text-[#46516B]">On this page</p>
              <ol className="mt-3 grid gap-x-8 gap-y-1 sm:grid-cols-2">
                {sections.map(([id, title], i) => (
                  <li key={id}>
                    <a href={`#${id}`} className={tocLink}>
                      {i + 1}. {title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <hr className="my-10 border-[#E5EDF6] sm:my-12" />

            <div className="space-y-12 text-[16px] leading-[1.7] text-[#46516B] sm:text-[17px]">
              <section>
                <h2 id="summary" className={legalH2}>1. The short version</h2>
                <ul className={list}>
                  <li>We collect what you type into our forms and booking calendar, plus basic visit data.</li>
                  <li>
                    Google Analytics and the Meta Pixel only run if you say yes in the cookie banner. Say no and they
                    never load.
                  </li>
                  <li>We don&apos;t sell your info for money. We never share your mobile number with other companies for their marketing.</li>
                  <li>We only text you if you check the box to agree. Reply STOP any time.</li>
                  <li>
                    You can ask to see, fix, or delete your info, and opt out of targeted ads. Email {LEGAL_EMAIL}.
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="who-we-are" className={legalH2}>2. Who we are</h2>
                <p className="mt-3">
                  {LEGAL_BUSINESS_NAME} (&ldquo;we,&rdquo; &ldquo;us&rdquo;) is a marketing agency in {LEGAL_CITY_STATE},
                  owned and run by {LEGAL_OWNER_NAME}. We sell ads, video, websites, SEO, and automation services to home
                  service businesses in the United States. This policy covers this website, our forms, our calls and texts,
                  and our services. Our site is meant for people in the United States.
                </p>
              </section>

              <section>
                <h2 id="what-we-collect" className={legalH2}>3. What we collect</h2>
                <h3 className={legalH3}>What you give us</h3>
                <ul className={list}>
                  <li>
                    <span className={strong}>Contact info:</span> name, phone number, email, business name, and website.
                  </li>
                  <li>
                    <span className={strong}>Business details:</span> your answers on our forms, such as your trade, typical
                    job size, monthly ad spend, and revenue range, and anything you write in a message.
                  </li>
                  <li>
                    <span className={strong}>Booking details:</span> what you enter in our Calendly calendar.
                  </li>
                  <li>
                    <span className={strong}>Purchase details:</span> name, email, plan, and payment status from Stripe. No
                    full card numbers.
                  </li>
                  <li>
                    <span className={strong}>Client materials:</span> logos, photos, videos, service lists, and account
                    access you give us so we can do the work.
                  </li>
                  <li>
                    <span className={strong}>Your SMS consent record:</span> whether you checked the box, the exact words
                    you agreed to, the time, and the page.
                  </li>
                  <li>
                    <span className={strong}>Calls and texts:</span> the content of texts you send us and notes from our
                    calls with you.
                  </li>
                </ul>
                <h3 className={legalH3}>What we collect automatically</h3>
                <ul className={list}>
                  <li>
                    <span className={strong}>Visit data:</span> IP address, browser, device, pages viewed, the page that
                    sent you, and ad campaign tags (UTM tags and Facebook click IDs).
                  </li>
                  <li>
                    <span className={strong}>Cookies and similar tech:</span> see <a href="#cookies" className={link}>Cookies and tracking</a>.
                  </li>
                </ul>
                <h3 className={legalH3}>What we don&apos;t collect</h3>
                <p className="mt-2">
                  We don&apos;t ask for sensitive data such as health, race, religion, immigration status, precise
                  location, biometrics, or Social Security numbers. Please don&apos;t send it to us. We do not sell
                  sensitive data.
                </p>
              </section>

              <section>
                <h2 id="how-we-use" className={legalH2}>4. How we use it</h2>
                <ul className={list}>
                  <li>To answer your request, book and run your call, and follow up by phone, text, or email.</li>
                  <li>To deliver services you buy, bill you, and support you.</li>
                  <li>To see how the site is used and make it better (only with Analytics consent for Google Analytics).</li>
                  <li>
                    To measure and improve our ads on Facebook and Instagram, and to show our ads to people who visited
                    (only with Advertising consent).
                  </li>
                  <li>To prevent spam, fraud, and abuse, and to keep records the law requires.</li>
                  <li>To send you marketing, only where you agreed or the law allows. You can opt out any time.</li>
                </ul>
              </section>

              <section>
                <h2 id="who-we-share-with" className={legalH2}>5. Who we share it with</h2>
                <p className="mt-3">
                  We use these companies to run our business. They get only what they need for the job listed.
                </p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-[#E5EDF6]">
                  <table className="w-full min-w-[560px] border-collapse">
                    <caption className="sr-only">Companies we share data with</caption>
                    <thead className="bg-[#F7FBFF]">
                      <tr>
                        <th scope="col" className={th}>Company</th>
                        <th scope="col" className={th}>What they get and why</th>
                        <th scope="col" className={th}>When</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((v) => (
                        <tr key={v.name}>
                          <th scope="row" className={`${td} font-semibold text-[#07143F]`}>{v.name}</th>
                          <td className={td}>{v.what}</td>
                          <td className={td}>{v.when}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4">We may also share information:</p>
                <ul className={list}>
                  <li>When the law requires it, or to protect our rights, safety, or the safety of others.</li>
                  <li>If our business is sold or merged, with the new owner, who must follow this policy.</li>
                  <li>With anyone else only when you ask us to.</li>
                </ul>
              </section>

              <section>
                <h2 id="cookies" className={legalH2}>6. Cookies and tracking</h2>
                <p className="mt-3">
                  When you first visit, a banner lets you <span className={strong}>Accept all</span>,{" "}
                  <span className={strong}>Reject non-essential</span>, or <span className={strong}>Choose</span>. Until
                  you choose, only necessary cookies run, and Google Analytics and the Meta Pixel do not load. We keep
                  your choice for 12 months, then ask again. Change it any time with{" "}
                  <span className={strong}>Cookie settings</span> in the footer.
                </p>
                <div className="mt-4 overflow-x-auto rounded-xl border border-[#E5EDF6]">
                  <table className="w-full min-w-[560px] border-collapse">
                    <caption className="sr-only">Cookies used on this site</caption>
                    <thead className="bg-[#F7FBFF]">
                      <tr>
                        <th scope="col" className={th}>Cookie</th>
                        <th scope="col" className={th}>Type</th>
                        <th scope="col" className={th}>What it does</th>
                        <th scope="col" className={th}>Lasts</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row" className={`${td} font-mono text-[13px] text-[#07143F]`}>ql_consent</th>
                        <td className={td}>Necessary</td>
                        <td className={td}>Remembers your cookie choice (also saved in your browser&apos;s local storage).</td>
                        <td className={td}>12 months</td>
                      </tr>
                      <tr>
                        <th scope="row" className={`${td} font-mono text-[13px] text-[#07143F]`}>Calendly cookies</th>
                        <td className={td}>Necessary</td>
                        <td className={td}>Set by Calendly inside the booking calendar so booking works.</td>
                        <td className={td}>Set by Calendly</td>
                      </tr>
                      <tr>
                        <th scope="row" className={`${td} font-mono text-[13px] text-[#07143F]`}>_ga, _ga_*</th>
                        <td className={td}>Analytics</td>
                        <td className={td}>Google Analytics. Tells visits apart so we can count pages and visitors.</td>
                        <td className={td}>Up to 2 years</td>
                      </tr>
                      <tr>
                        <th scope="row" className={`${td} font-mono text-[13px] text-[#07143F]`}>_fbp, _fbc</th>
                        <td className={td}>Advertising</td>
                        <td className={td}>Meta Pixel. Connects visits and form submits to our Facebook and Instagram ads.</td>
                        <td className={td}>90 days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <ul className={list}>
                  <li>
                    <span className={strong}>Vercel Analytics</span> counts page views without cookies and without
                    identifying you, so it runs for everyone.
                  </li>
                  <li>
                    <span className={strong}>Stripe</span> checkout happens on Stripe&apos;s own site, under Stripe&apos;s
                    cookies and privacy policy.
                  </li>
                  <li>
                    <span className={strong}>Google Consent Mode:</span> Google tags start with all storage set to
                    &ldquo;denied&rdquo; and only switch to &ldquo;granted&rdquo; for the categories you allow.
                  </li>
                  <li>
                    <span className={strong}>Global Privacy Control (GPC):</span> if your browser sends a GPC signal, we
                    treat it as an opt-out of targeted ads and sale/sharing. The Meta Pixel stays off and we don&apos;t
                    send your data to Meta, even if you click Accept.
                  </li>
                  <li>
                    <span className={strong}>&ldquo;Do Not Track&rdquo;:</span> browsers&apos; older Do Not Track setting has
                    no agreed standard, so we don&apos;t respond to it. We do honor GPC.
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="targeted-ads" className={legalH2}>7. Targeted ads, &ldquo;sale,&rdquo; and your opt-out</h2>
                <p className="mt-3">
                  We don&apos;t sell your personal data for money. But if you allow Advertising, the Meta Pixel and Meta
                  Conversions API share your visit and form data with Meta so we can measure our ads and show them to
                  people who visited. Texas, California, and other state privacy laws may call this
                  &ldquo;targeted advertising,&rdquo; &ldquo;sharing,&rdquo; or a &ldquo;sale.&rdquo;
                </p>
                <p className="mt-3">
                  <span className={strong}>To opt out</span>, use any of these:
                </p>
                <ul className={list}>
                  <li>
                    Click <span className={strong}>Your Privacy Choices / Do Not Sell or Share My Personal Information</span>{" "}
                    in the footer (or the button at the top of this page) and turn off Advertising.
                  </li>
                  <li>Turn on Global Privacy Control in your browser.</li>
                  <li>
                    Email {LEGAL_EMAIL} with &ldquo;Opt out&rdquo; in the subject. We&apos;ll apply it to the records we hold
                    about you, for example by not adding your contact info to ad audiences.
                  </li>
                </ul>
                <p className="mt-3">
                  The cookie choice is saved per browser. If you use more than one browser or device, set it on each one,
                  or email us. We do not use your data for profiling that has legal or similarly significant effects on
                  you.
                </p>
              </section>

              <section id="sms-text-messaging" className="scroll-mt-28">
                <h2 id="sms" className={legalH2}>8. Text messages (SMS)</h2>
                <p className="mt-3">
                  We only text you if you check the unchecked consent box on our form (or opt in another way the law
                  allows). Checking it is never required to buy or to book a call. Texts may be about your free call,
                  appointment reminders, follow-up on your request, and our services. Message frequency varies. Message and
                  data rates may apply. Reply <span className={strong}>STOP</span> to stop, <span className={strong}>HELP</span>{" "}
                  for help. Carriers are not liable for delayed or undelivered messages.
                </p>
                <p className="mt-3">
                  <span className={strong}>
                    We do not sell or share your mobile number or SMS opt-in data with third parties or affiliates for
                    their marketing or promotional purposes.
                  </span>{" "}
                  We share it only with the companies that deliver our texts (HighLevel and its carriers and messaging
                  providers). Full program terms are on our{" "}
                  <Link href="/sms-consent" className={link}>
                    SMS Terms
                  </Link>{" "}
                  page.
                </p>
              </section>

              <section>
                <h2 id="retention" className={legalH2}>9. How long we keep it</h2>
                <ul className={list}>
                  <li>
                    <span className={strong}>Leads and CRM records:</span> up to 3 years after our last contact, unless you
                    become a client or ask us to delete them sooner.
                  </li>
                  <li>
                    <span className={strong}>Client and billing records:</span> while you are a client and up to 7 years
                    after, for tax and legal reasons.
                  </li>
                  <li>
                    <span className={strong}>SMS consent and opt-out records:</span> 5 years, so we can prove consent and
                    honor opt-outs.
                  </li>
                  <li>
                    <span className={strong}>Google Analytics data:</span> up to 14 months.
                  </li>
                  <li>
                    <span className={strong}>Cookies:</span> see the cookie table above.
                  </li>
                  <li>
                    <span className={strong}>Data held by our vendors</span> (for example Meta, Calendly, Stripe) is also
                    kept under their own policies.
                  </li>
                </ul>
              </section>

              <section>
                <h2 id="your-rights" className={legalH2}>10. Your rights and how to use them</h2>
                <p className="mt-3">
                  Depending on where you live (including Texas, California, and other states with privacy laws), you can
                  ask us to:
                </p>
                <ul className={list}>
                  <li><span className={strong}>Know and access</span> the personal data we have about you.</li>
                  <li><span className={strong}>Correct</span> data that is wrong.</li>
                  <li><span className={strong}>Delete</span> your data.</li>
                  <li><span className={strong}>Get a copy</span> of your data in a usable format.</li>
                  <li>
                    <span className={strong}>Opt out</span> of targeted advertising, the sale or sharing of your data, and
                    profiling.
                  </li>
                  <li><span className={strong}>Stop marketing</span>: reply STOP to texts, or tell us on a call or by email.</li>
                </ul>
                <p className="mt-3">
                  <span className={strong}>How:</span> email {LEGAL_EMAIL}, call or text {LEGAL_PHONE_DISPLAY}, or use our{" "}
                  <Link href="/support" className={link}>
                    support form
                  </Link>
                  . Tell us what you want and the name, phone, or email you used with us. We may ask a question or two to
                  confirm it&apos;s you before we hand over or delete anything. You can use an authorized agent; we may ask
                  for proof they act for you.
                </p>
                <p className="mt-3">
                  We answer within 45 days. If we need more time (up to 45 more days), we&apos;ll tell you why. Requests are
                  free up to twice a year. We will never charge you more, give you worse service, or treat you differently
                  for using your rights.
                </p>
              </section>

              <section>
                <h2 id="appeals" className={legalH2}>11. Appeals</h2>
                <p className="mt-3">
                  If we say no to your request, you can appeal. Email {LEGAL_EMAIL} with &ldquo;Privacy appeal&rdquo; in the
                  subject and tell us what you asked for. We will reply in writing within 60 days and explain what we
                  decided and why. If you are still not satisfied, you can contact your state attorney general. Texas
                  residents can file a complaint with the{" "}
                  <a
                    href="https://www.texasattorneygeneral.gov/consumer-protection/file-consumer-complaint"
                    className={link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Texas Attorney General
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2 id="client-data" className={legalH2}>12. Data we handle for our clients</h2>
                <p className="mt-3">
                  When we run ads, websites, lead forms, or texting for a client business, we handle their customers&apos;
                  data on that business&apos;s behalf and follow its instructions. If you contacted one of our clients
                  (for example, a roofer or remodeler), send privacy requests to that business. We&apos;ll help them
                  answer.
                </p>
              </section>

              <section>
                <h2 id="children" className={legalH2}>13. Children</h2>
                <p className="mt-3">
                  This site is for business owners. It is not directed at children under 13, and we do not knowingly
                  collect data from them. If you think a child gave us information, email {LEGAL_EMAIL} and we&apos;ll
                  delete it.
                </p>
              </section>

              <section>
                <h2 id="security" className={legalH2}>14. Security</h2>
                <p className="mt-3">
                  We use encrypted connections (HTTPS), limit who can access data, and pick vendors with strong security.
                  No system is perfectly secure, so we can&apos;t promise data will never be exposed. If a breach affects
                  you, we will notify you as the law requires.
                </p>
              </section>

              <section>
                <h2 id="changes" className={legalH2}>15. Changes to this policy</h2>
                <p className="mt-3">
                  We&apos;ll update this page when our practices change and change the effective date at the top. If a
                  change is significant, we&apos;ll post a notice on the site or tell clients directly.
                </p>
              </section>

              <section>
                <h2 id="contact" className={legalH2}>16. Contact us</h2>
                <p className="mt-3">
                  {LEGAL_BUSINESS_NAME}, attn: {LEGAL_OWNER_NAME}, {LEGAL_CITY_STATE}
                  <br />
                  Email: {LEGAL_EMAIL}
                  <br />
                  Phone / text: {LEGAL_PHONE_DISPLAY}
                </p>
                <p className="mt-6 rounded-xl border border-[#E5EDF6] bg-[#F7FBFF] p-4 text-[13px] leading-relaxed text-[#46516B]">
                  This policy describes our practices. It is not legal advice to you.
                </p>
              </section>
            </div>
          </article>
        </div>
      </section>
    </BrandShell>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#46516B]">{label}</p>
      <p className="mt-0.5 text-[15px] font-medium text-[#07143F]">{value}</p>
    </div>
  );
}
