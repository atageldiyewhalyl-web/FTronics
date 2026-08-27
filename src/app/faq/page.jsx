import { Button, CtaFlatlay } from '@/components/ui'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { FaqBrowser } from './FaqBrowser'
import { CtaAnfrageForm } from '../CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata = {
  /* The root layout appends " | FT Sicherheitstechnik" via title.template,
     which reproduces the live title exactly without doubling the suffix. */
  title: 'FAQ zur Sicherheitstechnik',
  description:
    'Antworten auf 31 häufige Fragen zu Alarmanlagen, Videoüberwachung, Smart Home, Brandschutz, Kosten & Wartung. FT Sicherheitstechnik Mannheim berät Sie.',
  alternates: { canonical: '/faq' },
}

/* ---------------- section data ---------------- */

/** Filter pills — ids match the `cat` key on every question below. */
const categories = [
  ['alle', 'Alle'],
  ['alarm', 'Alarmanlagen'],
  ['video', 'Videoüberwachung'],
  ['brand', 'Brandschutz'],
  ['smart', 'Smart Home'],
  ['kosten', 'Kosten & Förderung'],
  ['wartung', 'Wartung & Service'],
]

/** All 31 questions, in the artboard's order — numbering is derived. */
const faqs = [
  {
    cat: 'alarm',
    q: 'Was bringt eine Alarmanlage wirklich?',
    a: 'Eine Alarmanlage registriert frühzeitig Signale, die auf Gefahren wie Einbrüche oder Brände hinweisen, und minimiert so den Schaden. Sie verhindert Einbrüche zwar nicht direkt, erhöht aber das Entdeckungsrisiko für Einbrecher erheblich und wirkt stark abschreckend. Die Kombination aus Sirene, Aufschaltung auf eine Notruf- und Serviceleitstelle und schneller Reaktion ist entscheidend.',
  },
  {
    cat: 'alarm',
    q: 'Welche Arten von Alarmanlagen gibt es?',
    a: 'Grundsätzlich unterscheiden wir zwischen kabelgebundenen Alarmanlagen (ideal für Neubau), Funkalarmanlagen (perfekt für Nachrüstung) und Hybridanlagen, die beide Technologien kombinieren. Von klassischen Einbruchmeldeanlagen bis zu vernetzten Komplettlösungen mit Brandmeldung, Zutrittskontrolle und Videoüberwachung bieten wir ein breites Spektrum an.',
  },
  {
    cat: 'alarm',
    q: 'Welches Setup benötige ich für eine Funkalarmanlage?',
    a: 'Das benötigte Setup hängt von der Anzahl der Räume, der Grundstücksgröße, den Eingangstüren und Fenstern sowie Ihrem individuellen Sicherheitsbedürfnis ab. In jedem Fall wird eine Zentrale (Hub) benötigt. Für jeden zu überwachenden Raum empfehlen wir mindestens einen Bewegungsmelder, für den Außenbereich reichen meist 2–3 Außenmelder. Die Bedienung erfolgt bequem per App oder Keypad.',
  },
  {
    cat: 'alarm',
    q: 'Welche technischen Voraussetzungen brauche ich für eine Funkalarmanlage?',
    a: 'Moderne Funkalarmanlagen benötigen lediglich einen LAN/WLAN-Anschluss für die Datenübertragung sowie einen Stromanschluss für die Zentrale. Alle Sensoren und Melder verbinden sich kabellos per Funk mit der Zentraleinheit. Es müssen keine Kabel durchs Haus verlegt werden.',
  },
  {
    cat: 'alarm',
    q: 'Muss bei der Installation einer Funkalarmanlage gebohrt werden?',
    a: 'In der Regel nicht. Funkalarmanlagen werden kabellos und ohne Bohren oder Stemmen installiert und sind ideal für Mietwohnungen und Bestandsbauten. Falls Komponenten auf Kundenwunsch fest verbaut werden sollen, lässt sich Bohren nicht immer vermeiden. Wir beraten Sie gerne individuell.',
  },
  {
    cat: 'alarm',
    q: 'Wie lange dauert die Installation einer Alarmanlage?',
    a: 'Je nach Größe und Ausstattung des Objekts dauert die Installation in der Regel 30–60 Minuten. Bei größeren Gewerbeimmobilien kann die Montage entsprechend länger dauern. Wir vereinbaren vorab einen festen Termin und informieren Sie über den genauen Zeitaufwand.',
  },
  {
    cat: 'alarm',
    q: 'Wie wird eine moderne Alarmanlage bedient?',
    a: 'Über die Smartphone-App, per PIN-Code oder Transponder. Es können mehrere Nutzer mit individuellen Rechten angelegt werden. Die Scharfschaltung erfolgt wahlweise über eine Tastatur mit persönlichem Code, einen Funkschlüssel oder direkt per App, auch von unterwegs.',
  },
  {
    cat: 'alarm',
    q: 'Was passiert bei einem Stromausfall?',
    a: 'Die von uns verbauten Systeme verfügen über eine Notstromversorgung (Akkupuffer) und bleiben auch bei Netzausfall voll funktionsfähig. Bei Unterbrechung der Stromversorgung wird der Zustand auf dem Bedienfeld und in der App angezeigt. So ist Ihre Anlage auch bei Sabotageversuch geschützt.',
  },
  {
    cat: 'alarm',
    q: 'Kann ich eine Alarmanlage bei einem Umzug mitnehmen?',
    a: 'Ja, besonders Funkalarmanlagen lassen sich problemlos ummontieren und am neuen Wohnort neu installieren. Wir übernehmen auf Wunsch den Abbau und die Neuinstallation. Sprechen Sie uns einfach an.',
  },
  {
    cat: 'alarm',
    q: 'Bieten Alarmanlagen-Attrappen ausreichend Sicherheit?',
    a: 'Nein. Attrappen oder Dummies bieten keine ausreichende Sicherheit. Erfahrene Einbrecher erkennen diese Scheinsicherheit schnell. Wir empfehlen immer echte Alarmanlagen in Kombination mit mechanischen Sicherungen für einen wirksamen Schutz.',
  },
  {
    cat: 'video',
    q: 'Darf ich mein eigenes Grundstück mit Kameras überwachen?',
    a: 'Ja, die Videoüberwachung des eigenen Grundstücks ist grundsätzlich zulässig und durch das Hausrecht gedeckt. Wichtig: Die Beobachtung endet an den Grundstücksgrenzen. Öffentlicher Raum und Nachbargrundstücke dürfen nicht miterfasst werden. Wir helfen Ihnen bei der DSGVO-konformen Positionierung.',
  },
  {
    cat: 'video',
    q: 'Wann gilt die DSGVO für private Videoüberwachung?',
    a: 'Beschränkt sich die Überwachung auf den persönlichen oder familiären Bereich (z. B. die eigene Wohnung), gilt die DSGVO nicht. Sobald öffentlich zugängliche Bereiche wie Bürgersteige oder Nachbargrundstücke erfasst werden, greifen die datenschutzrechtlichen Voraussetzungen. Wir beraten Sie zu allen rechtlichen Anforderungen.',
  },
  {
    cat: 'video',
    q: 'Muss ich auf die Videoüberwachung hinweisen?',
    a: 'Ja. Bei zulässiger Videoüberwachung müssen gut sichtbare Hinweisschilder angebracht werden. Diese müssen auf die Tatsache der Überwachung, die verantwortliche Stelle, den Zweck, die Speicherdauer und die Betroffenenrechte hinweisen. Wir stellen Ihnen passende Hinweisschilder zur Verfügung.',
  },
  {
    cat: 'video',
    q: 'Wie lange darf ich aufgezeichnete Videodaten speichern?',
    a: 'Die DSGVO enthält keine konkrete Speicherfrist. In der Praxis haben sich 48–72 Stunden als Richtwert etabliert, mit automatischem Überschreiben. In begründeten Ausnahmefällen (z. B. Einbruch oder Betriebsferien) ist eine moderate Verlängerung möglich. Wir konfigurieren Ihre Systeme entsprechend.',
  },
  {
    cat: 'video',
    q: 'Darf ich neben Bild- auch Tonaufnahmen anfertigen?',
    a: 'Nein. Die Rechtsgrundlagen für Videoüberwachung umfassen keine Tonaufnahmen. Falls die Kameratechnik eine Audiofunktion bietet, muss diese deaktiviert bleiben. Das unbefugte Abhören ist gemäß § 201 StGB strafbar. Wir deaktivieren die Audiofunktion bei der Installation standardmäßig.',
  },
  {
    cat: 'video',
    q: 'Welche Bereiche dürfen in einem Unternehmen überwacht werden?',
    a: 'Erlaubt sind öffentlich zugängliche Bereiche wie Kundenparkplätze, Verkaufsflächen und Zufahrten. Nicht erlaubt ist die Überwachung von Toiletten, Umkleide- und Pausenräumen. Mitarbeiter müssen informiert werden, und eine dauerhafte Leistungskontrolle ist unzulässig. Wir planen die Kamerapositionen rechtssicher für Sie.',
  },
  {
    cat: 'brand',
    q: 'In welchen Räumen muss ich Rauchmelder anbringen?',
    a: 'Der Gesetzgeber schreibt Rauchmelder in Schlafräumen und auf Fluchtwegen vor. Je nach Bundesland gibt es weitere Regelungen in den Landesbauverordnungen. Wir empfehlen die Montage in allen Aufenthaltsräumen für einen umfassenden Schutz und beraten Sie zu den geltenden Vorschriften in Baden-Württemberg.',
  },
  {
    cat: 'brand',
    q: 'Gibt es Rauchmelder, die für die Küche geeignet sind?',
    a: 'Ja. Spezielle Rauch-Hitze-Warnmelder sind für Küchen konstruiert. Sie können Wasserdampf kondensieren und zwischen Kochhitze und einem tatsächlichen Feuer unterscheiden. Wir führen entsprechende Modelle und beraten Sie zur optimalen Platzierung.',
  },
  {
    cat: 'brand',
    q: 'Wann muss ein Rauchmelder ausgetauscht werden?',
    a: 'Rauchmelder müssen gemäß Herstellerangaben und DIN-Normen nach 10 Jahren ausgetauscht werden. Manche Modelle mit integrierten 10-Jahres-Batterien zeigen das Austauschende klar an. Wir erinnern unsere Wartungskunden rechtzeitig an den fälligen Austausch.',
  },
  {
    cat: 'brand',
    q: 'Mein Rauchmelder piept, obwohl es nicht brennt: was tun?',
    a: 'Vermutlich haben sich Staubpartikel oder Insekten im Sensor angesammelt. Nehmen Sie den Rauchmelder von der Decke und saugen Sie ihn mit dem Staubsauger auf höchster Stufe aus. Piept er regelmäßig alle 40 Sekunden, ist es wahrscheinlich ein Batteriewarnsignal. Tauschen Sie dann die Batterie aus.',
  },
  {
    cat: 'brand',
    q: 'Können Rauchmelder mit einer Alarmanlage gekoppelt werden?',
    a: 'Ja. Viele moderne Rauchmelder lassen sich nahtlos in Alarmanlagen integrieren. Welches Modell mit welcher Anlage kompatibel ist, hängt vom System ab. Wir setzen auf Rauchmelder, die sich direkt in unsere Sicherheitssysteme einbinden lassen, damit Sie im Brandfall sofort informiert werden.',
  },
  {
    cat: 'smart',
    q: 'Was passiert bei einem Stromausfall bei einem Smart Home System?',
    a: 'Die von uns installierten Smart Home Security-Systeme verfügen über redundante Kommunikationswege und Notstromversorgung (Akkupuffer). So funktionieren sie auch bei Stromausfall oder Sabotageversuch zuverlässig weiter. Redundante Alarmpfade via Netzwerk und Mobilfunk sorgen für zusätzliche Sicherheit.',
  },
  {
    cat: 'smart',
    q: 'Ist die Einrichtung eines Smart Home Security Systems kompliziert?',
    a: 'Einfache Komponenten können oft selbst installiert werden, komplexere Systeme erfordern professionelle Installation wegen Verkabelung, Sensorpositionierung und Integration. Wir übernehmen die fachgerechte Einrichtung und Konfiguration Ihres Systems komplett, inklusive App-Einweisung.',
  },
  {
    cat: 'smart',
    q: 'Ist lokale Datenspeicherung sicherer als die Cloud?',
    a: 'Lokale Speicherung bedeutet, dass Ihre Daten im eigenen Netzwerk bleiben und nicht bei externen Cloud-Anbietern gespeichert werden, das erhöht den Datenschutz. Wir setzen auf Systeme, die rein lokale Speicherung ohne Cloud-Zwang ermöglichen. Falls Cloud gewünscht ist, achten wir auf Ende-zu-Ende-Verschlüsselung und transparente Datenschutzrichtlinien.',
  },
  {
    cat: 'smart',
    q: 'Können IP-Kameras in Smart Home Systeme integriert werden?',
    a: 'Ja. Alle IP-Kameras und Rekorder, die RTSP zur Datenübertragung nutzen, können in moderne Sicherheitszentralen eingebunden werden. Je nach System können 10 bis 100 Videostreams verwaltet werden, alles steuerbar über eine zentrale App mit zuverlässiger Verschlüsselung.',
  },
  {
    cat: 'kosten',
    q: 'Was kostet eine Alarmanlage für ein Einfamilienhaus?',
    a: 'Die Kosten für ein sachgemäßes Alarmsystem in einem Einfamilienhaus liegen erfahrungsgemäß zwischen ca. 1.300 € und 10.000 €, je nach Hersteller, Modell und Objektgröße. Hinzu kommen ggf. monatliche Kosten für die Aufschaltung auf eine Leitstelle und einen Wartungsvertrag. Wir erstellen Ihnen gerne ein individuelles Angebot.',
  },
  {
    cat: 'kosten',
    q: 'Welche laufenden Kosten entstehen beim Betrieb einer Alarmanlage?',
    a: 'Der Betrieb ist bei Selbstüberwachung per App kostenfrei. Monatliche Gebühren fallen nur bei Aufschaltung auf einen Sicherheitsdienst oder bei Mobilfunk-Benachrichtigungen an. Die Kosten für eine Leitstellenanbindung liegen bei ca. 30–70 € pro Monat. Wir beraten Sie transparent zu allen Optionen.',
  },
  {
    cat: 'kosten',
    q: 'Wie fördert die KfW den Einbruchschutz?',
    a: 'Die KfW fördert Einbruchschutzmaßnahmen über das Programm KfW 159 mit zinsgünstigen Krediten bis zu 50.000 € je Wohnung. Gefördert werden einbruchhemmende Türen und Fenster, Alarmanlagen, Kamerasysteme und intelligente Türschlösser. Wichtig: Der Antrag muss vor Auftragserteilung gestellt werden und die Ausführung durch einen Fachbetrieb wie uns erfolgen.',
  },
  {
    cat: 'wartung',
    q: 'Wie oft sollte eine Alarmanlage gewartet werden?',
    a: 'Wir empfehlen mindestens eine jährliche Wartung, das entspricht dem gängigen Branchenstandard. Bei besonders sicherheitsrelevanten Objekten empfehlen wir halbjährliche Inspektionen. Alle Wartungsarbeiten werden in Protokollen dokumentiert, die wir Ihnen aushändigen.',
  },
  {
    cat: 'wartung',
    q: 'Was wird bei der Wartung einer Alarmanlage geprüft?',
    a: 'Bei unserer Wartung prüfen wir systematisch: Übertragungswege und Aufschaltung, Signalgeber, Bedienelemente, Energieversorgung und Batterie, Scharf-/Unscharfschaltung, Beschädigungen und Verschmutzung, Bewegungsmelder (Gehtests) sowie Softwareupdates. So stellen wir die einwandfreie Funktion Ihrer Anlage sicher.',
  },
  {
    cat: 'wartung',
    q: 'Was kostet die Wartung einer Alarmanlage?',
    a: 'Die jährlichen Wartungskosten liegen je nach Anlage zwischen 100 € und 500 €. Einfachere Systeme können für 100–150 € pro Jahr gewartet werden, komplexere Anlagen kosten 200–500 € jährlich. Wir bieten transparente Wartungsverträge mit festen Konditionen. Fragen Sie uns nach einem Angebot.',
  },
]

