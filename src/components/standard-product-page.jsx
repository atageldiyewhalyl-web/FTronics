import { Button, Card, Media, SectionHead } from '@/components/ui'
import { ScrollGallery } from '@/components/scroll'
import { ScanBand } from '@/components/scan-band'
import { site, cta, jsonLd, breadcrumbJsonLd } from '@/lib/site'

const panel = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
  padding: '1.6rem',
}

function SpecCard({ groups }) {
  return (
    <div data-rev style={{ ...panel, display: 'grid', gridTemplateColumns: '1fr', gap: 0, marginTop: '2.5rem' }}>
      {groups.map((group, groupIndex) => (
        <div
          key={group.title}
          style={{
            padding: groupIndex === 0 ? 0 : '1.6rem 0 0',
            marginTop: groupIndex === 0 ? 0 : '1.6rem',
            ...(groupIndex === 0 ? null : { borderTop: '1px solid var(--border)' }),
          }}
        >
          <h4 style={{ marginBottom: '1em' }}>{group.title}</h4>
          <dl style={{ margin: 0, display: 'grid', gridTemplateColumns: '1fr', gap: 10, fontSize: 'var(--t-body-sm)' }}>
            {group.rows.map(([term, value], rowIndex) => (
              <div
                key={`${group.title}-${term}`}
                style={{
                  display: 'flex', justifyContent: 'space-between', gap: 12,
                  ...(rowIndex < group.rows.length - 1 ? { borderBottom: '1px solid var(--border)', paddingBottom: 8 } : null),
                }}
              >
                <dt style={{ color: 'var(--fg-tertiary)' }}>{term}</dt>
                <dd style={{ margin: 0, textAlign: 'right', maxWidth: '68%' }}>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  )
}

export function StandardProductPage({ product }) {
  const breadcrumb = breadcrumbJsonLd([
    { name: 'Start', href: '/' },
    { name: 'Produkte', href: '/produkte' },
    { name: `FTronics ${product.name}`, href: `/produkte/${product.slug}` },
  ])
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `FTronics ${product.name}`,
    sku: product.name,
    category: product.category,
    description: product.metaDescription,
    brand: { '@type': 'Brand', name: site.brand },
    manufacturer: { '@type': 'Organization', name: site.name },
    additionalProperty: product.schema.map(([name, value]) => ({ '@type': 'PropertyValue', name, value })),
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(productSchema)} />

      <section className="ft-phero">
        <img className="ft-phero-img" src={product.images.hero} alt={product.alts.hero} />
        <div className="ft-shell ft-phero-inner">
          <div className="ft-phero-copy" data-rev-group>
            <p className="ft-eyebrow" data-rev>FTronics · {product.category}</p>
            <h1 data-rev>{product.name}</h1>
            <p className="ft-lead" data-rev style={{ margin: '.8rem 0 0' }}>{product.promise}</p>
            <p data-rev style={{ color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)', margin: '1rem 0 1.6rem' }}>
              Für Profis entwickelt. Made for FT.
            </p>
            <div data-rev><Button href="/kontakt">{cta.advice}</Button></div>
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(2rem,4vw,3rem) 0 0' }}>
        <div className="ft-shell">
          <div className="ft-bento" data-rev-group>
            {product.proofs.map((item) => (
              <div
                data-rev
                key={item.h}
                className={`ft-bento-tile ft-bento-tile--${item.kind}${item.tall ? ' ft-bento-tile--tall' : ''}${item.wide ? ' ft-bento-tile--wide' : ''}`}
              >
                {item.img ? <img className="ft-bento-img" src={item.img} alt={item.alt} loading="lazy" decoding="async" /> : null}
                <h3>{item.h}</h3>
                <p>{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: 'clamp(9rem,14vw,16rem) 0 clamp(6rem,9vw,10rem)' }}>
        <div className="ft-shell">
          <div className="ft-center" data-rev-group style={{ maxWidth: 'min(100%,900px)', marginInline: 'auto' }}>
            <p className="ft-eyebrow" data-rev>{product.positioning.eyebrow}</p>
            <h2 data-rev>{product.positioning.title}</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>{product.positioning.text}</p>
          </div>
        </div>
      </section>

      <section className="ft-sensorband">
        <img className="ft-sensorband-img" src={product.images.core} alt={product.alts.core} loading="lazy" decoding="async" />
        <div className="ft-shell ft-sensorband-inner">
          <div className="ft-sensorband-copy ft-center" data-rev-group>
            <p className="ft-eyebrow" data-rev>{product.core.eyebrow}</p>
            <h2 data-rev>{product.core.title}</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>{product.core.text}</p>
          </div>
        </div>
      </section>

      <ScanBand className="ft-band ft-band--dark ft-band--scan ft-band--standard-product" data-nav-dark>
        <div className="ft-band-stage">
          <img className="ft-band-img" src={product.images.feature} alt={product.alts.feature} loading="lazy" decoding="async" />
          <div className="ft-shell ft-band-inner">
            <div className="ft-band-copy" lang="de">
              <p className="ft-eyebrow">{product.intelligence.eyebrow}</p>
              <h2>{product.intelligence.title}</h2>
              <p className="ft-lead">{product.intelligence.text}</p>
            </div>
            <div className="ft-band-rail">
              <ScrollGallery itemWidth={320} label={`${product.name} Funktionen`} paddles={false}>
                {product.intelligence.cards.map((item) => (
                  <div key={item.h}>
                    <div className="ft-scan-card">
                      <img className="ft-scan-card-img" src={item.img} alt={item.alt} loading="lazy" decoding="async" />
                      <div className="ft-scan-card-body"><h4>{item.h}</h4><p>{item.p}</p></div>
                    </div>
                  </div>
                ))}
              </ScrollGallery>
            </div>
          </div>
        </div>
      </ScanBand>

      <section style={{ padding: 'clamp(6rem,9vw,10rem) 0' }}>
        <div className="ft-shell">
          <SectionHead className="ft-center" eyebrow={product.proofPanel.eyebrow} title={product.proofPanel.title} lead={product.proofPanel.lead} />
          <div data-rev style={{ ...panel, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', marginTop: '2.5rem' }}>
            <Media src={product.images.product} alt={product.alts.product} ratio="1 / 1" rounded="var(--r-lg)" pad="4%" />
            <div>
              <h3>{product.proofPanel.subhead}</h3>
              <p style={{ color: 'var(--fg-secondary)', marginTop: '.8rem' }}>{product.proofPanel.text}</p>
              <div className="ft-grid ft-grid--auto-xs" data-rev-group style={{ marginTop: '2rem' }}>
                {product.proofPanel.facts.map(([value, label]) => (
                  <div data-rev key={label}><Card variant="stat" title={value}>{label}</Card></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div className="ft-weather-panel" data-rev>
            <img className="ft-weather-panel-img" src={product.images.weather} alt={product.alts.weather} loading="lazy" decoding="async" />
            <div className="ft-weather-panel-copy" data-rev-group>
              <p className="ft-eyebrow" data-rev>{product.resilience.eyebrow}</p>
              <h2 data-rev>{product.resilience.title}</h2>
              <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem' }}>{product.resilience.text}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="technik" style={{ padding: 'clamp(5rem,7vw,8rem) 0 0' }}>
        <div className="ft-shell">
          <SectionHead eyebrow="Spezifikationen" title="Technische Daten" />
          <SpecCard groups={product.specGroups} />
          <div data-rev style={{ ...panel, marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ maxWidth: 560 }}>
              <h4 style={{ marginBottom: '.3em' }}>Datenblatt für Ihre Unterlagen.</h4>
              <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>Offizielle Produktdokumentation mit den vollständigen technischen Parametern.</p>
            </div>
            <Button variant="secondary" href={product.datasheet}>{product.name} Datenblatt (PDF)</Button>
          </div>
          <ul className="ft-notes" data-rev>{product.footnotes.map((note) => <li key={note}>{note}</li>)}</ul>
        </div>
      </section>

      <section style={{ padding: 'clamp(5rem,7vw,8rem) 0' }}>
        <div className="ft-shell" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 data-rev style={{ maxWidth: '16ch', marginLeft: 'auto', marginRight: 'auto' }}>Passt die {product.name} zu Ihrem Objekt?</h2>
          <p data-rev style={{ fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)', maxWidth: 620, margin: '1rem auto 2rem' }}>{product.cta}</p>
          <div data-rev style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Button href="/kontakt">{cta.advice}</Button>
            <Button variant="secondary" href="/produkte">{cta.products}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
