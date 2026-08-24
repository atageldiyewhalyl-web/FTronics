import { Button, Card, Chip, ChipRow, SectionHead, Placeholder } from '@/components/ui'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  title: 'FTronics FC-8D Pro: 4K Dome IP-Kamera mit KI-Personenerkennung',
  description:
    'FTronics FC-8D Pro Dome-Kamera: 4K Ultra HD, Sony IMX415 Sensor, KI-Personenerkennung, IP67, PoE, Nachtsicht 30m. Technische Daten & Beratung.',
  alternates: { canonical: '/produkte/fc-8d-pro' },
}

/* ---------------- section data ---------------- */

/* Card titles carry the artboard's U+00AD soft hyphens so they break cleanly. */
const aiCards = [
  ['Personen­erkennung', 'Erkennt Personen, ignoriert Tiere und Bewegungsfehler. Drastisch weniger Fehlalarme im Live-Betrieb.'],
  ['Fahrzeug­erkennung', 'Unterscheidet Lkw, Pkw und Zweirad. Ideal für Werkstore, Tankstellen und Logistik.'],
  ['Linien­überschreitung', 'Virtuelle Zäune und Bereichsalarme. Wer eine Schutzlinie überschreitet, löst sofort den Alarm aus.'],
]

const parts = [
  {
    n: '01',
    h: 'Dome-Glas',
    p: 'Polycarbonat-Kuppel mit Anti-Reflex-Beschichtung. Stoßfest gegen 5 Joule Aufprall, widersteht Hammerschlägen, Steinwürfen, Vandalismus.',
    chips: ['IK10', 'Vandalismus-Schutz'],
  },
  {
    n: '02',
    h: 'Sony Starvis IMX415',
    p: '1/2,8″ CMOS-Sensor mit ultra-niedriger Lichtempfindlichkeit. 4K bei 30 fps, entwickelt für professionelle Überwachung.',
    chips: ['4K', 'Starvis', '30 fps'],
  },
  {
    n: '03',
    h: 'Festbrennweiten-Objektiv',
    p: '2,8 mm Festoptik (auf Anfrage 3,6 mm / 6 mm). F/1,6 Lichtstärke für maximale Detailtiefe bei Tag und Dämmerung.',
    chips: ['2.8 mm', 'F/1.6'],
  },
  {
    n: '04',
    h: 'Smart IR · 18 LEDs',
    p: 'Intelligente Infrarot-Beleuchtung mit dynamischer Anpassung. Bis 30 m Reichweite ohne Überbelichtung im Nahbereich.',
    chips: ['Bis 30 m', '850 nm'],
  },
  {
    n: '05',
    h: 'Onboard-KI-Chip',
    p: 'Personen- und Fahrzeug-Klassifikation direkt auf der Kamera. Keine Cloud-Anbindung, keine Latenz, keine Daten-Lecks.',
    chips: ['AI', 'Local', 'No Cloud'],
  },
  {
    n: '06',
    h: 'Aluminium-Druckguss',
    p: 'Korrosionsbeständige Basis aus Aluminium-Druckguss. Wasser- und staubdicht nach IP67, freigegeben für Außen-Einsatz bei jeder Witterung.',
    chips: ['IP67', 'Aluminium', '−30 bis +60 °C'],
  },
]

/* Four claims sized by how much each has to show. Copy is FT's own spec
   sheet put into sentences — every number here appears again in the table. */
