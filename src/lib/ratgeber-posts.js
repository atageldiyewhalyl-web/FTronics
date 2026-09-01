import fs from 'fs'
import path from 'path'
import { site } from './site'

/* readPost() below reads each post's body straight out of
   content-queue/<package>/package.md at build time — that directory is
   therefore a HARD BUILD DEPENDENCY, not scratch/working content. Deploy
   tooling and any future `.gitignore` or cleanup pass must not exclude it, or
   every Ratgeber route fails to prerender. If the content ever moves into
   `src/` (e.g. once it outgrows a handful of posts), update packageBySlug
   and readPost() together. */
const posts = [
  'alarmanlage-gewerbe-mannheim',
  'videoueberwachung-unternehmen-dsgvo',
  'kameratypen-dome-bullet-turret-ptz-vergleich',
  'zutrittskontrolle-unternehmen-systeme-vergleich',
  'brandmeldeanlage-wartung-pflichten-betrieb',
  'sicherheitstechnik-rhein-neckar-einzugsgebiet',
]

const packageBySlug = {
  'alarmanlage-gewerbe-mannheim': '2026-08-27-alarmanlage-gewerbe-mannheim',
  'videoueberwachung-unternehmen-dsgvo': '2026-08-27-videoueberwachung-unternehmen-dsgvo',
  'kameratypen-dome-bullet-turret-ptz-vergleich': '2026-09-02-kameratypen-dome-bullet-turret-ptz-vergleich',
  'zutrittskontrolle-unternehmen-systeme-vergleich': '2026-08-27-zutrittskontrolle-unternehmen-systeme-vergleich',
  'brandmeldeanlage-wartung-pflichten-betrieb': '2026-08-27-brandmeldeanlage-wartung-pflichten-betrieb',
  'sicherheitstechnik-rhein-neckar-einzugsgebiet': '2026-08-27-sicherheitstechnik-rhein-neckar-einzugsgebiet',
}

/* Intrinsic pixel dimensions travel with each hero so <Image> can reserve the
   space before the file arrives. The rendered size is still set by
   .ft-article-hero-img in globals.css; these only fix the aspect ratio. */
const images = {
  'alarmanlage-gewerbe-mannheim': {
    src: '/loesungen-gewerbe-werk.webp',
    width: 1800,
    height: 1207,
    alt: 'Alarmanlage an einem Gewerbeobjekt in Mannheim sichert Ladezone und Hallentor',
  },
  'videoueberwachung-unternehmen-dsgvo': {
    src: '/fc-8d-pro-hero.webp',
    width: 2400,
    height: 1339,
    alt: 'Videoüberwachung im Unternehmen: Kamera an einem Gewerbeobjekt',
  },
  'kameratypen-dome-bullet-turret-ptz-vergleich': {
    src: '/produkte-hero.webp',
    width: 2400,
    height: 1018,
    alt: 'Kameratypen im Vergleich: Dome, Bullet, Turret und PTZ',
  },
  'zutrittskontrolle-unternehmen-systeme-vergleich': {
    src: '/loesungen-band.webp',
    width: 2200,
    height: 1476,
    alt: 'Zutrittskontrolle im Unternehmen: Installation von Sicherheitstechnik an einer Bürotür',
  },
  'brandmeldeanlage-wartung-pflichten-betrieb': {
    src: '/schutz-03.webp',
    width: 1800,
    height: 1344,
    alt: 'Techniker prüft Sicherheitstechnik in einem Gewerbeobjekt',
  },
  'sicherheitstechnik-rhein-neckar-einzugsgebiet': {
    src: '/hand-made-mannheim.webp',
    width: 2200,
    height: 1476,
    alt: 'Sicherheitstechnik für Gewerbebetriebe in Mannheim und der Metropolregion Rhein-Neckar',
  },
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return [{}, raw]
  const data = {}
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':')
    if (i === -1) continue
    data[line.slice(0, i).trim()] = line.slice(i + 1).trim()
  }
  return [data, raw.slice(match[0].length)]
}

function stripMarkdown(value) {
  return value
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`>#]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function extractFaq(markdown) {
  const match = markdown.match(/## Häufige Fragen[^\n]*\n([\s\S]*?)(?=\n## |$)/)
  if (!match) return []
  const faqs = []
  const re = /\*\*([^*]+)\*\*\n([\s\S]*?)(?=\n\*\*[^*]+\*\*\n|$)/g
  let item
  while ((item = re.exec(match[1].trim()))) {
    faqs.push({ q: stripMarkdown(item[1]), a: stripMarkdown(item[2]) })
  }
  return faqs
}

function readPost(slug) {
  const file = path.join(process.cwd(), 'content-queue', packageBySlug[slug], 'package.md')
  const raw = fs.readFileSync(file, 'utf8')
  const [frontmatter, rest] = parseFrontmatter(raw)
  const articleMarkdown = rest.split('\n## Schema\n')[0].trim()
  const title = articleMarkdown.match(/^# (.+)$/m)?.[1] || frontmatter.title_tag
  const body = articleMarkdown.replace(/^# .+\n+/, '').trim()
  const excerpt = stripMarkdown(body.match(/^\*\*Kurz gesagt:\*\*([^\n]+)/)?.[1] || body.split('\n')[0])
  const slugPath = `/ratgeber/${slug}`

  return {
    slug,
    path: slugPath,
    url: `${site.url}${slugPath}`,
    title,
    titleTag: frontmatter.title_tag,
    description: frontmatter.meta_description,
    category: frontmatter.category,
    date: frontmatter.date,
    author: 'Redaktion FT Sicherheitstechnik',
    image: images[slug],
    excerpt,
    markdown: body,
    faqs: extractFaq(body),
  }
}

export function getAllPosts() {
  return posts.map(readPost)
}

export function getPostBySlug(slug) {
  if (!posts.includes(slug)) return null
  return readPost(slug)
}

export function getPostSlugs() {
  return posts
}

export function blogJsonLd(post) {
  const graph = [
    {
      '@type': 'BlogPosting',
      '@id': `${post.url}#article`,
      headline: post.title,
      description: post.description,
      inLanguage: 'de-DE',
      datePublished: post.date,
      dateModified: post.date,
      mainEntityOfPage: { '@type': 'WebPage', '@id': post.url },
      author: { '@id': `${site.url}/#organization` },
      publisher: { '@id': `${site.url}/#organization` },
      image: `${site.url}${post.image.src}`,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Startseite', item: `${site.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Ratgeber', item: `${site.url}/ratgeber` },
        { '@type': 'ListItem', position: 3, name: post.title, item: post.url },
      ],
    },
  ]

  if (post.faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${post.url}#faq`,
      mainEntity: post.faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: { '@type': 'Answer', text: faq.a },
      })),
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}
