import Link from 'next/link'
import { PrivacySettingsButton } from '@/components/PrivacySettingsButton'
import { site } from '@/lib/site'

export const metadata = {
  title: 'Datenschutzerklärung',
  description:
    'Datenschutzerklärung der FT Sicherheitstechnik Mannheim mit Informationen zu Hosting, Kontaktanfragen, Google Ads und Google Maps.',
  alternates: { canonical: '/datenschutz' },
  robots: { index: false, follow: true },
}

const headingStyle = { fontSize: 'var(--t-h4)', marginTop: 'var(--sp-10)' }

export default function Datenschutz() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <article className="ft-prose ft-legal-copy">
          <p className="ft-eyebrow">Rechtliches</p>
          <h1>Datenschutzerklärung</h1>
          <p className="ft-lead">
            Informationen über die Verarbeitung personenbezogener Daten bei Nutzung dieser Website.
          </p>
          <p><strong>Stand:</strong> 16. Oktober 2026</p>

          <h2 style={headingStyle}>1. Verantwortlicher</h2>
          <p>
            {site.name}<br />
            Inhaber: {site.founder}<br />
            {site.street}<br />
            {site.postalCode} {site.city}<br />
            Deutschland
          </p>
          <p>
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a><br />
            Telefon: <a href={site.phoneHref}>{site.phone}</a>
          </p>

          <h2 style={headingStyle}>2. Allgemeine Hinweise und Rechtsgrundlagen</h2>
          <p>
            Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder
            identifizierbare Person beziehen. Wir verarbeiten Daten nur, soweit dies zur
            Bereitstellung der Website, zur Bearbeitung von Anfragen, zur Erfüllung gesetzlicher
            Pflichten oder auf Grundlage einer freiwilligen Einwilligung erforderlich ist.
          </p>
          <ul className="ft-list">
            <li>Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen und Vertragsabwicklung,</li>
            <li>Art. 6 Abs. 1 lit. c DSGVO für rechtliche Verpflichtungen,</li>
            <li>Art. 6 Abs. 1 lit. f DSGVO für unsere berechtigten Interessen an einem sicheren, stabilen und wirtschaftlichen Webangebot,</li>
            <li>Art. 6 Abs. 1 lit. a DSGVO sowie § 25 Abs. 1 TDDDG für optionale Dienste, die erst nach Ihrer Einwilligung aktiviert werden.</li>
          </ul>

          <h2 style={headingStyle}>3. Hosting und Server-Protokolle</h2>
          <p>
            Diese Website wird über Vercel Inc. bereitgestellt. Beim Aufruf können insbesondere
            IP-Adresse, Datum und Uhrzeit, aufgerufene URL, Referrer, Browser-, Betriebssystem- und
            Geräteinformationen sowie technische Statusdaten in Server-Protokollen verarbeitet
            werden. Die Verarbeitung dient der Auslieferung, Stabilität, Missbrauchsabwehr und
            Fehleranalyse. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.
          </p>
          <p>
            Vercel kann Daten unter Einsatz von Unterauftragsverarbeitern auch außerhalb des EWR
            verarbeiten. Grundlage sind, soweit erforderlich, Angemessenheitsbeschlüsse oder
            Standardvertragsklauseln. Informationen:{' '}
            <a href="https://vercel.com/legal/privacy-notice" target="_blank" rel="noopener noreferrer">Datenschutzhinweise von Vercel</a>.
          </p>

          <h2 style={headingStyle}>4. Datenschutz- und Cookie-Einstellungen</h2>
          <p>
            Wir setzen eine eigene Einwilligungsverwaltung ein. Ihre Auswahl wird im notwendigen
            Cookie <code>ft_privacy_consent</code> für höchstens 180 Tage gespeichert. Gespeichert
            werden die gewählten Kategorien, die Version der Einwilligungsabfrage, Zeitpunkt,
            Auswahlweg und das Vorliegen eines Global-Privacy-Control-Signals. Rechtsgrundlagen
            sind § 25 Abs. 2 Nr. 2 TDDDG und Art. 6 Abs. 1 lit. f DSGVO. Das Interesse besteht darin,
            Ihre Auswahl zu respektieren und nicht bei jedem Seitenaufruf erneut abzufragen.
          </p>
          <p>
            Optionale Dienste bleiben bis zu einer aktiven Zustimmung deaktiviert. Ein vom Browser
            übermitteltes Global-Privacy-Control-Signal wird als Widerspruch gegen Marketing
            berücksichtigt. Sie können Ihre Auswahl jederzeit ändern: <PrivacySettingsButton />.
          </p>
          <p>Eine vollständige Übersicht finden Sie in unserer <Link href="/cookie-richtlinie">Cookie-Richtlinie</Link>.</p>

          <h2 style={headingStyle}>5. Kontakt- und Angebotsanfragen</h2>
          <p>
            Wenn Sie ein Kontakt-, CTA- oder Konfiguratorformular absenden, verarbeiten wir je nach
            Formular Name, E-Mail-Adresse, Telefonnummer, Kundentyp, Betreff, Nachricht,
            Konfiguratorauswahl, Seitenadresse, Einreichungszeit und eine technische Ereignis-ID.
            Die Daten werden ausschließlich zur Prüfung und Beantwortung Ihrer Anfrage, zur
            Angebotserstellung und zur Verhinderung doppelter Verarbeitung verwendet.
          </p>
          <p>
            Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage auf einen Vertrag
            gerichtet ist, andernfalls Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse ist
            die Bearbeitung geschäftlicher Kommunikation. Die Anfrage funktioniert auch ohne
            Marketing-Einwilligung. Formulardaten werden nicht im Browser gespeichert.
          </p>
          <p>
            Für die sichere Entgegennahme und Speicherung setzen wir Supabase Pte. Ltd. als
            Auftragsverarbeiter ein. Für den Versand interner Benachrichtigungen und einer
            Eingangsbestätigung verwenden wir Resend, betrieben von Plus Five Five, Inc. Dabei
            werden die für Versand und Zustellung erforderlichen Kontaktdaten und Nachrichteninhalte
            verarbeitet. Informationen:{' '}
            <a href="https://supabase.com/privacy" target="_blank" rel="noopener noreferrer">Supabase</a>{' · '}
            <a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a>.
          </p>
          <p>
            Anfragen löschen wir, sobald sie für den Zweck nicht mehr erforderlich sind, sofern
            keine gesetzlichen Aufbewahrungspflichten oder die Geltendmachung, Ausübung oder
            Verteidigung von Rechtsansprüchen entgegenstehen. Geschäftliche Korrespondenz kann im
            gesetzlichen Umfang bis zu sechs Jahre, steuerlich relevante Unterlagen entsprechend
            den anwendbaren Fristen länger aufbewahrt werden.
          </p>

          <h2 style={headingStyle}>6. Google Ads und Conversion-Messung</h2>
          <p>
            Nur wenn Sie der Kategorie „Marketing“ zustimmen, laden wir Google Ads von Google
            Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland. Die Conversion-Messung
            hilft uns zu erkennen, ob eine Anzeige zu einer erfolgreichen Anfrage geführt hat.
            Dabei können IP-Adresse, Browser- und Geräteinformationen, aufgerufene Seiten,
            Zeitpunkte, Anzeigen- und Cookie-Kennungen sowie das Conversion-Ereignis verarbeitet
            werden. Inhalte Ihrer Formulare werden nicht an Google übermittelt.
          </p>
          <p>
            Rechtsgrundlagen sind Ihre Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
            TDDDG. Je nach Nutzung können Google-Cookies wie <code>_gcl_au</code> oder
            <code>_gcl_aw</code> gesetzt werden. Google kann Daten auch in den USA verarbeiten und
            setzt hierfür die jeweils anwendbaren Übermittlungsmechanismen ein. Weitere
            Informationen:{' '}
            <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer">Datenschutzerklärung von Google</a>{' · '}
            <a href="https://business.safety.google/privacy/" target="_blank" rel="noopener noreferrer">Google Business Data Responsibility</a>.
          </p>
          <p>
            Bei Widerruf wird Google für zukünftige Seitenaufrufe nicht mehr geladen. Wir versuchen
            außerdem, bekannte, von dieser Domain erreichbare Google-Marketing-Cookies und
            zugehörige lokale Speicherwerte zu entfernen. Cookies auf Google-Domains können nur
            von Google oder über Ihre Browsereinstellungen gelöscht werden.
          </p>

          <h2 style={headingStyle}>7. Google Maps</h2>
          <p>
            Auf der Kontaktseite ist Google Maps als optionaler externer Inhalt vorgesehen. Die
            Karte wird erst geladen, wenn Sie „Externe Medien“ erlauben oder die Karte über den
            Zwei-Klick-Hinweis ausdrücklich aktivieren. Dann wird eine Verbindung zu Google
            hergestellt. Dabei können insbesondere IP-Adresse, Browser- und Geräteinformationen,
            Referrer, Zeitpunkt und Kartennutzung verarbeitet werden. Google kann Cookies oder
            vergleichbare Technologien verwenden.
          </p>
          <p>
            Rechtsgrundlagen sind Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Anbieter ist
            Google Ireland Limited. Ohne Einwilligung steht ein externer Routenlink zur Verfügung;
            erst dessen Aktivierung führt Sie zu Google.
          </p>

          <h2 style={headingStyle}>8. Lokale Schriftarten und Vorschaubilder</h2>
          <p>
            Die verwendeten Schriftarten und Vorschaubilder der YouTube-Tutorials werden von
            unserer eigenen Website ausgeliefert. Beim bloßen Seitenaufruf entsteht dafür keine
            Verbindung zu Google Fonts oder YouTube. Erst wenn Sie einen gekennzeichneten externen
            YouTube-Link öffnen, gelten die Datenschutzbestimmungen des Zielanbieters.
          </p>

          <h2 style={headingStyle}>9. Externe Links und Kommunikationsdienste</h2>
          <p>
            Die Website enthält Links unter anderem zu WhatsApp, YouTube, Facebook, Instagram,
            Google Maps, AnyDesk und extern bereitgestellten Downloads. Eine Verbindung zum
            jeweiligen Anbieter entsteht erst, wenn Sie den Link aktivieren. Der Anbieter kann
            dann Daten wie IP-Adresse, Referrer und Kontoinformationen nach seinen eigenen
            Bedingungen verarbeiten. Nutzen Sie für vertrauliche Inhalte vorzugsweise unsere
            direkten Kontaktmöglichkeiten.
          </p>

          <h2 style={headingStyle}>10. Empfänger und Drittlandübermittlungen</h2>
          <p>
            Zugriff erhalten nur Personen und Dienstleister, die ihn zur Erfüllung der genannten
            Zwecke benötigen. Mit Auftragsverarbeitern schließen wir, soweit erforderlich,
            Vereinbarungen nach Art. 28 DSGVO. Bei Übermittlungen außerhalb des EWR verwenden die
            Anbieter je nach Empfänger Angemessenheitsbeschlüsse, das EU-US Data Privacy Framework
            oder Standardvertragsklauseln. Trotz dieser Maßnahmen können in Drittländern andere
            staatliche Zugriffsmöglichkeiten bestehen als innerhalb der EU.
          </p>

          <h2 style={headingStyle}>11. Sicherheit</h2>
          <p>
            Wir treffen angemessene technische und organisatorische Maßnahmen, darunter
            verschlüsselte HTTPS-Übertragung, Zugriffsbeschränkungen, Sicherheits-Header und eine
            Beschränkung externer Ressourcen. Ein absoluter Schutz elektronischer Kommunikation
            kann dennoch nicht garantiert werden.
          </p>

          <h2 style={headingStyle}>12. Ihre Rechte</h2>
          <p>Unter den gesetzlichen Voraussetzungen haben Sie insbesondere das Recht auf:</p>
          <ul className="ft-list">
            <li>Auskunft und eine Kopie Ihrer Daten,</li>
            <li>Berichtigung unrichtiger Daten,</li>
            <li>Löschung oder Einschränkung der Verarbeitung,</li>
            <li>Datenübertragbarkeit,</li>
            <li>Widerspruch gegen Verarbeitungen auf Grundlage berechtigter Interessen,</li>
            <li>Widerruf einer Einwilligung mit Wirkung für die Zukunft.</li>
          </ul>
          <p>
            Zur Ausübung Ihrer Rechte genügt eine Nachricht an{' '}
            <a href={`mailto:${site.email}`}>{site.email}</a>. Wir können einen angemessenen
            Identitätsnachweis verlangen, um Daten vor unberechtigtem Zugriff zu schützen.
          </p>

          <h2 style={headingStyle}>13. Beschwerderecht</h2>
          <p>
            Sie können sich bei einer Datenschutzaufsichtsbehörde beschweren. Für unseren Sitz ist
            regelmäßig zuständig:
          </p>
          <p>
            Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
            Heilbronner Straße 35<br />
            70191 Stuttgart<br />
            Website: <a href="https://www.baden-wuerttemberg.datenschutz.de/" target="_blank" rel="noopener noreferrer">baden-wuerttemberg.datenschutz.de</a>
          </p>

          <h2 style={headingStyle}>14. Änderungen</h2>
          <p>
            Wir aktualisieren diese Erklärung, wenn sich Dienste, Rechtslage oder Verarbeitung
            ändern. Bei einer wesentlichen Änderung einwilligungspflichtiger Zwecke wird die
            Einwilligungsversion erhöht und eine neue Auswahl eingeholt.
          </p>
        </article>
      </div>
    </section>
  )
}
