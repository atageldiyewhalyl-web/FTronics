import { Button, Card, SectionHead, Placeholder } from '@/components/ui'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { ProductTabs } from './ProductTabs'

export const metadata = {
  title: 'FTronics FB-8A Pro: 4K Bullet IP-Kamera mit Gesichtserkennung',
  description:
    'FTronics FB-8A Pro Bullet-Kamera: 4K Ultra HD, Gesichtserkennung, Perimeterüberwachung, Sony IMX415, IP67. Technische Daten & Beratung.',
  alternates: { canonical: '/produkte/fb-8a-pro' },
}

/* ---------------- section data ---------------- */

const tabs = [
  { id: 'uebersicht', label: 'Übersicht' },
  { id: 'technische-daten', label: 'Technische Daten' },
  { id: 'ki-funktionen', label: 'KI-Funktionen' },
  { id: 'downloads', label: 'Downloads' },
]

const heroSpecs = [
  ['8MP', '4K Ultra HD · 25 fps'],
  ['Sony', 'IMX415 Sensor'],
  ['IP67', 'Wetterfest · 4000V Blitzschutz'],
  ['NDAA', 'Konform · Behördentauglich'],
]

const features = [
  ['Gesichtserkennung', 'Erkennt Gesichter in 1-5m Entfernung mit Mindestgröße 12px für zuverlässige Identifikation und Zugangskontrolle.'],
  ['Volle KI-Suite', '6 intelligente Analysefunktionen: Gesichts-, Personen-, Fahrzeug-, Haustier-Erkennung plus Linienüberschreitung und Perimeter.'],
  ['4K Ultra HD', '3840×2160 Pixel bei 20fps (8MP) oder 30fps bei 6MP/5MP/4MP für flexible Konfiguration.'],
  ['IP67 Wetterfest', 'Vollständig staub- und wasserdicht mit 4000V Blitzschutz, optimiert für den dauerhaften Außeneinsatz.'],
  ['Perimeterüberwachung', '4 konfigurierbare Zonen für Eindringungserkennung mit Alarm-Auslösung über LED, Sirene oder Aufnahme.'],
  ['Linienüberschreitung', '4 virtuelle Linien für richtungsgebundene Erkennung, ideal für Eingangszählung und Zugangskontrolle.'],
]

const useCases = ['Außengelände', 'Grundstücksüberwachung', 'Gewerbe', 'Parkplätze', 'Perimeter']

const specGroups = [
  {
    title: 'Sensor & Video',
    rows: [
      ['Bildsensor', '1/2.8" 8MP Sony IMX415 CMOS'],
      ['SoC', 'Sigmastar SSC378DE'],
      ['Verschlusszeit', 'AUTO / 1/10s – 1/8000s'],
      ['WDR / DNR', 'Ja · 2D / 3D'],
      ['Videostandard', 'H.264 / H.265'],
      ['Hauptstream', '20fps @ 8MP · 30fps @ 6MP/5MP/4MP'],
      ['Substream', '10fps @ 720P / 30fps @ D1'],
      ['Bitrate', '64 kbps – 8 Mbps'],
    ],
  },
  {
    title: 'Netzwerk & Software',
    rows: [
      ['Privatzonenmasken', '4'],
      ['ROI', '8 pro Stream'],
      ['ONVIF', '23.12 (S/G/T/M)'],
      ['P2P', 'Ja'],
      ['PC-Client', 'GuardStation VMS'],
      ['Mobile App', 'Guard Viewer (Android / iOS)'],
    ],
  },
  {
    title: 'Objektiv, IR & Audio',
    rows: [
      ['Objektiv', '2.8mm / 3.6mm Festbrennweite'],
      ['IR', '18 SMD LEDs · 20–30m'],
      ['Audio', 'G.711 / AAC · Mikrofon eingebaut'],
      ['Alarm-Auslöser', 'Schnappschuss, Aufnahme, Rot-Blau LED, Weiß-LED, Sirene'],
    ],
  },
  {
    title: 'Allgemein',
    rows: [
      ['Stromversorgung', '12V DC / PoE 802.3af'],
      ['Leistungsaufnahme', '< 8W'],
      ['Betriebstemperatur', '−20 °C bis +60 °C'],
      ['Schutzklasse', 'IP67'],
      ['Blitzschutz', '4000V'],
    ],
  },
]

const aiRows = [
  ['Gesichtserkennung', '1-5m · min. 12px – max. 1000px'],
  ['Personenerkennung', '2-20m'],
  ['Fahrzeugerkennung', '2-20m'],
  ['Linienüberschreitung', '4 Linien'],
  ['Perimeterüberwachung', '4 Bereiche'],
  ['Haustier-Erkennung', 'Ja'],
  ['Max. Ziele', '16 gleichzeitig'],
  ['Zieltypen', 'Mensch, Fahrzeug, Nicht-motorisiert, Haustier, Gesicht'],
]

