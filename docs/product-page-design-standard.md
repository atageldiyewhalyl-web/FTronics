# FTronics Product Page Design Standard

> **Status:** Normative design and content blueprint  
> **Reference implementation:** `/produkte/fc-8d-pro`  
> **Applies to:** All FTronics product-detail pages  
> **Goal:** Every product page should feel like part of one premium industrial system while still telling the product's strongest individual story.

---

## 1. Core principle

An FTronics product page is a visual sales narrative, not a catalogue sheet.

Every section must do one of four jobs:

1. Establish the product in a credible real-world environment.
2. Prove a differentiating claim with an image, comparison, component, or number.
3. Explain why that proof matters to a professional buyer.
4. Move the buyer toward consultation or specification.

Technical data remains complete and easy to scan, but it comes after the visual proof. Do not open with a wall of specifications.

### Non-negotiable rules

- Use one primary accent colour only: FT red for actions and small emphasis.
- Keep claims factual and traceable to the product data sheet.
- Render all headings and body copy as live HTML. Never bake marketing text into generated images.
- Give each section one visual idea and one main claim.
- Alternate visual density: immersive image, quiet copy, interactive proof, quiet copy.
- Keep the technical specifications inside **one card and one column**.
- Respect `prefers-reduced-motion`; the complete story must remain readable without animation.
- Mobile layouts must stack naturally and must never depend on overlay text remaining over an image.

---

## 2. Standard page structure

Use this order unless the product genuinely lacks the relevant capability. A replacement section must perform the same narrative job.

| Order | Section | Requirement | Narrative job |
| --- | --- | --- | --- |
| 1 | Installed-product hero | Required | Identify the product, category, primary promise, and CTA. |
| 2 | Four-claim proof bento | Required | Give an immediate visual summary of the strongest verified claims. |
| 3 | Product-positioning statement | Required | Explain who the product is for and why it exists. |
| 4 | Core-technology spotlight | Required | Make the product's most important internal technology tangible. |
| 5 | Intelligent-feature band | Conditional | Demonstrate AI, automation, analytics, or another active capability. |
| 6 | Component teardown | Preferred | Show build quality and connect internal parts to buyer benefits. |
| 7 | Three proof counters | Preferred | Summarise the teardown or product position with memorable facts. |
| 8 | Resilience/use-case panel | Required | Prove environmental, operational, or workload suitability. |
| 9 | Visual comparison | Conditional | Prove a before/after, day/night, zoom, range, or quality claim. |
| 10 | Technical data | Required | Present the complete specification in one readable card. |
| 11 | Consultation CTA | Required | Close with one primary action and one optional secondary action. |

### Section substitutions

Keep the narrative role even when the visual subject changes.

| Camera reference section | Valid substitute for another product type |
| --- | --- |
| Sensor spotlight | Processor, lens assembly, antenna, power stage, storage, controller, locking mechanism |
| AI detection band | Access workflow, alarm sequence, failover, analytics, automation, remote management |
| Component teardown | Exploded hardware, system architecture, connector map, installation sequence |
| Weather panel | Continuous-load test, tamper test, ingress test, heat test, network outage scenario |
| Day/night comparison | Before/after, standard/zoomed, unaided/assisted, disconnected/redundant, legacy/current |

Do not add sections only to make the page longer. If a product has no honest comparison or intelligent sequence, omit that section and strengthen the next applicable proof.

---

## 3. Global layout and typography

Use the existing project tokens. Do not create product-specific values when a token already exists.

### Layout

- Standard content shell: `var(--container)` = `1260px`.
- Wide media shell: `var(--container-wide)` = `1440px` when the image needs it.
- Horizontal gutter: `var(--gutter)` = `clamp(1rem, 3vw, 2rem)`.
- Standard section spacing: `var(--section-pad)` or `clamp(5rem, 7vw, 8rem)`.
- Long-form text measure: `42–56ch` for left-aligned copy.
- Centred statement measure: maximum `900px`.
- Standard card radius: `var(--r-lg)` = `20px`.
- Immersive media radius: `var(--r-xl)` = `28px`.
- Bento radius: `var(--r-bento)` = `36px` when a softer editorial block is needed.

### Typography

