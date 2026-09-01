import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button, Chip, CtaFlatlay } from '@/components/ui'
import { CtaAnfrageForm } from '@/app/CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { site, jsonLd } from '@/lib/site'
import { blogJsonLd, getPostBySlug, getPostSlugs } from '@/lib/ratgeber-posts'

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}
  return {
    /* The content packages ship a `title_tag` already written to fit a SERP
       (≤60 chars). Appending the brand on top of it only truncates it, so
       the value is used exactly as authored. */
    title: { absolute: post.titleTag },
    description: post.description,
    alternates: { canonical: post.path },
    openGraph: {
      title: post.titleTag,
      description: post.description,
      url: post.url,
      type: 'article',
      images: [{ url: post.image.src, alt: post.image.alt }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.titleTag,
      description: post.description,
      images: [post.image.src],
    },
  }
}

function inline(text) {
  const parts = []
  const re = /(\*\*[^*]+\*\*|\*[^*\n]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g
  let last = 0
  let match
  while ((match = re.exec(text))) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(<strong key={parts.length}>{token.slice(2, -2)}</strong>)
    } else if (token.startsWith('*')) {
      parts.push(<em key={parts.length}>{token.slice(1, -1)}</em>)
    } else if (token.startsWith('`')) {
      parts.push(<code key={parts.length}>{token.slice(1, -1)}</code>)
    } else {
      const [, label, href] = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
      const external = href.startsWith('http')
      parts.push(
        <Link
          key={parts.length}
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
        >
          {label}
        </Link>
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}

function Table({ lines }) {
  const rows = lines
    .filter((line) => !/^\|\s*-/.test(line))
    .map((line) => line.split('|').slice(1, -1).map((cell) => cell.trim()))
  const [head, ...body] = rows

  return (
    <div className="ft-article-table-wrap">
      <table>
        <thead>
          <tr>{head.map((cell, i) => <th key={i}>{inline(cell)}</th>)}</tr>
        </thead>
        <tbody>
          {body.map((row, i) => (
            <tr key={i}>{row.map((cell, j) => <td key={j}>{inline(cell)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function renderBlocks(markdown) {
  const lines = markdown.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push(<h2 key={blocks.length}>{inline(line.slice(3))}</h2>)
      i += 1
      continue
    }

    if (line.startsWith('### ')) {
      blocks.push(<h3 key={blocks.length}>{inline(line.slice(4))}</h3>)
      i += 1
      continue
    }

    if (line.startsWith('> ')) {
      const quote = []
      while (lines[i]?.startsWith('> ')) {
        quote.push(lines[i].slice(2))
        i += 1
      }
      blocks.push(<blockquote key={blocks.length}>{quote.map((q) => <p key={q}>{inline(q)}</p>)}</blockquote>)
      continue
    }

    if (line.startsWith('|')) {
      const table = []
      while (lines[i]?.startsWith('|')) {
        table.push(lines[i])
        i += 1
      }
      blocks.push(<Table key={blocks.length} lines={table} />)
      continue
    }

    if (/^- \[ \] /.test(line)) {
      const items = []
      while (/^- \[ \] /.test(lines[i] || '')) {
        items.push(lines[i].replace(/^- \[ \] /, ''))
        i += 1
      }
      blocks.push(<ul key={blocks.length} className="ft-article-checklist">{items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>)
      continue
    }

    if (/^- /.test(line)) {
      const items = []
      while (/^- /.test(lines[i] || '')) {
        items.push(lines[i].replace(/^- /, ''))
        i += 1
      }
      blocks.push(<ul key={blocks.length}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>)
      continue
    }

    if (/^\d+\. /.test(line)) {
      const items = []
      while (/^\d+\. /.test(lines[i] || '')) {
        items.push(lines[i].replace(/^\d+\. /, ''))
        i += 1
      }
      blocks.push(<ol key={blocks.length}>{items.map((item) => <li key={item}>{inline(item)}</li>)}</ol>)
      continue
    }

    const para = []
    while (
      lines[i] &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('|') &&
      !/^- /.test(lines[i]) &&
      !/^\d+\. /.test(lines[i])
    ) {
      para.push(lines[i])
      i += 1
    }
    blocks.push(<p key={blocks.length}>{inline(para.join(' '))}</p>)
  }

  return blocks
}

export default async function RatgeberPost({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogJsonLd(post))} />

      <article className="ft-article">
        <header className="ft-article-hero">
          <div className="ft-shell ft-article-hero-inner">
            <div className="ft-article-kicker">
              <Chip>{post.category}</Chip>
              <span>{post.date}</span>
            </div>
            <h1>{post.title}</h1>
            <p className="ft-lead">{post.description}</p>
            <p className="ft-article-byline">{post.author}</p>
          </div>
          <div className="ft-shell">
            {/* The LCP element on every article. `priority` preloads it and
                opts it out of lazy loading; the intrinsic width/height come
                from the post's image record so the browser can reserve the
                box before the file lands. `sizes` matches the article shell,
                which never exceeds ~1100px. */}
            <Image
              className="ft-article-hero-img"
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(max-width: 1100px) 100vw, 1100px"
              priority
            />
          </div>
        </header>

        <div className="ft-shell ft-article-layout">
          <aside className="ft-article-aside">
            <Link href="/ratgeber">Alle Ratgeber</Link>
            <a href={site.phoneHref}>{site.phone}</a>
            <Button href="/kontakt" size="sm">Beratung anfragen</Button>
            <WhatsAppButton size="sm" />
            <Button variant="secondary" href="/produkte" size="sm">Produkte ansehen</Button>
          </aside>
          <div className="ft-article-body">{renderBlocks(post.markdown)}</div>
        </div>
      </article>

      <section className="ft-section ft-cta-close">
        <div className="ft-shell ft-cta-split">
          <div className="ft-cta-copy">
            <h2>Fragen zu Ihrem Objekt?</h2>
            <p>
              Wir prüfen Anforderungen, Technik und Aufwand vor Ort und erstellen ein passendes
              Sicherheitskonzept für Ihr Unternehmen.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <WhatsAppButton />
            </div>
          </div>
          <CtaAnfrageForm />
        </div>
        <CtaFlatlay />
      </section>
    </>
  )
}
