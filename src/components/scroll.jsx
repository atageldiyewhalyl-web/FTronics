'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/* ============================================================
   Scroll patterns — React ports of the handoff's fx.js.
   Pattern C reveals · caption spy · pinned panel stack · counters.
   All respect prefers-reduced-motion as a hard gate.
   ============================================================ */

const reduced = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * ScrollFX — mount once per page. Wires reveals, the caption spy and
 * counters for everything currently in the document.
 */
export function ScrollFX() {
  // Keyed on the route: App Router keeps this component mounted across client-side
  // navigations, so an empty dep array would observe the first page's elements only
  // and every subsequent page would stay stuck at opacity 0.
  const pathname = usePathname()

  useEffect(() => {
    const revs = [...document.querySelectorAll('[data-rev]')]

    if (reduced()) {
      revs.forEach((e) => e.classList.add('is-in'))
      document.querySelectorAll('[data-spy]').forEach((e) => e.classList.add('spy-in'))
      document.querySelectorAll('[data-count]').forEach((e) => {
        e.textContent = e.dataset.count + (e.dataset.suffix || '')
      })
      return
    }

    // --- Pattern C: staggered reveals, 70ms, cap 6, fire once ---
    document.querySelectorAll('[data-rev-group]').forEach((g) => {
      ;[...g.querySelectorAll('[data-rev]')].forEach((el, i) => {
        el.style.transitionDelay = Math.min(i, 5) * 70 + 'ms'
      })
    })
    const revIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-in')
            revIO.unobserve(e.target)
          }
        }),
      { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    revs.forEach((el) => revIO.observe(el))

    // --- Caption spy: highlight the caption in the middle band ---
    const spies = [...document.querySelectorAll('[data-spy]')]
    const spyIO = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.classList.toggle('spy-in', e.isIntersecting)),
      { rootMargin: '-38% 0px -38% 0px' }
    )
    spies.forEach((el) => spyIO.observe(el))

    // --- Counters: expo-out count-up, once ---
    const counters = [...document.querySelectorAll('[data-count]')]
    const cIO = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          cIO.unobserve(e.target)
          const el = e.target
          const end = parseFloat(el.dataset.count)
          const suf = el.dataset.suffix || ''
          const t0 = performance.now()
          const step = (t) => {
            const p = Math.min(1, (t - t0) / 1100)
            el.textContent = Math.round(end * (1 - Math.pow(2, -10 * p))) + suf
            if (p < 1) requestAnimationFrame(step)
          }
          requestAnimationFrame(step)
        }),
      { threshold: 0.4 }
    )
    counters.forEach((el) => cIO.observe(el))

    return () => {
      revIO.disconnect()
      spyIO.disconnect()
      cIO.disconnect()
    }
  }, [pathname])

  return null
}

/**
 * PinStack — Pattern A. Container is (N+1) × 100vh; the stage is sticky and
 * the panels crossfade on scroll progress.
 * Collapses to a static vertical stack under reduced motion or ≤760px (CSS).
 */
