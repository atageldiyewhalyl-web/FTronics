import { Button, Card, SectionHead, Placeholder } from '@/components/ui'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  /* The live site publishes no Karriere <title>/description pair in the
     content inventory — this follows the naming pattern of every other
     page, and the root layout appends " | FT Sicherheitstechnik". */
  title: 'Karriere & Ausbildung in Mannheim',
  description:
    'Karriere bei FT Sicherheitstechnik Mannheim: Servicetechniker (m/w/d) und Ausbildung zum Elektroniker für Sicherheitstechnik. Unbefristet, Firmenfahrzeug, Weiterbildungen.',
  alternates: { canonical: '/karriere' },
}

/* ---------------- section data ---------------- */

const perks = [
  [
    'Zukunftssichere Branche',
    'Sicherheitstechnik wächst stetig, eine Branche mit langfristiger Perspektive und krisenfesten Arbeitsplätzen.',
  ],
  [
    'Abwechslungsreiche Projekte',
    'Von Privathäusern bis Industrieanlagen: jedes Projekt bringt neue Herausforderungen und Erfahrungen.',
  ],
  [
    'Moderne Technologie',
    'Arbeit mit Ajax, Dahua, KI-Kameras, Smart Home, immer am Puls der neuesten Sicherheitstechnik.',
  ],
  [
    'Familiäres Team',
    'Flache Hierarchien, direkter Kontakt zum Geschäftsführer. Bei uns bist du kein Nummernschild, sondern ein geschätztes Teammitglied.',
  ],
]

/* Both open positions. `cols` drives the accordion body *and* the
   JobPosting description below, so the two can never drift apart. */
const jobs = [
  {
    title: 'Servicetechniker Sicherheitstechnik (m/w/d)',
    meta: 'Vollzeit · Mannheim & Metropolregion Rhein-Neckar',
    employmentType: 'FULL_TIME',
    cols: [
      [
        'Aufgaben',
        [
          'Installation & Wartung von Alarmanlagen, Videoüberwachung, Zutrittskontrolle und Smart-Home-Systemen',
          'Programmierung und Inbetriebnahme',
          'Kundeneinweisung',
          'Fehlerdiagnose und Reparatur',
        ],
      ],
      [
        'Qualifikationen',
        [
          'Ausbildung als Elektroniker, Elektroinstallateur, IT-Systemelektroniker o. ä.',
          'Erfahrung mit Netzwerktechnik (IP, PoE) von Vorteil',
          'Führerschein Klasse B',
          'Deutschkenntnisse, Teamfähigkeit, Kundenorientierung',
        ],
      ],
      [
        'Wir bieten',
        [
          'Unbefristeter Vertrag',
          'Firmenfahrzeug',
          'Weiterbildungen und Zertifizierungen',
          'Moderne Werkzeuge und Ausstattung',
          'Leistungsgerechte Vergütung',
        ],
      ],
    ],
  },
  {
    title: 'Auszubildender Elektroniker für Sicherheitstechnik (m/w/d)',
    meta: 'Ausbildung · Mannheim',
    employmentType: 'INTERN',
    cols: [
      [
        'Was dich erwartet',
        [
          'Praxisnahe Ausbildung in einem wachsenden Unternehmen',
          'Arbeit mit modernster Sicherheitstechnik',
          'Begleitung durch erfahrene Techniker',
          'Übernahmechance nach der Ausbildung',
        ],
      ],
      [
        'Was du mitbringst',
        [
          'Mittlere Reife oder Abitur',
          'Interesse an Technik und Elektronik',
          'Handwerkliches Geschick',
          'Zuverlässigkeit und Teamfähigkeit',
        ],
      ],
    ],
  },
]

const steps = [
  [
    '1',
    'Bewerbung senden',
    'Schick uns deine Bewerbung per E-Mail an karriere@ftst.eu. Ein Lebenslauf genügt, kein langes Anschreiben nötig.',
  ],
  [
    '2',
    'Kennenlerngespräch',
    'Wir melden uns zeitnah bei dir und laden dich zu einem persönlichen Gespräch ein, entspannt und auf Augenhöhe.',
  ],
  [
    '3',
    'Probearbeitstag & Start',
    'Lerne das Team und die Arbeit kennen. Wenn es für beide Seiten passt, steht deinem Start nichts mehr im Weg.',
  ],
]

/* One JobPosting block per open position, mirroring the two blocks the
   live site ships. `datePosted` is deliberately omitted — the handoff
   carries no posting date and a guessed one would be a false fact. */
function jobPostingJsonLd(job) {
  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.cols
      .map(([label, items]) => `${label}: ${items.join('; ')}`)
      .join('. '),
    employmentType: job.employmentType,
    directApply: true,
    hiringOrganization: {
      '@type': 'Organization',
      name: site.name,
      sameAs: site.url,
      '@id': `${site.url}/#organization`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.street,
        addressLocality: site.city,
        postalCode: site.postalCode,
        addressRegion: site.region,
        addressCountry: site.country,
      },
    },
  }
}

