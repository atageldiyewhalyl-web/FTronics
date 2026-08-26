import { Button, SectionHead } from '@/components/ui'
import { Compare } from '@/components/compare'
import { ScrollGallery } from '@/components/scroll'
import { FeatureBento } from '@/components/bento'
import { ScanBand } from '@/components/scan-band'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

export const metadata = {
  title: 'FTronics FC-8D: 4K Dome IP-Kamera mit Personen- & Fahrzeugerkennung',
  description:
    'FTronics FC-8D Dome-Kamera: 4K Ultra HD mit 30 fps, Sony IMX415, Personen- und Fahrzeugerkennung, 20–30 m IR, IP67 und 120 dB WDR.',
  alternates: { canonical: '/produkte/fc-8d' },
}

const bento = [
  {
    kind: 'dark',
    tall: true,
    img: '/fc-8d-ai-band.webp',
    alt: 'Die FC-8D überwacht nachts einen Betriebshof mit einer Person und einem Lieferfahrzeug',
    h: 'Relevante Bewegung statt Dauer-Alarm.',
    p: 'Die Analyse unterscheidet Personen und Fahrzeuge von gewöhnlicher Bewegung und reduziert so unnötige Meldungen.',
  },
  {
    kind: 'photo',
    img: '/fc-8d-sensorband.webp',
    alt: 'Makroaufnahme eines Bildsensors und seiner Elektronik',
    h: 'Sony IMX415. 4K bei 30 fps.',
    p: '3840 × 2160 Bildpunkte mit flüssiger Bildrate für Details, die auch in Bewegung nachvollziehbar bleiben.',
  },
  {
    kind: 'photo',
    img: '/fc-8d-rain.webp',
    alt: 'Die FC-8D ist unter einem Betonvorsprung starkem Regen ausgesetzt',
    h: 'IP67 für innen und außen.',
    p: 'Staubdicht, wetterfest und für Temperaturen von −20 °C bis +60 °C ausgelegt.',
  },
  {
    kind: 'dark',
    wide: true,
    img: '/fc-8d-poe-integrated-chatgpt.webp',
    alt: 'Die FC-8D mit professionell geschützter Netzwerkverkabelung',
    h: 'PoE optional. 4000 V Blitzschutz.',
    p: 'Flexible Versorgung über 12 V DC oder optional über das Netzwerk — geschützt für professionelle Installationen.',
  },
]

const aiCards = [
  {
    h: 'Personenerkennung',
    p: 'Erkennt Personen im Bereich von 2 bis 20 Metern und grenzt sie von anderen Bewegungsursachen ab.',
    img: '/fc-8d-ai-person.webp',
    alt: 'Eine Person durchquert am Abend den Eingangsbereich eines Bürogebäudes',
  },
  {
    h: 'Fahrzeugerkennung',
    p: 'Identifiziert Fahrzeuge im Bereich von 2 bis 20 Metern — passend für Zufahrten, Tore und Parkflächen.',
    img: '/fc-8d-ai-vehicle.webp',
    alt: 'Ein Lieferwagen fährt am Abend durch die Zufahrt eines Gewerbeparkplatzes',
  },
  {
    h: 'Bewegungserkennung',
    p: 'Konfigurierbare Zonen und Empfindlichkeit passen die Überwachung an den jeweiligen Einsatzort an.',
    img: '/fc-8d-ai-motion.webp',
    alt: 'Ein leerer verglaster Eingangsbereich mit bewegten Pflanzen und Regen vor dem Gebäude',
  },
]

const detectionFacts = [
  ['2–20 m', 'Reichweite für Personen'],
  ['2–20 m', 'Reichweite für Fahrzeuge'],
  ['16', 'Ziele gleichzeitig'],
]

const lensFigures = [
  ['0,01 Lux', 'Niedrige Beleuchtung für erkennbare Szenen bei wenig Restlicht'],
  ['120 dB', 'WDR gleicht helle Eingänge und dunkle Innenbereiche aus'],
  ['20–30 m', 'Infrarot-Reichweite mit 18 SMD IR-LEDs'],
]

