import { Button } from '@/components/ui'
import { Plan } from '@/components/plan'
import { TrustMarks } from '@/components/trust-marks'
import { cta, jsonLd, breadcrumbJsonLd, servicesJsonLd } from '@/lib/site'

export const metadata = {
  /* `absolute` because the root layout's title template would otherwise
     append a second " | FT Sicherheitstechnik" to the verified title. */
  title: { absolute: 'Alarmanlagen für Zuhause in Mannheim' },
  description:
    'Professionelle Sicherheitslösungen für Ihr Zuhause in Mannheim & Rhein-Neckar: Alarmanlagen, Videoüberwachung, Smart Home & Brandwarnanlagen. Kostenlose Beratung!',
  alternates: { canonical: '/loesungen-privat' },
}

/* ---------------- section data ---------------- */


/* Five alternating media rows. `flip` mirrors the artboard's .sol-grid.flip —
   the copy column moves to the right on wide viewports but stays first in the
   DOM, so the reading order is identical on mobile. */
const solutions = [
  {
    n: '01',
    h: 'Alarmanlagen',
    /* Where this system sits on the plan, as a percentage of the render.
       The corner motion detector on the living-room wall — the keypad beside
       the stairs is the panel, but the detector is what the system does. */
    at: [78.1, 51.5], flipPop: true,
    li: [
      'Hybride Ajax-Systeme (Funk + Draht)',
      'App-Steuerung & Push-Benachrichtigungen',
      'Sofortige Push-Alarmierung auf Ihr Handy',
      'Fenster-/Tür-/Bewegungsmelder',
      'Versicherungsrabatte möglich',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Ajax Alarmanlage: Installationsfoto',
  },
  {
    n: '02',
    at: [78, 38.5], flipPop: true, popBelow: true,
    h: 'Videoüberwachung',
    flip: true,
    li: [
      '4K Kameras mit Nachtsicht',
      'KI-basierte Personen- & Fahrzeugerkennung',
      'Fernzugriff per Smartphone',
      'DSGVO-konforme Aufzeichnung',
      'FTronics-Eigenmarke: beste Qualität',
    ],
    label: cta.products,
    href: '/produkte',
    img: 'FTronics Kamera am Eigenheim',
  },
  {
    n: '03',
    at: [62.6, 46.9],
    h: 'Smart Home',
    li: [
      'KNX & Home Assistant Integration',
      'Licht, Heizung, Rollläden automatisieren',
      'Sprachsteuerung (Alexa, Google)',
      'Energieverbrauch optimieren',
      'Alles in einer App',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Smart Home Steuerung: App',
  },
  {
    n: '04',
    at: [30.6, 65.5],
    h: 'Türsprechanlagen',
    flip: true,
    li: [
      'Video-Türsprechanlage mit HD-Kamera',
      'Smartphone-Anbindung',
      'Gegensprechfunktion von überall',
      'Automatische Aufzeichnung',
      'Türöffner-Integration',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Video-Türsprechanlage',
  },
  {
    n: '05',
    at: [45, 22.4], popBelow: true,
    h: 'Brandschutz',
    li: [
      'Rauchmelder nach DIN VDE',
      'Vernetzte Brandwarnsysteme',
      'Automatische Alarmierung',
      'Regelmäßige Wartung & Prüfung',
      'Gesetzliche Pflicht einfach erfüllt',
    ],
    label: cta.advice,
    href: '/kontakt',
    img: 'Vernetzter Rauchmelder',
  },
]

/* Service schema for the five disciplines, derived from the same list copy
   rather than written twice — the first bullet of each block is a real,
   specific sentence about what the service covers, so it doubles as the
   Service description. */
const services = servicesJsonLd(
  solutions.map((s) => ({ name: s.h, description: s.li[0], href: s.href }))
)

/* Page-scoped CSS: the alternating media/copy row. Lives here rather than in
   globals.css because this page is the only one that uses it (the Gewerbe
   sibling lays its disciplines out as Cards) — and the min-width flip cannot
   be expressed as an inline style. Copied verbatim from the artboard's own
   <style> block. */
const css = `
/* The page's ground is the render's own studio grey, sampled off the plate
   itself — #e9e9e9 across its field. Matching it is what actually removes the
   seam: there is no edge left to hide once the page is the colour the plate is
   standing on. Both sections carry it, so the opener and the close are one
   surface rather than two greys meeting. */
.ft-privat-ground{background:#e9e9e9}

/* On a wide screen the house stops being a block under the copy and becomes
   the section's own right-hand ground: pinned to the section (the shell is
   unpositioned, so an absolute child resolves against .ft-screen-head) and run
   out past the container to the screen edge. It keeps no z-index of its own:
   the picture's leading edge is masked to nothing where the copy sits, and the
   figure passes the pointer through to everything but its own rings. Stacked
   below 960, copy first — the house is the proof, and proof follows the
   claim. */
@media(min-width:961px){
  .ft-plan{
    position:absolute;inset:0 0 0 auto;
    width:min(62%,1040px);margin:0;
    display:flex;align-items:center;pointer-events:none;
    /* the frame, not the figure, is what the marks measure against */
  }
  /* No card edge out here: it is the ground, not a figure on it. */
  /* Only the leading edge needs help now: the ground matches, but the plate
     carries its own soft floor shadow, which stops dead where the file does.
     A short fade over the empty strip in front of the house — 14%, which is
     just short of its left wall — and there is nothing left to see. */
  .ft-plan-img{
    border-radius:0;
    -webkit-mask-image:linear-gradient(to right,rgba(0,0,0,0) 0,#000 14%);
    mask-image:linear-gradient(to right,rgba(0,0,0,0) 0,#000 14%);
  }
  /* The words keep the left, at a measure rather than a margin. */
  .ft-hero-copy{max-width:min(46%,540px)}
}

`

/* ---------------- page ---------------- */

export default function LoesungenPrivat() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Privatkunden', href: '/loesungen-privat' },
          ])
        )}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(services)} />
      <style href="loesungen-privat" precedence="default">{css}</style>

      {/* 8.1 Hero — the page's own screen. Centred, and held to one viewport
          less the bar above it, so the opener is the whole first impression
          rather than a paragraph with the next section already under it. */}
      <section className="ft-screen-head ft-privat-ground">
        <div className="ft-shell">
          <div className="ft-hero-copy" data-rev-group>
            <p className="ft-eyebrow" data-rev>Privatkunden</p>
            <h1 data-rev style={{ maxWidth: '16ch' }}>Sicherheit für Ihr Zuhause</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)',
                maxWidth: 680, margin: '1rem 0 1.5rem',
              }}
            >
              Schützen Sie Ihre Familie und Ihr Eigentum mit modernster Technik, professionell
              installiert, einfach zu bedienen.
            </p>
            {/* data-rev on the row itself rather than on a wrapper: a plain
                block wrapper around a flex row is not what the layout centres. */}
            <TrustMarks data-rev />
            <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <Button href="/kontakt">{cta.start}</Button>
            </div>
          </div>
          {/* One house, cut open, with the five systems marked where their
              hardware actually sits. The marks are annotations on a picture the
              alt text already describes; each card carries the system itself. */}
          <Plan
            systems={solutions}
            src="/loesungen-privat-haus.webp"
            alt="Isometrischer Schnitt durch ein Einfamilienhaus: Bewegungsmelder und Alarmzentrale, Außenkamera unter dem Dachüberstand, Smart-Home-Panel, Türsprechstelle an der Haustür und Rauchmelder an den Decken."
          />
        </div>
      </section>

      {/* 8.3 Closing CTA */}
      <section className="ft-section ft-privat-ground">
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
              <h3 style={{ marginBottom: '.4em' }}>Kostenlose Vor-Ort Beratung</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir kommen zu Ihnen und analysieren Ihre Situation, unverbindlich und kostenfrei.
              </p>
            </div>
            <Button href="/kontakt">{cta.appointment}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
