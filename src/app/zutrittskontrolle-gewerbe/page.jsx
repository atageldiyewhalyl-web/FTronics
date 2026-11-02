import Image from 'next/image'
import { site, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { InquiryForm } from '../videoueberwachung-gewerbe/InquiryForm'
import { MobileContact } from '../videoueberwachung-gewerbe/MobileContact'
import shared from '../videoueberwachung-gewerbe/page.module.css'
import styles from './page.module.css'

const route = '/zutrittskontrolle-gewerbe'
const title = 'Zutrittskontrolle für Gewerbe in Mannheim'
const description = 'Zutrittskontrolle für Büro, Praxis, Lager und Betriebsgelände in Mannheim und Rhein-Neckar. RFID, PIN und App mit Planung, Montage und Einweisung.'
const imageRoot = '/campaigns/access-gewerbe'

export const metadata = {
  title,
  description,
  alternates: { canonical: route },
  openGraph: {
    title, description, url: route, type: 'website', locale: 'de_DE', siteName: site.name,
    images: [{ url: `${imageRoot}/business.webp`, width: 1536, height: 1024, alt: 'Gewerbeobjekt mit geregelten Zugängen als Architekturmodell' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${imageRoot}/business.webp`] },
}

const faqs = [
  ['Für welche Betriebe eignet sich eine Zutrittskontrolle?', 'Für Büros, Praxen, Geschäfte, Lager, Werkstätten und Betriebsgelände. Entscheidend sind die Zugänge, Nutzergruppen, Arbeitszeiten und Bereiche, die getrennt geregelt werden sollen.'],
  ['RFID, PIN, App oder Fingerprint?', 'Welche Identifikation passt, hängt von Ihrem Alltag und der gewählten Technik ab. Karten oder Transponder sind schnell ausgegeben, eine PIN kommt ohne Medium aus. App und Fingerprint sind bei geeigneten Systemen ebenfalls möglich.'],
  ['Was passiert, wenn eine Karte verloren geht?', 'Die betroffene Karte oder der Transponder kann im System gesperrt werden. Andere Berechtigungen bleiben davon unberührt. Wie schnell und durch wen Änderungen erfolgen, legen wir bei der Einrichtung fest.'],
  ['Kann ich Zugänge zeitlich begrenzen?', 'Mit einer passenden Anlage können Berechtigungen nach Türen, Bereichen und Zeiten vergeben werden. So erhält zum Beispiel ein Lieferdienst nur Zugang zum vorgesehenen Bereich und Zeitfenster.'],
  ['Kann ich sehen, wer eine Tür genutzt hat?', 'Geeignete Systeme können Zutrittsereignisse protokollieren. Umfang, Zugriffsrechte und Speicherdauer müssen zu Ihrem Zweck und Ihren Datenschutzvorgaben passen.'],
  ['Funktioniert das auch an Toren und Schranken?', 'Ja, geeignete Tore, Schranken und Außenzugänge können in die Planung einbezogen werden. Vor Ort prüfen wir Antrieb, Schnittstellen, Leitungswege und die gewünschte Bedienung.'],
  ['Lässt sich eine bestehende Tür weiterverwenden?', 'Oft können vorhandene Türen technisch ergänzt werden. Wir prüfen Schloss, Beschlag, Türzustand, Fluchtweg-Anforderungen und vorhandene Leitungswege, bevor wir eine Lösung empfehlen.'],
  ['Was kostet eine Zutrittskontrolle?', 'Die Kosten hängen von der Zahl der Türen, der gewünschten Identifikation, den Berechtigungen und der vorhandenen Gebäudetechnik ab. Sie erhalten ein individuelles Angebot mit Technik, Montage und Einweisung.'],
  ['Wie läuft die Installation ab?', 'Wir erfassen Türen und Abläufe, planen die Komponenten, montieren und konfigurieren das System und weisen die zuständigen Personen ein. Arbeiten stimmen wir mit Ihrem Betrieb ab.'],
]

function AdviceLink() {
  return <a href="#anfrage" className={shared.primary}>Beratung anfragen <span aria-hidden="true">↗</span></a>
}

function Scene({ name, alt, sizes = '(max-width: 767px) 100vw, 50vw', eager = false, className }) {
  return <Image src={`${imageRoot}/${name}.webp`} alt={alt} width={1536} height={1024} sizes={sizes} className={className} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
}

export default function CommercialAccessControlPage() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Zutrittskontrolle für Gewerbe', href: route }]))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ '@context': 'https://schema.org', '@type': 'Service', name: title, serviceType: 'Planung und Installation gewerblicher Zutrittskontrollsysteme', url: `${site.url}${route}`, provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Place', name: 'Mannheim und die Metropolregion Rhein-Neckar' }, description })} />

      <section className={`${shared.hero} ${shared.shell}`} aria-labelledby="page-title">
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>Ihr Fachbetrieb für Mannheim & Rhein-Neckar</p>
          <h1 id="page-title" tabIndex={-1}>Zutrittskontrolle für Gewerbe in Mannheim.</h1>
          <p className={shared.lead}>Bestimmen Sie, wer wann wohin darf. Individuell geplant, fachgerecht montiert und persönlich betreut.</p>
          <div id="hero-actions" className={shared.heroActions}>
            <AdviceLink />
            <a href="#zugaenge" className={shared.textLink}>Welche Zugänge lassen sich regeln? <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <InquiryForm
          subject="Zutrittskontrolle für Gewerbe"
          formName="Landingpage Zutrittskontrolle Gewerbe"
          defaultMessage="Bitte beraten Sie mich zu einer passenden Zutrittskontrolle für meinen Betrieb."
          heading="Welche Zugänge möchten Sie regeln?"
          intro="Unser Team in Mannheim berät Sie persönlich."
        />
        <figure className={shared.heroVisual}>
          <Scene name="business" alt="Architekturmodell eines Gewerbeobjekts mit Kartenlesern an Eingang, Mitarbeitertür und Zufahrt" sizes="(max-width: 767px) 100vw, (max-width: 1100px) 55vw, 720px" eager />
        </figure>
      </section>

      <div className={shared.assurances}>
        <div className={shared.shell}><span>Planung & Montage</span><span>Einweisung für Ihr Team</span><span>RFID, PIN & App</span><span>Betreuung aus Mannheim</span></div>
      </div>

      <section id="zugaenge" className={`${shared.section} ${shared.shell} ${shared.propertySection}`} aria-labelledby="property-heading">
        <h2 id="property-heading">Jeder Zugang bekommt die passende Regel.</h2>
        <p className={shared.sectionLead}>Vom Empfang bis zum Betriebshof. Wir planen die Berechtigungen passend zu Menschen, Bereichen und Arbeitszeiten.</p>
        <div className={shared.properties}>
          <article className={shared.property}>
            <Scene name="office" alt="Offenes Architekturmodell eines Büroempfangs mit gesichertem Eingang und Mitarbeitertür" />
            <div><h3>Büro, Praxis & Empfang</h3><p>Haupteingang, Personalräume und sensible Innenbereiche getrennt freigeben.</p></div>
          </article>
          <article className={shared.property}>
            <Scene name="warehouse" alt="Architekturmodell einer Lagerhalle mit kontrollierter Mitarbeitertür und Zufahrtstor" />
            <div><h3>Lager, Werkstatt & Zufahrt</h3><p>Mitarbeitertüren, Tore und Außenbereiche in ein klares Berechtigungskonzept einbinden.</p></div>
          </article>
        </div>
      </section>

      <section className={shared.tinted} aria-labelledby="access-heading">
        <div className={`${shared.section} ${shared.shell}`}>
          <h2 id="access-heading">So wird aus einer Tür ein geregelter Zugang.</h2>
          <p className={shared.sectionLead}>Ein einfacher Ablauf für Mitarbeitende. Klare Kontrolle für die zuständigen Personen.</p>
          <div className={styles.accessFlow}>
            <figure className={styles.credentialVisual}><Scene name="credential" alt="Hand hält eine Zutrittskarte vor einen Kartenleser an einer gewerblichen Eingangstür" sizes="(max-width: 767px) 100vw, 58vw" /></figure>
            <ol className={styles.accessSteps}>
              <li><h3>Identität zeigen</h3><p>Karte, Transponder, PIN, App oder ein anderes vorgesehenes Medium wird am Zugang verwendet.</p></li>
              <li><h3>Berechtigung prüfen</h3><p>Das System prüft, ob dieser Zugang zu diesem Zeitpunkt freigegeben ist.</p></li>
              <li><h3>Zugang freigeben</h3><p>Die Tür oder das Tor öffnet. Ereignisse können je nach Einrichtung protokolliert werden.</p></li>
            </ol>
          </div>
        </div>
      </section>

      <section id="technik" className={`${shared.section} ${shared.shell}`} aria-labelledby="technology-heading">
        <p className={shared.eyebrow}>Berechtigungen für Ihren Betriebsalltag</p>
        <h2 id="technology-heading">Nicht jeder braucht überall Zugang.</h2>
        <p className={shared.sectionLead}>Wir bilden Rollen, Bereiche und Zeiten so ab, dass die Lösung im Alltag verständlich bleibt.</p>
        <div className={styles.technology}>
          <figure className={styles.zoneVisual}><Scene name="zones" alt="Büroflur mit getrennt geregelten Türen zu Büro, Technikraum und Werkstatt" sizes="(max-width: 767px) 100vw, 58vw" /></figure>
          <dl className={styles.permissions}>
            <div><dt>Bereiche trennen</dt><dd>Büro, Lager, Technikraum und Außenbereich erhalten eigene Berechtigungen.</dd></div>
            <div><dt>Zeiten festlegen</dt><dd>Zutritt nur während der vereinbarten Arbeitszeit oder in einem definierten Zeitfenster.</dd></div>
            <div><dt>Änderungen verwalten</dt><dd>Neue Mitarbeitende anlegen. Verlorene Karten sperren. Rechte gezielt anpassen.</dd></div>
            <div><dt>Besucher einplanen</dt><dd>Temporäre Zugänge sind bei geeigneten Systemen ohne dauerhafte Berechtigung möglich.</dd></div>
          </dl>
        </div>
        <aside className={styles.privacyNote} aria-labelledby="privacy-heading">
          <h3 id="privacy-heading">Datenschutz von Anfang an mitdenken.</h3>
          <p>Zutrittsdaten können personenbezogen sein. Zweck, Zugriffsrechte und Speicherdauer sollten deshalb vor der Einrichtung feststehen. Bei Bedarf beziehen Sie Datenschutzbeauftragte und Betriebsrat ein.</p>
        </aside>
      </section>

      <section className={`${shared.shell} ${styles.costSection}`} aria-labelledby="cost-heading">
        <div className={styles.costPanel}>
          <h2 id="cost-heading">Was kostet Ihre Zutrittskontrolle?</h2>
          <p>Türen, Tore, Nutzergruppen und Identifikationsarten bestimmen den Umfang. Sie erhalten ein individuelles Angebot mit Technik, Montage und Einweisung.</p>
          <AdviceLink />
        </div>
      </section>

      <section className={`${shared.installSection} ${shared.shell} ${styles.installation}`} aria-labelledby="process-heading">
        <figure className={shared.installVisual}><Scene name="installation" alt="Techniker montiert einen Kartenleser neben einer gewerblichen Eingangstür" sizes="(max-width: 767px) 100vw, 55vw" /></figure>
        <div className={shared.installCopy}>
          <h2 id="process-heading">Ihr Fachbetrieb aus Mannheim.</h2>
          <ol className={shared.installSteps}>
            <li><h3>Zugänge & Abläufe klären</h3><p>Türen, Nutzergruppen, Zeitfenster und vorhandene Gebäudetechnik gemeinsam erfassen.</p></li>
            <li><h3>Montieren & einrichten</h3><p>Komponenten installieren, Berechtigungen konfigurieren und alle vorgesehenen Zugänge testen.</p></li>
            <li><h3>Team einweisen</h3><p>Zuständige Personen lernen, Medien auszugeben, Rechte anzupassen und Verluste zu sperren.</p></li>
          </ol>
          <AdviceLink />
        </div>
      </section>

      <section className={shared.tinted} aria-labelledby="faq-heading">
        <div className={`${shared.section} ${shared.shell} ${shared.faqLayout}`}>
          <div><h2 id="faq-heading">Noch Fragen?</h2><p>Wir beraten Sie persönlich zu Ihren Türen, Toren und Berechtigungen.</p><a href={site.phoneHref} className={shared.phoneLink}>{site.phone}</a><p className={shared.small}>Mo bis Fr, 08:00 bis 17:00 Uhr</p></div>
          <div className={shared.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={`${shared.shell} ${styles.finalSection}`} aria-labelledby="final-heading">
        <div className={shared.finalContent}>
          <h2 id="final-heading">Klare Zutrittsrechte beginnen mit einem Gespräch.</h2>
          <p>Mannheim, Ludwigshafen, Heidelberg und die Region Rhein-Neckar.</p>
          <address>{site.street}<br />{site.postalCode} {site.city}</address>
          <div id="final-actions" className={shared.finalActions}><AdviceLink /><a href={site.phoneHref} className={shared.textLink}>{site.phone}</a></div>
        </div>
      </section>
      <MobileContact />
    </div>
  )
}
