import { site } from '@/lib/site'

export default function robots() {
  return {
    /* /impressum, /datenschutz and /agb carry `robots: { index: false }` in
       their own page metadata — that is the correct, sufficient way to keep
       them out of the index. Disallowing them here as well is actively
       counterproductive: a disallowed URL is never crawled, so Google never
       sees the noindex directive and can still index the page from other
       signals (links, sitemaps) with no snippet. Letting the crawl happen and
       trusting the meta tag is the standard fix. For a German site the
       Impressum is also a trust signal worth having crawlable regardless. */
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  }
}
