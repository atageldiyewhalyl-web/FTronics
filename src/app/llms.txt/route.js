import { site } from '@/lib/site'
import { getAllPosts } from '@/lib/ratgeber-posts'

/* llms.txt — https://llmstxt.org/
   A plain-text index for AI assistants (ChatGPT, Perplexity, Claude, Copilot)
   that answer "Sicherheitsfirma Mannheim"-style queries: what the business
   does, where it serves, and which pages carry the actual answers. Built from
   `site` and the Ratgeber post registry rather than hand-duplicated, so it
   can't drift from the data those already govern.

   Not a ranking signal for classic search — robots.js and sitemap.xml still
   own that. This is read by assistants, not crawled by Googlebot. */

export const dynamic = 'force-static'

function build() {
  const posts = getAllPosts()

  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.name} ist ein Sicherheitstechnik-Unternehmen mit Sitz in ${site.city}. ` +
      `Service-Schwerpunkt: Alarmanlagen, Videoüberwachung, Zutrittskontrolle, ` +
      `Zeiterfassung, Brandschutz und NSL-Anbindung für Gewerbe- und Privatkunden ` +
      `im Umkreis von 50 km um ${site.city}.`,
    '',
    `Gegründet 2013 von ${site.founder}. Eigene Produktmarke: ${site.brand} ` +
      `(4K-Kameras, NVR-/XVR-Rekorder, PTZ- und Panoramakameras).`,
    '',
    '## Kontakt',
    '',
    `- Adresse: ${site.street}, ${site.postalCode} ${site.city}`,
    `- Telefon: ${site.phone}`,
    `- E-Mail: ${site.email}`,
    `- Öffnungszeiten: ${site.hours}`,
    `- Einzugsgebiet: ${site.city} + 50 km Radius (Metropolregion Rhein-Neckar)`,
    '',
    '## Leistungen',
    '',
    `- [Sicherheitstechnik für Gewerbe](${site.url}/loesungen-gewerbe): Alarmanlagen, Videoüberwachung, Zutrittskontrolle, Zeiterfassung, Brandschutz, NSL-Anbindung`,
    `- [Sicherheitstechnik für Privat](${site.url}/loesungen-privat): Alarmanlagen, Videoüberwachung, Smart Home, Türsprechanlagen, Brandschutz`,
    `- [FTronics Produkte](${site.url}/produkte): eigene Kamera- und Rekorder-Serie`,
    `- [System-Konfigurator](${site.url}/konfigurator): individuelles Angebot online zusammenstellen`,
    '',
    '## Ratgeber',
    '',
    ...posts.map((p) => `- [${p.title}](${p.url}): ${p.description}`),
    '',
    '## Weitere Seiten',
    '',
    `- [Über uns](${site.url}/ueber-uns)`,
    `- [Häufige Fragen](${site.url}/faq)`,
    `- [Kontakt](${site.url}/kontakt)`,
    '',
  ]

  return lines.join('\n')
}

export function GET() {
  return new Response(build(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