/* Accordion chrome — the artboard's only bespoke CSS. Native
   <details>/<summary> keeps the page a Server Component. */
const css = `
details.job{background:var(--bg-card);border:1px solid var(--border);border-radius:var(--r-lg);padding:1.8rem}
details.job summary{display:flex;gap:1rem;align-items:center;cursor:pointer;list-style:none}
details.job summary::-webkit-details-marker{display:none}
details.job summary:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:var(--r-sm)}
details.job h4{margin:0 0 .3em}
details.job .job-meta{color:var(--fg-tertiary);font-size:var(--t-body-sm)}
details.job .chev{margin-left:auto;color:var(--fg-tertiary);transition:transform var(--dur-2) var(--ease-out)}
details.job[open] .chev{transform:rotate(180deg)}
.job-cols{margin-top:1.5rem;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:1.5rem}
.job-label{font:500 12px var(--font-ui);letter-spacing:.06em;text-transform:uppercase;color:var(--fg-tertiary);margin:0 0 .6em}
`

/* ---------------- page ---------------- */

export default function Karriere() {
  return (
    <>
      {jobs.map((j) => (
        <script
          key={j.title}
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd(jobPostingJsonLd(j))}
        />
      ))}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Karriere', href: '/karriere' },
          ])
        )}
      />
      <style href="karriere-page" precedence="default">{css}</style>

      {/* 18.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div
          className="ft-shell"
          style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
            gap: 'clamp(2rem,4vw,4rem)', alignItems: 'center',
          }}
        >
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Karriere bei FT</p>
            <h1 data-rev>Gestalte Sicherheit mit uns</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                color: 'var(--fg-secondary)', margin: '1rem 0 1.6rem',
              }}
            >
              Werde Teil eines wachsenden Teams in der Metropolregion Rhein-Neckar.
            </p>
            <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Button href="#stellen">Offene Stellen ansehen</Button>
              <Button variant="secondary" href={`mailto:${site.careersEmail}`}>
                Initiativbewerbung
              </Button>
            </div>
          </div>
          <div data-rev>
            <Placeholder ratio="4 / 3" label="Team bei der Arbeit" />
          </div>
        </div>
      </section>

      {/* 18.2 Was uns als Arbeitgeber auszeichnet */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Arbeitgeber" title="Was uns als Arbeitgeber auszeichnet" />
          <div
            data-rev-group
            className="ft-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(240px,100%),1fr))',
              marginTop: '2.5rem',
            }}
          >
            {perks.map(([t, d]) => (
              <div data-rev key={t}>
                <Card title={t}>{d}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18.3 Offene Stellen — native accordions, no client JS */}
      <section id="stellen" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0', scrollMarginTop: 90 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 var(--gutter)' }}>
          <SectionHead eyebrow="Offene Stellen" title="Aktuelle Positionen" />
          <div
            style={{
              marginTop: '2.5rem', display: 'flex',
              flexDirection: 'column', gap: '1.25rem',
            }}
          >
            {jobs.map((j) => (
              <details className="job" data-rev key={j.title}>
                <summary>
                  <div>
                    <h4>{j.title}</h4>
                    <span className="job-meta">{j.meta}</span>
                  </div>
                  <span className="chev" aria-hidden="true">↓</span>
                </summary>
                <div className="job-cols">
                  {j.cols.map(([label, items]) => (
                    <div key={label}>
                      <p className="job-label">{label}</p>
                      <ul className="ft-list">
                        {items.map((x) => <li key={x}>{x}</li>)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '1.5rem' }}>
                  <Button href={`mailto:${site.careersEmail}`} size="sm">{cta.apply}</Button>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 18.4 Bewerbungsprozess + closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Bewerbungsprozess" title="In 3 Schritten zum neuen Job" />
          <div
            data-rev-group
            className="ft-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(min(260px,100%),1fr))',
              marginTop: '2.5rem',
            }}
          >
            {steps.map(([n, t, d]) => (
              <div
                data-rev
                key={n}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: '2rem',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-display)', fontSize: 'var(--t-h2)', fontWeight: 600,
                    lineHeight: 1, color: 'var(--fg-tertiary)', display: 'block', marginBottom: '1rem',
                  }}
                >
                  {n}
                </span>
                <h4 style={{ marginBottom: '.5em' }}>{t}</h4>
                <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>{d}</p>
              </div>
            ))}
          </div>

          <div
            data-rev
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(2rem,5vw,4rem)', marginTop: '3rem',
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>{cta.apply}</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Bereit für den nächsten Schritt? Schick uns deine Bewerbung. Wir freuen uns auf
                dich! Oder ruf uns an: {site.phone}
              </p>
            </div>
            <Button href={`mailto:${site.careersEmail}`}>Bewerbung per E-Mail senden</Button>
          </div>
        </div>
      </section>
    </>
  )
}
