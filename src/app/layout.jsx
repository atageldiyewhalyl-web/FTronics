import '@/styles/globals.css'
import { DM_Mono, DM_Sans } from 'next/font/google'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollFX } from '@/components/scroll'
import { LeadInteractionTracking } from '@/components/LeadInteractionTracking'
import { PrivacyConsentManager } from '@/components/PrivacyConsentManager'
import { site, localBusinessJsonLd, jsonLd } from '@/lib/site'
import { DevTranslate } from '@/dev'

const dmSans = DM_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-dm-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-dm-mono',
})

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Sicherheitstechnik Mannheim | FT Sicherheitstechnik',
    template: '%s | FT Sicherheitstechnik',
  },
  description:
    'FT Sicherheitstechnik Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Smart Home. 15+ Jahre Erfahrung, persönliche Beratung vor Ort. ★ 5.0 Google-Bewertung. Jetzt kostenlos beraten lassen!',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: site.name,
    url: '/',
    title: 'Sicherheitstechnik Mannheim | FT Sicherheitstechnik',
    description:
      'Professionelle Sicherheitstechnik aus Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Smart Home. 15+ Jahre Erfahrung. Jetzt beraten lassen!',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd())} />
        <a className="ft-skip" href="#inhalt">Zum Inhalt springen</a>
        <NavBar />
        <main id="inhalt">{children}</main>
        <SiteFooter />
        <ScrollFX />
        <LeadInteractionTracking />
        <PrivacyConsentManager />
        {/* Dev-only DE↔EN preview overlay — compiles to nothing in production. */}
        <DevTranslate />
      </body>
    </html>
  )
}
