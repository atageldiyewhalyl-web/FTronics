# FT Sicherheitstechnik — Visibility Map (2026-08-27)

## Where the site stands

- **Site type**: Next.js 15 App Router, 32 routes. Strong commercial surface
  (2 Lösungen pages, 20 FTronics product pages, Konfigurator, FAQ with 31 Q&A).
- **Blog surface: zero.** `/ratgeber` exists as a listing page with seven
  hardcoded teaser cards, all linking to `#`. No article detail pages, no post
  data file, no blog entries in `src/app/sitemap.js`. Every informational
  query the site could win currently has no landing page.
- **Local entity is well-formed**: `LocalBusiness` JSON-LD in `src/lib/site.js`
  with NAP, geo, opening hours, `aggregateRating` 5.0/19, awards, and an
  `areaServed` `GeoCircle` of 50 km around Mannheim. Good anchor for
  `publisher`/`@id` references from Article schema.
- **Open item from the client brief**: Google Business Profile existence
  unconfirmed. Until that is settled, blog content is the fastest lever for
  local visibility outside the map pack.

## The gap that matters

The site answers "who are we / what do we sell" thoroughly and answers
"how does this work, what am I legally required to do, what should I buy"
almost nowhere except the FAQ. B2B security buyers (Geschäftsführer,
Facility Manager, Betriebsleiter) search in exactly that second register:
DSGVO obligations, DIN/VDE maintenance duties, system comparisons, and
"who does this near me". Those queries are informational-with-commercial-tail
and are precisely what the 20 FTronics product pages need as feeder content.

## Intent map of the brief's primary keywords

| Keyword | Intent | Best landing surface |
|---|---|---|
| Sicherheitstechnik Mannheim | local/commercial | Homepage (already) |
| Sicherheitsfirma Mannheim | local/commercial | Homepage + radius blog post |
| Alarmanlagen Mannheim | commercial | `/loesungen-gewerbe` + alarm blog post |
| Videoüberwachung Mannheim | commercial | `/loesungen-gewerbe` + DSGVO post |
| Zutrittskontrolle Mannheim | commercial | Zutritt blog post |
| Brandwarnanlagen | informational/commercial | Brandmelde/Wartung post |
| Smart Home Sicherheit | informational | B2B-deprioritised (brief: B2B only) |
| FTronics Kameras | branded/transactional | `/produkte` (already) |
| Sicherheitstechnik Rhein-Neckar | local | radius blog post |

## Competitive picture (German B2B security SERPs)

Ranking pages for `videoüberwachung dsgvo unternehmen`, `brandmeldeanlage
wartung intervalle` and `zutrittskontrolle biometrie datenschutz` are mostly
Datenschutz-consultancy blogs, Brandschutz-Fachfirmen and legal magazines —
not installers. An installer that answers the compliance question *and* can
build the system has a structural advantage: it can end each answer with the
concrete engineering step (Kamerawinkel, Löschintervall im NVR, Meldergruppen,
Berechtigungsmatrix) that a law blog cannot.

## Hard local facts available for content (verified)

Polizeipräsidium Mannheim, PKS 2025 (published Feb 2026, covers Mannheim,
Heidelberg and the Rhein-Neckar-Kreis):

- 65.768 Straftaten insgesamt (+0,3 %), Aufklärungsquote 60,2 % (+1,4 %).
- **Wohnungseinbruchdiebstahl: +46,3 % auf 866 Fälle — ein Fünf-Jahres-Hoch.
  40,3 % davon blieben im Versuch.**
- Eigentumsdelikte insgesamt −3,9 %; Schaden knapp über 30 Mio. €.
- 357 sicherungstechnische Beratungen durch die Polizei im Jahr 2025.

Bundesweit (PKS 2025): 82.920 Wohnungseinbrüche (+5,7 %), Versuchsanteil
44,9 %, Aufklärungsquote 14,1 %, Schaden 378,3 Mio. €.

Source: https://ppmannheim.polizei-bw.de/statistiken/ (PKS 2025 brochure).

## Refresh

Next refresh due: 2026-09-03.
