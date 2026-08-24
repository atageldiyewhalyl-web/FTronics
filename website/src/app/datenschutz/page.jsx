import { site } from '@/lib/site'

export const metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung der FT Sicherheitstechnik Mannheim. Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
}

/**
 * The live site's Datenschutzerklärung is a ~48k-character generator-authored
 * policy. Legal text must be carried over verbatim rather than re-authored, so
 * this page renders the verified controller details and the section skeleton.
 * See the editorial note at the foot of the page.
 */
const sections = [
  'Einleitung',
  'Verantwortlicher',
  'Übersicht der Verarbeitungen',
  'Maßgebliche Rechtsgrundlagen',
  'Sicherheitsmaßnahmen',
  'Übermittlung von personenbezogenen Daten',
  'Datenverarbeitung in Drittländern',
  'Löschung von Daten',
  'Einsatz von Cookies',
  'Geschäftliche Leistungen',
  'Bereitstellung des Onlineangebotes und Webhosting',
  'Kontakt- und Anfragenverwaltung',
  'Webanalyse, Monitoring und Optimierung',
  'Präsenzen in sozialen Netzwerken',
  'Plugins und eingebettete Funktionen sowie Inhalte',
  'Änderung und Aktualisierung der Datenschutzerklärung',
  'Rechte der betroffenen Personen',
  'Begriffsdefinitionen',
]

export default function Datenschutz() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <div className="ft-prose">
          <p className="ft-eyebrow">Rechtliches</p>
          <h1>Datenschutzerklärung</h1>
          <p className="ft-lead">
            Informationen zum Umgang mit Ihren personenbezogenen Daten gemäß DSGVO.
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-12)' }}>Verantwortliche Stelle</h2>
          <p>
            {site.name}<br />
            {site.founder}<br />
            {site.street}<br />
            {site.postalCode} {site.city}<br />
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a><br />
            Telefon: {site.phone}
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>Gliederung</h2>
          <ul className="ft-list" style={{ fontSize: 'var(--t-body)' }}>
            {sections.map((s) => <li key={s}>{s}</li>)}
          </ul>

          <div
            style={{
              marginTop: 'var(--sp-12)',
              padding: 'var(--sp-6)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-md)',
              background: 'var(--bg-card)',
            }}
          >
            <p style={{ margin: 0, fontWeight: 500, color: 'var(--ft-error)' }}>
              Redaktioneller Hinweis: vor Veröffentlichung zu erledigen
            </p>
            <p style={{ margin: '.6rem 0 0', color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
              Der vollständige Text der Datenschutzerklärung muss unverändert von der bestehenden
              Website übernommen und juristisch geprüft werden. Rechtstexte dürfen nicht neu
              formuliert werden. Zu prüfen ist außerdem, dass die Erklärung den tatsächlichen
              Funktionsumfang dieser Seite beschreibt: Kontakt- und Konfigurator-Formulare,
              eingebundene Schriftarten sowie eingesetzte Analyse- und Kartendienste.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
