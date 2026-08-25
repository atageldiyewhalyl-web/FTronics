/* ============================================================
   HeroField — the detection field behind the hero.

   Concentric rings radiate from the camera standing at the foot
   of the section, and a few marks sit on those rings: a red dot
   under a slow halo, the way the FC-8D Pro flags something it
   has picked up.

   Every ring is the same hairline, drawn once. An earlier pass
   laid a darker arc over the ring at each detection, but
   overlapping strokes paint the pixel twice and that segment
   read as a thicker line.

   Purely decorative, so the layer is aria-hidden and never takes
   pointer events. Geometry lives in one square box with a
   0..100 viewBox, which keeps every ring a true circle at any
   viewport and lets the marks be placed with plain trig.
   ============================================================ */

/**
 * Ring radii in the viewBox's 0..100 units. The gaps widen outwards so the
 * inner rings stay tight around the camera while the outer ones run off the
 * sides of the frame; anything past 50 leaves the box, which the SVG allows.
 *
 * The whole sequence is bounded by what can actually appear: on a 1440px
 * viewport the furthest visible corner sits about 96 units from the centre,
 * so a ring added beyond that would render nothing. Fitting a seventh line
 * meant re-spacing rather than appending.
 */
const RINGS = [13, 20, 28, 38, 50, 65, 84]

/**
 * Detections. `a` is degrees clockwise from 3 o'clock, so 270 is straight up.
 *
 * Each mark is pushed out to one side to clear the centred text column, but
 * only so far: a mark on ring r reaches r * |cos a| from the centre, and the
 * narrowest viewport in this set's range leaves about 51 units of room. Past
 * that it falls off the edge, which is why the outer marks sit closer to
 * vertical than the inner ones.
 */
const MARKS = [
  // Wide screens: well out to the sides, flanking the centred text column.
  { at: 'wide', r: 65, a: 226, delay: 0 },
  { at: 'wide', r: 65, a: 314, delay: 0.6 },
  { at: 'wide', r: 50, a: 208, delay: 2.3 },
  { at: 'wide', r: 50, a: 332, delay: 1.1 },
  { at: 'wide', r: 38, a: 224, delay: 1.7 },
  { at: 'wide', r: 38, a: 316, delay: 2.9 },
  // Narrow screens: the field is far wider than the viewport, so anything out
  // to the side lands off-screen. These ride the inner rings by the camera.
  { at: 'compact', r: 28, a: 243, delay: 0 },
  { at: 'compact', r: 28, a: 297, delay: 1.4 },
  { at: 'compact', r: 13, a: 196, delay: 2.6 },
]

const rad = (deg) => (deg * Math.PI) / 180
const round = (n) => Math.round(n * 1000) / 1000

export function HeroField() {
  return (
    <div className="hero-field" aria-hidden="true">
      <div className="hero-field-glow" />

      <svg className="hero-field-rings" viewBox="0 0 100 100" focusable="false">
        {RINGS.map((r) => (
          <circle key={r} className="hero-ring" cx="50" cy="50" r={r} />
        ))}
      </svg>

      {MARKS.map(({ r, a, delay, at }, i) => {
        const x = round(50 + r * Math.cos(rad(a)))
        const y = round(50 + r * Math.sin(rad(a)))
        return (
          <span
            key={`mark-${i}`}
            className={`hero-mark hero-mark--${at}`}
            style={{ left: `${x}%`, top: `${y}%`, '--mark-delay': `${delay}s` }}
          >
            <i className="hero-mark-halo" />
            <i className="hero-mark-dot" />
          </span>
        )
      })}
    </div>
  )
}

/* ============================================================
   RingField — the same detection rings, reused as a section
   backdrop. The difference is the mark: in the hero a dot sits
   still on a ring and pulses, here it travels the ring.

   The dot is placed once at its radius and the whole layer is
   rotated, rather than animating the dot's own left/top: one
   composited transform on a parent instead of two layout
   properties changing every frame, so nothing reflows.

   Decorative, so aria-hidden and never interactive.
   ============================================================ */

/** Radius in viewBox units, seconds per lap, offset, and direction. */
const ORBITS = [
  { r: 28, dur: 34, delay: -6, reverse: false },
  { r: 50, dur: 52, delay: -22, reverse: true },
  { r: 84, dur: 78, delay: -40, reverse: false },
]

export function RingField() {
  return (
    <div className="ft-ringfield" aria-hidden="true">
      <svg className="ft-ringfield-rings" viewBox="0 0 100 100" focusable="false">
        {RINGS.map((r) => (
          <circle key={r} className="ft-ringfield-ring" cx="50" cy="50" r={r} />
        ))}
      </svg>

      {ORBITS.map(({ r, dur, delay, reverse }, i) => (
        <span
          key={`orbit-${i}`}
          className={`ft-ringfield-orbit${reverse ? ' ft-ringfield-orbit--rev' : ''}`}
          style={{ '--r': r, '--dur': `${dur}s`, '--delay': `${delay}s` }}
        >
          <i className="ft-ringfield-dot" />
        </span>
      ))}
    </div>
  )
}
