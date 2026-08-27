import Image from 'next/image'
import Link from 'next/link'
import { Chip, CtaFlatlay, SectionHead } from '@/components/ui'
import { cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'
import { ReadingProgress } from './ReadingProgress'
import { CtaAnfrageForm } from '../CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { getAllPosts } from '@/lib/ratgeber-posts'

export const metadata = {
  title: 'Ratgeber Sicherheitstechnik',
  description:
    'Fachartikel zu Alarmanlagen, Videoüberwachung, Zutrittskontrolle, Brandschutz und Sicherheitstechnik im Rhein-Neckar-Raum.',
  alternates: { canonical: '/ratgeber' },
}

/* .ft-card gives background, border, radius and the hover lift; the teaser card
   only overrides the padding so the 16:9 image can sit flush. */
const teaserCard = {
  padding: 0,
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

const readMore = {
  color: 'var(--fg)',
  font: '500 var(--t-body-sm) var(--font-ui)',
  textDecoration: 'none',
}

/* ---------------- page ---------------- */

export default function Ratgeber() {
  const articles = getAllPosts()

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

      <ReadingProgress />

      {/* 15.1 Hero */}
      <section style={{ padding: 'clamp(4rem,6vw,6.5rem) 0 0' }}>
        <div className="ft-shell">
          <div data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>Wissen &amp; Ratgeber</p>
            <h1 data-rev>Sicherheit beginnt mit Wissen</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)',
                color: 'var(--fg-secondary)', margin: '1rem 0 0',
              }}
            >
              Fachartikel für Betriebe: von Einbruchschutz und Videoüberwachung bis
              Zutrittskontrolle, Brandschutz und regionaler Planung rund um Mannheim.
            </p>
          </div>
        </div>
      </section>

      {/* 15.2 Fachartikel */}
      <section style={{ padding: 'clamp(4rem,6vw,6rem) 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <SectionHead
            eyebrow="Ratgeber & Fachartikel"
            title="Sicherheitstechnik im Betrieb richtig entscheiden"
            lead="Praxisnah, regional und ohne Pauschalversprechen: diese Ratgeber helfen bei Planung, Pflichten und Systemauswahl."
          />
          <div
            data-rev-group
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(min(340px,100%),1fr))',
              gap: '1.25rem', marginTop: '3rem',
            }}
          >
            {articles.map((a, index) => (
              <div data-rev key={a.slug}>
                <article className="ft-card" style={teaserCard}>
                  <Link href={a.path} className="ft-ratgeber-card-img">
                    <Image
                      src={a.image.src}
                      alt={a.image.alt}
                      width={a.image.width}
                      height={a.image.height}
                      sizes="(max-width: 900px) 100vw, 380px"
                      priority={index === 0}
                    />
                  </Link>
                  <div
                    style={{
                      padding: '1.6rem', display: 'flex', flexDirection: 'column',
                      gap: 10, flex: 1,
                    }}
                  >
                    <Chip style={{ alignSelf: 'flex-start' }}>{a.category}</Chip>
                    <h4 style={{ margin: 0 }}>
                      <Link href={a.path} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {a.title}
                      </Link>
                    </h4>
                    <p style={{ flex: 1 }}>{a.excerpt}</p>
                    <Link href={a.path} style={readMore}>Weiterlesen →</Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

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
