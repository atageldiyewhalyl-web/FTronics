import '@/styles/globals.css'
import Script from 'next/script'
import { NavBar } from '@/components/NavBar'
import { SiteFooter } from '@/components/SiteFooter'
import { ScrollFX } from '@/components/scroll'
import { site, localBusinessJsonLd, jsonLd } from '@/lib/site'
import { DevTranslate } from '@/dev'

const GTM_ID = 'GTM-545QDZB7'

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
    <html lang="de">
      <head>
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
