import Image from 'next/image'
import { ScrollGallery } from '@/components/scroll'
import { site, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { InquiryForm } from './InquiryForm'
import { MobileContact } from './MobileContact'
import styles from './page.module.css'

const route = '/videoueberwachung-gewerbe'
const title = 'Videoüberwachung für Gewerbe in Mannheim'
const description = 'Videoüberwachung für Lager, Einzelhandel und Betriebsgelände in Mannheim und Rhein-Neckar. Individuelle Planung, Installation und Betreuung. Jetzt Beratung anfragen.'

export const metadata = {
  title,
  description,
  alternates: { canonical: route },
  openGraph: { title, description, url: route, type: 'website', locale: 'de_DE', siteName: site.name, images: [{ url: '/campaigns/video-gewerbe/site.webp', width: 1536, height: 1024, alt: 'Illustration eines Gewerbeobjekts mit Videoüberwachung' }] },
  twitter: { card: 'summary_large_image', title, description, images: ['/campaigns/video-gewerbe/site.webp'] },
}

const faqs = [
  ['Wie viele Kameras brauche ich?', 'Das hängt von den Zugängen, Sichtachsen und gewünschten Bilddetails ab. Wir planen die Kamerapositionen passend zu Ihrem Objekt.'],
  ['Funktioniert das auch nachts?', 'Ja, mit passender Kamera und Beleuchtung. Entfernung, Licht und Montagehöhe bestimmen, welche Details nachts erkennbar sind.'],
  ['Kann meine bestehende Anlage bleiben?', 'Geeignete Kameras und Verkabelung können gegebenenfalls weitergenutzt werden. Wir prüfen Modelle, Schnittstellen und Bildqualität.'],
  ['Brauche ich Internet oder ein Cloud-Abo?', 'Lokale Aufzeichnung ist ohne Cloud-Abo möglich. Strom und lokales Netzwerk müssen funktionieren. Für Fernzugriff und externe Meldungen benötigen Sie eine Internetverbindung.'],
  ['Was muss ich beim Datenschutz beachten?', 'Zweck, Sichtbereiche, Hinweisschilder, Zugriffsrechte und Löschfristen müssen zum Einsatz passen. Wir unterstützen die technische Umsetzung. Die rechtliche Prüfung liegt beim Betreiber, gegebenenfalls mit Datenschutzbeauftragten und Betriebsrat.'],
  ['Wie lange dauert die Montage?', 'Das richtet sich nach Kameraanzahl, Kabelwegen und Zugänglichkeit. Den Termin und den Ablauf stimmen wir vorab mit Ihrem Betrieb ab.'],
  ['Gibt es laufende Kosten?', 'Je nach Vereinbarung können Wartung, Speicherersatz oder eine Leitstellenanbindung hinzukommen. Diese Leistungen weisen wir im Angebot gesondert aus.'],
  ['Wo sind Sie im Einsatz?', 'In Mannheim und rund 50 km Umgebung, unter anderem Ludwigshafen, Heidelberg und Viernheim. Geben Sie Ihren Objektstandort bei der Anfrage an.'],
]

// Product imagery and model names are taken from the existing homepage range.
const products = [
  { name: 'FC-8D Pro', slug: 'fc-8d-pro', purpose: 'Für Eingänge & Innenbereiche', kind: 'Dome-Kamera', features: '4K-Auflösung · PoE', width: 600, height: 600 },
  { name: 'FB-8A Pro', slug: 'fb-8a-pro', purpose: 'Für Fassade & Zufahrt', kind: 'Bullet-Kamera', features: '4K-Auflösung · IP67', width: 600, height: 600 },
  { name: 'FT-8P Dual', slug: 'ft-8p-dual', purpose: 'Für breite Sichtbereiche', kind: 'Panorama-Kamera', features: '180°-Panorama · 8 MP', width: 600, height: 600 },
  { name: 'FP-8T 20X', slug: 'fp-8t-20x', purpose: 'Für große Außenflächen', kind: 'Schwenkbare PTZ-Kamera', features: '20-fach-Zoom · Auto-Tracking', width: 500, height: 500 },
  { name: 'FN-16', slug: 'fn-16', purpose: 'Für Ihre lokale Aufzeichnung', kind: 'Netzwerk-Videorekorder', features: '16 Kanäle · 4K', width: 2283, height: 1714 },
]

function AdviceLink({ children = 'Beratung anfragen' }) {
  return <a href="#anfrage" className={styles.primary}>{children}<span aria-hidden="true">↗</span></a>
}

export default function CommercialVideoPage() {
  return (
    <div className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbJsonLd([{ name: 'Startseite', href: '/' }, { name: 'Videoüberwachung für Gewerbe', href: route }]))} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd({ '@context': 'https://schema.org', '@type': 'Service', name: title, serviceType: 'Planung und Installation gewerblicher Videoüberwachung', url: `${site.url}${route}`, provider: { '@id': `${site.url}/#organization` }, areaServed: { '@type': 'Place', name: 'Mannheim und die Metropolregion Rhein-Neckar' }, description })} />

      <section className={`${styles.hero} ${styles.shell}`} aria-labelledby="page-title">
        <div className={styles.heroCopy}>
          <p className={styles.eyebrow}>Ihr Fachbetrieb für Mannheim & Rhein-Neckar</p>
          <h1 id="page-title" tabIndex={-1}>Videoüberwachung für Gewerbe in Mannheim.</h1>
          <p className={styles.lead}>Kameras, Montage und Betreuung. Persönlich vor Ort, aus einer Hand.</p>
          <div id="hero-actions" className={styles.heroActions}><AdviceLink /><a href="#loesung" className={styles.textLink}>Welche Lösung passt zu mir? <span aria-hidden="true">↓</span></a></div>
        </div>
        <InquiryForm />
        <figure className={styles.heroVisual}>
          <Image src="/campaigns/video-gewerbe/site.webp" alt="Gewerbeobjekt mit Kameras an Lagerhalle, Büro und Zufahrt" width={1536} height={1024} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 55vw, 720px" loading="eager" fetchPriority="high" />
        </figure>
      </section>

      <div className={styles.assurances}>
        <div className={styles.shell}><span>Planung & Montage</span><span>Persönliche Einweisung</span><span>Lokale Speicherung möglich</span><span>Betreuung aus Mannheim</span></div>
      </div>

      <section id="loesung" className={`${styles.section} ${styles.shell} ${styles.propertySection}`} aria-labelledby="property-heading">
        <h2 id="property-heading">Wo brauchen Sie den Überblick?</h2>
        <p className={styles.sectionLead}>Die richtigen Kameras. An den entscheidenden Stellen.</p>
        <div className={styles.properties}>
          <article className={styles.property}>
            <Image src="/campaigns/video-gewerbe/warehouse.webp" alt="Lager mit Kamera am Wareneingang" width={1200} height={800} sizes="(max-width: 767px) 100vw, 50vw" />
            <div><h3>Lager & Betriebsgelände</h3><p>Zufahrten kontrollieren. Warenbereiche im Blick behalten.</p></div>
          </article>
          <article className={styles.property}>
            <Image src="/campaigns/video-gewerbe/shop.webp" alt="Gewerberaum mit Kamera am Eingang" width={1200} height={800} sizes="(max-width: 767px) 100vw, 50vw" />
            <div><h3>Einzelhandel & Büro</h3><p>Eingänge absichern. Ereignisse nachvollziehen.</p></div>
          </article>
        </div>
      </section>

      <section className={styles.tinted} aria-labelledby="system-heading">
        <div className={`${styles.section} ${styles.shell}`}>
          <h2 id="system-heading">Was kann Ihre Anlage im Alltag?</h2>
          <p className={styles.sectionLead}>Erkennen. Nachsehen. Lokal aufzeichnen.</p>
          <div className={styles.benefitGrid}>
            <article className={styles.nightVisual}>
              <Image className={styles.nightPicture} src="/campaigns/video-gewerbe/after-hours.webp" alt="Überwachte Lagerzufahrt nach Geschäftsschluss" width={1536} height={1024} sizes="(max-width: 767px) 100vw, 65vw" />
              <div><h3>Feierabend.<br />Ihr Gelände bleibt im Blick.</h3><p>Ereignisse prüfen und bei Bedarf aus der Ferne nachsehen.</p></div>
            </article>
            <article className={styles.benefitCard}>
              <Image src="/ft-8p-dual-main.webp" alt="FTronics FT-8P Dual Panoramakamera" width={600} height={600} sizes="(max-width: 767px) 65vw, 270px" />
              <div><h3>Mehr Fläche im Bild.</h3><p>Passende Kameras für Eingänge, Höfe und weite Sichtbereiche.</p></div>
            </article>
            <article className={`${styles.benefitCard} ${styles.recorderCard}`}>
              <Image src="/fn-16-main.webp" alt="FTronics FN-16 Netzwerk-Videorekorder" width={2283} height={1714} sizes="(max-width: 767px) 65vw, 270px" />
              <div><h3>Ihre Aufnahmen. Vor Ort.</h3><p>Lokale Speicherung ohne Cloud-Speicher möglich.</p></div>
            </article>
          </div>
        </div>
      </section>

      <section id="technik" className={`${styles.section} ${styles.productSection}`} aria-labelledby="products-heading">
        <div className={styles.shell}><p className={styles.eyebrow}>FTronics. Unsere Marke für Videotechnik.</p><h2 id="products-heading">Die Technik hinter Ihrem Überblick.</h2><p className={styles.sectionLead}>Vom einzelnen Eingang bis zum gesamten Betriebsgelände.</p></div>
        <div className={`ft-rail-bleed ${styles.productRail}`}>
          <ScrollGallery itemWidth={330} label="FTronics Kameras und Rekorder" actions={<a href="#anfrage" className={styles.textLink}>Beratung anfragen <span aria-hidden="true">↗</span></a>}>
            {products.map(product => <a className={styles.productCard} key={product.slug} href={`/produkte/${product.slug}`}>
              <p className={styles.productPurpose}>{product.purpose}</p>
              <div className={styles.productImage}><Image src={`/${product.slug}-main.webp`} alt="" width={product.width} height={product.height} sizes="(max-width: 767px) 78vw, 330px" /></div>
              <div className={styles.productInfo}><span>{product.kind}</span><h3>{product.name}</h3><p>{product.features}</p><span className={styles.productDetails}>Produkt ansehen <span aria-hidden="true">↗</span></span></div>
            </a>)}
          </ScrollGallery>
        </div>
      </section>

      <section className={`${styles.installSection} ${styles.shell}`} aria-labelledby="process-heading">
        <figure className={styles.installVisual}><Image src="/campaigns/video-gewerbe/installation.webp" alt="Montage einer Überwachungskamera" width={1440} height={960} sizes="(max-width: 767px) 100vw, 55vw" /></figure>
        <div className={styles.installCopy}>
          <h2 id="process-heading">Ihr Fachbetrieb aus Mannheim.</h2>
          <ol className={styles.installSteps}>
            <li><h3>Gemeinsam planen</h3><p>Objekt ansehen. Bedarf klären. Angebot erhalten.</p></li>
            <li><h3>Fachgerecht installieren</h3><p>Montage, Einrichtung und Einweisung durch FT.</p></li>
            <li><h3>Persönlich betreuen</h3><p>Wartung und Erweiterungen nach Vereinbarung.</p></li>
          </ol>
          <AdviceLink />
        </div>
      </section>

      <section className={`${styles.quoteSection} ${styles.shell}`} aria-labelledby="cost-heading">
        <div className={styles.quoteVisual}>
          <Image src="/campaigns/video-gewerbe/planning-background.webp" alt="Kameraplanung mit Grundriss und Netzwerktechnik" fill sizes="(max-width: 767px) 100vw, 1200px" />
          <div className={styles.quoteCopy}><h2 id="cost-heading">Was kostet Ihr System?</h2><p>Fläche, Kameras und Montage bestimmen den Preis. Sie erhalten ein Angebot passend zu Ihrem Objekt.</p><AdviceLink /></div>
        </div>
      </section>

      <section className={styles.tinted} aria-labelledby="faq-heading">
        <div className={`${styles.section} ${styles.shell} ${styles.faqLayout}`}>
          <div><h2 id="faq-heading">Noch Fragen?</h2><p>Wir beraten Sie persönlich.</p><a href={site.phoneHref} className={styles.phoneLink}>{site.phone}</a><p className={styles.small}>Mo bis Fr, 08:00 bis 17:00 Uhr</p><Image className={styles.faqProduct} src="/fc-8d-pro-main.webp" alt="FTronics FC-8D Pro Dome-Kamera" width={600} height={600} sizes="(max-width: 767px) 140px, 260px" /></div>
          <div className={styles.faqs}>{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true" /></summary><p>{answer}{question.includes('Datenschutz') && <> <a href="https://www.baden-wuerttemberg.datenschutz.de/orientierungshilfe-videoueberwachung-nicht-oeffentlich/" target="_blank" rel="noopener noreferrer">Hinweise der Datenschutzaufsicht</a></>}</p></details>)}</div>
        </div>
      </section>

      <section className={styles.finalScene} aria-labelledby="final-heading">
        <Image src="/campaigns/video-gewerbe/contact-background.webp" alt="" fill sizes="100vw" />
        <div className={`${styles.shell} ${styles.finalContent}`}><p className={styles.eyebrow}>FT Sicherheitstechnik</p><h2 id="final-heading">In Mannheim.<br />Für Ihren Betrieb.</h2><address>{site.street}<br />{site.postalCode} {site.city}</address><div id="final-actions" className={styles.finalActions}><AdviceLink /><a href={site.phoneHref} className={styles.textLink}>{site.phone}</a></div></div>
      </section>
      <MobileContact />
    </div>
  )
}
