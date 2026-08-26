const standardProtocols = 'HTTP(S) / RTSP / FTP / SMTP / DHCP / NTP / RTP / RTMP / P2P / IPv4 / IPv6 / NFS'

function makeProduct(p) {
  const main = `/${p.slug}-main.${p.mainExt || 'png'}`
  const hero = `/${p.slug}-hero.jpg`
  const feature = `/${p.slug}-feature.jpg`
  const cardImages = [main, feature, hero]

  return {
    ...p,
    metaTitle: p.metaTitle || `FTronics ${p.name}: ${p.promise}`,
    images: { hero, core: main, feature, weather: feature, product: main },
    alts: {
      hero: `FTronics ${p.name} in einer professionellen Installation`,
      core: `FTronics ${p.name} Produktansicht`,
      feature: `${p.name} im vorgesehenen Einsatzbereich`,
      weather: `${p.name} in einer professionellen Betriebsumgebung`,
      product: `FTronics ${p.name} Produktansicht`,
    },
    proofs: p.highlights.map((item, index) => ({
      kind: index === 0 || index === 3 ? 'dark' : 'photo',
      tall: index === 0,
      wide: index === 3,
      img: index < 3 ? (index === 1 ? main : feature) : undefined,
      alt: '', h: item[0], p: item[1],
    })),
    intelligence: {
      ...p.intelligence,
      cards: p.intelligence.cards.map((item, index) => ({
        h: item[0], p: item[1], img: cardImages[index], alt: `${p.name}: ${item[0]}`,
      })),
    },
  }
}

const cameraNotes = [
  '* Analyse-, Licht- und IR-Reichweiten sind Richtwerte und hängen von Montagehöhe, Motivgröße, Blickwinkel, Reflexion und Umgebungslicht ab.',
  '* Maßgeblich für Projektierung und Inbetriebnahme ist das verlinkte offizielle Datenblatt.',
]

const recorderNotes = [
  '* Speicherdauer hängt von Kameraanzahl, Auflösung, Bildrate, Kompression, Ereignisprofil und Festplattenbestückung ab.',
  '* Festplatten sind projektabhängig zu dimensionieren und nicht automatisch im Lieferumfang enthalten.',
]

