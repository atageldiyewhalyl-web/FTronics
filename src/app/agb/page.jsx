export const metadata = {
  title: 'AGB',
  description:
    'Allgemeine Geschäftsbedingungen (AGB) der FT Sicherheitstechnik Mannheim. Gültig für alle Dienstleistungen und Produkte.',
  alternates: { canonical: '/agb' },
  robots: { index: false, follow: true },
}

/**
 * The live AGB run to twelve clauses. Legal text is carried over verbatim, not
 * re-authored — this page renders the clause structure and the operative
 * commercial terms verified from the existing site. See the note at the foot.
 */
const clauses = [
  ['1. Geltungsbereich', null],
  ['2. Vertragsinhalt', null],
  ['3. Entsorgung', 'Fachgerechte Entsorgung von Altgeräten (Kameras, Rekorder, Computeranlagen) durch FT Sicherheitstechnik.'],
  ['4. Installation', 'Der Kunde stellt eine funktionsfähige Internetverbindung bereit. Zusätzliche Arbeitsschritte nach Aufbau und Installation werden separat berechnet; der Mindeststundensatz beträgt 70,- Euro zzgl. MwSt. pro Außendienstmitarbeiter. Auf Rohrleitungen und Kabelwege ist vor der Installation hinzuweisen.'],
  ['5. Preise', 'Warenpreise verstehen sich ab Werk bzw. ab Lager, ohne gesetzliche Mehrwertsteuer, Verpackung und Montage, soweit nichts anderes vereinbart wurde.'],
  ['6. Lieferzeiten, Lieferung, Gefahrenübergang', 'Lieferung schnellstmöglich, spätestens innerhalb von ca. sechs Wochen nach Vertragsabschluss. Verlängerung bei höherer Gewalt; Rücktrittsrecht des Vertragspartners bei Verzögerung über vier Wochen.'],
  ['7. Zahlung', 'Fälligkeit ab Rechnungszugang innerhalb der vereinbarten Frist. Verzugszinsen 1 % pro Monat. Bei Abbestellung ohne Grund: Erstattung bereits angefallener Kosten sowie ein Pauschalbetrag von max. 30 % des Kaufpreises.'],
  ['8. Eigentumsvorbehalt', 'Alle Waren bleiben bis zur Erfüllung sämtlicher Forderungen Eigentum von FT Sicherheitstechnik.'],
  ['9. Gewährleistung', 'Mängel sind binnen acht Werktagen zu rügen. Mängelansprüche können innerhalb von sechs Monaten ab Übernahme der Leistung geltend gemacht werden. Keine Gewähr bei unsachgemäßer Bedienung, Reparaturversuchen Dritter oder natürlicher Abnutzung.'],
  ['10. Haftung', 'Haftung grundsätzlich nur bei Vorsatz und grober Fahrlässigkeit; bei leichter Fahrlässigkeit im Rahmen der Betriebshaftpflichtversicherung. Ausgeschlossen sind Folgeschäden, etwa durch Einbruchdiebstahl oder Nichtfunktionieren der Anlage.'],
  ['11. Anwendbares Recht, Erfüllungsort und Gerichtsstand', null],
  ['12. Sonstiges', null],
]

export default function AGB() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <div className="ft-prose">
          <p className="ft-eyebrow">Rechtliches</p>
          <h1>Allgemeine Geschäftsbedingungen</h1>
          <p className="ft-lead">Gültig für alle Dienstleistungen und Produkte.</p>

          <div style={{ marginTop: 'var(--sp-12)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-6)' }}>
            {clauses.map(([title, body]) => (
              <div key={title}>
                <h2 style={{ fontSize: 'var(--t-h4)', marginBottom: '.4em' }}>{title}</h2>
                {body && <p style={{ color: 'var(--fg-secondary)' }}>{body}</p>}
              </div>
            ))}
          </div>

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
              Der vollständige Klauseltext ist unverändert von der bestehenden Website zu übernehmen.
              Zusätzlich ist § 9 juristisch zu prüfen: Eine Gewährleistungsfrist von sechs Monaten und
              eine Rügefrist von acht Werktagen sind B2B-Klauseln. Gegenüber Verbrauchern ist eine
              Verkürzung der gesetzlichen Gewährleistung bei neuen Sachen nach § 476 BGB regelmäßig
              unwirksam, und diese Website richtet sich ausdrücklich auch an Privatkunden.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
