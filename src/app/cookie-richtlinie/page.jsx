import Link from 'next/link'
import { PrivacySettingsButton } from '@/components/PrivacySettingsButton'

export const metadata = {
  title: 'Cookie-Richtlinie',
  description: 'Übersicht der Cookies und optionalen Dienste auf ftsicherheitstechnik.com.',
  alternates: { canonical: '/cookie-richtlinie' },
  robots: { index: false, follow: true },
}

const rows = [
  {
    name: 'ft_privacy_consent',
    provider: 'FT Sicherheitstechnik',
    category: 'Notwendig',
    purpose: 'Speichert Kategorien, Einwilligungsversion, Zeitpunkt, Auswahlweg und GPC-Status.',
    duration: '180 Tage',
  },
  {
    name: '_gcl_au, _gcl_aw und mögliche Google-Werbe-Kennungen',
    provider: 'Google Ireland Limited',
    category: 'Marketing',
    purpose: 'Zuordnung von Anzeigeninteraktionen und Messung erfolgreicher Anfragen.',
    duration: 'Nur nach Einwilligung; abhängig von Google, typischerweise bis zu 90 Tage',
  },
  {
    name: 'Google-Maps-Speicher und -Cookies',
    provider: 'Google Ireland Limited',
    category: 'Externe Medien',
    purpose: 'Bereitstellung und Bedienung der interaktiven Karte.',
    duration: 'Nur nach Einwilligung; abhängig von Google und dem Google-Kontostatus',
  },
]

export default function CookieRichtlinie() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <article className="ft-prose ft-legal-copy">
          <p className="ft-eyebrow">Datenschutz</p>
          <h1>Cookie-Richtlinie</h1>
          <p className="ft-lead">
            Welche Speichertechnologien wir verwenden, warum wir sie einsetzen und wie Sie Ihre
            Auswahl kontrollieren.
          </p>
          <p><strong>Stand:</strong> 16. Oktober 2026</p>

          <h2>Grundsatz</h2>
          <p>
            Ohne Ihre Einwilligung setzen wir ausschließlich die technisch notwendige
            Einwilligungseinstellung. Google Ads und Google Maps bleiben blockiert. Google Tag
            Manager, Google Analytics, Social-Media-Pixel und versteckte Tracking-Embeds werden
            nicht eingesetzt.
          </p>

          <h2>Übersicht</h2>
          <div className="ft-cookie-table-wrap">
            <table className="ft-cookie-table">
              <thead>
                <tr>
                  <th>Name/Dienst</th>
                  <th>Anbieter</th>
                  <th>Kategorie</th>
                  <th>Zweck</th>
                  <th>Dauer</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td><code>{row.name}</code></td>
                    <td>{row.provider}</td>
                    <td>{row.category}</td>
                    <td>{row.purpose}</td>
                    <td>{row.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Google kann Namen, Umfang und Laufzeit eigener Speichertechnologien ändern. Die
            aktuelle Auswahl auf dieser Website bleibt trotzdem maßgeblich: Ohne Zustimmung zur
            jeweiligen Kategorie wird der Dienst nicht geladen.
          </p>

          <h2>Kategorien</h2>
          <h3>Notwendig</h3>
          <p>
            Diese Kategorie ermöglicht die Speicherung Ihrer Entscheidung sowie den sicheren
            Betrieb der Website. Sie kann nicht deaktiviert werden. Formulardaten werden nicht im
            Browser gespeichert.
          </p>
          <h3>Marketing</h3>
          <p>
            Google Ads wird ausschließlich nach Zustimmung geladen. Wir messen erfolgreiche
            Anfragen, übermitteln dabei aber keine Namen, E-Mail-Adressen, Telefonnummern oder
            Nachrichtentexte an Google.
          </p>
          <h3>Externe Medien</h3>
          <p>
            Google Maps wird erst nach Zustimmung oder nach einer ausdrücklichen Aktivierung auf
            der Kontaktseite geladen. Vorher wird nur ein lokaler Hinweis angezeigt.
          </p>

          <h2>Auswahl ändern und Einwilligung widerrufen</h2>
          <p>
            Sie können jede optionale Einwilligung jederzeit mit Wirkung für die Zukunft ändern.
            Die Website respektiert außerdem das Browsersignal Global Privacy Control und hält
            Marketing bei aktivem Signal deaktiviert.
          </p>
          <p><PrivacySettingsButton /></p>
          <p>
            Nach einem Marketing-Widerruf blockieren wir zukünftige Google-Aufrufe und versuchen,
            bekannte, von dieser Domain erreichbare Google-Marketing-Cookies zu löschen. Zusätzlich
            können Sie Cookies über die Einstellungen Ihres Browsers entfernen.
          </p>

          <h2>Weitere Informationen</h2>
          <p>
            Details zu Datenarten, Rechtsgrundlagen, Empfängern, Drittlandübermittlungen und Ihren
            Rechten finden Sie in der <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
        </article>
      </div>
    </section>
  )
}
