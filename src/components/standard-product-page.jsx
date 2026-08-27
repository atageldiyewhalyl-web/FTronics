import Image from 'next/image'
import { sizeOf } from '@/lib/image-sizes'
import { Button, CtaFlatlay, SectionHead } from '@/components/ui'
import { ScrollGallery } from '@/components/scroll'
import { FeatureBento } from '@/components/bento'
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
  /* Which shape the core band takes is decided by what the picture actually
     is, not by the page. Five products were shot for this: a *-core.webp macro
     of the optics on a studio backdrop, subject low in a 2400x1792 frame — the
     same character as the FC-8D's sensor plate, and what the full-bleed stack
     was built around. The other eleven have no macro, so their `core` falls
     back to the catalogue's cut-out product render: the whole camera, centred,
     on near-white. Cover-cropping that into a band twice as wide as it is tall
     would take the top and bottom off the camera, which is the reason the
     split variant exists. Give those a macro and they move over on their own. */
  const coreIsMacro = /-core\.(webp|jpe?g|png)$/.test(product.images.core)

  /* The band picture's own ground, carried up into the section above it so the
     two meet without a step. Split pages already paint their band --band-solid,
     so the lead-in simply takes the same colour; stacked pages keep the page
     ground under their copy and need the channels as well, to start the band's
     top fade from the picture's grey rather than from --bg.
     Products with no coreGround — the cut-out PNGs, which have no studio
     backdrop to match — get neither, and the run stays as it was. */
  const leadInBg = product.coreGround || null
  const bandTopChannels =
    coreIsMacro && /^rgb\(/.test(product.coreGround || '')
      ? product.coreGround.slice(4, -1).replace(/\s+/g, '')
      : null

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
        {/* Full-bleed hero and the LCP element on this page. Real width/height
            rather than `fill`: .ft-phero-img is resized by a media query below
            the tablet breakpoint, and `fill` writes height/inset as inline
            styles that would override it. With explicit dimensions next/image
            emits no layout styles, so the stylesheet stays in charge.
            `priority` preloads it instead of lazy-loading. */}
        <Image
          className="ft-phero-img"
          src={product.images.hero}
          alt={product.alts.hero}
          {...sizeOf(product.images.hero)}
          sizes="100vw"
          priority
        />
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
          <FeatureBento items={product.proofs} label={`${product.name} Produktmerkmale`} />
        </div>
      </section>

      <section
        className={leadInBg ? 'ft-band-lead-in' : undefined}
        style={{
          padding: 'clamp(4.5rem,8vw,9rem) 0 clamp(3.5rem,6vw,6.5rem)',
          ...(leadInBg ? { '--lead-in-bg': leadInBg } : null),
        }}
      >
        <div className="ft-shell">
          <div className="ft-center" data-rev-group style={{ maxWidth: 'min(100%,900px)', marginInline: 'auto' }}>
            <p className="ft-eyebrow" data-rev>{product.positioning.eyebrow}</p>
            <h2 data-rev>{product.positioning.title}</h2>
            <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>{product.positioning.text}</p>
          </div>
        </div>
      </section>

      {/* The full-bleed stack, same as the hand-written FC-8D pages: the macro
          across the top dissolving into the page, the words underneath it on
          that ground. No --band-solid here — the fade ends on the page's own
          colour, and painting the section the render's grey instead would put
          the seam back at the foot of the picture. */}
      {coreIsMacro ? (
        <section className="ft-sensorband" style={bandTopChannels ? { '--band-top': bandTopChannels } : undefined}>
          <Image className="ft-sensorband-img" src={product.images.core} alt={product.alts.core} {...sizeOf(product.images.core)} sizes="100vw" />
          <div className="ft-shell ft-sensorband-inner">
            <div className="ft-sensorband-copy ft-center" data-rev-group>
              <p className="ft-eyebrow" data-rev>{product.core.eyebrow}</p>
              <h2 data-rev>{product.core.title}</h2>
              <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>{product.core.text}</p>
            </div>
          </div>
        </section>
      ) : (
        /* Copy first, which is also the order the columns collapse into. */
        <section
          className="ft-sensorband ft-sensorband--split"
          /* The render's own ground, sampled off the file's edge pixels, so the
             picture meets the section with no rectangle around it. Absent on the
             cut-out PNGs, which have no ground to match — there the band keeps
             the page's. */
          style={product.coreGround ? { '--band-solid': product.coreGround } : undefined}
        >
          <div className="ft-shell ft-sensorband-inner">
            <div className="ft-sensorband-copy" data-rev-group>
              <p className="ft-eyebrow" data-rev>{product.core.eyebrow}</p>
              <h2 data-rev>{product.core.title}</h2>
              <p data-rev style={{ color: 'var(--fg-secondary)', marginTop: '1rem', maxWidth: 'none' }}>{product.core.text}</p>
            </div>
            <Image className="ft-sensorband-img" src={product.images.core} alt={product.alts.core} {...sizeOf(product.images.core)} sizes="100vw" />
          </div>
        </section>
      )}

      <ScanBand className="ft-band ft-band--dark ft-band--scan ft-band--standard-product" data-nav-dark>
        <div className="ft-band-stage">
          <Image className="ft-band-img" src={product.images.feature} alt={product.alts.feature} {...sizeOf(product.images.feature)} sizes="100vw" />
          <div className="ft-shell ft-band-inner">
            <div className="ft-band-copy" lang="de">
              <p className="ft-eyebrow">{product.intelligence.eyebrow}</p>
              <h2>{product.intelligence.title}</h2>
              <p className="ft-lead">{product.intelligence.text}</p>
            </div>
            <div className="ft-band-rail">
              {/* One entrance for the whole rail — see the FC-8D Pro's band. */}
              <div data-rev>
              <ScrollGallery itemWidth={320} label={`${product.name} Funktionen`}>
                {product.intelligence.cards.map((item) => (
                  <div key={item.h}>
                    <div className="ft-scan-card">
                      <Image className="ft-scan-card-img" src={item.img} alt={item.alt} {...sizeOf(item.img)} sizes="(max-width: 900px) 80vw, 420px" />
                      <div className="ft-scan-card-body"><h4>{item.h}</h4><p>{item.p}</p></div>
                    </div>
                  </div>
                ))}
              </ScrollGallery>
              </div>
            </div>
          </div>
        </div>
      </ScanBand>

      <section style={{ padding: 'clamp(6rem,9vw,10rem) 0' }}>
        <div className="ft-shell">
          <SectionHead className="ft-center" eyebrow={product.proofPanel.eyebrow} title={product.proofPanel.title} lead={product.proofPanel.lead} />
          <div data-rev style={{ ...panel, display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(280px,100%),1fr))', gap: 'clamp(2rem,5vw,5rem)', alignItems: 'center', marginTop: '2.5rem' }}>
            {/* No media frame here: the render is a cutout on the panel's own
                ground, so a box around it only drew a second edge inside the
                one the panel already has. */}
            <Image
              src={product.images.product}
              alt={product.alts.product}
              {...sizeOf(product.images.product)}
              sizes="(max-width: 900px) 90vw, 560px"
              style={{ display: 'block', width: '100%', height: 'auto' }}
            />
            <div>
              <h3>{product.proofPanel.subhead}</h3>
              <p style={{ color: 'var(--fg-secondary)', marginTop: '.8rem' }}>{product.proofPanel.text}</p>
              <div className="ft-proof-facts" data-rev-group style={{ marginTop: '2rem' }}>
                {product.proofPanel.facts.map(([value, label]) => (
                  <div className="ft-proof-fact" data-rev key={label}>
                    <span className="ft-proof-fact-num">{value}</span>
                    <span className="ft-proof-fact-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '0 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          <div className="ft-weather-panel" data-rev>
            <Image className="ft-weather-panel-img" src={product.images.weather} alt={product.alts.weather} {...sizeOf(product.images.weather)} sizes="100vw" />
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
        <CtaFlatlay />
      </section>
    </>
  )
}
