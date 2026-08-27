import { Button, Card, SectionHead, Media } from '@/components/ui'
import { PinStack, ScrollGallery } from '@/components/scroll'
import { HeroField, RingField } from '@/components/hero-field'
import { HeroScene } from '@/components/hero-scene'
import { Teardown } from '@/components/teardown'
import { site, cta } from '@/lib/site'
import { CtaAnfrageForm } from './CtaAnfrageForm'
import { IconMark, markFor } from '@/components/spec-marks'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata = {
  /* `absolute`, and deliberately without the brand suffix: the domain
     (ftsicherheitstechnik.com) sits directly above the title in the SERP and
     already carries the brand, so the 24 characters are better spent on the
     two head terms plus the city. This matters while audit finding C2 is
     open — /alarmanlagen-mannheim.html is being retired, and this is the only
     remaining title carrying "Alarmanlagen". Revisit once that page is
     rebuilt. */
  title: { absolute: 'Alarmanlagen & Sicherheitstechnik Mannheim' },
  alternates: { canonical: '/' },
}

/* ---------------- section data ---------------- */

const pledges = [
  ['Kabel im Kanal', 'Keine fliegende Verkabelung. Alles im Schutzkanal.', '/pledge-kabel.webp'],
  ['Bohrlöcher verspachtelt', 'Wenn nötig nachgestrichen. Keine Spuren.', '/pledge-bohrloch.webp'],
  ['Boden gefegt', 'Bohrstaub weg, Verpackung mitgenommen.', '/pledge-boden.webp'],
  ['Übergabe vor Ort', 'Persönliche Einweisung. Kein Zettel auf dem Tisch.', '/pledge-uebergabe.webp'],
]

/* Google's four-colour G, drawn rather than fetched — one more network round
   trip for a 16px mark is not worth it, and an <img> would flash in late on
   the one element whose whole job is to say where the rating comes from.
   Trademark used only to attribute Google's own rating, which is what it is
   for. */
function GoogleMark() {
  return (
    <svg viewBox="0 0 48 48" width="16" height="16" aria-hidden="true" focusable="false">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65Z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19Z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z" />
    </svg>
  )
}