const trail = [
  { name: 'Start', href: '/' },
  { name: 'Produkte', href: '/produkte' },
  { name: 'FTronics FB-8A Pro', href: '/produkte/fb-8a-pro' },
]

/* Product structured data — mirrors the on-page spec tables only.
   The live site's block also claims a "Motorisiertes Varifokal-Objektiv",
   which contradicts the fixed 2.8/3.6 mm lens listed above, so it is
   deliberately not repeated here. */
const productJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'FTronics FB-8A Pro',
  sku: 'FB-8A-PRO',
  category: 'Überwachungskameras',
  description: '4K Bullet-Kamera mit voller KI-Suite. Gesichts-, Personen- & Fahrzeug-Erkennung.',
  brand: { '@type': 'Brand', name: site.brand },
  manufacturer: { '@type': 'Organization', name: site.name },
  additionalProperty: [
    ['Auflösung', '4K Ultra HD · 3840×2160'],
    ['Bildsensor', '1/2.8" 8MP Sony IMX415 CMOS'],
    ['Gesichtserkennung', 'Ja · 1-5m'],
    ['Perimeterüberwachung', '4 Bereiche'],
    ['Schutzklasse', 'IP67'],
    ['Stromversorgung', '12V DC / PoE 802.3af'],
    ['Videostandard', 'H.264 / H.265'],
  ].map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
}

/* ---------------- local pieces ---------------- */

const panel = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
  padding: '1.6rem',
}

/** The dt/dd row pattern shared by all five spec panels. */
function SpecList({ rows }) {
  return (
    <dl style={{ margin: 0, display: 'grid', gap: 10, fontSize: 'var(--t-body-sm)' }}>
      {rows.map(([term, value], i) => {
        const last = i === rows.length - 1
        return (
          <div
            key={term}
            style={{
              display: 'flex', justifyContent: 'space-between', gap: 12,
              borderBottom: last ? 'none' : '1px solid var(--border)',
              paddingBottom: last ? 0 : 8,
            }}
          >
            <dt style={{ color: 'var(--fg-tertiary)' }}>{term}</dt>
            <dd style={{ margin: 0, textAlign: 'right' }}>{value}</dd>
          </div>
        )
      })}
    </dl>
  )
}

/* ---------------- page ---------------- */

