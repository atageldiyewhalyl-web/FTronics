'use client'

import { useEffect, useRef } from 'react'

/**
 * ScanBand — a pinned band whose scroll progress drives everything inside it.
 *
 * The section is taller than the screen; a sticky stage inside it holds still
 * while that extra height scrolls past. How far through we are is written to
 * `--p` (0 → 1) on the section, and every stage of the sequence is derived
 * from that one number in CSS: the photograph blurs, the headline gives way,
 * the cards arrive. Keeping the arithmetic in CSS means one listener rather
 * than one per animated thing, and nothing can fall out of sync.
 *
 * The site's shared reveal observer never reaches inside this section, which
 * is why this doesn't lean on `data-rev` the way the rest of the page does.
 */
export function ScanBand({ children, className = '', ...rest }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Matches the rest of the site: reduced motion gets the end state at once
    // rather than a sequence tied to the scroll wheel.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.style.setProperty('--p', '1')
      return
    }

    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      // The travel is the part of the section that scrolls past while the
      // stage is pinned — its height less the one screen the stage occupies.
      const travel = r.height - window.innerHeight
      const p = travel > 0 ? Math.min(1, Math.max(0, -r.top / travel)) : 0
      el.style.setProperty('--p', p.toFixed(4))
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <section ref={ref} className={className} style={{ '--p': 0 }} {...rest}>
      {children}
    </section>
  )
}
