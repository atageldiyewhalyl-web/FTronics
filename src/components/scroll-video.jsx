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
     public/camera-video-hq.webm is encoded with every frame a
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
export function ScrollVideo({ src, label, stickyTop = 96, ratio = '854 / 480', fill = false, onProgress, reducedStops }) {
  const wrapRef = useRef(null)
  const videoRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [videoSrc, setVideoSrc] = useState('')
  const [top, setTop] = useState(stickyTop)
  // Held in a ref so a new callback identity never re-binds the scroll listener.
  const onProgressRef = useRef(onProgress)
  onProgressRef.current = onProgress

  useEffect(() => {
    let cancelled = false
    let objectUrl = ''
    const controller = new AbortController()

    setReady(false)
    setVideoSrc('')

    const fallback = () => {
      if (!cancelled) setVideoSrc(src)
    }

    if (!src || src.startsWith('blob:') || typeof fetch !== 'function' || typeof URL === 'undefined') {
      fallback()
      return () => {
        cancelled = true
        controller.abort()
      }
    }

    /* Production occasionally gives the video element a slow or awkward range
       request on first page load. The clip is tiny and meant to be scrubbed,
       so fetching it once into memory makes every later seek local. */
    fetch(src, { cache: 'force-cache', signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`)
        return response.blob()
      })
      .then((blob) => {
        if (cancelled) return
        objectUrl = URL.createObjectURL(blob)
        setVideoSrc(objectUrl)
      })
      .catch((error) => {
        if (error?.name !== 'AbortError') fallback()
      })

    return () => {
      cancelled = true
      controller.abort()
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [src])

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
    if (!wrap || !video || !track || !videoSrc) return

    /* Reduced motion must not switch the section off. Bailing out here used
       to kill the progress callbacks along with the seeks, and the captions
       ride on those callbacks — so a reader with the setting got the pinned
       stage, a frozen first frame, and two screens of scroll during which
       nothing happened at all. The preference asks for less motion, not less
       content: the captions still arrive (their entry is already a plain fade
       under the same media query), and the clip steps between still frames —
       one per caption beat — instead of playing scrubbed motion. */
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    // 0 joins whatever beats are handed in: the caption stops begin a third
    // of the way through the clip, and without it the section would open on
    // a camera already coming apart rather than on the closed one.
    const stops = reducedStops?.length ? [0, ...reducedStops] : [0, 0.25, 0.5, 0.75, 1]

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
      // Under reduced motion the clip snaps to the nearest beat, so the reader
      // sees a sequence of stills rather than footage running under the thumb.
      const pos = still
        ? stops.reduce((a, b) => (Math.abs(b - want) < Math.abs(a - want) ? b : a))
        : want
      const t = pos * duration
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

    /* WebKit will not paint a seeked frame on a video that has never played.
       It accepts the currentTime, fires `seeked`, reports the new position —
       and leaves the element showing its first frame. That is the whole of
       this bug: on iOS the teardown sat on the assembled camera while the
       captions and the pinning worked perfectly, and Chrome, which repaints a
       seek on an idle element, scrubbed it normally.

       A muted inline play, paused as soon as it starts, gives the decoder the
       state it wants. Nothing is seen and nothing is heard: the element is
       already showing this frame, and the seek that follows puts it back
       wherever the scroll says. */
    let primed = false
    const settle = () => {
      primed = true
      video.pause()
      window.removeEventListener('touchstart', prime)
      apply() // put the picture back where the scroll wants it
    }
    const prime = () => {
      if (primed) return
      const p = video.play()
      // Older WebKit returns nothing from play(); there is no promise to wait
      // on, and the element is already playing by the time this line runs.
      if (!p || typeof p.then !== 'function') return settle()
      p.then(settle).catch(() => {
        /* Low Power Mode refuses a play no gesture asked for. `primed` stays
           false so the touch listener, which is a gesture, can try again. */
      })
    }

    let loadRetry = 0
    let retryTimer = 0
    const start = () => {
      setReady(true)
      onScroll()
    }
    const kick = () => {
      if (video.networkState === HTMLMediaElement.NETWORK_EMPTY) video.load()
      if (video.readyState >= 1) start()
      if (video.readyState >= 3) prime()
      if (video.readyState < 2 && loadRetry < 4) {
        loadRetry += 1
        retryTimer = window.setTimeout(kick, 250 * loadRetry)
      }
    }
    const onVisibility = () => {
      if (document.visibilityState === 'visible') kick()
    }

    video.addEventListener('seeked', onSeeked)
    video.addEventListener('loadedmetadata', start)
    video.addEventListener('loadeddata', start)
    // canplay, not loadedmetadata: at metadata there may be no frame to decode
    // yet and the play() would resolve into nothing worth pausing.
    video.addEventListener('canplay', prime)
    window.addEventListener('pageshow', kick)
    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('touchstart', prime, { passive: true })
    kick()

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(retryTimer)
      video.removeEventListener('seeked', onSeeked)
      video.removeEventListener('loadedmetadata', start)
      video.removeEventListener('loadeddata', start)
      video.removeEventListener('canplay', prime)
      window.removeEventListener('pageshow', kick)
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('touchstart', prime)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
    // `top` moves only on resize, so re-binding here costs nothing and keeps
    // the progress maths and the sticky offset from drifting apart.
  }, [top, fill, videoSrc])

  return (
    <div
      ref={wrapRef}
      className={`ft-scrollvideo${fill ? ' ft-scrollvideo--fill' : ''}${ready ? ' is-ready' : ''}`}
      style={fill ? undefined : { position: 'sticky', top, aspectRatio: ratio }}
    >
      <video
        ref={videoRef}
        className="ft-scrollvideo-el"
        src={videoSrc || undefined}
        preload="auto"
        muted
        playsInline
        // Never played, only sought: no controls, and no autoplay to fight.
        aria-label={label}
      />
    </div>
  )
}
