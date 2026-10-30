# Videoüberwachung Gewerbe: generated assets

Created with the built-in image generation tool for the commercial CCTV landing page. These are fictional illustrations, not customer references. Existing FTronics product imagery is reused for actual hardware. Image-generation captions were removed at the user's request; provenance is retained in this document.

## site

Final asset: `public/campaigns/video-gewerbe/site.webp`

Use case: stylized-concept. Asset type: commercial video surveillance landing page hero, landscape 3:2. Create a premium photorealistic architectural miniature render of a modern German medium-sized commercial premises: a compact warehouse with two loading doors, adjoining two-storey office with glazing, small fenced yard with one unmarked white delivery van and subtle realistic white CCTV bullet cameras at the building corners. Elevated three-quarter view, entire site as one tangible white architectural scale model on a seamless very pale cool grey studio ground. Soft natural shadows, carefully detailed materials, understated precision, clean silver grey palette with tiny dark charcoal details and a subtle muted red entrance canopy. Centered composition, generous negative space all around, nothing cropped. Cameras small and realistic, no giant cameras, no cones, no UI, no labels, no logos, no text, no watermark. This is an illustrative fictional installation, not a real customer reference. Output one polished image.

## warehouse

Final asset: `public/campaigns/video-gewerbe/warehouse.webp`

Use case: stylized-concept. Asset type: commercial CCTV explanatory landing page image, landscape 3:2. Premium architectural scale-model cutaway render of a German logistics warehouse interior: two tidy shelving aisles with cardboard cartons, grey loading door, empty clean warehouse floor and one subtle small wall mounted white security camera viewing the loading zone. Open front cutaway, elevated three-quarter angle. Entire model on seamless very light cool grey studio background. Precise physical miniature, soft natural light and shadows, matte white and silver materials, small muted red detail on loading door frame. Calm, credible, minimal. No people, no labels, no UI, no detection boxes, no text, no logo, no watermark. Match a refined German security installation brand with monochrome pale architectural visual language.

## shop

Final asset: `public/campaigns/video-gewerbe/shop.webp`

Use case: stylized-concept. Asset type: commercial CCTV explanatory landing page image, landscape 3:2. Premium architectural scale-model cutaway render of a small modern German retail store: glass entrance, minimalist checkout counter, two short shelving units with simple merchandise and a subtle small white dome camera high on the interior wall observing the entrance. Empty store, no people. Elevated three-quarter angle, whole model on seamless pale cool grey studio ground with generous space around. Matte white walls, charcoal frames, soft natural light, realistic material texture, a small muted red accent on the checkout counter. Restrained precision and clean composition. No labels, no UI, no detection boxes, no text, no logo, no watermark. This is a fictional explanatory illustration, not a customer installation.

## Design and content

Uses the existing FT design language: DM Sans, pale cool grey, red primary actions. Design variance 4, motion intensity 2, visual density 4. Static server-rendered content, native FAQ disclosures, isolated interactive form.

Privacy planning copy is informed by the Baden-Württemberg authority's guidance: https://www.baden-wuerttemberg.datenschutz.de/orientierungshilfe-videoueberwachung-nicht-oeffentlich/

No price, project outcome, rating, certification, free consultation or guaranteed response time has been invented. The form reuses the existing submission and consent-gated conversion path. This page does not implement offline qualification or call conversion imports.

## Visual revision

The revised page replaces the long feature, process and cost descriptions with a photographic benefit grid, the homepage ScrollGallery interaction, five existing FTronics product images, an installation scene and two generated background treatments. Privacy detail moves into the FAQ. The mobile hero now shows the illustration before the form.

Four new images were generated using the built-in image generation tool, then converted to responsive WebP source assets. Original generations are retained in the Codex generated-images directory.

### after-hours

Asset: `public/campaigns/video-gewerbe/after-hours.webp`

