import { allRedirects } from './src/lib/redirects.mjs'

const contentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self'",
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.googleadservices.com https://googleads.g.doubleclick.net",
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob: https://www.google.com https://www.google.de https://*.gstatic.com https://*.doubleclick.net https://*.googleadservices.com",
  "connect-src 'self' https://*.supabase.co https://www.google.com https://www.google.de https://www.google-analytics.com https://region1.google-analytics.com https://*.doubleclick.net https://*.googleadservices.com",
  "frame-src 'self' https://www.google.com https://*.doubleclick.net",
  "media-src 'self' blob:",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: contentSecurityPolicy },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin-allow-popups' },
]

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

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}
export default nextConfig
