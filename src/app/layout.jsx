import '@/styles/globals.css'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollFX } from '@/components/scroll'
import { site, localBusinessJsonLd, jsonLd } from '@/lib/site'
import { DevTranslate } from '@/dev'

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: 'Alarmanlagen & Sicherheitstechnik Mannheim | FT Sicherheitstechnik',
    template: '%s | FT Sicherheitstechnik',
  },
  description:
    'FT Sicherheitstechnik Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Smart Home. 15+ Jahre Erfahrung, persönliche Beratung vor Ort. ★ 5.0 Google-Bewertung. Jetzt kostenlos beraten lassen!',
  keywords: [
    'Sicherheitstechnik Mannheim',
    'Alarmanlagen Mannheim',
    'Videoüberwachung Mannheim',
    'Smart Home Sicherheit',
    'Zutrittskontrolle',
    'Brandwarnanlagen',
    'FTronics Kameras',
    'Sicherheitstechnik Rhein-Neckar',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: site.name,
    url: '/',
    title: 'Alarmanlagen & Sicherheitstechnik Mannheim | FT Sicherheitstechnik',
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
    <html lang="de">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(localBusinessJsonLd())} />
        <a className="ft-skip" href="#inhalt">Zum Inhalt springen</a>
        <NavBar />
        <main id="inhalt">{children}</main>
        <SiteFooter />
        <ScrollFX />
        {/* Dev-only DE↔EN preview overlay — compiles to nothing in production. */}
        <DevTranslate />
      </body>
    </html>
  )
}
