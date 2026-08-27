import Image from 'next/image'
import { sizeOf } from '@/lib/image-sizes'
import { Button, CtaFlatlay } from '@/components/ui'
import { cta } from '@/lib/site'
import { ProductCatalogue } from './ProductCatalogue'
import { CtaAnfrageForm } from '../CtaAnfrageForm'
import { WhatsAppButton } from '@/components/WhatsAppButton'

export const metadata = {
  /* Root layout appends " | FT Sicherheitstechnik" via the title template. */
  /* `absolute`: the title already opens with the FTronics brand. */
  title: { absolute: 'FTronics Kameras, NVR & Überwachungstechnik' },
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
        {/* Full-bleed hero and the LCP element on this page. Real width/height
            rather than `fill`: .ft-phero-img is resized by a media query below
            the tablet breakpoint, and `fill` writes height/inset as inline
            styles that would override it. With explicit dimensions next/image
            emits no layout styles, so the stylesheet stays in charge.
            `priority` preloads it instead of lazy-loading. */}
        <Image
          className="ft-phero-img"
          src="/produkte-hero.webp"
          alt="Eine FTronics Dome-Kamera unter der Decke eines Hauseingangs im Morgenlicht"
          {...sizeOf("/produkte-hero.webp")}
          sizes="100vw"
          priority
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
      <section className="ft-section ft-cta-close">
        <div className="ft-shell ft-cta-split" data-rev>
            <div className="ft-cta-copy">
              <h3 style={{ marginBottom: '.4em' }}>Interesse an unseren Produkten?</h3>
              <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                Wir beraten Sie gerne und erstellen Ihnen ein individuelles Angebot.
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
