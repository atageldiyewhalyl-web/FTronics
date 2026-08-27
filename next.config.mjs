import { allRedirects } from './src/lib/redirects.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  /* Legacy .html URLs from the static site this rebuild replaces.
     The map lives in src/lib/redirects.mjs so the Apache variant in
     deploy/.htaccess can be generated from the same source.

     `statusCode: 301` rather than `permanent: true`: Next's
     `permanent` emits 308, which Google treats identically to a 301
     but which older crawlers and most SEO audit tools still report as
     an anomaly. A migration is watched closely by exactly those tools,
     so emit the status everyone expects. */
  async redirects() {
    return allRedirects.map(({ source, destination }) => ({
      source,
      destination,
      statusCode: 301,
    }))
  },
}
export default nextConfig
