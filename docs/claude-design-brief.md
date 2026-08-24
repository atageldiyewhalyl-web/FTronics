# FT Sicherheitstechnik — Complete Design & Content Build Spec
### Everything Claude Design needs to build the site: design system + scroll choreography + every word of copy

> **What this is.** One file that merges the design language (synthesised from bevel.health, apple.com/airpods-pro, and bridge.surf) with the complete verified content inventory of ftsicherheitstechnik.com. Every section below pairs its **design spec** with its **actual German copy**, so nothing needs to be invented or looked up elsewhere.
>
> **Language:** German, formal *Sie* (informal *du* on Karriere only).
> **Primary conversion:** free on-site consultation → phone `+49 621 159 647 34` / form.
> **Design source:** measured DOM + computed styles, 2026-08-23. **Content source:** all 17 live pages, 2026-08-22.

---

## Contents

**Part I — Foundations**
1. [Brand & business facts](#1-brand--business-facts)
2. [Design language (tokens)](#2-design-language-tokens)
3. [Scroll interaction system](#3-scroll-interaction-system)
4. [Component library](#4-component-library)

**Part II — The build**
5. [Sitemap & routes](#5-sitemap--routes)
6. [Homepage](#6-homepage)
7. [Über uns](#7-über-uns)
8. [Lösungen — Privatkunden](#8-lösungen--privatkunden)
9. [Lösungen — Gewerbekunden](#9-lösungen--gewerbekunden)
10. [Partner](#10-partner)
11. [Produkte — FTronics catalogue](#11-produkte--ftronics-catalogue)
12. [Produktdetail — FC-8D Pro](#12-produktdetail--fc-8d-pro)
13. [Produktdetail — FB-8A Pro](#13-produktdetail--fb-8a-pro)
14. [Konfigurator](#14-konfigurator)
15. [Ratgeber](#15-ratgeber)
16. [FAQ](#16-faq)
17. [Support & Downloads](#17-support--downloads)
18. [Karriere](#18-karriere)
19. [Kontakt](#19-kontakt)
20. [Legal pages](#20-legal-pages)

**Part III — Contracts**
21. [SEO metadata & structured data](#21-seo-metadata--structured-data)
22. [Motion, accessibility & performance](#22-motion-accessibility--performance)
23. [Content blockers — must resolve before launch](#23-content-blockers--must-resolve-before-launch)
24. [Claude Design prompt](#24-claude-design-prompt)

---

# PART I — FOUNDATIONS

## 1. Brand & business facts

| Field | Value |
| --- | --- |
| Trading name | FT Sicherheitstechnik |
| Alternate | FTST |
| Hardware brand | FTronics |
| Owner / founder | Hüseyin Gökcay |
| Address | Hafenbahnstraße 15, 68305 Mannheim, Baden-Württemberg, DE |
| Phone | +49 621 159 647 34 |
| Fax | 0621 762 207 36 |
| E-mail | info@ftst.eu |
| Careers | karriere@ftst.eu |
| USt-IdNr. | DE301351179 |
| Coordinates | 49.5204, 8.5093 |
| Hours | Mo–Fr 08:00–17:00 |
| Service radius | 50 km — Metropolregion Rhein-Neckar |
| Founded | 2013 · FTronics brand 2015 · first install 2008 |
| Rating | 5.0 ★ / 19 Google reviews |
| Insurer | andsafe AG, Provinzial-Allee 1, 48159 Münster (Deutschland) |

**Social:** `facebook.com/FTST68` · `instagram.com/ftsicherheit` · `youtube.com/channel/UCOR4juRUDG46wvu8wquVkYQ`

**Awards:** Plus X Award 2026 (Top 100 Sicherheitstechnikfirmen Deutschlands) · Hohe Kundenzufriedenheit 2024 (DIPMB)

**Recurring CTA labels** — reuse these exact strings, do not invent new ones:
`Jetzt Anfrage starten` · `Kontakt aufnehmen` · `Beratung anfragen` · `Angebot anfragen` · `Kostenlose Beratung anfragen` · `Jetzt Termin vereinbaren` · `Details ansehen` · `Produkte ansehen` · `Mehr erfahren` · `Jetzt bewerben` · `Unverbindliches Angebot anfordern`

---

## 2. Design language (tokens)

Three-layer architecture: **raw colour → semantic role → component property.** Flipping a section theme reassigns the semantic layer only; components never change.

### 2.1 Colour

```css
:root {
  /* Layer 1 — raw */
  --ft-ink-950:#08090a; --ft-ink-900:#0e1012; --ft-ink-850:#141719;
  --ft-ink-800:#1b1f22; --ft-ink-700:#262b30; --ft-ink-600:#3a4147;
  --ft-paper:#ffffff;   --ft-paper-96:#f4f6f7; --ft-paper-92:#e9ecee;
  --ft-fog-400:#9aa3aa; --ft-fog-500:#6f787f;

  /* The single accent */
  --ft-signal-500:#ff4d3d; --ft-signal-600:#e63c2d; --ft-signal-400:#ff7566;

  /* Functional only — never decorative, never a CTA */
  --ft-ok:#33c26a; --ft-warn:#e8a33d; --ft-error:#e5484d;

  /* Layer 2 — semantic */
  --bg:var(--ft-ink-900);        --bg-raised:var(--ft-ink-850);
  --bg-card:var(--ft-ink-800);   --bg-card-hover:var(--ft-ink-700);
  --fg:#ffffff; --fg-secondary:var(--ft-fog-400); --fg-tertiary:var(--ft-fog-500);
  --border:rgba(255,255,255,.09); --border-strong:rgba(255,255,255,.16);
  --ring:var(--ft-signal-500);

  --btn-primary-bg:#ffffff;      --btn-primary-fg:var(--ft-ink-900);
  --btn-secondary-bg:transparent; --btn-secondary-fg:#ffffff;
  --btn-secondary-bd:rgba(255,255,255,.22);
}

[data-theme="light"] {
  --bg:var(--ft-paper-96); --bg-raised:var(--ft-paper);
  --bg-card:var(--ft-paper); --bg-card-hover:var(--ft-paper-92);
  --fg:var(--ft-ink-900); --fg-secondary:#5c656c; --fg-tertiary:#838d95;
  --border:rgba(0,0,0,.10); --border-strong:rgba(0,0,0,.18);
  --btn-primary-bg:var(--ft-ink-900); --btn-primary-fg:#ffffff;
  --btn-secondary-fg:var(--ft-ink-900); --btn-secondary-bd:rgba(0,0,0,.22);
}
```

**Hard rules**
- `--ft-signal-500` appears **at most twice per viewport** — primary action + active stepper state. Nothing else.
- The primary button is **white on dark / near-black on light**. Never the accent.
- `--ft-ok` green means *operational status* only (an "armed" chip, form success). Never a CTA.
- No glows, no bloom shadows, no infinitely looping ambient animation. Depth = surface elevation + 1px border + 3px hover lift.

### 2.2 Typography

Clash Grotesk (display) + Inter (UI/body), both self-hosted — no Google Fonts request, DSGVO-clean.

```css
--font-display:'Clash Grotesk','Inter',system-ui,sans-serif;
--font-ui:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;

--t-eyebrow: clamp(0.95rem,0.30vw + 0.88rem,1.20rem);
--t-body-sm: clamp(0.88rem,0.15vw + 0.84rem,0.95rem);
--t-body:    clamp(1.00rem,0.25vw + 0.94rem,1.15rem);
--t-lead:    clamp(1.15rem,0.55vw + 1.02rem,1.50rem);
--t-h4:      clamp(1.25rem,0.45vw + 1.14rem,1.60rem);
--t-h3:      clamp(1.60rem,1.00vw + 1.35rem,2.40rem);
--t-h2:      clamp(2.20rem,2.20vw + 1.65rem,3.75rem);
--t-h1:      clamp(2.75rem,3.20vw + 1.95rem,5.00rem);
--t-display: clamp(3.25rem,4.60vw + 2.10rem,6.00rem);
```

| Role | Font | Weight | Line-height | Tracking |
| --- | --- | --- | --- | --- |
| display | display | 600 | 1.02 | −0.022em |
| h1 | display | 600 | 1.05 | −0.018em |
| h2 | display | 600 | 1.08 | −0.014em |
| h3 | display | 600 | 1.15 | −0.008em |
| h4 | display | 500 | 1.25 | −0.004em |
| lead | ui | 400 | 1.45 | −0.002em |
| body | ui | 400 | 1.60 | 0 |
| eyebrow | ui | 500 | 1.10 | +0.06em, uppercase |

Margins in `em`: `h1 .2em` · `h2 .3em` · `h3 .5em` · `h4 .8em` · `p 1em`.

**German requirement:** `hyphens:auto` + `text-wrap:balance` + `lang="de"` on all display type. *Videoüberwachungsanlage* at 96px overflows a 1200px container otherwise. Body copy capped at 680px measure.

**The eyebrow is the signature.** Every section opens with one — small uppercase, +0.06em, `--fg-tertiary`. No exceptions. This single repeated element is what makes a long page feel authored.

### 2.3 Space, layout, radius, motion

```css
--sp-1:.25rem; --sp-2:.5rem; --sp-3:.75rem; --sp-4:1rem; --sp-6:1.5rem;
--sp-8:2rem; --sp-12:3rem; --sp-16:4rem; --sp-20:5rem; --sp-24:6rem;
--sp-32:8rem; --sp-40:10rem;

--section-pad:clamp(5rem,7.143vw + 3.571rem,10rem);   /* 80→160px */
--container:1200px; --container-wide:1440px; --container-text:680px;
--gutter:clamp(1rem,3vw,2rem);

--r-sm:8px; --r-md:14px; --r-lg:20px; --r-xl:28px; --r-bento:36px; --r-pill:9999px;

--ease-out:cubic-bezier(0.16,1,0.30,1);
--ease-in-out:cubic-bezier(0.65,0,0.35,1);
--dur-1:120ms; --dur-2:240ms; --dur-3:420ms; --dur-4:700ms; --dur-5:1100ms;
```

Grid: 12 columns. Breakpoints `sm 640 / md 768 / lg 1024 / xl 1280`.
Animate **only** `transform`, `opacity`, `filter`, `clip-path`.

---

## 3. Scroll interaction system

Scroll is the primary input device, not navigation. Engine: **Lenis → GSAP ScrollTrigger → transform/opacity**.

```js
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduced) {
  const lenis = new Lenis({
    duration: 1.05,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,          // never hijack touch
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

### Pattern A — Pinned panel stack ★

Container `(N+1) × 100dvh`; stage `position:sticky; top:0; height:100dvh`; panels crossfade on progress.

```css
.pin-stack{height:calc((var(--panels) + 1) * 100dvh);position:relative}
.pin-stage{position:sticky;top:0;height:100dvh;overflow:hidden}
.pin-panel{position:absolute;inset:0;opacity:0;will-change:opacity,transform}
.pin-panel[data-panel="0"]{opacity:1}
```

```js
ScrollTrigger.create({
  trigger:'.pin-stack', start:'top top', end:'bottom bottom', scrub:true,
  onUpdate(self){
    const n = panels.length, pos = self.progress * n;
    panels.forEach((p,i)=>{
      const d = Math.abs(pos - (i + 0.5));
      gsap.set(p,{opacity:gsap.utils.clamp(0,1,1.6 - d*1.6), y:(pos-(i+0.5))*-40});
    });
  }
});
```

Max **5 panels / 6 viewports.**

### Pattern B — Scroll-scrubbed video ★ the signature move

```js
function scrubVideo(video, trigger){
  video.pause(); video.muted = true; video.playsInline = true; video.preload='auto';
  const ready = () => ScrollTrigger.create({
    trigger, start:'top top', end:'bottom bottom', scrub:0.6,
    onUpdate(self){
      const t = self.progress * video.duration;
      if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
    }
  });
  video.readyState >= 2 ? ready()
    : video.addEventListener('loadedmetadata', ready, {once:true});
}
```

**Encoding — fails without this:** keyframe every 8 frames, faststart, ≤8s, ≤2.5 MB, two renditions.

```bash
ffmpeg -i in.mov -an -c:v libx264 -crf 23 -g 8 -pix_fmt yuv420p \
  -movflags +faststart -vf scale=1920:-2 out-1920.mp4
```

Max **3 scrubbed videos per page.**

### Pattern C — Staggered entrance reveal

```css
[data-rev]{opacity:0;transform:translateY(28px);
  transition:opacity var(--dur-4) var(--ease-out),transform var(--dur-4) var(--ease-out)}
[data-rev].is-in{opacity:1;transform:none}
```

IntersectionObserver, threshold 0.15, `rootMargin:'0px 0px -8% 0px'`, stagger **70ms**, cap **6 items**, **fires once** — never re-animate on scroll-up. Order: eyebrow → headline → lead → media → cards.

### Pattern D — Responsive pin grammar

`{small|medium|large}-pin-{top-center|center|center-left|center-right|bottom-center|self-bottom-center}`

One component, different parking position per breakpoint, declared in markup.

### Pattern E — Horizontal scroll gallery

```css
.scroll-gallery{display:flex;gap:var(--sp-6);overflow-x:auto;
  scroll-snap-type:x mandatory;scrollbar-width:none;
  padding-inline:max(var(--gutter),calc((100vw - var(--container))/2))}
.scroll-gallery::-webkit-scrollbar{display:none}
.scroll-item{flex:0 0 min(78vw,420px);scroll-snap-align:center}
```

Mandatory: paddle buttons with `aria-label`, arrow-key handling, `:focus-visible` scrolls item into view.

### Pattern F — Theme inversion as sectioning

Page runs dark; **awards** and **Ratgeber** flip to `data-theme="light"`. Transition `background-color`/`color` over `--dur-4`.

### Pattern G — Parallax, sparingly

Max **±12%** travel, background media only, never text. Budget: **2 per page.**

### Pattern H — Progress affordance

Pinned sequences need a fixed left rail with N ticks; active tick fills `--ft-signal-500`. This is the only accent in that section.

---

## 4. Component library

### 4.1 Buttons

| Variant | BG | Text | Border | Use |
| --- | --- | --- | --- | --- |
| Primary | white | near-black | — | *Kostenlose Beratung anfragen* |
| Secondary | transparent | `--fg` | 1px `--btn-secondary-bd` | *Produkte ansehen* |
| Signal | `--ft-signal-500` | white | — | once per page max |
| Quiet | — | `--fg-secondary` | — | inline links |

Pill radius, weight 500, `--t-body-sm`, padding `.85rem 1.6rem`. Hover `translateY(-1px)`. Active `scale(.985)`. Focus `outline:2px solid var(--ring); outline-offset:3px`. **44×44px minimum touch target.**

### 4.2 Cards

```css
.card{background:var(--bg-card);border:1px solid var(--border);
  border-radius:var(--r-lg);padding:var(--sp-8);
  transition:background var(--dur-3) var(--ease-out),
             border-color var(--dur-3) var(--ease-out),
             transform var(--dur-3) var(--ease-out)}
.card:hover{background:var(--bg-card-hover);border-color:var(--border-strong);
  transform:translateY(-3px)}
```

No glow, no 3D tilt. Variants: `--bento` (36px radius, full-bleed media, min-h 420px), `--product` (1:1 media + spec chips), `--stat` (numeral at `--t-h2`).

### 4.3 Spec chips

Monochrome only — `rgba(255,255,255,.05)` bg, 1px border, uppercase, `.04em`, `--r-sm`. Never colour-coded.

### 4.4 Section header

```html
<header class="section-head" data-rev-group>
  <p class="eyebrow" data-rev>[EYEBROW]</p>
  <h2 class="h2" data-rev>[HEADLINE]</h2>
  <p class="lead" data-rev>[LEAD — max 680px]</p>
</header>
```

### 4.5 Navigation

Transparent over hero → past 80px gains `rgba(14,16,18,.72)` + `backdrop-filter:blur(20px)` + bottom border, over `--dur-2`. Height 72px → 60px.

**Nav items:** `Startseite` · `Lösungen` (→ Privatkunden, Gewerbekunden) · `Produkte` · `Kontakt` · `Konfigurator` · **`Anfrage starten`**
**Skip link:** `Zum Inhalt springen`

### 4.6 Forms

Inputs `--bg-raised`, 1px `--border`, `--r-md`, min-height 52px, **16px font** (prevents iOS zoom). Focus: `border-color:var(--ring)` + `box-shadow:0 0 0 3px rgba(255,77,61,.18)`. Labels above. Errors below in `--ft-error` with `aria-describedby`.

### 4.7 Footer

```
Tagline: Smarte Sicherheitstechnik nach Ihren Ansprüchen. Seit über 15 Jahren Ihr
Partner für Alarmanlagen, Videoüberwachung und Smart Home in der Metropolregion
Rhein-Neckar.
```

| Column | Links |
| --- | --- |
| **Lösungen** | Privatkunden · Gewerbekunden · FTronics Produkte · System-Konfigurator · Partner · FAQ · Ratgeber · Support |
| **Unternehmen** | Kontakt · Über uns · Karriere |
| **Kontakt** | +49 621 159 647 34 · info@ftst.eu · Hafenbahnstr. 15, 68305 Mannheim |

Legal line: `© 2026 FT Sicherheitstechnik. Alle Rechte vorbehalten. USt-IdNr: DE301351179` — Impressum · Datenschutz · AGB · Cookie-Einstellungen

---

# PART II — THE BUILD

## 5. Sitemap & routes

| Route | Page | Theme |
| --- | --- | --- |
| `/` | Homepage | dark (2 light sections) |
| `/ueber-uns` | Über uns | dark |
| `/loesungen-privat` | Privatkunden | dark |
| `/loesungen-gewerbe` | Gewerbekunden | dark |
| `/produkte` | FTronics catalogue (18 SKUs) | dark |
| `/produkt-detail-fc8d` | FC-8D Pro | dark |
| `/produkt-detail-fb8a` | FB-8A Pro | dark |
| `/konfigurator` | 4-step configurator | dark |
| `/ratgeber` | Advice hub | **light** |
| `/faq` | 31 FAQs | dark |
| `/support` | Downloads & tutorials | dark |
| `/partner` | Technology partners | dark |
| `/karriere` | Careers | dark |
| `/kontakt` | Contact | dark |
| `/impressum` · `/datenschutz` · `/agb` | Legal | dark, minimal |

---

## 6. Homepage

**Target: 9–13 viewports.** Ship sections 1, 3, 5, 6, 8, 11 first (≈12.6vh); add the rest once the scrubbed-video pipeline is proven.

### 6.1 Hero — 1.0vh

**Pattern:** looping background video (`preload="metadata"`, muted, playsInline, 1920×1080, ≤6s, <1.2 MB) + Pattern C stagger on load.
**Layout:** full-bleed video, dark scrim `linear-gradient(180deg, rgba(14,16,18,.55), rgba(14,16,18,.85))`, copy left-aligned in `--container`, vertically centred.
**Motion:** headline → lead → buttons, 70ms stagger, `--dur-5` on the headline.

```
EYEBROW    VOR-ORT-SERVICE MANNHEIM · DSGVO-KONFORM
H1         Smarte Sicherheits­technik nach Ihren Ansprüchen
LEAD       Seit über 15 Jahren schützen wir Privat- und Geschäftskunden in der
           Metropolregion Rhein-Neckar mit modernster Sicherheitstechnologie —
           von Alarmanlagen bis Smart Home.
CTA-1      Jetzt Anfrage starten          (primary — white)
CTA-2      Unsere Lösungen                (secondary)
```

> Keep the soft hyphen in `Sicherheits­technik` — it's load-bearing for German line-breaking at large sizes.

### 6.2 Trust strip — 0.4vh

**Pattern:** C, single row, 70ms stagger. Sticky until passed.
**Layout:** 4 items, horizontal, `--fg-secondary`, thin `--border` above and below.

```
Vor-Ort-Service  ·  DSGVO-konform  ·  Top 100 Deutschlands  ·  15+ Jahre Erfahrung
```

### 6.3 FC-8D Pro exploded view — 3.0vh ★

**Pattern:** B (scroll-scrubbed video) + D (`large-pin-center` captions).
**Layout:** `.pin-stack` at 3vh; video centred at 60vw max; captions park `large-pin-center-left`, `small-pin-top-center`.
**Motion:** scrub 0.6. Six caption pairs crossfade at progress 0.08 / 0.24 / 0.40 / 0.56 / 0.72 / 0.88.

```
EYEBROW    SICHERHEIT IM DETAIL
H2         Eine Kamera. Genau hingesehen.
HINT       Scrollen, um die FC-8D Pro auseinanderzunehmen.

CAPTIONS (crossfade with scrub position):
  Sechs Bauteile. Jedes für sich.
  Sony Starvis Sensor. 4K bei Tag und Nacht.
  Smart IR · 18 LEDs. 30 m Reichweite.
  Onboard-KI. Keine Cloud. Keine Latenz.
  IP67 Aluminium. Für draußen gemacht.
```

### 6.4 Craft pledge — 1.2vh

**Pattern:** B (installation time-lapse, scrubbed over 1.2vh) + C on the four pledge cards.
**Layout:** video full-bleed behind; copy in a 680px column; four pledge cards in a 4-up grid below (2-up tablet, 1-up mobile).

> **This is the single most defensible section on the site.** No competitor can copy a real clean-install time-lapse without doing the work.

```
EYEBROW    UNSER BEKENNTNIS
H2         Wir verlassen jeden Ort besser, als wir ihn vorgefunden haben.

BODY       Eine Kamera anzubringen ist einfach. Sie so anzubringen, dass nichts
           dahinter liegen bleibt — das ist Handwerk.

           Kabel sauber im Kanal. Bohrlöcher verspachtelt. Werkzeug aufgeräumt.
           Boden gefegt. Wir kommen, weil ein Auftrag erteilt wurde. Wir gehen,
           weil die Arbeit fertig ist — und der Raum aussähe, als hätte er schon
           immer so ausgesehen, nur eben sicherer.

           Das ist nicht selbstverständlich. Für uns schon.

CARDS
  Kabel im Kanal            Keine fliegende Verkabelung. Alles im Schutzkanal.
  Bohrlöcher verspachtelt   Wenn nötig nachgestrichen. Keine Spuren.
  Boden gefegt              Bohrstaub weg, Verpackung mitgenommen.
  Übergabe vor Ort          Persönliche Einweisung. Kein Zettel auf dem Tisch.
```

### 6.5 Hand-Made in Mannheim — 0.9vh

**Pattern:** C, 3-up grid.

```
EYEBROW    HAND-MADE IN MANNHEIM
H2         Echte Techniker. Echte Arbeit. Vor Ort.
LEAD       Kein Call-Center, kein Sub-Sub-Unternehmer. Unser eigenes Experten-Team
           plant, installiert und wartet jede Anlage persönlich.

CARDS
  Beratung vor Ort        Wir kommen zu Ihnen, analysieren das Objekt und planen
                          die Lösung gemeinsam mit Ihnen — nicht am Schreibtisch.
  Installation durch      Sauber, sicher, normgerecht. Eigenes Personal mit
  Profis                  Firmenfahrzeug, eigener Werkstatt und 15+ Jahren
                          Praxiserfahrung.
  Präzision im Detail     Von der CAT6-Verkabelung bis zur Konfiguration: Jede
                          Verbindung sitzt. Jeder Anschluss wird dokumentiert.
```

### 6.6 Leistungen — 1.0vh

**Pattern:** C, 6-card grid (3-up / 2-up / 1-up), 70ms stagger capped at 6.
**Layout:** `.card` with icon, H3, body, quiet link. Hover elevation only.

```
EYEBROW    UNSERE LEISTUNGEN
H2         Ganzheitliche Sicherheits­lösungen
LEAD       Von der Beratung bis zur Installation — wir bieten Ihnen maßgeschneiderte
           Sicherheitskonzepte für jeden Bedarf.
```

| Card | Copy | Link |
| --- | --- | --- |
| **Alarmanlagen** | Hybride Ajax-Alarmanlagen mit App-Steuerung, Funk- und Draht-Komponenten. Professionell geplant, sauber installiert, jährlich gewartet. | Alarmsysteme entdecken |
| **Videoüberwachung** | 4K/8MP Kameras mit KI-Erkennung von Menschen und Fahrzeugen. FTronics-Eigenmarke für höchste Qualität. | FTronics Kameras ansehen |
| **Türsprechanlagen** | Video-Türsprechanlagen mit Smartphone-Steuerung und Aufzeichnung. Immer wissen, wer vor der Tür steht. | Türsprechanlagen erkunden |
| **Zutrittskontrolle** | Moderne Zutrittssysteme für Unternehmen und Privat. Fingerprint, RFID, PIN — flexibel und sicher. | Zutrittskontrolle planen |
| **Smart Home** | KNX-Schnittstellen, Home Assistant Integration. Licht, Heizung, Sicherheit — alles intelligent vernetzt. | Smart Home konfigurieren |
| **Brandschutz** | Rauchmelder und Brandwarnanlagen nach DIN VDE Standards. Frühwarnung rettet Leben. | Brandschutz-Lösungen ansehen |

**Counter strip below:** `Jahre Erfahrung` · `Rhein-Neckar Metropolregion` · `Top 100 Deutschlands` · `DSGVO-konform` — count-up animation triggered once on enter, `--dur-5`, `--ease-out`.

### 6.7 Five-layer protection narrative — 6.0vh ★★

**Pattern:** A (pinned stack, 5 panels → 6vh container) + H (fixed left progress rail, 5 ticks).
**Layout:** stage holds a fixed property render; each panel adds a protection layer over it. Copy parks `large-pin-center-left`.
**Motion:** crossfade + `y:-40px` drift per panel. Active tick fills `--ft-signal-500` — **the only accent in this section.**

```
EYEBROW    SO SICHERN WIR IHR OBJEKT
H2         Sicherheit, wie sie kein anderer bietet — Schritt für Schritt erklärt
LEAD       Vom Industriegelände bis zum Eigenheim: Scrollen Sie durch und sehen Sie,
           wie wir Ihr Objekt in eine moderne Sicherheitsfestung verwandeln.
           Fünf Schutzschichten, perfekt aufeinander abgestimmt.
```

**Panel 01 — Ungeschützte Objekte sind verwundbar**
> Ob Industriegelände, Lagerhalle oder Wohnhaus — ohne professionelle Sicherheitstechnik ist jedes Objekt ein leichtes Ziel. Einbrüche dauern unter 60 Sekunden, Brände bleiben zu lange unentdeckt.
- Keine Perimeterüberwachung
- Risiko von Diebstahl, Vandalismus & Brand

**Panel 02 — Perimeterschutz — die erste Verteidigungslinie**
> Bei Industrieobjekten beginnt Sicherheit am Zaun: PTZ-Kameras überwachen das gesamte Gelände, Tore werden zutrittskontrolliert, Außenleuchten reagieren auf Bewegung. Auch beim Wohnhaus sichern wir Eingang, Garage und Garten.
- FTronics PTZ-Kameras (FP-8T 20X / FP-8S 25X)
- Zutrittskontrolle für Tor & Schranken
- Kennzeichenerkennung & KI-Personenanalyse

**Panel 03 — Gebäudeüberwachung — wachsame Augen rund ums Haus**
> 4K-Bullet- und Dome-Kameras an allen kritischen Punkten: Hallen-Eingänge, Lade­rampen, Wege, Eingangstüren, Fenster. KI-gestützte Bewegungserkennung unterscheidet Mensch, Fahrzeug und Tier — Fehlalarme sind passé.
- Bullet- & Dome-Kameras in 4K (NDAA-konform)
- Nachtsicht bis 30 Meter
- NVR-Aufzeichnung bis 64 Kanäle

**Panel 04 — Alarmanlage & Sensorik — der unsichtbare Schutz**
> Tür- und Fensterkontakte, Bewegungsmelder, Glasbruchsensoren in Halle, Büro und Wohnbereich. Bei jedem unbefugten Zutritt wird in Millisekunden Alarm ausgelöst — drinnen wie draußen.
- Funkbasierte Sensorik (Ajax-Technik)
- Außen- und Innensirenen
- Brandwarnanlage mit vernetzten Rauchmeldern

**Panel 05 — App-Steuerung & Wartung — alles im Blick**
> Halle, Büro und Wohnhaus steuern Sie bequem per App. Push-Benachrichtigungen bei jedem Ereignis, jährliche Wartung durch unser Team direkt aus Mannheim — keine anonyme Hotline, sondern feste Ansprechpartner vor Ort.
- Ajax-App mit Push-Alarm in Echtzeit
- Jährliche Wartung durch FT-Techniker
- Verschlüsselte Datenübertragung

**Section close (after unpin):**
```
EYEBROW    FT SERVICE
H3         Bereit, Ihr Objekt genauso zu sichern?
BODY       Ob Industriegelände, Lagerhalle, Bürogebäude oder Eigenheim — wir beraten
           Sie persönlich vor Ort und entwickeln ein Sicherheitskonzept, das exakt zu
           Ihrem Objekt passt. Kostenlos und unverbindlich.
CTA        Kostenlose Beratung anfragen
```

### 6.8 FTronics gallery — 1.0vh

**Pattern:** E (horizontal scroll gallery with paddles).
**Layout:** 2 featured cards at `min(78vw, 420px)`, spec chips monochrome.

```
EYEBROW    FTRONICS EIGENMARKE
H2         Professionelle Über­wachungstechnik
LEAD       Unsere FTronics-Kameras vereinen deutsche Qualitätsansprüche mit
           modernster KI-Technologie.

FC-8D Pro  · Dome IP-Kamera
  Kompakte Dome-Kamera mit 4K Auflösung und intelligenter Personenerkennung.
  Chips: 4K 8MP · IP67 · KI · PoE · Sony IMX415        CTA: Details ansehen

FB-8A Pro  · Bullet IP-Kamera
  Premium Bullet-Kamera mit vollständiger KI-Suite inkl. Gesichtserkennung.
  Chips: 4K 8MP · IP67 · Gesichtserkennung · PoE       CTA: Details ansehen
```

### 6.9 Auszeichnungen — 0.8vh · `data-theme="light"`

**Pattern:** F (theme flip) + C. Awards read as credentials on white.

```
EYEBROW    AUSGEZEICHNET
H2         Unsere Auszeichnungen
LEAD       Qualität, die anerkannt wird — von unabhängigen Instituten bestätigt.

Plus X Award 2026
  Ausgezeichnet als eine der Top 100 Sicherheitstechnikfirmen Deutschlands.
Hohe Kundenzufriedenheit 2024
  Vom Deutschen Institut für Produkt und Marktbewertung ausgezeichnet.
```

### 6.10 Drei Schritte — 0.9vh

**Pattern:** C + D (`large-pin-center`, `small-pin-top-center`).

```
EYEBROW    SO FUNKTIONIERT'S
H2         3 einfache Schritte
LEAD       Von der ersten Beratung bis zur fertigen Installation — wir machen es
           Ihnen einfach.

1  Vor-Ort Beratung      Wir analysieren Ihre Situation vor Ort und erstellen ein
                         individuelles Sicherheitskonzept — kostenlos und
                         unverbindlich.
2  Profi-Installation    Unsere zertifizierten Techniker installieren Ihr System
                         sauber und fachgerecht. Einweisung inklusive.
3  Entspannen & Genießen Lehnen Sie sich zurück — Ihr Zuhause oder Unternehmen ist
                         jetzt optimal geschützt. Professionelle Aufschaltung möglich.
```

### 6.11 Kundenbewertungen — 0.8vh

**Pattern:** E (horizontal gallery).

```
EYEBROW    KUNDENBEWERTUNGEN
H2         5.0 ★★★★★ auf Google
LEAD       19 Bewertungen — 100% unserer Kunden empfehlen uns weiter.
CTA        Alle 19 Bewertungen auf Google ansehen
```

| Reviewer | Review |
| --- | --- |
| **Ulvi Keskin** ★★★★★ | Top Unternehmen, top Beratung, top Ausführung. Kompetente Einweisung und Erklärung der Anlage. Saubere und schnelle Installation. Ich kann FT Sicherheitstechnik vorbehaltlos empfehlen. |
| **Elite Media Werbeagentur** ★★★★★ | Das installierte 24/7-Überwachungssystem hat sich als äußerst effektiv erwiesen. Dank dieser modernen Technik konnten bereits mehrere Vorfälle vollständig aufgeklärt werden. Höchstes Niveau an Sicherheit, gepaart mit Zuverlässigkeit. |
| **Sercan Polat** ★★★★★ | Sehr gute und ausführliche Beratung. Wir haben ein komplettes Sicherheitssystem mit 16 Kameras und Alarmanlage gekauft. Das System funktioniert einwandfrei und wir fühlen uns wesentlich sicherer. |

### 6.12 Closing CTA — 0.8vh

**Pattern:** C on form fields.

```
H2      Jetzt kostenlose Beratung anfragen
LEAD    Wir erstellen Ihnen ein unverbindliches Angebot — individuell auf Ihre
        Bedürfnisse zugeschnitten.
CTA     Kontakt aufnehmen        ·        +49 621 159 647 34
```

---

## 7. Über uns

**Design:** the founder story is a **9-beat vertical timeline** — the strongest editorial content on the site. Use Pattern C with a persistent left rail; each beat's year badge fills `--ft-signal-500` as it enters. Portrait/archival media parks `large-pin-center-right`.

```
EYEBROW  ÜBER UNS
H1       Über FT Sicherheitstechnik
LEAD     Mehr als 15 Jahre Erfahrung, getrieben von Leidenschaft für Technik und dem
         Anspruch, Sicherheit auf höchstem Niveau zu liefern.

EYEBROW  UNSERE GESCHICHTE
H2       Vom Kinderzimmer zum Unternehmen
LEAD     Wie aus kindlicher Neugier und unternehmerischem Geist ein preisgekröntes
         Sicherheitsunternehmen entstand.
```

**Timeline beats** (full copy in `website-content.md` §7 — reproduce verbatim):

| # | Heading | Beat |
| --- | --- | --- |
| 1 | Alles begann mit einem Polizeiauto | Age 8 — dismantles an RC police car for its speaker |
| 2 | Der Computermarkt auf der Industriestraße | Weekends at the Mannheim computer market with his father |
| 3 | Mit 11 Jahren: Der erste eigene PC | Builds PCs; first pocket money from IT support |
| 4 | Samstags in der Autowerkstatt | Saturdays in his uncle's garage — vehicle electrics |
| 5 | Eigene Platinen und endloses Lernen | Designs and builds his own circuit boards |
| 6 | **2008** — Die erste professionelle Installation | Camera install in a bakery, remote-viewing software |
| 7 | Studium und der Weg zur Gründung | Mechanical engineering → management at HDWM Mannheim |
| 8 | **2013** — Gründung von FT Sicherheitstechnik | Founded during his studies; grows by word of mouth |
| 9 | **2015** — FTronics: Die eigene Marke | Own production; patented; wins Shell contracts |

**Werte — Wofür wir stehen** (4-up card grid, Pattern C):
`Qualität` · `Kundenbeziehung` · `Professionalität` · `Lebenslanges Lernen` — full copy in content inventory §7.

**Auszeichnungen** — reuse §6.9 block, `data-theme="light"`.

**Close:** `Lernen Sie uns kennen` — *Vereinbaren Sie ein unverbindliches Erstgespräch — wir freuen uns darauf, Sie persönlich zu beraten.*

---

## 8. Lösungen — Privatkunden

**Design:** Pattern A pinned stack, 3 panels (Alarmanlagen / Videoüberwachung / Smart Home), then a 2-up grid for Türsprechanlagen + Brandschutz. Media side alternates.

```
EYEBROW  PRIVATKUNDEN
H1       Sicherheit für Ihr Zuhause
LEAD     Schützen Sie Ihre Familie und Ihr Eigentum mit modernster Technik —
         professionell installiert, einfach zu bedienen.
BADGES   Vor-Ort-Service · Top 100 Deutschlands · DSGVO-konform

EYEBROW  UNSERE LÖSUNGEN FÜR PRIVAT
H2       Rundum geschützt — zuhause
LEAD     Maßgeschneiderte Sicherheitskonzepte für Wohnungen, Häuser und Grundstücke.
```

| Block | Bullets | CTA |
| --- | --- | --- |
| **Alarmanlagen** | Hybride Ajax-Systeme (Funk + Draht) · App-Steuerung & Push-Benachrichtigungen · Sofortige Push-Alarmierung auf Ihr Handy · Fenster-/Tür-/Bewegungsmelder · Versicherungsrabatte möglich | Beratung anfragen |
| **Videoüberwachung** | 4K Kameras mit Nachtsicht · KI-basierte Personen- & Fahrzeugerkennung · Fernzugriff per Smartphone · DSGVO-konforme Aufzeichnung · FTronics-Eigenmarke — beste Qualität | Produkte ansehen |
| **Smart Home** | KNX & Home Assistant Integration · Licht, Heizung, Rollläden automatisieren · Sprachsteuerung (Alexa, Google) · Energieverbrauch optimieren · Alles in einer App | Beratung anfragen |
| **Türsprechanlagen** | Video-Türsprechanlage mit HD-Kamera · Smartphone-Anbindung · Gegensprechfunktion von überall · Automatische Aufzeichnung · Türöffner-Integration | Beratung anfragen |
| **Brandschutz** | Rauchmelder nach DIN VDE · Vernetzte Brandwarnsysteme · Automatische Alarmierung · Regelmäßige Wartung & Prüfung · Gesetzliche Pflicht einfach erfüllt | Beratung anfragen |

**Close:** `Kostenlose Vor-Ort Beratung` — *Wir kommen zu Ihnen und analysieren Ihre Situation — unverbindlich und kostenfrei.* → **Jetzt Termin vereinbaren**

---

## 9. Lösungen — Gewerbekunden

**Design:** identical architecture to §8; 6 solution blocks + a 4-up advantages grid. Advantages block flips `data-theme="light"`.

```
EYEBROW  GEWERBEKUNDEN
H1       Professionelle Sicherheit für Ihr Unternehmen
LEAD     Skalierbare Sicherheitslösungen für Büros, Lagerhallen, Einzelhandel und
         Industrie — DSGVO-konform und versicherungsoptimiert.

EYEBROW  GEWERBLICHE LÖSUNGEN
H2       Sicherheit, die Ihr Business schützt
LEAD     Von der Zutrittskontrolle bis zur Videoüberwachung — alles aus einer Hand.
```

| Block | Bullets |
| --- | --- |
| **Alarmanlagen** | Hybride Ajax-Systeme für Gewerbeobjekte · Push-Alarmierung auf Smartphones aller Mitarbeiter · Mehrzonen-Absicherung · Fernzugriff & Benachrichtigungen · Integration mit bestehender Infrastruktur |
| **Videoüberwachung** | 4K-Kameras mit KI-Videoanalyse · Personen-/Fahrzeugerkennung · Zentrale Verwaltung mehrerer Standorte · DSGVO-konforme Speicherung · Skalierbar von 4 bis 128+ Kameras |
| **Zutrittskontrolle** | Fingerprint, RFID, PIN, App-basiert · Zeit- und zonenbasierte Berechtigungen · Protokollierung aller Zutritte · Besucher-Management · Integration mit Zeiterfassung |
| **Zeiterfassung** | Digitale Arbeitszeiterfassung · Gesetzeskonform nach EuGH-Urteil · Terminal- oder App-basiert · Export für Lohnbuchhaltung · Kombination mit Zutrittskontrolle |
| **Brandschutz** | Brandwarnanlagen nach DIN VDE · Aufschaltung auf Feuerwehr · Regelmäßige Wartung & Prüfung · Fluchtwegsicherung · Dokumentation für Versicherung |
| **NSL-Anbindung** | Vermittlung an Notruf-/Serviceleitstellen (NSL) · Technische Anbindung Ihrer Anlage · Optional: Video-Fernüberwachung · Reduzierung von Fehlalarmen · Wartung der Übertragungstechnik durch FT |

All CTAs: `Angebot anfragen` (Videoüberwachung uses `Produkte ansehen`).

**Ihre Vorteile — Warum Unternehmen uns vertrauen** (4-up, light theme):

| | Copy |
| --- | --- |
| **Compliance** | Alle Systeme DSGVO-konform geplant und dokumentiert — wichtig für Versicherungsanforderungen. |
| **Versicherungsvorteile** | Bis zu 30% Ersparnis bei der Versicherungsprämie durch zertifizierte Sicherheitstechnik. |
| **Fernzugriff** | Alle Standorte jederzeit im Blick — per App, Browser oder Leitstelle. |
| **Skalierbarkeit** | Von einem Büro bis zum Multi-Standort-Unternehmen — unsere Systeme wachsen mit. |

**Close:** `Individuelle Gewerbelösung anfragen` — *Wir erstellen Ihnen ein maßgeschneidertes Sicherheitskonzept für Ihr Unternehmen.*

---

## 10. Partner

**Design:** 4 major partners as `.card--bento` (36px radius, logo lockup + tag chips), then a 5-up quiet logo row. Pattern C throughout. Logos monochrome at rest, full colour on hover.

```
EYEBROW  UNSERE TECHNOLOGIEPARTNER
H1       Starke Partner für Ihre Sicherheit
LEAD     Wir arbeiten ausschließlich mit weltweit führenden Herstellern zusammen —
         für Systeme, die zuverlässig schützen und sich nahtlos in Ihr Gebäude
         integrieren.

EYEBROW  HAUPTPARTNER
H2       Unsere Technologiepartner im Detail
LEAD     Die führenden Hersteller, auf deren Produkte wir setzen — geprüft, bewährt
         und fachgerecht von uns installiert.
```

**Ajax Systems** — *Einbruchschutz · Videoüberwachung · Brandschutz · Smart Home*
> Europas meistausgezeichnetes kabelloses Alarmsystem. Ajax vereint Einbruchschutz, Videoüberwachung, Brandschutz und Smart-Home-Steuerung in einer einzigen App. Das proprietäre Jeweller-Funkprotokoll erreicht bis zu 2 km Reichweite bei bis zu 7 Jahren Batterielebensdauer.

**Dahua Technology** — *IP-Kameras · Videorekorder · KI-Analytik · Zutrittskontrolle*
> Weltweit zweitgrößter Hersteller für Videoüberwachung. Dahua bietet ein umfassendes Portfolio an IP-Kameras, Rekordern und KI-basierter Videoanalytik — von kompakten Dome-Kameras bis hin zu Thermal- und PTZ-Systemen für anspruchsvolle Gewerbeobjekte.

**Jablotron** — *Alarmanlagen · Brandmeldung · Smart Home · Hybrid-Technik*
> Tschechischer Hersteller mit über 30 Jahren Erfahrung in Eigenentwicklung und -produktion. Jablotron-Alarmanlagen sind bekannt für Zuverlässigkeit und intuitive Bedienung — inklusive App-Steuerung und bewährter Systeme für den deutschen Markt.

**Akuvox** — *Türsprechanlagen · Zutrittskontrolle · Gesichtserkennung · SIP / ONVIF*
> Weltweit führend bei SIP-basierten Video-Türsprechanlagen und Zutrittskontrolle. Akuvox bietet IP-Video-Türstationen mit KI-Gesichtserkennung, offenen Standards (SIP, ONVIF) und nahtloser Integration in bestehende Gebäudetechnik — ideal für Wohnanlagen und Gewerbe.

**Weiteres Portfolio:** HIKVISION (Videoüberwachung) · ABUS (Mechanik & Elektronik) · SIEDLE (Türkommunikation) · GIRA (Smart Home / KNX) · KNX (Gebäudeautomation)

**Warum FT Sicherheitstechnik?** (3-up)

| | Copy |
| --- | --- |
| **Herstellerunabhängige Beratung** | Wir sind keinem einzelnen Hersteller verpflichtet. Unsere Empfehlung basiert immer auf Ihren Anforderungen — objektiv, transparent und technisch fundiert. |
| **Zertifizierte Installation** | Unsere Techniker sind vom Hersteller geschult und zertifiziert. Jede Installation erfolgt normkonform nach aktuellen Standards — inklusive Dokumentation und Einweisung. |
| **Alles aus einer Hand** | Von der Bedarfsanalyse über die Planung und Installation bis zur Wartung und Notruf-Aufschaltung — Sie haben einen Ansprechpartner für alles. |

**Close:** `Lassen Sie sich beraten — herstellerunabhängig` — *Wir finden die passende Technologie für Ihr Objekt. Kostenlose Erstberatung vor Ort in der Metropolregion Rhein-Neckar.*

---

## 11. Produkte — FTronics catalogue

**Design:** sticky filter bar at `top:72px` (`Alle · Kameras · NVR & Rekorder · Zubehör`), uniform 3-up grid (2-up tablet, 1-up mobile). Filter changes use **FLIP** (`gsap.from` on position delta), never a hard re-render. Each card `data-rev`, 70ms stagger.

```
EYEBROW  FTRONICS EIGENMARKE
H1       FTronics — Unsere Eigenmarke
LEAD     Professionelle 4K-Kameras, NVR-Rekorder und Zubehör mit modernster
         KI-Technologie — 18 Produkte, alle NDAA-konform.
```

### Cameras (12)

| Model | Type | Description | Chips |
| --- | --- | --- | --- |
| **FC-8D Pro** | Dome IP | Kompakte Dome-Kamera mit 4K Auflösung und KI-Personenerkennung. Sony IMX415 Sensor. | 4K 8MP · IP67 · KI-Analyse · PoE |
| **FC-8D** | Dome IP | 4K Dome-Kamera mit Sony IMX415 Sensor und Personen-/Fahrzeugerkennung für Innen und Außen. | 4K 8MP · IP67 · PoE · Sony IMX415 |
| **FC-8D Zoom** | Dome IP | Premium Dome mit motorisiertem 2.8-8mm Zoom, Gesichtserkennung und vollständiger VCA KI-Suite. | 4K 8MP · IP67 · Gesichtserkennung · Motorzoom |
| **FC-6Z Mini** | Mini-PTZ Dome | Kompakte vandalismusgeschützte Mini-PTZ mit 3x Zoom und vollständiger KI-Suite inkl. Gesichtserkennung. | 6MP · IP67 · 3x Zoom · 100dB WDR |
| **FB-8A Pro** | Bullet IP | Premium Bullet mit vollständiger VCA KI-Suite: Gesichts-, Personen-, Fahrzeug- und Haustier-Erkennung. | 4K 8MP · IP67 · Gesichtserkennung · PoE |
| **FB-8A Max** | Bullet IP | Premium Bullet mit aktiver Abschreckung (Rot/Blau LEDs), Gesichtserkennung und Dual-Light. | 4K 8MP · IP67 · Dual-Light · 100dB WDR |
| **FB-8B** | Bullet IP | Leistungsstarke 4K Bullet-Kamera mit Sony IMX415 Sensor und 30fps für kristallklare Aufnahmen. | 4K 8MP@30fps · IP67 · PoE · Sony IMX415 |
| **FT-8C Pro** | Turret IP | Turret-Kamera mit 24/7 Farbbildgebung, F1.0 Blende und Gesichtserkennung für beste Nachtsicht. | 4K 8MP · IP67 · Gesichtserkennung · F1.0 |
| **FT-8P Dual** | 180° Panorama Turret | Dual-Objektiv Panoramakamera mit 180° Weitwinkel, aktiver Abschreckung und Zweiwege-Audio. | 8MP 180° · IP67 · Dual-Light · 2-Wege Audio |
| **FP-8T 20X** | PTZ Speed Dome | Professionelle PTZ mit 20x Zoom, Auto-Tracking, Dual-Light (IR 100m + Warmlicht 50m) und KI-Suite. | 4K 8MP · IP67 · Auto-Tracking · IR 100m |
| **FP-8S 25X** | PTZ Speed Dome | Leistungsstarke PTZ mit 25x Zoom, Auto-Tracking und 100m IR-Nachtsicht für große Flächen. | 4K 8MP · IP66 · 25x Zoom · IR 100m |
| **FE-6L** | Aufzugkamera | Kompakte Aufzugkamera mit 6MP Auflösung und KI-Erkennung, speziell für Fahrstühle und enge Räume. | 6MP · IP65 · PoE · Sony CMOS |

### Recorders (5)

| Model | Type | Description | Chips |
| --- | --- | --- | --- |
| **FN-8** | 8-Kanal 4K NVR | Kompakter 8-Kanal NVR mit 4K Aufzeichnung, Ultra 265 und VCA Analysefunktionen. | 4K · 8 Kanäle · 1x SATA 8TB · VCA |
| **FN-16** | 16-Kanal 4K NVR | Leistungsstarker 16-Kanal NVR mit 2x SATA für bis zu 16TB und ANR Technologie. | 4K · 16 Kanäle · 2x SATA 16TB · ANR |
| **FN-32** | 32-Kanal 4K NVR | Professioneller 32-Kanal NVR für große Anlagen mit 16-Kanal Wiedergabe und VCA Analyse. | 4K · 32 Kanäle · 2x SATA 16TB · VCA |
| **FN-64 Pro** | 64-Kanal Profi-NVR | Enterprise-NVR mit 64 Kanälen, RAID-Support, 8x SATA und Kennzeichenerkennung. | 12MP · 64 Kanäle · RAID · 8x SATA |
| **FR-8X** | 8-Kanal Hybrid XVR | Vielseitiger Hybrid-XVR für TVI, AHD, CVI und IP mit 4K HDMI-Ausgang und KI-Erkennung. | 4K HDMI · 8+16 Kanäle · H.265 · Hybrid |

### Accessories (1)

| Model | Type | Description | Chips |
| --- | --- | --- | --- |
| **FS-30** | IP-Lautsprecher | 30W IP-Hornlautsprecher mit 130 dBSPL für Alarm-Durchsagen und NVR-Kopplung. | 30W · IP66 · 130 dBSPL · PoE |

**Close:** `Interesse an unseren Produkten?` — *Wir beraten Sie gerne und erstellen Ihnen ein individuelles Angebot.* → **Angebot anfragen**

> ⚠️ **Only 2 of 18 have detail pages.** Every card links `Details ansehen`. Until the other 16 exist, route them to `/kontakt?produkt=<sku>` or disable the link — do not ship 16 dead ends.

---

## 12. Produktdetail — FC-8D Pro

**Design:** the flagship page. Three scroll set-pieces:
1. **Hero** — product render parks `large-pin-center`, spec strip below.
2. **Exploded view** — Pattern B scrubbed video across 3vh, six component captions crossfading (`large-pin-center-left`).
3. **Sensor comparison** — draggable before/after slider, `clip-path: inset()` driven by pointer.

Then a sticky spec-table nav and the download block.

```
BREADCRUMB  Start › Produkte › FTronics FC-8D Pro
EYEBROW     FTRONICS · PRO-SERIE
H1          FC-8D Pro
SUB         4K Klarheit. Sony-Sensor. Industrie-tauglich.
            Die Dome-Kamera, die nichts übersieht.
TAGLINE     Für Profis entwickelt. Made for FT.
CTA         Beratung anfragen

SPEC STRIP  8MP (4K Ultra HD · 30 fps) · Sony (IMX415 Industrie-Sensor)
            IP67 (Staub- & strahlwassergeschützt) · NDAA (Konform · Behördentauglich)
```

**Premium-Qualität — Nicht für die Schublade. Für den Einsatz.**
> FTronics-Kameras werden nicht für Privatkunden mit Smart-Home-Spielereien entwickelt. Sie entstehen für reale, anspruchsvolle Industrie- und Gewerbeumgebungen — wo eine verpasste Sekunde echte Folgen hat. Aluminium-Druckgussgehäuse, gehärtetes Sichtglas, IK10-Vandalismusschutz und industrielle Steckverbinder sorgen dafür, dass jede Kamera jahrelang exakt das tut, wofür sie konzipiert wurde: zuverlässig sehen.

**Sony Starvis IMX415 — Ein Sensor, der für Industrieanwendungen entwickelt wurde.**
> Der Sony Starvis IMX415 ist kein Smartphone-Sensor. Er ist ein 1/2,8" Back-Illuminated CMOS-Sensor, entwickelt für professionelle Überwachung in Industrieanlagen, Logistik-Zentren und kritischer Infrastruktur. Das Ergebnis: gestochen scharfes 4K bei Tag, brillante Farben bei Dämmerung und sauberes, rauscharmes Bild auch bei minimaler Beleuchtung. Wo andere Kameras blind werden, sieht die FC-8D Pro weiter.

**Intelligente Erkennung — Sie sieht. Sie versteht. Sie entscheidet.**
> Die integrierte KI-Engine unterscheidet zwischen Person, Fahrzeug und harmlosem Bewegungsereignis. Fehlalarme durch Blätter, Tiere oder Lichtwechsel? Vorbei. Die FC-8D Pro alarmiert nur dann, wenn es relevant ist — und das in Echtzeit, direkt auf dem Gerät, ohne Cloud-Abhängigkeit.

| Feature | Copy |
| --- | --- |
| **Personen­erkennung** | Erkennt Personen, ignoriert Tiere und Bewegungs­fehler. Drastisch weniger Fehlalarme im Live-Betrieb. |
| **Fahrzeug­erkennung** | Unterscheidet Lkw, Pkw und Zweirad. Ideal für Werkstore, Tankstellen und Logistik. |
| **Linien­überschreitung** | Virtuelle Zäune und Bereichsalarme. Wer eine Schutzlinie überschreitet, löst sofort den Alarm aus. |

**Component Analysis — Sechs Bauteile. Eine Industrie-Klasse.**
> Wir zerlegen die FC-8D Pro bis auf die Schraube — und zeigen warum jedes Detail Industrie-Standard ist, nicht Smart-Home-Spielerei.

| # | Component | Copy | Badge |
| --- | --- | --- | --- |
| 01 | **Dome-Glas** | Polycarbonat-Kuppel mit Anti-Reflex-Beschichtung. Stoßfest gegen 5 Joule Aufprall — widersteht Hammerschlägen, Steinwürfen, Vandalismus. | IK10 · Vandalismus-Schutz |
| 02 | **Sony Starvis IMX415** | 1/2,8″ CMOS-Sensor mit ultra-niedriger Lichtempfindlichkeit. 4K bei 25 fps — entwickelt für professionelle Überwachung. | 4K · Starvis · 25 fps |
| 03 | **Varifocal-Objektiv** | Motorisierte 2,8–12 mm Optik mit Autofokus. F/1,6 Lichtstärke für maximale Detailtiefe bei Tag und Dämmerung. | 2.8–12 mm · F/1.6 |
| 04 | **Smart IR · 18 LEDs** | Intelligente Infrarot-Beleuchtung mit dynamischer Anpassung. Bis 30 m Reichweite ohne Überbelichtung im Nahbereich. | Bis 30 m · 850 nm |
| 05 | **Onboard-KI-Chip** | Personen- und Fahrzeug-Klassifikation direkt auf der Kamera. Keine Cloud-Anbindung, keine Latenz, keine Daten-Lecks. | AI · Local · No Cloud |
| 06 | **Aluminium-Druckguss** | Korrosionsbeständige Basis aus Aluminium-Druckguss. Wasser- und staubdicht nach IP67 — freigegeben für Außen-Einsatz bei jeder Witterung. | IP67 · Aluminium · −30 bis +60 °C |

**Counters:** `6 × Industrie-Komponenten` · `100 % NDAA-konform` · `0 · Cloud-Abhängigkeit`

**Wetterfest — Schnee. Hitze. Vandalismus. Egal.**
> −30 °C bis +60 °C Betriebs­temperatur. IP67 gegen Staub und Strahlwasser. IK10 gegen mechanische Einwirkung. Diese Kamera ist nicht für die Veranda gemacht — sie wurde für Werks­tore, Außenanlagen und exponierte Standorte entwickelt, an denen normale Kameras längst aufgegeben hätten.

### Technische Daten

**Sensor & Bild** — Bildsensor `1/2,8″ Sony Starvis IMX415 CMOS` · Effektive Pixel `3840 × 2160 (8 MP)` · Bildrate `bis 30 fps bei 4K Ultra HD` · Min. Beleuchtungsstärke `0,003 Lux (Farbe) · 0 Lux (mit IR)` · Dynamikumfang `120 dB WDR` · SoC `Sigmastar SSC339G`

**Optik & Nachtsicht** — Brennweite `2,8 mm Festoptik (auf Anfrage 3,6 mm / 6 mm)` · Blende `F1.6` · Sichtfeld `H ≈ 110° · V ≈ 58°` · IR-Reichweite `bis 30 m, 18× SMD IR-LEDs` · Smart IR `Adaptive IR-Steuerung`

**Schutz & Konstruktion** — Schutzklasse `IP67` · Vandalismusschutz `IK10` · Gehäuse `Aluminium-Druckguss mit gehärtetem Sichtglas` · Betriebstemperatur `−30 °C bis +60 °C` · Luftfeuchtigkeit `≤ 95 % nicht kondensierend`

**Netzwerk** — Stromversorgung `PoE IEEE 802.3af · alternativ 12 V DC` · Leistungsaufnahme `≤ 7 W` · Schnittstellen `RJ45 10/100 Mbps · MicroSD bis 512 GB` · Kompression `H.265+ / H.265 / H.264+ / H.264 / MJPEG` · Protokolle `ONVIF 23.12 (S/G/T) · RTSP · HTTPS · TCP/IP · IPv4/IPv6 · NTP` · NDAA `Vollständig`

**Downloads:** *Datenblatt für Ihre Unterlagen.* — Komplettes PDF mit allen technischen Parametern, Maßzeichnung und Anschluss­diagramm. → `FC-8D Pro Datenblatt (PDF · ca. 800 KB)`

**Close:** `Bereit für eine Beratung?` — *Unsere Sicherheits­experten planen Ihr System individuell — von der einzelnen Kamera bis zur kompletten Anlage mit Aufschaltung.*

> ⚠️ **Resolve before build:** spec table says **30 fps**, component card 02 says **25 fps**. Spec table says **fixed 2.8 mm**, component card 03 says **motorised 2.8–12 mm varifocal**. Pick one of each.

---

## 13. Produktdetail — FB-8A Pro

**Design:** same template as §12 minus the exploded sequence (use a 4-image `pin-center` gallery instead). Tab bar: `Übersicht · Technische Daten · KI-Funktionen · Downloads` — sticky at `top:72px`, active tab underline in `--ft-signal-500`.

```
EYEBROW  FTRONICS · PRO-SERIE
H1       FB-8A Pro
SUB      4K Bullet-Kamera mit voller KI-Suite.
         Gesichts-, Personen- & Fahrzeug-Erkennung.
TAGLINE  Für Profis entwickelt. Made for FT.
STRIP    8MP (4K Ultra HD · 25 fps) · Sony IMX415 · IP67 · NDAA
```

**Übersicht**
> Die FTronics FB-8A Pro ist unsere leistungsstärkste Bullet IP-Kamera mit einer umfassenden KI-Suite, die speziell für anspruchsvolle Sicherheitsanforderungen entwickelt wurde. Ausgestattet mit dem Sony IMX415 Sensor und dem fortschrittlichen Sigmastar SSC378DE SoC bietet sie eine beeindruckende Bandbreite an intelligenten Analysefunktionen.
>
> Mit der integrierten Gesichtserkennung, Perimeterüberwachung und Linienüberschreitung geht die FB-8A Pro weit über einfache Videoüberwachung hinaus. Sie erkennt Personen, Fahrzeuge, Motorräder und sogar Haustiere — und kann bei Alarm automatisch LED-Blitzlicht, Sirene oder Aufnahmen auslösen.
>
> Das robuste Bullet-Gehäuse mit IP67-Schutzklasse macht die Kamera zur idealen Wahl für Außengelände, Grundstücksüberwachung und gewerbliche Anwendungen. Die Kombination aus 4K-Auflösung und fortschrittlicher KI liefert maximale Sicherheit bei minimalem Installationsaufwand dank PoE.

**Hauptmerkmale** (6-up grid)

| Feature | Copy |
| --- | --- |
| **Gesichtserkennung** | Erkennt Gesichter in 1-5m Entfernung mit Mindestgröße 12px für zuverlässige Identifikation und Zugangskontrolle. |
| **Volle KI-Suite** | 6 intelligente Analysefunktionen: Gesichts-, Personen-, Fahrzeug-, Haustier-Erkennung plus Linienüberschreitung und Perimeter. |
| **4K Ultra HD** | 3840×2160 Pixel bei 20fps (8MP) oder 30fps bei 6MP/5MP/4MP für flexible Konfiguration. |
| **IP67 Wetterfest** | Vollständig staub- und wasserdicht mit 4000V Blitzschutz — optimiert für den dauerhaften Außeneinsatz. |
| **Perimeterüberwachung** | 4 konfigurierbare Zonen für Eindringungserkennung mit Alarm-Auslösung über LED, Sirene oder Aufnahme. |
| **Linienüberschreitung** | 4 virtuelle Linien für richtungsgebundene Erkennung — ideal für Eingangszählung und Zugangskontrolle. |

**Einsatzbereiche:** Außengelände · Grundstücksüberwachung · Gewerbe · Parkplätze · Perimeter

**Technische Daten** — Bildsensor `1/2.8" 8MP Sony IMX415 CMOS` · SoC `Sigmastar SSC378DE` · Verschlusszeit `AUTO / 1/10s – 1/8000s` · WDR `Ja` · DNR `2D / 3D` · Videostandard `H.264 / H.265` · Hauptstream `20fps @ 8MP, 30fps @ 6MP/5MP/4MP` · Substream `10fps @ 720P / 30fps @ D1` · Bitrate `64 kbps – 8 Mbps` · Privatzonenmasken `4` · ROI `8 pro Stream` · ONVIF `23.12 (S/G/T/M)` · P2P `Ja` · PC-Client `GuardStation VMS` · Mobile App `Guard Viewer (Android / iOS)`

**KI / Intelligente Analyse** — Gesichtserkennung `1-5m, min. 12px – max. 1000px` · Personenerkennung `2-20m` · Fahrzeugerkennung `2-20m` · Linienüberschreitung `4 Linien` · Perimeterüberwachung `4 Bereiche` · Haustier-Erkennung `Ja` · Max. Ziele `16 gleichzeitig` · Zieltypen `Mensch, Fahrzeug, Nicht-motorisiert, Haustier, Gesicht` · Alarm-Auslöser `Schnappschuss, Aufnahme, Rot-Blau LED, Weiß-LED, Sirene`

**Objektiv & IR** `2.8mm / 3.6mm Festbrennweite · 18 SMD LEDs · 20–30m` · **Audio** `G.711 / AAC, Mikrofon eingebaut` · **Allgemein** `12V DC / PoE 802.3af · < 8W · −20 °C bis +60 °C · IP67 · Blitzschutz 4000V`

> ⚠️ **Resolve:** JSON-LD claims *Motorisiertes Varifokal-Objektiv*; the spec table lists a **fixed** 2.8/3.6 mm lens. Also reconcile FB-8A's P2P cloud access against FC-8D Pro's "Keine Cloud-Abhängigkeit" positioning — pick one company stance.

---

## 14. Konfigurator

**Design:** the highest-value interactive component. 4 steps, each a horizontal slide (`translateX ±24px` + fade, `--dur-3`, `--ease-out`). Progress bar in `--ft-signal-500`. Selections are **large tappable cards, not radio buttons** (min 96px tall). Running summary always visible on desktop (right rail), collapsible on mobile.

```
EYEBROW  SYSTEM-KONFIGURATOR
H1       Ihr individuelles Sicherheits­konzept
LEAD     In nur 4 Schritten zu Ihrem persönlichen Angebot — kostenlos und
         unverbindlich.
```

| Step | Question | Sub | Options |
| --- | --- | --- | --- |
| 1 | **Was möchten Sie schützen?** | Schritt 1 von 4 — Wählen Sie Ihren Objekttyp | Wohnung · Haus · Büro · Lagerhalle · Geschäft |
| 2 | **Welche Bereiche möchten Sie absichern?** | Schritt 2 von 4 — Mehrfachauswahl möglich | Außenbereich · Innenbereich · Eingang · Garage · Garten |
| 3 | **Welche Funktionen benötigen Sie?** | Schritt 3 von 4 — Mehrfachauswahl möglich | Alarmanlage · Videoüberwachung · Zutrittskontrolle · Smart Home · Brandschutz |
| 4 | **Ihre Zusammenfassung** | Schritt 4 von 4 — Prüfen Sie Ihre Auswahl und senden Sie Ihre Anfrage | summary + form |

**Step 4 summary labels:** `Ihre Auswahl` → `Objekttyp` · `Bereiche` · `Funktionen`
**Form:** `Unverbindliches Angebot anfordern` · fields `Name *` · `E-Mail *` · `Telefon` · `Anmerkungen` · consent `Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *`
**Nav:** `Zurück` · `Weiter` · submit `Unverbindliches Angebot anfordern`

---

## 15. Ratgeber

**Design:** `data-theme="light"` — the only fully light page. Editorial layout, 680px measure, 1.6 line-height, reading-progress bar at top. Article cards in a 2-up grid, Pattern C.

```
EYEBROW  WISSEN & RATGEBER
H1       Sicherheit beginnt mit Wissen
LEAD     Praktische Tipps, Expertenwissen und aktuelle Informationen rund um
         Einbruchschutz, Videoüberwachung, Smart Home und Brandschutz — direkt von
         unseren Fachberatern.

EYEBROW  RATGEBER & FACHARTIKEL
H2       Aktuelles aus der Sicherheitsbranche
LEAD     Von Einbruchschutz bis KI-Technologie — unsere Fachartikel helfen Ihnen, die
         richtige Entscheidung für Ihre Sicherheit zu treffen.
```

| Category | Article | Teaser |
| --- | --- | --- |
| Alarmanlagen & Einbruchschutz | **Einbruchschutz im Urlaub 2026: Was die Statistik in Mannheim zeigt und wie Technik hilft** | Einbruchschutz im Urlaub 2026: Aktuelle Zahlen aus Mannheim, Checkliste sowie Tipps zu Alarmanlage, Videoüberwachung und KfW-Förderung für ein sicheres Zuhause. |
| Einbruchschutz | **5 Tipps gegen Einbruch — so schützen Sie Ihr Zuhause** | Laut Polizeistatistik scheitern über 45 % aller Einbruchsversuche an wirksamer Sicherheitstechnik. Erfahren Sie, welche Maßnahmen Ihr Zuhause effektiv schützen — von mechanischer Sicherung bis zur smarten Alarmanlage. |
| Videoüberwachung | **Welche Kamera für welchen Einsatz? Ein Überblick** | Dome, Bullet oder PTZ — jeder Kameratyp hat seine Stärken. Wir erklären die Unterschiede, typische Einsatzbereiche und worauf Sie bei Auflösung, Nachtsicht und Wetterschutz achten sollten. |
| Recht & Datenschutz | **DSGVO und Videoüberwachung — was ist erlaubt?** | Videoüberwachung unterliegt strengen Datenschutzregeln. Wir erläutern die rechtlichen Anforderungen für private und gewerbliche Videoüberwachung in Deutschland — von Kennzeichnungspflicht bis Speicherdauer. |
| Smart Home | **Smart Home Sicherheit: Alarmanlagen mit App-Steuerung** | Moderne Alarmsysteme lassen sich per Smartphone steuern und in bestehende Smart-Home-Systeme integrieren. Erfahren Sie, wie App-Steuerung, Push-Benachrichtigungen und Automatisierungen Ihren Alltag sicherer machen. |
| Brandschutz | **Brandschutz für Privathaushalte: Pflichten und Empfehlungen** | Die Rauchmelderpflicht gilt in allen Bundesländern — doch welche Geräte sind empfehlenswert? Wir erklären die gesetzlichen Vorgaben, den richtigen Montageort und warum vernetzte Brandwarnanlagen den entscheidenden Unterschied machen. |
| Technologie | **KI in der Videoüberwachung: Person- und Fahrzeugerkennung** | Intelligente Kameraanalyse erkennt Personen und Fahrzeuge in Echtzeit und reduziert Fehlalarme um bis zu 95 %. Wir zeigen, wie KI-basierte Videoüberwachung funktioniert und welche Vorteile sie für Privat- und Gewerbekunden bietet. |

**Close:** `Bleiben Sie informiert` — *Sie haben Fragen zu einem unserer Themen oder wünschen eine persönliche Beratung? Unser Expertenteam steht Ihnen jederzeit zur Verfügung.*

> 🚫 **BLOCKED — do not ship.** These are seven teasers with `Mehr erfahren` / `Weiterlesen` buttons and **no article pages behind them.** The meta description promises "Kostenlos lesen!". Either write the seven articles or remove the section. This is the single largest content gap on the site.

---

## 16. FAQ

**Design:** filter chips + accordion. Use `grid-template-rows: 0fr → 1fr` for the expand transition (animatable, unlike `height:auto`). Built on `<details>`/`<summary>` for keyboard access and SEO. Numbered `01`–`31`. Chevron rotates 180° over `--dur-2`.

```
EYEBROW  HÄUFIG GESTELLTE FRAGEN
H1       Alle Antworten auf einen Blick
LEAD     Von Alarmanlagen über Videoüberwachung bis Smart Home — hier finden Sie
         Antworten auf die wichtigsten Fragen rund um moderne Sicherheitstechnik.
FILTERS  Alle · Alarmanlagen · Videoüberwachung · Brandschutz · Smart Home ·
         Kosten & Förderung · Wartung & Service
```

### Alarmanlagen (10)

1. **Was bringt eine Alarmanlage wirklich?** — Eine Alarmanlage registriert frühzeitig Signale, die auf Gefahren wie Einbrüche oder Brände hinweisen, und minimiert so den Schaden. Sie verhindert Einbrüche zwar nicht direkt, erhöht aber das Entdeckungsrisiko für Einbrecher erheblich und wirkt stark abschreckend. Die Kombination aus Sirene, Aufschaltung auf eine Notruf- und Serviceleitstelle und schneller Reaktion ist entscheidend.
2. **Welche Arten von Alarmanlagen gibt es?** — Grundsätzlich unterscheiden wir zwischen kabelgebundenen Alarmanlagen (ideal für Neubau), Funkalarmanlagen (perfekt für Nachrüstung) und Hybridanlagen, die beide Technologien kombinieren. Von klassischen Einbruchmeldeanlagen bis zu vernetzten Komplettlösungen mit Brandmeldung, Zutrittskontrolle und Videoüberwachung bieten wir ein breites Spektrum an.
3. **Welches Setup benötige ich für eine Funkalarmanlage?** — Das benötigte Setup hängt von der Anzahl der Räume, der Grundstücksgröße, den Eingangstüren und Fenstern sowie Ihrem individuellen Sicherheitsbedürfnis ab. In jedem Fall wird eine Zentrale (Hub) benötigt. Für jeden zu überwachenden Raum empfehlen wir mindestens einen Bewegungsmelder, für den Außenbereich reichen meist 2–3 Außenmelder. Die Bedienung erfolgt bequem per App oder Keypad.
4. **Welche technischen Voraussetzungen brauche ich für eine Funkalarmanlage?** — Moderne Funkalarmanlagen benötigen lediglich einen LAN/WLAN-Anschluss für die Datenübertragung sowie einen Stromanschluss für die Zentrale. Alle Sensoren und Melder verbinden sich kabellos per Funk mit der Zentraleinheit — es müssen keine Kabel durchs Haus verlegt werden.
5. **Muss bei der Installation einer Funkalarmanlage gebohrt werden?** — In der Regel nicht. Funkalarmanlagen werden kabellos und ohne Bohren oder Stemmen installiert — ideal für Mietwohnungen und Bestandsbauten. Falls Komponenten auf Kundenwunsch fest verbaut werden sollen, lässt sich Bohren nicht immer vermeiden. Wir beraten Sie gerne individuell.
6. **Wie lange dauert die Installation einer Alarmanlage?** — Je nach Größe und Ausstattung des Objekts dauert die Installation in der Regel 30–60 Minuten. Bei größeren Gewerbeimmobilien kann die Montage entsprechend länger dauern. Wir vereinbaren vorab einen festen Termin und informieren Sie über den genauen Zeitaufwand.
7. **Wie wird eine moderne Alarmanlage bedient?** — Über die Smartphone-App, per PIN-Code oder Transponder. Es können mehrere Nutzer mit individuellen Rechten angelegt werden. Die Scharfschaltung erfolgt wahlweise über eine Tastatur mit persönlichem Code, einen Funkschlüssel oder direkt per App — auch von unterwegs.
8. **Was passiert bei einem Stromausfall?** — Die von uns verbauten Systeme verfügen über eine Notstromversorgung (Akkupuffer) und bleiben auch bei Netzausfall voll funktionsfähig. Bei Unterbrechung der Stromversorgung wird der Zustand auf dem Bedienfeld und in der App angezeigt. So ist Ihre Anlage auch bei Sabotageversuch geschützt.
9. **Kann ich eine Alarmanlage bei einem Umzug mitnehmen?** — Ja, besonders Funkalarmanlagen lassen sich problemlos ummontieren und am neuen Wohnort neu installieren. Wir übernehmen auf Wunsch den Abbau und die Neuinstallation — sprechen Sie uns einfach an.
10. **Bieten Alarmanlagen-Attrappen ausreichend Sicherheit?** — Nein. Attrappen oder Dummies bieten keine ausreichende Sicherheit. Erfahrene Einbrecher erkennen diese Scheinsicherheit schnell. Wir empfehlen immer echte Alarmanlagen in Kombination mit mechanischen Sicherungen für einen wirksamen Schutz.

### Videoüberwachung (6)

11. **Darf ich mein eigenes Grundstück mit Kameras überwachen?** — Ja, die Videoüberwachung des eigenen Grundstücks ist grundsätzlich zulässig und durch das Hausrecht gedeckt. Wichtig: Die Beobachtung endet an den Grundstücksgrenzen — öffentlicher Raum und Nachbargrundstücke dürfen nicht miterfasst werden. Wir helfen Ihnen bei der DSGVO-konformen Positionierung.
12. **Wann gilt die DSGVO für private Videoüberwachung?** — Beschränkt sich die Überwachung auf den persönlichen oder familiären Bereich (z. B. die eigene Wohnung), gilt die DSGVO nicht. Sobald öffentlich zugängliche Bereiche wie Bürgersteige oder Nachbargrundstücke erfasst werden, greifen die datenschutzrechtlichen Voraussetzungen. Wir beraten Sie zu allen rechtlichen Anforderungen.
13. **Muss ich auf die Videoüberwachung hinweisen?** — Ja. Bei zulässiger Videoüberwachung müssen gut sichtbare Hinweisschilder angebracht werden. Diese müssen auf die Tatsache der Überwachung, die verantwortliche Stelle, den Zweck, die Speicherdauer und die Betroffenenrechte hinweisen. Wir stellen Ihnen passende Hinweisschilder zur Verfügung.
14. **Wie lange darf ich aufgezeichnete Videodaten speichern?** — Die DSGVO enthält keine konkrete Speicherfrist. In der Praxis haben sich 48–72 Stunden als Richtwert etabliert, mit automatischem Überschreiben. In begründeten Ausnahmefällen (z. B. Einbruch oder Betriebsferien) ist eine moderate Verlängerung möglich. Wir konfigurieren Ihre Systeme entsprechend.
15. **Darf ich neben Bild- auch Tonaufnahmen anfertigen?** — Nein. Die Rechtsgrundlagen für Videoüberwachung umfassen keine Tonaufnahmen. Falls die Kameratechnik eine Audiofunktion bietet, muss diese deaktiviert bleiben. Das unbefugte Abhören ist gemäß § 201 StGB strafbar. Wir deaktivieren die Audiofunktion bei der Installation standardmäßig.
16. **Welche Bereiche dürfen in einem Unternehmen überwacht werden?** — Erlaubt sind öffentlich zugängliche Bereiche wie Kundenparkplätze, Verkaufsflächen und Zufahrten. Nicht erlaubt ist die Überwachung von Toiletten, Umkleide- und Pausenräumen. Mitarbeiter müssen informiert werden, und eine dauerhafte Leistungskontrolle ist unzulässig. Wir planen die Kamerapositionen rechtssicher für Sie.

### Brandschutz (5)

17. **In welchen Räumen muss ich Rauchmelder anbringen?** — Der Gesetzgeber schreibt Rauchmelder in Schlafräumen und auf Fluchtwegen vor. Je nach Bundesland gibt es weitere Regelungen in den Landesbauverordnungen. Wir empfehlen die Montage in allen Aufenthaltsräumen für einen umfassenden Schutz und beraten Sie zu den geltenden Vorschriften in Baden-Württemberg.
18. **Gibt es Rauchmelder, die für die Küche geeignet sind?** — Ja. Spezielle Rauch-Hitze-Warnmelder sind für Küchen konstruiert — sie können Wasserdampf kondensieren und zwischen Kochhitze und einem tatsächlichen Feuer unterscheiden. Wir führen entsprechende Modelle und beraten Sie zur optimalen Platzierung.
19. **Wann muss ein Rauchmelder ausgetauscht werden?** — Rauchmelder müssen gemäß Herstellerangaben und DIN-Normen nach 10 Jahren ausgetauscht werden. Manche Modelle mit integrierten 10-Jahres-Batterien zeigen das Austauschende klar an. Wir erinnern unsere Wartungskunden rechtzeitig an den fälligen Austausch.
20. **Mein Rauchmelder piept, obwohl es nicht brennt — was tun?** — Vermutlich haben sich Staubpartikel oder Insekten im Sensor angesammelt. Nehmen Sie den Rauchmelder von der Decke und saugen Sie ihn mit dem Staubsauger auf höchster Stufe aus. Piept er regelmäßig alle 40 Sekunden, ist es wahrscheinlich ein Batteriewarnsignal — dann die Batterie austauschen.
21. **Können Rauchmelder mit einer Alarmanlage gekoppelt werden?** — Ja. Viele moderne Rauchmelder lassen sich nahtlos in Alarmanlagen integrieren. Welches Modell mit welcher Anlage kompatibel ist, hängt vom System ab. Wir setzen auf Rauchmelder, die sich direkt in unsere Sicherheitssysteme einbinden lassen, damit Sie im Brandfall sofort informiert werden.

### Smart Home (4)

22. **Was passiert bei einem Stromausfall bei einem Smart Home System?** — Die von uns installierten Smart Home Security-Systeme verfügen über redundante Kommunikationswege und Notstromversorgung (Akkupuffer). So funktionieren sie auch bei Stromausfall oder Sabotageversuch zuverlässig weiter. Redundante Alarmpfade via Netzwerk und Mobilfunk sorgen für zusätzliche Sicherheit.
23. **Ist die Einrichtung eines Smart Home Security Systems kompliziert?** — Einfache Komponenten können oft selbst installiert werden, komplexere Systeme erfordern professionelle Installation wegen Verkabelung, Sensorpositionierung und Integration. Wir übernehmen die fachgerechte Einrichtung und Konfiguration Ihres Systems komplett — inklusive App-Einweisung.
24. **Ist lokale Datenspeicherung sicherer als die Cloud?** — Lokale Speicherung bedeutet, dass Ihre Daten im eigenen Netzwerk bleiben und nicht bei externen Cloud-Anbietern gespeichert werden — das erhöht den Datenschutz. Wir setzen auf Systeme, die rein lokale Speicherung ohne Cloud-Zwang ermöglichen. Falls Cloud gewünscht ist, achten wir auf Ende-zu-Ende-Verschlüsselung und transparente Datenschutzrichtlinien.
25. **Können IP-Kameras in Smart Home Systeme integriert werden?** — Ja. Alle IP-Kameras und Rekorder, die RTSP zur Datenübertragung nutzen, können in moderne Sicherheitszentralen eingebunden werden. Je nach System können 10 bis 100 Videostreams verwaltet werden — alles steuerbar über eine zentrale App mit zuverlässiger Verschlüsselung.

### Kosten & Förderung (3)

26. **Was kostet eine Alarmanlage für ein Einfamilienhaus?** — Die Kosten für ein sachgemäßes Alarmsystem in einem Einfamilienhaus liegen erfahrungsgemäß zwischen ca. 1.300 € und 10.000 €, je nach Hersteller, Modell und Objektgröße. Hinzu kommen ggf. monatliche Kosten für die Aufschaltung auf eine Leitstelle und einen Wartungsvertrag. Wir erstellen Ihnen gerne ein individuelles Angebot.
27. **Welche laufenden Kosten entstehen beim Betrieb einer Alarmanlage?** — Der Betrieb ist bei Selbstüberwachung per App kostenfrei. Monatliche Gebühren fallen nur bei Aufschaltung auf einen Sicherheitsdienst oder bei Mobilfunk-Benachrichtigungen an. Die Kosten für eine Leitstellenanbindung liegen bei ca. 30–70 € pro Monat. Wir beraten Sie transparent zu allen Optionen.
28. **Wie fördert die KfW den Einbruchschutz?** — Die KfW fördert Einbruchschutzmaßnahmen über das Programm KfW 159 mit zinsgünstigen Krediten bis zu 50.000 € je Wohnung. Gefördert werden einbruchhemmende Türen und Fenster, Alarmanlagen, Kamerasysteme und intelligente Türschlösser. Wichtig: Der Antrag muss vor Auftragserteilung gestellt werden und die Ausführung durch einen Fachbetrieb wie uns erfolgen.

### Wartung & Service (3)

29. **Wie oft sollte eine Alarmanlage gewartet werden?** — Wir empfehlen mindestens eine jährliche Wartung — das entspricht dem gängigen Branchenstandard. Bei besonders sicherheitsrelevanten Objekten empfehlen wir halbjährliche Inspektionen. Alle Wartungsarbeiten werden in Protokollen dokumentiert, die wir Ihnen aushändigen.
30. **Was wird bei der Wartung einer Alarmanlage geprüft?** — Bei unserer Wartung prüfen wir systematisch: Übertragungswege und Aufschaltung, Signalgeber, Bedienelemente, Energieversorgung und Batterie, Scharf-/Unscharfschaltung, Beschädigungen und Verschmutzung, Bewegungsmelder (Gehtests) sowie Softwareupdates. So stellen wir die einwandfreie Funktion Ihrer Anlage sicher.
31. **Was kostet die Wartung einer Alarmanlage?** — Die jährlichen Wartungskosten liegen je nach Anlage zwischen 100 € und 500 €. Einfachere Systeme können für 100–150 € pro Jahr gewartet werden, komplexere Anlagen kosten 200–500 € jährlich. Wir bieten transparente Wartungsverträge mit festen Konditionen — fragen Sie uns nach einem Angebot.

**Close:** `Ihre Frage nicht dabei?` — *Kontaktieren Sie uns — wir beantworten Ihre Fragen persönlich und beraten Sie individuell.*

---

## 17. Support & Downloads

**Design:** two download cards side by side, a remote-support card, then a filterable tutorial gallery (Pattern E).

```
EYEBROW  SUPPORT & DOWNLOADS
H1       Hilfe & Downloads für Ihre FTronics-Geräte
LEAD     Kostenlose Software-Downloads, Video-Tutorials und Remote-Support — alles
         was Sie für die Einrichtung und Bedienung Ihrer Sicherheitstechnik brauchen.

EYEBROW  SOFTWARE DOWNLOADS
H2       Steuerungssoftware für Ihre Kameras
LEAD     Guard Station — die zentrale Software zur Verwaltung Ihrer FTronics
         Videoüberwachung.
```

**Guard Station für Windows** (`.exe — Windows 10/11`) and **Guard Station für Mac** (`.pkg — macOS 11+`), both listing:
- Live-Ansicht und Wiedergabe für bis zu 64 Kameras
- Integrierte Zeitplanverwaltung und Ereignisprogrammierung
- Remote-Konfiguration
- Einfacher Datenexport über integrierten Downloadmanager
- Snapshots und Sofortaufnahmen direkt aus der Live-Ansicht
- Verwaltung von bis zu 50 Benutzern

**Remote-Support**
> Für schnelle Hilfe aus der Ferne nutzen wir AnyDesk. Laden Sie die Software herunter und teilen Sie uns Ihre ID mit — unsere Techniker verbinden sich direkt mit Ihrem System.
→ `AnyDesk herunterladen` (Kostenlos — Windows, Mac, Android)

**FTronics Akademie** — *Schritt-für-Schritt-Anleitungen für Ihre Sicherheitstechnik — direkt von unseren Experten.*
Filters: `Alle · Guard Station · Guard Viewer · Türsprechanlage`

| Tutorial | Category |
| --- | --- |
| Cloud-Anmeldung | Guard Station |
| Aufnahmen anschauen | Guard Station |
| Zeiteinstellung | Guard Viewer App |
| Videos abspielen | Guard Viewer App |
| Push-Benachrichtigung aktivieren | Guard Viewer App |
| Meldungen löschen | Guard Viewer App |
| Türsprechanlage in App einlernen | Türsprechanlage |
| Push-Benachrichtigung aktivieren (DMSS) | Türsprechanlage |

**Close:** `Noch Fragen? Wir helfen gerne` — *Unser Support-Team steht Ihnen bei allen Fragen rund um Installation und Bedienung zur Seite.*

---

## 18. Karriere

**Design:** the one page in informal **du**. Warmer treatment — real team photography, lighter dark surface (`--bg-raised`). Job cards expand in place (`grid-template-rows` transition), not to a new route.

```
EYEBROW  KARRIERE BEI FT
H1       Gestalte Sicherheit mit uns
LEAD     Werde Teil eines wachsenden Teams in der Metropolregion Rhein-Neckar
CTA      Offene Stellen ansehen  ·  Initiativbewerbung
```

**Was uns als Arbeitgeber auszeichnet** (4-up)

| | Copy |
| --- | --- |
| **Zukunftssichere Branche** | Sicherheitstechnik wächst stetig — eine Branche mit langfristiger Perspektive und krisenfesten Arbeitsplätzen. |
| **Abwechslungsreiche Projekte** | Von Privathäusern bis Industrieanlagen — jedes Projekt bringt neue Herausforderungen und Erfahrungen. |
| **Moderne Technologie** | Arbeit mit Ajax, Dahua, KI-Kameras, Smart Home — immer am Puls der neuesten Sicherheitstechnik. |
| **Familiäres Team** | Flache Hierarchien, direkter Kontakt zum Geschäftsführer — bei uns bist du kein Nummernschild, sondern ein geschätztes Teammitglied. |

**Servicetechniker Sicherheitstechnik (m/w/d)** — Vollzeit · Mannheim & Metropolregion Rhein-Neckar

*Aufgaben:* Installation & Wartung von Alarmanlagen, Videoüberwachungssystemen, Zutrittskontrolle und Smart-Home-Systemen · Programmierung und Inbetriebnahme · Kundeneinweisung · Fehlerdiagnose und Reparatur
*Qualifikationen:* Abgeschlossene Ausbildung als Elektroniker, Elektroinstallateur, IT-Systemelektroniker oder vergleichbar · Erfahrung mit Netzwerktechnik (IP, PoE) von Vorteil · Führerschein Klasse B · Deutschkenntnisse · Teamfähigkeit und Kundenorientierung
*Wir bieten:* Unbefristeter Vertrag · Firmenfahrzeug · Weiterbildungen und Zertifizierungen · Moderne Werkzeuge und Ausstattung · Leistungsgerechte Vergütung

**Auszubildender Elektroniker für Sicherheitstechnik (m/w/d)** — Ausbildung · Mannheim

*Was dich erwartet:* Praxisnahe Ausbildung in einem wachsenden Unternehmen · Arbeit mit modernster Sicherheitstechnik · Begleitung durch erfahrene Techniker · Übernahmechance nach der Ausbildung
*Was du mitbringst:* Mittlere Reife oder Abitur · Interesse an Technik und Elektronik · Handwerkliches Geschick · Zuverlässigkeit und Teamfähigkeit

**Bewerbungsprozess — In 3 Schritten zum neuen Job**
1. **Bewerbung senden** — Schick uns deine Bewerbung per E-Mail an karriere@ftst.eu — Lebenslauf genügt, kein langes Anschreiben nötig.
2. **Kennenlerngespräch** — Wir melden uns zeitnah bei dir und laden dich zu einem persönlichen Gespräch ein — entspannt und auf Augenhöhe.
3. **Probearbeitstag & Start** — Lerne das Team und die Arbeit kennen. Wenn es für beide Seiten passt, steht deinem Start nichts mehr im Weg.

**Close:** `Jetzt bewerben` — *Bereit für den nächsten Schritt? Schick uns deine Bewerbung — wir freuen uns auf dich!* → `Bewerbung per E-Mail senden` · *Oder ruf uns an: +49 621 159 647 34*

---

## 19. Kontakt

**Design:** two-column — form left (7 cols), contact facts + map right (5 cols). Map lazy-loaded, dark-styled, `aspect-ratio: 4/3`. Form fields Pattern C stagger.

```
EYEBROW  KONTAKT
H1       Sprechen Sie mit uns
LEAD     Wir beraten Sie persönlich und unverbindlich. Antwort innerhalb von
         24 Stunden garantiert.

KONTAKTDATEN
  E-Mail    info@ftst.eu
  Telefon   +49 621 159 647 34
  Adresse   Hafenbahnstraße 15, 68305 Mannheim
  Öffnungszeiten   Mo–Fr · 08:00–17:00        ← ADD THIS (currently JSON-LD only)
  Badge     ⏱ Antwort innerhalb von 24 Stunden
```

**Anfrage senden**

| Field | Type | Options |
| --- | --- | --- |
| Name * | text | — |
| E-Mail * | email | — |
| Telefon | tel | — |
| Betreff * | select | Bitte wählen... / Alarmanlage / Videoüberwachung / Zutrittskontrolle / Smart Home / Brandschutz / Sonstiges |
| Kundentyp | radio | Privat / Gewerbe |
| Nachricht * | textarea | — |
| Consent * | checkbox | Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. |

Submit: `Anfrage senden`

---

## 20. Legal pages

**Design:** minimal. Single 680px column, `--bg` ground, `--t-body` at 1.6, H2s at `--t-h4`. Back link at top. No motion beyond a single fade-in.

**Impressum** — `Angaben gemäß § 5 TMG`: Hüseyin Gökcay · FT Sicherheitstechnik · Hafenbahnstraße 15 · 68305 Mannheim. Kontakt: Telefon `0621 159 647 34` · Telefax `0621 762 207 36` · E-Mail `info@ftst.eu`. USt-IdNr. `DE301351179`. Berufshaftpflicht: andsafe AG, Provinzial-Allee 1, 48159 Münster, Geltungsraum Deutschland. Redaktionell verantwortlich: Hüseyin Gökcay. Plus EU-Streitschlichtung and Verbraucherstreitbeilegung clauses.

**Datenschutzerklärung** — long generator-style GDPR policy. Sections: Einleitung · Verantwortlicher · Übersicht der Verarbeitungen · Maßgebliche Rechtsgrundlagen · Sicherheitsmaßnahmen · Übermittlung · Drittländer · Löschung · Cookies · Geschäftliche Leistungen · Webhosting · Blogs · Kontakt- und Anfragenverwaltung · Newsletter · Werbliche Kommunikation · Gewinnspiele · Umfragen · Webanalyse (Google Analytics 4, mit Einwilligung) · Onlinemarketing · Affiliate · Bewertungen · YouTube (Zwei-Klick-Lösung) · Social Media · Plugins · Änderung · Rechte der betroffenen Personen · Begriffsdefinitionen.
Named third parties: STRATO (Webhoster) · Google Ireland / GA4 · Google Fonts (self-hosted) · YouTube · Facebook · Instagram · Cloudflare.

**AGB** — 12 clauses. Operative terms: minimum hourly rate **€70 net** per field technician for post-install work · prices ex works excl. VAT · delivery within approx. **six weeks** · default interest **1%/month** · cancellation fee up to **30%** of purchase price · retention of title · defects reportable within **eight working days**, warranty claims within **six months** · liability limited to intent and gross negligence, consequential loss from burglary/theft excluded.

> ⚠️ §9's six-month warranty and eight-working-day notice are **B2B terms** on a site that markets to *Privatkunden*. Against consumers, § 476 BGB generally bars shortening the statutory two-year warranty on new goods. Needs legal review before launch.

---

# PART III — CONTRACTS

## 21. SEO metadata & structured data

| Page | Title | Meta description |
| --- | --- | --- |
| Home | Alarmanlagen & Sicherheitstechnik Mannheim \| FT Sicherheitstechnik | FT Sicherheitstechnik Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Smart Home. 15+ Jahre Erfahrung, persönliche Beratung vor Ort. ★ 5.0 Google-Bewertung. Jetzt kostenlos beraten lassen! |
| Über uns | Über uns — Gründergeschichte & Team \| FT Sicherheitstechnik Mannheim | Lernen Sie FT Sicherheitstechnik kennen: Gründer Hüseyin Gökcay, 15+ Jahre Erfahrung, Plus X Award Top 100 (2026). Ihr Partner für Sicherheitstechnik in Mannheim. |
| Privat | Alarmanlagen & Sicherheit für Privat \| FT Sicherheitstechnik Mannheim | Professionelle Sicherheitslösungen für Ihr Zuhause in Mannheim & Rhein-Neckar: Alarmanlagen, Videoüberwachung, Smart Home & Brandwarnanlagen. Kostenlose Beratung! |
| Gewerbe | Sicherheitstechnik für Gewerbe & Industrie \| FT Sicherheitstechnik Mannheim | Gewerbliche Sicherheitslösungen in Mannheim: Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Zeiterfassung. DSGVO-konform, persönliche Beratung vor Ort. Jetzt anfragen! |
| Produkte | FTronics Kameras, NVR & Überwachungstechnik \| FT Sicherheitstechnik | FTronics Produktkatalog: 4K IP-Kameras (Dome, Bullet, Turret, PTZ), NVR-Rekorder (8-64 Kanäle), IP-Lautsprecher. Sony IMX415, KI-Analyse, NDAA-konform. |
| FC-8D Pro | FTronics FC-8D Pro — 4K Dome IP-Kamera \| FT Sicherheitstechnik | FTronics FC-8D Pro Dome-Kamera: 4K Ultra HD, Sony IMX415 Sensor, KI-Personenerkennung, IP67, PoE, Nachtsicht 30m. Technische Daten & Beratung. |
| FB-8A Pro | FTronics FB-8A Pro — 4K Bullet IP-Kamera mit Gesichtserkennung \| FT Sicherheitstechnik | FTronics FB-8A Pro Bullet-Kamera: 4K Ultra HD, Gesichtserkennung, Perimeterüberwachung, Sony IMX415, IP67. Technische Daten & Beratung. |
| Konfigurator | Sicherheitssystem-Konfigurator \| FT Sicherheitstechnik Mannheim | Konfigurieren Sie Ihr individuelles Sicherheitssystem online: Alarmanlagen, Videoüberwachung, Zutrittskontrolle. Kostenloses Angebot in Minuten. |
| Ratgeber | Ratgeber — Tipps zu Alarmanlagen & Sicherheit \| FT Sicherheitstechnik | Expertenwissen zu Sicherheitstechnik: Ratgeber-Artikel zu Alarmanlagen, Videoüberwachung, Einbruchschutz & Smart Home. Kostenlos lesen! |
| FAQ | FAQ — Häufige Fragen zu Alarmanlagen & Sicherheitstechnik \| FT Sicherheitstechnik | Antworten auf 31 häufige Fragen zu Alarmanlagen, Videoüberwachung, Smart Home, Brandschutz, Kosten & Wartung. |
| Support | Support, Downloads & Tutorials \| FT Sicherheitstechnik | Support-Center von FT Sicherheitstechnik: Anleitungen, Downloads, Tutorials & Fernwartung für Ihre Sicherheitssysteme. |
| Partner | Partner — Ajax, Dahua, Jablotron, Akuvox \| FT Sicherheitstechnik | Unsere Technologie-Partner: Ajax Systems, Dahua, Jablotron, Akuvox und mehr. FT Sicherheitstechnik setzt auf führende Hersteller der Sicherheitsbranche. |

**Homepage keywords:** Sicherheitstechnik Mannheim, Alarmanlagen Mannheim, Videoüberwachung Mannheim, Smart Home Sicherheit, Zutrittskontrolle, Brandwarnanlagen, FTronics Kameras, Sicherheitstechnik Rhein-Neckar

**Structured data required:**
- **`LocalBusiness`** (`@id: /#organization`) — name, alternateName FTST, address, geo, `openingHoursSpecification` Mo–Fr 08:00–17:00, `priceRange: €€`, 3× `sameAs`, `aggregateRating` 5.0/19, `areaServed` GeoCircle 50 km, `founder`, `award[]`, `hasOfferCatalog` with 5 services.
- **`WebSite`** with `SearchAction` → `faq.html?q={search_term_string}`
- **`Product`** per product page — SKU, brand FTronics, manufacturer FT Sicherheitstechnik. *No `offers` node* (quote-based sales).
- **`FAQPage`** on `/faq` · **`JobPosting`** ×2 on `/karriere` · **`BreadcrumbList`** on detail pages.

> **Fix:** every page except FC-8D Pro currently shares `logo-original.jpg` as its OG image. Give each page a distinct OG image.

---

## 22. Motion, accessibility & performance

### Reduced motion — hard gate

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{
    animation-duration:.01ms !important; animation-iteration-count:1 !important;
    transition-duration:.01ms !important; scroll-behavior:auto !important}
  [data-rev]{opacity:1 !important;transform:none !important}
  .pin-stack{height:auto !important}
  .pin-stage{position:static !important;height:auto !important}
  .pin-panel{position:static !important;opacity:1 !important}
}
```

Pinned stacks collapse to a normal vertical stack. Scrubbed videos show their poster with a manual play control. Lenis never initialises.

### Accessibility floor — WCAG 2.2 AA

- Contrast ≥ 4.5:1 body / 3:1 large. `--ft-fog-400` on `--ft-ink-900` = **7.4:1** ✓. `--ft-signal-500` on the same = **4.8:1** ✓ — never for body copy.
- Visible `:focus-visible` everywhere. Never `outline:none` without a replacement.
- Skip link `Zum Inhalt springen`.
- Decorative video `aria-hidden="true"`; all muted + `playsInline`.
- Galleries: arrow keys, labelled paddles, focus scrolls into view.
- `lang="de"`; `lang="en"` on English terms (Guard Station, Smart Home).
- One `<h1>` per page, headings in order.
- **Pinned sections must always be escapable by continuing to scroll. Never trap.**

### Performance budget

| Metric | Target |
| --- | --- |
| LCP | < 2.0 s |
| CLS | < 0.05 — `aspect-ratio` on every media box |
| INP | < 200 ms |
| JS initial (gzip) | < 120 KB (Lenis ~4 KB + GSAP/ScrollTrigger ~48 KB) |
| Hero video | < 1.2 MB, `preload="metadata"` |
| Scrubbed video | < 2.5 MB each, `preload="auto"`, **max 3/page** |
| Fonts | 2 families × 3 weights, self-hosted, `font-display:swap`, subset `latin-ext` |

**Video loading split:** below-fold *play-on-approach* → `preload="none"` + IntersectionObserver at `rootMargin:'200% 0px'`. **Scrubbed** → `preload="auto"` (seeking needs buffered frames). Kill off-screen ScrollTriggers. `will-change` only during animation.

---

## 23. Content blockers — must resolve before launch

| # | Blocker | Action |
| --- | --- | --- |
| 1 | **Ratgeber: 7 teasers, 0 articles.** Meta promises "Kostenlos lesen!" | Write the 7 articles, or cut the section. |
| 2 | **16 of 18 products have no detail page.** Every card links `Details ansehen`. | Build them, or route to `/kontakt?produkt=<sku>`. |
| 3 | **FC-8D Pro: 30 fps vs 25 fps**, and fixed 2.8 mm vs motorised 2.8–12 mm varifocal. | Pick one of each; correct the spec table. |
| 4 | **FB-8A Pro: JSON-LD claims motorised varifocal**, spec table says fixed. | Correct the schema. |
| 5 | **Cloud messaging conflict.** FC-8D Pro sells "Keine Cloud-Abhängigkeit"; FB-8A Pro lists P2P cloud; FAQ #24 prefers local. | Agree one company stance and apply it everywhere. |
| 6 | **Privacy policy describes a different site** — WordPress comments, newsletters, competitions, affiliate programmes that don't exist; missing the actual forms and chatbot. | Trim and rewrite to match the real site. |
| 7 | **AGB §9 warranty terms are B2B** on a consumer-facing site. | Legal review. |
| 8 | **Opening hours only in JSON-LD.** | Surface Mo–Fr 08:00–17:00 on `/kontakt` and in the footer. |
| 9 | **Generic OG images** on every page but one. | One distinct OG image per page. |
| 10 | **Impressum has no Berufsbezeichnung / Kammer entry.** | Add if applicable for the trade. |
| 11 | **"15+ Jahre" vs "2013 gegründet."** | Keep both but explain — 15+ counts from the 2008 first install. |

---

## 24. Claude Design prompt

> Design and build a dark-first, scroll-choreographed marketing site for **FT Sicherheitstechnik**, a Mannheim security-technology installer (alarm systems, 4K video surveillance, access control, smart home, fire safety) with its own hardware brand, **FTronics**. Audience: German homeowners and commercial/industrial facility managers. All copy in German, formal *Sie* (informal *du* on the careers page only). Conversion goal: a free on-site consultation; phone `+49 621 159 647 34`.
>
> **Visual language.** Dark ground `#0e1012`, cards `#1b1f22`, white text, secondary `#9aa3aa`. Exactly **one** accent, `#ff4d3d`, used at most twice per viewport — the primary action and the active stepper state. The primary button is **white with near-black text**, never the accent. Functional green `#33c26a` only for operational status chips, never a CTA. No glows, no bloom shadows, no ambient looping animation. Depth is surface elevation + a 1px `rgba(255,255,255,.09)` border + a 3px hover lift. Two sections flip to a light theme (`#f4f6f7`) via a single `data-theme="light"` attribute that reassigns semantic tokens: **Auszeichnungen** and the whole **Ratgeber** page.
>
> **Typography.** Clash Grotesk display + Inter body, both self-hosted (no Google Fonts request — DSGVO). Headings weight 600, never bolder. Fluid `clamp()` scale, 44→80px H1, 52→96px display. Letter-spacing tightens as size grows: −0.022em display, −0.018em H1, −0.014em H2, 0 at body. Line-height 1.02 display → 1.60 body. Every section opens with a small uppercase eyebrow at +0.06em in tertiary grey. German compounds require `hyphens:auto` and `text-wrap:balance` on all display type. Body capped at a 680px measure.
>
> **Layout.** 12 columns, 1200px container, section padding `clamp(5rem, 7.143vw + 3.571rem, 10rem)`. Radii 8px chips / 14px buttons / 20px cards / 36px bento / pill buttons.
>
> **Scroll is the primary interaction.** Lenis (duration 1.05, expo-out, `smoothTouch:false`) driving GSAP ScrollTrigger. Five patterns:
> 1. **Pinned panel stacks** — container `(N+1) × 100dvh`, stage `position:sticky; top:0; height:100dvh`, panels crossfade on progress. Used for the five-layer protection narrative with a fixed left progress rail (the only accent in that section).
> 2. **Scroll-scrubbed video** — `video.currentTime = progress × duration`, `preload="auto"`, muted, `playsInline`, encoded `-g 8 -movflags +faststart`. Three uses: the FC-8D Pro exploded view, a clean-installation time-lapse, and a day→night camera transition. Max 3 per page.
> 3. **Staggered reveals** — IntersectionObserver at 0.15, `translateY(28px)` + fade, 70ms stagger, capped at 6, fires once, never re-animates.
> 4. **Responsive pin grammar** — `{small|medium|large}-pin-{top-center|center|center-left|bottom-center}` so one component parks differently per breakpoint.
> 5. **Horizontal scroll galleries** with `scroll-snap`, labelled paddle buttons, full keyboard support — for the 18-product catalogue, tutorials, and reviews.
>
> **Homepage order** (target 9–13 viewports): hero with looping background video → trust badge strip → scrubbed FC-8D Pro exploded view (3vh) → craft-pledge installation time-lapse → Hand-Made in Mannheim → six service cards + counters → pinned five-layer protection narrative (6vh) → FTronics gallery → awards (light) → three steps → reviews gallery → contact form.
>
> **Every section's exact German copy is specified in Part II of this document — use it verbatim. Do not invent or translate new copy.** Reuse the existing CTA label strings; do not coin new ones.
>
> **Non-negotiable:** `prefers-reduced-motion` collapses every pinned stack into a static vertical stack, freezes scrubbed video at its poster, and skips Lenis entirely. WCAG 2.2 AA contrast. Visible focus rings. 44px minimum touch targets. Scroll is never hijacked or blocked. CLS below 0.05 — reserve every media box with `aspect-ratio`.
>
> **Do not build the Ratgeber article pages** — the articles do not exist yet (see §23). Route the 16 products without detail pages to `/kontakt?produkt=<sku>` rather than shipping dead links.

---

## Appendix — reference measurements

| | Bevel | Apple AirPods Pro | Bridge |
| --- | --- | --- | --- |
| Page height | 13,010px (12.3×) | 28,626px (27.1×) | 14,944px (14.2×) |
| Ground | `#f3f6f7` | `#ffffff` / `#f5f5f7` | `#ffffff` / `#fbfbfa` |
| Text | `#222326` | `#1d1d1f` | `#0a0a0a` |
| Accent | `#f46c41` | blue, minimal | `#006fe6` |
| Heading weight | 600 | 600 | 500–600 |
| Max tracking | −0.03em | −0.015em | −0.06em |
| Display line-height | 1.0 | 1.04 | 1.11 |
| Container | 1440px | 1138 / 1300px | 1456px |
| Card radius | 36px | ~18–28px | 14px |
| Smooth scroll | **Lenis** | native + sticky | **Lenis** |
| Scroll engine | **GSAP ScrollTrigger** | in-house `AC` | custom + Three.js |
| Tallest pin container | 3.3× vh | 17.1× vh | 7.9× vh |
| Video strategy | `preload="auto"`, **scrubbed** | `preload="none"`, play on approach | none (WebGL) |

**The five constraints all three enforce:** one accent · primary button is never the accent · headings 500–600 never bolder · tracking tightens as type grows · long pages paid for with scroll choreography.

---

*Design analysis: live DOM + computed-style inspection of bevel.health, apple.com/ph/airpods-pro, bridge.surf — 2026-08-23. Content: all 17 pages of ftsicherheitstechnik.com — 2026-08-22. Brand tokens from FT's live `base.css`, `effects.css`, `fonts.css`.*
