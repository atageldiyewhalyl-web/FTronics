import Link from 'next/link'
import { Button, Card, SectionHead } from '@/components/ui'
import { breadcrumbJsonLd, jsonLd } from '@/lib/site'

export const metadata = {
  /* `absolute` because the root layout's title template would otherwise
     append a second " | FT Sicherheitstechnik" to the verified title. */
  title: { absolute: 'Sicherheitstechnik für Gewerbe & Industrie | FT Sicherheitstechnik Mannheim' },
  description:
    'Gewerbliche Sicherheitslösungen in Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Zeiterfassung. DSGVO-konform, persönliche Beratung vor Ort. Jetzt anfragen!',
  alternates: { canonical: '/loesungen-gewerbe' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Startseite', href: '/' },
  { name: 'Gewerbekunden', href: '/loesungen-gewerbe' },
])

/* ---------------- section data ---------------- */

/** The six commercial disciplines — each card ends in its own quiet link. */
const loesungen = [
  {
    title: 'Alarmanlagen',
    items: [
      'Hybride Ajax-Systeme für Gewerbeobjekte',
      'Push-Alarmierung auf Smartphones aller Mitarbeiter',
      'Mehrzonen-Absicherung',
      'Fernzugriff & Benachrichtigungen',
      'Integration mit bestehender Infrastruktur',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Videoüberwachung',
    items: [
      '4K-Kameras mit KI-Videoanalyse',
      'Personen-/Fahrzeugerkennung',
      'Zentrale Verwaltung mehrerer Standorte',
      'DSGVO-konforme Speicherung',
      'Skalierbar von 4 bis 128+ Kameras',
    ],
    link: { label: 'Produkte ansehen →', href: '/produkte' },
  },
  {
    title: 'Zutrittskontrolle',
    items: [
      'Fingerprint, RFID, PIN, App-basiert',
      'Zeit- und zonenbasierte Berechtigungen',
      'Protokollierung aller Zutritte',
      'Besucher-Management',
      'Integration mit Zeiterfassung',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Zeiterfassung',
    items: [
      'Digitale Arbeitszeiterfassung',
      'Gesetzeskonform nach EuGH-Urteil',
      'Terminal- oder App-basiert',
      'Export für Lohnbuchhaltung',
      'Kombination mit Zutrittskontrolle',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Brandschutz',
    items: [
      'Brandwarnanlagen nach DIN VDE',
      'Aufschaltung auf Feuerwehr',
      'Regelmäßige Wartung & Prüfung',
      'Fluchtwegsicherung',
      'Dokumentation für Versicherung',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'NSL-Anbindung',
    items: [
      'Vermittlung an Notruf-/Serviceleitstellen (NSL)',
      'Technische Anbindung Ihrer Anlage',
      'Optional: Video-Fernüberwachung',
      'Reduzierung von Fehlalarmen',
      'Wartung der Übertragungstechnik durch FT',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
]

const vorteile = [
  ['Compliance', 'Alle Systeme DSGVO-konform geplant und dokumentiert, wichtig für Versicherungsanforderungen.'],
  ['Versicherungsvorteile', 'Bis zu 30% Ersparnis bei der Versicherungsprämie durch zertifizierte Sicherheitstechnik.'],
  ['Fernzugriff', 'Alle Standorte jederzeit im Blick: per App, Browser oder Leitstelle.'],
  ['Skalierbarkeit', 'Von einem Büro bis zum Multi-Standort-Unternehmen: unsere Systeme wachsen mit.'],
]

/** The artboard's card link sits on --fg, not the softer .ft-quiet-link grey. */
const cardLink = {
  color: 'var(--fg)',
  font: '500 var(--t-body-sm) var(--font-ui)',
  textDecoration: 'none',
}

/* ---------------- page ---------------- */

export default function LoesungenGewerbe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />

      {/* 9.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Gewerbekunden</p>
            <h1 data-rev style={{ maxWidth: '20ch' }}>
              Professionelle Sicherheit für Ihr Unternehmen
            </h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)',
                maxWidth: 680, margin: '1rem 0 1.5rem',
              }}
            >
              Skalierbare Sicherheitslösungen für Büros, Lagerhallen, Einzelhandel und Industrie,
              DSGVO-konform und versicherungsoptimiert.
            </p>
            <div data-rev style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '.5rem' }}>
              <Button variant="secondary" size="sm" href="/loesungen-privat">
                Für Privatkunden →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 9.2 Gewerbliche Lösungen — six discipline cards */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Gewerbliche Lösungen"
            title="Sicherheit, die Ihr Business schützt"
            lead="Von der Zutrittskontrolle bis zur Videoüberwachung: alles aus einer Hand."
          />
          <div data-rev-group className="ft-grid ft-grid--auto" style={{ marginTop: '3rem' }}>
            {loesungen.map((l) => (
              <div
                data-rev
                key={l.title}
                className="ft-card"
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <h4 style={{ marginBottom: '.8em' }}>{l.title}</h4>
                <ul className="ft-list" style={{ margin: '0 0 1.5rem', flex: 1 }}>
                  {l.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
                <Link href={l.link.href} style={cardLink}>{l.link.label}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.3 Ihre Vorteile */}
      <section
        className="ft-section ft-section--raised"
        style={{ marginTop: 'clamp(5rem,7vw,8rem)' }}
      >
        <div className="ft-shell">
          <SectionHead eyebrow="Ihre Vorteile" title="Warum Unternehmen uns vertrauen" />
          <div data-rev-group className="ft-grid ft-grid--auto-sm" style={{ marginTop: '2.5rem' }}>
            {vorteile.map(([t, d]) => (
              <div data-rev key={t}>
                <Card title={t}>{d}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9.4 Closing CTA panel */}
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
              <h3 style={{ marginBottom: '.4em' }}>Individuelle Gewerbelösung anfragen</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir erstellen Ihnen ein maßgeschneidertes Sicherheitskonzept für Ihr Unternehmen.
              </p>
            </div>
            <Button href="/kontakt">Angebot anfragen</Button>
          </div>
        </div>
      </section>
    </>
  )
}
