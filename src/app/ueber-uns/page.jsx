import { Button, Card, SectionHead, Placeholder } from '@/components/ui'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  /* The root layout appends " | FT Sicherheitstechnik" via title.template. */
  title: 'Über uns: Gründergeschichte & Team',
  description:
    'Lernen Sie FT Sicherheitstechnik kennen: Gründer Hüseyin Gökcay, 15+ Jahre Erfahrung, Plus X Award Top 100 (2026). Ihr Partner für Sicherheitstechnik in Mannheim.',
  alternates: { canonical: '/ueber-uns' },
}

/* ---------------- section data ---------------- */

/* Gründer-Timeline. The marker is the artboard's pill label: a year where the
   story names one, otherwise the step number — reproduced verbatim. */
const timeline = [
  [
    '1',
    'Alles begann mit einem Polizeiauto',
    'Mit acht Jahren zerlegt Hüseyin Gökcay sein ferngesteuertes Polizeiauto. Der Lautsprecher interessiert ihn mehr als das Spielzeug.',
  ],
  [
    '2',
    'Der Computermarkt auf der Industriestraße',
    'Wochenende für Wochenende mit dem Vater auf dem Mannheimer Computermarkt, zwischen Platinen, Gehäusen und Ersatzteilen.',
  ],
  [
    '3',
    'Mit 11 Jahren: Der erste eigene PC',
    'Selbst zusammengebaut. Bald folgen die ersten IT-Aufträge aus der Nachbarschaft, das erste Taschengeld mit Technik.',
  ],
  [
    '4',
    'Samstags in der Autowerkstatt',
    'In der Werkstatt des Onkels lernt er Fahrzeugelektrik von Grund auf: Kabelbäume, Steuergeräte, saubere Verlegung.',
  ],
  [
    '5',
    'Eigene Platinen und endloses Lernen',
    'Er entwirft und ätzt eigene Platinen, baut Schaltungen und lernt, dass Präzision keine Abkürzung kennt.',
  ],
  [
    '2008',
    'Die erste professionelle Installation',
    'Kamerainstallation in einer Bäckerei, inklusive Software für die Fernansicht, der Anfang von allem, was folgt.',
  ],
  [
    '7',
    'Studium und der Weg zur Gründung',
    'Maschinenbau, dann Management an der HDWM Mannheim. Technik und Unternehmertum wachsen zusammen.',
  ],
  [
    '2013',
    'Gründung von FT Sicherheitstechnik',
    'Noch während des Studiums gegründet. Das Unternehmen wächst: ohne Werbung, allein durch Empfehlungen.',
  ],
  [
    '2015',
    'FTronics: Die eigene Marke',
    'Eigene Produktion, patentierte Lösungen und die ersten Aufträge für Shell. FTronics wird zur Hardware-Marke des Hauses.',
  ],
]

const values = [
  [
    'Qualität',
    'Keine Kompromisse bei Material und Ausführung: jede Anlage wird gebaut, als wäre sie für das eigene Zuhause.',
  ],
  [
    'Kundenbeziehung',
    'Feste Ansprechpartner statt anonymer Hotline. Wir kennen unsere Kunden und ihre Anlagen persönlich.',
  ],
  [
    'Professionalität',
    'Normgerechte Installation, saubere Dokumentation, verlässliche Termine. Handwerk auf Industrie-Niveau.',
  ],
  [
    'Lebenslanges Lernen',
    'Technik entwickelt sich weiter, wir uns auch. Schulungen und Zertifizierungen gehören zum Alltag.',
  ],
]

const awards = [
  ['Plus X Award 2026', 'Ausgezeichnet als eine der Top 100 Sicherheitstechnikfirmen Deutschlands.'],
  [
    'Hohe Kundenzufriedenheit 2024',
    'Vom Deutschen Institut für Produkt und Marktbewertung ausgezeichnet.',
  ],
]

/* The year pill flips to the signal colour as its row reveals — the one
   effect on this page that needs a descendant selector rather than a style
   object, so it ships as a scoped rule instead of inline CSS. */
