// IndexNow ping: tells Bing (which feeds ChatGPT search and Copilot), Yandex,
// Seznam and Naver that URLs changed. Google does not use IndexNow; use Search
// Console for Google.
//
// Run AFTER a production deploy (the key file must be live first):
//   node tools/seo/indexnow.mjs                 -> submits every URL in the live sitemap
//   node tools/seo/indexnow.mjs /guides/foo /    -> submits specific paths
//
// Key file: public/f308dc1248c030835cbcd90b925641c6.txt  (served at https://quicklaunchweb.us/f308dc1248c030835cbcd90b925641c6.txt)

const HOST = "quicklaunchweb.us";
const KEY = "f308dc1248c030835cbcd90b925641c6";
const SITE = `https://${HOST}`;

async function sitemapUrls() {
  const res = await fetch(`${SITE}/sitemap.xml`);
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
}

const args = process.argv.slice(2);
const urlList = args.length
  ? args.map((p) => (p.startsWith("http") ? p : `${SITE}${p.startsWith("/") ? p : "/" + p}`))
  : await sitemapUrls();

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} (${urlList.length} URLs)`);
if (res.status >= 400) console.log(await res.text());
