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
  // Nothing here works without a hover, and the photograph is a few hundred
  // kilobytes, so a touch device should not fetch it at all. Deciding after
  // mount keeps the server and client markup identical.
  const [canHover, setCanHover] = useState(false)

  useEffect(() => {
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches)
  }, [])

  useEffect(() => {
    if (!canHover) return
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
  }, [canHover])

  if (!canHover) return null

  return (
    <div ref={ref} className={`hero-scene${lit ? ' is-lit' : ''}`}>
      <img className="hero-scene-img" src={src} alt={alt} width="2048" height="1152" />
      <span className="hero-scene-cover" />
      <span className="hero-scene-glow" />
    </div>
  )
}