const specGroups = [
  {
    title: 'Kamera & Bild',
    rows: [
      ['Bildsensor', '1/2,8″ 8 MP Sony IMX415 CMOS'],
      ['SoC', 'Sigmastar SSC339G'],
      ['Effektive Pixel', '3840 × 2160'],
      ['Verschlusszeit', 'Auto / manuell: 1/10 s – 1/8000 s'],
      ['Tag / Nacht', 'Auto / Tag / Nacht'],
      ['Bildanpassung', 'Helligkeit, Sättigung, Schärfe, Kontrast, Rauschunterdrückung'],
      ['Weißabgleich', 'AWB / MWB'],
      ['WDR', '120 dB'],
      ['DNR', '2D / 3D DNR'],
    ],
  },
  {
    title: 'Video',
    rows: [
      ['Videostandard', 'H.264 / H.265 / MJPEG'],
      ['Hauptstream', '30 fps bei 8 MP (3840 × 2160)'],
      ['Substream', '10 fps bei 720p · 30 fps bei D1 / VGA / QVGA'],
      ['Bitrate', '64 kbps – 8 Mbps'],
    ],
  },
  {
    title: 'Netzwerk',
    rows: [
      ['Protokolle', 'HTTP(S) / RTSP / FTP / SMTP / DHCP / NTP / RTP / RTMP / P2P / IPv4 / IPv6 / NFS'],
      ['ONVIF', '23.12 (Profile S / G / T / M)'],
      ['Anschluss', '1× RJ45 · 100 Mbps · PoE optional'],
      ['Konformität', 'NDAA-konform'],
    ],
  },
  {
    title: 'KI & intelligente Analyse',
    rows: [
      ['Bewegungserkennung', 'Ja · konfigurierbare Zonen und Empfindlichkeit'],
      ['Personenerkennung', 'Ja · 2–20 m'],
      ['Fahrzeugerkennung', 'Ja · 2–20 m'],
      ['Maximale Ziele', '16 gleichzeitig'],
    ],
  },
  {
    title: 'Objektiv, IR & Audio',
    rows: [
      ['Objektiv', '2,8 mm / 3,6 mm Festbrennweite'],
      ['IR-LEDs', '18× SMD IR-LEDs'],
      ['IR-Reichweite', '20–30 m'],
      ['Audio', 'G.711-u / G.711-a / AAC / PCM · AEC'],
      ['Mikrofon', 'Optional'],
    ],
  },
  {
    title: 'Allgemein',
    rows: [
      ['Stromversorgung', '12 V DC ± 10 % · PoE optional'],
      ['Leistungsaufnahme', '< 10 W'],
      ['Betriebstemperatur', '−20 °C bis +60 °C'],
      ['Schutzklasse', 'IP67'],
      ['Blitzschutz', '4000 V'],
    ],
  },
]

const footnotes = [
  '* Erkennungsreichweiten sind Richtwerte. Motivgröße, Montagehöhe, Blickwinkel und Beleuchtung beeinflussen die tatsächliche Analyseleistung.',
  '* Die IR-Reichweite von 20–30 m hängt von Szene, Reflexionsflächen, Verschmutzung und Fremdlicht ab.',
  '* PoE ist je nach Ausführung optional; alternativ erfolgt die Versorgung mit 12 V DC ± 10 %.',
  '* 0,01 Lux bezeichnet die Mindestbeleuchtung laut Produktangabe. Bei vollständiger Dunkelheit übernimmt die Infrarotbeleuchtung.',
]

const breadcrumb = breadcrumbJsonLd([
  { name: 'Start', href: '/' },
  { name: 'Produkte', href: '/produkte' },
  { name: 'FTronics FC-8D', href: '/produkte/fc-8d' },
])

