import Link from 'next/link'
import { Button, SectionHead } from '@/components/ui'
import { TrustMarks } from '@/components/trust-marks'
import { Plan } from '@/components/plan'
import { breadcrumbJsonLd, cta, jsonLd } from '@/lib/site'

export const metadata = {
  /* `absolute` because the root layout's title template would otherwise
     append a second " | FT Sicherheitstechnik" to the verified title. */
  title: { absolute: 'Sicherheitstechnik für Gewerbe & Industrie | FT Sicherheitstechnik Mannheim' },
  description:
    'Gewerbliche Sicherheitslösungen in Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Zeiterfassung. DSGVO-konform, persönliche Beratung vor Ort. Jetzt anfragen!',
  alternates: { canonical: '/loesungen-gewerbe' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Startseite', href: '/' },
  { name: 'Gewerbekunden', href: '/loesungen-gewerbe' },
])

/* ---------------- section data ---------------- */

/** The six commercial disciplines. They live on the plan now: each is a mark
    on the building, and its card carries the list and the link. */
const loesungen = [
  {
    title: 'Alarmanlagen',
    items: [
      'Hybride Ajax-Systeme für Gewerbeobjekte',
      'Push-Alarmierung auf Smartphones aller Mitarbeiter',
      'Mehrzonen-Absicherung',
      'Fernzugriff & Benachrichtigungen',
      'Integration mit bestehender Infrastruktur',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Videoüberwachung',
    items: [
      '4K-Kameras mit KI-Videoanalyse',
      'Personen-/Fahrzeugerkennung',
      'Zentrale Verwaltung mehrerer Standorte',
      'DSGVO-konforme Speicherung',
      'Skalierbar von 4 bis 128+ Kameras',
    ],
    link: { label: 'Produkte ansehen →', href: '/produkte' },
  },
  {
    title: 'Zutrittskontrolle',
    items: [
      'Fingerprint, RFID, PIN, App-basiert',
      'Zeit- und zonenbasierte Berechtigungen',
      'Protokollierung aller Zutritte',
      'Besucher-Management',
      'Integration mit Zeiterfassung',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Zeiterfassung',
    items: [
      'Digitale Arbeitszeiterfassung',
      'Gesetzeskonform nach EuGH-Urteil',
      'Terminal- oder App-basiert',
      'Export für Lohnbuchhaltung',
      'Kombination mit Zutrittskontrolle',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'Brandschutz',
    items: [
      'Brandwarnanlagen nach DIN VDE',
      'Aufschaltung auf Feuerwehr',
      'Regelmäßige Wartung & Prüfung',
      'Fluchtwegsicherung',
      'Dokumentation für Versicherung',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
  {
    title: 'NSL-Anbindung',
    items: [
      'Vermittlung an Notruf-/Serviceleitstellen (NSL)',
      'Technische Anbindung Ihrer Anlage',
      'Optional: Video-Fernüberwachung',
      'Reduzierung von Fehlalarmen',
      'Wartung der Übertragungstechnik durch FT',
    ],
    link: { label: 'Angebot anfragen →', href: '/kontakt' },
  },
]

/* The six disciplines again, as marks on the plan: where on the render each
   one's hardware actually sits, as a percentage of the picture. flipPop opens a
   card inward for a mark near the right edge. Positions were read off the plate
   itself, device by device. */
const planMarks = {
  'Alarmanlagen': { at: [45.3, 65.7] },
  'Videoüberwachung': { at: [88.6, 39.8], flipPop: true },
  'Zutrittskontrolle': { at: [45.7, 76.3] },
  'Zeiterfassung': { at: [38.9, 71.5] },
  'Brandschutz': { at: [58.6, 41.7] },
  'NSL-Anbindung': { at: [76.6, 35], flipPop: true },
}

/* The plan takes the shape the Privatkunden page uses, so the six cards are
   built from the discipline data rather than written out twice. */
const planSystems = loesungen.map((l) => ({
  h: l.title,
  li: l.items,
  label: l.link.label.replace(' \u2192', ''),
  href: l.link.href,
  ...planMarks[l.title],
}))

/* Each advantage is a picture with its claim under it. The renders are the
   site's own isometric language — white matte objects on a light ground — so
   they sit with the plan above rather than reading as stock icons. Decorative
   by definition: the heading beneath each one says what it shows. */
const vorteile = [
  {
    img: '/vorteil-compliance.webp',
    h: 'Compliance',
    p: 'Alle Systeme DSGVO-konform geplant und dokumentiert, wichtig für Versicherungsanforderungen.',
  },
  {
    img: '/vorteil-versicherung.webp',
    h: 'Versicherungsvorteile',
    p: 'Bis zu 30% Ersparnis bei der Versicherungsprämie durch zertifizierte Sicherheitstechnik.',
  },
  {
    img: '/vorteil-fernzugriff.webp',
    h: 'Fernzugriff',
    p: 'Alle Standorte jederzeit im Blick: per App, Browser oder Leitstelle.',
  },
  {
    img: '/vorteil-skalierbarkeit.webp',
    h: 'Skalierbarkeit',
    p: 'Von einem Büro bis zum Multi-Standort-Unternehmen: unsere Systeme wachsen mit.',
  },
]

/* Page-scoped CSS. The opener's ground is the render's own studio grey,
   sampled off the plate itself (#b8b8b8 across its field), so the picture has
   no edge to show. That grey is dark enough to cost two things their contrast:
   the lead at --fg-secondary measures 2.95:1 on it, under AA, and the eyebrow
   chip's 3.5%-ink fill has nothing to sit against. The lead drops to
   --ft-ink-grad-end (5.2:1 here) and the chip goes near-solid white. */
const css = `
.ft-gewerbe-ground{background:#b8b8b8}
.ft-gewerbe-ground .ft-hero-lead{color:var(--ft-ink-grad-end)}
.ft-gewerbe-ground .ft-eyebrow{background:rgba(255,255,255,.74);color:var(--ft-ink-text)}
.ft-gewerbe-ground .ft-spec,
.ft-gewerbe-ground .ft-spec svg,
.ft-gewerbe-ground .ft-quiet-link{color:var(--ft-ink-grad-end)}
.ft-gewerbe-ground .ft-quiet-link:hover{color:var(--ft-ink-text)}
/* The ground matches the plate, but the plate carries its own soft floor
   shadow and that stops dead where the file does — a faint edge all the way
   round it. Faded out on every side, over the empty margin the building never
   reaches, so there is nothing left to see. Two gradients intersected: one
   pair of edges each. */
.ft-gewerbe-ground .ft-plan-img{
  -webkit-mask-image:
    linear-gradient(to right,rgba(0,0,0,0) 0,#000 7%,#000 93%,rgba(0,0,0,0) 100%),
    linear-gradient(to bottom,rgba(0,0,0,0) 0,#000 6%,#000 94%,rgba(0,0,0,0) 100%);
  mask-image:
    linear-gradient(to right,rgba(0,0,0,0) 0,#000 7%,#000 93%,rgba(0,0,0,0) 100%),
    linear-gradient(to bottom,rgba(0,0,0,0) 0,#000 6%,#000 94%,rgba(0,0,0,0) 100%);
  -webkit-mask-composite:source-in;
  mask-composite:intersect;
}
/* The source render reserves a large blank margin on its left, so although the
   plan is structurally below the hero copy, the building looks as if it has
   been laid out beside it. Crop that unused side inside the figure and shift
   the frame left; its markers remain attached because they are positioned
   relative to the same frame. */
.ft-gewerbe-ground .ft-plan{overflow:hidden}
.ft-gewerbe-ground .ft-plan-frame{margin-left:-16%}

/* Ihre Vorteile: a row of tall panels, each holding its claim, with the
   sentence that qualifies it set underneath as a caption. The panel is the
   page's own paper-96 on the raised white ground, so it reads as a plane
   rather than as a bordered card — there is nothing to fence off. */
.ft-vorteile{
  display:grid;grid-template-columns:repeat(auto-fit,minmax(min(210px,100%),1fr));
  gap:clamp(1rem,2vw,1.5rem);margin-top:clamp(2.5rem,5vw,3.5rem);
}
.ft-vorteil{margin:0;display:flex;flex-direction:column;gap:var(--sp-4)}
.ft-vorteil-tile{
  background:var(--ft-paper-96);border-radius:var(--r-xl);
  aspect-ratio:3 / 4;overflow:hidden;
}
.ft-vorteil-tile img{display:block;width:100%;height:100%;object-fit:cover}
.ft-vorteil-cap{margin:0;display:grid;gap:4px}
.ft-vorteil-h{margin:0;font:600 var(--t-h4)/1.2 var(--font-display);letter-spacing:-0.004em;color:var(--fg)}
.ft-vorteil-p{margin:0;font-size:var(--t-body-sm);line-height:1.6;color:var(--fg-secondary)}
/* A rail on a phone: four tall pictures stacked two-up is most of a screen
   each, and they are a set to look through rather than a list to read down.
   Bled to the screen edges so the next one peeks past the gutter. */
@media(max-width:760px){
  .ft-vorteile{
    display:flex;grid-template-columns:none;
    overflow-x:auto;overflow-y:hidden;
    scroll-snap-type:x mandatory;scrollbar-width:none;
    margin-inline:calc(var(--gutter) * -1);
    padding-inline:var(--gutter);
    scroll-padding-inline:var(--gutter);
    gap:var(--sp-4);
  }
  .ft-vorteile::-webkit-scrollbar{display:none}
  .ft-vorteil{flex:0 0 72%;scroll-snap-align:start}
  /* Inside a rail the cards fade in place — a reveal's vertical offset is
     scrollable overflow the rail would otherwise have to hide. */
  .ft-vorteile [data-rev]{transform:none}
}

/* Less overhang than the shared rule gives: this plan's rightmost mark is the
   facade camera at 88.6%, further out than anything on the house, and at the
   full 122% its ring is cut by the screen edge on a 375px phone. */
@media(max-width:760px){
  .ft-gewerbe-ground .ft-plan-frame{width:112%;margin-left:-6%}
}
`

/* ---------------- page ---------------- */

export default function LoesungenGewerbe() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <style href="loesungen-gewerbe" precedence="default">{css}</style>

      {/* 9.1 Hero — the claim first, centred, and the site it protects under
          it. The Privatkunden page sets its house beside the words; here the
          building is wide and low, so it reads better full width below them. */}
      <section className="ft-gewerbe-ground" style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 clamp(3rem,5vw,4.5rem)' }}>
        <div className="ft-shell">
          <div className="ft-center" data-rev-group>
            <p className="ft-eyebrow" data-rev>Gewerbekunden</p>
            <h1 data-rev style={{ maxWidth: '20ch', marginInline: 'auto' }}>
              Professionelle Sicherheit für Ihr Unternehmen
            </h1>
            <p
              data-rev
              className="ft-hero-lead"
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                maxWidth: 680, margin: '1rem auto 1.5rem',
              }}
            >
              Skalierbare Sicherheitslösungen für Büros, Lagerhallen, Einzelhandel und Industrie,
              DSGVO-konform und versicherungsoptimiert.
            </p>
            <TrustMarks data-rev />
            <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.75rem' }}>
              <Button href="/kontakt">{cta.start}</Button>
            </div>
            {/* A link, not a second button — the way out to the other audience's
                page, which is not a second call to action. */}
            <div data-rev style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: '.85rem' }}>
              <Link className="ft-quiet-link" href="/loesungen-privat">
                Für Privatkunden →
              </Link>
            </div>
          </div>

          {/* One site, cut open, with the six disciplines marked where their
              hardware sits. The marks are annotations on a picture the alt text
              already describes; each card carries the discipline itself. */}
          <Plan
            systems={planSystems}
            src="/loesungen-gewerbe-werk.webp"
            alt="Isometrischer Schnitt durch ein Gewerbeobjekt mit Lagerhalle und Bürotrakt: Alarmzentrale, Außenkamera, Drehkreuz mit Zutrittsleser, Zeiterfassungsterminal, Brandmelderzentrale und Technikschrank für die NSL-Anbindung."
          />
        </div>
      </section>

      {/* 9.3 Ihre Vorteile */}
      {/* No margin above it: the grey opener ends and this section's own white
          begins, and a gap between them was a strip of page ground showing
          through as a third colour. */}
      <section className="ft-section ft-section--raised">
        <div className="ft-shell">
          <SectionHead eyebrow="Ihre Vorteile" title="Warum Unternehmen uns vertrauen" />
          {/* Picture in the panel, the claim under it and the sentence that
              qualifies it under that — the caption reads as a caption instead
              of as more card. */}
          <div data-rev-group className="ft-vorteile">
            {vorteile.map((v) => (
              <figure data-rev className="ft-vorteil" key={v.h}>
                <div className="ft-vorteil-tile">
                  <img src={v.img} alt="" loading="lazy" decoding="async" />
                </div>
                <figcaption className="ft-vorteil-cap">
                  <p className="ft-vorteil-h">{v.h}</p>
                  <p className="ft-vorteil-p">{v.p}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* 9.4 Closing CTA panel */}
      <section className="ft-section">
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
              <h3 style={{ marginBottom: '.4em' }}>Individuelle Gewerbelösung anfragen</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir erstellen Ihnen ein maßgeschneidertes Sicherheitskonzept für Ihr Unternehmen.
              </p>
            </div>
            <Button href="/kontakt">Angebot anfragen</Button>
          </div>
        </div>
      </section>
    </>
  )
}
