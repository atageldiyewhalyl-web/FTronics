/* ============================================================
   FT Sicherheitstechnik — single source of truth for business
   facts, navigation and routes. Values verified against
   docs/website-content.md (live-site extraction, 2026-08-22).
   ============================================================ */

export const site = {
  name: 'FT Sicherheitstechnik',
  altName: 'FTST',
  brand: 'FTronics',
  founder: 'Hüseyin Gökcay',
  url: 'https://www.ftsicherheitstechnik.com',
  street: 'Hafenbahnstraße 15',
  postalCode: '68305',
  city: 'Mannheim',
  region: 'Baden-Württemberg',
  country: 'DE',
  phone: '+49 621 159 647 34',
  phoneHref: 'tel:+4962115964734',
  whatsapp: '+49 176 32956300',
  whatsappHref: 'https://wa.me/4917632956300?text=Hallo%20FT%20Sicherheitstechnik%2C%20ich%20komme%20%C3%BCber%20Ihre%20Website%20und%20m%C3%B6chte%20mich%20beraten%20lassen.',
  fax: '0621 762 207 36',
  email: 'info@ftst.eu',
  careersEmail: 'karriere@ftst.eu',
  vatId: 'DE301351179',
  lat: 49.5204,
  lng: 8.5093,
  hours: 'Mo–Fr · 08:00–17:00',
  /* Display only — the visible Google rating on the homepage. Must never be
     emitted as `aggregateRating` in JSON-LD; see the note in
     localBusinessJsonLd(). */
  rating: { value: '5.0', count: '19' },
  social: {
    facebook: 'https://facebook.com/FTST68',
    instagram: 'https://instagram.com/ftsicherheit',
    youtube: 'https://youtube.com/channel/UCOR4juRUDG46wvu8wquVkYQ',
  },
  insurer: 'andsafe Aktiengesellschaft, Provinzial-Allee 1, 48159 Münster',
}

/** Primary navigation — matches the handoff NavBar.
    `children` makes an item a menu rather than a link: the label opens the
    submenu instead of navigating, because the two Lösungen routes are the
    whole of it and there is no overview page above them to point at.
    `match` lists the routes that count as "you are here" for such an item,
    since it has no href of its own to test the pathname against. */
export const navItems = [
  { label: 'Startseite', href: '/' },
  {
    label: 'Lösungen',
    match: ['/loesungen-privat', '/loesungen-gewerbe'],
    children: [
      { label: 'Privatkunden', href: '/loesungen-privat' },
      { label: 'Gewerbekunden', href: '/loesungen-gewerbe' },
    ],
  },
  { label: 'Produkte', href: '/produkte' },
  { label: 'Ratgeber', href: '/ratgeber' },
  { label: 'Kontakt', href: '/kontakt' },
  { label: 'Konfigurator', href: '/konfigurator' },
]