const marks = {
  /* A speech bubble, for the visit that starts the job. */
  beratung: (
    <IconMark>
      <path d="M12 4.2c-4.5 0-8.1 3.1-8.1 6.9 0 2.1 1.1 4 2.9 5.3v2.7c0 .8.9 1.2 1.5.8l2.8-2c.3 0 .6.1.9.1 4.5 0 8.1-3.1 8.1-6.9S16.5 4.2 12 4.2Z" />
    </IconMark>
  ),
  /* A hard hat, for the hands that do the work. */
  installation: (
    <IconMark>
      <path d="M13.3 5.1a1.3 1.3 0 0 0-2.6 0v1.2a5.9 5.9 0 0 0-3.9 5.5v.8a.9.9 0 0 0 .9.9h8.6a.9.9 0 0 0 .9-.9v-.8a5.9 5.9 0 0 0-3.9-5.5V5.1Z" />
      <rect x="4" y="15.1" width="16" height="3" rx="1.5" />
    </IconMark>
  ),
  /* Concentric rings, for the detail everything is measured against. */
  praezision: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm0 3.2a4.8 4.8 0 1 0 0 9.6 4.8 4.8 0 0 0 0-9.6Z"
      />
      <circle cx="12" cy="12" r="2.2" />
    </IconMark>
  ),

  /* --- the six services --- */
  alarm: (
    <IconMark>
      <path d="M12 2.9a1.5 1.5 0 0 1 1.5 1.5v.4a5.9 5.9 0 0 1 4.4 5.7v3l1.2 1.9a1 1 0 0 1-.8 1.5H5.7a1 1 0 0 1-.8-1.5l1.2-1.9v-3a5.9 5.9 0 0 1 4.4-5.7v-.4A1.5 1.5 0 0 1 12 2.9Z" />
      <path d="M9.7 18.4h4.6a2.3 2.3 0 0 1-4.6 0Z" />
    </IconMark>
  ),
  video: (
    <IconMark>
      <path d="M12 5.4a7.3 7.3 0 0 1 7.3 7.3 1 1 0 0 1-1 1H5.7a1 1 0 0 1-1-1A7.3 7.3 0 0 1 12 5.4Z" />
      <rect x="3.4" y="15.3" width="17.2" height="3" rx="1.5" />
    </IconMark>
  ),
  tuersprech: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M8.7 3h6.6A2.7 2.7 0 0 1 18 5.7v12.6a2.7 2.7 0 0 1-2.7 2.7H8.7A2.7 2.7 0 0 1 6 18.3V5.7A2.7 2.7 0 0 1 8.7 3Zm3.3 3.3a2.1 2.1 0 1 0 0 4.2 2.1 2.1 0 0 0 0-4.2Zm-1.9 7.5a1 1 0 0 0 0 2h3.8a1 1 0 0 0 0-2h-3.8Z"
      />
    </IconMark>
  ),
  zutritt: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M12 2.7A4.4 4.4 0 0 0 7.6 7.1v2.2h-.2a2.5 2.5 0 0 0-2.5 2.5v6.4a2.5 2.5 0 0 0 2.5 2.5h9.2a2.5 2.5 0 0 0 2.5-2.5v-6.4a2.5 2.5 0 0 0-2.5-2.5h-.2V7.1A4.4 4.4 0 0 0 12 2.7Zm2.3 6.6V7.1a2.3 2.3 0 0 0-4.6 0v2.2h4.6Z"
      />
    </IconMark>
  ),
  smarthome: (
    <IconMark>
      <path d="M11.2 3.2a1.3 1.3 0 0 1 1.6 0l7.7 6.2a1.3 1.3 0 0 1 .5 1v9a1.7 1.7 0 0 1-1.7 1.7H5a1.7 1.7 0 0 1-1.7-1.7v-9a1.3 1.3 0 0 1 .5-1l7.4-6.2Z" />
    </IconMark>
  ),
  brand: (
    <IconMark>
      <path d="M13.1 2.7a.9.9 0 0 0-1.5.4c-.6 2-1.7 3.2-2.9 4.5-1.3 1.5-2.7 3.1-2.7 6a6.6 6.6 0 0 0 13.2 0c0-2.5-1.1-4.1-2.1-5.5-1-1.4-1.8-2.5-1.8-4a.9.9 0 0 0-1.5-.6 5.6 5.6 0 0 0-1.1 1.4 15 15 0 0 0-.5-2.2Z" />
    </IconMark>
  ),

  /* --- the four figures --- */
  erfahrung: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M12 2.8a9.2 9.2 0 1 0 0 18.4 9.2 9.2 0 0 0 0-18.4Zm0 2.3a6.9 6.9 0 1 1 0 13.8 6.9 6.9 0 0 1 0-13.8Z"
      />
      <path d="M13 7.7a1.1 1.1 0 0 0-2.2 0v4.6c0 .38.2.73.52.93l2.9 1.8a1.1 1.1 0 0 0 1.16-1.86L13 11.6V7.7Z" />
    </IconMark>
  ),
  region: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M12 2.6a7.5 7.5 0 0 0-7.5 7.5c0 5.2 6.4 10.8 6.7 11a1.2 1.2 0 0 0 1.6 0c.3-.2 6.7-5.8 6.7-11A7.5 7.5 0 0 0 12 2.6Zm0 4.9a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z"
      />
    </IconMark>
  ),
  top: (
    <IconMark>
      <path d="M12 2.9a.9.9 0 0 1 .8.5l2.3 4.7 5.1.7a.9.9 0 0 1 .5 1.6l-3.7 3.6.9 5.1a.9.9 0 0 1-1.3 1L12 18.7l-4.6 2.4a.9.9 0 0 1-1.3-1l.9-5.1-3.7-3.6a.9.9 0 0 1 .5-1.6l5.1-.7 2.3-4.7a.9.9 0 0 1 .8-.5Z" />
    </IconMark>
  ),
  dsgvo: (
    <IconMark>
      <path
        fillRule="evenodd"
        d="M11.5 2.6a1.4 1.4 0 0 1 1 0l6.4 2.5a1.4 1.4 0 0 1 .9 1.3v4.9c0 4.5-3 7.7-7.3 9.5a1.4 1.4 0 0 1-1 0c-4.3-1.8-7.3-5-7.3-9.5V6.4a1.4 1.4 0 0 1 .9-1.3l6.4-2.5Zm4 6.7a1.1 1.1 0 0 0-1.6 0l-3.2 3.2-1.1-1.1a1.1 1.1 0 0 0-1.6 1.6l1.9 1.9a1.1 1.1 0 0 0 1.6 0l4-4a1.1 1.1 0 0 0 0-1.6Z"
      />
    </IconMark>
  ),
}

const handMade = [
  ['Beratung vor Ort', 'Wir kommen zu Ihnen, analysieren das Objekt und planen die Lösung gemeinsam mit Ihnen, nicht am Schreibtisch.', 'beratung'],
  ['Installation durch Profis', 'Sauber, sicher, normgerecht. Eigenes Personal mit Firmenfahrzeug, eigener Werkstatt und 15+ Jahren Praxiserfahrung.', 'installation'],
  ['Präzision im Detail', 'Von der CAT6-Verkabelung bis zur Konfiguration: Jede Verbindung sitzt. Jeder Anschluss wird dokumentiert.', 'praezision'],
]

const services = [
  ['Alarmanlagen', 'Hybride Ajax-Alarmanlagen mit App-Steuerung, Funk- und Draht-Komponenten. Professionell geplant, sauber installiert, jährlich gewartet.', 'alarm'],
  ['Videoüberwachung', '4K/8MP Kameras mit KI-Erkennung von Menschen und Fahrzeugen. FTronics-Eigenmarke für höchste Qualität.', 'video'],
  ['Türsprechanlagen', 'Video-Türsprechanlagen mit Smartphone-Steuerung und Aufzeichnung. Immer wissen, wer vor der Tür steht.', 'tuersprech'],
  ['Zutrittskontrolle', 'Moderne Zutrittssysteme für Unternehmen und Privat. Fingerprint, RFID, PIN: flexibel und sicher.', 'zutritt'],
  ['Smart Home', 'KNX-Schnittstellen, Home Assistant Integration. Licht, Heizung, Sicherheit: alles intelligent vernetzt.', 'smarthome'],
  ['Brandschutz', 'Rauchmelder und Brandwarnanlagen nach DIN VDE Standards. Frühwarnung rettet Leben.', 'brand'],
]

