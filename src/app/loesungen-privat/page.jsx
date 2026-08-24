import { Button, Chip, ChipRow, SectionHead, Placeholder } from '@/components/ui'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  /* `absolute` because the root layout's title template would otherwise
     append a second " | FT Sicherheitstechnik" to the verified title. */
  title: { absolute: 'Alarmanlagen & Sicherheit für Privat | FT Sicherheitstechnik Mannheim' },
  description:
    'Professionelle Sicherheitslösungen für Ihr Zuhause in Mannheim & Rhein-Neckar: Alarmanlagen, Videoüberwachung, Smart Home & Brandwarnanlagen. Kostenlose Beratung!',
  alternates: { canonical: '/loesungen-privat' },
}

/* ---------------- section data ---------------- */

const badges = ['Vor-Ort-Service', 'Top 100 Deutschlands', 'DSGVO-konform']

/* Five alternating media rows. `flip` mirrors the artboard's .sol-grid.flip —
   the copy column moves to the right on wide viewports but stays first in the
   DOM, so the reading order is identical on mobile. */
const solutions = [
  {
    n: '01',
    h: 'Alarmanlagen',
    li: [
      'Hybride Ajax-Systeme (Funk + Draht)',
      'App-Steuerung & Push-Benachrichtigungen',
      'Sofortige Push-Alarmierung auf Ihr Handy',
      'Fenster-/Tür-/Bewegungsmelder',
      'Versicherungsrabatte möglich',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Ajax Alarmanlage: Installationsfoto',
  },
  {
    n: '02',
    h: 'Videoüberwachung',
    flip: true,
    li: [
      '4K Kameras mit Nachtsicht',
      'KI-basierte Personen- & Fahrzeugerkennung',
      'Fernzugriff per Smartphone',
      'DSGVO-konforme Aufzeichnung',
      'FTronics-Eigenmarke: beste Qualität',
    ],
    label: cta.products,
    href: '/produkte',
    img: 'FTronics Kamera am Eigenheim',
  },
  {
    n: '03',
    h: 'Smart Home',
    li: [
      'KNX & Home Assistant Integration',
      'Licht, Heizung, Rollläden automatisieren',
      'Sprachsteuerung (Alexa, Google)',
      'Energieverbrauch optimieren',
      'Alles in einer App',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Smart Home Steuerung: App',
  },
  {
    n: '04',
    h: 'Türsprechanlagen',
    flip: true,
    li: [
      'Video-Türsprechanlage mit HD-Kamera',
      'Smartphone-Anbindung',
      'Gegensprechfunktion von überall',
      'Automatische Aufzeichnung',
      'Türöffner-Integration',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Video-Türsprechanlage',
  },
  {
    n: '05',
    h: 'Brandschutz',
    li: [
      'Rauchmelder nach DIN VDE',
      'Vernetzte Brandwarnsysteme',
      'Automatische Alarmierung',
      'Regelmäßige Wartung & Prüfung',
      'Gesetzliche Pflicht einfach erfüllt',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Vernetzter Rauchmelder',
  },
]

/* Page-scoped CSS: the alternating media/copy row. Lives here rather than in
   globals.css because this page is the only one that uses it (the Gewerbe
   sibling lays its disciplines out as Cards) — and the min-width flip cannot
   be expressed as an inline style. Copied verbatim from the artboard's own
   <style> block. */
const css = `
.sol-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:clamp(2rem,4vw,4rem);align-items:center}
@media(min-width:961px){.sol-grid.flip>div:first-child{order:2}}
`

/* ---------------- page ---------------- */

export default function LoesungenPrivat() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Privatkunden', href: '/loesungen-privat' },
          ])
        )}
      />
      <style href="loesungen-privat" precedence="default">{css}</style>

      {/* 8.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Privatkunden</p>
            <h1 data-rev style={{ maxWidth: '16ch' }}>Sicherheit für Ihr Zuhause</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 1.45, color: 'var(--fg-secondary)',
                maxWidth: 680, margin: '1rem 0 1.5rem',
              }}
            >
              Schützen Sie Ihre Familie und Ihr Eigentum mit modernster Technik, professionell
              installiert, einfach zu bedienen.
            </p>
            <div data-rev>
              <ChipRow>
                {badges.map((b) => <Chip key={b}>{b}</Chip>)}
              </ChipRow>
            </div>
            <div data-rev style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Button variant="secondary" size="sm" href="/loesungen-gewerbe">
                Für Gewerbekunden →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 8.2 Fünf Lösungsbereiche */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Unsere Lösungen für Privat"
            title="Rundum geschützt zuhause"
            lead="Maßgeschneiderte Sicherheitskonzepte für Wohnungen, Häuser und Grundstücke."
          />
          <div
            style={{
              display: 'flex', flexDirection: 'column',
              gap: 'clamp(4rem,6vw,6rem)', marginTop: '3.5rem',
            }}
          >
            {solutions.map((s) => (
              <div className={`sol-grid${s.flip ? ' flip' : ''}`} key={s.n}>
                <div data-rev-group>
                  <p className="ft-num" data-rev>{s.n}</p>
                  <h3 data-rev>{s.h}</h3>
                  <ul className="ft-list" data-rev style={{ margin: '1rem 0 1.5rem' }}>
                    {s.li.map((x) => <li key={x}>{x}</li>)}
                  </ul>
                  <div data-rev>
                    <Button variant="secondary" href={s.href}>{s.label}</Button>
                  </div>
                </div>
                <div data-rev>
                  <Placeholder ratio="4 / 3" rounded="var(--r-lg)" label={s.img} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8.3 Closing CTA */}
      <section className="ft-section">
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
              <h3 style={{ marginBottom: '.4em' }}>Kostenlose Vor-Ort Beratung</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir kommen zu Ihnen und analysieren Ihre Situation, unverbindlich und kostenfrei.
              </p>
            </div>
            <Button href="/kontakt">{cta.appointment}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