const bento = [
  {
    kind: 'dark', tall: true, img: '/fc-8d-pro-nacht.webp',
    alt: 'Die FC-8D Pro bei Nacht, der Infrarot-Ring im Dome leuchtet schwach rot',
    h: 'Bei 0,003 Lux noch in Farbe.',
    p: 'Fällt das Licht darunter, übernimmt Smart IR: 18 SMD-LEDs bis 30 m, adaptiv geregelt, damit der Nahbereich nicht zur weißen Fläche wird.',
  },
  {
    kind: 'photo', img: '/fc-8d-pro-sensor.webp',
    alt: 'Makroaufnahme eines rückwärtig belichteten CMOS-Bildsensors mit Golddrahtkontakten',
    h: 'Sony Starvis IMX415.',
    p: '1/2,8″ Back-Illuminated CMOS, 3840 × 2160 bei 30 fps, 120 dB True WDR gegen Gegenlicht am Tor.',
  },
  {
    kind: 'photo', img: '/fc-8d-pro-regen.webp',
    alt: 'Die FC-8D Pro im Starkregen unter einem Betonvorsprung, Wasser perlt an der Kuppel ab',
    h: 'IP67. IK10. −30 °C bis +60 °C.',
    p: 'Aluminium-Druckguss mit gehärtetem Sichtglas — gebaut für Werkstore und Außenanlagen, nicht für die Veranda.',
  },
  {
    kind: 'photo', wide: true, img: '/fc-8d-pro-poe.webp',
    alt: 'Ein einzelnes Netzwerkkabel mit RJ45-Stecker',
    h: 'NDAA-konform. Und ein Kabel genügt.',
    p: 'Einsetzbar auch bei Behörden und KRITIS-Betreibern. Bild und Strom laufen über PoE nach IEEE 802.3af, bei unter 7 Watt.',
  },
]

/* The three figures a lens is actually judged on. */
const lensFigures = [
  ['8 MP', '3840 × 2160 echte Bildpunkte, nicht hochgerechnet'],
  ['F1.6', 'Lichtstarke Festoptik für Dämmerung und Restlicht'],
  ['110°', 'Horizontales Sichtfeld, vertikal rund 58°'],
]

/* After dark the camera does one job two ways, and which way it picks is a
   decision it makes on the scene rather than on a clock. */
const nightModes = [
  [
    'Farbe, solange es geht',
    'Der Starvis-Sensor hält das Farbbild bis hinunter zu 0,003 Lux. Solange noch Restlicht da ist — eine Straßenlaterne, ein Hoftor-Strahler — bleiben Kleidung, Fahrzeugfarbe und Kennzeichen unterscheidbar.',
  ],
  [
    'Infrarot, wenn nicht',
    'Fällt das Licht darunter, schaltet Smart IR zu: 18 SMD-LEDs bis 30 m, adaptiv geregelt. Wer dicht an der Kamera steht, wird nicht zur weißen Fläche — der Nahbereich bleibt zeichnungsfähig.',
  ],
]

/* Every figure above has conditions attached. They belong on the page, not in
   a brochure nobody opens. */
const footnotes = [
  '* Lux- und Reichweitenangaben sind Herstellerwerte unter Laborbedingungen. Die tatsächliche Nachtsicht hängt von Reflexionsgrad, Fremdlicht und Verschmutzung des Sichtglases ab.',
  '* Ab Werk 2,8 mm Festbrennweite. 3,6 mm und 6 mm sind auf Anfrage lieferbar und ändern Sichtfeld und Erkennungsreichweite entsprechend.',
  '* 120 dB bezieht sich auf True WDR über zwei Belichtungen, nicht auf digitale Kontrastanhebung.',
  '* NDAA-konform im Sinne von Section 889 — einsetzbar auch bei Behörden und KRITIS-Betreibern.',
]

const counters = [
  ['6 ×', 'Industrie-Komponenten'],
  ['100 %', 'NDAA-konform'],
  ['0', 'Cloud-Abhängigkeit'],
]

const specGroups = [
  {
    title: 'Sensor & Bild',
    rows: [
      ['Bildsensor', '1/2,8″ Sony Starvis IMX415 CMOS'],
      ['Effektive Pixel', '3840 × 2160 (8 MP)'],
      ['Bildrate', 'bis 30 fps bei 4K Ultra HD'],
      ['Min. Beleuchtung', '0,003 Lux (Farbe) · 0 Lux (IR)'],
      ['Dynamikumfang', '120 dB WDR'],
      ['SoC', 'Sigmastar SSC339G'],
    ],
  },
  {
    title: 'Optik & Nachtsicht',
    rows: [
      ['Brennweite', '2,8 mm Festoptik (3,6 / 6 mm auf Anfrage)'],
      ['Blende', 'F1.6'],
      ['Sichtfeld', 'H ≈ 110° · V ≈ 58°'],
      ['IR-Reichweite', 'bis 30 m, 18× SMD IR-LEDs'],
      ['Smart IR', 'Adaptive IR-Steuerung'],
    ],
  },
  {
    title: 'Schutz & Konstruktion',
    rows: [
      ['Schutzklasse', 'IP67'],
      ['Vandalismusschutz', 'IK10'],
      ['Gehäuse', 'Aluminium-Druckguss, gehärtetes Sichtglas'],
      ['Betriebstemperatur', '−30 °C bis +60 °C'],
      ['Luftfeuchtigkeit', '≤ 95 % nicht kondensierend'],
    ],
  },
  {
    title: 'Netzwerk',
    rows: [
      ['Stromversorgung', 'PoE IEEE 802.3af · alternativ 12 V DC'],
      ['Leistungsaufnahme', '≤ 7 W'],
      ['Schnittstellen', 'RJ45 10/100 Mbps · MicroSD bis 512 GB'],
      ['Kompression', 'H.265+ / H.265 / H.264+ / H.264 / MJPEG'],
      ['Protokolle', 'ONVIF 23.12 (S/G/T) · RTSP · HTTPS · NTP'],
      ['NDAA', 'Vollständig'],
    ],
  },
]