- Font family: DM Sans through `var(--font-display)` and `var(--font-ui)`.
- Hero title: `var(--t-h1)`, weight `700`, tight line height.
- Section title: `var(--t-h2)`, weight `600`.
- Card title: `var(--t-h4)`, weight `500–600`.
- Body: `var(--t-body)`, line height `1.45–1.6`.
- Small technical copy: `var(--t-body-sm)`.
- Eyebrow: `var(--t-eyebrow)` and the existing `.ft-eyebrow` treatment.

### Text hierarchy per section

Most narrative sections contain only:

1. Eyebrow: category or evidence source.
2. Headline: one clear claim.
3. Supporting paragraph: why it matters, ideally 45–80 words.

Do not add a second headline, multiple competing CTAs, or an unstructured list beside the main claim.

---

## 4. Image-generation system

All generated imagery must feel like one photographic world.

### Shared visual direction

- Premium German industrial-security photography.
- Real architecture, believable installation height, accurate cabling, realistic materials.
- Neutral paper-grey, concrete, aluminium, glass, muted greenery, and restrained night blues.
- Natural or practical light; avoid glossy consumer-electronics gradients.
- Calm, precise compositions with generous negative space.
- No logos, labels, UI text, watermarks, fake compliance marks, or unreadable pseudo-text.
- No impossible lens geometry, floating cables, duplicated screws, distorted housings, or invented ports.
- Preserve the exact product silhouette and mounting method from the approved product reference image.
- Product must look installed or engineered, not casually placed as a lifestyle prop.

### Product-reference rule

Every generation must use an approved transparent product cutout or approved product photograph as a visual reference. The product's shape, lens count, housing seams, mounting bracket, connector placement, and finish are identity-critical.

If no approved product reference exists, create and approve that asset before generating scene imagery.

### Master prompt prefix

Use this prefix for every scene, then append the section-specific brief:

```text
Premium editorial industrial-security photograph for FTronics, realistic German commercial architecture, restrained neutral palette, physically accurate materials and installation, natural cinematic light, high detail without artificial HDR, exact supplied product identity and proportions, no text, no watermark, no extra devices, no invented ports or cables.
```

### Negative prompt / rejection criteria

```text
Reject: consumer smart-home styling, neon cyberpunk colour, sci-fi interface overlays, floating product, excessive bloom, fake text, fake logos, impossible reflections, distorted housing, duplicated hardware, exposed unsafe wiring, implausible installation, people looking at camera, stock-photo handshake, exaggerated depth of field that hides the proof.
```

---

## 5. Image brief by section

### 5.1 Installed-product hero

**Purpose:** Show the product where it belongs and leave a deliberate text-safe zone.

- Preferred source size: `2400 × 1340` or larger.
- Aspect: approximately `16:9`.
- Desktop composition: product in the right 35–40%; clean negative space in the left 45–50%.
- Mobile crop: the product must survive a `16:9` crop with `object-position: 70–78% center`.
- Lighting: bright overcast or controlled daylight; enough contrast to read the product without making the building dramatic.
- Do not place important architecture or hardware behind the left-side copy.

Prompt suffix:

```text
The product is professionally mounted on a real commercial building, positioned in the right third of a wide 16:9 frame. Reserve the entire left half as quiet pale architectural negative space for dark website typography. Keep the product large enough to identify, with realistic mounting and cable concealment. Bright restrained daylight, premium documentary realism.
```

Text placement:

- Desktop: left aligned, maximum `min(46ch, 52%)`.
- Order: series eyebrow → product name → one-sentence promise → short provenance line → primary CTA.
- Mobile: image first, then text below it. Remove the overlay scrim.

### 5.2 Four-claim proof bento

**Purpose:** Make the four most valuable claims visible within the first two screens.

- Exactly four claims.
- Use the current asymmetric layout: one tall proof, two standard proofs, one wide proof.
- At least three tiles should contain evidence imagery.
- Claims must not repeat the hero sentence word-for-word.
- Use live HTML over the image.

Recommended assets:

| Tile | Shape | Evidence |
| --- | --- | --- |
| Primary proof | Tall, approximately `4:5` | The product in its hardest or most differentiating condition. |
| Technology proof | Landscape/square crop | Macro internal technology or precise product detail. |
| Durability proof | Landscape/square crop | Rain, heat, dust, impact, or workload context. |
| Infrastructure proof | Wide letterbox | Cable, connector, controller, compliance, or system integration. |