const timelineCss = `
.tl-year{transition:background var(--dur-3) var(--ease-out),color var(--dur-3) var(--ease-out),border-color var(--dur-3) var(--ease-out)}
[data-rev].is-in .tl-year{background:var(--ft-signal-500);color:var(--ft-paper);border-color:var(--ft-signal-500)}
@media(prefers-reduced-motion:reduce){.tl-year{transition:none}}
`

const yearPill = {
  position: 'absolute',
  left: -32,
  top: 0,
  width: 64,
  height: 32,
  display: 'grid',
  placeItems: 'center',
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-pill)',
  font: '500 12px var(--font-mono)',
  color: 'var(--fg-secondary)',
}

/* ---------------- page ---------------- */

export default function UeberUns() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Über uns', href: '/ueber-uns' },
          ])
        )}
      />
      <style dangerouslySetInnerHTML={{ __html: timelineCss }} />

      {/* 24.1 Hero — Text + Team-/Werkstattfoto */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div
          className="ft-shell"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: 'clamp(2rem,4vw,4rem)',
            alignItems: 'center',
          }}
        >
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Über uns</p>
            <h1 data-rev>Über FT Sicherheitstechnik</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 1.45,
                color: 'var(--fg-secondary)', margin: '1rem 0 0',
              }}
            >
              Mehr als 15 Jahre Erfahrung, getrieben von Leidenschaft für Technik und dem Anspruch,
              Sicherheit auf höchstem Niveau zu liefern.
            </p>
          </div>
          <div data-rev>
            <Placeholder ratio="4 / 3" label="Team- / Werkstattfoto Mannheim" />
          </div>
        </div>
      </section>

      {/* 24.2 Unsere Geschichte — Gründer-Timeline */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Unsere Geschichte"
            title="Vom Kinderzimmer zum Unternehmen"
            lead="Wie aus kindlicher Neugier und unternehmerischem Geist ein preisgekröntes Sicherheitsunternehmen entstand."
          />
          <div style={{ maxWidth: 820, marginTop: '3.5rem', display: 'flex', flexDirection: 'column' }}>
            {timeline.map(([year, title, text], i) => {
              const last = i === timeline.length - 1
              return (
                <div
                  data-rev
                  key={title}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '64px 1fr',
                    gap: '1.25rem',
                    marginLeft: 31,
                    position: 'relative',
                    ...(last
                      ? null
                      : { paddingBottom: '2.5rem', borderLeft: '1px solid var(--border)' }),
                  }}
                >
                  <span className="tl-year" style={yearPill}>{year}</span>
                  <span />
                  <div>
                    <h4 style={{ marginBottom: '.4em' }}>{title}</h4>
                    <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                      {text}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* 24.3 Werte */}
      <section
        className="ft-section--raised"
        style={{ padding: 'clamp(5rem,7vw,8rem) 0', marginTop: 'clamp(5rem,7vw,8rem)' }}
      >
        <div className="ft-shell">
          <SectionHead eyebrow="Werte" title="Wofür wir stehen" />
          <div data-rev-group className="ft-grid ft-grid--auto-sm" style={{ marginTop: '2.5rem' }}>
            {values.map(([title, text]) => (
              <div data-rev key={title}>
                <Card title={title}>{text}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24.4 Auszeichnungen */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Ausgezeichnet"
            title="Unsere Auszeichnungen"
            lead="Qualität, die anerkannt wird, von unabhängigen Instituten bestätigt."
          />
          <div data-rev-group className="ft-grid ft-grid--auto" style={{ marginTop: '2.5rem' }}>
            {awards.map(([title, text]) => (
              <div data-rev key={title}>
                <Card title={title}>{text}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 24.5 Closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell">
          <div
            data-rev
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)',
              padding: 'clamp(2rem,5vw,4rem)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>Lernen Sie uns kennen</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Vereinbaren Sie ein unverbindliches Erstgespräch. Wir freuen uns darauf, Sie
                persönlich zu beraten.
              </p>
            </div>
            <Button href="/kontakt">{cta.contact}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
