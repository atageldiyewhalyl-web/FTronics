import { Button, Card, ChipRow, CtaFlatlay, SectionHead } from '@/components/ui'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { CtaAnfrageForm } from '../CtaAnfrageForm'

export const metadata = {
  /* The root layout appends " | FT Sicherheitstechnik" via title.template,
     which reproduces the live title exactly without doubling the suffix. */
  title: 'Partner: Ajax, Dahua, Jablotron, Akuvox',
  description:
    'Unsere Technologie-Partner: Ajax Systems, Dahua, Jablotron, Akuvox und mehr. FT Sicherheitstechnik setzt auf führende Hersteller der Sicherheitsbranche.',
  alternates: { canonical: '/partner' },
}

/* ---------------- section data ---------------- */

/** The four Hauptpartner — bento cards, in the artboard's order. */
const partners = [
  {
    name: 'Ajax Systems',
    tags: ['Einbruchschutz', 'Videoüberwachung', 'Brandschutz', 'Smart Home'],
    text: 'Europas meistausgezeichnetes kabelloses Alarmsystem. Ajax vereint Einbruchschutz, Videoüberwachung, Brandschutz und Smart-Home-Steuerung in einer einzigen App. Das proprietäre Jeweller-Funkprotokoll erreicht bis zu 2 km Reichweite bei bis zu 7 Jahren Batterielebensdauer.',
  },
  {
    name: 'Dahua Technology',
    tags: ['IP-Kameras', 'Videorekorder', 'KI-Analytik', 'Zutrittskontrolle'],
    text: 'Weltweit zweitgrößter Hersteller für Videoüberwachung. Dahua bietet ein umfassendes Portfolio an IP-Kameras, Rekordern und KI-basierter Videoanalytik, von kompakten Dome-Kameras bis hin zu Thermal- und PTZ-Systemen für anspruchsvolle Gewerbeobjekte.',
  },
  {
    name: 'Jablotron',
    tags: ['Alarmanlagen', 'Brandmeldung', 'Smart Home', 'Hybrid-Technik'],
    text: 'Tschechischer Hersteller mit über 30 Jahren Erfahrung in Eigenentwicklung und -produktion. Jablotron-Alarmanlagen sind bekannt für Zuverlässigkeit und intuitive Bedienung, inklusive App-Steuerung und bewährter Systeme für den deutschen Markt.',
  },
  {
    name: 'Akuvox',
    tags: ['Türsprechanlagen', 'Zutrittskontrolle', 'Gesichtserkennung', 'SIP / ONVIF'],
    text: 'Weltweit führend bei SIP-basierten Video-Türsprechanlagen und Zutrittskontrolle. Akuvox bietet IP-Video-Türstationen mit KI-Gesichtserkennung, offenen Standards (SIP, ONVIF) und nahtloser Integration in bestehende Gebäudetechnik, ideal für Wohnanlagen und Gewerbe.',
  },
]

/** Secondary brand strip below the partner grid. */
const portfolio = ['HIKVISION', 'ABUS', 'SIEDLE', 'GIRA', 'KNX']

const reasons = [
  ['Herstellerunabhängige Beratung', 'Wir sind keinem einzelnen Hersteller verpflichtet. Unsere Empfehlung basiert immer auf Ihren Anforderungen: objektiv, transparent und technisch fundiert.'],
  ['Zertifizierte Installation', 'Unsere Techniker sind vom Hersteller geschult und zertifiziert. Jede Installation erfolgt normkonform nach aktuellen Standards, inklusive Dokumentation und Einweisung.'],
  ['Alles aus einer Hand', 'Von der Bedarfsanalyse über die Planung und Installation bis zur Wartung und Notruf-Aufschaltung: Sie haben einen Ansprechpartner für alles.'],
]

/* ---------------- page ---------------- */

export default function Partner() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Partner', href: '/partner' },
          ])
        )}
      />

      {/* 10.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Unsere Technologiepartner</p>
            <h1 data-rev style={{ maxWidth: '18ch' }}>
              Starke Partner für Ihre Sicherheit
            </h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)',
                maxWidth: 680, margin: '1rem 0 0',
              }}
            >
              Wir arbeiten ausschließlich mit weltweit führenden Herstellern zusammen, für Systeme,
              die zuverlässig schützen und sich nahtlos in Ihr Gebäude integrieren.
            </p>
          </div>
        </div>
      </section>

      {/* 10.2 Hauptpartner */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Hauptpartner"
            title="Unsere Technologiepartner im Detail"
            lead="Die führenden Hersteller, auf deren Produkte wir setzen: geprüft, bewährt und fachgerecht von uns installiert."
          />

          <div
            data-rev-group
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
              gap: '1.25rem', marginTop: '3rem',
            }}
          >
            {partners.map((p) => (
              <div
                data-rev
                key={p.name}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-bento)', padding: 'clamp(1.8rem,3vw,3rem)',
                  display: 'flex', flexDirection: 'column', gap: '1rem', minHeight: 300,
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)', fontWeight: 600,
                    fontSize: 'var(--t-h3)', letterSpacing: '-0.012em',
                  }}
                >
                  {p.name}
                </span>
                <ChipRow>
                  {p.tags.map((t) => <span className="ft-chip" key={t}>{t}</span>)}
                </ChipRow>
                <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)', flex: 1 }}>
                  {p.text}
                </p>
              </div>
            ))}
          </div>

          {/* Weiteres Portfolio — secondary brand strip */}
          <div
            data-rev
            style={{
              marginTop: '2.5rem', border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', padding: '1.6rem', display: 'flex',
              flexWrap: 'wrap', gap: 'clamp(1rem,3vw,2.5rem)', alignItems: 'center',
              justifyContent: 'space-between', background: 'var(--bg-raised)',
            }}
          >
            <span
              style={{
                font: '500 12px var(--font-ui)', letterSpacing: '.06em',
                textTransform: 'uppercase', color: 'var(--fg-tertiary)',
              }}
            >
              Weiteres Portfolio
            </span>
            {portfolio.map((b) => (
              <span
                key={b}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 600, color: 'var(--fg-secondary)' }}
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 10.3 Warum FT Sicherheitstechnik? */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Warum FT Sicherheitstechnik?"
            title="Herstellerunabhängig. Zertifiziert. Aus einer Hand."
          />
          <div data-rev-group className="ft-grid ft-grid--auto" style={{ marginTop: '2.5rem' }}>
            {reasons.map(([t, d]) => (
              <div data-rev key={t}>
                <Card title={t}>{d}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.4 Closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell">
          <div
            data-rev
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(2rem,5vw,4rem)',
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>Lassen Sie sich beraten, herstellerunabhängig</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir finden die passende Technologie für Ihr Objekt. Kostenlose Erstberatung vor Ort
                in der Metropolregion Rhein-Neckar.
              </p>
            </div>
            <CtaAnfrageForm />
          </div>
        </div>
        <CtaFlatlay />
      </section>
    </>
  )
}