Copy limits:

- Heading: 3–8 words.
- Body: 18–35 words.
- Numbers in the heading must match the specification table exactly.

### 5.3 Product-positioning statement

**Purpose:** Create a quiet editorial pause and state the product philosophy.

- No image is required.
- Centre the block at a maximum width of `900px`.
- Use generous vertical space: approximately `9–16rem` above and `6–10rem` below on desktop.
- Write 60–100 words.
- Name the professional environment and the cost of failure.
- Avoid unsupported superiority claims such as “best”, “unbeatable”, or “perfect”.

### 5.4 Core-technology spotlight

**Purpose:** Turn the most important internal component into a full-screen visual story.

- Preferred source size: `2200 × 1640` or larger.
- Minimum desktop height: `100svh`.
- Subject belongs in the lower half; upper area fades naturally toward the page background.
- Reserve a broad centred text area around the visual midpoint or lower-middle.
- Use a soft background-matched gradient, not an opaque card behind the copy.

Prompt suffix:

```text
Extreme technical macro of the supplied product's core component, physically accurate and premium, occupying the lower half of a tall editorial frame. The upper half transitions naturally into clean pale grey negative space that can blend into a website background. Keep the central text-safe region low in detail and high in tonal consistency. No labels or diagram text.
```

Text placement:

- Centred, maximum `900px`.
- Use a high-contrast eyebrow pill only when the image needs a firm anchor.
- One headline and one explanatory paragraph; no cards inside this section.

### 5.5 Intelligent-feature band

**Purpose:** Demonstrate a capability as a scroll-driven sequence.

- Background source size: around `2200 × 930`, wide cinematic aspect.
- Subject/evidence should occupy the left or centre-left; reserve the right half for the opening copy.
- Prepare three supporting cards at the same aspect ratio, preferably `4:5` and at least `900 × 1100`.
- Any detection boxes or UI markings must accurately represent the actual feature and remain visually restrained.

Prompt suffix for the background:

```text
Wide night-time commercial security scene demonstrating the product's active capability. Place the meaningful detected subject in the left half and reserve the right half as low-detail dark negative space for white website copy. Realistic surveillance perspective, restrained exposure, readable environmental detail, no decorative HUD and no text.
```

Supporting card rule:

- Each image proves one distinct function.
- Use the same camera viewpoint language and colour grade across all three.
- Card caption: function name plus 20–35 words.

### 5.6 Component teardown

**Purpose:** Explain build quality through a scroll-scrubbed exploded sequence.

- Preferred media: short MP4, `854 × 480` ratio or higher-resolution equivalent.
- Transparent or white background matching the page.
- Begin with the complete product.
- Separate components cleanly over the middle of the clip.
- Hold or rotate the separated state long enough for captions.
- End in a stable state; avoid a hard loop.
- Default caption window: progress `0.30–0.86`.
- Write one caption per meaningful component, normally 4–6.

Each caption contains:

- Component name.
- One buyer benefit in 25–45 words.
- Up to three verified specification chips.

If an exploded animation cannot be produced accurately, replace this section with a static system architecture or connector map. Do not fake internal parts.

### 5.7 Resilience or use-case panel

**Purpose:** Put the product inside its hardest credible operating condition.

- Preferred source size: `1800 × 1000` or larger.
- Product/subject on the right; left 45–55% reserved for copy.
- Use one large rounded panel, not separate image and text cards.
- The condition must correspond to verified ratings or intended use.

Prompt suffix:

```text
The supplied product operating in a credible demanding commercial environment. Position the product and the visible proof of the condition in the right half. Reserve the left half as calm low-detail space for dark copy. Show the condition realistically and safely; do not exaggerate beyond the verified specification.
```

Mobile rule: allow the scrim to cover more of the image so text remains readable; do not force a two-column layout.

### 5.8 Visual comparison

**Purpose:** Let the user verify a product claim directly.

- Both images must use the same viewpoint, crop, focal length, and subject arrangement.
- Preferred source size: `1600 × 1200` each or larger.
- Use the existing `Compare` control at `16:9` display ratio unless the content requires otherwise.
- Labels must be factual: `Tag / Nacht`, `Standard / 25× Zoom`, `Ohne WDR / Mit WDR`.
- Never simulate a competitor's poor result.

