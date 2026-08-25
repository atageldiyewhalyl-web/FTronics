'use client'

/* ============================================================
   Teardown — the FC-8D Pro section.

   The clip is the section's ground and the scroll scrubs it. The
   captions are tied to the clip's own timeline rather than to
   their position on the page, so each one arrives on the beat it
   describes: nothing is said while the camera is still closed,
   and the first line waits for the parts to separate.

   One caption is on screen at a time. The whole section is a
   client component because the scrub position has to reach both
   the video behind the copy and the copy above it, and those sit
   in different parents.
   ============================================================ */

import { useState } from 'react'
import { SectionHead, Button } from './ui'
import { markFor } from './spec-marks'
import { ScrollVideo } from './scroll-video'

/**
 * Where each caption belongs on the clip's timeline, read off the footage:
 * the camera is whole for roughly the first third, comes apart over the next
 * beat, then the parts turn while separated. A caption holds the screen from
 * its own stop until the next one arrives.
 */
const STOPS = [0.3, 0.44, 0.58, 0.72, 0.86]

/**
 * The window on the clip where the parts are separated — the span the default
 * stops occupy. A section with a different number of captions spreads them
 * evenly across the same window rather than over the whole clip, so nothing is
 * said while the camera is still closed.
 */
const WINDOW = [STOPS[0], STOPS[STOPS.length - 1]]
const spread = (n) =>
  n === STOPS.length
    ? STOPS
    : Array.from({ length: n }, (_, i) =>
        n === 1 ? WINDOW[0] : WINDOW[0] + ((WINDOW[1] - WINDOW[0]) * i) / (n - 1)
      )

export function Teardown({ captions, ctaHref, ctaLabel, head, src = '/camera-video.mp4', stops }) {
  const [progress, setProgress] = useState(0)

  const marks = stops || spread(captions.length)
  const activeIndex = marks.reduce((found, stop, i) => (progress >= stop ? i : found), -1)

  return (
    <section className="ft-section ft-section--raised ft-teardown-section">
      <div className="ft-shell">
        {/* Centred: the block below it is centred too, and a left-ranged
            header over a centred picture read as a mistake. */}
        <SectionHead className="ft-center" eyebrow={head.eyebrow} title={head.title} lead={head.lead} />
        {/* The clip lives inside the track rather than beside it, so it starts
            below the header instead of pinning from the top of the section and
            taking the description with it. Clip and copy share one grid cell,
            which is what stacks them. */}
        <div className="ft-teardown" data-scrollvideo-track>
          <div className="ft-teardown-stage">
          <ScrollVideo
            fill
            src={src}
            label={head.mediaLabel}
            onProgress={setProgress}
          />
          <div className="ft-teardown-copy">
            {captions.map(([h, p, chips], i) => (
              <div className={`ft-teardown-step${i === activeIndex ? ' is-on' : ''}`} key={h}>
                <h3>{h}</h3>
                <p style={{ color: 'var(--fg-secondary)' }}>{p}</p>
                {/* Optional: a caption that has specs to show gets them here,
                    so a section using this does not have to give them up. */}
                {chips?.length ? (
                  <ul className="ft-teardown-specs">
                    {chips.map((x) => (
                      <li className="ft-spec" key={x}>{markFor(x)}{x}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            <div className="ft-teardown-cta">
              <Button variant="quiet" href={ctaHref}>{ctaLabel}</Button>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  )
}
