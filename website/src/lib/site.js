/* ============================================================
   FT Sicherheitstechnik — single source of truth for business
   facts, navigation and routes. Values verified against
   website-content.md (live-site extraction, 2026-08-22).
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
  fax: '0621 762 207 36',
  email: 'info@ftst.eu',
  careersEmail: 'karriere@ftst.eu',
  vatId: 'DE301351179',
  lat: 49.5204,
  lng: 8.5093,
  hours: 'Mo–Fr · 08:00–17:00',
  rating: { value: '5.0', count: '19' },
  social: {
    facebook: 'https://facebook.com/FTST68',
    instagram: 'https://instagram.com/ftsicherheit',
    youtube: 'https://youtube.com/channel/UCOR4juRUDG46wvu8wquVkYQ',
  },
  insurer: 'andsafe Aktiengesellschaft, Provinzial-Allee 1, 48159 Münster',
}

/** Primary navigation — matches the handoff NavBar. */
export const navItems = [
  { label: 'Startseite', href: '/' },
  { label: 'Lösungen', href: '/loesungen-privat' },
  { label: 'Produkte', href: '/produkte' },
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
    '@type': 'LocalBusiness',
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
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: site.rating.value,
      reviewCount: site.rating.count,
      bestRating: '5',
      worstRating: '1',
    },
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