export function PinStack({ panels, children }) {
  const stackRef = useRef(null)

  useEffect(() => {
    const stack = stackRef.current
    if (!stack) return

    /* The sequence runs everywhere now. It used to bail on a narrow screen —
       the panels were laid out on top of a full-bleed render there and the
       words had nowhere to go — but the phone layout puts the picture at the
       top and the words underneath it, so there is a frame to cross-fade and
       a place for the copy to be.

       Reduced motion keeps the sequence and loses the travel: the crossfade
       is opacity, which is not what the preference is about, while the copy's
       parallax lift is. Bailing out entirely used to leave five stacked
       panels and no beat at all. */
    const still = reduced()

    const els = [...stack.querySelectorAll('[data-panel]')]
    let raf = 0

    const update = () => {
      raf = 0
      const r = stack.getBoundingClientRect()
      const vh = window.innerHeight
      const prog = Math.min(1, Math.max(0, -r.top / (r.height - vh)))
      const n = els.length
      const pos = prog * n
      // The ramp below only has a crossfade to perform BETWEEN panels. At the
      // two ends there is no neighbouring frame to hand over to, so the outer
      // half-step was fading the first render down to .8 while the stack was
      // still only being approached — a washed-out building sliding up the
      // page — and dropping the last one back to .8 once it had been passed.
      // Holding the position at the first and last panel's own centre keeps
      // those two frames solid and leaves every crossfade in between exactly
      // as it was. It also agrees with the opacity:1 the first panel is
      // server-rendered with, so the driver no longer dims it on first paint.
      // The words are held with them. Left on the raw position they faded up
      // from nothing as the stack was still being approached — so the sequence
      // opened on a picture with no caption and the reader had to scroll to
      // find out it had one — and the last panel's words faded back out while
      // its picture stayed, which read as the section emptying rather than
      // ending. First and last are now solid at the ends; every crossfade
      // between them is unchanged.
      const holdPos = Math.min(n - 0.5, Math.max(0.5, pos))

      els.forEach((p, i) => {
        const d = Math.abs(holdPos - (i + 0.5))
        // The picture fades, not the panel. Fading the panel would make each one
        // a stacking context, which traps its copy inside it — and the scrim has
        // to sit between the pictures and the words, on the stage, so that there
        // is exactly one of it. Two panels mid-crossfade used to carry a scrim
        // each, and the pair of them stacked and dimmed the whole frame.
        const img = p.querySelector('[data-panel-img]')
        if (img) img.style.opacity = Math.min(1, Math.max(0, 1.6 - d * 1.6))
        p.style.pointerEvents = d < 0.5 ? 'auto' : 'none'
        // The lift goes on the copy, not on the panel. Panels cross-fade two at
        // a time, so translating the panel held the outgoing and incoming frames
        // up to 80px apart while both were visible — with a full-bleed render in
        // each, that reads as a doubled, ghosting building. Pinning the frame and
        // moving only the words keeps the parallax and lets the two renders lie
        // exactly on top of each other, so the equipment fades in on a building
        // that does not move.
        const copy = p.querySelector('[data-panel-copy]')
        if (copy) {
          copy.style.transform = still ? 'none' : `translateY(${(holdPos - (i + 0.5)) * -40}px)`
          // The words leave faster than the picture does. Two renders of the same
          // building can lie on top of each other and just look like equipment
          // fading in, but two different paragraphs cannot — overlapped they are
          // simply unreadable. Held at full strength while the panel is the one
          // being read, then dropped to nothing by the midpoint, so only one
          // block of copy is ever legible while the frames cross-fade behind it.
          copy.style.opacity = Math.min(1, Math.max(0, (0.5 - d) / 0.2))
        }
      })
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

  const n = panels?.length ?? 0

  return (
    <div className="pin-stack" ref={stackRef} style={{ height: `${(n + 1) * 100}vh` }}>
      <div className="pin-stage">
        {children}
        <span className="pin-swipe-cue" aria-hidden="true">
          <span className="ft-swipe-cue-mark">
            <span />
            <span />
          </span>
        </span>
      </div>
    </div>
  )
}

/* Chevron, not an arrow glyph. `←`/`→` are text: they take the font's metrics,
   sit off-centre in a round button, and are read out by a screen reader. Drawn
   as a mark instead, it centres on the button and scales with the icon size,
   and aria-label carries the meaning. */
export function Chevron({ back = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="15"
      height="15"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      style={back ? { transform: 'rotate(180deg)' } : undefined}
    >
      <path d="m9.5 5 7 7-7 7" />
    </svg>
  )
}

/** ScrollGallery — Pattern E. Snap rail with paddles and arrow-key support. */
/* `actions` puts a control of the rail's own choosing in the paddle row —
   a "see all" for a rail showing part of a set, say. It is ranged to the far
   left of the row while the arrows stay right, so it lines up with the first
   card rather than crowding the controls. Omitted by every other caller, and
   the row still appears for a rail that wants an action but no arrows. */
export function ScrollGallery({ itemWidth = 420, label = 'Galerie', paddles = true, actions, children }) {
  const ref = useRef(null)
  const by = (d) => ref.current?.scrollBy({ left: d * (itemWidth + 24), behavior: 'smooth' })

  return (
    /* Named so the paddles can be ordered against the rail without touching
       this markup. Inside .ft-splitrail it stays display:contents, so its two
       children go on being placed by that grid directly. */
    <div className="ft-rail">
      {(paddles || actions) && (
        <div className="ft-paddle-row">
          {actions && <div className="ft-paddle-actions">{actions}</div>}
          {paddles && (
            <>
              <button className="ft-paddle" aria-label="Zurück" onClick={() => by(-1)} type="button">
                <Chevron back />
              </button>
              <button className="ft-paddle" aria-label="Weiter" onClick={() => by(1)} type="button">
                <Chevron />
              </button>
            </>
          )}
        </div>
      )}
      <div
        ref={ref}
        className="ft-gallery"
        role="region"
        aria-label={label}
        tabIndex={0}
        style={{ '--ft-item-w': `${itemWidth}px` }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); by(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1) }
        }}
      >
        {children}
      </div>
    </div>
  )
}