Generation workflow:

1. Approve the base scene.
2. Produce the second state as an edit of the same base, not a new independent generation.
3. Confirm fixed geometry by overlaying the two outputs before use.

---

## 6. Copywriting and text placement

### Product messaging hierarchy

Define these before designing images:

```yaml
product_name: FC-8D Pro
series: Pro-Serie
category: Dome IP-Kamera
primary_promise: 4K Klarheit für professionelle Außenüberwachung
audience: Industrie, Gewerbe, Logistik, KRITIS
core_technology: Sony Starvis IMX415
active_capability: Personen- und Fahrzeugerkennung
resilience_proof: IP67, IK10, -30 °C bis +60 °C
integration_proof: PoE, ONVIF, NDAA
primary_cta: Beratung anfragen
```

### Headline rules

- Use a claim, not a topic label.
- Prefer 4–10 words.
- Use sentence case.
- Allow one short rhetorical construction when it sharpens the benefit.
- Do not repeat the product name in every section.
- Do not use technical numbers in a headline unless the number is the proof.

Good:

- `Wenn das Licht geht, hört sie nicht auf zu arbeiten.`
- `Sechs Bauteile. Eine Industrie-Klasse.`
- `Ein Sensor, der für Industrieanwendungen entwickelt wurde.`

Weak:

- `Unsere Funktionen`
- `Innovative Technologie`
- `Mehr erfahren über die Kamera`

### Body-copy rules

- Start with the operational problem or consequence.
- Explain how the product handles it.
- End with a specific professional benefit.
- Keep technical units consistent with the specification table.
- Use German decimal commas and typographic symbols on German pages.
- Do not turn every paragraph into a sequence of fragments.

### Text-safe zones

| Pattern | Desktop copy zone | Mobile behavior |
| --- | --- | --- |
| Hero | Left 45–52% | Image above, text below |
| Dark intelligent band | Right 40–48% at sequence start | Static copy followed by cards |
| Technology spotlight | Centred, max `900px` | Same, with added bottom image space |
| Resilience panel | Left `54ch` | Full-width copy over stronger vertical scrim |
| CTA | Centred, headline max `16ch` | Stack buttons and centre them |

Never solve poor contrast with a hard-edged translucent rectangle unless the component specification explicitly calls for a card. Prefer a background-matched scrim or move the copy outside the image on mobile.

---

## 7. Animation standard

Motion communicates sequence and evidence. It is not decoration.

### Shared reveal

Use `data-rev` for ordinary section elements and `data-rev-group` for staggered groups.

- Start: `opacity: 0; transform: translateY(28px)`.
- End: `opacity: 1; transform: none`.
- Duration: `var(--dur-4)` = `700ms`.
- Easing: `var(--ease-out)` = `cubic-bezier(0.16, 1, 0.30, 1)`.
- Group stagger: `70ms`, capped after the sixth child.
- Trigger once at approximately 15% visibility.

Do not place `data-rev` on every nested wrapper. Animate meaningful reading units.

### Intelligent-feature scrub

Use the existing `ScanBand` pattern.

- Section height: `280svh` on desktop.
- Sticky stage: `100svh`.
- A single CSS variable `--p` drives all states from `0` to `1`.
- Background blur: `0 → 18px` across the full sequence.
- Background scale: `1 → 1.08`.
- Opening copy fades out through roughly the first half.
- Feature cards enter after approximately `--p: 0.42`.
- The same progress value must drive every property so the sequence reverses correctly on upward scroll.

Do not combine this section with independent timed animations.

### Component teardown scrub

Use the existing `Teardown` and `ScrollVideo` components.

- Desktop track: minimum `220svh`.
- Stage: sticky at the top and `100svh` high.
- Video uses `object-fit: contain`; exploded parts must never be cropped.
- Captions crossfade one at a time according to video progress.
- Caption transition: opacity plus a subtle `22px` lift and `0.97 → 1` scale.
- Mobile: remove sticky behavior, show the media and all captions in document order.

### Comparison control

- The comparison responds directly to pointer, touch, and keyboard input.
- Do not autoplay the divider.
- Preserve visible labels and an accessible control name.

