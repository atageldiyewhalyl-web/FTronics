import Image from 'next/image'
import { site, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { InquiryForm } from '../videoueberwachung-gewerbe/InquiryForm'
import { MobileContact } from '../videoueberwachung-gewerbe/MobileContact'
import shared from '../videoueberwachung-gewerbe/page.module.css'
import styles from './page.module.css'

const route = '/alarmanlagen-gewerbe'
const title = 'Alarmanlagen für Gewerbe in Mannheim'
const description = 'Einbruchschutz für Büro, Geschäft und Lager in Mannheim und Rhein-Neckar. Ajax-Alarmanlagen mit individueller Planung, Montage und Einweisung. Jetzt Beratung anfragen.'
const imageRoot = '/campaigns/alarm-gewerbe'

export const metadata = {
  title,
  description,
  alternates: { canonical: route },
  openGraph: {
    title, description, url: route, type: 'website', locale: 'de_DE', siteName: site.name,
    images: [{ url: `${imageRoot}/business.webp`, width: 1536, height: 1024, alt: 'Gewerbeobjekt mit Büro und Lager als Architekturmodell' }],
  },
  twitter: { card: 'summary_large_image', title, description, images: [`${imageRoot}/business.webp`] },
}

const faqs = [
  ['Passt eine Alarmanlage zu meinem Betrieb?', 'Wir planen für Büros, Praxen, Geschäfte, Lager und Werkstätten. Entscheidend sind Zugänge, Nutzung und die Bereiche, die geschützt werden sollen. Ihren Standort und besondere Anforderungen klären wir im ersten Gespräch.'],
  ['Funk, verkabelt oder beides?', 'Funk kann das Nachrüsten erleichtern. Kabelgebundene Komponenten eignen sich, wenn passende Leitungswege vorhanden sind. Hybride Ajax-Systeme verbinden beides. Welche Lösung passt, prüfen wir an Ihrem Objekt.'],
  ['Wer bekommt die Alarmmeldung?', 'Wir legen gemeinsam fest, welche berechtigten Personen informiert werden. Je nach System und Einrichtung sind Meldungen per App sowie weitere Übertragungswege möglich. Eine Leitstellenaufschaltung ist eine gesondert vereinbarte Leistung.'],
  ['Kann das Lager scharf sein, während im Büro noch gearbeitet wird?', 'Mit einer passenden Zoneneinteilung lassen sich Bereiche getrennt scharf und unscharf schalten. Berechtigungen und Abläufe richten wir nach Ihrem Arbeitsalltag ein.'],
  ['Was passiert bei Strom- oder Internetausfall?', 'Das hängt von Zentrale, Notstromversorgung und Übertragungswegen ab. Wir planen die passende Absicherung. Mobilfunk als zusätzlicher Meldeweg benötigt ein geeignetes Gerät, Netzempfang und einen aktiven Tarif.'],
  ['Lässt sich eine bestehende Anlage weiterverwenden?', 'Wir prüfen vorhandene Melder, Verkabelung und Schnittstellen. Ob eine Erweiterung oder ein Austausch sinnvoll ist, ergibt sich aus der technischen Prüfung.'],
  ['Welche laufenden Kosten entstehen?', 'Je nach Ausstattung und Vereinbarung fallen Kosten für Wartung, Batterien, Mobilfunk oder eine Leitstelle an. Diese Positionen werden im Angebot getrennt ausgewiesen.'],
  ['Wie läuft die Installation ab?', 'Wir stimmen Montage und Einrichtung mit Ihrem Betrieb ab, testen die Anlage und weisen die zuständigen Personen ein. Dauer und Umfang richten sich nach dem Objekt und der gewählten Ausstattung.'],
]

function AdviceLink() {
  return <a href="#anfrage" className={shared.primary}>Beratung anfragen <span aria-hidden="true">↗</span></a>
}

function Scene({ name, alt, sizes = '(max-width: 767px) 100vw, 50vw', eager = false, className }) {
  return <Image src={`${imageRoot}/${name}.webp`} alt={alt} width={1536} height={1024} sizes={sizes} className={className} loading={eager ? 'eager' : 'lazy'} fetchPriority={eager ? 'high' : undefined} />
}

export default function CommercialAlarmPage() {
  return (
    <div className={`${shared.page} ${styles.page}`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Alarmanlagen für Gewerbe', href: route }]))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ '@context': 'https://schema.org', '@type': 'Service', name: title, serviceType: 'Planung und Installation gewerblicher Alarmanlagen', url: `${site.url}${route}`, provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Place', name: 'Mannheim und die Metropolregion Rhein-Neckar' }, description })} />

      <section className={`${shared.hero} ${shared.shell}`} aria-labelledby="page-title">
        <div className={shared.heroCopy}>
          <p className={shared.eyebrow}>Ihr Fachbetrieb für Mannheim & Rhein-Neckar</p>
          <h1 id="page-title" tabIndex={-1}>Alarmanlagen für Gewerbe in Mannheim.</h1>
          <p className={shared.lead}>Einbruchschutz für Ihren Betrieb. Individuell geplant, fachgerecht montiert und persönlich betreut.</p>
          <div id="hero-actions" className={shared.heroActions}>
            <AdviceLink />
            <a href="#schutz" className={shared.textLink}>Was wird abgesichert? <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <InquiryForm subject="Alarmanlagen für Gewerbe" formName="Landingpage Alarmanlagen Gewerbe" defaultMessage="Bitte beraten Sie mich zu einer passenden Alarmanlage für meinen Betrieb." />
        <figure className={shared.heroVisual}>
          <Scene name="business" alt="Architekturmodell eines Gewerbeobjekts mit Büro, Lager und Alarmmeldern an den Zugängen" sizes="(max-width: 767px) 100vw, (max-width: 1100px) 55vw, 720px" eager />
        </figure>
      </section>

      <div className={shared.assurances}>
        <div className={shared.shell}><span>Planung & Montage</span><span>Einweisung für Ihr Team</span><span>Funk & Hybrid-Systeme</span><span>Betreuung aus Mannheim</span></div>
      </div>

      <section id="schutz" className={`${shared.section} ${shared.shell} ${shared.propertySection}`} aria-labelledby="property-heading">
        <h2 id="property-heading">Ihr Betrieb. Ihre Anforderungen.</h2>
        <p className={shared.sectionLead}>Wir sichern die Zugänge und Räume, auf die es bei Ihnen ankommt.</p>
        <div className={shared.properties}>
          <article className={shared.property}>
            <Scene name="warehouse" alt="Offenes Architekturmodell einer Lagerhalle mit Warenregalen, Werkbank und Alarmmeldern" />
            <div><h3>Lager & Werkstatt</h3><p>Tore, Nebeneingänge und Warenbereiche gezielt absichern.</p></div>
          </article>
          <article className={shared.property}>
            <Scene name="retail" alt="Architekturmodell eines Geschäfts mit Glasfront, Büro und Meldern am Eingang" />
            <div><h3>Geschäft, Büro & Praxis</h3><p>Eingänge überwachen. Räume nach Geschäftsschluss scharf schalten.</p></div>
          </article>
        </div>
      </section>

      <section className={shared.tinted} aria-labelledby="alarm-heading">
        <div className={`${shared.section} ${shared.shell}`}>
          <h2 id="alarm-heading">Was passiert bei einem Alarm?</h2>
          <p className={shared.sectionLead}>Erkennen, melden, reagieren. Mit einem klaren Ablauf für Ihren Betrieb.</p>
          <figure className={styles.eveningVisual}>
            <Scene name="after-hours" alt="Geschlossenes Gewerbegebäude am Abend mit Außensirene neben dem Eingang" sizes="(max-width: 767px) 100vw, 1216px" />
          </figure>
          <ol className={styles.alarmSteps}>
            <li><h3>Ein Ereignis wird erkannt.</h3><p>Melder erfassen das Öffnen eines gesicherten Zugangs oder Bewegung im scharf geschalteten Bereich.</p></li>
            <li><h3>Die Meldung erreicht Sie.</h3><p>Die Zentrale löst die eingerichtete Alarmierung aus und informiert die festgelegten Personen.</p></li>
            <li><h3>Der Ablauf steht fest.</h3><p>Sie wissen, wer reagiert. Auf Wunsch planen wir eine gesonderte Leitstellenaufschaltung ein.</p></li>
          </ol>
        </div>
      </section>

      <section id="technik" className={`${shared.section} ${shared.shell}`} aria-labelledby="technology-heading">
        <p className={shared.eyebrow}>Ajax-Alarmanlagen für Ihr Gewerbe</p>
        <h2 id="technology-heading">Schutz, der zu Ihrem Alltag passt.</h2>
        <p className={shared.sectionLead}>Funk oder Hybrid. Gemeinsam wählen wir die passende Ausstattung.</p>
        <div className={styles.technology}>
          <figure className={styles.detailVisual}><Scene name="door-contact" alt="Zweiteiliger Öffnungsmelder an einer geschlossenen gewerblichen Eingangstür" sizes="(max-width: 767px) 100vw, 55vw" /></figure>
          <dl className={styles.components}>
            <div><dt>Türen & Fenster</dt><dd>Öffnungsmelder erfassen, wenn ein gesicherter Zugang geöffnet wird.</dd></div>
            <div><dt>Räume & Warenbereiche</dt><dd>Bewegungsmelder überwachen die festgelegten Innenbereiche.</dd></div>
            <div><dt>Getrennte Bereiche</dt><dd>Das Lager bleibt scharf, während im Büro noch gearbeitet wird.</dd></div>
            <div><dt>Bedienung für Ihr Team</dt><dd>App oder Bedienteil, mit passenden Berechtigungen und persönlicher Einweisung.</dd></div>
          </dl>
        </div>
      </section>

      <section className={`${shared.shell} ${styles.costSection}`} aria-labelledby="cost-heading">
        <div className={styles.costPanel}>
          <h2 id="cost-heading">Was kostet Ihre Alarmanlage?</h2>
          <p>Zugänge, Raumaufteilung und Meldewege bestimmen den Umfang. Sie erhalten ein individuelles Angebot mit Technik, Montage und optionalen Folgekosten.</p>
          <AdviceLink />
        </div>
      </section>

      <section className={`${shared.installSection} ${shared.shell} ${styles.installation}`} aria-labelledby="process-heading">
        <figure className={shared.installVisual}><Scene name="installation" alt="Hände bei der Montage eines Alarm-Bedienteils an einer Innenwand" sizes="(max-width: 767px) 100vw, 55vw" /></figure>
        <div className={shared.installCopy}>
          <h2 id="process-heading">Ihr Fachbetrieb aus Mannheim.</h2>
          <ol className={shared.installSteps}>
            <li><h3>Objekt & Bedarf klären</h3><p>Zugänge, Arbeitszeiten und Wünsche besprechen. Die passende Lösung planen.</p></li>
            <li><h3>Montieren & einweisen</h3><p>Anlage installieren, gemeinsam testen und Ihrem Team die Bedienung zeigen.</p></li>
            <li><h3>Persönlich betreuen</h3><p>Wartung und Erweiterungen nach Vereinbarung. Mit einem Ansprechpartner vor Ort.</p></li>
          </ol>
          <AdviceLink />
        </div>
      </section>

      <section className={shared.tinted} aria-labelledby="faq-heading">
        <div className={`${shared.section} ${shared.shell} ${shared.faqLayout}`}>
          <div><h2 id="faq-heading">Noch Fragen?</h2><p>Wir beraten Sie persönlich zu Ihrem Betrieb.</p><a href={site.phoneHref} className={shared.phoneLink}>{site.phone}</a><p className={shared.small}>Mo bis Fr, 08:00 bis 17:00 Uhr</p></div>
          <div className={shared.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}</p></details>)}</div>
        </div>
      </section>

      <section className={`${shared.shell} ${styles.finalSection}`} aria-labelledby="final-heading">
        <div className={shared.finalContent}>
          <h2 id="final-heading">Einbruchschutz beginnt mit einem Gespräch.</h2>
          <p>Mannheim, Ludwigshafen, Heidelberg und die Region Rhein-Neckar.</p>
          <address>{site.street}<br />{site.postalCode} {site.city}</address>
          <div id="final-actions" className={shared.finalActions}><AdviceLink /><a href={site.phoneHref} className={shared.textLink}>{site.phone}</a></div>
        </div>
      </section>
      <MobileContact />
    </div>
  )
}
