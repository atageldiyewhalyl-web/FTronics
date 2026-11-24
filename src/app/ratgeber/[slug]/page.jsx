import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Button, CtaFlatlay } from '@/components/ui'
import { CtaAnfrageForm } from '@/app/CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { GoogleLogo } from '@/components/GoogleLogo'
import { site, jsonLd, cta } from '@/lib/site'
import { blogJsonLd, getPostBySlug, getPostSlugs, getRelatedPosts, headingId } from '@/lib/ratgeber-posts'
import { ReadingProgress } from '../ReadingProgress'

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

function renderBlocks(markdown, category) {
  const lines = markdown.split('\n')
  const blocks = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]
    if (!line.trim()) {
      i += 1
      continue
    }

    if (line.trim() === '[[cta]]') {
      blocks.push(<InlineCta key={blocks.length} category={category} />)
      i += 1
      continue
    }

    if (line.startsWith('## ')) {
      blocks.push(<h2 key={blocks.length} id={headingId(line.slice(3))}>{inline(line.slice(3))}</h2>)
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
      lines[i].trim() !== '[[cta]]' &&
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

/* Where each topic's reader should go next: the matching service page. */
const ctaByCategory = {
  'Alarmanlagen & Einbruchschutz': {
    title: 'Alarmanlage für Ihren Betrieb planen lassen',
    text: 'Wir sehen uns Ihr Objekt an, legen Meldergruppen und Alarmweg fest und nennen Ihnen danach einen verbindlichen Preis.',
    href: '/alarmanlagen-gewerbe',
    label: 'Alarmanlagen für Gewerbe',
  },
  'Videoüberwachung': {
    title: 'Kamerapunkte für Ihr Gelände planen lassen',
    text: 'Wir prüfen Blickwinkel, Licht und Speicherung vor Ort und planen nur die Kameras, die Ihr Objekt wirklich braucht.',
    href: '/videoueberwachung-gewerbe',
    label: 'Videoüberwachung für Gewerbe',
  },
  'Zutrittskontrolle': {
    title: 'Zutritt und Zeiterfassung sauber lösen',
    text: 'Wir planen Türen, Berechtigungen und Terminals so, dass sie zu Ihren Abläufen und zum Datenschutz passen.',
    href: '/zutrittskontrolle-gewerbe',
    label: 'Zutrittskontrolle für Gewerbe',
  },
  'Brandschutz': {
    title: 'Brandschutz im Betrieb prüfen lassen',
    text: 'Wir klären, welche Technik Ihr Objekt braucht, und stimmen Planung und Wartung mit Ihnen ab.',
    href: '/loesungen-gewerbe',
    label: 'Lösungen für Gewerbe',
  },
}
const defaultCta = {
  title: 'Sicherheitskonzept für Ihren Betrieb',
  text: 'Eine Begehung zeigt, wo Ihr Objekt wirklich verwundbar ist und welche Technik sich lohnt.',
  href: '/loesungen-gewerbe',
  label: 'Lösungen für Gewerbe',
}

function InlineCta({ category }) {
  const c = ctaByCategory[category] || defaultCta
  return (
    <aside className="ft-article-cta" aria-label="Beratung">
      <div>
        <p className="ft-article-cta-title">{c.title}</p>
        <p>{c.text}</p>
      </div>
      <div className="ft-article-cta-actions">
        <Button href="/kontakt" size="sm">{cta.freeAdvice}</Button>
        <a href={site.phoneHref} className="ft-article-cta-phone">{site.phone}</a>
      </div>
    </aside>
  )
}

function TrustStrip() {
  return (
    <ul className="ft-article-trust" aria-label="Warum FT Sicherheitstechnik">
      <li className="ft-article-trust-google"><GoogleLogo size={15} /><span><strong>{site.rating.value}&nbsp;★</strong> {site.rating.count} Google-Bewertungen</span></li>
      <li><strong>Seit 2013</strong> in Mannheim</li>
      <li><strong>FTronics</strong> eigene Kameramarke</li>
      <li><strong>DIPMB 2024</strong> Hohe Kundenzufriedenheit</li>
    </ul>
  )
}

function formatDate(value) {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  return `${d}.${m}.${y}`
}

/* The FAQ renders as an accordion after the body, so its markdown section
   (from "## Häufige Fragen" to the next H2 or the end) is cut out here. */
function withoutFaq(markdown) {
  return markdown.replace(/\n## Häufige Fragen[^\n]*\n[\s\S]*?(?=\n## |$)/, '\n')
}

export default async function RatgeberPost({ params }) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  const related = getRelatedPosts(post)
  const bodyMarkdown = withoutFaq(post.markdown)
  const service = ctaByCategory[post.category] || defaultCta

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(blogJsonLd(post))} />
      <ReadingProgress />

      <article className="ft-article">
        <header className="ft-article-hero">
          <div className="ft-shell ft-article-hero-grid">
            <div className="ft-article-hero-copy">
              <nav className="ft-article-crumbs" aria-label="Brotkrumen">
                <Link href="/">Startseite</Link>
                <span aria-hidden="true">/</span>
                <Link href="/ratgeber">Ratgeber</Link>
                <span aria-hidden="true">/</span>
                <span>{post.category}</span>
              </nav>
              <h1>{post.title}</h1>
              <p className="ft-article-byline">
                {post.author} · {post.readingMinutes} Min. Lesezeit ·{' '}
                {post.updated !== post.date ? `Aktualisiert am ${formatDate(post.updated)}` : formatDate(post.date)}
              </p>
              <TrustStrip />
            </div>
            {/* The LCP element on every article: preloaded, with intrinsic
                width/height so the box is reserved before the file lands. */}
            <Image
              className="ft-article-hero-img"
              src={post.image.src}
              alt={post.image.alt}
              width={post.image.width}
              height={post.image.height}
              sizes="(max-width: 900px) 100vw, 640px"
              priority
            />
          </div>
        </header>

        <div className="ft-shell ft-article-layout">
          <aside className="ft-article-aside">
            {post.toc.length > 2 && (
              <nav className="ft-article-toc" aria-label="Inhalt">
                <p className="ft-article-aside-label">Inhalt</p>
                <ol>
                  {post.toc.map((item) => (
                    <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>
                  ))}
                  {post.faqs.length > 0 && <li><a href="#faq">Häufige Fragen</a></li>}
                </ol>
              </nav>
            )}
            <div className="ft-article-contact">
              <p className="ft-article-aside-label">Persönliche Beratung</p>
              <p className="ft-article-contact-note">Kostenlose Begehung im Umkreis von 50 km um Mannheim.</p>
              <a className="ft-article-contact-phone" href={site.phoneHref}>
                <span>Anrufen · Mo–Fr 8–17 Uhr</span>
                {site.phone}
              </a>
              <Button href="/kontakt" size="sm" className="ft-article-contact-btn">Beratung anfragen</Button>
              <WhatsAppButton size="sm" className="ft-article-contact-btn" />
            </div>
          </aside>

          <div className="ft-article-main">
            {post.summary && (
              <div className="ft-article-summary">
                <p className="ft-article-summary-label">Kurz gesagt</p>
                <p>{inline(post.summary)}</p>
              </div>
            )}
            <div className="ft-article-body">{renderBlocks(bodyMarkdown, post.category)}</div>

            {post.faqs.length > 0 && (
              <section className="ft-article-faq" id="faq" aria-labelledby="faq-title">
                <h2 id="faq-title">Häufige Fragen</h2>
                {post.faqs.map((faq) => (
                  <details key={faq.q}>
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </section>
            )}

            <section className="ft-article-about" aria-label="Über FT Sicherheitstechnik">
              <p className="ft-article-aside-label">Über den Autor</p>
              <h2>FT Sicherheitstechnik, Mannheim</h2>
              <p>
                Gegründet 2013 von {site.founder}, der seine erste Kamerainstallation schon 2008
                umgesetzt hat. Wir planen, installieren und warten Alarmanlagen, Videoüberwachung,
                Zutrittskontrolle und Brandwarntechnik für Betriebe im Umkreis von 50 km um Mannheim.
                Unsere Kameras und Rekorder entwickeln wir seit 2015 unter der eigenen Marke FTronics.
              </p>
              <div className="ft-article-about-actions">
                <Button href={service.href} variant="secondary" size="sm">{service.label}</Button>
                <Button href="/ueber-uns" variant="secondary" size="sm">Über uns</Button>
              </div>
            </section>
          </div>
        </div>

        {related.length > 0 && (
          <section className="ft-article-related" aria-labelledby="related-title">
            <div className="ft-shell">
              <h2 id="related-title">Weiterlesen</h2>
              <div className="ft-article-related-grid">
                {related.map((r) => (
                  <Link key={r.slug} href={r.path} className="ft-article-related-card">
                    <Image src={r.image.src} alt={r.image.alt} width={r.image.width} height={r.image.height} sizes="(max-width: 900px) 100vw, 360px" />
                    <span className="ft-article-related-meta">{r.category} · {r.readingMinutes} Min.</span>
                    <span className="ft-article-related-title">{r.title}</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <section className="ft-section ft-cta-close">
        <div className="ft-shell ft-cta-split">
          <div className="ft-cta-copy">
            <h2>{service.title}</h2>
            <p>{service.text} Die Beratung ist kostenlos und unverbindlich.</p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <Button href={site.phoneHref}>{site.phone}</Button>
              <WhatsAppButton />
            </div>
          </div>
          <CtaAnfrageForm />
        </div>
        <CtaFlatlay />
      </section>

      <div className="ft-article-mobilebar" aria-label="Schnellkontakt">
        <a href={site.phoneHref}>Anrufen</a>
        <a href={site.whatsappHref} target="_blank" rel="noopener noreferrer">WhatsApp</a>
        <Link href="/kontakt">Anfrage</Link>
      </div>
    </>
  )
}
