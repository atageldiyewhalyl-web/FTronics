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

export function HeroScene({ src, srcMobile, alt }) {
  const ref = useRef(null)
  const [lit, setLit] = useState(false)
  /* Which driver the beam gets, decided after mount so the server and client
     markup stay identical. 'pointer' is the torch above; 'drag' is the same
     torch for a device with no pointer to sweep with, aimed by a finger. Both
     leave the scene covered until the reader does something — the hero reads
     as perfectly ordinary until then, which is the whole trick. null means
     neither, and nothing renders — including the image request. */
  const [driver, setDriver] = useState(null)

  useEffect(() => {
    const hover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setDriver(hover ? 'pointer' : 'drag')
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

  /* The torch handle. A visible ring over the camera that the reader takes
     hold of and moves; the beam goes where it goes.

     A handle rather than the camera itself, because the camera is a large
     target near the top of the page and taking touch-action from it means
     taking scrolling from it. That forced a hold-timer, and a hold-timer
     races the platform: the OS wants the same press for its own menu, and
     whichever wins, one of them is wrong. The handle is small enough to own
     touch-action outright, so the gesture is never the scroller's to lose —
     no timer, no race, and the ring says the gesture is there at all. */
  useEffect(() => {
    if (driver !== 'drag') return
    const layer = ref.current
    const host = layer?.closest('.hero')
    const knob = host?.querySelector('.hero-torch')
    if (!layer || !host || !knob) return

    let active = false
    let pointerId = null
    let sx = 0
    let sy = 0

    // The beam is measured against the hero, so the handle can be carried off
    // the camera and keep lighting whatever it is dragged across.
    const aimAt = (x, y) => {
      const r = host.getBoundingClientRect()
      layer.style.setProperty('--beam-x', `${((x - r.left) / r.width) * 100}%`)
      layer.style.setProperty('--beam-y', `${((y - r.top) / r.height) * 100}%`)
    }

    const home = () => {
      knob.style.setProperty('--tx', '0px')
      knob.style.setProperty('--ty', '0px')
    }

    const down = (e) => {
      active = true
      pointerId = e.pointerId
      sx = e.clientX
      sy = e.clientY
      try { knob.setPointerCapture(pointerId) } catch {}
      knob.classList.add('is-held')
      // Nothing else on the page moves while the handle is being carried —
      // including a second finger, which pointer capture alone would not stop.
      document.documentElement.classList.add('ft-torch-lock')
      aimAt(e.clientX, e.clientY)
      setLit(true)
    }

    const move = (e) => {
      if (!active) return
      e.preventDefault()
      knob.style.setProperty('--tx', `${e.clientX - sx}px`)
      knob.style.setProperty('--ty', `${e.clientY - sy}px`)
      aimAt(e.clientX, e.clientY)
    }

    const stop = () => {
      if (!active) return
      active = false
      if (pointerId !== null) {
        try { knob.releasePointerCapture(pointerId) } catch {}
      }
      pointerId = null
      knob.classList.remove('is-held')
      document.documentElement.classList.remove('ft-torch-lock')
      // The handle rides back to the camera and the sheet closes behind it.
      home()
      setLit(false)
    }

    const menu = (e) => e.preventDefault()

    knob.addEventListener('pointerdown', down)
    knob.addEventListener('pointermove', move, { passive: false })
    knob.addEventListener('pointerup', stop)
    knob.addEventListener('pointercancel', stop)
    knob.addEventListener('contextmenu', menu)
    window.addEventListener('blur', stop)
    return () => {
      stop()
      knob.removeEventListener('pointerdown', down)
      knob.removeEventListener('pointermove', move)
      knob.removeEventListener('pointerup', stop)
      knob.removeEventListener('pointercancel', stop)
      knob.removeEventListener('contextmenu', menu)
      window.removeEventListener('blur', stop)
    }
  }, [driver])

  if (!driver) return null

  return (
    <div ref={ref} className={`hero-scene${lit ? ' is-lit' : ''}`}>
      {/* A phone shows a narrow upright slice of this frame — object-fit:cover
          crops a 16:9 photograph hard against a portrait box, and everything
          either side of that slice is decoded and thrown away. The mobile
          source is that slice and nothing else, so it costs a fifth as much
          while painting the same pixels at the same scale. No width/height on
          the <img> here: the two sources have different intrinsic sizes, and a
          fixed pair would give the wrong aspect to whichever one lost. */}
      <picture>
        {srcMobile && <source media="(max-width:600px)" srcSet={srcMobile} type="image/webp" />}
        <img className="hero-scene-img" src={src} alt={alt} />
      </picture>
      <span className="hero-scene-cover" />
      <span className="hero-scene-glow" />
    </div>
  )
}
