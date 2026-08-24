'use client'

import { useEffect, useRef } from 'react'

/**
 * ReadingProgress — the 3px signal-coloured bar pinned to the top of the
 * Ratgeber artboard ([data-progress]). Sits above the sticky NavBar
 * (z-index 60 vs. 50) and tracks document scroll, exactly as the
 * artboard's inline componentDidMount did.
 *
 * Decorative only, so it is hidden from assistive tech.
 */
export function ReadingProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let raf = 0
    const update = () => {
      raf = 0
      const h = document.documentElement.scrollHeight - window.innerHeight
      bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%'
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={barRef}
      data-progress=""
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0, height: 3,
        background: 'var(--ft-signal-500)', width: 0, zIndex: 60,
      }}
    />
  )
}
