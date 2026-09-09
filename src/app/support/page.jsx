import { Button, Chip, CtaFlatlay, SectionHead } from '@/components/ui'
import { ScrollGallery } from '@/components/scroll'
import { jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { CtaAnfrageForm } from '../CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'

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

const guardStationBlob = 'https://lc0vcpr1ftmj8gtl.public.blob.vercel-storage.com/downloads'

const downloads = [
  ['Guard Station für Windows', '.exe · Win 10/11', `${guardStationBlob}/guard-station-windows.exe`],
  ['Guard Station für Mac', '.pkg · macOS 11+', `${guardStationBlob}/guard-station-mac.pkg`],
]

const tutorials = [
  {
    category: 'Guard Station',
    title: 'Cloud-Anmeldung',
    description: 'Konto verbinden und Ihre Anlage für sicheren Fernzugriff vorbereiten.',
    href: 'https://www.youtube.com/watch?v=JTx29pUpL3k',
    thumbnail: 'https://i.ytimg.com/vi/JTx29pUpL3k/hqdefault.jpg',
  },
  {
    category: 'Guard Station',
    title: 'Aufnahmen anschauen',
    description: 'Gespeicherte Ereignisse finden, Zeitleiste lesen und relevante Clips prüfen.',
    href: 'https://www.youtube.com/watch?v=LrZnw9JI20E',
    thumbnail: 'https://i.ytimg.com/vi/LrZnw9JI20E/hqdefault.jpg',
  },
  {
    category: 'Guard Viewer App',
    title: 'Zeiteinstellung',
    description: 'Datum und Uhrzeit in der App kontrollieren, damit Aufnahmen sauber zugeordnet werden.',
    href: 'https://www.youtube.com/shorts/N_KOSwgt4_g',
    thumbnail: 'https://i.ytimg.com/vi/N_KOSwgt4_g/hq2.jpg',
  },
]

const quickHelp = [
  ['01', 'Video ansehen', 'Viele Bedienfragen lassen sich mit den Akademie-Videos direkt lösen.'],
  ['02', 'Gerätedaten bereithalten', 'Notieren Sie Kameraname, Standort und eine kurze Fehlerbeschreibung.'],
  ['03', 'Support kontaktieren', 'Schreiben Sie uns per WhatsApp, damit wir gezielt nachfassen können.'],
]

const youtubeChannel = 'https://www.youtube.com/@ftronics2673'
const anydeskDownload = 'https://anydesk.com/de/downloads'

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
            {downloads.map(([name, format, href]) => (
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
                <Button variant="secondary" href={href} download>Guard Station herunterladen</Button>
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
            <Button href={anydeskDownload} target="_blank" rel="noopener noreferrer">
              AnyDesk herunterladen
            </Button>
          </div>
        </div>
      </section>

      <section className="ft-section ft-section--raised" style={{ marginTop: 'clamp(4rem,6vw,6rem)' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Schnelle Hilfe"
            title="So kommen Sie am schnellsten zur Lösung"
            lead="Starten Sie mit dem passenden Tutorial. Wenn etwas offen bleibt, helfen wir mit genau den Informationen weiter, die unsere Techniker brauchen."
          />

          <div
            data-rev-group
            className="ft-grid ft-grid--auto-sm"
            style={{ marginTop: '2.5rem' }}
          >
            {quickHelp.map(([step, title, text]) => (
              <article key={step} data-rev className="ft-card ft-card--flat">
                <Chip>{step}</Chip>
                <h4 style={{ marginTop: '1rem' }}>{title}</h4>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 17.3 Video-Tutorials + Closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="FTronics Akademie"
            title="Video-Tutorials direkt auf YouTube"
            lead="Schritt-für-Schritt-Anleitungen für Guard Station und die Guard Viewer App, direkt aus dem offiziellen FTronics-Kanal."
          />

          <div data-rev style={{ marginTop: '2.5rem' }}>
            <ScrollGallery
              label="Video-Tutorials"
              itemWidth={360}
              paddles={false}
              actions={
                <Button
                  variant="secondary"
                  size="sm"
                  href={youtubeChannel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube-Kanal öffnen
                </Button>
              }
            >
              {tutorials.map((video) => (
                <article
                  key={video.href}
                  style={{
                    ...panel, overflow: 'hidden', display: 'flex', flexDirection: 'column',
                    minHeight: 430,
                  }}
                >
                  <a
                    href={video.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${video.title} auf YouTube ansehen`}
                    style={{
                      position: 'relative', display: 'block', aspectRatio: '16 / 10',
                      background: 'var(--bg-raised)', overflow: 'hidden',
                    }}
                  >
                    <img
                      src={video.thumbnail}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    />
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
                        background: 'linear-gradient(to top, rgba(10,12,14,.35), rgba(10,12,14,.05))',
                      }}
                    >
                      <span
                        style={{
                          width: 58, height: 58, borderRadius: '50%',
                          background: 'rgba(255,255,255,.92)', color: 'var(--ft-red-brand)',
                          display: 'grid', placeItems: 'center', boxShadow: '0 12px 36px rgba(10,12,14,.18)',
                          fontSize: 22, lineHeight: 1, paddingLeft: 4,
                        }}
                      >
                        ▶
                      </span>
                    </span>
                  </a>
                  <div style={{ padding: '1.6rem', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
                    <Chip style={{ alignSelf: 'flex-start' }}>{video.category}</Chip>
                    <h4 style={{ margin: 0 }}>{video.title}</h4>
                    <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                      {video.description}
                    </p>
                    <a
                      href={video.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ ...tutorialLink, marginTop: 'auto' }}
                    >
                      Tutorial ansehen →
                    </a>
                  </div>
                </article>
              ))}
            </ScrollGallery>
          </div>

          <div
            data-rev
            style={{
              ...panel, marginTop: '1.25rem', padding: '1.5rem',
              display: 'flex', flexWrap: 'wrap', alignItems: 'center',
              justifyContent: 'space-between', gap: '1rem',
            }}
          >
            <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
              Neue Anleitungen veröffentlichen wir laufend in der FTronics Akademie auf YouTube.
            </p>
            <Button
              href={youtubeChannel}
              variant="quiet"
              target="_blank"
              rel="noopener noreferrer"
            >
              Alle Videos ansehen →
            </Button>
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
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <WhatsAppButton />
              </div>
            </div>
            <CtaAnfrageForm />
          </div>
        </div>
        <CtaFlatlay />
      </section>
    </>
  )
}
