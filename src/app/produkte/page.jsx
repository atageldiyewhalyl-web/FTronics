import { Button } from '@/components/ui'
import { cta } from '@/lib/site'
import { ProductCatalogue } from './ProductCatalogue'

export const metadata = {
  /* Root layout appends " | FT Sicherheitstechnik" via the title template. */
  title: 'FTronics Kameras, NVR & Überwachungstechnik',
  description:
    'FTronics Produktkatalog: 4K IP-Kameras (Dome, Bullet, Turret, PTZ), NVR-Rekorder (8-64 Kanäle), IP-Lautsprecher. Sony IMX415, KI-Analyse, NDAA-konform. Professionelle Überwachungstechnik.',
  alternates: { canonical: '/produkte' },
}

export default function Produkte() {
  return (
    <>
      {/* Hero — the same full-bleed band the product pages use, but sized to
          a header rather than a full screen: this page's job is the grid
          below it, so the picture introduces the range and gets out of the way. */}
      <section className="ft-phero ft-phero--short">
        <img
          className="ft-phero-img"
          src="/produkte-hero.webp"
          alt="Eine FTronics Dome-Kamera unter der Decke eines Hauseingangs im Morgenlicht"
        />
        <div className="ft-shell ft-phero-inner">
          <div className="ft-phero-copy" data-rev-group>
            <p className="ft-eyebrow" data-rev>FTronics Eigenmarke</p>
            {/* The measure lives in CSS: an inline one cannot be widened for a
                phone, where the copy has the whole column rather than half of it. */}
            <h1 data-rev>FTronics: Unsere Eigenmarke</h1>
            <p
              data-rev
              style={{
                fontSize: 'var(--t-lead)', lineHeight: 'var(--t-lead-lh)', color: 'var(--fg-secondary)',
                maxWidth: 680, margin: '1rem 0 0',
              }}
            >
              Professionelle 4K-Kameras, NVR-Rekorder und Zubehör mit modernster KI-Technologie,
              18 Produkte, alle NDAA-konform.
            </p>
            <p data-rev style={{ margin: '1rem 0 0', color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)' }}>
              Für Profis entwickelt. Made for FT.
            </p>
          </div>
        </div>
      </section>

      {/* Sticky filter bar + 18-SKU grid (client — filter state) */}
      <ProductCatalogue />

      {/* Closing CTA */}
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
              <h3 style={{ marginBottom: '.4em' }}>Interesse an unseren Produkten?</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir beraten Sie gerne und erstellen Ihnen ein individuelles Angebot.
              </p>
            </div>
            <Button href="/kontakt">{cta.quote}</Button>
          </div>
        </div>
      </section>
    </>
  )
}