export default function FB8APro() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productJsonLd)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd(trail))} />

      {/* 13.1 Hero */}
      <section style={{ padding: 'clamp(3rem,5vw,5rem) 0 0' }}>
        <div className="ft-shell">
          <p data-rev style={{ fontSize: 13, color: 'var(--fg-tertiary)', margin: '0 0 2rem' }}>
            <a href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Start</a>
            {' › '}
            <a href="/produkte" style={{ color: 'inherit', textDecoration: 'none' }}>Produkte</a>
            {' › '}
            <span style={{ color: 'var(--fg-secondary)' }}>FTronics FB-8A Pro</span>
          </p>

          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center',
            }}
          >
            <div data-rev-group>
              <p className="ft-eyebrow" data-rev>FTronics · Pro-Serie</p>
              <h1 data-rev>FB-8A Pro</h1>
              <p
                data-rev
                style={{
                  fontSize: 'var(--t-lead)', lineHeight: 1.45,
                  color: 'var(--fg-secondary)', margin: '.8rem 0 0',
                }}
              >
                4K Bullet-Kamera mit voller KI-Suite. Gesichts-, Personen- &amp; Fahrzeug-Erkennung.
              </p>
              <p
                data-rev
                style={{
                  color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)',
                  margin: '1rem 0 1.6rem',
                }}
              >
                Für Profis entwickelt. Made for FT.
              </p>
              <div data-rev>
                <Button href="/kontakt">{cta.advice}</Button>
              </div>
            </div>
            <div data-rev>
              <Placeholder ratio="1 / 1" label="FB-8A Pro: Produktrender" />
            </div>
          </div>

          {/* Spec strip — 1px gaps show the border colour through */}
          <div
            data-rev-group
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))',
              gap: 1, background: 'var(--border)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', overflow: 'hidden',
              marginTop: 'clamp(2.5rem,5vw,4rem)',
            }}
          >
            {heroSpecs.map(([n, l]) => (
              <div data-rev key={n} style={{ background: 'var(--bg-card)', padding: '1.4rem' }}>
                <strong style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--t-h4)', display: 'block' }}>
                  {n}
                </strong>
                <span style={{ color: 'var(--fg-tertiary)', fontSize: 13 }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13.2 Sprungmarken */}
      <ProductTabs tabs={tabs} />

      {/* 13.3 Übersicht */}
      <section id="uebersicht" style={{ padding: 'clamp(4rem,6vw,6rem) 0 0', scrollMarginTop: 130 }}>
        <div className="ft-shell">
          <div data-rev-group className="ft-prose">
            <p className="ft-eyebrow" data-rev>Übersicht</p>
            <h2 data-rev>Weit mehr als Videoüberwachung.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
              Die FTronics FB-8A Pro ist unsere leistungsstärkste Bullet IP-Kamera mit einer
              umfassenden KI-Suite, die speziell für anspruchsvolle Sicherheitsanforderungen
              entwickelt wurde. Ausgestattet mit dem Sony IMX415 Sensor und dem fortschrittlichen
              Sigmastar SSC378DE SoC bietet sie eine beeindruckende Bandbreite an intelligenten
              Analysefunktionen.
            </p>
            <p data-rev style={{ color: 'var(--fg-secondary)' }}>
              Mit der integrierten Gesichtserkennung, Perimeterüberwachung und Linienüberschreitung
              geht die FB-8A Pro weit über einfache Videoüberwachung hinaus. Sie erkennt Personen,
              Fahrzeuge, Motorräder und sogar Haustiere, und kann bei Alarm automatisch
              LED-Blitzlicht, Sirene oder Aufnahmen auslösen.
            </p>
            <p data-rev style={{ color: 'var(--fg-secondary)' }}>
              Das robuste Bullet-Gehäuse mit IP67-Schutzklasse macht die Kamera zur idealen Wahl für
              Außengelände, Grundstücksüberwachung und gewerbliche Anwendungen. Die Kombination aus
              4K-Auflösung und fortschrittlicher KI liefert maximale Sicherheit bei minimalem
              Installationsaufwand dank PoE.
            </p>
          </div>

          <div data-rev-group className="ft-grid ft-grid--auto" style={{ marginTop: '3rem' }}>
            {features.map(([t, d]) => (
              <div data-rev key={t}>
                <Card title={t}>{d}</Card>
              </div>
            ))}
          </div>

          <div
            data-rev
            style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center' }}
          >
            <span
              style={{
                font: '500 12px var(--font-ui)', letterSpacing: '.06em',
                textTransform: 'uppercase', color: 'var(--fg-tertiary)', marginRight: 8,
              }}
            >
              Einsatzbereiche
            </span>
            {useCases.map((c) => <span className="ft-chip" key={c}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* 13.4 Technische Daten */}
      <section id="technische-daten" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0', scrollMarginTop: 130 }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Spezifikationen" title="Technische Daten" />
          <div
            data-rev-group
            className="ft-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              marginTop: '2.5rem',
            }}
          >
            {specGroups.map((g) => (
              <div data-rev key={g.title} style={panel}>
                <h4 style={{ marginBottom: '1em' }}>{g.title}</h4>
                <SpecList rows={g.rows} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13.5 KI-Funktionen */}
      <section id="ki-funktionen" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0', scrollMarginTop: 130 }}>
        <div className="ft-shell">
          <SectionHead eyebrow="KI / Intelligente Analyse" title="Sechs Analysefunktionen. Ein Gerät." />
          <div data-rev style={{ ...panel, marginTop: '2.5rem', maxWidth: 820 }}>
            <SpecList rows={aiRows} />
          </div>
        </div>
      </section>

      {/* 13.6 Downloads + Abschluss-CTA */}
      <section id="downloads" style={{ padding: 'clamp(5rem,7vw,8rem) 0', scrollMarginTop: 130 }}>
        <div className="ft-shell">
          <div
            data-rev
            style={{
              ...panel, display: 'flex', flexWrap: 'wrap', gap: '1rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h4 style={{ marginBottom: '.3em' }}>Datenblatt für Ihre Unterlagen.</h4>
              <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                Komplettes PDF mit allen technischen Parametern, Maßzeichnung und Anschlussdiagramm.
              </p>
            </div>
            <Button variant="secondary" href="#">FB-8A Pro Datenblatt (PDF)</Button>
          </div>

          <div
            style={{
              textAlign: 'center', marginTop: 'clamp(4rem,6vw,6rem)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}
          >
            <h2 data-rev style={{ maxWidth: '16ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Bereit für eine Beratung?
            </h2>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 1.45, color: 'var(--fg-secondary)',
                maxWidth: 620, margin: '1rem auto 2rem',
              }}
            >
              Unsere Sicherheitsexperten planen Ihr System individuell, von der einzelnen Kamera bis
              zur kompletten Anlage mit Aufschaltung.
            </p>
            <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <Button href="/kontakt">{cta.advice}</Button>
              <Button variant="secondary" href="/produkte">{cta.products}</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