const stats = [
  ['15+', 'Jahre Erfahrung', 'erfahrung'],
  ['Rhein-Neckar', 'Metropolregion', 'region'],
  ['Top 100', 'Deutschlands', 'top'],
  ['100 %', 'DSGVO-konform', 'dsgvo'],
]

const captions = [
  ['Sechs Bauteile. Jedes für sich.', 'Wir zerlegen die FC-8D Pro bis auf die Schraube: jedes Detail ist Industrie-Standard, nicht Smart-Home-Spielerei.'],
  ['Sony Starvis Sensor. 4K bei Tag und Nacht.', '1/2,8″ Back-Illuminated CMOS: gestochen scharfes 4K bei Tag, rauscharmes Bild bei minimaler Beleuchtung.'],
  ['Smart IR · 18 LEDs. 30 m Reichweite.', 'Intelligente Infrarot-Beleuchtung mit dynamischer Anpassung, ohne Überbelichtung im Nahbereich.'],
  ['Onboard-KI. Keine Cloud. Keine Latenz.', 'Personen- und Fahrzeug-Klassifikation direkt auf der Kamera. Keine Cloud-Anbindung, keine Daten-Lecks.'],
  ['IP67 Aluminium. Für draußen gemacht.', 'Korrosionsbeständiger Aluminium-Druckguss, wasser- und staubdicht, freigegeben für jede Witterung.'],
]

const layers = [
  {
    n: '01 / 05',
    src: '/schutz-01.webp',
    alt: 'Gewerbeobjekt ohne Sicherheitstechnik: offenes Tor, keine Kameras, kein Perimeterschutz',
    h: 'Ungeschützte Objekte sind verwundbar',
    p: 'Ob Industriegelände, Lagerhalle oder Wohnhaus: ohne professionelle Sicherheitstechnik ist jedes Objekt ein leichtes Ziel. Einbrüche dauern unter 60 Sekunden, Brände bleiben zu lange unentdeckt.',
    li: ['Keine Perimeterüberwachung', 'Risiko von Diebstahl, Vandalismus & Brand'],
  },
  {
    n: '02 / 05',
    src: '/schutz-02.webp',
    alt: 'Dasselbe Objekt mit Perimeterschutz: PTZ-Kameras auf Masten, Schranke und Zutrittskontrolle am Tor',
    h: 'Perimeterschutz: die erste Verteidigungslinie',
    p: 'Bei Industrieobjekten beginnt Sicherheit am Zaun: PTZ-Kameras überwachen das gesamte Gelände, Tore werden zutrittskontrolliert, Außenleuchten reagieren auf Bewegung. Auch beim Wohnhaus sichern wir Eingang, Garage und Garten.',
    li: ['FTronics PTZ-Kameras (FP-8T 20X / FP-8S 25X)', 'Zutrittskontrolle für Tor & Schranken', 'Kennzeichenerkennung & KI-Personenanalyse'],
  },
  {
    n: '03 / 05',
    src: '/schutz-03.webp',
    alt: 'Dasselbe Objekt, zusätzlich mit Bullet- und Dome-Kameras an Toren, Rampen und Eingang',
    h: 'Gebäudeüberwachung: wachsame Augen rund ums Haus',
    p: '4K-Bullet- und Dome-Kameras an allen kritischen Punkten: Hallen-Eingänge, Laderampen, Wege, Eingangstüren, Fenster. KI-gestützte Bewegungserkennung unterscheidet Mensch, Fahrzeug und Tier. Fehlalarme sind passé.',
    li: ['Bullet- & Dome-Kameras in 4K (NDAA-konform)', 'Nachtsicht bis 30 Meter', 'NVR-Aufzeichnung bis 64 Kanäle'],
  },
  {
    n: '04 / 05',
    src: '/schutz-04.webp',
    alt: 'Dasselbe Objekt, zusätzlich mit Außensirenen, Bewegungsmeldern und Tür- und Fensterkontakten',
    h: 'Alarmanlage & Sensorik: der unsichtbare Schutz',
    p: 'Tür- und Fensterkontakte, Bewegungsmelder, Glasbruchsensoren in Halle, Büro und Wohnbereich. Bei jedem unbefugten Zutritt wird in Millisekunden Alarm ausgelöst, drinnen wie draußen.',
    li: ['Funkbasierte Sensorik (Ajax-Technik)', 'Außen- und Innensirenen', 'Brandwarnanlage mit vernetzten Rauchmeldern'],
  },
  {
    n: '05 / 05',
    src: '/schutz-05.webp',
    alt: 'Die fertige Anlage, gesteuert per Smartphone-App mit Live-Bildern aller Kameras',
    h: 'App-Steuerung & Wartung: alles im Blick',
    p: 'Halle, Büro und Wohnhaus steuern Sie bequem per App. Push-Benachrichtigungen bei jedem Ereignis, jährliche Wartung durch unser Team direkt aus Mannheim. Keine anonyme Hotline, sondern feste Ansprechpartner vor Ort.',
    li: ['Ajax-App mit Push-Alarm in Echtzeit', 'Jährliche Wartung durch FT-Techniker', 'Verschlüsselte Datenübertragung'],
  },
]