### Reduced motion

Under `prefers-reduced-motion: reduce`:

- Remove scroll pinning and extra scroll height.
- Show content in normal document order.
- Set scrubbed sequences to a clear static state.
- Remove translation and scaling.
- A short opacity transition of around `200ms` is acceptable.
- Never hide information that was otherwise revealed by progress.

### Performance contract

- Animate only `transform`, `opacity`, `filter`, and `clip-path`.
- Use one passive scroll listener and one `requestAnimationFrame` loop per scrubbed section.
- Lazy-load below-the-fold images.
- Use `decoding="async"` for non-critical imagery.
- Use WebP or AVIF for still imagery and compressed MP4 for scrub video.
- Do not preload every page image.

---

## 8. Technical-data standard

The technical section is a factual reference surface and must remain visually quiet.

### Required structure

- Eyebrow: `Spezifikationen`.
- Heading: `Technische Daten`.
- Exactly one outer card.
- Exactly one column at every breakpoint.
- Specification groups stacked vertically inside the card.
- A hairline divider between groups.
- Each row uses semantic `dt` and `dd` elements.
- Term aligned left; value aligned right on wider screens.
- On very narrow screens, rows may stack if needed for legibility.
- Follow the specification card with the data-sheet download panel and factual notes.

Recommended data shape:

```js
const specGroups = [
  {
    title: 'Sensor & Bild',
    rows: [
      ['Bildsensor', '1/2,8″ Sony Starvis IMX415 CMOS'],
      ['Effektive Pixel', '3840 × 2160 (8 MP)'],
    ],
  },
]
```

### Data integrity

- Every number used in marketing copy must match this table.
- Preserve qualifiers such as `bis`, `ca.`, `typisch`, and `auf Anfrage`.
- Do not silently resolve contradictory source data. Flag it before publishing.
- Structured data must mirror verified on-page facts only.
- Footnotes belong on the page when a rating depends on laboratory conditions.

---

## 9. Reusable product content schema

Build future pages from structured content rather than duplicating the FC-8D Pro copy.

```js
const productPage = {
  seo: {
    title: '',
    description: '',
    canonical: '',
  },
  identity: {
    name: '',
    sku: '',
    series: '',
    category: '',
    audience: [],
  },
  hero: {
    eyebrow: '',
    promise: '',
    provenance: 'Für Profis entwickelt. Made for FT.',
    image: '',
    alt: '',
  },
  proofBento: [
    { kind: 'dark', tall: true, heading: '', body: '', image: '', alt: '' },
    { kind: 'photo', heading: '', body: '', image: '', alt: '' },
    { kind: 'photo', heading: '', body: '', image: '', alt: '' },
    { kind: 'photo', wide: true, heading: '', body: '', image: '', alt: '' },
  ],
  positioning: {
    eyebrow: '',
    heading: '',
    body: '',
  },
  coreTechnology: {
    eyebrow: '',
    heading: '',
    body: '',
    image: '',
    alt: '',
  },
  intelligentFeature: {
    enabled: true,
    eyebrow: '',
    heading: '',
    body: '',
    backgroundImage: '',
    backgroundAlt: '',
    cards: [{ heading: '', body: '', image: '', alt: '' }],
  },
  teardown: {
    enabled: true,
    heading: '',
    lead: '',
    video: '',
    parts: [{ name: '', benefit: '', specs: [] }],
  },
  counters: [{ value: '', label: '' }],
  resilience: {
    eyebrow: '',
    heading: '',
    body: '',
    image: '',
    alt: '',
  },
  comparison: {
    enabled: true,
    eyebrow: '',
    heading: '',
    body: '',
    before: { label: '', image: '', alt: '' },
    after: { label: '', image: '', alt: '' },
    figures: [{ value: '', label: '' }],
  },
  specifications: [],
  footnotes: [],
  datasheet: {
    href: '',
    label: '',
    fileSize: '',
  },
}
```

The component structure may be shared across product routes, but images, alt text, claims, proof order, and section copy must remain product-specific.

---

## 10. Asset naming and delivery

Use lowercase kebab-case:

```text
{sku}-hero.webp
{sku}-proof-night.webp
{sku}-proof-core.webp
{sku}-proof-resilience.webp
{sku}-proof-integration.webp
{sku}-technology-band.webp
{sku}-intelligence-band.webp
{sku}-feature-person.webp
{sku}-feature-vehicle.webp
{sku}-feature-line.webp
{sku}-teardown.mp4
{sku}-compare-before.webp
{sku}-compare-after.webp
{sku}-datasheet.pdf
```

### Export checklist

- Convert photographic assets to WebP or AVIF.
- Keep hero width at or above `2400px` when source quality allows.
- Keep full-bleed bands at or above `2200px` wide.
- Keep comparison pairs at identical dimensions.
- Check crops at `1440 × 900`, `1024 × 768`, `768 × 1024`, and `390 × 844`.
- Confirm no text or logo was generated into the image.
- Write specific German alt text that describes the visible evidence, not the marketing claim.

---

## 11. Build workflow for every new product page

1. Collect and reconcile the official specification sheet, product photos, and approved claims.
2. Complete the messaging hierarchy and reusable content schema.
3. Select the strongest core technology, active capability, resilience proof, and comparison.
4. Produce the hero first and approve the product identity and colour grade.
5. Use the approved hero as the visual reference for all remaining scene imagery.
6. Generate or photograph the bento proofs, spotlight, feature cards, and resilience panel.
7. Produce the teardown or approved substitute.
8. Produce the comparison pair as a locked-view edit workflow.
9. Implement the shared page structure and product-specific content.
10. Verify every visible number against the technical data.
11. Test motion and reduced motion.
12. Complete responsive and accessibility QA before publishing.

---

## 12. Final QA checklist

### Content

- [ ] Product name, SKU, category, and canonical URL are correct.
- [ ] Hero promise is one sentence and does not duplicate the positioning section.
- [ ] Every marketing number matches the technical-data card.
- [ ] Claims have no unsupported superlatives.
- [ ] German units, decimal commas, punctuation, and terminology are consistent.
- [ ] Structured data contains verified facts only.

### Visuals

- [ ] Product identity is consistent across every image.
- [ ] Hero has a clean desktop text-safe zone and a valid mobile crop.
- [ ] Bento contains exactly four distinct proofs.
- [ ] Generated imagery contains no fake text, logos, ports, or hardware.
- [ ] Comparison images share identical geometry.
- [ ] All alt text describes the visible evidence.

### Layout

- [ ] The narrative follows the standard section order or documents a justified substitution.
- [ ] Text measure stays within `42–56ch`, except centred statements up to `900px`.
- [ ] Technical data uses one card and one column.
- [ ] CTA is visible at the beginning and end of the page.
- [ ] No overlay copy collides with the product at any breakpoint.

### Motion and accessibility

- [ ] Ordinary reveals use the shared `data-rev` system.
- [ ] Scrubbed sections reverse smoothly when scrolling upward.
- [ ] Mobile layouts remove unnecessary pinning.
- [ ] Reduced-motion mode exposes all content without movement.
- [ ] Comparison controls work with pointer, touch, and keyboard.
- [ ] Focus states, contrast, heading order, and semantic spec markup are valid.

### Performance

- [ ] Hero image is appropriately prioritised; below-the-fold media is lazy-loaded.
- [ ] Images are WebP/AVIF and sized to their real display need.
- [ ] Scrub video is compressed and does not crop internal components.
- [ ] The page has no browser console errors.
- [ ] The page remains usable before all media finishes loading.

---

## 13. Reference implementation map

The current FC-8D Pro implementation demonstrates the standard patterns:

| Pattern | Reference |
| --- | --- |
| Page composition and content data | `src/app/produkte/fc-8d-pro/page.jsx` |
| Global product layouts and responsive rules | `src/styles/globals.css` |
| Scroll-driven intelligent band | `src/components/scan-band.jsx` |
| Scroll-scrubbed component teardown | `src/components/teardown.jsx` and `src/components/scroll-video.jsx` |
| Interactive before/after proof | `src/components/compare.jsx` |
| Horizontal feature rail | `src/components/scroll.jsx` |
| Type, spacing, radius, and motion tokens | `src/styles/tokens/` |

This reference is the standard's first implementation, not a reason to copy product-specific content. Reuse the visual grammar and component behavior; replace every claim and asset with verified material for the new product.