/** Footer columns — verbatim from the live site's footer. */
export const footerColumns = {
  'Lösungen': [
    { label: 'Privatkunden', href: '/loesungen-privat' },
    { label: 'Gewerbekunden', href: '/loesungen-gewerbe' },
    { label: 'FTronics Produkte', href: '/produkte' },
    { label: 'System-Konfigurator', href: '/konfigurator' },
    { label: 'Partner', href: '/partner' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Ratgeber', href: '/ratgeber' },
    { label: 'Support', href: '/support' },
  ],
  'Unternehmen': [
    { label: 'Kontakt', href: '/kontakt' },
    { label: 'Über uns', href: '/ueber-uns' },
    { label: 'Karriere', href: '/karriere' },
  ],
  'Kontakt': [
    { label: site.phone, href: site.phoneHref },
    { label: site.email, href: `mailto:${site.email}` },
    { label: 'Hafenbahnstr. 15, 68305 Mannheim', href: '/kontakt' },
  ],
}

export const legalLinks = [
  { label: 'Impressum', href: '/impressum' },
  { label: 'Datenschutz', href: '/datenschutz' },
  { label: 'AGB', href: '/agb' },
]

/** Fixed CTA strings — never invent new ones. */
export const cta = {
  start: 'Jetzt Anfrage starten',
  contact: 'Kontakt aufnehmen',
  advice: 'Beratung anfragen',
  quote: 'Angebot anfragen',
  freeAdvice: 'Kostenlose Beratung anfragen',
  appointment: 'Jetzt Termin vereinbaren',
  details: 'Details ansehen',
  products: 'Produkte ansehen',
  more: 'Mehr erfahren',
  apply: 'Jetzt bewerben',
  configure: 'Unverbindliches Angebot anfordern',
}

/** JSON-LD: LocalBusiness — the anchor entity for local search. */
export function localBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    /* Array rather than swapping to a single narrower type: schema.org has no
       dedicated "security systems installer" type, and the closest
       LocalBusiness subtype (HomeAndConstructionBusiness — Electrician,
       Locksmith, Plumber, …) undersells the B2B/commercial NVR and
       multi-site installs this business also does. Declaring both keeps the
       safe generic type and adds the closer signal, which JSON-LD permits. */
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${site.url}/#organization`,
    name: site.name,
    alternateName: site.altName,
    description:
      'Professionelle Sicherheitstechnik in Mannheim und der Metropolregion Rhein-Neckar. Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Smart Home, seit über 15 Jahren.',
    url: site.url,
    telephone: site.phone.replace(/\s/g, ''),
    email: site.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.street,
      addressLocality: site.city,
      postalCode: site.postalCode,
      addressRegion: site.region,
      addressCountry: site.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: site.lat, longitude: site.lng },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '17:00',
      },
    ],
    priceRange: '€€',
    sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
    /* NO `aggregateRating` HERE — deliberately, do not re-add it.
       This entity is injected by the root layout on every page, so marking up
       our own 5.0/19 rating would be self-serving review markup: Google's
       structured-data policy makes it ineligible for rich results and it is a
       manual-action risk. It also claimed a rating on 38 pages that show no
       reviews at all. The rating stays where it belongs — as visible content
       on the homepage, attributed to Google — and Google sources the stars for
       the SERP from the Business Profile instead. `site.rating` still feeds
       that on-page display. */
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: { '@type': 'GeoCoordinates', latitude: 49.4875, longitude: 8.466 },
      geoRadius: '50000',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sicherheitstechnik-Dienstleistungen',
      itemListElement: [
        'Alarmanlagen',
        'Videoüberwachung',
        'Zutrittskontrolle',
        'Smart Home Sicherheit',
        'Brandwarnanlagen',
      ].map((n) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: n } })),
    },
    award: ['Plus X Award Top 100 (2026)', 'DIPMB Hohe Kundenzufriedenheit (2024)'],
    founder: { '@type': 'Person', name: site.founder },
  }
}

/** Service entities for a solutions page, as an ItemList of Offers.
    `provider` ties every Service back to the LocalBusiness entity the layout
    already injects on every page (@id), rather than repeating the business's
    identity — the same pattern breadcrumbJsonLd and localBusinessJsonLd's own
    hasOfferCatalog use. Keeps /loesungen-gewerbe and /loesungen-privat
    connected to that catalogue instead of describing the six/five
    disciplines only in visible copy. */
export function servicesJsonLd(services) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.name,
        description: s.description,
        provider: { '@id': `${site.url}/#organization` },
        /* Same 50 km circle as localBusinessJsonLd's own areaServed — kept
           inline rather than as an @id reference, since a Place has no @id
           declared anywhere else to point at. */
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: { '@type': 'GeoCoordinates', latitude: 49.4875, longitude: 8.466 },
          geoRadius: '50000',
        },
        ...(s.href && { url: `${site.url}${s.href}` }),
      },
    })),
  }
}

export function breadcrumbJsonLd(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.href}`,
    })),
  }
}

/** Serialise JSON-LD safely for dangerouslySetInnerHTML. */
export function jsonLd(obj) {
  return { __html: JSON.stringify(obj).replace(/</g, '\\u003c') }
}