export const extendedProductPageData = {
  'ft-8c-pro': makeProduct({
    slug: 'ft-8c-pro', coreGround: '#fff', name: 'FT-8C Pro', category: 'Turret IP-Kamera', mainExt: 'jpg',
    metaTitle: 'FTronics FT-8C Pro: 4K Turret-Kamera mit 24/7 Farbbild',
    metaDescription: 'FTronics FT-8C Pro mit 8 MP Sony IMX415, F1.0, 24/7 Farbbild, Gesichts-, Personen- und Fahrzeugerkennung, IP67 und PoE.',
    promise: '4K-Turret-Kamera mit Sony IMX415, lichtstarker F1.0-Optik und 24/7 Farbbildgebung.',
    highlights: [
      ['Farbe, wenn andere auf Schwarzweiß wechseln.', 'F1.0 und zwei weiche Warmlichtquellen halten relevante Farbinformationen auch bei wenig Licht verfügbar.'],
      ['Sony IMX415 in 4K.', '3840 × 2160 Pixel bilden die Grundlage für nachvollziehbare Details und gezielte Recherche.'],
      ['Gesicht, Person und Fahrzeug.', 'Die Onboard-Analyse unterscheidet relevante Zieltypen statt jede Bewegung gleich zu behandeln.'],
      ['IP67. PoE. ONVIF 23.12.', 'Eine robuste Turret-Bauform trifft auf standardisierte Integration und Versorgung über ein Netzwerkkabel.'],
    ],
    positioning: { eyebrow: '24/7 Farbbild', title: 'Farbe bleibt Teil des Beweisbilds.', text: 'Die FT-8C Pro ist für Eingänge, Einzelhandel, Büros, Parkplätze und Lager gedacht. Ihre F1.0-Festbrennweite sammelt viel Licht, der Sony-IMX415-Sensor liefert 4K und die ergänzende Warmlichtbeleuchtung erhält Farbinformationen in Szenen, in denen klassische IR-Kameras auf Schwarzweiß wechseln.' },
    core: { eyebrow: 'Sony IMX415 · F1.0', title: 'Lichtstarke Optik vor hochauflösendem Sensor.', text: 'Der 1/2,8-Zoll-Sensor liefert 3840 × 2160 Pixel. Die 2,8-mm-Festbrennweite mit F1.0 und WDR unterstützt weite Eingangs- und Flächenszenen mit hohen Kontrasten.' },
    intelligence: { eyebrow: 'Gezielte Klassifizierung', title: 'Relevante Ziele statt pauschaler Bewegung.', text: 'Personen und Fahrzeuge werden von 2 bis 20 Metern erkannt, Gesichter von 1 bis 5 Metern. Bis zu 16 Ziele können gleichzeitig verarbeitet werden.', cards: [
      ['Gesichtserkennung', 'Gesichter werden im Nahbereich als eigene Ereignisse erfasst und recherchierbar gemacht.'],
      ['Personen und Fahrzeuge', 'Die Klassifizierung reduziert Meldungen durch Tiere, Lichtwechsel oder andere irrelevante Bewegung.'],
      ['Bewegungszonen', 'Zonen und Empfindlichkeit lassen sich an Eingang, Parkplatz oder Lagerfläche anpassen.'],
    ] },
    proofPanel: { eyebrow: 'Low-Light-Leistung', title: 'Drei Bausteine für verwertbare Nachtbilder.', lead: 'Sensor, Optik und Zusatzlicht arbeiten als abgestimmtes System.', subhead: 'Farbe ist geplant, nicht zufällig.', text: 'F1.0 sammelt Licht, der Sony-Sensor löst Details auf und zwei Warmlichtquellen ergänzen die Szene, wenn die vorhandene Beleuchtung nicht reicht.', facts: [['F1.0', 'Lichtstarke Blende'], ['20–30 m', 'Lichtreichweite'], ['4K', '3840 × 2160']] },
    resilience: { eyebrow: 'Dauerhafte Außenmontage', title: 'Für Fassade, Eingang und Parkplatz gebaut.', text: 'IP67, ein Temperaturbereich von −20 °C bis +60 °C und weniger als 8 W Leistungsaufnahme unterstützen den dauerhaften Einsatz. PoE nach IEEE 802.3af vereinfacht die Leitungsführung.' },
    specGroups: [
      { title: 'Kamera & Bild', rows: [['Bildsensor', '1/2,8″ 8 MP Sony IMX415 CMOS'], ['SoC', 'Sigmastar SSC378DE'], ['Effektive Pixel', '3840 × 2160'], ['Verschlusszeit', 'Auto / manuell: 1/10 s – 1/8000 s'], ['WDR / DNR', 'WDR · 2D/3D DNR']] },
      { title: 'Video', rows: [['Kompression', 'H.264 / H.265'], ['Hauptstream', '20 fps bei 8 MP · 30 fps bis 6 MP'], ['Bitrate', '64 kbps – 8 Mbps']] },
      { title: 'Netzwerk & KI', rows: [['Protokolle', `${standardProtocols} / HiK / DDNS`], ['ONVIF', '23.12 · Profile S/G/T/M'], ['Anschluss', 'RJ45 100 Mbps · PoE IEEE 802.3af'], ['Person / Fahrzeug', '2–20 m'], ['Gesicht', '1–5 m']] },
      { title: 'Optik & Licht', rows: [['Objektiv', '2,8 mm F1.0 Festbrennweite'], ['Zusatzlicht', '2× Soft & Warm'], ['Lichtreichweite', '20–30 m'], ['Zieltypen', 'Mensch, Fahrzeug, nicht motorisiert, Haustier, Gesicht']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC ±10 % / PoE'], ['Leistungsaufnahme', '< 8 W'], ['Betriebstemperatur', '−20 °C bis +60 °C'], ['Schutzklasse', 'IP67']] },
    ],
    schema: [['Auflösung', '8 MP · 3840 × 2160'], ['Bildsensor', 'Sony IMX415'], ['Objektiv', '2,8 mm F1.0'], ['KI', 'Gesicht, Person, Fahrzeug'], ['Schutzklasse', 'IP67'], ['PoE', 'IEEE 802.3af']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-ft8c-pro-datenblatt.pdf', footnotes: cameraNotes,
    cta: 'Wir prüfen Lichtniveau, Montagehöhe, Blickwinkel und KI-Reichweiten und planen die Farbbildkamera passend zu Ihrer Szene.',
  }),

  'ft-8p-dual': makeProduct({
    slug: 'ft-8p-dual', name: 'FT-8P Dual', category: '180° Panorama Turret-Kamera',
    metaTitle: 'FTronics FT-8P Dual: 8 MP Panoramakamera mit 180° Sicht',
    metaDescription: 'FTronics FT-8P Dual mit zwei 4-MP-Sensoren, 180° Panorama, Personen-, Fahrzeug- und Gesichtserkennung, Rot/Blau-Abschreckung, IP67 und PoE.',
    promise: '8-MP-Panoramakamera mit zwei Objektiven, 180° Übersicht und aktiver Abschreckung.',
    highlights: [
      ['Eine Kamera. Ein breites Lagebild.', 'Zwei 2,8-mm-Objektive werden zu einem 4096 × 1944 Pixel breiten Panorama zusammengesetzt.'],
      ['Zwei Sensoren, sauber verbunden.', 'Doppelte GalaxyCore-GC6603-Sensorik erfasst breite Zufahrten und Freiflächen ohne typischen Fisheye-Look.'],
      ['Sehen, hören und reagieren.', 'Mikrofon, Lautsprecher, Weißlicht, Rot/Blau-Licht und Sprachsirene bündeln Verifikation und Abschreckung.'],
      ['IP67. PoE. Micro-SD bis 512 GB.', 'Die Kamera kombiniert robuste Außenmontage mit lokaler Speicherung und standardisierter Netzwerkintegration.'],
    ],
    positioning: { eyebrow: '180° Panorama', title: 'Breite Flächen ohne blinde Mitte.', text: 'Die FT-8P Dual ist für Parkplätze, Zufahrten, Gewerbeflächen und große Grundstücke konzipiert. Zwei Kameramodule erzeugen ein zusammenhängendes Panorama, während aktive Licht- und Audiofunktionen Ereignisse nicht nur dokumentieren, sondern vor Ort adressieren können.' },
    core: { eyebrow: 'Dual-Sensor-Architektur', title: 'Zwei Perspektiven werden zu einem Bild.', text: 'Zwei 1/2,7-Zoll-GalaxyCore-GC6603-Sensoren und zwei 2,8-mm-F1.6-Objektive liefern zusammen 4096 × 1944 Pixel. Der einstellbare Stitch-Abstand hilft bei der sauberen Anpassung an die reale Szene.' },
    intelligence: { eyebrow: 'Panorama-KI', title: 'Breite Sicht bleibt differenziert.', text: 'Personen, Fahrzeuge und Gesichter werden klassifiziert; vier Linien und vier Perimeterbereiche übersetzen das Panorama in konkrete Regeln.', cards: [
      ['Person und Fahrzeug', 'Beide Zieltypen werden von 2 bis 20 Metern erkannt und von irrelevanter Bewegung getrennt.'],
      ['Gesichter im Nahbereich', 'Gesichter lassen sich in einem Bereich von 1 bis 5 Metern als eigene Ereignisse erfassen.'],
      ['Aktive Abschreckung', 'Rot/Blau-Licht, Weißlichtblitz und Sprachsirene können auf bestätigte Ereignisse reagieren.'],
    ] },
    proofPanel: { eyebrow: 'Flächenabdeckung', title: 'Mehr Übersicht mit weniger Montagepunkten.', lead: 'Das breite Panorama reduziert die Zahl eng überlappender Einzelkameras.', subhead: 'Panorama, Audio und Licht in einer Einheit.', text: 'Die Dual-Optik deckt breite Achsen ab, während Zweiwege-Audio und sichtbare Lichtsignale eine direkte Reaktion ermöglichen.', facts: [['4096 × 1944', 'Gesamtauflösung'], ['2 × 2,8 mm', 'Festbrennweiten'], ['25–30 m', 'Lichtreichweite']] },
    resilience: { eyebrow: 'Große Außenflächen', title: 'Für Zufahrt, Parkplatz und Hof.', text: 'IP67, −20 °C bis +60 °C, weniger als 10 W und PoE nach IEEE 802.3af unterstützen eine klare, dauerhaft wartbare Installation.' },
    specGroups: [
      { title: 'Kamera & Bild', rows: [['Bildsensoren', '2× 1/2,7″ GalaxyCore GC6603 CMOS'], ['SoC', 'Sigmastar SSC359G'], ['Effektive Pixel', '4096 × 1944'], ['WDR', 'Nein'], ['DNR', '2D / 3D DNR']] },
      { title: 'Video & Speicher', rows: [['Kompression', 'H.264 / H.265 / MJPEG'], ['Hauptstream', '20 fps bei 4096 × 1944'], ['Substream', '20 fps bis 1024 × 480'], ['Bitrate', '64 kbps – 12 Mbps'], ['Speicher', 'Micro-SD bis 512 GB · FTP · NAS/NFS']] },
      { title: 'KI', rows: [['Person / Fahrzeug', '2–20 m · max. 16 Ziele'], ['Gesicht', '1–5 m'], ['Linienüberschreitung', '4 Linien'], ['Perimeter', '4 Bereiche']] },
      { title: 'Optik, Licht & Audio', rows: [['Objektive', '2× 2,8 mm F1.6'], ['Lichtreichweite', '25–30 m'], ['Beleuchtung', 'IR · 2× Warmlicht · Rot/Blau-LEDs'], ['Audio', 'Mikrofon und Lautsprecher eingebaut']] },
      { title: 'Allgemein', rows: [['Netzwerk', 'RJ45 100 Mbps · PoE IEEE 802.3af'], ['Stromversorgung', '12 V DC ±10 % / PoE'], ['Leistungsaufnahme', '< 10 W'], ['Temperatur', '−20 °C bis +60 °C'], ['Schutzklasse', 'IP67']] },
    ],
    schema: [['Auflösung', '4096 × 1944'], ['Panorama', '180° Dual-Objektiv'], ['Gesichtserkennung', '1–5 m'], ['Speicher', 'Micro-SD bis 512 GB'], ['Schutzklasse', 'IP67'], ['PoE', 'IEEE 802.3af']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-ft8p-dual-datenblatt.pdf', footnotes: cameraNotes,
    cta: 'Wir prüfen Panoramabreite, Stitch-Distanz, Zielreichweiten und Alarmaktionen für eine lückenarme Flächenabdeckung.',
  }),

  'fp-8t-20x': makeProduct({
    slug: 'fp-8t-20x', name: 'FP-8T 20X', category: 'PTZ Speed Dome-Kamera',
    metaTitle: 'FTronics FP-8T 20X: 4K PTZ mit 20× Zoom & Auto-Tracking',
    metaDescription: 'FTronics FP-8T 20X mit 8 MP Sony IMX415, 20× optischem Zoom, Auto-Tracking, Dual-Light, 100 dB WDR, IP67 und bis 256 Presets.',
    promise: '4K-PTZ mit 20× optischem Zoom, KI-Auto-Tracking und Dual-Light für große Areale.',
    highlights: [
      ['Entfernte Ziele optisch heranholen.', '20× optischer Zoom bewahrt Details über eine Brennweite von 4,7 bis 94 mm.'],
      ['Sony IMX415 in 4K.', '3840 × 2160 Pixel und 100 dB WDR schaffen eine belastbare Bildbasis.'],
      ['Automatisch verfolgen.', 'Personen-Tracking verbindet Erkennung, Schwenken und Zoomen mit Patrol-Funktionen.'],
      ['IP67. 4000 V. Bis 100 m IR.', 'Die PTZ ist für exponierte Großareale und lange Nachtachsen ausgelegt.'],
    ],
    positioning: { eyebrow: '20× optischer Zoom', title: 'Übersicht und Detail aus demselben Montagepunkt.', text: 'Die FP-8T 20X richtet sich an Logistikzentren, Industriegelände, Parkplätze, Stadien und andere weitläufige Bereiche. Endlose Schwenkbewegung, optischer Zoom und Auto-Tracking verbinden Lagebild und Detailprüfung in einer steuerbaren Kamera.' },
    core: { eyebrow: '4,7–94 mm', title: 'Optik für weite Distanzen.', text: 'Der 20-fache optische Zoombereich verändert die reale Abbildung statt Pixel digital zu vergrößern. Der Sony-IMX415-Sensor liefert dabei bis zu 8 MP, unterstützt durch 100 dB WDR.' },
    intelligence: { eyebrow: 'KI-gesteuerte PTZ', title: 'Erkennen, ausrichten, verfolgen.', text: 'Personen- und Fahrzeugerkennung, Gesichtserkennung, Linien und Perimeterregeln steuern relevante Ereignisse; Personen-Tracking hält Ziele automatisch im Bild.', cards: [
      ['Auto-Tracking', 'Die Kamera folgt erkannten Personen mit Schwenk- und Neigebewegung entlang einer Patrol.'],
      ['Linie und Perimeter', 'Virtuelle Grenzen und Zonen machen große Flächen regelbasiert auswertbar.'],
      ['Dual-Light', 'IR bis 80–100 m und Warmlicht bis 40–50 m passen die Nachtansicht an das Ereignis an.'],
    ] },
    proofPanel: { eyebrow: 'PTZ-Reichweite', title: 'Drei Werte bestimmen den Aktionsradius.', lead: 'Zoom, Bewegung und Beleuchtung sind für große Entfernungen abgestimmt.', subhead: 'Kontrollierte Bewegung statt statischer Ausschnitt.', text: '256 Presets, Pan/Tilt-Steuerung und 20× Zoom erlauben wiederholbare Blickpositionen und gezielte Detailprüfung.', facts: [['20×', 'Optischer Zoom'], ['256', 'Presets'], ['100 m', 'IR bis']] },
    resilience: { eyebrow: 'Großareal', title: 'Gebaut für lange Sichtachsen und Wetter.', text: 'IP67, 4000-V-Blitzschutz, −30 °C bis +60 °C und weniger als 22 W unterstützen den dauerhaften Einsatz in Industrie, Logistik und Verkehr.' },
    specGroups: [
      { title: 'Kamera & Bild', rows: [['Bildsensor', '1/2,8″ 8 MP Sony IMX415 CMOS'], ['SoC', 'Sigmastar SSC378QE'], ['Effektive Pixel', '3840 × 2160'], ['WDR', '100 dB'], ['DNR', '2D / 3D DNR']] },
      { title: 'Video & Netzwerk', rows: [['Kompression', 'H.264 / H.265 / MJPEG'], ['Hauptstream', '20 fps bei 8 MP · 30 fps bis 6 MP'], ['Speicher', 'Micro-SD bis 512 GB · FTP · NAS'], ['ONVIF', '23.12 · Profile S/G/T/M'], ['Netzwerk', 'RJ45 100 Mbps · PoE optional']] },
      { title: 'Objektiv & Licht', rows: [['Objektiv', '4,7–94 mm · F1.6–3.5'], ['Zoom', '20× optisch'], ['Blickwinkel', '64°–2,9°'], ['IR', '80–100 m'], ['Warmlicht', '40–50 m']] },
      { title: 'PTZ & KI', rows: [['Pan / Tilt', '0–360° / −5–90°'], ['Presets', '256'], ['Geschwindigkeit', '0,5–30°/s'], ['Auto-Tracking', 'Personen-Tracking mit Patrol'], ['Maximale Ziele', '16']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC ±10 % · 2 A'], ['Leistungsaufnahme', '< 22 W'], ['Temperatur', '−30 °C bis +60 °C'], ['Schutzklasse', 'IP67'], ['Blitzschutz', '4000 V']] },
    ],
    schema: [['Auflösung', '8 MP · 3840 × 2160'], ['Zoom', '20× optisch'], ['IR-Reichweite', '80–100 m'], ['Auto-Tracking', 'Personen-Tracking'], ['Schutzklasse', 'IP67'], ['Presets', '256']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fp8t-20x-datenblatt.pdf', footnotes: cameraNotes,
    cta: 'Wir prüfen Sichtachsen, Tracking-Zonen, Presets, Beleuchtung und Montagehöhe für die PTZ-Überwachung Ihres Großareals.',
  }),

  'fp-8s-25x': makeProduct({
    slug: 'fp-8s-25x', coreGround: '#fff', name: 'FP-8S 25X', category: 'PTZ Speed Dome-Kamera',
    metaTitle: 'FTronics FP-8S 25X: kompakte 4K PTZ mit 25× Zoom',
    metaDescription: 'FTronics FP-8S 25X mit 8 MP, 25× optischem Zoom, 100 m IR, Auto-Tracking, eingebautem Mikrofon, IP66 und 128 Presets.',
    promise: 'Kompakte 4K-PTZ mit 25× optischem Zoom, 100 m IR und automatischem Personen-Tracking.',
    highlights: [
      ['25× optischer Zoom.', '4,8 bis 120 mm holen entfernte Bildbereiche heran, ohne sie nur digital zu vergrößern.'],
      ['4K für die Recherche.', '8 MP halten Übersicht und Details über den Zoombereich nachvollziehbar.'],
      ['Personen automatisch im Bild halten.', 'Auto-Tracking verbindet Erkennung und PTZ-Bewegung für große Flächen.'],
      ['IP66. 100 m IR. 4000 V.', 'Die kompakte Speed-Dome-Bauform ist für anspruchsvolle Außeninstallationen ausgelegt.'],
    ],
    positioning: { eyebrow: 'Kompakte Fernsicht', title: '25× Zoom in einer zurückhaltenden PTZ-Bauform.', text: 'Die FP-8S 25X ist für Parkplätze, Industrie, Sportanlagen, Logistik und andere große Flächen gedacht. Sie kombiniert hohe Brennweitenreserve, 360° Schwenken, 90° Neigen und automatische Personenverfolgung.' },
    core: { eyebrow: '4,8–120 mm', title: 'Mehr Brennweite für entfernte Details.', text: 'Das 25×-Objektiv deckt einen Blickwinkel von 57,6° bis 2,5° ab. Der 8-MP-Sony-CMOS-Sensor liefert die Bildbasis, IR-Arrays übernehmen die Nachtachse.' },
    intelligence: { eyebrow: 'Auto-Tracking', title: 'PTZ-Bewegung folgt dem relevanten Ziel.', text: 'Personen- und Fahrzeugerkennung priorisieren sicherheitsrelevante Bewegung; konfigurierbare Zonen und Empfindlichkeit passen die Überwachung an das Gelände an.', cards: [
      ['Personenerkennung', 'Personen werden als eigene Zielklasse erkannt und können das Auto-Tracking auslösen.'],
      ['Fahrzeugerkennung', 'Zufahrten und Parkflächen lassen sich gezielter auf Fahrzeugbewegung auswerten.'],
      ['IR auf Distanz', 'Acht Array-LEDs kombinieren Nah- und Fernbeleuchtung für bis zu 100 m Reichweite.'],
    ] },
    proofPanel: { eyebrow: 'Optische Reichweite', title: 'Zoom, IR und Bewegungsfreiheit.', lead: 'Drei Systemwerte definieren die Eignung für große Außenflächen.', subhead: 'Große Distanzen aus einer kompakten Einheit.', text: '25× Zoom prüft Details, 100 m IR stützt die Nachtansicht und 360° Pan erweitert den überwachten Aktionsraum.', facts: [['25×', 'Optischer Zoom'], ['100 m', 'IR bis'], ['360°', 'Schwenkbereich']] },
    resilience: { eyebrow: 'Außeninstallation', title: 'Kompakt, aber für Wetter ausgelegt.', text: 'IP66, −30 °C bis +60 °C und 4000-V-Blitzschutz unterstützen den dauerhaften Betrieb. Die Versorgung erfolgt über 12 V DC; 48-V-PoE wird auf der technischen Seite ausgewiesen.' },
    specGroups: [
      { title: 'Kamera & Bild', rows: [['Bildsensor', '1/2,8″ Sony CMOS'], ['Auflösung', '8 MP'], ['Mindestbeleuchtung', '0,01 Lux bei F1.2'], ['WDR', 'Digital WDR'], ['DNR', '2D / 3D DNR']] },
      { title: 'Video & Netzwerk', rows: [['Kompression', 'H.264 / H.265 / MJPEG'], ['Hauptstream', '20 fps bei 8 MP · 30 fps bis 6 MP'], ['Bitrate', '512 kbps – 12 Mbps'], ['ONVIF', '17.06 kompatibel'], ['Netzwerk', 'RJ45 100 Mbps · PoE 48 V']] },
      { title: 'Objektiv & IR', rows: [['Objektiv', '4,8–120 mm · F1.5–F22'], ['Zoom', '25× optisch'], ['Blickwinkel', '57,6°–2,5°'], ['IR-LEDs', '8× Array'], ['IR-Reichweite', '80–100 m']] },
      { title: 'PTZ & Audio', rows: [['Pan / Tilt', '0–360° / 0–90°'], ['Presets', '128'], ['Geschwindigkeit', '0,5–40°/s'], ['Auto-Tracking', 'Personen-Motion-Tracking'], ['Mikrofon', 'Eingebaut']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC ±10 % · 2 A'], ['Leistungsaufnahme', '< 22 W'], ['Temperatur', '−30 °C bis +60 °C'], ['Schutzklasse', 'IP66'], ['Blitzschutz', '4000 V']] },
    ],
    schema: [['Auflösung', '8 MP'], ['Zoom', '25× optisch'], ['IR-Reichweite', '80–100 m'], ['Auto-Tracking', 'Personen'], ['Schutzklasse', 'IP66'], ['Presets', '128']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fp8s-25x-datenblatt.pdf', footnotes: cameraNotes,
    cta: 'Wir dimensionieren Zoomachse, Tracking-Bereich, IR-Reichweite und Montagepunkt passend zu Ihrer Freifläche.',
  }),

  'fe-6l': makeProduct({
    slug: 'fe-6l', name: 'FE-6L', category: 'Aufzugkamera',
    metaTitle: 'FTronics FE-6L: kompakte 6-MP-Aufzugkamera mit KI',
    metaDescription: 'FTronics FE-6L mit 6 MP Sony CMOS, 0,01 Lux, Personen- und Fahrzeugerkennung, digitalem WDR, 5–8 m IR, IP65 und optional PoE.',
    promise: 'Kompakte 6-MP-Kamera für Aufzüge und enge Räume mit Sony CMOS und gezielter KI-Erkennung.',
    highlights: [
      ['Die ganze Kabine im Blick.', '3072 × 2048 Pixel verbinden hohe Detailauflösung mit einer kompakten Bauform für niedrige Decken.'],
      ['Sony CMOS bei 0,01 Lux.', 'Der Sensor unterstützt klare Bilder bei schwacher Kabinen- oder Notbeleuchtung.'],
      ['Personen gezielt erkennen.', 'Die KI-Klassifizierung reduziert Meldungen durch Spiegelungen, Türbewegung oder Lichtwechsel.'],
      ['IP65. IR bis 8 m. ONVIF.', 'Für enge Innenräume ausgelegt und in bestehende NVR- und VMS-Strukturen integrierbar.'],
    ],
    positioning: { eyebrow: 'Für enge Räume', title: 'Kompakte Überwachung ohne verlorene Übersicht.', text: 'Die FE-6L wurde für Aufzugkabinen, Treppenhäuser, Eingänge und andere räumlich begrenzte Bereiche entwickelt. Ihre 6-MP-Auflösung und 2,8- oder 3,6-mm-Festbrennweite erfassen kurze Distanzen, während digitaler WDR helle Türen und dunkle Kabinenecken ausgleicht.' },
    core: { eyebrow: '6 MP Sony CMOS', title: 'Hohe Detaildichte auf kurzer Distanz.', text: '3072 × 2048 Pixel werden mit bis zu 25 Bildern pro Sekunde ausgegeben. 0,01 Lux, mechanische Tag/Nacht-Umschaltung und 2D/3D-DNR unterstützen wechselndes Kabinenlicht.' },
    intelligence: { eyebrow: 'Gezielte Ereignisse', title: 'Personen von der Kabinenbewegung unterscheiden.', text: 'Personen-, Fahrzeug- und Bewegungserkennung liefern klassifizierte Ereignisse für Aufzug, Treppenhaus und Eingang.', cards: [
      ['Personenerkennung', 'Personen werden als eigene Zielklasse behandelt und von einfachen Licht- oder Türänderungen getrennt.'],
      ['Bewegungszonen', 'Empfindlichkeit und Bereiche lassen sich auf Kabine, Türzone oder Treppenlauf konzentrieren.'],
      ['Digitales WDR', 'Helle Türöffnungen und dunklere Innenflächen bleiben gleichzeitig besser auswertbar.'],
    ] },
    proofPanel: { eyebrow: 'Kabinenbild', title: 'Kurze Distanz, hohe Bildanforderung.', lead: 'Auflösung, Low-Light und WDR sind auf enge, kontrastreiche Räume abgestimmt.', subhead: 'Kompakt montiert, vollständig integriert.', text: 'ONVIF, RTSP und optional PoE erleichtern die Einbindung in vorhandene Aufzeichnung und Gebäudeverkabelung.', facts: [['6 MP', '3072 × 2048'], ['0,01 Lux', 'Mindestbeleuchtung'], ['5–8 m', 'IR-Reichweite']] },
    resilience: { eyebrow: 'Innenräume mit Anspruch', title: 'Für Aufzug, Treppe und Eingang.', text: 'IP65, −30 °C bis +60 °C und 4000-V-Blitzschutz schaffen Reserven über den typischen Innenraum hinaus. Die Leistungsaufnahme bleibt unter 5 W.' },
    specGroups: [
      { title: 'Kamera & Bild', rows: [['Bildsensor', '1/2,8″ Sony CMOS'], ['Effektive Pixel', '3072 × 2048'], ['Mindestbeleuchtung', '0,01 Lux bei F1.2 · 0 Lux mit IR'], ['WDR', 'Digital WDR'], ['DNR', '2D / 3D DNR']] },
      { title: 'Video & Netzwerk', rows: [['Kompression', 'H.264 / H.265'], ['Hauptstream', '25 fps bei 6 MP · 30 fps bis 4 MP'], ['Bitrate', '64 kbps – 8 Mbps'], ['ONVIF', '17.06 kompatibel'], ['Netzwerk', 'RJ45 100 Mbps · PoE optional']] },
      { title: 'KI & Optik', rows: [['Smart Events', 'Person, Fahrzeug, Bewegung'], ['Objektiv', '2,8 / 3,6 mm Festbrennweite'], ['IR-LED', '1× SMD'], ['IR-Reichweite', '5–8 m'], ['Mikrofon', 'Nein']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC ±10 %'], ['Leistungsaufnahme', '< 5 W'], ['Temperatur', '−30 °C bis +60 °C'], ['Luftfeuchte', '10–90 % RH'], ['Schutzklasse', 'IP65'], ['Blitzschutz', '4000 V']] },
    ],
    schema: [['Auflösung', '6 MP · 3072 × 2048'], ['Bildsensor', 'Sony CMOS'], ['Mindestbeleuchtung', '0,01 Lux'], ['IR-Reichweite', '5–8 m'], ['Schutzklasse', 'IP65'], ['KI', 'Person und Fahrzeug']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fe6l-datenblatt.pdf', footnotes: cameraNotes,
    cta: 'Wir prüfen Kabinengeometrie, Türkontrast, Verkabelung und den nötigen Bildwinkel für eine diskrete Aufzugslösung.',
  }),

  'fn-8': makeProduct({
    slug: 'fn-8', coreGround: '#fff', name: 'FN-8', category: '8-Kanal Netzwerk-Videorekorder', mainExt: 'jpg',
    metaTitle: 'FTronics FN-8: kompakter 8-Kanal 4K NVR mit Ultra 265',
    metaDescription: 'FTronics FN-8 NVR mit 8 IP-Kanälen, 64 Mbps, 4K HDMI, Ultra 265, VCA, Personenzählung und einem SATA-Schacht bis 8 TB.',
    promise: 'Kompakter 8-Kanal-NVR mit 4K-Ausgabe, Ultra-265-Kompression und integrierter Videoanalyse.',
    highlights: [
      ['Acht Kameras zentral aufzeichnen.', 'Der FN-8 bündelt kleine Gewerbe-, Büro- und Wohnanlagen in einem kompakten Rekorder.'],
      ['4K am Kontrollmonitor.', 'HDMI gibt Livebild und Wiedergabe bis 3840 × 2160 bei 30 Hz aus.'],
      ['Ultra 265 spart Speicher.', 'Effiziente Kompression verlängert die verfügbare Aufzeichnungsdauer bei gleicher Festplatte.'],
      ['VCA, Zählung und 8 TB.', 'Analysefunktionen und ein SATA-Schacht verbinden Recherche und lokale Speicherung.'],
    ],
    positioning: { eyebrow: 'Kompakte Zentrale', title: 'Acht Kanäle, ein klarer Aufzeichnungspunkt.', text: 'Der FN-8 ist für kleine Unternehmen, Einzelhandel, Büros und Wohngebäude ausgelegt. Er führt Kamera-Streams, 4K-Ausgabe, Suche, Wiedergabe und VCA-Ereignisse in einem lokalen System zusammen.' },
    core: { eyebrow: 'Ultra 265', title: 'Mehr Aufzeichnungszeit aus demselben Speicher.', text: 'Ultra 265, H.265 und H.264 werden unterstützt. Ein SATA-Schacht nimmt eine Festplatte bis 8 TB auf; die tatsächliche Speicherdauer wird aus Kamera- und Ereignisprofil dimensioniert.' },
    intelligence: { eyebrow: 'NVR-Analyse', title: 'Ereignisse werden zentral recherchierbar.', text: 'Intrusion, Linienüberschreitung, Bereichserkennung, Auto-Tracking-Unterstützung, Personenzählung und Crowd-Density-Funktionen ergänzen die reine Aufnahme.', cards: [
      ['VCA-Ereignisse', 'Linien- und Bereichsregeln machen sicherheitsrelevante Sequenzen schneller auffindbar.'],
      ['Personenzählung', 'Ein- und Ausgänge lassen sich für Zugang und Nutzung statistisch auswerten.'],
      ['Parallele Wiedergabe', 'Bis zu acht Kanäle können gleichzeitig abgespielt und verglichen werden.'],
    ] },
    proofPanel: { eyebrow: 'Systemgröße', title: 'Passend für überschaubare Anlagen.', lead: 'Kanalzahl, Bandbreite und Speicher bilden eine klar dimensionierbare Einheit.', subhead: 'Kompakt, ohne auf 4K zu verzichten.', text: '64 Mbps Eingangsbandbreite, 8-Kanal-Wiedergabe und ein 8-TB-SATA-Schacht decken typische kleine Installationen ab.', facts: [['8', 'IP-Kanäle'], ['64 Mbps', 'Eingangsbandbreite'], ['8 TB', 'SATA maximal']] },
    resilience: { eyebrow: 'Lokale Aufzeichnung', title: 'Für den dauerhaften 24/7-Betrieb geplant.', text: 'Gigabit-Netzwerk, USB 3.0 für schnelle Exporte und ein freigegebener Temperaturbereich von −10 °C bis +55 °C unterstützen den Betrieb im Technik- oder Backoffice-Bereich.' },
    specGroups: [
      { title: 'Video & Ausgabe', rows: [['IP-Eingänge', '8 Kanäle'], ['Bandbreite ein / aus', '64 / 64 Mbps'], ['HDMI', 'Bis 4K bei 30 Hz'], ['VGA', 'Bis 1920 × 1080 bei 60 Hz'], ['Auflösung', 'Bis 8 MP']] },
      { title: 'Aufnahme & Analyse', rows: [['Kompression', 'Ultra 265 / H.265 / H.264'], ['Wiedergabe', '8 Kanäle gleichzeitig'], ['Dekodierung', '2× 4K · 3× 5 MP · 8× 1080p'], ['VCA', 'Intrusion, Linie, Bereich, Auto-Tracking, UMD'], ['Personenzählung', 'Ja']] },
      { title: 'Netzwerk & Speicher', rows: [['Netzwerk', '1× RJ45 Gigabit'], ['Benutzer', 'Bis 128'], ['Festplatte', '1× SATA bis 8 TB'], ['USB', '1× USB 2.0 · 1× USB 3.0'], ['Zweiwege-Audio', '1× RCA']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC'], ['Leistungsaufnahme', '≤ 10 W ohne HDD'], ['Temperatur', '−10 °C bis +55 °C']] },
    ],
    schema: [['IP-Kanäle', '8'], ['HDMI', '4K'], ['Eingangsbandbreite', '64 Mbps'], ['Speicher', '1× SATA bis 8 TB'], ['Kompression', 'Ultra 265 / H.265 / H.264'], ['VCA', 'Ja']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fn8-datenblatt.pdf', footnotes: recorderNotes,
    cta: 'Wir berechnen Bandbreite, Festplattengröße, Aufbewahrungszeit und Wiedergabeprofil für Ihre Acht-Kanal-Anlage.',
  }),

  'fn-16': makeProduct({
    slug: 'fn-16', coreGround: '#fff', name: 'FN-16', category: '16-Kanal Netzwerk-Videorekorder', mainExt: 'jpg',
    metaTitle: 'FTronics FN-16: 16-Kanal 4K NVR mit 2× SATA',
    metaDescription: 'FTronics FN-16 NVR mit 16 IP-Kanälen, 160 Mbps, 4K HDMI, Ultra 265, VCA, Personenzählung und 2× SATA bis 16 TB gesamt.',
    promise: '16-Kanal-NVR mit 160 Mbps, 4K-Ausgabe, VCA und zwei SATA-Schächten für mittlere Anlagen.',
    highlights: [
      ['Sechzehn Kameras zentral verwalten.', 'Der FN-16 ist auf mittlere Gewerbe-, Hotel-, Schul- und Büroinstallationen zugeschnitten.'],
      ['160 Mbps Eingangsbandbreite.', 'Mehr Kameras und höhere Auflösungen erhalten ausreichend Netzwerkreserve.'],
      ['Ultra 265 und VCA.', 'Effiziente Speicherung trifft auf Intrusion, Linie, Bereich und Personenzählung.'],
      ['2× SATA bis 16 TB gesamt.', 'Zwei interne Laufwerke schaffen mehr Aufzeichnungsreserve als kompakte Einplatten-Systeme.'],
    ],
    positioning: { eyebrow: 'Mittlere Systemgröße', title: 'Mehr Kanäle, mehr Speicherreserve, klare Bedienung.', text: 'Der FN-16 verbindet sechzehn IP-Kanäle mit 4K-Ausgabe, paralleler Wiedergabe und zentraler Analyse. Er eignet sich für Installationen, die über ein kleines Backoffice-System hinauswachsen, aber noch keine Enterprise-Rackplattform benötigen.' },
    core: { eyebrow: '2× SATA', title: 'Speicher flexibel auf zwei Laufwerke verteilen.', text: 'Zwei SATA-Schächte unterstützen jeweils bis zu 8 TB. Ultra 265 reduziert die Datenmenge, während ANR die Aufzeichnung bei kurzzeitigen Netzwerkunterbrechungen absichern kann.' },
    intelligence: { eyebrow: 'Zentrale Analyse', title: 'Sechzehn Ansichten werden zu recherchierbaren Ereignissen.', text: 'VCA-Regeln, Personenzählung und parallele Wiedergabe machen den Rekorder zur operativen Zentrale statt zum bloßen Speichergerät.', cards: [
      ['VCA-Regeln', 'Intrusion, Linie und Bereich konzentrieren die Recherche auf relevante Sequenzen.'],
      ['Personenzählung', 'Zutritte und Besucherströme lassen sich statistisch nachvollziehen.'],
      ['ANR-Unterstützung', 'Kamera und Rekorder können Aufzeichnungslücken bei Netzwerkausfällen reduzieren.'],
    ] },
    proofPanel: { eyebrow: 'Leistungsreserve', title: 'Für sechzehn parallele Kameras dimensioniert.', lead: 'Bandbreite, Wiedergabe und Speicher passen zu mittleren Anlagen.', subhead: 'Mehr Reserven ohne Enterprise-Komplexität.', text: '160 Mbps Eingang, 16-Kanal-Liveansicht und 16 TB maximaler interner Speicher bilden eine belastbare Mittelklasse.', facts: [['16', 'IP-Kanäle'], ['160 Mbps', 'Eingangsbandbreite'], ['16 TB', 'Intern maximal']] },
    resilience: { eyebrow: 'Backoffice und Technikraum', title: 'Für planbaren Dauerbetrieb ausgelegt.', text: 'Zwei Gigabit-Ports, drei USB-Anschlüsse und ein Temperaturbereich von −10 °C bis +55 °C unterstützen Einbindung, Export und Service.' },
    specGroups: [
      { title: 'Video & Ausgabe', rows: [['IP-Eingänge', '16 Kanäle'], ['Bandbreite ein / aus', '160 / 64 Mbps'], ['HDMI', 'Bis 4K bei 30 Hz'], ['VGA', 'Bis 1080p bei 60 Hz'], ['Aufnahme', 'Bis 8 MP']] },
      { title: 'Aufnahme & Analyse', rows: [['Kompression', 'Ultra 265 / H.265 / H.264'], ['Wiedergabe', '16 Kanäle gleichzeitig'], ['Dekodierung', '2× 4K · 4× 4 MP · 16× 720p'], ['VCA', 'Intrusion, Linie, Bereich, Auto-Tracking, UMD'], ['Smart Intrusion Prevention', '8 Kanäle']] },
      { title: 'Netzwerk & Speicher', rows: [['Netzwerk', '2× RJ45 Gigabit'], ['Benutzer', 'Bis 128'], ['Festplatten', '2× SATA bis je 8 TB'], ['USB', '2× USB 2.0 · 1× USB 3.0'], ['Zweiwege-Audio', '1× RCA']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC'], ['Leistungsaufnahme', '≤ 15 W ohne HDD'], ['Temperatur', '−10 °C bis +55 °C'], ['Abmessungen', '380 × 315 × 53 mm'], ['Gewicht', '≤ 2,48 kg']] },
    ],
    schema: [['IP-Kanäle', '16'], ['HDMI', '4K'], ['Eingangsbandbreite', '160 Mbps'], ['Speicher', '2× SATA bis 16 TB gesamt'], ['Kompression', 'Ultra 265'], ['VCA', 'Ja']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fn16-datenblatt.pdf', footnotes: recorderNotes,
    cta: 'Wir dimensionieren Bandbreite, Laufwerke, Aufbewahrungszeit und Analyseprofil für Ihre Sechzehn-Kanal-Lösung.',
  }),

  'fn-32': makeProduct({
    slug: 'fn-32', coreGround: '#fff', name: 'FN-32', category: '32-Kanal Netzwerk-Videorekorder', mainExt: 'jpg',
    metaTitle: 'FTronics FN-32: 32-Kanal 4K NVR für große Anlagen',
    metaDescription: 'FTronics FN-32 NVR mit 32 IP-Kanälen, 160 Mbps, 4K HDMI, 16-Kanal-Wiedergabe, Ultra 265, VCA und 2× SATA bis 16 TB.',
    promise: '32-Kanal-NVR mit 4K-Ausgabe, 16-facher Wiedergabe und zentraler VCA für große Anlagen.',
    highlights: [
      ['32 Kameras in einer Oberfläche.', 'Der FN-32 bündelt große Gewerbe-, Hotel-, Schul- und Logistikanlagen.'],
      ['16 Kanäle gleichzeitig wiedergeben.', 'Ereignisse über mehrere Blickachsen lassen sich zeitgleich rekonstruieren.'],
      ['Ultra 265 und VCA.', 'Effiziente Kompression und zentrale Analyse reduzieren Recherche- und Speicheraufwand.'],
      ['2× SATA bis 16 TB gesamt.', 'Die technische Tabelle weist zwei interne Laufwerke bis je 8 TB aus.'],
    ],
    positioning: { eyebrow: 'Große Anlagen', title: 'Viele Blickachsen bleiben zentral beherrschbar.', text: 'Der FN-32 ist für große Unternehmen, Einkaufszentren, Hotels, Schulen und Logistikzentren konzipiert. 32 Livekanäle, parallele Wiedergabe und VCA-Ereignisse führen große Kamerabestände in einer lokalen Betriebsoberfläche zusammen.' },
    core: { eyebrow: '32 Kanäle · Ultra 265', title: 'Hohe Kanalzahl mit planbarer Datenmenge.', text: 'Der Rekorder verarbeitet 32 IP-Eingänge und Auflösungen bis 8 MP. Zwei SATA-Schächte stellen zusammen bis zu 16 TB internen Speicher bereit; die genaue Aufbewahrungszeit wird projektbezogen berechnet.' },
    intelligence: { eyebrow: 'Zentrale Recherche', title: 'Sechzehn Perspektiven gleichzeitig vergleichen.', text: '16-fache Wiedergabe, Intrusion, Linie, Bereich, Auto-Tracking-Unterstützung und Personenzählung helfen bei der schnellen Ereignisrekonstruktion.', cards: [
      ['16-Kanal-Wiedergabe', 'Mehrere Kameraperspektiven eines Ereignisses werden synchron vergleichbar.'],
      ['VCA und Zählung', 'Sicherheitsregeln und Personenstatistik werden zentral zusammengeführt.'],
      ['32-Kanal-Multiview', 'Große Kameraanlagen bleiben auf Kontrollmonitoren strukturiert sichtbar.'],
    ] },
    proofPanel: { eyebrow: 'Anlagengröße', title: 'Für 32 Blickachsen dimensioniert.', lead: 'Kanalzahl, Datenrate und parallele Wiedergabe unterstützen komplexere Liegenschaften.', subhead: 'Große Übersicht, lokale Kontrolle.', text: '160 Mbps Eingang, 16 parallele Wiedergaben und zwei Gigabit-Ports bilden die technische Basis.', facts: [['32', 'IP-Kanäle'], ['16', 'Wiedergaben parallel'], ['160 Mbps', 'Eingang']] },
    resilience: { eyebrow: 'Technikraum', title: '24/7-Infrastruktur mit Servicezugang.', text: 'Zwei Gigabit-Ports, USB 3.0, ein 380-mm-Gehäuse und ein Temperaturbereich von −10 °C bis +55 °C unterstützen den dauerhaften Betrieb und schnelle Exporte.' },
    specGroups: [
      { title: 'Video & Ausgabe', rows: [['IP-Eingänge', '32 Kanäle'], ['Bandbreite ein / aus', '160 / 64 Mbps'], ['HDMI', 'Bis 4K bei 30 Hz'], ['VGA', 'Bis 1080p bei 60 Hz'], ['Aufnahme', 'Bis 8 MP']] },
      { title: 'Aufnahme & Analyse', rows: [['Kompression', 'Ultra 265 / H.265 / H.264'], ['Wiedergabe', '16 Kanäle gleichzeitig'], ['Live-Ansicht', 'Bis 36 Felder'], ['VCA', 'Intrusion, Linie, Bereich, Auto-Tracking, UMD'], ['Smart Intrusion Prevention', '8 Kanäle']] },
      { title: 'Netzwerk & Speicher', rows: [['Netzwerk', '2× RJ45 Gigabit'], ['Benutzer', 'Bis 128'], ['Festplatten', '2× SATA bis je 8 TB'], ['USB', '2× USB 2.0 · 1× USB 3.0'], ['Zweiwege-Audio', '1× RCA']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC'], ['Leistungsaufnahme', '≤ 15 W ohne HDD'], ['Temperatur', '−10 °C bis +55 °C'], ['Abmessungen', '380 × 315 × 53 mm'], ['Gewicht', '≤ 2,48 kg']] },
    ],
    schema: [['IP-Kanäle', '32'], ['HDMI', '4K'], ['Eingangsbandbreite', '160 Mbps'], ['Wiedergabe', '16 Kanäle'], ['Speicher', '2× SATA bis 16 TB gesamt'], ['VCA', 'Ja']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fn32-datenblatt.pdf', footnotes: [...recorderNotes, '* Die technische Tabelle nennt 2× SATA bis je 8 TB; diese Angabe wurde gegenüber abweichender Werbecopy priorisiert.'],
    cta: 'Wir planen Kanalbelegung, Multiview, Datenrate, Laufwerke und Rechercheabläufe für Ihre 32-Kanal-Anlage.',
  }),

  'fn-64-pro': makeProduct({
    slug: 'fn-64-pro', name: 'FN-64 Pro', category: '64-Kanal Enterprise-NVR',
    metaTitle: 'FTronics FN-64 Pro: 64-Kanal NVR mit RAID & 8× SATA',
    metaDescription: 'FTronics FN-64 Pro mit 64 IP-Kanälen bis 12 MP, 320 Mbps, RAID 0/1/5/6/10, 8× SATA, 2× eSATA, 4K60-Ausgabe und Videoanalyse.',
    promise: 'Enterprise-NVR für 64 Kanäle bis 12 MP mit RAID, 8× SATA und 320 Mbps Datenrate.',
    highlights: [
      ['64 Kanäle bis 12 MP.', 'Große Unternehmens-, Industrie- und Behördenanlagen werden zentral aufgezeichnet.'],
      ['RAID schützt die Aufzeichnung.', 'RAID 0, 1, 5, 6 und 10 erlauben abgestufte Prioritäten für Leistung, Kapazität und Redundanz.'],
      ['320 Mbps in beide Richtungen.', 'Hohe Ein- und Ausgangsbandbreite schafft Reserve für Livebild, Aufzeichnung und Remotezugriff.'],
      ['8× SATA plus 2× eSATA.', 'Server-Klasse mit interner Kapazität und externer Erweiterbarkeit für Langzeitarchivierung.'],
    ],
    positioning: { eyebrow: 'Enterprise-Aufzeichnung', title: 'Wenn Verfügbarkeit und Skalierung Teil des Sicherheitskonzepts sind.', text: 'Der FN-64 Pro richtet sich an große Unternehmen, Industrie, Einkaufszentren, Krankenhäuser und Behörden. 64 Kanäle, 12-MP-Unterstützung, RAID und mehrere Videoausgänge machen ihn zur zentralen Plattform für anspruchsvolle Leitstellen.' },
    core: { eyebrow: 'RAID · 8× SATA', title: 'Speicher wird redundant und erweiterbar.', text: 'Acht interne SATA-Schächte unterstützen je bis zu 8 TB; zwei eSATA-Schnittstellen erweitern die Plattform. RAID 0/1/5/6/10 erlaubt eine auf das Risikoprofil abgestimmte Laufwerksarchitektur.' },
    intelligence: { eyebrow: 'Enterprise-Analyse', title: 'Klassifizierung und Kennzeichen zentral auswerten.', text: 'Personen-/Fahrzeugklassifizierung, Kennzeichenerkennung und Fisheye-Entzerrung ergänzen die 16-fache Wiedergabe und ereignisgesteuerte Aufnahme.', cards: [
      ['Kennzeichenerkennung', 'Fahrzeugereignisse können mit Kennzeicheninformationen recherchiert werden.'],
      ['Person/Fahrzeug', 'Zielklassifizierung priorisiert sicherheitsrelevante Ereignisse über viele Kanäle.'],
      ['16-fache Wiedergabe', 'Komplexe Abläufe werden über bis zu sechzehn Perspektiven gleichzeitig rekonstruiert.'],
    ] },
    proofPanel: { eyebrow: 'Server-Klasse', title: 'Leistung für große Kamerabestände.', lead: 'Kanalzahl, Bandbreite und redundanter Speicher sind auf Enterprise-Betrieb abgestimmt.', subhead: 'Zentrale Plattform mit Ausbaureserve.', text: '64 Eingänge, 320 Mbps und 8+2 Laufwerksschnittstellen geben Planungsspielraum für Auflösung, Aufbewahrung und Verfügbarkeit.', facts: [['64', 'IP-Kanäle'], ['320 Mbps', 'Ein und aus'], ['8 + 2', 'SATA + eSATA']] },
    resilience: { eyebrow: 'Leitstelle und Rechenzentrum', title: 'Für kontrollierten Dauerbetrieb ausgelegt.', text: 'ATX-250-W-Versorgung, zwei Gigabit-Ports, Alarm-I/O, RS485 und ein 2-HE-Gehäuse unterstützen die Integration in professionelle Technik- und Leitstellenumgebungen.' },
    specGroups: [
      { title: 'Video & Ausgabe', rows: [['Betriebssystem', 'Embedded Linux'], ['IP-Eingänge', '64 Kanäle bis 12 MP'], ['Bandbreite ein / aus', '320 / 320 Mbps'], ['HDMI 1', '3840 × 2160 bei 60 Hz'], ['HDMI 2 / VGA', '1920 × 1080']] },
      { title: 'Aufnahme & Analyse', rows: [['Aufnahme', '12 MP bei 20 fps · bis 8 MP bei 30 fps'], ['Wiedergabe', 'Bis 16 Kanäle'], ['Analyse', 'Person/Fahrzeug, Fisheye, Kennzeichen'], ['Alarmeingänge / -ausgänge', '8 / 4'], ['Audio', '64 IPC-Kanäle · Zweiwege-RCA']] },
      { title: 'Netzwerk & Speicher', rows: [['Netzwerk', '2× RJ45 Gigabit'], ['Interner Speicher', '8× SATA bis je 8 TB'], ['Erweiterung', '2× eSATA'], ['RAID', '0 / 1 / 5 / 6 / 10'], ['Backup', 'USB / Netzwerk']] },
      { title: 'Allgemein', rows: [['USB', '2× USB 2.0 · 1× USB 3.0'], ['RS485', 'Vollduplex'], ['Stromversorgung', 'ATX 250 W'], ['Leistungsaufnahme', '≤ 30 W ohne HDD'], ['Temperatur', '−10 °C bis +50 °C'], ['Abmessungen', '445 × 436 × 90 mm']] },
    ],
    schema: [['IP-Kanäle', '64 bis 12 MP'], ['Bandbreite', '320 Mbps'], ['RAID', '0 / 1 / 5 / 6 / 10'], ['Speicher', '8× SATA + 2× eSATA'], ['Ausgabe', '4K bei 60 Hz'], ['Analyse', 'Kennzeichen, Person, Fahrzeug']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fn64-pro-datenblatt.pdf', footnotes: recorderNotes,
    cta: 'Wir planen RAID-Level, Speicherkapazität, Ausfallreserve, Bandbreite und Leitstellenansichten für Ihre Enterprise-Anlage.',
  }),

  'fr-8x': makeProduct({
    slug: 'fr-8x', name: 'FR-8X', category: '8-Kanal Hybrid-XVR',
    metaTitle: 'FTronics FR-8X: 8-Kanal Hybrid-XVR für Analog & IP',
    metaDescription: 'FTronics FR-8X Hybrid-XVR mit 8× BNC für TVI/AHD/CVI, 8 IP-Kanälen erweiterbar auf 16, 4K HDMI, H.265, KI-Personenerkennung und 8 TB SATA.',
    promise: 'Hybrid-XVR für TVI, AHD, CVI und IP mit 4K-Ausgabe und schrittweiser Systemmigration.',
    highlights: [
      ['Bestand behalten, IP ergänzen.', 'Acht BNC-Eingänge und IP-Kanäle führen analoge und digitale Kameras in einem Rekorder zusammen.'],
      ['Bis zu 16 IP-Kanäle.', 'Der Hybridbetrieb lässt sich für eine schrittweise Modernisierung erweitern.'],
      ['4K HDMI und H.265.', 'Scharfe Ausgabe und effiziente Kompression modernisieren auch gemischte Anlagen.'],
      ['Person, PIR und aktive Alarme.', 'E-Mail, Push, Sirene und Rot/Blau-Licht können auf bestätigte Ereignisse reagieren.'],
    ],
    positioning: { eyebrow: 'Hybrid-Migration', title: 'Modernisieren, ohne funktionierende Kameras sofort zu ersetzen.', text: 'Der FR-8X ist für kleine Unternehmen, Einzelhandel, Büros und Wohngebäude mit bestehender Koaxverkabelung gedacht. TVI, AHD, CVI und IP laufen parallel, sodass eine Anlage in planbaren Etappen auf IP umgestellt werden kann.' },
    core: { eyebrow: '8× BNC + IP', title: 'Alte und neue Signalwelten in einem Gerät.', text: 'Acht BNC-Eingänge akzeptieren TVI, AHD und CVI. Acht IP-Kanäle stehen zusätzlich bereit und lassen sich auf bis zu sechzehn erweitern.' },
    intelligence: { eyebrow: 'Aktive Ereigniskette', title: 'Erkennung führt direkt zu Alarm und Benachrichtigung.', text: 'Personenerkennung, PIR-Bewegung, Rot/Blau-Licht, Sirene, E-Mail und Push bilden eine durchgängige Reaktion vom Ereignis bis zum Nutzer.', cards: [
      ['Personenerkennung', 'Personenereignisse werden gezielter von allgemeiner Bewegung getrennt.'],
      ['PIR-Verifikation', 'Wärmebewegung ergänzt die Bildanalyse bei kompatiblen Kameras.'],
      ['Alarmaktionen', 'Sirene, Licht, E-Mail und Push lassen sich als konkrete Reaktion koppeln.'],
    ] },
    proofPanel: { eyebrow: 'Migrationsplattform', title: 'Vier Kamerawelten, ein Rekorder.', lead: 'Koaxbestand und IP-Ausbau werden in derselben Betriebsoberfläche zusammengeführt.', subhead: 'Schrittweise statt radikal ersetzen.', text: 'Vorhandene Leitungen und Kameras können weiterarbeiten, während neue IP-Kanäle nach Bedarf ergänzt werden.', facts: [['8×', 'BNC-Eingänge'], ['8 → 16', 'IP-Kanäle'], ['8 TB', 'SATA maximal']] },
    resilience: { eyebrow: 'Bestandsanlagen', title: 'Für planbare Modernisierung im laufenden Betrieb.', text: 'Gigabit-Netzwerk, USB 3.0, 4K-HDMI und ein kompakter 260-mm-Formfaktor erleichtern den Austausch vorhandener Rekorder, ohne das gesamte Kameranetz neu aufzubauen.' },
    specGroups: [
      { title: 'Video & Eingänge', rows: [['Kompression', 'H.265 High Profile'], ['BNC-Eingänge', '8× TVI / AHD / CVI'], ['IP-Eingänge', '8 · erweiterbar auf 16'], ['HDMI', '3840 × 2160'], ['VGA', '1920 × 1080'], ['CVBS', 'BNC']] },
      { title: 'Aufnahme & Analyse', rows: [['Auflösung', 'Bis 4K'], ['4K-Framerate', '6 / 7 fps'], ['Wiedergabe', '8 Kanäle gleichzeitig'], ['Smart Events', 'Person, PIR, Rot/Blau, Sirene'], ['Zweiwege-Audio', 'Kanal 1']] },
      { title: 'Netzwerk & Speicher', rows: [['Netzwerk', '1× RJ45 Gigabit'], ['Festplatte', '1× SATA bis 8 TB'], ['USB', '1× USB 2.0 · 1× USB 3.0'], ['Bitrate', '32 kbps – 5 Mbps']] },
      { title: 'Allgemein', rows: [['Stromversorgung', '12 V DC'], ['Leistungsaufnahme', '≤ 15 W ohne HDD'], ['Temperatur', '−10 °C bis +55 °C'], ['Abmessungen', '260 × 240 × 48 mm']] },
    ],
    schema: [['BNC-Kanäle', '8'], ['IP-Kanäle', '8 · bis 16'], ['Standards', 'TVI / AHD / CVI / IP'], ['HDMI', '4K'], ['Speicher', '1× SATA bis 8 TB'], ['KI', 'Personenerkennung']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fr8x-datenblatt.pdf', footnotes: recorderNotes,
    cta: 'Wir erfassen Kamerastandards, Koaxbestand, IP-Ausbau, Festplattengröße und Alarmwege für eine sichere Migration.',
  }),

  'fs-30': makeProduct({
    slug: 'fs-30', name: 'FS-30', category: 'IP-Hornlautsprecher',
    metaTitle: 'FTronics FS-30: 30-W-IP-Hornlautsprecher mit PoE & NVR-Kopplung',
    metaDescription: 'FTronics FS-30 IP-Hornlautsprecher mit 30 W, maximal 130 dBSPL, PoE IEEE 802.3at, Zweiwege-Audio, 64 MB Speicher, 100 Audiodateien und IP66.',
    promise: '30-W-IP-Hornlautsprecher für Alarmdurchsagen, Zweiwege-Audio und direkte NVR-Kopplung.',
    highlights: [
      ['Sprache über große Flächen verständlich ausgeben.', '30 W Nennleistung und Horngeometrie sind für Lager, Parkplätze, Zufahrten und Industrieflächen ausgelegt.'],
      ['Bis 130 dBSPL.', 'Hohe Schalldruckreserve adressiert laute Außen- und Produktionsumgebungen.'],
      ['Alarm direkt aus dem Sicherheitssystem.', 'NVR-Kopplung, Netzwerkprotokolle und zwei Alarmeingänge binden Durchsagen in Ereignisketten ein.'],
      ['PoE+. IP66. 100 Audiodateien.', 'Ein Kabel kann Daten und Energie führen; lokale Dateien ermöglichen wiederholbare, mehrsprachige Ansagen.'],
    ],
    positioning: { eyebrow: 'Akustische Reaktion', title: 'Sicherheit wird hörbar, wenn Bilder allein nicht reichen.', text: 'Die FS-30 ergänzt Videoüberwachung um Live-Durchsage, gespeicherte Warnung und Zweiwege-Audio. Sie ist für Industrie, Lager, Parkplätze, Zufahrten und Gewerbeflächen gedacht, in denen Ereignisse vor Ort klar und sofort adressiert werden müssen.' },
    core: { eyebrow: '30 W · 130 dBSPL', title: 'Hohe Sprachreserve in lauter Umgebung.', text: 'Der Frequenzgang von 300 Hz bis 12,5 kHz priorisiert Sprachverständlichkeit. Ein eingebautes Mikrofon mit 100 Hz bis 8 kHz ermöglicht Rückkanal und akustische Verifikation.' },
    intelligence: { eyebrow: 'NVR- und Netzwerk-Integration', title: 'Durchsagen werden Teil der Alarmkette.', text: 'ONVIF, RTSP, RTP und LAPI binden den Lautsprecher ein. Bis zu 100 MP3- oder WAV-Dateien können lokal gespeichert und ereignisabhängig abgespielt werden.', cards: [
      ['Alarmdurchsage', 'Vordefinierte Audiodateien reagieren reproduzierbar auf gekoppelte Sicherheitsereignisse.'],
      ['Zweiwege-Audio', 'Eingebautes Mikrofon und Lautsprecher ermöglichen Live-Kommunikation mit dem überwachten Bereich.'],
      ['38 Sprachen', 'Mehrsprachige Ansagen können für Besucher, Mitarbeitende und Notfallszenarien vorbereitet werden.'],
    ] },
    proofPanel: { eyebrow: 'Audioleistung', title: 'Leistung, Speicher und Vernetzung in einem Horn.', lead: 'Die FS-30 verbindet akustische Reichweite mit einer direkt steuerbaren IP-Plattform.', subhead: 'Von der Live-Durchsage bis zur automatischen Warnung.', text: 'Lokale Audiodateien, Zweiwege-Audio und Netzwerksteuerung decken spontane und standardisierte Kommunikation ab.', facts: [['30 W', 'Nennleistung'], ['130 dBSPL', 'Maximal'], ['100', 'Audiodateien']] },
    resilience: { eyebrow: 'Außen und Industrie', title: 'Für Wetter, Lärm und klare Montagewege.', text: 'IP66 und −30 °C bis +55 °C unterstützen Außenbereiche. PoE nach IEEE 802.3at oder 12/24 V DC bieten flexible Versorgung für Neu- und Bestandsinstallationen.' },
    specGroups: [
      { title: 'Audio', rows: [['Nennleistung', '30 W'], ['Maximaler Schalldruck', '130 dBSPL'], ['Frequenzgang', '300 Hz – 12,5 kHz'], ['Impedanz', '8 Ω'], ['Zweiwege-Audio', 'Ja'], ['Kompression', 'G.711U']] },
      { title: 'Mikrofon & Dateien', rows: [['Mikrofon', 'Eingebaut'], ['Mikrofon-Frequenzgang', '100 Hz – 8 kHz'], ['Formate', 'MP3 / WAV'], ['Speicher', '64 MB'], ['Dateien', 'Bis 100'], ['Sprachen', '38']] },
      { title: 'Netzwerk & Schnittstellen', rows: [['Protokolle', 'IPv4 / HTTP(S) / TLS / DNS / TCP / UDP / DHCP / SSH'], ['Schnittstellen', 'ONVIF / RTSP / RTP / LAPI'], ['Netzwerk', 'RJ45 10/100 Mbps'], ['Audio-Eingang', 'RCA'], ['Alarmeingänge', '2']] },
      { title: 'Allgemein', rows: [['Stromversorgung', 'PoE IEEE 802.3at · 24 V DC / 12 V DC'], ['Material', 'ABS-Kunststoff'], ['Temperatur', '−30 °C bis +55 °C'], ['Abmessungen', '282 × 205 × 285 mm'], ['Schutzklasse', 'IP66']] },
    ],
    schema: [['Nennleistung', '30 W'], ['Schalldruck', '130 dBSPL'], ['PoE', 'IEEE 802.3at'], ['Speicher', '64 MB / 100 Dateien'], ['Zweiwege-Audio', 'Ja'], ['Schutzklasse', 'IP66']],
    datasheet: 'https://www.ftsicherheitstechnik.com/assets/ftronics-fs30-datenblatt.pdf',
    footnotes: ['* Der Wert 130 dBSPL aus der technischen Tabelle wurde gegenüber abweichender Hero-Werbecopy priorisiert.', '* Reichweite und Sprachverständlichkeit hängen von Montagehöhe, Hintergrundpegel, Reflexionen und Umgebungsgeometrie ab.'],
    cta: 'Wir planen Montagepunkt, Schalldruck, Ansagezonen, NVR-Ereignisse und Stromversorgung für eine verständliche Audioabdeckung.',
  }),
}
