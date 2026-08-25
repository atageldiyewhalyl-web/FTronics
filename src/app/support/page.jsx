import { Button, Chip, SectionHead } from '@/components/ui'
import { ScrollGallery } from '@/components/scroll'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  /* Root layout appends " | FT Sicherheitstechnik" via the title template. */
  title: 'Support, Downloads & Tutorials',
  description:
    'Support-Center von FT Sicherheitstechnik: Anleitungen, Downloads, Tutorials & Fernwartung für Ihre Sicherheitssysteme. Schnelle Hilfe garantiert.',
  alternates: { canonical: '/support' },
}

/* ---------------- section data ---------------- */

/* Both Guard Station builds ship the identical feature set — the artboard
   repeats the list verbatim in each card, so one const feeds both. */
const guardStationFeatures = [
  'Live-Ansicht und Wiedergabe für bis zu 64 Kameras',
  'Integrierte Zeitplanverwaltung und Ereignisprogrammierung',
  'Remote-Konfiguration',
  'Einfacher Datenexport über integrierten Downloadmanager',
  'Snapshots und Sofortaufnahmen direkt aus der Live-Ansicht',
  'Verwaltung von bis zu 50 Benutzern',
]

/* The installer binaries are not part of the handoff — the artboard links
   both download buttons to "#", so the CTA stays inert until assets exist. */
const downloads = [
  ['Guard Station für Windows', '.exe · Win 10/11'],
  ['Guard Station für Mac', '.pkg · macOS 11+'],
]

const tutorials = [
  ['Guard Station', 'Cloud-Anmeldung'],
  ['Guard Station', 'Aufnahmen anschauen'],
  ['Guard Viewer App', 'Zeiteinstellung'],
  ['Guard Viewer App', 'Videos abspielen'],
  ['Guard Viewer App', 'Push-Benachrichtigung aktivieren'],
  ['Guard Viewer App', 'Meldungen löschen'],
  ['Türsprechanlage', 'Türsprechanlage in App einlernen'],
  ['Türsprechanlage', 'Push-Benachrichtigung aktivieren (DMSS)'],
]

const panel = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
}

const tutorialLink = {
  color: 'var(--fg)',
  font: '500 var(--t-body-sm) var(--font-ui)',
  textDecoration: 'none',
}

/* ---------------- page ---------------- */

export default function Support() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Support', href: '/support' },
          ])
        )}
      />

      {/* 17.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Support &amp; Downloads</p>
            <h1 data-rev>Hilfe &amp; Downloads für Ihre FTronics-Geräte</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                color: 'var(--fg-secondary)', margin: '1rem 0 0',
              }}
            >
              Kostenlose Software-Downloads, Video-Tutorials und Remote-Support: alles was Sie für
              die Einrichtung und Bedienung Ihrer Sicherheitstechnik brauchen.
            </p>
          </div>
        </div>
      </section>

      {/* 17.2 Software Downloads + Remote-Support */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Software Downloads"
            title="Steuerungssoftware für Ihre Kameras"
            lead="Guard Station: die zentrale Software zur Verwaltung Ihrer FTronics Videoüberwachung."
          />

          <div
            data-rev-group
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(300px,100%),1fr))',
              gap: '1.25rem', marginTop: '3rem',
            }}
          >
            {downloads.map(([name, format]) => (
              <div
                data-rev
                key={name}
                style={{ ...panel, padding: '2rem', display: 'flex', flexDirection: 'column' }}
              >
                <div
                  style={{
                    display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                    gap: 12, marginBottom: '.6em',
                  }}
                >
                  <h4 style={{ margin: 0 }}>{name}</h4>
                  <Chip>{format}</Chip>
                </div>
                <ul className="ft-list" style={{ margin: '0 0 1.5rem', gap: 7, flex: 1 }}>
                  {guardStationFeatures.map((f) => <li key={f}>{f}</li>)}
                </ul>
                <Button variant="secondary" href="#">Guard Station herunterladen</Button>
              </div>
            ))}
          </div>

          <div
            data-rev
            style={{
              background: 'var(--bg-raised)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)', padding: '2rem', marginTop: '1.25rem',
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 640 }}>
              <h4 style={{ marginBottom: '.4em' }}>Remote-Support</h4>
              <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                Für schnelle Hilfe aus der Ferne nutzen wir AnyDesk. Laden Sie die Software herunter
                und teilen Sie uns Ihre ID mit. Unsere Techniker verbinden sich direkt mit Ihrem
                System.
              </p>
            </div>
            <Button href="#">AnyDesk herunterladen</Button>
          </div>
        </div>
      </section>

      {/* 17.3 Video-Tutorials + Closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="FTronics Akademie"
            title="Video-Tutorials"
            lead="Schritt-für-Schritt-Anleitungen für Ihre Sicherheitstechnik, direkt von unseren Experten."
          />

          <div data-rev style={{ marginTop: '2.5rem' }}>
            <ScrollGallery label="Video-Tutorials" itemWidth={320}>
              {tutorials.map(([cat, title]) => (
                <article
                  key={title}
                  style={{
                    ...panel, padding: '1.6rem', display: 'flex', flexDirection: 'column',
                    gap: 10, minHeight: 150,
                  }}
                >
                  <Chip style={{ alignSelf: 'flex-start' }}>{cat}</Chip>
                  <h4 style={{ margin: 0, flex: 1 }}>{title}</h4>
                  <a href="#" style={tutorialLink}>Tutorial ansehen →</a>
                </article>
              ))}
            </ScrollGallery>
          </div>

          <div
            data-rev
            style={{
              ...panel, borderRadius: 'var(--r-xl)', padding: 'clamp(2rem,5vw,4rem)',
              marginTop: '3rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>Noch Fragen? Wir helfen gerne</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Unser Support-Team steht Ihnen bei allen Fragen rund um Installation und Bedienung
                zur Seite.
              </p>
            </div>
            <Button href="/kontakt">{cta.contact}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