/* ---------------- structured data ---------------- */

const breadcrumb = breadcrumbJsonLd([
  { name: 'Start', href: '/' },
  { name: 'Produkte', href: '/produkte' },
  { name: 'FTronics FC-8D Pro', href: '/produkte/fc-8d-pro' },
])

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'FTronics FC-8D Pro',
  sku: 'FC-8D-PRO',
  category: 'Überwachungskameras',
  description: metadata.description,
  brand: { '@type': 'Brand', name: site.brand },
  manufacturer: { '@type': 'Organization', name: site.name },
}

/* ---------------- shared inline styles ---------------- */

const twoCol = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
  gap: 'clamp(2rem,4vw,4rem)',
  alignItems: 'center',
}

const specCard = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
  padding: '1.6rem',
}

/* ---------------- page ---------------- */

export default function ProduktFC8DPro() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />

      {/* Hero — the product photographed where it ends up, with the copy set
          into the empty half of the picture, sized so the bar and the band
          together are exactly one screen. See .ft-phero. */}
      <section className="ft-phero">
        <img
          className="ft-phero-img"
          src="/fc-8d-pro-hero.webp"
          alt="Die FTronics FC-8D Pro, montiert unter dem Dachüberstand eines hellen Gebäudes"
        />
        <div className="ft-shell ft-phero-inner">
          <div className="ft-phero-copy" data-rev-group>
            <p className="ft-eyebrow" data-rev>FTronics · Pro-Serie</p>
            <h1 data-rev>FC-8D Pro</h1>
            <p className="ft-lead" data-rev style={{ margin: '.8rem 0 0' }}>
              4K Klarheit. Sony-Sensor. Industrie-tauglich. Die Dome-Kamera, die nichts übersieht.
            </p>
            <p
              data-rev
              style={{
                color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)',
                margin: '1rem 0 1.6rem',
              }}
            >
              Für Profis entwickelt. Made for FT.
            </p>
            <div data-rev>
              <Button href="/kontakt">{cta.advice}</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature bento. The hairline strip said the same four things in four
          identical boxes; sized by what each has to show, and with the night
          shot actually showing it, they stop being a spec list. */}
      <section style={{ padding: 'clamp(2rem,4vw,3rem) 0 0' }}>
        <div className="ft-shell">
          <div className="ft-bento" data-rev-group>
            {bento.map((t) => (
              <div
                data-rev
                key={t.h}
                className={
                  'ft-bento-tile ft-bento-tile--' + t.kind +
                  (t.tall ? ' ft-bento-tile--tall' : '') +
                  (t.wide ? ' ft-bento-tile--wide' : '')
                }
              >
                {t.img ? <img className="ft-bento-img" src={t.img} alt={t.alt} loading="lazy" decoding="async" /> : null}
                <h3>{t.h}</h3>
                <p>{t.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium · Sensor · Intelligente Erkennung */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div
          className="ft-shell"
          style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(4rem,6vw,6rem)' }}
        >
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Premium-Qualität</p>
            <h2 data-rev>Nicht für die Schublade. Für den Einsatz.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
              FTronics-Kameras werden nicht für Privatkunden mit Smart-Home-Spielereien entwickelt.
              Sie entstehen für reale, anspruchsvolle Industrie- und Gewerbeumgebungen, wo eine
              verpasste Sekunde echte Folgen hat. Aluminium-Druckgussgehäuse, gehärtetes Sichtglas,
              IK10-Vandalismusschutz und industrielle Steckverbinder sorgen dafür, dass jede Kamera
              jahrelang exakt das tut, wofür sie konzipiert wurde: zuverlässig sehen.
            </p>
          </div>

          <div style={twoCol}>
            <div data-rev>
              <Placeholder ratio="4 / 3" rounded="var(--r-lg)" label="Sensor-Vergleich Tag/Nacht" />
            </div>
            <div data-rev-group>
              <p className="ft-eyebrow" data-rev>Sony Starvis IMX415</p>
              <h3 data-rev>Ein Sensor, der für Industrieanwendungen entwickelt wurde.</h3>
              <p data-rev style={{ color: 'var(--fg-secondary)' }}>
                Der Sony Starvis IMX415 ist kein Smartphone-Sensor. Er ist ein 1/2,8&quot;
                Back-Illuminated CMOS-Sensor, entwickelt für professionelle Überwachung in
                Industrieanlagen, Logistik-Zentren und kritischer Infrastruktur. Das Ergebnis:
                gestochen scharfes 4K bei Tag, brillante Farben bei Dämmerung und sauberes,
                rauscharmes Bild auch bei minimaler Beleuchtung. Wo andere Kameras blind werden,
                sieht die FC-8D Pro weiter.
              </p>
            </div>
          </div>

          <div>
            <div data-rev-group style={{ maxWidth: 680 }}>
              <p className="ft-eyebrow" data-rev>Intelligente Erkennung</p>
              <h2 data-rev>Sie sieht. Sie versteht. Sie entscheidet.</h2>
              <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
                Die integrierte KI-Engine unterscheidet zwischen Person, Fahrzeug und harmlosem
                Bewegungsereignis. Fehlalarme durch Blätter, Tiere oder Lichtwechsel? Vorbei. Die
                FC-8D Pro alarmiert nur dann, wenn es relevant ist, und das in Echtzeit, direkt
                auf dem Gerät, ohne Cloud-Abhängigkeit.
              </p>
            </div>
            <div
              data-rev-group
              className="ft-grid"
              style={{
                gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))',
                marginTop: '2.5rem',
              }}
            >
              {aiCards.map(([t, d]) => (
                <div data-rev key={t}>
                  <Card title={t}>{d}</Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Component Analysis — sticky explosion render + caption spy */}
      <section
        className="ft-section ft-section--raised"
        style={{ marginTop: 'clamp(5rem,7vw,8rem)' }}
      >
        <div className="ft-shell">
          <SectionHead
            eyebrow="Component Analysis"
            title="Sechs Bauteile. Eine Industrie-Klasse."
            lead="Wir zerlegen die FC-8D Pro bis auf die Schraube und zeigen, warum jedes Detail Industrie-Standard ist, nicht Smart-Home-Spielerei."
          />
          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 'clamp(2rem,4vw,4rem)', marginTop: '3rem', alignItems: 'start',
            }}
          >
            <div style={{ position: 'sticky', top: 96 }}>
              <Placeholder ratio="4 / 5" label="Explosions-Render: 6 Bauteile" />
            </div>
            <div
              style={{
                display: 'flex', flexDirection: 'column',
                gap: 'clamp(2.5rem,6vh,5rem)', padding: '1rem 0',
              }}
            >
              {parts.map((c) => (
                <div data-spy key={c.n}>
                  <p className="ft-num" style={{ fontSize: 13, margin: '0 0 .5rem' }}>{c.n}</p>
                  <h4 style={{ marginBottom: '.4em' }}>{c.h}</h4>
                  <p
                    style={{
                      color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)',
                      marginBottom: '.8em',
                    }}
                  >
                    {c.p}
                  </p>
                  <ChipRow>
                    {c.chips.map((x) => <Chip key={x}>{x}</Chip>)}
                  </ChipRow>
                </div>
              ))}
            </div>
          </div>

          <div data-rev-group className="ft-grid ft-grid--auto-xs" style={{ marginTop: '3rem' }}>
            {counters.map(([n, l]) => (
              <div data-rev key={l}>
                <Card variant="stat" title={n}>{l}</Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Wetterfest */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell" style={twoCol}>
          <div data-rev-group>
            <p className="ft-eyebrow" data-rev>Wetterfest</p>
            <h2 data-rev>Schnee. Hitze. Vandalismus. Egal.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
              −30 °C bis +60 °C Betriebstemperatur. IP67 gegen Staub und Strahlwasser. IK10 gegen
              mechanische Einwirkung. Diese Kamera ist nicht für die Veranda gemacht. Sie wurde für
              Werkstore, Außenanlagen und exponierte Standorte entwickelt, an denen normale Kameras
              längst aufgegeben hätten.
            </p>
          </div>
          <div data-rev>
            <Placeholder ratio="4 / 3" rounded="var(--r-lg)" label="Außeneinsatz: Witterungsfoto" />
          </div>
        </div>
      </section>

      {/* Technische Daten */}
      {/* Optics and the two ways this camera handles darkness. The figures
          sit under the claim they belong to rather than in the table, where
          they would be three rows among thirty. */}
      <section id="nachts" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Optik & Nachtsicht</p>
            <h2 data-rev>Wenn das Licht geht, hört sie nicht auf zu arbeiten.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
              Eine Kamera, die nachts nur noch Silhouetten liefert, dokumentiert einen Vorfall,
              statt ihn aufzuklären. Die FC-8D Pro hält das Farbbild so lange wie physikalisch
              möglich und schaltet erst dann auf Infrarot, wenn wirklich nichts mehr da ist.
            </p>
          </div>

          <div className="ft-figs" data-rev-group>
            {lensFigures.map(([n, l]) => (
              <div className="ft-fig" data-rev key={n}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>

          <div className="ft-modes" data-rev-group>
            {nightModes.map(([h, d]) => (
              <div className="ft-mode" data-rev key={h}>
                <h3>{h}</h3>
                <p>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="technik" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Spezifikationen" title="Technische Daten" />

          <div
            data-rev-group
            className="ft-grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              marginTop: '2.5rem',
            }}
          >
            {specGroups.map((g) => (
              <div data-rev key={g.title} style={specCard}>
                <h4 style={{ marginBottom: '1em' }}>{g.title}</h4>
                <dl
                  style={{
                    margin: 0, display: 'grid', gridTemplateColumns: '1fr',
                    gap: 10, fontSize: 'var(--t-body-sm)',
                  }}
                >
                  {g.rows.map(([dt, dd], i) => (
                    <div
                      key={dt}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 12,
                        ...(i < g.rows.length - 1
                          ? { borderBottom: '1px solid var(--border)', paddingBottom: 8 }
                          : null),
                      }}
                    >
                      <dt style={{ color: 'var(--fg-tertiary)' }}>{dt}</dt>
                      <dd style={{ margin: 0, textAlign: 'right' }}>{dd}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          {/* Datenblatt */}
          <div
            data-rev
            style={{
              ...specCard, marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap',
              gap: '1rem', alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h4 style={{ marginBottom: '.3em' }}>Datenblatt für Ihre Unterlagen.</h4>
              <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                Komplettes PDF mit allen technischen Parametern, Maßzeichnung und Anschlussdiagramm.
              </p>
            </div>
            <Button variant="secondary" href="#">FC-8D Pro Datenblatt (PDF · ca. 800 KB)</Button>
          </div>

          {/* The conditions attached to the numbers above. A specifier who
              finds them here does not have to find them out on site. */}
          <ul className="ft-notes" data-rev>
            {footnotes.map((n) => <li key={n}>{n}</li>)}
          </ul>
        </div>
      </section>

      {/* Closing CTA */}
      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div
          className="ft-shell"
          style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <h2 data-rev style={{ maxWidth: '16ch', marginLeft: 'auto', marginRight: 'auto' }}>
            Bereit für eine Beratung?
          </h2>
          <p
            data-rev
            style={{
              fontSize: 'var(--t-lead)', lineHeight: 1.45, color: 'var(--fg-secondary)',
              maxWidth: 620, margin: '1rem auto 2rem',
            }}
          >
            Unsere Sicherheitsexperten planen Ihr System individuell, von der einzelnen Kamera bis
            zur kompletten Anlage mit Aufschaltung.
          </p>
          <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button href="/kontakt">{cta.advice}</Button>
            <Button variant="secondary" href="/produkte">{cta.products}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
