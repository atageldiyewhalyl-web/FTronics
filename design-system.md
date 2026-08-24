# FT Sicherheitstechnik — Unified Design System
### A senior UI/UX synthesis of Bevel, Apple AirPods Pro, and Bridge — built for Claude Design

> **Purpose.** This document is the single design brief for rebuilding ftsicherheitstechnik.com. It merges three reference languages into one coherent system, tuned to a German B2B/B2C security-technology brand. Everything here is measured from the live sites (DOM + computed styles, 2026-08-23), not guessed.
>
> **How to use with Claude Design:** §12 is a copy-paste brief. §5–§8 are the spec Claude Design should implement. §1–§4 are the reasoning — read them so the decisions aren't arbitrary.

---

## Table of contents

1. [The thesis — what makes all three feel "clean"](#1-the-thesis--what-makes-all-three-feel-clean)
2. [Reference teardown: Bevel](#2-reference-teardown-bevel)
3. [Reference teardown: Apple AirPods Pro](#3-reference-teardown-apple-airpods-pro)
4. [Reference teardown: Bridge](#4-reference-teardown-bridge)
5. [Diagnosis — where FT stands today](#5-diagnosis--where-ft-stands-today)
6. [The unified design language (tokens)](#6-the-unified-design-language-tokens)
7. [The scroll interaction system](#7-the-scroll-interaction-system)
8. [Component specifications](#8-component-specifications)
9. [Page blueprints](#9-page-blueprints)
10. [Motion, accessibility & performance contract](#10-motion-accessibility--performance-contract)
11. [Do / Don't](#11-do--dont)
12. [Claude Design brief (copy-paste)](#12-claude-design-brief-copy-paste)

---

## 1. The thesis — what makes all three feel "clean"

I measured all three references. "Clean" is not a style — it is five enforced constraints. Every one of these sites obeys all five, and this is the entire reason they read as premium.

**1. One accent colour. Never two.**

| Site | Neutral base | Accent | Count of competing accents |
| --- | --- | --- | --- |
| Bevel | `#f3f6f7` / `#1f2025` | `#f46c41` orange-red | 1 primary (others are *data* chips only) |
| Apple | `#ffffff` / `#f5f5f7` | none — blue only in links/CTA | 0–1 |
| Bridge | `#ffffff` / `#fbfbfa` | `#006fe6` blue | 1 |

Bevel *has* a nine-colour secondary palette (`lilac`, `mint`, `cyan`, `teal`, `pink`…) — but it is used exclusively to colour-code **data categories** inside cards, never for UI chrome. The buttons are black. The page is grey. This distinction is the whole trick.

**2. Colour carries no weight; contrast does.**

None of these sites uses a coloured button for the primary action. Bevel's primary button is `--_theme---button-primary--background: var(--_colors---primary--dark)` — near-black `#1f2025` on light. Apple's is blue but tiny. Hierarchy comes from **value contrast and size**, not hue. This is why the pages feel calm at 27 viewports long.

**3. Type is semibold, never bold, and tracks negative as it grows.**

Every headline on all three sites is weight **500–600**. Not one uses 700+. And letter-spacing tightens as size increases — a precise optical rule:

| Site | Size | Tracking | In em |
| --- | --- | --- | --- |
| Apple | 28px eyebrow | +0.196px | **+0.007em** |
| Apple | 56px | −0.28px | −0.005em |
| Apple | 64px | −0.576px | −0.009em |
| Apple | 96px | −1.44px | **−0.015em** |
| Bevel | all H1–H3 | — | **−0.03em** |
| Bridge | 72px | −4.32px | **−0.06em** |

The rule: **small text tracks slightly positive, large text tracks negative, and the bigger it gets the tighter it goes.** Bridge is the most aggressive (−0.06em); Apple the most conservative. For a German site with long compound nouns (*Sicherheitstechnik*, *Videoüberwachung*, *Zutrittskontrolle*), take the **Apple end of the range** — aggressive tracking makes long German words collide.

**4. Line-height compresses as size grows.**

| Size | Apple line-height | Ratio |
| --- | --- | --- |
| 17px body | 25px | 1.47 |
| 28px eyebrow | 32px | 1.14 |
| 56px | 60px | 1.07 |
| 96px | 100px | 1.04 |

Bevel is even tighter: `--_typography---heading-1--line-height: 1`. Display type sits on a **1.0–1.1** leading; body sits on **1.3–1.5**. Nothing in between.

**5. The page is long, and length is paid for with motion.**

| Site | Page height | In viewports |
| --- | --- | --- |
| Bevel | 13,010px | 12.3× |
| Bridge | 14,944px | 14.2× |
| Apple | 28,626px | **27.1×** |

These are enormously long pages. They survive because **scroll is the interaction** — the user is never scrolling past static blocks, they are advancing a sequence. That is §7, and it is the most important section in this document.

---

## 2. Reference teardown: Bevel

**Stack:** Webflow + **Lenis** (smooth scroll) + **GSAP ScrollTrigger** + jQuery.
**Page:** 13,010px / 12.3 viewports. Base 17px, `#f3f6f7` background, `#222326` text, system font stack (SF Pro on Apple devices, Inter fallback).

### What's genuinely excellent

**A fully tokenised theme layer.** Bevel doesn't define colours on components — it defines *roles*, then maps them:

```
--_colors---primary--dark: #1f2025
--_theme---background--invert: var(--_colors---primary--dark)
--_theme---button-primary--background: var(--_theme---background--invert)
```

Three layers: **raw colour → semantic theme role → component property.** Flipping a section to dark (`u-theme-dark`) reassigns the theme layer and every component follows. This is the correct architecture and we will copy it exactly.

**Fluid type via `clamp()` on every step.**

```
--_typography---heading-1--font-size-lg: clamp(3rem, 2.857vw + 2.429rem, 5rem)
--_typography---heading-2--font-size-lg: clamp(2.5rem, 2.143vw + 2.071rem, 4rem)
--_typography---heading-3--font-size-lg: clamp(2rem, 0.714vw + 1.857rem, 2.5rem)
```

No breakpoint jumps. Type is continuous from 320px to 1440px.

**Bottom margin is proportional to the element, in `em`.** `h1 { margin-bottom: .2em }`, `h2 { .3em }`, `h3 { .5em }`, `h4 { .8em }`, `h5/h6 { 1em }`. Bigger type gets *proportionally less* space beneath it — that's why the rhythm never feels gappy.

**A 36px bento radius** (`--v3-bento-radius: 36px`) applied consistently to every card. Large radii read as "software", small radii read as "document".

**Pill buttons:** `border-radius: 8rem`, padding `.75rem / 1.5rem`, weight 500, line-height 1.4.

### The scroll work (this is why it's on the reference list)

Three tall containers — **2.2×, 3.3× and 3.2× viewport height** — each holding `position: fixed`, 100vh panels (`.intelligence_fixed`, ×4). Classic pinned-panel stacks.

**The standout mechanic — scroll-scrubbed video.** I probed it: as scroll advanced 0 → 54%, one video's `currentTime` moved **1.99s → 3.41 → 3.83 → 4.25 → 4.67 → 5.09 → 5.52** monotonically, while `paused` stayed `false` but the value tracked scroll, not wall-clock. A second video then took over at 62% and ran **0.08 → 0.51 → 0.93 → 1.35**. The videos are 786×1704 portrait app-screen captures, `preload="auto"`, muted, `playsInline`, `loop=false`.

The user is *scrubbing a product demo with the scroll wheel.* Scroll up and the demo runs backwards. This is the single most valuable technique on any of the three sites and it maps perfectly onto security hardware.

**Shutter transitions:** `.shutter-scroll-transition__row` elements with `will-change: opacity` — horizontal bands that crossfade on offset timings to wipe between sections.

**Hero:** 1920×1080, 6s looping background video, `preload="metadata"` (cheap), autoplay, muted.

### What to leave behind
- The nine-colour secondary palette. Beautiful for health metrics, wrong for security.
- Webflow's `u-` utility-class sprawl.
- `line-height: .9` on H4 — too tight for German.

---

## 3. Reference teardown: Apple AirPods Pro

**Stack:** Apple's in-house `AC` framework. No GSAP, no Lenis — native scroll with `position: sticky`.
**Page:** 28,626px / **27.1 viewports**. Base 17px SF Pro Text, `#1d1d1f` on `#ffffff`.

### The structural lesson: sections alternate, and one section dominates

| Section | Height | Viewports |
| --- | --- | --- |
| welcome | 1,055px | 1.0 |
| highlights | 1,226px | 1.2 |
| product-viewer | 1,060px | 1.0 |
| **product-stories** | **18,074px** | **17.1** |
| noise-control | 3,006px | 2.8 |
| audio-performance | 3,242px | 3.1 |
| personalized-listening | 2,532px | 2.4 |
| fitness | 2,818px | 2.7 |
| hearing-health | 2,637px | 2.5 |
| battery | 2,262px | 2.1 |

Backgrounds alternate `#ffffff` ↔ `#f5f5f7` (`background-alt`). That 2-value alternation is the *entire* sectioning device — no borders, no dividers, no coloured bands.

**One section carries 63% of the page.** The lesson: don't distribute attention evenly. Pick the one story that sells the product and give it seventeen viewports.

### The pin grammar — the best idea on the page

Apple has a **named vocabulary** for how an element parks while pinned, with responsive prefixes. Measured class frequencies:

| Class | Count | Meaning |
| --- | --- | --- |
| `pin-offset` | 32 | pin with a top offset |
| `viewport-content` | 20 | element participates in viewport choreography |
| `staggered-start` | 20 | children enter on a stagger |
| `pin-center` | 19 | park centred |
| `scroll-container` | 7 | horizontal scroll region |
| `align-center` | 6 | — |
| `scroll-gallery` | 5 | gallery inside a scroll-container |
| `parallax-image` | 4 | layer moves at reduced rate |
| `pin-self-bottom-center` | 4 | park at own bottom-centre |
| `large-pin-center` / `large-pin-center-left` | 3 / 2 | desktop-only pin positions |
| `medium-pin-bottom-center` / `medium-pin-top-center` | 2 / 2 | tablet pin positions |
| `small-pin-top-center` | 1 | mobile pin position |

`{breakpoint}-pin-{position}` is a **responsive pin system**. An element can park centred on desktop and top-centre on mobile. This is the most transferable idea in this document — we adopt it verbatim in §7.

**The pin structure itself:** `.sticky-container` (2,638px = 2.5vh) wraps `.sticky-element` (1,055px = exactly 100vh, `position: sticky; top: 0`). Container height minus viewport = **1.5 viewports of scroll travel while the element is frozen.**

### Typography, measured

| Role | Size | Line-height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| Eyebrow | 28px | 32px | +0.196px | 600 |
| Hero headline | 64px | 68px | −0.576px | 600 |
| Section headline | 56px | 60px | −0.28px | 600 |
| **Story headline** | **96px** | **100px** | **−1.44px** | 600 |
| Card caption heading | 17px | 25px | −0.374px | 600 |
| Body | 17px | — | — | 400 |

Note the **28px eyebrow** — enormous by convention, and it works because it sits above 96px display type. Eyebrows are typically 12–14px; Apple's is more than double, which is why their section openings feel authored rather than templated.

**Layout:** content column **1,138px** inside a 1,300px container; horizontal padding 81.25px. A full-bleed card set measured 5,930px wide (horizontal scroll gallery).

### Media discipline

Every video is `preload="none"` and `autoplay=false`. The hero is 1800×1050, 7.5s, loop, muted, and is *started by script on approach*. On a 27-viewport page, **nothing below the fold costs a byte until it is needed.** Compare Bevel, which uses `preload="auto"` — correct there, because scrubbing requires buffered frames. Two different correct answers to two different jobs.

### What to leave behind
- 27 viewports. FT is a service business, not a global product launch. Target 8–12.
- `disable-scroll` scroll-hijacking on the product viewer — an accessibility liability.

---

## 4. Reference teardown: Bridge

**Stack:** Next.js (Turbopack) + **Lenis** + **Three.js** (WebGL). Two 900×1466 canvases.
**Page:** 14,944px / 14.2 viewports. Inter 16px, `#ffffff`, `#0a0a0a` text.

### The token set is the cleanest of the three

Bridge uses a shadcn/Tailwind semantic token set — the most directly implementable of all three references:

```
--background: #fff        --foreground: #0a0a0a
--card: #fff              --card-foreground: #0a0a0a
--muted: #f5f5f5          --muted-foreground: #737373
--border: #e5e5e5         --input: #e5e5e5      --ring: #a1a1a1
--primary: #0075e2        --primary-foreground: #fff
--destructive: #df2225
--radius: .875rem   (14px)
```

Container: `--v2-limited-content-max-width: 1456px`, padding-x 16px, inner 1424px.

**Why this matters for FT:** this is a *role-named* palette (`muted-foreground`, `card`, `border`, `ring`) rather than a *colour-named* one. It survives a theme flip and it maps 1:1 onto component libraries.

### Typography

| Role | Size | Line-height | Tracking | Weight |
| --- | --- | --- | --- | --- |
| H1 | 72px | 80px | **−4.32px (−0.06em)** | 600 |
| Display H2 | 64px | 68px | −1px | 500 |
| Section H2 | 32px | 38px | −1px | 500 |
| Footer H3 | 16px | 16px | normal | 500 |

Weight **500** for most headings — even lighter than Apple's 600. Combined with −0.06em tracking this produces the "tight and quiet" look currently dominating AI/dev-tool branding.

### Scroll structure

Same architecture as the others, different proportions:

- `sticky top-0 h-dvh w-dvw overflow-hidden` — a 100vh pinned stage
- `.section-five-six-sticky-content` — a **1,903px** sticky element (1.8vh — taller than the viewport, so it *itself* scrolls while pinned)
- Scroll containers at **3.6×, 5.0× and 7.9×** viewport height wrapping 1.0vh `fullscreen-section` children
- Off-white section ground `#fbfbfa`

Note `h-dvh` / `w-dvw` — **dynamic viewport units**, which correctly handle mobile browser chrome collapse. Use `dvh`, not `vh`, for pinned stages.

**Zero videos, two WebGL canvases.** Bridge does with shaders what Bevel does with video. For FT, video is the right call — real installations are the proof, and a shader can't show a technician's cable run.

### What to leave behind
- −0.06em tracking. On *Videoüberwachungsanlage* this will look broken.
- WebGL as the primary visual engine — cost/benefit is wrong for a regional installer.

---

## 5. Diagnosis — where FT stands today

I pulled the live `base.css`. Here is the current token set, and the honest read:

```
--color-bg: #0a0a0a          --color-surface: #141414 / #1a1a1a / #222222
--color-accent: #ef4444      (red)    + --color-accent-glow
--color-cta: #22c55e         (green)  + --color-cta-glow
--color-secondary: #00b4d8   (cyan)   + --color-secondary-glow
--color-text: #ffffff        --color-text-secondary: #a0a0a0
--radius: 4 / 8 / 12 / 16 / 24 / 9999px
--ease-out: cubic-bezier(0.16, 1, 0.3, 1)     ← this is good, keep it
--container-max: 1200px
Font: Clash Grotesk (Fontshare, self-hosted, DSGVO-konform)  ← also good, keep it
```

### The five findings

**Finding 1 — Three accent colours is the core problem.** Red `#ef4444` + green `#22c55e` + cyan `#00b4d8`, each with a glow variant. Every reference site uses **one**. Right now nothing on the page can be emphasised, because everything already is. This single change will do more for perceived quality than any amount of new motion.

**Finding 2 — Glows and animated beams are working against you.** `--shadow-glow-red`, `--shadow-glow-cyan`, and a `beam-pulse` keyframe animation that runs `infinite` on section dividers. None of the three references has a single glow or an infinitely looping ambient animation. Perpetual motion with no user input reads as "template". **Motion should be a response to the user, never ambient wallpaper.**

**Finding 3 — `scroll-behavior: smooth` in CSS is not smooth scroll.** It only affects anchor jumps. All three references use **Lenis** for genuine scroll interpolation. You already load GSAP and ScrollTrigger — you're paying the bytes without getting the benefit.

**Finding 4 — The type scale has no tracking or leading rules.** The `clamp()` scale is well-built, but there's no letter-spacing or line-height policy. At `--text-hero: 4.5rem` (72px) with default tracking and leading, display type will look loose and generic next to any of the references.

**Finding 5 — Dark theme is the right call and you should keep it.** All three references are light-first, but security is a category where dark reads as credible (control rooms, monitoring, night vision). Don't chase them here. Keep `#0a0a0a` — just apply reference *discipline* to it. This is the one place FT should deliberately diverge.

**What's already right and should be protected:** Clash Grotesk is a genuinely good display face with the geometric confidence this system needs. The `cubic-bezier(0.16, 1, 0.3, 1)` easing is an excellent expo-out. The scroll-exploded camera, 3D product viewer, sensor comparison slider and five-layer scroll narrative are *already* the right pattern family — they just need to be systematised.

---

## 6. The unified design language (tokens)

Three-layer architecture, borrowed from Bevel: **raw → semantic → component.**

### 6.1 Colour

```css
:root {
  /* ---- Layer 1: raw ---- */
  --ft-ink-950:  #08090a;   /* deepest ground */
  --ft-ink-900:  #0e1012;   /* page ground */
  --ft-ink-850:  #141719;   /* raised surface */
  --ft-ink-800:  #1b1f22;   /* card */
  --ft-ink-700:  #262b30;   /* elevated card / hover */
  --ft-ink-600:  #3a4147;   /* strong border */

  --ft-paper:    #ffffff;
  --ft-paper-96: #f4f6f7;   /* light-section ground */
  --ft-paper-92: #e9ecee;

  --ft-fog-400:  #9aa3aa;   /* secondary text on dark */
  --ft-fog-500:  #6f787f;   /* tertiary text on dark */

  /* ---- The single accent ---- */
  --ft-signal-500: #ff4d3d;  /* the one accent */
  --ft-signal-600: #e63c2d;  /* pressed */
  --ft-signal-400: #ff7566;  /* hover / on-dark */

  /* ---- Functional only. Never decorative. ---- */
  --ft-ok:    #33c26a;   /* "armed", "online", form success */
  --ft-warn:  #e8a33d;
  --ft-error: #e5484d;

  /* ---- Layer 2: semantic ---- */
  --bg:              var(--ft-ink-900);
  --bg-raised:       var(--ft-ink-850);
  --bg-card:         var(--ft-ink-800);
  --bg-card-hover:   var(--ft-ink-700);
  --fg:              #ffffff;
  --fg-secondary:    var(--ft-fog-400);
  --fg-tertiary:     var(--ft-fog-500);
  --border:          rgba(255,255,255,.09);
  --border-strong:   rgba(255,255,255,.16);
  --ring:            var(--ft-signal-500);

  --btn-primary-bg:   #ffffff;
  --btn-primary-fg:   var(--ft-ink-900);
  --btn-secondary-bg: transparent;
  --btn-secondary-fg: #ffffff;
  --btn-secondary-bd: rgba(255,255,255,.22);
}

/* Light section — flip the semantic layer only. Components don't change. */
[data-theme="light"] {
  --bg:            var(--ft-paper-96);
  --bg-raised:     var(--ft-paper);
  --bg-card:       var(--ft-paper);
  --bg-card-hover: var(--ft-paper-92);
  --fg:            var(--ft-ink-900);
  --fg-secondary:  #5c656c;
  --fg-tertiary:   #838d95;
  --border:        rgba(0,0,0,.10);
  --border-strong: rgba(0,0,0,.18);
  --btn-primary-bg: var(--ft-ink-900);
  --btn-primary-fg: #ffffff;
  --btn-secondary-fg: var(--ft-ink-900);
  --btn-secondary-bd: rgba(0,0,0,.22);
}
```

**Rules, non-negotiable:**
- `--ft-signal-500` appears **at most twice per viewport**. It marks the primary action and the active state of a stepper. Nothing else.
- The primary button is **white on dark / near-black on light** — never the accent. (This is Bevel's rule and it is why their pages feel expensive.)
- `--ft-ok` green appears only where it means *operational status* (an "armed" chip, a form success). It is never a CTA. This retires today's green-CTA/red-accent conflict.
- **Delete every `--*-glow` token and the `beam-pulse` animation.** Depth comes from surface elevation (`--bg-card` → `--bg-card-hover`) and a 1px border, not from bloom.

### 6.2 Typography

Clash Grotesk for display, Inter for UI/body. Both self-host (DSGVO — no Google Fonts request).

```css
:root {
  --font-display: 'Clash Grotesk', 'Inter', system-ui, sans-serif;
  --font-ui:      'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;

  /* Fluid scale (Bevel's clamp method, Apple's proportions) */
  --t-eyebrow:  clamp(0.95rem, 0.30vw + 0.88rem, 1.20rem);  /* 15→19px */
  --t-body-sm:  clamp(0.88rem, 0.15vw + 0.84rem, 0.95rem);
  --t-body:     clamp(1.00rem, 0.25vw + 0.94rem, 1.15rem);  /* 16→18px */
  --t-lead:     clamp(1.15rem, 0.55vw + 1.02rem, 1.50rem);  /* 18→24px */
  --t-h4:       clamp(1.25rem, 0.45vw + 1.14rem, 1.60rem);
  --t-h3:       clamp(1.60rem, 1.00vw + 1.35rem, 2.40rem);  /* 26→38px */
  --t-h2:       clamp(2.20rem, 2.20vw + 1.65rem, 3.75rem);  /* 35→60px */
  --t-h1:       clamp(2.75rem, 3.20vw + 1.95rem, 5.00rem);  /* 44→80px */
  --t-display:  clamp(3.25rem, 4.60vw + 2.10rem, 6.00rem);  /* 52→96px */
}
```

**Tracking & leading policy** — the Apple curve, held back from Bridge's extreme because German compounds need the room:

| Role | Font | Weight | Line-height | Letter-spacing |
| --- | --- | --- | --- | --- |
| `--t-display` | display | 600 | **1.02** | **−0.022em** |
| `--t-h1` | display | 600 | **1.05** | **−0.018em** |
| `--t-h2` | display | 600 | **1.08** | **−0.014em** |
| `--t-h3` | display | 600 | **1.15** | **−0.008em** |
| `--t-h4` | display | 500 | 1.25 | −0.004em |
| `--t-lead` | ui | 400 | 1.45 | −0.002em |
| `--t-body` | ui | 400 | **1.60** | 0 |
| `--t-eyebrow` | ui | 500 | 1.10 | **+0.06em**, uppercase |

> **German-specific:** set `hyphens: auto; -webkit-hyphens: auto;` and `lang="de"` on display headings. *Videoüberwachungsanlage* at 96px will overflow a 1200px container otherwise. Also add `text-wrap: balance` on H1/H2 — it prevents orphaned words in compound-heavy German headlines.

**Bottom margins in `em`** (Bevel's rule): `h1 { margin-bottom:.2em }` · `h2 { .3em }` · `h3 { .5em }` · `h4 { .8em }` · `p { 1em }`.

**The eyebrow is the signature.** Apple's is 28px. Ours is 15–19px uppercase at +0.06em in `--fg-tertiary` — deliberately smaller than Apple's because ours sits on a dark ground where large uppercase gets shouty. It appears above **every** section headline, no exceptions. This one repeated element does most of the work of making a long page feel authored.

### 6.3 Space, layout, radius

```css
:root {
  --sp-1:.25rem; --sp-2:.5rem;  --sp-3:.75rem; --sp-4:1rem;
  --sp-6:1.5rem; --sp-8:2rem;   --sp-12:3rem;  --sp-16:4rem;
  --sp-20:5rem;  --sp-24:6rem;  --sp-32:8rem;  --sp-40:10rem;

  /* Section padding — Bevel's formula */
  --section-pad: clamp(5rem, 7.143vw + 3.571rem, 10rem);   /* 80→160px */

  --container:       1200px;   /* keep FT's existing width */
  --container-wide:  1440px;
  --container-text:  680px;    /* max measure for prose — ~70ch */
  --gutter:          clamp(1rem, 3vw, 2rem);

  --r-sm:   8px;    /* chips, inputs */
  --r-md:   14px;   /* buttons, small cards — Bridge's .875rem */
  --r-lg:   20px;   /* standard card */
  --r-xl:   28px;   /* feature card */
  --r-bento:36px;   /* full-bleed bento panel — Bevel's value */
  --r-pill: 9999px;
}
```

Grid: **12 columns**, gutter `clamp(1rem, 1.429vw + .714rem, 2rem)`. Breakpoints `sm 640 / md 768 / lg 1024 / xl 1280`.

### 6.4 Motion

```css
:root {
  --ease-out:   cubic-bezier(0.16, 1, 0.30, 1);    /* keep FT's — excellent expo-out */
  --ease-in-out:cubic-bezier(0.65, 0, 0.35, 1);
  --ease-soft:  cubic-bezier(0.33, 1, 0.68, 1);

  --dur-1: 120ms;   /* micro: chip, icon */
  --dur-2: 240ms;   /* button, hover */
  --dur-3: 420ms;   /* card, panel */
  --dur-4: 700ms;   /* section entrance */
  --dur-5: 1100ms;  /* hero */
}
```

Animate **only** `transform`, `opacity`, `filter`, and `clip-path`. Never `height`, `top`, `width`, `margin`.

---

## 7. The scroll interaction system

**This is the part that matters.** All three references reach the same conclusion by different routes: on a long page, scroll is not navigation — it is the primary input device. The user turns a crank; the page performs.

### 7.0 The engine

```
Lenis (scroll interpolation) → GSAP ScrollTrigger (progress) → transform/opacity only
```

```js
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  const lenis = new Lenis({
    duration: 1.05,               // Bevel/Bridge sit ~1.0–1.2
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),   // expo-out
    smoothWheel: true,
    smoothTouch: false,           // never hijack touch — it breaks native fling
  });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(t => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}
```

Three rules, learned from the references:
1. **`smoothTouch: false`.** Bridge and Bevel both leave touch native. Smoothed touch scrolling feels broken on mobile.
2. **Never block scroll.** Apple's `disable-scroll` is the one thing on their page I'd reject. Pinning must always be escapable by continuing to scroll.
3. **`prefers-reduced-motion` bypasses Lenis entirely** and every sequence collapses to a static stack. Not "shorter animations" — *no* animation.

---

### 7.1 Pattern A — The pinned panel stack ★ core pattern

Used by all three. Bevel: 4 fixed panels in a 3.2× container. Apple: `.sticky-element` (100vh) in `.sticky-container` (2.5×). Bridge: `sticky top-0 h-dvh` in 3.6×–7.9× containers.

**The formula:** container height = `(N + 1) × 100dvh` for N panels. The extra viewport is entry/exit breathing room.

```html
<section class="pin-stack" data-panels="4" data-theme="dark">
  <div class="pin-stage">                      <!-- sticky, 100dvh -->
    <div class="pin-panel" data-panel="0">…</div>
    <div class="pin-panel" data-panel="1">…</div>
    <div class="pin-panel" data-panel="2">…</div>
    <div class="pin-panel" data-panel="3">…</div>
  </div>
</section>
```

```css
.pin-stack { height: calc((var(--panels) + 1) * 100dvh); position: relative; }
.pin-stage { position: sticky; top: 0; height: 100dvh; overflow: hidden; }
.pin-panel { position: absolute; inset: 0; opacity: 0;
             will-change: opacity, transform; }
.pin-panel[data-panel="0"] { opacity: 1; }
```

```js
ScrollTrigger.create({
  trigger: '.pin-stack',
  start: 'top top',
  end: 'bottom bottom',
  scrub: true,
  onUpdate(self) {
    const n = panels.length;
    const pos = self.progress * n;          // 0 → n
    panels.forEach((p, i) => {
      const d = Math.abs(pos - (i + 0.5));  // distance from this panel's centre
      const o = gsap.utils.clamp(0, 1, 1.6 - d * 1.6);
      gsap.set(p, { opacity: o, y: (pos - (i + 0.5)) * -40 });
    });
  }
});
```

**Where FT uses it:** the *"So sichern wir Ihr Objekt"* five-layer narrative. This content is already written and is a perfect fit — five panels, 6 × 100dvh container. Each layer crossfades over a fixed 3D render of the property as protection is added.

**Cap it at 5 panels / 6 viewports.** Beyond that users start scrubbing to escape.

---

### 7.2 Pattern B — Scroll-scrubbed video ★ the signature move

Bevel's best technique, confirmed empirically (`currentTime` 1.99 → 5.52 driven by scroll position).

```js
function scrubVideo(video, trigger) {
  video.pause();
  video.muted = true; video.playsInline = true; video.preload = 'auto';

  const ready = () => ScrollTrigger.create({
    trigger, start: 'top top', end: 'bottom bottom', scrub: 0.6,
    onUpdate(self) {
      const t = self.progress * video.duration;
      if (Math.abs(video.currentTime - t) > 0.02) video.currentTime = t;
    }
  });
  video.readyState >= 2 ? ready()
    : video.addEventListener('loadedmetadata', ready, { once: true });
}
```

**Encoding requirements — this fails without them:**
- **Keyframe every 6–12 frames** (`-g 8`). Default GOP ≈ 250 makes seeking stutter badly.
- **`-movflags +faststart`** — moov atom first.
- **Two renditions:** 1920×1080 desktop / 960×540 mobile, `<source media>`-switched.
- **≤ 8 seconds, ≤ 2.5 MB.** Bevel's are 5.5–6s.
- **`preload="auto"`** for scrubbed video (unlike Apple's `preload="none"` — different job, different answer).

```bash
ffmpeg -i in.mov -an -c:v libx264 -crf 23 -g 8 -pix_fmt yuv420p \
  -movflags +faststart -vf scale=1920:-2 out-1920.mp4
```

**Where FT uses it — three high-value places:**

1. **The FC-8D Pro exploded view.** You already have a scroll-exploded camera. Rebuild it as scrubbed video instead of DOM transforms: a rendered turntable/disassembly clip scrubbed across 3 viewports. Cheaper, smoother, and far better on mobile than transforming six DOM layers.
2. **Installation time-lapse.** A clean install — cable into conduit, hole filled, floor swept — scrubbed over 2.5 viewports. This is the literal proof of the *"Wir verlassen jeden Ort besser"* pledge, and it is the most defensible differentiator in the whole business. **No competitor can copy it without doing the work.**
3. **Day→night camera transition.** Scrub a single fixed shot from daylight through dusk to IR night vision. Sells the sensor in three seconds with no spec table.

---

### 7.3 Pattern C — Staggered entrance reveal

Apple's `staggered-start` (20 instances). The default for every non-pinned section.

```css
[data-rev] { opacity: 0; transform: translateY(28px);
             transition: opacity var(--dur-4) var(--ease-out),
                         transform var(--dur-4) var(--ease-out); }
[data-rev].is-in { opacity: 1; transform: none; }
```

```js
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const items = e.target.matches('[data-rev-group]')
      ? [...e.target.querySelectorAll('[data-rev]')] : [e.target];
    items.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 70));
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
```

- Stagger **70ms**, cap the group at **6 items** (420ms total; beyond that the last item feels broken).
- Distance **28px**, never more — big travel reads as cheap.
- **Fire once.** Never re-animate on scroll-up. All three references do this.
- Order: eyebrow → headline → lead → media → cards.

---

### 7.4 Pattern D — The responsive pin grammar

Apple's best transferable idea. Adopt the vocabulary directly:

```
{breakpoint}-pin-{position}
  positions: top-center · center · center-left · center-right · bottom-center · self-bottom-center
  breakpoints: small · medium · large    (omit = all)
```

```html
<div class="media-block large-pin-center medium-pin-top-center">
<div class="caption-container large-pin-center-left small-pin-top-center">
```

Why it matters: on desktop a spec caption parks **centre-left** beside the product; on mobile the same caption parks **top-centre** above it. One component, two choreographies, declared in markup rather than branched in JS.

---

### 7.5 Pattern E — Horizontal scroll gallery

Apple's `scroll-container` / `scroll-gallery` / `scroll-item` + `paddlenav` (measured 5,930px wide card set).

```css
.scroll-gallery {
  display: flex; gap: var(--sp-6);
  overflow-x: auto; scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding-inline: max(var(--gutter), calc((100vw - var(--container)) / 2));
}
.scroll-gallery::-webkit-scrollbar { display: none; }
.scroll-item { flex: 0 0 min(78vw, 420px); scroll-snap-align: center; }
```

**Accessibility is mandatory here** and Apple gets it right: paddle buttons with `aria-label`, arrow-key handling, `:focus-visible` scrolling the item into view, and the container reachable by keyboard.

**Where FT uses it:** the 18-product FTronics catalogue and the 8 FTronics Akademie tutorials — both are natural horizontal sets that currently sit in flat grids.

---

### 7.6 Pattern F — Theme inversion as sectioning

Apple alternates `#fff` ↔ `#f5f5f7` — that's their *only* sectioning device. Bevel flips a whole section to `u-theme-dark` (`#1f2025`).

FT is dark-first, so invert the logic: the page runs dark, and **one or two sections flip to light** as a hard reset. Because the semantic token layer (§6.1) is doing the work, this is a single attribute:

```html
<section data-theme="light">…</section>
```

Suggested light sections: **Auszeichnungen** (awards read as credentials on white) and **Ratgeber** (editorial reads better on light). Everything else stays dark.

Transition the flip over `--dur-4` on `background-color` and `color` so it feels intentional rather than like a page break.

---

### 7.7 Pattern G — Parallax, used sparingly

Apple: 4 instances on a 27-viewport page. That restraint is the lesson.

```js
gsap.to('.parallax-layer', {
  yPercent: -12, ease: 'none',
  scrollTrigger: { trigger: '.parallax-wrap', start: 'top bottom', end: 'bottom top', scrub: true }
});
```

Maximum **±12%** travel. Background media only, never text. Budget: **2 instances on the whole homepage.**

---

### 7.8 Pattern H — Progress affordance

Long pinned sequences need to tell the user where they are, or the pin reads as a broken page.

For the five-layer narrative: a fixed vertical rail on the left, five ticks, active tick fills with `--ft-signal-500` and the label animates in. Rail sits at `--fg-tertiary` at 24% opacity. This is the **only** place accent colour appears in that section.

```js
// tie to the same ScrollTrigger progress driving the panels
const active = Math.min(n - 1, Math.floor(self.progress * n));
ticks.forEach((t, i) => t.classList.toggle('is-active', i === active));
```

---

### 7.9 The homepage scroll score

The complete choreography, section by section. Total target: **9.5 viewports** — between Bevel (12.3) and a conventional page, appropriate for a service business where the phone number is the conversion.

| # | Section | Height | Pattern | What the user does |
| --- | --- | --- | --- | --- |
| 1 | Hero | 1.0 | Looping bg video (`preload="metadata"`), headline stagger on load | Reads the promise |
| 2 | Trust strip | 0.4 | Sticky-until-passed badge row | Registers awards, 15+ years, DSGVO |
| 3 | **FC-8D Pro exploded** | **3.0** | **B — scrubbed video** + `pin-center` captions | **Scrubs the camera apart** |
| 4 | Craft pledge | 1.2 | **B — install time-lapse**, C on the 4 pledge cards | Watches a clean install |
| 5 | Leistungen | 1.0 | C — 6-card stagger, hover elevation | Scans the six services |
| 6 | **Five-layer narrative** | **6.0** | **A — pinned stack** + H progress rail | **Advances 5 protection layers** |
| 7 | FTronics catalogue | 1.0 | E — horizontal gallery | Swipes 18 products |
| 8 | Auszeichnungen | 0.8 | F — light flip | Reads credentials |
| 9 | 3 Schritte | 0.9 | C + D — responsive pin | Understands the process |
| 10 | Reviews | 0.8 | E — horizontal gallery | Reads social proof |
| 11 | Contact CTA | 0.8 | C — form field stagger | Converts |

> **Total ≈ 17.9 viewports.** That is deliberately over the 9.5 target — because §11 says cut. Ship sections 1, 3, 5, 6, 8, 11 first (≈ 12.6 viewports); add 4, 7, 9, 10 once the scrubbed video pipeline is proven. Sections 3, 4 and 6 are the ones that differentiate; the rest are table stakes.

---

## 8. Component specifications

### 8.1 Buttons

| Variant | Background | Text | Border | Radius | Padding | Use |
| --- | --- | --- | --- | --- | --- | --- |
| **Primary** | `--btn-primary-bg` (white) | `--btn-primary-fg` | none | `--r-pill` | `.85rem 1.6rem` | *Kostenlose Beratung* |
| **Secondary** | transparent | `--fg` | 1px `--btn-secondary-bd` | `--r-pill` | `.85rem 1.6rem` | *Produkte ansehen* |
| **Signal** | `--ft-signal-500` | white | none | `--r-pill` | `.85rem 1.6rem` | Once per page, max |
| **Quiet** | none | `--fg-secondary` | none | — | `.5rem 0` | Inline text links |

Weight 500, `--t-body-sm`, line-height 1.4. Hover: `translateY(-1px)` + background step, `--dur-2 --ease-out`. Active: `translateY(0) scale(.985)`. Focus: `outline: 2px solid var(--ring); outline-offset: 3px`.

**Minimum touch target 44×44px.** Pad the hit area, not the visual.

### 8.2 Cards

```css
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--r-lg);
  padding: var(--sp-8);
  transition: background var(--dur-3) var(--ease-out),
              border-color var(--dur-3) var(--ease-out),
              transform var(--dur-3) var(--ease-out);
}
.card:hover {
  background: var(--bg-card-hover);
  border-color: var(--border-strong);
  transform: translateY(-3px);
}
```

No glow. No `preserve-3d` tilt. Elevation is **surface + border + 3px lift** — that's the whole recipe, and it's what all three references do.

Variants: `.card--bento` (`--r-bento`, full-bleed media, min-height 420px), `.card--product` (1:1 media, spec chips), `.card--stat` (numeral at `--t-h2`, label at `--t-eyebrow`).

### 8.3 Spec chips

For `4K 8MP`, `IP67`, `PoE`, `NDAA`:

```css
.chip {
  font: 500 var(--t-body-sm)/1 var(--font-ui);
  letter-spacing: .04em; text-transform: uppercase;
  padding: .45rem .7rem; border-radius: var(--r-sm);
  background: rgba(255,255,255,.05);
  border: 1px solid var(--border);
  color: var(--fg-secondary);
}
```

Monochrome. The temptation to colour-code chips is exactly the Bevel trap — it works for health metrics, not for IP ratings.

### 8.4 Section header

The repeated unit that makes the page feel authored:

```html
<header class="section-head" data-rev-group>
  <p class="eyebrow" data-rev>Intelligente Erkennung</p>
  <h2 class="h2" data-rev>Sie sieht. Sie versteht. Sie entscheidet.</h2>
  <p class="lead" data-rev>…</p>
</header>
```

`.lead` capped at `--container-text` (680px). Never let body copy run the full 1200px.

### 8.5 Navigation

Transparent over hero → on scroll past 80px, gains `background: rgba(14,16,18,.72); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border)`, over `--dur-2`. Height 72px → 60px. Apple's `globalnav-curtain` does exactly this.

### 8.6 Forms

Inputs: `--bg-raised`, 1px `--border`, `--r-md`, min-height 52px, 16px font (prevents iOS zoom). Focus: `border-color: var(--ring)` + `box-shadow: 0 0 0 3px rgba(255,77,61,.18)`. Labels above, `--t-body-sm`, `--fg-secondary`. Errors below in `--ft-error` with `aria-describedby`.

The **Konfigurator** is the highest-value component: 4 steps, progress bar in `--ft-signal-500`, each step a horizontal slide (`translateX` ±24px + fade, `--dur-3`), selections as large tappable cards not radio buttons, running summary always visible.

---

## 9. Page blueprints

**Homepage** — §7.9 score. Ship the six core sections first.

**Produkte** — sticky filter bar (Alle / Kameras / NVR / Zubehör) at `top: 72px`; masonry-free uniform grid, 3-up desktop / 2-up tablet / 1-up mobile; each card `data-rev` with 70ms stagger; filter changes animate with FLIP (`gsap.from` on position delta), never a hard re-render.

**Produktdetail** — hero with pinned product media (`large-pin-center`) while spec captions scroll past (`large-pin-center-left`); scrubbed exploded-view sequence; sticky spec-table nav; comparison slider; **fix the 25/30 fps and lens contradictions from the content audit before this ships.**

**Lösungen (Privat / Gewerbe)** — two pinned panel stacks of 3 panels each; alternating media side; light-theme flip for the *Ihre Vorteile* block.

**Ratgeber** — `data-theme="light"`, editorial. 680px measure, 1.6 line-height, scroll progress bar at top. **This section needs the seven articles actually written** — right now it is seven teasers linking nowhere.

**FAQ** — accordion, `grid-template-rows: 0fr → 1fr` transition (animatable, unlike `height: auto`), category filter chips, `<details>`-based for keyboard/SEO.

**Kontakt** — two-column: form left, contact facts + map right. Add the opening hours (Mo–Fr 08:00–17:00) that currently exist only in JSON-LD.

---

## 10. Motion, accessibility & performance contract

### Reduced motion — a hard gate

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    scroll-behavior: auto !important;
  }
  [data-rev] { opacity: 1 !important; transform: none !important; }
  .pin-stack { height: auto !important; }
  .pin-stage { position: static !important; height: auto !important; }
  .pin-panel { position: static !important; opacity: 1 !important; }
}
```

Pinned stacks **collapse into a normal vertical stack**. Scrubbed videos show their poster with a manual play control. Lenis never initialises. This is not a degraded experience — it is a complete, static, readable page.

### Accessibility floor (WCAG 2.2 AA)

- Contrast ≥ 4.5:1 body, ≥ 3:1 large text. `--ft-fog-400` (#9aa3aa) on `--ft-ink-900` (#0e1012) = **7.4:1** ✓. `--ft-signal-500` (#ff4d3d) on the same = **4.8:1** ✓ — but **never** use signal for body copy.
- Visible `:focus-visible` on everything interactive. Never `outline: none` without a replacement.
- Skip link (`Zum Inhalt springen`) — already present, keep it.
- Every scrubbed/looping video: `aria-hidden="true"` if decorative, otherwise a real `<track>` caption. All muted, all `playsInline`.
- Horizontal galleries: arrow keys, paddle buttons with labels, focus scrolls into view.
- `lang="de"`; `lang="en"` on any English term.
- Headings in order. One `<h1>` per page.
- Pinned sections must be escapable by continuing to scroll — **never** trap.

### Performance budget

| Metric | Target |
| --- | --- |
| LCP | < 2.0 s |
| CLS | **< 0.05** — reserve every media box with `aspect-ratio` |
| INP | < 200 ms |
| JS (initial, gzip) | < 120 KB — Lenis ~4 KB, GSAP+ScrollTrigger ~48 KB |
| Hero video | < 1.2 MB, `preload="metadata"` |
| Scrubbed video | < 2.5 MB each, `preload="auto"`, **max 3 per page** |
| Fonts | 2 families × 3 weights, self-hosted, `font-display: swap`, subset `latin-ext` |

**Video loading strategy — the Apple/Bevel split:**
- Below-the-fold, *plays* on approach → `preload="none"`, load via IntersectionObserver at `rootMargin: '200% 0px'` (Apple's approach).
- **Scrubbed** → `preload="auto"`, because seeking needs buffered frames (Bevel's approach).

Kill any ScrollTrigger whose section is off-screen. `will-change` only during animation — set it on enter, remove on complete. A permanent `will-change` on many elements is worse than none.

---

## 11. Do / Don't

**Do**
- One accent. Twice per viewport, maximum.
- Primary button = white on dark. Always.
- Semibold 500–600 headlines. Never 700+.
- Negative tracking that tightens as type grows.
- `dvh` not `vh` for pinned stages.
- Reveal once, never re-animate on scroll-up.
- Reserve every media box with `aspect-ratio`.
- Let one section carry the page (Apple gives 63% to one story).
- `text-wrap: balance` + `hyphens: auto` on German display type.

**Don't**
- Don't keep three accent colours. This is the single highest-impact fix.
- Don't use glows or `box-shadow` bloom for depth. Surface + border + 3px lift.
- Don't run infinite ambient animations. Delete `beam-pulse`.
- Don't hijack or block scroll. Ever.
- Don't smooth-scroll touch (`smoothTouch: false`).
- Don't animate `height`/`top`/`width`/`margin`.
- Don't colour-code spec chips.
- Don't exceed 5 panels in a pinned stack.
- Don't put more than 3 scrubbed videos on one page.
- Don't let body copy exceed 680px measure.
- Don't ship the Ratgeber section until the articles exist.

---

## 12. Claude Design brief (copy-paste)

> Design and build a dark-first, scroll-choreographed marketing site for **FT Sicherheitstechnik**, a Mannheim security-technology installer (alarm systems, 4K video surveillance, access control, smart home, fire safety) with its own hardware brand, **FTronics**. Audience: German homeowners and commercial/industrial facility managers. Language: German (formal *Sie*). Conversion goal: a free on-site consultation request; phone `+49 621 159 647 34`.
>
> **Visual language.** Dark ground `#0e1012`, cards `#1b1f22`, white text, secondary `#9aa3aa`. Exactly **one** accent, `#ff4d3d`, used at most twice per viewport for the primary action and active stepper states. The primary button is **white with near-black text** — never the accent. Functional green `#33c26a` only for operational status chips, never as a CTA. No glows, no bloom shadows, no ambient looping animation. Depth comes from surface elevation plus a 1px `rgba(255,255,255,.09)` border plus a 3px hover lift.
>
> **Typography.** Clash Grotesk for display, Inter for UI/body, both self-hosted. Headlines weight 600, never bolder. Fluid `clamp()` scale from 44→80px H1 and 52→96px display. Letter-spacing tightens as size grows: −0.022em at display, −0.018em H1, −0.014em H2, 0 at body. Line-height 1.02 at display up to 1.60 at body. Every section opens with a small uppercase eyebrow at +0.06em in tertiary grey. German compounds need `hyphens: auto` and `text-wrap: balance` on all display type. Body copy capped at a 680px measure.
>
> **Layout.** 12-column grid, 1200px container, section padding `clamp(5rem, 7.143vw + 3.571rem, 10rem)`. Radii: 8px chips, 14px buttons, 20px cards, 36px bento panels, pill for buttons.
>
> **Scroll is the primary interaction.** Use Lenis (duration 1.05, expo-out easing, `smoothTouch: false`) driving GSAP ScrollTrigger. Implement five patterns:
> 1. **Pinned panel stacks** — container `(N+1) × 100dvh`, inner stage `position: sticky; top: 0; height: 100dvh`, panels crossfade on scroll progress. Use for the five-layer property-protection narrative, with a fixed left progress rail.
> 2. **Scroll-scrubbed video** — `video.currentTime = progress × duration`, `preload="auto"`, muted, `playsInline`, encoded with `-g 8 -movflags +faststart`. Use for the FC-8D Pro exploded view, a clean-installation time-lapse, and a day→night camera transition. Max 3 per page.
> 3. **Staggered entrance reveals** — IntersectionObserver at 0.15 threshold, `translateY(28px)` + fade, 70ms stagger, capped at 6 items, fires once and never re-animates.
> 4. **A responsive pin grammar** — `{small|medium|large}-pin-{top-center|center|center-left|bottom-center}` so an element can park differently per breakpoint.
> 5. **Horizontal scroll galleries** with `scroll-snap`, paddle buttons, and full keyboard support — for the 18-product FTronics catalogue and the customer reviews.
>
> Section grounds alternate: the page is dark, with the awards and Ratgeber sections flipping to a light theme via a single `data-theme="light"` attribute that reassigns semantic tokens.
>
> **Homepage order:** hero with looping background video → trust badge strip → scrubbed FC-8D Pro exploded view (3 viewports) → craft-pledge installation time-lapse → six service cards → pinned five-layer protection narrative (6 viewports) → FTronics product gallery → awards (light) → three-step process → reviews gallery → contact form. Target 9–13 viewports total.
>
> **Non-negotiable:** `prefers-reduced-motion` collapses every pinned stack into a static vertical stack, freezes scrubbed video at its poster, and skips Lenis entirely. WCAG 2.2 AA contrast. Visible focus rings. 44px minimum touch targets. Scroll is never hijacked or blocked. CLS below 0.05 — reserve every media box with `aspect-ratio`.

---

## Appendix — measured reference data

| | Bevel | Apple AirPods Pro | Bridge |
| --- | --- | --- | --- |
| Page height | 13,010px | 28,626px | 14,944px |
| Viewports | 12.3× | 27.1× | 14.2× |
| Base font | 17px system | 17px SF Pro Text | 16px Inter |
| Ground | `#f3f6f7` | `#ffffff` / `#f5f5f7` | `#ffffff` / `#fbfbfa` |
| Text | `#222326` | `#1d1d1f` | `#0a0a0a` |
| Accent | `#f46c41` | (blue, minimal) | `#006fe6` |
| Heading weight | 600 | 600 | 500–600 |
| Max tracking | −0.03em | −0.015em | −0.06em |
| Display line-height | 1.0 | 1.04 | 1.11 |
| Container | 90rem (1440px) | 1138 / 1300px | 1456px |
| Section padding | `clamp(5rem, 7.143vw+3.571rem, 10rem)` | — | — |
| Card radius | 36px | ~18–28px | 14px |
| Button radius | 8rem (pill) | pill | 14px |
| Smooth scroll | **Lenis** | native + sticky | **Lenis** |
| Scroll engine | **GSAP ScrollTrigger** | in-house `AC` | custom + Three.js |
| Tallest pin container | 3.3× vh | 17.1× vh | 7.9× vh |
| Video strategy | `preload="auto"`, **scrubbed** | `preload="none"`, play on approach | none (WebGL) |
| Video dimensions | 786×1704 portrait, 5.5–6s | 1800×1050, 7.5s loop | — |

*Compiled 2026-08-23 from live DOM and computed-style inspection of bevel.health, apple.com/ph/airpods-pro, and bridge.surf, plus FT Sicherheitstechnik's current `base.css`, `effects.css` and `fonts.css`.*
