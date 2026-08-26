'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Plan — a cutaway building with a ring on every system it carries.
 *
 * A pointer gets this for free in CSS: hover a ring, the card opens. A finger
 * does not — there is no hover to leave, so a card opened by a tap has to be
 * closable by one, which is what the state here is for. Tapping a ring opens
 * its card and pins it; the ✕, a tap outside, or Escape closes it. On a wide
 * screen the same click pins a card open, which is useful when the thing you
 * want is the link inside it.
 */
export function Plan({ systems, src, alt }) {
  const [open, setOpen] = useState(null)
  const ref = useRef(null)
  const rings = useRef([])

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(null) }
    // pointerdown rather than click: a card that closes on the press feels
    // attached to the finger, and it beats the link inside to the event only
    // when the press lands outside the plan entirely.
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setOpen(null) }
    document.addEventListener('keydown', onKey)
    document.addEventListener('pointerdown', onDown)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.removeEventListener('pointerdown', onDown)
    }
  }, [open])

  return (
    /* data-anyopen: once one card is pinned it is the only one, or a pointer
       resting on another ring opens a second beside it. */
    <figure className="ft-plan" data-rev ref={ref} data-anyopen={open !== null ? '' : undefined}>
      {/* The frame is exactly the picture's box, so a mark's percentage lands
          on the device it names. The figure itself is the section's full height
          on a wide screen, which the percentages would otherwise measure
          against. */}
      <div className="ft-plan-frame">
        <img className="ft-plan-img" src={src} alt={alt} />
        {systems.map((s, i) => (
          <div
            key={s.h}
            className={
              'ft-plan-mark' +
              (s.flipPop ? ' flip' : '') +
              (s.popBelow ? ' below' : '')
            }
            data-open={open === i ? '' : undefined}
            /* The mark draws no box of its own (display:contents). Its place on
               the plan travels as two custom properties instead, so the ring
               and the card are both positioned against the picture — which is
               what lets the card sit in the middle of the house rather than in
               the middle of the screen. */
            style={{ '--x': `${s.at[0]}%`, '--y': `${s.at[1]}%` }}
          >
            {/* The ring is the control: a finger has no hover, so it has to be
                something you can tap and tab to as well. Its label is the
                system's name — the card repeats it as a heading. */}
            <button
              type="button"
              ref={(el) => { rings.current[i] = el }}
              className="ft-plan-ring"
              aria-label={s.h}
              aria-expanded={open === i}
              onClick={() => setOpen(open === i ? null : i)}
            />
            <div className="ft-plan-pop">
              <button
                type="button"
                className="ft-plan-pop-x"
                aria-label="Schließen"
                onClick={() => { setOpen(null); rings.current[i]?.focus() }}
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true" focusable="false">
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
              <p className="ft-plan-pop-h">{s.h}</p>
              <ul className="ft-plan-pop-list">
                {s.li.map((x) => <li key={x}>{x}</li>)}
              </ul>
              <a className="ft-plan-pop-cta" href={s.href}>{s.label} →</a>
            </div>
          </div>
        ))}
      </div>
    </figure>
  )
}
