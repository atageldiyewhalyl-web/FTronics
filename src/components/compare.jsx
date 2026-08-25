'use client'

import { useState } from 'react'

/**
 * Compare — two photographs of the same frame, one revealed over the other by
 * a draggable divider. Used for the day/night sensor comparison.
 *
 * The control is a real <input type="range"> laid over the picture at full
 * size and made invisible. A div with pointer handlers would have been fewer
 * lines, but it would only work for a mouse: the range gives keyboard arrows,
 * Home/End, touch dragging and a screen-reader announcement for free, and it
 * is the one native control whose semantics — a value between two ends — is
 * exactly what this is.
 */
export function Compare({ before, after, beforeAlt, afterAlt, beforeLabel, afterLabel, ratio = '4 / 3' }) {
  const [pos, setPos] = useState(50)

  return (
    <figure className="ft-compare" style={{ '--pos': `${pos}%`, aspectRatio: ratio }}>
      {/* The "after" state sits underneath and is what the divider wipes to. */}
      <img className="ft-compare-img" src={after} alt={afterAlt} loading="lazy" decoding="async" />
      {/* The "before" state is clipped to the divider position. aria-hidden and
          an empty alt: both frames show the same place, so a reader that hears
          the one underneath described has already been told what this is. */}
      <img
        className="ft-compare-img ft-compare-img--clip"
        src={before}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
      />

      {/* The input comes before the divider on purpose: it is invisible, so
          focus has to be shown on the grip instead, and the sibling selector
          that does that can only reach forwards. Stacking is handled by
          z-index, not by document order. */}
      <input
        className="ft-compare-range"
        type="range"
        min="0"
        max="100"
        step="1"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`${beforeLabel} gegen ${afterLabel} vergleichen`}
        aria-valuetext={`${pos}% ${beforeLabel}`}
      />

      <span className="ft-compare-divider" aria-hidden="true">
        <span className="ft-compare-grip">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 4L3 9l4 5M11 4l4 5-4 5" />
          </svg>
        </span>
      </span>

      <span className="ft-compare-tag ft-compare-tag--before">{beforeLabel}</span>
      <span className="ft-compare-tag ft-compare-tag--after">{afterLabel}</span>

      <figcaption className="ft-vh">
        Vergleich derselben Szene: {beforeAlt} — {afterAlt}
      </figcaption>
    </figure>
  )
}
