import { Button, Chip, CtaFlatlay, SectionHead, Placeholder } from '@/components/ui'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { ReadingProgress } from './ReadingProgress'
import { CtaAnfrageForm } from '../CtaAnfrageForm'

export const metadata = {
  title: 'Ratgeber: Tipps zu Alarmanlagen & Sicherheit',
  description:
    'Expertenwissen zu Sicherheitstechnik: Ratgeber-Artikel zu Alarmanlagen, Videoüberwachung, Einbruchschutz & Smart Home. Kostenlos lesen!',
  alternates: { canonical: '/ratgeber' },
}

/* ---------------- section data ---------------- */

/* Seven article teasers. The live site has no article detail pages yet —
   the artboard links every card to "#", so the CTA stays inert. */
const articles = [
  {
    cat: 'Alarmanlagen & Einbruchschutz',
    title: 'Einbruchschutz im Urlaub 2026: Was die Statistik in Mannheim zeigt und wie Technik hilft',
    teaser:
      'Aktuelle Zahlen aus Mannheim, Checkliste sowie Tipps zu Alarmanlage, Videoüberwachung und KfW-Förderung für ein sicheres Zuhause.',
    img: 'Artikelbild: Einbruchschutz Urlaub',
  },
  {
    cat: 'Einbruchschutz',
    title: '5 Tipps gegen Einbruch: so schützen Sie Ihr Zuhause',
    teaser:
      'Laut Polizeistatistik scheitern über 45 % aller Einbruchsversuche an wirksamer Sicherheitstechnik. Erfahren Sie, welche Maßnahmen Ihr Zuhause effektiv schützen.',
    img: 'Artikelbild: 5 Tipps gegen Einbruch',
  },
  {
    cat: 'Videoüberwachung',
    title: 'Welche Kamera für welchen Einsatz? Ein Überblick',
    teaser:
      'Dome, Bullet oder PTZ: jeder Kameratyp hat seine Stärken. Wir erklären die Unterschiede, typische Einsatzbereiche und worauf Sie achten sollten.',
    img: 'Artikelbild: Kameratypen',
  },
  {
    cat: 'Recht & Datenschutz',
    title: 'DSGVO und Videoüberwachung: was ist erlaubt?',
    teaser:
      'Videoüberwachung unterliegt strengen Datenschutzregeln. Wir erläutern die rechtlichen Anforderungen für private und gewerbliche Videoüberwachung in Deutschland.',
    img: 'Artikelbild: DSGVO',
  },
  {
    cat: 'Smart Home',
    title: 'Smart Home Sicherheit: Alarmanlagen mit App-Steuerung',
    teaser:
      'Moderne Alarmsysteme lassen sich per Smartphone steuern und in bestehende Smart-Home-Systeme integrieren. So machen Automatisierungen Ihren Alltag sicherer.',
    img: 'Artikelbild: Smart Home',
  },
  {
    cat: 'Brandschutz',
    title: 'Brandschutz für Privathaushalte: Pflichten und Empfehlungen',
    teaser:
      'Die Rauchmelderpflicht gilt in allen Bundesländern, doch welche Geräte sind empfehlenswert? Wir erklären Vorgaben, Montageort und vernetzte Systeme.',
    img: 'Artikelbild: Brandschutz',
  },
  {
    cat: 'Technologie',
    title: 'KI in der Videoüberwachung: Person- und Fahrzeugerkennung',
    teaser:
      'Intelligente Kameraanalyse erkennt Personen und Fahrzeuge in Echtzeit und reduziert Fehlalarme um bis zu 95 %. So funktioniert KI-basierte Videoüberwachung.',
    img: 'Artikelbild: KI Videoüberwachung',
  },
]

/* .ft-card gives background, border, radius and the hover lift; the teaser
   card only overrides the padding so the 16:9 image can sit flush. */
const teaserCard = {
  padding: 0,
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const readMore = {
  color: 'var(--fg)',
  font: '500 var(--t-body-sm) var(--font-ui)',
  textDecoration: 'none',
}

/* ---------------- page ---------------- */

export default function Ratgeber() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Ratgeber', href: '/ratgeber' },
          ])
        )}
      />

      <ReadingProgress />

      {/* 15.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Wissen &amp; Ratgeber</p>
            <h1 data-rev>Sicherheit beginnt mit Wissen</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                color: 'var(--fg-secondary)', margin: '1rem 0 0',
              }}
            >
              Praktische Tipps, Expertenwissen und aktuelle Informationen rund um Einbruchschutz,
              Videoüberwachung, Smart Home und Brandschutz, direkt von unseren Fachberatern.
            </p>
          </div>
        </div>
      </section>

      {/* 15.2 Fachartikel */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Ratgeber & Fachartikel"
            title="Aktuelles aus der Sicherheitsbranche"
            lead="Von Einbruchschutz bis KI-Technologie: unsere Fachartikel helfen Ihnen, die richtige Entscheidung für Ihre Sicherheit zu treffen."
          />
          <div
            data-rev-group
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(340px,100%),1fr))',
              gap: '1.25rem', marginTop: '3rem',
            }}
          >
            {articles.map((a) => (
              <div data-rev key={a.title}>
                <article className="ft-card" style={teaserCard}>
                  <div style={{ borderBottom: '1px solid var(--border)' }}>
                    <Placeholder ratio="16 / 9" rounded="0" label={a.img} />
                  </div>
                  <div
                    style={{
                      padding: '1.6rem', display: 'flex', flexDirection: 'column',
                      gap: 10, flex: 1,
                    }}
                  >
                    <Chip style={{ alignSelf: 'flex-start' }}>{a.cat}</Chip>
                    <h4 style={{ margin: 0 }}>{a.title}</h4>
                    <p style={{ flex: 1 }}>{a.teaser}</p>
                    <a href="#" style={readMore}>Weiterlesen →</a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 15.3 Closing CTA */}
      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
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
              <h3 style={{ marginBottom: '.4em' }}>Bleiben Sie informiert</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Sie haben Fragen zu einem unserer Themen oder wünschen eine persönliche Beratung?
                Unser Expertenteam steht Ihnen jederzeit zur Verfügung.
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