Prompt: Use case: ads-marketing. Create one photorealistic editorial architectural image for a German commercial video surveillance landing page, landscape 3:2. A modern compact warehouse loading yard at blue hour, camera view from elevated corner, two closed loading bays, neat silver metal siding, a white unmarked delivery van parked to one side, one subtle wall mounted CCTV camera visible near the upper right, warm practical doorway lighting. No people. Premium architectural photography, believable materials, deep charcoal and slate grey with restrained warm light. Not a dramatic crime scene. Image should communicate keeping an eye on the business after closing time. Composition: the building and loading doors on center/right, uncluttered darker paved foreground on bottom left for web text overlay. No text, logos, watermarks, simulated UI, detection boxes, or claims. Fictional illustrative setting.

### installation

Asset: `public/campaigns/video-gewerbe/installation.webp`

Prompt: Use case: photorealistic-natural. Landscape 3:2 editorial photograph for the installation section of a German professional CCTV service website. Close side view of a technician's hands carefully attaching a small white bullet security camera to a brushed light grey industrial wall at accessible height. Show forearms and hands only and a little plain charcoal workwear, no face, no branding. Proper wall bracket, one hand steadies the camera, other hand tightens a bracket screw with a compact hand screwdriver; anatomically accurate hands. Clean professional wiring with a small closed junction box adjacent. Camera is generic and realistically sized, no invented logo. Shallow depth of field but bracket and hands in crisp focus, diffuse daylight, finely detailed textures, neutral silver, white and charcoal palette, small muted red screwdriver handle. Calm refined architectural-service photography. No text, no watermarks. This illustrates installation, not an actual employee or customer project.

### planning-background

Asset: `public/campaigns/video-gewerbe/planning-background.webp`

Prompt: Use case: ads-marketing. One refined photorealistic still life for a commercial CCTV quote section, wide landscape 3:2. A large pale silver-grey worktable photographed overhead. On the RIGHT HALF ONLY: a partially unrolled precise architectural floorplan with thin grey lines and no readable writing, a pencil, a compact coiled black Ethernet cable with RJ45 ends, one unbranded small white dome camera and a discreet red pencil. Thoughtful minimal arrangement, realistic hardware scale. The LEFT HALF remains completely empty clean pale grey tabletop, gently lit, reserved for an HTML headline and form CTA. Soft daylight, soft shadow, restrained clean German industrial design mood. No text, logos, watermarks, charts, fictional price tags, hands or screen interfaces. High-end product photography, not an illustration.

### contact-background

Asset: `public/campaigns/video-gewerbe/contact-background.webp`

Prompt: Use case: photorealistic-natural. One panoramic architectural photograph, landscape 3:2, for the final contact section background of a professional commercial security website. Minimal modern German light grey commercial building facade viewed at an elegant diagonal in very soft overcast daylight. A discreet small white surveillance camera mounted on the RIGHT third above an entrance, realistic proportions. Subtle silver metal panels and glass, a small out-of-focus tree at the far right edge. LEFT HALF is very pale softly lit wall with nearly no detail and generous negative space for HTML headline and button. Restrained cool silver, soft white, natural neutral tones. No people, no company logos, no signage or readable text, no watermark. Polished credible architectural photography, fictional scene for illustration.

## Initial verification (before visual revision)

- Production build passed with the new route statically generated.
- Browser checks passed at 320, 390, 820 and 1440 CSS pixels, plus desktop dark mode. No horizontal overflow or runtime errors.
- All images decoded during browser verification. Native FAQ, form anchor and mobile contact visibility checked.
- Submission tests intercepted the existing lead endpoint: failure preserves input and emits no conversion; retry success emits exactly one conversion with marketing consent and none without it. No test emails or real lead records were created.
- Lighthouse mobile lab checks on the local production server: performance 93-97 across runs; final accessibility 100, best practices 100, SEO 100. This is a lab result, not production field data.
- Preview: http://localhost:3001/videoueberwachung-gewerbe (requires the local server).
- At this verification stage, changes had not been deployed or pushed.

## Verification after visual revision

