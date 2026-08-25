'use client'

/* ============================================================
   HeroScene — the torch reveal behind the hero.

   The photograph is laid across the whole section and then
   covered by a sheet painted in the page colour, so the hero
   looks perfectly ordinary until a pointer sweeps it. The
   pointer cuts a hole in that sheet: move the mouse and you
   light up whatever the camera is looking at underneath.

   The layer itself takes no pointer events — the buttons and
   links above it must stay clickable — so the listeners go on
   the hero section instead, and the beam is measured against
   that same box.

   The beam position updates straight from the pointer with no
   transition, so it tracks the cursor exactly; only the beam
   *radius* animates, on open and close. That needs @property,
   since a bare custom property cannot be transitioned.
   ============================================================ */

import { useEffect, useRef, useState } from 'react'

export function HeroScene({ src, alt }) {
  const ref = useRef(null)
  const [lit, setLit] = useState(false)
  /* Which driver the beam gets, decided after mount so the server and client
     markup stay identical. 'pointer' is the torch above; 'scroll' is the same
     reveal for a device that has no pointer to sweep with — the beam walks
     down the scene as the hero is scrolled away, so the photograph is still
     uncovered by something the reader is doing rather than on a timer. null
     means neither, and nothing renders — including the image request. */
  const [driver, setDriver] = useState(null)
  // True while a finger is sweeping the beam. The scroll driver checks it:
  // a drag outranks scroll position, or the two fight over the same two
  // custom properties and the beam jitters between them.
  const dragging = useRef(false)

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setDriver(hover ? 'pointer' : 'scroll')
  }, [])

  useEffect(() => {
    if (driver !== 'pointer') return
    const layer = ref.current
    const host = layer?.closest('.hero')
    if (!host) return

    let frame = 0
    const pos = { x: 0, y: 0 }

    const write = () => {
      frame = 0
      const r = host.getBoundingClientRect()
      layer.style.setProperty('--beam-x', `${((pos.x - r.left) / r.width) * 100}%`)
      layer.style.setProperty('--beam-y', `${((pos.y - r.top) / r.height) * 100}%`)
    }

    const move = (e) => {
      if (e.pointerType === 'touch') return // a tap is not a hover
      // Keep the newest position and write once per frame. Storing it rather
      // than acting on each event matters: a pointer emits several moves per
      // frame, and dropping the later ones leaves the beam a step behind.
      pos.x = e.clientX
      pos.y = e.clientY
      if (!frame) frame = requestAnimationFrame(write)
      // Light on movement, not on pointerenter. Enter only fires when the
      // pointer crosses into the section, so a cursor already sitting over
      // the hero at mount — a plain reload — would never switch it on.
      setLit(true)
    }
    const leave = () => setLit(false)

    host.addEventListener('pointermove', move, { passive: true })
    host.addEventListener('pointerleave', leave)
    return () => {
      cancelAnimationFrame(frame)
      host.removeEventListener('pointermove', move)
      host.removeEventListener('pointerleave', leave)
    }
  }, [driver])

  /* The scroll driver. The hero sits at the top of the document, so its own
     travel past the top edge is the whole of the range — measuring it against
     the viewport instead would start the beam half way down before a finger
     had touched anything. */
  useEffect(() => {
    if (driver !== 'scroll') return
    const layer = ref.current
    const host = layer?.closest('.hero')
    if (!host) return

    // Reduced motion keeps the reveal but not the travel: the scene is lit at
    // one fixed point, so nothing moves under a reader who asked for stillness.
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let frame = 0
    const write = () => {
      frame = 0
      if (dragging.current) return
      const r = host.getBoundingClientRect()
      const past = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height)))
      layer.style.setProperty('--beam-x', '50%')
      layer.style.setProperty('--beam-y', still ? '52%' : `${20 + past * 62}%`)
      // Lit while any of the hero is still on screen. Switching off as it
      // leaves means the sheet is closed again on the way back up, so the
      // reveal replays rather than being spent once.
      setLit(r.bottom > 0 && r.top < window.innerHeight)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(write)
    }
    write()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [driver])

  /* Hold the camera and drag to sweep the beam by hand. A touch device has no
     hover to light the scene with, and the scroll driver only ever walks the
     beam straight down — this hands the reader the same aiming a pointer gets,
     and the camera is the obvious thing to take hold of.

     The press has to be held first. A swipe that starts on the camera is far
     more likely to be someone scrolling the page, and stealing that would make
     the hero feel broken. Nothing has moved while the timer runs, so the
     browser has not begun a scroll either — which is the only moment
     touch-action can still be taken away in time for the drag to be ours. */
  useEffect(() => {
    if (driver !== 'scroll') return
    const layer = ref.current
    const host = layer?.closest('.hero')
    const grip = host?.querySelector('.hero-media-wrap')
    if (!layer || !host || !grip) return

    const HOLD_MS = 320
    const SLOP = 10 // a press that wanders this far was on its way to a scroll

    let timer = 0
    let pointerId = null
    let sx = 0
    let sy = 0

    // The beam is measured against the hero, not the camera: the finger can
    // leave the cutout and keep lighting the section it is dragged across.
    const aimAt = (x, y) => {
      const r = host.getBoundingClientRect()
      layer.style.setProperty('--beam-x', `${((x - r.left) / r.width) * 100}%`)
      layer.style.setProperty('--beam-y', `${((y - r.top) / r.height) * 100}%`)
    }

    const stop = () => {
      if (timer) {
        clearTimeout(timer)
        timer = 0
      }
      if (dragging.current) {
        dragging.current = false
        grip.classList.remove('is-gripped')
        if (pointerId !== null) {
          try { grip.releasePointerCapture(pointerId) } catch {}
        }
        // Hand the beam back to where the page is actually scrolled to, rather
        // than leaving it wherever the finger happened to lift.
        window.dispatchEvent(new Event('scroll'))
      }
      pointerId = null
    }

    const down = (e) => {
      if (e.pointerType === 'mouse') return
      pointerId = e.pointerId
      sx = e.clientX
      sy = e.clientY
      timer = window.setTimeout(() => {
        timer = 0
        dragging.current = true
        grip.classList.add('is-gripped')
        try { grip.setPointerCapture(pointerId) } catch {}
        aimAt(sx, sy)
        setLit(true)
      }, HOLD_MS)
    }

    const move = (e) => {
      if (dragging.current) {
        e.preventDefault() // the page must not scroll out from under the beam
        aimAt(e.clientX, e.clientY)
        return
      }
      if (timer && Math.hypot(e.clientX - sx, e.clientY - sy) > SLOP) {
        clearTimeout(timer)
        timer = 0
        pointerId = null
      }
    }

    grip.addEventListener('pointerdown', down)
    grip.addEventListener('pointermove', move, { passive: false })
    grip.addEventListener('pointerup', stop)
    grip.addEventListener('pointercancel', stop)
    window.addEventListener('blur', stop)
    return () => {
      stop()
      grip.removeEventListener('pointerdown', down)
      grip.removeEventListener('pointermove', move)
      grip.removeEventListener('pointerup', stop)
      grip.removeEventListener('pointercancel', stop)
      window.removeEventListener('blur', stop)
    }
  }, [driver])

  if (!driver) return null

  return (
    <div ref={ref} className={`hero-scene${lit ? ' is-lit' : ''}`}>
      <img className="hero-scene-img" src={src} alt={alt} width="2048" height="1152" />
      <span className="hero-scene-cover" />
      <span className="hero-scene-glow" />
    </div>
  )
}
