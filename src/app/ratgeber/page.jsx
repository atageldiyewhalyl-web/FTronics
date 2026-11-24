import Image from 'next/image'
import Link from 'next/link'
import { Button, CtaFlatlay } from '@/components/ui'
import { jsonLd, breadcrumbJsonLd, site } from '@/lib/site'
import { CtaAnfrageForm } from '../CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { GoogleLogo } from '@/components/GoogleLogo'
import { getAllPosts, headingId } from '@/lib/ratgeber-posts'

export const metadata = {
  title: 'Ratgeber Sicherheitstechnik',
  description:
    'Fachartikel zu Alarmanlagen, Videoüberwachung, Zutrittskontrolle, Brandschutz und Sicherheitstechnik im Rhein-Neckar-Raum.',
  alternates: { canonical: '/ratgeber' },
}

const categoryOrder = [
  'Alarmanlagen & Einbruchschutz',
  'Videoüberwachung',
  'Zutrittskontrolle',
  'Brandschutz',
  'Recht & Datenschutz',
  'Sicherheitstechnik',
]

const categoryIntro = {
  'Alarmanlagen & Einbruchschutz': 'Planung, Kosten, Normklassen, Aufschaltung und Wartung von Einbruchmeldeanlagen.',
  'Videoüberwachung': 'Kameratypen, KI-Erkennung, Kosten und Datenschutz für Gelände, Lager und Baustelle.',
  'Zutrittskontrolle': 'Chip statt Schlüssel, Zeiterfassung, Sprechanlagen und Zufahrten sauber gelöst.',
  'Brandschutz': 'Pflichten, Fristen und die richtige Technik für Büro, Halle und Betrieb.',
  'Recht & Datenschutz': 'DSGVO, Speicherfristen und Betriebsrat: was bei Sicherheitstechnik gilt.',
  'Sicherheitstechnik': 'Region, Statistik, Sicherheitskonzept und die Wahl des richtigen Partners.',
}

function shorten(text, max = 150) {
  return text.length > max ? `${text.slice(0, max - 3).replace(/\s+\S*$/, '')} …` : text
}

function TeaserCard({ a, priority }) {
  return (
    <Link href={a.path} className="ft-rg-card">
      <span className="ft-rg-card-img">
        <Image
          src={a.image.src}
          alt={a.image.alt}
          width={a.image.width}
          height={a.image.height}
          sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 360px"
          priority={priority}
        />
      </span>
      <span className="ft-rg-card-body">
        <span className="ft-rg-meta">{a.readingMinutes} Min. Lesezeit</span>
        <span className="ft-rg-card-title">{a.title}</span>
        <span className="ft-rg-card-text">{shorten(a.excerpt)}</span>
        <span className="ft-rg-card-more">Weiterlesen →</span>
      </span>
    </Link>
  )
}

/* ---------------- page ---------------- */

export default function Ratgeber() {
  const articles = getAllPosts()
  const groups = categoryOrder
    .map((name) => ({ name, id: headingId(name), posts: articles.filter((a) => a.category === name) }))
    .filter((g) => g.posts.length)
  const other = articles.filter((a) => !categoryOrder.includes(a.category))
  if (other.length) groups.push({ name: 'Weitere Themen', id: 'weitere-themen', posts: other })
  const featured = articles.find((a) => a.slug === 'sicherheitskonzept-unternehmen-checkliste') || articles[0]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbJsonLd([
            { name: 'Startseite', href: '/' },
            { name: 'Ratgeber', href: '/ratgeber' },
          ])
        )}
      />

      <section className="ft-rg-hero">
        <div className="ft-shell ft-rg-hero-grid">
          <div className="ft-rg-hero-copy">
            <p className="ft-eyebrow">Wissen &amp; Ratgeber</p>
            <h1>Sicherheit beginnt mit Wissen</h1>
            <p className="ft-rg-lead">
              Fachartikel für Betriebe rund um Mannheim: Einbruchschutz, Videoüberwachung,
              Zutrittskontrolle und Brandschutz. Geschrieben von dem Team, das diese Anlagen seit
              2013 plant, installiert und wartet.
            </p>
            <ul className="ft-rg-stats">
              <li><strong>{articles.length}</strong> Fachartikel</li>
              <li><strong>{groups.length}</strong> Themen</li>
              <li className="ft-rg-stat-google"><GoogleLogo size={17} /><span><strong>5,0&nbsp;★</strong> bei Google</span></li>
            </ul>
          </div>
          <Link href={featured.path} className="ft-rg-featured">
            <span className="ft-rg-featured-img">
              <Image
                src={featured.image.src}
                alt={featured.image.alt}
                width={featured.image.width}
                height={featured.image.height}
                sizes="(max-width: 900px) 100vw, 560px"
                priority
              />
            </span>
            <span className="ft-rg-featured-body">
              <span className="ft-rg-meta">Empfohlen · {featured.readingMinutes} Min.</span>
              <span className="ft-rg-featured-title">{featured.title}</span>
              <span className="ft-rg-card-text">{shorten(featured.excerpt, 170)}</span>
            </span>
          </Link>
        </div>
      </section>

      <nav className="ft-rg-topics" aria-label="Themen">
        <div className="ft-shell ft-rg-topics-row">
          {groups.map((g) => (
            <a key={g.id} href={`#${g.id}`}>
              {g.name}<span>{g.posts.length}</span>
            </a>
          ))}
        </div>
      </nav>

      <div className="ft-shell ft-rg-sections">
        {groups.map((g, gi) => (
          <section key={g.id} id={g.id} className="ft-rg-section" aria-labelledby={`${g.id}-title`}>
            <header className="ft-rg-section-head">
              <h2 id={`${g.id}-title`}>{g.name}</h2>
              <p>{categoryIntro[g.name] || ''}</p>
            </header>
            <div className="ft-rg-grid">
              {g.posts.map((a, index) => (
                <TeaserCard key={a.slug} a={a} priority={gi === 0 && index < 3} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* 15.3 Closing CTA */}
      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div
            data-rev
            style={{
              background: 'var(--bg-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--r-xl)', padding: 'clamp(2rem,5vw,4rem)',
              display: 'flex', flexWrap: 'wrap', gap: '1.5rem',
              alignItems: 'center', justifyContent: 'space-between',
            }}
          >
            <div style={{ maxWidth: 560 }}>
              <h3 style={{ marginBottom: '.4em' }}>Bleiben Sie informiert</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Sie haben Fragen zu einem unserer Themen oder wünschen eine persönliche Beratung?
                Unser Expertenteam steht Ihnen jederzeit zur Verfügung.
              </p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: '1.5rem' }}>
                <Button href={site.phoneHref}>{site.phone}</Button>
                <WhatsAppButton />
              </div>
            </div>
            <CtaAnfrageForm />
          </div>
        </div>
        <CtaFlatlay />
      </section>
    </>
  )
}
