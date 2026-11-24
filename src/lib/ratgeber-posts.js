import fs from 'fs'
import path from 'path'
import { site } from './site'

/* Every post lives in content-queue/<YYYY-MM-DD>-<slug>/package.md and is
   read at build time, so that directory is a HARD BUILD DEPENDENCY, not
   scratch/working content. Deploy tooling and any `.gitignore` or cleanup
   pass must not exclude it, or every Ratgeber route fails to prerender.

   Posts are discovered automatically: any package with `status: ready` and a
   `slug` is published. A package's hero image comes from its `image` and
   `image_alt` frontmatter (generated heroes are 1600x900 WebP files in
   public/ratgeber/). */
const QUEUE_DIR = path.join(process.cwd(), 'content-queue')
const DEFAULT_IMAGE = { src: '/loesungen-gewerbe-werk.webp', width: 1800, height: 1207 }

function discoverPackages() {
  const bySlug = {}
  for (const dir of fs.readdirSync(QUEUE_DIR)) {
    const file = path.join(QUEUE_DIR, dir, 'package.md')
    if (dir.startsWith('_') || !fs.existsSync(file)) continue
    const [frontmatter] = parseFrontmatter(fs.readFileSync(file, 'utf8'))
    if (frontmatter.status !== 'ready' || !frontmatter.slug) continue
    bySlug[frontmatter.slug] = { dir, date: frontmatter.date || '' }
  }
  return bySlug
}

let packageCache
function packages() {
  if (!packageCache) packageCache = discoverPackages()
  return packageCache
}

/* Newest first, so fresh posts lead the Ratgeber index. */
function postSlugs() {
  const all = packages()
  return Object.keys(all).sort((a, b) => all[b].date.localeCompare(all[a].date) || a.localeCompare(b))
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

export function headingId(text) {
  return stripMarkdown(text)
    .toLowerCase()
    .replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function readPost(slug) {
  const file = path.join(QUEUE_DIR, packages()[slug].dir, 'package.md')
  const raw = fs.readFileSync(file, 'utf8')
  const [frontmatter, rest] = parseFrontmatter(raw)
  const articleMarkdown = rest.split('\n## Schema\n')[0].trim()
  const title = articleMarkdown.match(/^# (.+)$/m)?.[1] || frontmatter.title_tag
  const body = articleMarkdown.replace(/^# .+\n+/, '').trim()
  const summaryMatch = body.match(/^\*\*Kurz gesagt:\*\*([^\n]+)/)
  const excerpt = stripMarkdown(summaryMatch?.[1] || body.split('\n')[0])
  const slugPath = `/ratgeber/${slug}`
  const words = stripMarkdown(body).split(' ').length
  const toc = [...body.matchAll(/^## (.+)$/gm)]
    .map((m) => ({ id: headingId(m[1]), label: stripMarkdown(m[1]) }))
  const image = frontmatter.image
    ? { src: frontmatter.image, width: 1600, height: 900, alt: frontmatter.image_alt || title }
    : { ...DEFAULT_IMAGE, alt: frontmatter.image_alt || title }

  return {
    slug,
    path: slugPath,
    url: `${site.url}${slugPath}`,
    title,
    titleTag: frontmatter.title_tag,
    description: frontmatter.meta_description,
    category: frontmatter.category,
    date: frontmatter.date,
    updated: frontmatter.updated || frontmatter.date,
    author: 'Redaktion FT Sicherheitstechnik',
    image,
    excerpt,
    summary: summaryMatch ? summaryMatch[1].trim() : '',
    markdown: summaryMatch ? body.slice(summaryMatch[0].length).trim() : body,
    readingMinutes: Math.max(3, Math.round(words / 200)),
    toc: toc.filter((item) => item.label !== 'Häufige Fragen' && !item.label.startsWith('Häufige Fragen')),
    hasFaq: toc.some((item) => item.label.startsWith('Häufige Fragen')),
    faqs: extractFaq(body),
  }
}

export function getAllPosts() {
  return postSlugs().map(readPost)
}

export function getPostBySlug(slug) {
  if (!packages()[slug]) return null
  return readPost(slug)
}

export function getPostSlugs() {
  return postSlugs()
}

/* Same category first, then the newest of the rest. */
export function getRelatedPosts(post, count = 3) {
  const others = getAllPosts().filter((p) => p.slug !== post.slug)
  const same = others.filter((p) => p.category === post.category)
  const rest = others.filter((p) => p.category !== post.category)
  return [...same, ...rest].slice(0, count)
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
      dateModified: post.updated,
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