const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: 'FTronics FC-8D',
  sku: 'FC-8D',
  category: 'Dome IP-Kamera',
  description: metadata.description,
  brand: { '@type': 'Brand', name: site.brand },
  manufacturer: { '@type': 'Organization', name: site.name },
  additionalProperty: [
    ['Auflösung', '3840 × 2160 · 8 MP · 30 fps'],
    ['Bildsensor', 'Sony IMX415 CMOS'],
    ['Personenerkennung', '2–20 m'],
    ['Fahrzeugerkennung', '2–20 m'],
    ['IR-Reichweite', '20–30 m'],
    ['Schutzklasse', 'IP67'],
    ['Stromversorgung', '12 V DC · PoE optional'],
  ].map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
}

const panel = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
  padding: '1.6rem',
}

export default function ProduktFC8D() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />

      <section className="ft-phero">
        <img
          className="ft-phero-img"
          src="/fc-8d-hero.webp"
          alt="Die FTronics FC-8D ist unter einem Betonvorsprung an einem Gewerbegebäude montiert"
        />
        <div className="ft-shell ft-phero-inner">
          <div className="ft-phero-copy" data-rev-group>
            <p className="ft-eyebrow" data-rev>FTronics · Dome IP-Kamera</p>
            <h1 data-rev>FC-8D</h1>
            <p className="ft-lead" data-rev style={{ margin: '.8rem 0 0' }}>
              4K mit 30 Bildern pro Sekunde. Erkennt Personen und Fahrzeuge, ohne bei jeder Bewegung Alarm zu schlagen.
            </p>
            <p data-rev style={{ color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)', margin: '1rem 0 1.6rem' }}>
              Für Profis entwickelt. Made for FT.
            </p>
            <div data-rev><Button href="/kontakt">{cta.advice}</Button></div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem,4vw,3rem) 0 0' }}>
        <div className="ft-shell">
          <FeatureBento items={bento} label="FC-8D Produktmerkmale" />
        </div>
      </section>

      {/* Painted in the sensor plate's own ground, sampled off the row the
          band's crop actually starts on, so the picture below runs out of this
          section rather than starting against the page grey. */}
      <section
        className="ft-band-lead-in"
        style={{
          padding: 'clamp(4.5rem,8vw,9rem) 0 clamp(3.5rem,6vw,6.5rem)',
          '--lead-in-bg': 'rgb(215,216,215)',
        }}
      >
        <div className="ft-shell">
          <div className="ft-center" data-rev-group style={{ maxWidth: 'min(100%,900px)', marginInline: 'auto' }}>
            <p className="ft-eyebrow" data-rev>Professionelle Übersicht</p>
            <h2 data-rev>Kompakt montiert. Professionell überwacht.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>
              Die FC-8D verbindet eine unauffällige Dome-Bauform mit 4K-Auflösung für Geschäftsräume,
              Einzelhandel, Büros, Eingänge und Außenbereiche. Sie passt in Neuinstallationen ebenso wie
              in bestehende IP-Systeme und konzentriert Meldungen auf die Ereignisse, die im Betrieb
              tatsächlich geprüft werden müssen.
            </p>
          </div>
        </div>
      </section>

      <section className="ft-sensorband" style={{ '--band-top': '215,216,215' }}>
        <img
          className="ft-sensorband-img"
          src="/fc-8d-sensorband.webp"
          alt="Makroaufnahme eines Bildsensors und seiner Signalverarbeitungselektronik"
        />
        <div className="ft-shell ft-sensorband-inner">
          <div className="ft-sensorband-copy ft-center" data-rev-group>
            <p className="ft-eyebrow" data-rev>Sony IMX415</p>
            <h2 data-rev>4K-Details, auch wenn sich die Szene bewegt.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>
              Der 1/2,8-Zoll-Sensor liefert 3840 × 2160 Pixel bei bis zu 30 Bildern pro Sekunde.
              Zusammen mit 120 dB WDR und 2D/3D-Rauschunterdrückung bleiben Eingänge, Gesichter
              und Fahrzeugkonturen auch bei Gegenlicht und wechselnden Bedingungen nachvollziehbar.
            </p>
          </div>
        </div>
      </section>

      <ScanBand className="ft-band ft-band--dark ft-band--scan" data-nav-dark>
        <div className="ft-band-stage">
          <img
            className="ft-band-img"
            src="/fc-8d-ai-band.webp"
            alt="Ein Mitarbeiter und ein Lieferfahrzeug auf einem nachts überwachten Betriebshof"
          />
          <div className="ft-shell ft-band-inner">
            <div className="ft-band-copy" data-rev-group lang="de">
              <p className="ft-eyebrow" data-rev>Intelligente Analyse</p>
              <h2 data-rev>Sie meldet, was wirklich relevant ist.</h2>
              <p className="ft-lead" data-rev>
                Die FC-8D klassifiziert Personen und Fahrzeuge direkt im überwachten Bereich.
                Tiere, Wetter und andere gewöhnliche Bewegungen führen dadurch deutlich seltener
                zu unnötigen Prüfungen.
              </p>
            </div>
            <div className="ft-band-rail">
              {/* One entrance for the whole rail rather than one per card — see
                  the note on the FC-8D Pro's band. */}
              <div data-rev>
              <ScrollGallery itemWidth={320} label="FC-8D Analysefunktionen">
                {aiCards.map((item) => (
                  <div key={item.h}>
                    <div className="ft-scan-card">
                      <img className="ft-scan-card-img" src={item.img} alt={item.alt} loading="lazy" decoding="async" />
                      <div className="ft-scan-card-body"><h4>{item.h}</h4><p>{item.p}</p></div>
                    </div>
                  </div>
                ))}
              </ScrollGallery>
              </div>
            </div>
          </div>
        </div>
      </ScanBand>

      <section style={{ padding: 'clamp(6rem,9vw,10rem) 0' }}>
        <div className="ft-shell">
          <SectionHead
            className="ft-center"
            eyebrow="Erkennungsbereich"
            title="Zwischen 2 und 20 Metern zählt, was relevant ist."
            lead="Für Eingänge, Zufahrten und Parkflächen klassifiziert die FC-8D Personen und Fahrzeuge in einem praxisgerechten Bereich und verfolgt bis zu 16 Ziele gleichzeitig."
          />
          <div
            data-rev
            style={{
              ...panel,
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))',
              gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', marginTop: '2.5rem',
            }}
          >
            {/* Bare, not a Media frame: the render is a cutout sitting on the
                panel's own ground, so a framed box around it only drew a second
                edge inside the one the panel already has. Same call the
                generated pages' proof panel makes. */}
            <img
              src="/fc-8d-2.png"
              alt=""
              loading="lazy"
              decoding="async"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <div>
              <h3>Ein Bereich. Zwei Zielklassen.</h3>
              <p style={{ color: 'var(--fg-secondary)', marginTop: '.8rem' }}>
                Personen- und Fahrzeugerkennung arbeiten innerhalb derselben Installation. Zonen und
                Empfindlichkeit der allgemeinen Bewegungserkennung lassen sich passend zur Szene konfigurieren.
              </p>
              {/* Stacked and borderless, the way the generated pages set the
                  same three figures. As a row of bordered stat cards these sat
                  as three frames inside a frame, and the column each one got
                  was narrow enough to break "2–20 m" across two lines. */}
              <div className="ft-proof-facts" data-rev-group style={{ marginTop: '2rem' }}>
                {detectionFacts.map(([value, label]) => (
                  <div className="ft-proof-fact" data-rev key={label}>
                    <span className="ft-proof-fact-num">{value}</span>
                    <span className="ft-proof-fact-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div className="ft-weather-panel" data-rev>
            <img
              className="ft-weather-panel-img"
              src="/fc-8d-rain.webp"
              alt="Die FC-8D arbeitet während starken Regens unter einem Gebäudeforsprung"
              loading="lazy"
              decoding="async"
            />
            <div className="ft-weather-panel-copy" data-rev-group>
              <p className="ft-eyebrow" data-rev>Innen wie außen</p>
              <h2 data-rev>Wetterfest, wenn der Einsatzort es verlangt.</h2>
              <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>
                IP67 schützt gegen Staub und Wasser. Der freigegebene Temperaturbereich von −20 °C
                bis +60 °C und der 4000-V-Blitzschutz machen die FC-8D bereit für exponierte
                Eingänge, Außenflächen und gewerbliche Installationen.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="vergleich" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <div className="ft-center" data-rev-group style={{ maxWidth: 'min(100%,900px)', marginInline: 'auto' }}>
            <p className="ft-eyebrow" data-rev>Licht & Gegenlicht</p>
            <h2 data-rev>Die Szene bleibt lesbar, wenn das Licht schwierig wird.</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>
              Niedrige Beleuchtung bis 0,01 Lux, 18 IR-LEDs und 120 dB WDR arbeiten für Situationen,
              in denen ein heller Eingang und ein dunkler Innenbereich gleichzeitig im Bild liegen.
            </p>
          </div>
          <div data-rev style={{ marginTop: 'clamp(2rem,4vw,3rem)' }}>
            <Compare
              ratio="16 / 9"
              before="/fc-8d-compare-day.webp"
              after="/fc-8d-compare-night.webp"
              beforeLabel="Tag"
              afterLabel="Nacht"
              beforeAlt="Gewerbeeingang bei Tageslicht mit einer Person und einem Fahrzeug"
              afterAlt="Derselbe Gewerbeeingang bei Nacht mit erkennbarer Person und erkennbarem Fahrzeug"
            />
          </div>
          <div className="ft-figs" data-rev-group>
            {lensFigures.map(([value, label]) => (
              <div className="ft-fig" data-rev key={value}><strong>{value}</strong><span>{label}</span></div>
            ))}
          </div>
        </div>
      </section>

      <section id="technik" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Spezifikationen" title="Technische Daten" />
          <div
            data-rev
            style={{ ...panel, display: 'grid', gridTemplateColumns: '1fr', gap: 0, marginTop: '2.5rem' }}
          >
            {specGroups.map((group, groupIndex) => (
              <div
                key={group.title}
                style={{
                  padding: groupIndex === 0 ? 0 : '1.6rem 0 0',
                  marginTop: groupIndex === 0 ? 0 : '1.6rem',
                  ...(groupIndex === 0 ? null : { borderTop: '1px solid var(--border)' }),
                }}
              >
                <h4 style={{ marginBottom: '1em' }}>{group.title}</h4>
                <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 10, fontSize: 'var(--t-body-sm)' }}>
                  {group.rows.map(([term, value], rowIndex) => (
                    <div
                      key={term}
                      style={{
                        display: 'flex', justifyContent: 'space-between', gap: 12,
                        ...(rowIndex < group.rows.length - 1 ? { borderBottom: '1px solid var(--border)', paddingBottom: 8 } : null),
                      }}
                    >
                      <dt style={{ color: 'var(--fg-tertiary)' }}>{term}</dt>
                      <dd style={{ margin: 0, textAlign: 'right', maxWidth: '68%' }}>{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>

          <div data-rev style={{ ...panel, marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 560 }}>
              <h4 style={{ marginBottom: '.3em' }}>Datenblatt für Ihre Unterlagen.</h4>
              <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
                Offizielle Produktdokumentation mit den vollständigen technischen Parametern.
              </p>
            </div>
            <Button variant="secondary" href="https://www.ftsicherheitstechnik.com/assets/ftronics-fc8d-datenblatt.pdf">
              FC-8D Datenblatt (PDF)
            </Button>
          </div>

          <ul className="ft-notes" data-rev>{footnotes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </section>

      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 data-rev style={{ maxWidth: '16ch', marginLeft: 'auto', marginRight: 'auto' }}>Passt die FC-8D zu Ihrem Objekt?</h2>
          <p data-rev style={{ fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)', maxWidth: 620, margin: '1rem auto 2rem' }}>
            Wir prüfen Blickwinkel, Montagehöhe, Erkennungsbereich und Netzwerkversorgung und planen die Kamera passend zu Ihrem Einsatzort.
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