/* The live site publishes exactly one FAQPage block here. */
function faqPageJsonLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${site.url}/faq#faq`,
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/* Page-scoped CSS: the sticky filter bar and the accordion chrome.
   Lives here rather than in globals.css because nothing else on the
   site uses it — and the :hover / [open] / ::-webkit rules cannot be
   expressed as inline styles. */
const css = `
.faq-bar{position:sticky;top:72px;z-index:40;margin-top:2.5rem;background:color-mix(in srgb,var(--bg) 85%,transparent);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid var(--border)}
.faq-bar-inner{max-width:var(--container);margin:0 auto;padding:.9rem var(--gutter);display:flex;gap:var(--sp-2);overflow-x:auto;scrollbar-width:none}
.faq-bar-inner::-webkit-scrollbar{display:none}
.faq-filter{font:500 13.5px var(--font-ui);padding:.55rem 1.1rem;border-radius:var(--r-pill);border:1px solid var(--border);background:transparent;color:var(--fg-secondary);cursor:pointer;white-space:nowrap;transition:background var(--dur-2) var(--ease-out),color var(--dur-2) var(--ease-out),border-color var(--dur-2) var(--ease-out)}
.faq-filter:hover{color:var(--fg);border-color:var(--border-strong)}
.faq-filter[aria-pressed="true"]{background:var(--btn-primary-bg);color:var(--btn-primary-fg);border-color:var(--border-strong)}
details.faq{border-bottom:1px solid var(--border)}
details.faq summary{display:flex;gap:var(--sp-4);align-items:baseline;padding:1.2rem 0;cursor:pointer;list-style:none}
details.faq summary::-webkit-details-marker{display:none}
details.faq summary:focus-visible{outline:2px solid var(--ring);outline-offset:2px;border-radius:var(--r-sm)}
details.faq .faq-n{font-family:var(--font-mono);font-size:13px;color:var(--fg-tertiary);flex:none;width:28px}
details.faq .q{font-weight:500;transition:color var(--dur-2) var(--ease-out)}
details.faq summary:hover .q{color:var(--ft-signal-600)}
details.faq .chev{margin-left:auto;color:var(--fg-tertiary);flex:none;transition:transform var(--dur-2) var(--ease-out)}
details.faq[open] .chev{transform:rotate(180deg)}
details.faq .faq-a{color:var(--fg-secondary);margin:0 0 1.4rem;padding-left:44px}
`

/* ---------------- page ---------------- */

export default function FAQ() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqPageJsonLd(faqs))} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'FAQ', href: '/faq' },
          ])
        )}
      />
      <style href="faq-page" precedence="default">{css}</style>

      {/* Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Häufig gestellte Fragen</p>
            <h1 data-rev style={{ maxWidth: '18ch' }}>Alle Antworten auf einen Blick</h1>
            <p className="ft-lead" data-rev style={{ margin: '1rem 0 0' }}>
              Von Alarmanlagen über Videoüberwachung bis Smart Home: hier finden Sie Antworten auf
              die wichtigsten Fragen rund um moderne Sicherheitstechnik.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky category filter + the 31 accordions */}
      <FaqBrowser categories={categories} faqs={faqs} />

      {/* Closing CTA */}
      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div
            data-rev
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(2rem,5vw,4rem)',
              display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-6)',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>Ihre Frage nicht dabei?</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Kontaktieren Sie uns. Wir beantworten Ihre Fragen persönlich und beraten Sie
                individuell.
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
