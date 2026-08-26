'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Chevron } from '@/components/scroll'

/**
 * FeatureBento — the four-claim proof block under the product header.
 *
 * A wide screen keeps the bento: tiles sized by what each has to show, with
 * the words set over the picture. A phone cannot hold that. Stacked, the four
 * tiles become four full-height photographs to scroll past, and the copy lies
 * over the one thing each tile exists to show — on the night shot it covers
 * the lit IR ring. So on a phone the same tiles turn into a rail: the picture
 * keeps the head of the card, the copy moves out from under it onto solid
 * ground, and the next tile is left peeking past the screen edge so the row
 * reads as something to swipe rather than a card that happens to be cut off.
 *
 * The grid/rail switch is CSS (see "Feature bento" in globals.css). This
 * component exists for the paddles, which need to measure the rail.
 */
export function FeatureBento({ items, label = 'Produktmerkmale' }) {
  const railRef = useRef(null)
  /* scrollable is false on a wide screen, where the tiles are a grid and there
     is nothing to scroll: it keeps the rail out of the tab order there. */
  const [rail, setRail] = useState({ scrollable: false, atStart: true, atEnd: true })

  const sync = useCallback(() => {
    const el = railRef.current
    if (!el) return
    const max = el.scrollWidth - el.clientWidth
    setRail({ scrollable: max > 1, atStart: el.scrollLeft <= 1, atEnd: el.scrollLeft >= max - 1 })
  }, [])

  useEffect(() => {
    const el = railRef.current
    if (!el) return
    sync()
    el.addEventListener('scroll', sync, { passive: true })
    // Catches the grid/rail switch itself: at 760px the tiles stop being a grid
    // and the rail becomes scrollable, which no scroll event announces.
    const ro = new ResizeObserver(sync)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', sync)
      ro.disconnect()
    }
  }, [sync])

  const by = (dir) => {
    const el = railRef.current
    if (!el) return
    // One tile and its gap, measured off the tiles rather than assumed from a
    // width the CSS is free to change.
    const tiles = el.children
    const step = tiles.length > 1 ? tiles[1].offsetLeft - tiles[0].offsetLeft : el.clientWidth
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: dir * step, behavior: still ? 'auto' : 'smooth' })
  }

  return (
    /* .ft-rail carries the phone rule that puts the paddles under the rail and
       centres them — the same treatment the scroll galleries get. */
    <div className="ft-rail ft-bento-rail">
      <div
        ref={railRef}
        className="ft-bento"
        data-rev-group
        role="region"
        aria-label={label}
        tabIndex={rail.scrollable ? 0 : undefined}
        onKeyDown={(e) => {
          if (!rail.scrollable) return
          if (e.key === 'ArrowRight') { e.preventDefault(); by(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); by(-1) }
        }}
      >
        {/* --framed marks the tiles that have a picture. On a phone those are the
            ones whose words come out from under it; the ones with no picture stay
            the panel they already are. */}
        {items.map((item) => (
          <div
            data-rev
            key={item.h}
            className={
              `ft-bento-tile ft-bento-tile--${item.kind}` +
              (item.tall ? ' ft-bento-tile--tall' : '') +
              (item.wide ? ' ft-bento-tile--wide' : '') +
              (item.img ? ' ft-bento-tile--framed' : '')
            }
          >
            {/* `pos` is the tile's own crop anchor. A tall tile is far taller
                than the 16:9 scenes these are, so cover throws most of the
                width away and the centred default can drop the camera clean
                out of frame — which is what it did here. Per item rather than
                per tile class: each photograph puts its subject somewhere
                different, and nothing else should move because one did. */}
            {item.img ? (
              <img
                className="ft-bento-img"
                src={item.img}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                style={item.pos ? { objectPosition: item.pos } : undefined}
              />
            ) : null}
            <h3>{item.h}</h3>
            <p>{item.p}</p>
          </div>
        ))}
      </div>
      <div className="ft-paddle-row">
        <button className="ft-paddle" type="button" aria-label="Zurück" disabled={rail.atStart} onClick={() => by(-1)}>
          <Chevron back />
        </button>
        <button className="ft-paddle" type="button" aria-label="Weiter" disabled={rail.atEnd} onClick={() => by(1)}>
          <Chevron />
        </button>
      </div>
    </div>
  )
}
