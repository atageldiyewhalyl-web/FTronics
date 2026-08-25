'use client'

import { useEffect, useRef, useState } from 'react'
import { Button, Media, Placeholder } from '@/components/ui'
import { markFor } from '@/components/spec-marks'
import { cta } from '@/lib/site'

/* "Dome IP" is a shorthand; the eyebrow spells it out. Only the camera
   categories take the suffix — an NVR is not a camera, and "Aufzugkamera"
   already ends in one. */
function kindLabel(p) {
  return p.cat === 'kamera' && !/kamera$/i.test(p.kind) ? `${p.kind}-Kamera` : p.kind
}

/* ---------------- catalogue data ---------------- */

const filters = [
  ['alle', 'Alle'],
  ['kamera', 'Kameras'],
  ['nvr', 'NVR & Rekorder'],
  ['zubehoer', 'Zubehör'],
]

/** 18 SKUs — order, copy and spec chips verbatim from the artboard. */
const products = [
  {
    sku: 'fc-8d-pro', cat: 'kamera', kind: 'Dome IP', name: 'FC-8D Pro',
    desc: 'Kompakte Dome-Kamera mit 4K Auflösung und KI-Personenerkennung. Sony IMX415 Sensor.',
    chips: ['4K 8MP', 'IP67', 'KI-Analyse', 'PoE'],
    img: '/fc-8d-pro-main.png',
    href: '/produkte/fc-8d-pro', link: `${cta.details} →`,
  },
  {
    sku: 'fc-8d', cat: 'kamera', kind: 'Dome IP', name: 'FC-8D',
    desc: '4K Dome-Kamera mit Sony IMX415 Sensor und Personen-/Fahrzeugerkennung für Innen und Außen.',
    chips: ['4K 8MP', 'IP67', 'PoE', 'Sony IMX415'],
    img: '/fc-8d-main.png',
    href: '/produkte/fc-8d', link: `${cta.details} →`,
  },
  {
    sku: 'fc-8d-zoom', cat: 'kamera', kind: 'Dome IP', name: 'FC-8D Zoom',
    desc: 'Premium Dome mit motorisiertem 2.8-8mm Zoom, Gesichtserkennung und vollständiger VCA KI-Suite.',
    chips: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'Motorzoom'],
    img: '/fc-8d-zoom-main.png',
    href: '/produkte/fc-8d-zoom', link: `${cta.details} →`,
  },
  {
    sku: 'fc-6z-mini', cat: 'kamera', kind: 'Mini-PTZ Dome', name: 'FC-6Z Mini',
    desc: 'Kompakte vandalismusgeschützte Mini-PTZ mit 3x Zoom und vollständiger KI-Suite inkl. Gesichtserkennung.',
    chips: ['6MP', 'IP67', '3x Zoom', '100dB WDR'],
    img: '/fc-6z-mini-main.png',
    href: '/produkte/fc-6z-mini', link: `${cta.details} →`,
  },
  {
    sku: 'fb-8a-pro', cat: 'kamera', kind: 'Bullet IP', name: 'FB-8A Pro',
    desc: 'Premium Bullet mit vollständiger VCA KI-Suite: Gesichts-, Personen-, Fahrzeug- und Haustier-Erkennung.',
    chips: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'PoE'],
    img: '/fb-8a-pro-main.png',
    href: '/produkte/fb-8a-pro', link: `${cta.details} →`,
  },
  {
    sku: 'fb-8a-max', cat: 'kamera', kind: 'Bullet IP', name: 'FB-8A Max',
    desc: 'Premium Bullet mit aktiver Abschreckung (Rot/Blau LEDs), Gesichtserkennung und Dual-Light.',
    chips: ['4K 8MP', 'IP67', 'Dual-Light', '100dB WDR'],
    img: '/fb-8a-max-main.png',
    href: '/produkte/fb-8a-max', link: `${cta.details} →`,
  },
  {
    sku: 'fb-8b', cat: 'kamera', kind: 'Bullet IP', name: 'FB-8B',
    desc: 'Leistungsstarke 4K Bullet-Kamera mit Sony IMX415 Sensor und 30fps für kristallklare Aufnahmen.',
    chips: ['4K 8MP@30fps', 'IP67', 'PoE', 'Sony IMX415'],
    img: '/fb-8b-main.png',
    href: '/produkte/fb-8b', link: `${cta.details} →`,
  },
  {
    sku: 'ft-8c-pro', cat: 'kamera', kind: 'Turret IP', name: 'FT-8C Pro',
    desc: 'Turret-Kamera mit 24/7 Farbbildgebung, F1.0 Blende und Gesichtserkennung für beste Nachtsicht.',
    chips: ['4K 8MP', 'IP67', 'Gesichtserkennung', 'F1.0'],
    img: '/ft-8c-pro-main.jpg',
    href: '/produkte/ft-8c-pro', link: `${cta.details} →`,
  },
  {
    sku: 'ft-8p-dual', cat: 'kamera', kind: '180° Panorama Turret', name: 'FT-8P Dual',
    desc: 'Dual-Objektiv Panoramakamera mit 180° Weitwinkel, aktiver Abschreckung und Zweiwege-Audio.',
    chips: ['8MP 180°', 'IP67', 'Dual-Light', '2-Wege Audio'],
    img: '/ft-8p-dual-main.png',
    href: '/produkte/ft-8p-dual', link: `${cta.details} →`,
  },
  {
    sku: 'fp-8t-20x', cat: 'kamera', kind: 'PTZ Speed Dome', name: 'FP-8T 20X',
    desc: 'Professionelle PTZ mit 20x Zoom, Auto-Tracking, Dual-Light (IR 100m + Warmlicht 50m) und KI-Suite.',
    chips: ['4K 8MP', 'IP67', 'Auto-Tracking', 'IR 100m'],
    img: '/fp-8t-20x-main.png',
    href: '/produkte/fp-8t-20x', link: `${cta.details} →`,
  },
  {
    sku: 'fp-8s-25x', cat: 'kamera', kind: 'PTZ Speed Dome', name: 'FP-8S 25X',
    desc: 'Leistungsstarke PTZ mit 25x Zoom, Auto-Tracking und 100m IR-Nachtsicht für große Flächen.',
    chips: ['4K 8MP', 'IP66', '25x Zoom', 'IR 100m'],
    img: '/fp-8s-25x-main.png',
    href: '/produkte/fp-8s-25x', link: `${cta.details} →`,
  },
  {
    sku: 'fe-6l', cat: 'kamera', kind: 'Aufzugkamera', name: 'FE-6L',
    desc: 'Kompakte Aufzugkamera mit 6MP Auflösung und KI-Erkennung, speziell für Fahrstühle und enge Räume.',
    chips: ['6MP', 'IP65', 'PoE', 'Sony CMOS'],
    img: '/fe-6l-main.png',
    href: '/produkte/fe-6l', link: `${cta.details} →`,
  },
  {
    sku: 'fn-8', cat: 'nvr', kind: '8-Kanal 4K NVR', name: 'FN-8',
    desc: 'Kompakter 8-Kanal NVR mit 4K Aufzeichnung, Ultra 265 und VCA Analysefunktionen.',
    chips: ['4K', '8 Kanäle', '1x SATA 8TB', 'VCA'],
    img: '/fn-8-main.jpg',
    href: '/produkte/fn-8', link: `${cta.details} →`,
  },
  {
    sku: 'fn-16', cat: 'nvr', kind: '16-Kanal 4K NVR', name: 'FN-16',
    desc: 'Leistungsstarker 16-Kanal NVR mit 2x SATA für bis zu 16TB und ANR Technologie.',
    chips: ['4K', '16 Kanäle', '2x SATA 16TB', 'ANR'],
    img: '/fn-16-main.jpg',
    href: '/produkte/fn-16', link: `${cta.details} →`,
  },
  {
    sku: 'fn-32', cat: 'nvr', kind: '32-Kanal 4K NVR', name: 'FN-32',
    desc: 'Professioneller 32-Kanal NVR für große Anlagen mit 16-Kanal Wiedergabe und VCA Analyse.',
    chips: ['4K', '32 Kanäle', '2x SATA 16TB', 'VCA'],
    img: '/fn-32-main.jpg',
    href: '/produkte/fn-32', link: `${cta.details} →`,
  },
  {
    sku: 'fn-64-pro', cat: 'nvr', kind: '64-Kanal Profi-NVR', name: 'FN-64 Pro',
    desc: 'Enterprise-NVR mit 64 Kanälen, RAID-Support, 8x SATA und Kennzeichenerkennung.',
    chips: ['12MP', '64 Kanäle', 'RAID', '8x SATA'],
    img: '/fn-64-pro-main.png',
    href: '/produkte/fn-64-pro', link: `${cta.details} →`,
  },
  {
    sku: 'fr-8x', cat: 'nvr', kind: '8-Kanal Hybrid XVR', name: 'FR-8X',
    desc: 'Vielseitiger Hybrid-XVR für TVI, AHD, CVI und IP mit 4K HDMI-Ausgang und KI-Erkennung.',
    chips: ['4K HDMI', '8+16 Kanäle', 'H.265', 'Hybrid'],
    img: '/fr-8x-main.png',
    href: '/produkte/fr-8x', link: `${cta.details} →`,
  },
  {
    sku: 'fs-30', cat: 'zubehoer', kind: 'IP-Lautsprecher', name: 'FS-30',
    desc: '30W IP-Hornlautsprecher mit 130 dBSPL für Alarm-Durchsagen und NVR-Kopplung.',
    chips: ['30W', 'IP66', '130 dBSPL', 'PoE'],
    img: '/fs-30-main.png',
    href: '/produkte/fs-30', link: `${cta.details} →`,
  },
]

