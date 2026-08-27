/* ============================================================
   Legacy URL map — the static .html site → the Next.js routes.

   Source of truth for BOTH redirect implementations:
     - next.config.mjs  → redirects(), used when Next serves the site
     - scripts/generate-htaccess.mjs → deploy/.htaccess, used if the
       site stays on the current Apache host

   The inventory was taken from the live sitemap on 2026-08-27
   (38 URLs) plus /index.html, which answers 200 and is therefore a
   live duplicate of /. Every entry below was verified against the
   live page's <title> — the product URLs are NOT consistently named
   and three of them do not match their slug (see irregulars).

   All redirects are 301. The .html URLs are never coming back, so
   the permanent signal is correct even where the destination is
   still provisional; re-pointing a destination later is normal and
   costs nothing.
   ============================================================ */

/** Top-level pages that map 1:1 by dropping the .html extension. */
const samePathPages = [
  'agb',
  'datenschutz',
  'faq',
  'impressum',
  'karriere',
  'konfigurator',
  'kontakt',
  'loesungen-gewerbe',
  'loesungen-privat',
  'partner',
  'produkte',
  'ratgeber',
  'support',
  'ueber-uns',
]

/** Product pages whose legacy slug already matches the new route. */
const samePathProducts = [
  'fb-8a-max',
  'fb-8b',
  'fc-6z-mini',
  'fc-8d',
  'fc-8d-zoom',
  'fe-6l',
  'fn-8',
  'fn-16',
  'fn-32',
  'fn-64-pro',
  'fp-8s-25x',
  'fp-8t-20x',
  'fr-8x',
  'fs-30',
  'ft-8c-pro',
  'ft-8p-dual',
]

/** Product pages whose legacy slug does NOT match the new route.
    Verified against the live <title> on 2026-08-27:
      produkt-detail-fb8a.html → "FTronics FB-8A Pro — 4K Bullet IP-Kamera"
      produkt-detail-fc8d.html → "FTronics FC-8D Pro — 4K Dome IP-Kamera"
    Note that produkt-detail-fc-8d.html (hyphenated) is the non-Pro
    FC-8D and is handled in samePathProducts above. Do not merge these. */
const irregularProducts = {
  'produkt-detail-fb8a': 'fb-8a-pro',
  'produkt-detail-fc8d': 'fc-8d-pro',
}

/** Legacy pages with no equivalent in the rebuild.

    These are audit finding C2. Each one is a page that currently
    ranks and is being deleted, so the destinations below are the
    nearest honest match — NOT a decision that these pages should
    stay deleted.

    TODO (C2): once /alarmanlagen-mannheim, /videoueberwachung-mannheim,
    the two Sicherheitstechnik-<Stadt> pages and /referenzen are
    rebuilt as real routes, re-point these five destinations at them
    and delete this comment. */
const orphanedPages = {
  // Commercial intent, keyword-targeted → the commercial hub is the
  // closest match until a dedicated page exists again.
  'alarmanlagen-mannheim': '/loesungen-gewerbe',
  'videoueberwachung-mannheim': '/loesungen-gewerbe',
  // Service-area intent → the Ratgeber post covers Heidelberg and
  // Ludwigshafen by name and is currently the deepest page we have
  // on the 50 km radius.
  'sicherheitstechnik-heidelberg': '/ratgeber/sicherheitstechnik-rhein-neckar-einzugsgebiet',
  'sicherheitstechnik-ludwigshafen': '/ratgeber/sicherheitstechnik-rhein-neckar-einzugsgebiet',
  // Proof of work → the founder/company story is the nearest trust page.
  'referenzen': '/ueber-uns',
}

export const legacyRedirects = [
  /* The old index. Answers 200 today, so it is a real duplicate. */
  { source: '/index.html', destination: '/', permanent: true },

  ...samePathPages.map((slug) => ({
    source: `/${slug}.html`,
    destination: `/${slug}`,
    permanent: true,
  })),

  ...samePathProducts.map((slug) => ({
    source: `/produkt-detail-${slug}.html`,
    destination: `/produkte/${slug}`,
    permanent: true,
  })),

  ...Object.entries(irregularProducts).map(([legacy, slug]) => ({
    source: `/${legacy}.html`,
    destination: `/produkte/${slug}`,
    permanent: true,
  })),

  ...Object.entries(orphanedPages).map(([legacy, destination]) => ({
    source: `/${legacy}.html`,
    destination,
    permanent: true,
  })),
]

/* Safety net for any legacy URL that was indexed but never appeared in
   the sitemap. It runs last, so every rule above wins. A stray
   /foo.html whose clean route does not exist still 404s — same outcome
   as today, one hop later — but anything that does have a clean
   equivalent is caught. */
export const legacyHtmlCatchAll = {
  source: '/:slug((?!produkt-detail-).*)\\.html',
  destination: '/:slug',
  permanent: true,
}

export const allRedirects = [...legacyRedirects, legacyHtmlCatchAll]