const reviews = [
  ['Top Unternehmen, top Beratung, top Ausführung. Kompetente Einweisung und Erklärung der Anlage. Saubere und schnelle Installation. Ich kann FT Sicherheitstechnik vorbehaltlos empfehlen.', 'Ulvi Keskin'],
  ['Das installierte 24/7-Überwachungssystem hat sich als äußerst effektiv erwiesen. Dank dieser modernen Technik konnten bereits mehrere Vorfälle vollständig aufgeklärt werden. Höchstes Niveau an Sicherheit, gepaart mit Zuverlässigkeit.', 'Elite Media Werbeagentur'],
  ['Sehr gute und ausführliche Beratung. Wir haben ein komplettes Sicherheitssystem mit 16 Kameras und Alarmanlage gekauft. Das System funktioniert einwandfrei und wir fühlen uns wesentlich sicherer.', 'Sercan Polat'],
]

/* ---------------- page ---------------- */

export default function Startseite() {
  return (
    <>
      {/* 6.1 Hero */}
      <section className="hero">
        {/* Hidden behind the page colour until a pointer sweeps the hero. */}
        <HeroScene
          src="/szene-morgen.webp"
          srcMobile="/szene-morgen-mobil.webp"
          alt="Wohnhaus am Morgen: eine Person mit Hund auf der Einfahrt, erfasst von der Überwachungskamera"
        />
        <div className="ft-shell">
          <div data-rev-group className="ft-center">
            <p className="ft-eyebrow" data-rev>Vor-Ort-Service Mannheim · DSGVO-konform</p>
            <h1 data-rev style={{ maxWidth: '24ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Smarte Sicherheits&shy;technik nach Ihren Ansprüchen
            </h1>
            {/* .ft-lead already carries the size, leading, colour and measure;
                only the rhythm around it is the hero's own, and it lives in
                CSS so a short screen can close it up. */}
            <p data-rev className="ft-lead hero-lead">
              Seit über 15 Jahren schützen wir Privat- und Geschäftskunden in der Metropolregion
              Rhein-Neckar mit modernster Sicherheitstechnologie, von Alarmanlagen bis Smart Home.
            </p>
            <div data-rev className="hero-cta">
              <Button href="/kontakt">Jetzt Anfrage starten</Button>
              <Button variant="secondary" href="/loesungen-privat">Unsere Lösungen</Button>
            </div>
          </div>
          <div className="hero-media-wrap" data-rev>
            {/* Rings live in here so they centre on the camera automatically,
                whatever height is left over once the copy has taken its share. */}
            <HeroField />
            {/* No fixed ratio: the leftover height sizes the box and the cutout
                is contain-fitted inside it, so the whole hero clears the fold. */}
            <Media
              bare
              ratio={null}
              pad="0"
              className="hero-media"
              src="/fc-8d-pro-main.webp"
              alt="FTronics FC-8D Pro: 4K Dome-Kamera mit Sony IMX415 Sensor"
            />
            {/* The torch handle, shown only where there is no pointer to sweep
                with. Hidden from assistive tech: it reveals a photograph that
                carries no information the copy does not already give, and it
                has no keyboard equivalent to offer. */}
            <span className="hero-torch" aria-hidden="true">
              <i />
              <span className="hero-torch-hint">Halten &amp; ziehen</span>
            </span>
          </div>
        </div>
      </section>

      {/* 6.3 FC-8D Pro — scroll-scrubbed teardown; see components/teardown.jsx */}
      <Teardown
        captions={captions}
        ctaHref="/produkte/fc-8d-pro"
        ctaLabel="Details ansehen →"
        head={{
          eyebrow: 'Sicherheit im Detail',
          title: 'Eine Kamera. Genau hingesehen.',
          lead:
            'Vom Sichtglas bis zur Grundplatte: Scrollen Sie, um die FC-8D Pro Stück für Stück auseinanderzunehmen und zu sehen, warum jedes Bauteil Industrie-Standard ist.',
          mediaLabel: 'FTronics FC-8D Pro: Dome-Kamera im Detail',
        }}
      />

      {/* 6.4 Craft pledge */}
      <section className="ft-section ft-section--raised">
        <div className="ft-shell">
          {/* Wider than the default reading measure so the headline breaks
              over two lines rather than three, with the paragraphs wrapping
              to the same width instead of being capped at 680 by the base
              rule on <p>. */}
          <div className="ft-pledge" data-rev-group>
            <p className="ft-eyebrow" data-rev>Unser Bekenntnis</p>
            <h2 data-rev>Wir verlassen jeden Ort besser, als wir ihn vorgefunden haben.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1.2rem' }}>
              Eine Kamera anzubringen ist einfach. Sie so anzubringen, dass nichts dahinter liegen
              bleibt. Das ist Handwerk.
            </p>
            <p data-rev style={{ color: 'var(--fg-secondary)' }}>
              Kabel sauber im Kanal. Bohrlöcher verspachtelt. Werkzeug aufgeräumt. Boden gefegt. Wir
              kommen, weil ein Auftrag erteilt wurde. Wir gehen, weil die Arbeit fertig ist, und der
              Raum aussähe, als hätte er schon immer so ausgesehen, nur eben sicherer.
            </p>
            <p data-rev className="ft-pledge-close" style={{ color: 'var(--fg)' }}>
              Das ist nicht selbstverständlich. Für uns schon.
            </p>
          </div>

          <div data-rev className="pledge-figure">
            <Media
              ratio={null}
              fit="cover"
              className="pledge-media"
              src="/pledge-installation.webp"
              alt="Techniker der FT Sicherheitstechnik setzt eine Dome-Kamera in die Holzverkleidung des Dachüberstands ein, die Zuleitung liegt unsichtbar dahinter"
            />
          </div>

        </div>

        {/* The full set stays visible as a grid on larger screens. On phones it
            becomes a snap carousel: each card has room for its image and the
            next card peeks in to make the swipe affordance clear. */}
        <div
          data-rev
          className="ft-shell ft-pledge-grid"
          role="region"
          aria-label="Unsere Qualitätsversprechen"
        >
          {pledges.map(([t, d, img]) => (
            <div key={t}>
              <Card title={t} media={img} className="ft-card--tall">{d}</Card>
            </div>
          ))}
        </div>
      </section>

      {/* 6.5 Hand-Made in Mannheim — the statement runs full width as its own
          band: one photograph across the section with the technician held to
          the left and the copy set into the empty half beside him. */}
      {/* data-nav-dark: the bar inverts itself while this section is under it. */}
      <section className="ft-band ft-band--dark" data-nav-dark>
        <img
          className="ft-band-img"
          src="/hand-made-mannheim.webp"
          alt="Techniker der FT Sicherheitstechnik konfektioniert ein Netzwerkkabel am Verteilerschrank"
        />
        <div className="ft-shell ft-band-inner">
          <div className="ft-band-copy" data-rev-group lang="de">
            <p className="ft-eyebrow" data-rev>Hand-Made in Mannheim</p>
            <h2 data-rev>Echte Techniker. Echte Arbeit. Vor Ort.</h2>
            <p className="ft-lead" data-rev>
              Kein Call-Center, kein Sub-Sub-Unternehmer. Unser eigenes Experten-Team plant,
              installiert und wartet jede Anlage persönlich.
            </p>
            {/* The three promises live in the band beside the technician rather
                than in a section of their own: they are what the photograph is
                evidence of, so they belong on the same ground as it. */}
            <div className="ft-band-list">
              {handMade.map(([t, d, mark]) => (
                <div data-rev key={t}>
                  <Card variant="flat" icon={marks[mark]} title={t}>{d}</Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.6 Leistungen — the light band, mirrored against the dark one above:
          copy on the left, the technician held to the right. No data-nav-dark
          here; the bar keeps its ink set over a light ground. */}
      <section className="ft-band ft-band--light ft-band--flip">
        <img
          className="ft-band-img"
          src="/loesungen-band.webp"
          alt="Techniker der FT Sicherheitstechnik montiert eine FTronics Dome-Kamera an einer hellen Wand"
        />
        <div className="ft-shell ft-band-inner">
          <div className="ft-band-copy" data-rev-group lang="de">
            <p className="ft-eyebrow" data-rev>Unsere Leistungen</p>
            <h2 data-rev>Ganzheitliche Sicherheits&shy;lösungen</h2>
            <p className="ft-lead" data-rev>
              Von der Beratung bis zur Installation: wir bieten Ihnen maßgeschneiderte
              Sicherheitskonzepte für jeden Bedarf.
            </p>
            <div className="ft-band-list ft-band-list--split">
              {services.map(([t, d, mark]) => (
                <div data-rev key={t}>
                  <Card variant="flat" icon={marks[mark]} title={t}>{d}</Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6.7 Auszeichnungen — the awards and the figures that back them, in one
          section. They were two: "Top 100 Deutschlands" was the substance of
          the Plus X award in one and a standalone number in the other, so the
          page made the same claim twice, a screen apart. Together the numbers
          read as the evidence under the awards rather than as a second boast. */}
      <section className="ft-section ft-ringfield-host">
        <RingField />
        <div className="ft-shell">
          <SectionHead
            className="ft-center"
            eyebrow="Ausgezeichnet"
            title="Unsere Auszeichnungen"
            lead="Qualität, die anerkannt wird, von unabhängigen Instituten bestätigt."
          />
          <div data-rev-group className="ft-grid ft-grid--auto" style={{ marginTop: '3rem' }}>
            {/* The seals carry the same words as the copy beside them, so they
                are decorative here — an alt would just say it all twice. */}
            <div data-rev>
              <div className="ft-card ft-award">
                <span className="ft-award-sealbox">
                  {/* alt="": the h4 right below already states this exact award
                      name — a descriptive alt would have a screen reader read
                      it twice in a row rather than filling a real gap. */}
                  <img className="ft-award-seal" src="/plus-x-award-2026.webp" alt="" />
                </span>
                <div className="ft-card-body">
                  <h4>Plus X Award 2026</h4>
                  <div className="ft-card-copy">
                    Ausgezeichnet als eine der Top 100 Sicherheitstechnikfirmen Deutschlands.
                  </div>
                </div>
              </div>
            </div>
            <div data-rev>
              <div className="ft-card ft-award">
                <span className="ft-award-sealbox">
                  {/* alt="": the h4 right below already states this exact award
                      name — a descriptive alt would have a screen reader read
                      it twice in a row rather than filling a real gap. */}
                  <img className="ft-award-seal" src="/dipmb-kundenzufriedenheit-2024.webp" alt="" />
                </span>
                <div className="ft-card-body">
                  <h4>Hohe Kundenzufriedenheit 2024</h4>
                  <div className="ft-card-copy">
                    Vom Deutschen Institut für Produkt und Marktbewertung ausgezeichnet.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div data-rev-group className="ft-grid ft-grid--auto-xs ft-stat-grid" style={{ marginTop: '1.25rem' }}>
            {stats.map(([n, l, mark]) => (
              <div data-rev key={l}>
                <Card variant="stat" className="ft-card--stat-compact" icon={marks[mark]} title={n}>
                  {l}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6.8 Five-layer pinned narrative */}
      {/* 6.8a The header, in a section of its own above the renders — not over
          them. Its ground is the renders' own sky, sampled from their top edge:
          #e2e1e6 on all five, within two or three levels. Matching it means the
          section hands over to the pinned frames with no visible seam. */}
      <section className="ft-section ft-pin-head-section">
        <div className="ft-shell">
          <SectionHead
            eyebrow="So sichern wir Ihr Objekt"
            title="Sicherheit, wie sie kein anderer bietet, Schritt für Schritt erklärt"
            lead="Vom Industriegelände bis zum Eigenheim: Scrollen Sie durch und sehen Sie, wie wir Ihr Objekt in eine moderne Sicherheitsfestung verwandeln. Fünf Schutzschichten, perfekt aufeinander abgestimmt."
          />
        </div>
      </section>

      {/* 6.8b Five-layer pinned narrative */}
      <section className="ft-section--raised ft-pin-section">
        <PinStack panels={layers}>

          {layers.map((l, i) => (
            <div
              className="pin-panel"
              data-panel={i}
              key={l.n}
            >
              {/* The render is the panel's ground and the step's words sit along
                  its foot, so each scroll beat changes the whole frame rather
                  than swapping a picture beside a column of text. */}
              <img
                className="pin-panel-img"
                data-panel-img
                src={l.src}
                alt={l.alt}
                style={{ opacity: i === 0 ? 1 : 0 }}
              />
              <div className="pin-panel-copy" data-panel-copy>
                <p className="ft-num">{l.n}</p>
                <h3>{l.h}</h3>
                <p>{l.p}</p>
                <ul className="ft-list">
                  {l.li.map((x) => <li key={x}>{x}</li>)}
                </ul>
              </div>
            </div>
          ))}
        </PinStack>
      </section>

      {/* 6.8c The ask the five layers lead to, on a ground of its own rather
          than trailing off on the renders' sky. Its own section, not a block
          inside the one above: the ink has to run edge to edge, and .ft-shell
          is max-width capped — painting that would have made a centred slab
          with light gutters either side.
          data-nav-dark: the bar inverts itself while this section is under it. */}
      <section className="ft-cta-dark" data-nav-dark>
        <div className="ft-shell">
          {/* h2, not h3: it was a sub-block hanging off the foot of the pin
              section, and is now a section in its own right — the same level
              SectionHead gives every other section on the page. The measure
              moves onto the heading itself rather than the group, the way the
              hero and the closing CTA do it: at --t-h2 a 680px group would
              break this into nine-character lines. */}
          <div data-rev-group className="ft-center">
            <p className="ft-eyebrow" data-rev>FT Service</p>
            <h2 data-rev style={{ maxWidth: '17ch', marginLeft: 'auto', marginRight: 'auto' }}>
              Bereit, Ihr Objekt genauso zu sichern?
            </h2>
            {/* No inline colour here any more: --fg-secondary is a slate meant
                for paper and lands at 3.3:1 on this ground. The section sets it. */}
            <p data-rev style={{ maxWidth: 620, margin: '0 auto' }}>
              Ob Industriegelände, Lagerhalle, Bürogebäude oder Eigenheim: wir beraten Sie persönlich
              vor Ort und entwickeln ein Sicherheitskonzept, das exakt zu Ihrem Objekt passt.
              Kostenlos und unverbindlich.
            </p>
            <div data-rev style={{ marginTop: '1.5rem' }}>
              <Button href="/kontakt">Kostenlose Beratung anfragen</Button>
            </div>
          </div>
        </div>
      </section>

      {/* 6.9 FTronics gallery */}
      <section style={{ padding: 'clamp(5rem,7vw,9rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="FTronics Eigenmarke"
            title="Professionelle Über&shy;wachungstechnik"
            lead="Unsere FTronics-Kameras vereinen deutsche Qualitätsansprüche mit modernster KI-Technologie."
          />
        </div>
        {/* Out of the shell, like the pledges rail above and for the same
            reason: inside the 1260px column the third card is sliced by the
            column's own edge on every monitor however wide, which reads as a
            clipping bug rather than as a rail that carries on. Bled to the
            full width, a wider display simply shows more of it and the cut
            lands at the edge of the screen, where it belongs. */}
        <div data-rev className="ft-rail-bleed" style={{ marginTop: '2.5rem' }}>
          {/* The way through to the catalogue used to be a card at the end of
              the rail, which put it behind ten drags. Beside the arrows it is
              on screen from the start, and the rail is left as ten products
              rather than nine products and an advert. */}
          <ScrollGallery
            label="FTronics Produkte"
            actions={<Button variant="secondary" size="sm" href="/produkte">{cta.products}</Button>}
          >
              {/* Ten of the eighteen, one per body style so the rail reads as a
                  range rather than as a shelf of domes: dome, motor-zoom dome,
                  mini-PTZ, two bullets, turret, panorama, PTZ, recorder,
                  speaker. Every one has a detail page and a render of its own —
                  the card is the link, and the spec marks are derived from the
                  spec text by markFor, so the copy stays the single source and
                  no card carries a hand-picked icon key that can drift from it. */}
              {[
                {
                  kind: 'Dome IP-Kamera', name: 'FC-8D Pro', href: '/produkte/fc-8d-pro',
                  img: '/fc-8d-pro-main.webp',
                  desc: 'Kompakte Dome-Kamera mit 4K Auflösung und intelligenter Personenerkennung.',
                  specs: ['4K 8MP', 'IP67', 'KI-Analyse', 'PoE', 'Sony IMX415'],
                },
                {
                  kind: 'Dome IP-Kamera', name: 'FC-8D Zoom', href: '/produkte/fc-8d-zoom',
                  img: '/fc-8d-zoom-main.webp',
                  desc: 'Premium Dome mit motorisiertem 2.8-8mm Zoom, Gesichtserkennung und vollständiger VCA KI-Suite.',
                  specs: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'Motorzoom'],
                },
                {
                  kind: 'Mini-PTZ Dome', name: 'FC-6Z Mini', href: '/produkte/fc-6z-mini',
                  img: '/fc-6z-mini-main.webp',
                  desc: 'Kompakte vandalismusgeschützte Mini-PTZ mit 3x Zoom und vollständiger KI-Suite inkl. Gesichtserkennung.',
                  specs: ['6MP', 'IP67', '3x Zoom', '100dB WDR'],
                },
                {
                  kind: 'Bullet IP-Kamera', name: 'FB-8A Pro', href: '/produkte/fb-8a-pro',
                  img: '/fb-8a-pro-main.webp',
                  desc: 'Premium Bullet-Kamera mit vollständiger KI-Suite inkl. Gesichtserkennung.',
                  specs: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'PoE'],
                },
                {
                  kind: 'Bullet IP-Kamera', name: 'FB-8A Max', href: '/produkte/fb-8a-max',
                  img: '/fb-8a-max-main.webp',
                  desc: 'Premium Bullet mit aktiver Abschreckung (Rot/Blau LEDs), Gesichtserkennung und Dual-Light.',
                  specs: ['4K 8MP', 'IP67', 'Dual-Light', '100dB WDR'],
                },
                {
                  kind: 'Turret IP-Kamera', name: 'FT-8C Pro', href: '/produkte/ft-8c-pro',
                  img: '/ft-8c-pro-main.webp',
                  desc: 'Turret-Kamera mit 24/7 Farbbildgebung, F1.0 Blende und Gesichtserkennung für beste Nachtsicht.',
                  specs: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'F1.0'],
                },
                {
                  kind: '180° Panorama Turret', name: 'FT-8P Dual', href: '/produkte/ft-8p-dual',
                  img: '/ft-8p-dual-main.webp',
                  desc: 'Dual-Objektiv Panoramakamera mit 180° Weitwinkel, aktiver Abschreckung und Zweiwege-Audio.',
                  specs: ['8MP 180°', 'IP67', 'Dual-Light', '2-Wege Audio'],
                },
                {
                  kind: 'PTZ Speed Dome', name: 'FP-8T 20X', href: '/produkte/fp-8t-20x',
                  img: '/fp-8t-20x-main.webp',
                  desc: 'Professionelle PTZ mit 20x Zoom, Auto-Tracking und Dual-Light für große Flächen.',
                  specs: ['4K 8MP', 'IP67', 'Auto-Tracking', 'IR 100m'],
                },
                {
                  kind: '16-Kanal 4K NVR', name: 'FN-16', href: '/produkte/fn-16',
                  img: '/fn-16-main.webp',
                  desc: 'Leistungsstarker 16-Kanal NVR mit 2x SATA für bis zu 16TB und ANR Technologie.',
                  specs: ['4K', '16 Kanäle', '2x SATA 16TB', 'ANR'],
                },
                {
                  kind: 'IP-Lautsprecher', name: 'FS-30', href: '/produkte/fs-30',
                  img: '/fs-30-main.webp',
                  desc: '30W IP-Hornlautsprecher mit 130 dBSPL für Alarm-Durchsagen und NVR-Kopplung.',
                  specs: ['30W', 'IP66', '130 dBSPL', 'PoE'],
                },
              ].map((p) => (
                /* The card is the link. A single "Details ansehen" at the foot
                   asked people to find a 13px target inside a 420px card that
                   was already behaving like one. */
                <a key={p.name} href={p.href} className="ft-pcard">
                  {/* alt="": the render says what the three lines beside it
                      already say, and this card is one link — a describing alt
                      would read the product out twice before the name. Same
                      call as the award seals further up.
                      No tint: the cutout sits on the card's own white, so the
                      card stays one plane. The camera's own white base carries
                      enough shading to hold its edge without a panel behind
                      it, and the dark dome anchors the top. */}
                  <Media
                    src={p.img}
                    alt=""
                    ratio="1 / 1"
                    rounded="var(--r-lg)"
                    pad="10%"
                  />
                  <div className="ft-pcard-body">
                    <p className="ft-pcard-kind">{p.kind}</p>
                    <h4>{p.name}</h4>
                    <p className="ft-pcard-desc">{p.desc}</p>
                    {/* aria-hidden on the mark: it repeats the word beside it,
                        and a screen reader should hear "IP67" once. */}
                    <ul className="ft-pcard-specs">
                      {p.specs.map((t) => (
                        <li className="ft-pcard-spec" key={t}>{markFor(t)}{t}</li>
                      ))}
                    </ul>
                  </div>
                </a>
              ))}
          </ScrollGallery>
        </div>
      </section>

      {/* 6.11 Kundenbewertungen */}
      {/* Heading, controls and the Google link hold a column on the left while
          the cards run past the right edge of the screen. No .ft-shell here:
          the rail has to reach beyond the container, so the left inset is
          applied to the grid itself and the right side is left open. */}
      {/* Page ground, not --raised: it sits on the same grey as the product
          rail above it, so the two read as one run rather than as a white
          panel dropped between them. The hairlines go with it — --raised was
          drawing them to fence off a ground that is no longer there. */}
      <section className="ft-section">
        <div className="ft-splitrail">
          <SectionHead
            eyebrow={
              <>
                <GoogleMark />
                <span className="ft-rating-score">{site.rating.value.replace('.', ',')}</span>
                {/* aria-hidden: the score and the source beside it already say
                    it in words, and five repeated glyphs read as "black star,
                    black star…" out loud. */}
                <span className="ft-rating-stars" aria-hidden="true">★★★★★</span>
                <span className="ft-vh">von 5 Sternen</span>
                <span className="ft-rating-src">auf Google</span>
              </>
            }
            title="In der Region weiterempfohlen"
            lead={`${site.rating.count} Bewertungen aus Mannheim und der Metropolregion Rhein-Neckar. 100% unserer Kunden empfehlen uns weiter.`}
          />
          <ScrollGallery label="Kundenbewertungen">
            {reviews.map(([quote, name]) => (
              <div
                key={name}
                style={{
                  background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: 'var(--r-lg)', padding: '2rem',
                  display: 'flex', flexDirection: 'column', gap: 12,
                }}
              >
                {/* Same amber as the rating eyebrow above, and hidden from
                    the reader for the same reason: the card is already a
                    review, and five glyphs read as "black star" five times. */}
                <span className="ft-rating-stars" aria-hidden="true">★★★★★</span>
                <span className="ft-vh">5 von 5 Sternen</span>
                <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)', lineHeight: 1.6 }}>
                  {quote}
                </p>
                {/* Pushed to the foot so the names line up across cards of
                    unequal quote length, the way the reference sets them. */}
                <span style={{ marginTop: 'auto', paddingTop: 8, fontWeight: 600, fontSize: 'var(--t-body-sm)' }}>{name}</span>
              </div>
            ))}
          </ScrollGallery>
        </div>
      </section>

      {/* 6.12 Closing CTA. The words hold the left, the enquiry holds the
          right, and the kit runs full width beneath both, so the page ends on
          the product rather than on a button.

          The form asks for what /kontakt's does. Its field and option lists
          are declared again in CtaAnfrageForm rather than shared, which is a
          second copy of the same list — worth lifting into one module if a
          third surface ever asks for it. */}
      <section className="ft-section ft-cta-close">
        <div className="ft-shell ft-cta-split">
          <div className="ft-cta-copy" data-rev-group>
            <h2 data-rev>Jetzt kostenlose Beratung anfragen</h2>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)',
                margin: '1rem 0 2rem',
              }}
            >
              Wir erstellen Ihnen ein unverbindliches Angebot, individuell auf Ihre Bedürfnisse zugeschnitten.
            </p>
            {/* Secondary now that the form beside it carries a primary of its
                own: two red buttons in one section put the eye in two places
                and neither of them is the one that finishes the job here. */}
            <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button variant="secondary" href="/kontakt">Kontakt aufnehmen</Button>
              <WhatsAppButton />
              <a href={site.phoneHref} style={{ color: 'var(--fg)', fontWeight: 500, textDecoration: 'none', padding: '.85rem 1rem' }}>
                {site.phone}
              </a>
            </div>
          </div>
          <div data-rev>
            <CtaAnfrageForm />
          </div>
        </div>
        {/* Outside the shell: the row is full-bleed and .ft-shell is max-width
            capped, so inside it the picture would stop short of both edges and
            read as a framed photograph rather than as the bench the page ends
            on. width/height are the asset's own, so the space is reserved
            before it loads and the copy above does not jump. */}
        <div data-rev className="ft-cta-flatlay">
          {/* alt="": the heading and lead above already say what this is, and a
              describing alt would read the whole range out between the call to
              action and the phone number. */}
          <img
            src="/cta-flatlay.webp"
            alt=""
            width={2400}
            height={896}
            loading="lazy"
            decoding="async"
          />
        </div>
      </section>
    </>
  )
}