/* ---------------- component ---------------- */

/**
 * Sticky category filter + SKU grid.
 * Every card stays mounted and is hidden via `display` so the page-level
 * ScrollFX observer keeps its reference and reveals cards on re-entry.
 */
export function ProductCatalogue() {
  const [active, setActive] = useState('alle')
  /* The picker, on a phone. A row of four chips cannot show four chips in
     343px, so it scrolled — which hides the categories behind a gesture and
     pushes the count off the end of the same scroll. One control that names
     the current filter, and the count where it can always be read. */
  const [open, setOpen] = useState(false)
  const pickerRef = useRef(null)

  const shown = (p) => active === 'alle' || p.cat === active
  const count = products.filter(shown).length
  const activeLabel = filters.find(([id]) => id === active)?.[1] ?? 'Alle'

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        pickerRef.current?.querySelector('.ft-filter-btn')?.focus()
      }
    }
    const onDown = (e) => {
      if (!pickerRef.current?.contains(e.target)) setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    <>
      <div
        style={{
          position: 'sticky', top: 72, zIndex: 40, marginTop: '2.5rem',
          background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div className="ft-shell ft-catbar" role="group" aria-label="Produktkategorien filtern">
          {/* Wide enough for the chips: they stay, and stay the fastest way to
              switch when there is room to show them all at once. */}
          <div className="ft-catbar-chips">
            {filters.map(([id, label]) => (
              <Button
                key={id}
                size="sm"
                variant={active === id ? 'primary' : 'secondary'}
                aria-pressed={active === id}
                onClick={() => setActive(id)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {label}
              </Button>
            ))}
          </div>

          {/* The same four categories on a phone, behind one control. */}
          <div className="ft-catbar-picker" ref={pickerRef}>
            <button
              type="button"
              className="ft-filter-btn"
              aria-expanded={open}
              aria-controls="ft-filter-menu"
              onClick={() => setOpen((o) => !o)}
            >
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true" focusable="false">
                <path d="M2 4h12M4.5 8h7M7 12h2" fill="none" stroke="currentColor"
                  strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <span>{activeLabel}</span>
              <svg className="ft-filter-caret" viewBox="0 0 10 6" width="10" height="6"
                aria-hidden="true" focusable="false">
                <path d="M1 1.5 5 5 9 1.5" fill="none" stroke="currentColor"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            {/* Left mounted and hidden with visibility, so it leaves the tab
                order while closed and can still fade both ways. */}
            <div className="ft-filter-menu" id="ft-filter-menu" data-open={open ? 'true' : undefined}>
              {filters.map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  className="ft-filter-opt"
                  aria-current={active === id ? 'true' : undefined}
                  onClick={() => { setActive(id); setOpen(false) }}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <span className="ft-catbar-count" aria-live="polite">
            {count} {count === 1 ? 'Produkt' : 'Produkte'}
          </span>
        </div>
      </div>

      <section style={{ padding: '3rem 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell ft-grid ft-prod-grid">
          {products.map((p) => (
            <article
              key={p.sku}
              data-rev
              className="ft-prod-card"
              style={{ display: shown(p) ? 'flex' : 'none' }}
            >
              <div className="ft-prod-media">
                {/* alt="": the render shows the product the heading directly
                    below it already names, and the description after that says
                    what it does. Describing it here would read the product out
                    twice. Same call as the rail on the home page.
                    No tint: the cutout sits on the card's own white so the card
                    stays one plane, the way the home page rail sets it. */}
                {p.img ? (
                  <Media src={p.img} alt="" ratio="4 / 3" rounded="var(--r-md)" pad="7%" />
                ) : (
                  <Placeholder ratio="4 / 3" rounded="var(--r-md)" label={`${p.name}: Produktrender`} />
                )}
              </div>
              <div className="ft-prod-head">
                <p className="ft-prod-kind">{kindLabel(p)}</p>
                <h4 className="ft-prod-name">{p.name}</h4>
                <p className="ft-prod-desc">{p.desc}</p>
              </div>
              <div className="ft-prod-foot">
                {/* A list, not a row of spans: these are the product's specs,
                    and a screen reader should be told how many there are. */}
                <ul className="ft-spec-row">
                  {p.chips.map((c) => (
                    <li className="ft-spec" key={c}>{markFor(c)}{c}</li>
                  ))}
                </ul>
                <Button href={p.href} variant="secondary" size="sm" className="ft-prod-cta">{p.link}</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
