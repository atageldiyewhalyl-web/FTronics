import { site, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { KontaktForm } from './KontaktForm'

export const metadata = {
  title: 'Kontakt: Beratung anfragen',
  description:
    'Kontakt zu FT Sicherheitstechnik Mannheim: Hafenbahnstraße 15, +49 621 159 647 34, info@ftst.eu. Anfrage senden, Antwort innerhalb von 24 Stunden garantiert.',
  alternates: { canonical: '/kontakt' },
}

/* ---------------- section data ---------------- */

const kontaktdaten = [
  ['E-Mail', site.email, `mailto:${site.email}`],
  ['Telefon', site.phone, site.phoneHref],
  ['Adresse', `${site.street}, ${site.postalCode} ${site.city}`, null],
  ['Öffnungszeiten', site.hours, null],
]

const panel = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
}

/* ---------------- page ---------------- */

export default function Kontakt() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Kontakt', href: '/kontakt' },
          ])
        )}
      />

      {/* 19.1 Hero + Anfrage / Kontaktdaten */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Kontakt</p>
            <h1 data-rev>Sprechen Sie mit uns</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                color: 'var(--fg-secondary)', margin: '1rem 0 0',
              }}
            >
              Wir beraten Sie persönlich und unverbindlich. Antwort innerhalb von 24 Stunden garantiert.
            </p>
          </div>

          <div
            style={{
              /* min(320px,100%), not a bare 320px: a bare minimum is a floor the track
                 keeps even when the column is narrower than it, so on a 320px screen
                 the 288px of usable width still had to hold a 320px track. */
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(320px,100%),1fr))',
              gap: 'clamp(1.5rem,3vw,3rem)', marginTop: '3rem', alignItems: 'start',
            }}
          >
            {/* Anfrage senden */}
            <div data-rev style={{ ...panel, padding: 'clamp(1.6rem,3vw,2.5rem)' }}>
              <h4 style={{ marginBottom: '1em' }}>Anfrage senden</h4>
              <KontaktForm />
            </div>

            {/* Kontaktdaten + Karte */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div data-rev style={{ ...panel, padding: '1.6rem' }}>
                <p
                  style={{
                    font: '500 12px var(--font-ui)', letterSpacing: '.06em',
                    textTransform: 'uppercase', color: 'var(--fg-tertiary)', margin: '0 0 1.2rem',
                  }}
                >
                  Kontaktdaten
                </p>
                <dl style={{ margin: 0, display: 'grid', gap: 12, fontSize: 'var(--t-body-sm)' }}>
                  {kontaktdaten.map(([label, value, href], i) => (
                    <div
                      key={label}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 12,
                        ...(i < kontaktdaten.length - 1
                          ? { borderBottom: '1px solid var(--border)', paddingBottom: 10 }
                          : null),
                      }}
                    >
                      <dt style={{ color: 'var(--fg-tertiary)' }}>{label}</dt>
                      <dd style={{ margin: 0, textAlign: 'right', fontWeight: 500 }}>
                        {href ? (
                          <a href={href} style={{ color: 'var(--fg)', textDecoration: 'none', fontWeight: 500 }}>
                            {value}
                          </a>
                        ) : (
                          value
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div data-rev>
                {/* The address comes from site.js rather than being typed here,
                    so the map cannot drift from the details listed above it.
                    output=embed is the keyless Maps embed; title carries the
                    place for anyone who cannot see the frame. */}
                <iframe
                  className="ft-map"
                  title={`Karte: ${site.street}, ${site.postalCode} ${site.city}`}
                  src={`https://www.google.com/maps?q=${encodeURIComponent(
                    `${site.street}, ${site.postalCode} ${site.city}`
                  )}&z=16&output=embed`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