- Production build and `git diff --check` passed.
- Responsive visual checks passed at 320, 390, 820 and 1440 CSS pixels, plus desktop dark mode; no document overflow. All page images loaded successfully.
- Product carousel buttons and keyboard navigation passed on desktop and mobile. The inquiry error/retry and consent-gated conversion checks passed with mocked submissions.
- Final local Lighthouse mobile lab scores: performance 92, accessibility 100, best practices 100, SEO 100; CLS 0. Performance measured 92–93 across the revision's runs. These are local lab results, not production field data.
- The four new WebP assets total approximately 365 KiB. Images below the hero are lazy loaded.
- The existing in-app preview was refreshed to the revised page for local review.

## Light theme and caption revision

- Removed the visible image-generation captions at the user's request. Asset provenance and prompts remain recorded here.
- Removed automatic dark variants from the campaign page, header and footer; native controls use the light color scheme on this route.
- Production build passed. The refreshed browser reported a dark device preference with white page, header and input backgrounds, no image-generation labels and no desktop overflow. The mobile preview also displays the light layout.

## Mannheim messaging and mobile revision

- Mannheim is now in the main headline, installation section, inquiry introduction and final address block.
- Desktop keeps its split hero, visible inquiry form and original image compositions. Mobile uses a simpler sequence, fewer repeated images, smaller product cards and plain cost/contact sections.
- On mobile, native `#anfrage` navigation reveals the form. Returning to the overview hides it without unmounting it or losing entered values. Desktop always shows the form. The floating contact bar waits until the hero action has passed, and hides when the form or final actions are visible.
- Responsive `<picture>` sources select mobile compositions at widths up to 767px. Both new assets use 4:3 framing, saved at 960 × 720; total source size is approximately 144 KiB.
- Production build and diff checks passed. Browser checks at 320, 390, 430, 820 and 1440px found no horizontal overflow and confirmed the correct image source. Mobile form opening, closing, input retention, bottom CTA and product carousel navigation passed. No real lead was submitted.

### mobile-entrance

Final asset: `public/campaigns/video-gewerbe/mobile-entrance.webp`

Generated with the built-in image-generation tool. Original: `exec-3fdcdbc0-db77-4993-b262-2e7a5b2803a1.png` in the conversation's Codex generated-images directory.

Prompt: Use case: ads-marketing. Generate one new photorealistic image for the MOBILE hero of a German commercial CCTV installer website. Aspect ratio 4:3 landscape, composed to be immediately readable at only 350 pixels wide. A single small unbranded white bullet surveillance camera mounted correctly on the corner of a pale grey commercial building, photographed at close range from slightly below, with a simple glass business entrance and softly blurred courtyard behind it. The camera and its short mounting arm are the clear central subject, occupying roughly one third of image width, entire camera visible with generous safe space around it. Neutral daylight, clean white and cool grey materials, restrained black lens detail, premium architectural photography, realistic proportions. Only one camera, one entrance, no clutter, no people, no wide aerial view, no miniatures, no screens, no maps, no text, no logos, no overlays, no watermarks. Fictional illustrative scene, not a claimed customer installation or specific product model. The image will sit below an HTML headline on a white mobile landing page, with no text over the photograph.

### mobile-after-hours

Final asset: `public/campaigns/video-gewerbe/mobile-after-hours.webp`

Generated with the built-in image-generation tool. Original: `exec-c6c31abd-6a04-42f7-a233-9b544fe60129.png` in the conversation's Codex generated-images directory.

Prompt: Use case: ads-marketing. Create one photorealistic 4:3 landscape photograph composed specifically for a MOBILE German commercial video surveillance landing page, readable at 350 pixels wide. A simple compact warehouse entrance after closing, straight-on architectural view at blue hour: one closed grey loading door in the center, a small pedestrian door on the right with warm practical lighting, one discreet realistic white CCTV camera visible above the doorway. Tight balanced composition of this ONE entrance area only, not an entire industrial estate. Full loading door and security camera within frame, just a little empty pavement foreground, crisp believable materials. Deep slate blue with restrained warm light. Calm and professional, no danger or crime scene. No people, vehicles, text, logos, UI, labels, watermarks or detection boxes. Fictional illustration. This photo is displayed as a standalone 4:3 image with HTML caption BELOW it, so no negative text space or dark overlay is needed.
