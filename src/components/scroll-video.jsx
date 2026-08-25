'use client'

/* ============================================================
   ScrollVideo — the scroll bar becomes the transport.

   The clip never plays on its own. It sits sticky beside the
   captions and its currentTime is driven by how far the reader
   has scrolled through the block, so scrolling is scrubbing.

   Two things make that smooth rather than stuttery:

   · The file must carry dense keyframes. Seeking lands on the
     nearest one and decodes forward from there, so a clip with a
     single keyframe re-decodes from the top on every frame.
     public/camera-video.mp4 is encoded with every frame a
     keyframe for exactly this.
   · Seeks are issued once per animation frame, and skipped while
     an earlier seek is still in flight. Firing one per scroll
     event queues work the decoder cannot keep up with, and the
     picture falls behind the scroll.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'

// The clip is 854x480. Boxing it at 4/5 the way the old product shot was
// letterboxed it badly: `contain` shrank it to the box width and left deep
// empty bands above and below. The frame matches the footage instead.
export function ScrollVideo({ src, label, stickyTop = 96, ratio = '854 / 480', fill = false, onProgress }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [top, setTop] = useState(stickyTop)
  // Held in a ref so a new callback identity never re-binds the scroll listener.
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  /*
   * Park the clip in the middle of the screen rather than up under the bar.
   * The offset is measured rather than just giving the sticky box the full
   * viewport height: that would centre it too, but the scrub range is the
   * track minus the box, so a taller box means the whole clip races past in a
   * fraction of the scroll. Keeping the box the size of the picture and
   * pushing it down with `top` centres it and leaves the range alone.
   */
  useEffect(() => {
    if (fill) {
      setTop(0) // a background pins to the top of the screen, not to its middle
      return
    }
    const measure = () => {
      const h = wrapRef.current?.offsetHeight || 0
      setTop(Math.max(stickyTop, Math.round((window.innerHeight - h) / 2)))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [stickyTop, ready, fill])

  useEffect(() => {
    const wrap = wrapRef.current
    const video = videoRef.current
    // The sticky column's parent is the run of scroll the clip maps onto.
    const track = wrap?.closest('[data-scrollvideo-track]') || wrap?.parentElement?.parentElement
    if (!wrap || !video || !track) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    let want = 0

    /* Asks the element whether it is busy rather than tracking that here.
       A flag set before the seek and cleared by the `seeked` event is only
       as reliable as the event: seek into a range the decoder has not
       buffered, or issue one that supersedes another in flight, and the
       event may never arrive — leaving the flag stranded true and every
       later frame returning early. The clip then freezes on whatever it was
       last showing, which is a stall the further you are from the file. */
    const apply = () => {
      frame = 0
      const duration = video.duration
      if (!duration || Number.isNaN(duration)) return
      const t = want * duration
      if (Math.abs(video.currentTime - t) < 1 / 60) return
      if (video.seeking) {
        // Busy: come back next frame rather than dropping this position. The
        // loop ends as soon as the picture agrees with the scroll.
        frame = requestAnimationFrame(apply)
        return
      }
      video.currentTime = t
    }

    const onScroll = () => {
      const r = track.getBoundingClientRect()
      // 0 as the block reaches the sticky offset, 1 as its foot clears it.
      // In fill mode the pinned box is the stage around the clip, not the clip
      // itself; the run of scroll is the track minus whatever is pinned.
      const pinned = fill ? wrap.parentElement || wrap : wrap
      const total = r.height - pinned.offsetHeight
      want = total > 0 ? Math.min(1, Math.max(0, (top - r.top) / total)) : 0
      onProgressRef.current?.(want)
      if (!frame) frame = requestAnimationFrame(apply)
    }

    // The scroll may have moved on while that seek was in flight; picking it
    // up here saves a frame over waiting for the next scroll event.
    const onSeeked = () => {
      if (!frame) frame = requestAnimationFrame(apply)
    }

    const start = () => {
      setReady(true)
      onScroll()
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', start)
    if (video.readyState >= 1) start()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', start)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // `top` moves only on resize, so re-binding here costs nothing and keeps
    // the progress maths and the sticky offset from drifting apart.
  }, [top, fill])

  return (
    <div
      ref={wrapRef}
      className={`ft-scrollvideo${fill ? ' ft-scrollvideo--fill' : ''}${ready ? ' is-ready' : ''}`}
      style={fill ? undefined : { position: 'sticky', top, aspectRatio: ratio }}
    >
      <video
        ref={videoRef}
        className="ft-scrollvideo-el"
        src={src}
        preload="auto"
        muted
        playsInline
        // Never played, only sought: no controls, and no autoplay to fight.
        aria-label={label}
      />
    </div>
  )
}
