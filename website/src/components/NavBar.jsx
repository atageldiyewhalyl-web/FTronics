'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { navItems, cta } from '@/lib/site'
import { Button } from './ui'

export function NavBar() {
  const pathname = usePathname()

  /* The bar is see-through while the hero is behind it and picks up its
     background once the next section arrives. Seeded from the route rather
     than from false, so the home page does not paint a solid bar for one
     frame before hydration corrects it. */
  const [overHero, setOverHero] = useState(pathname === '/')

  /* True while a section that declares itself dark is passing under the bar,
     which flips the bar to its light-on-dark set. Measured against a line just
     below the bar rather than with an observer per section: a section only
     counts while it actually spans that line, so entering and leaving are the
     same test and there is no state to keep in sync. */
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const hero = document.querySelector('.hero')
    if (!hero) {
      setOverHero(false)
      return
    }
    // Pull the root's top edge down by the height of the bar: the hero stops
    // intersecting exactly as its foot passes under it.
    const io = new IntersectionObserver(([entry]) => setOverHero(entry.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px',
      threshold: 0,
    })
    io.observe(hero)
    return () => io.disconnect()
  }, [pathname])

  useEffect(() => {
    const darks = [...document.querySelectorAll('[data-nav-dark]')]
    if (!darks.length) {
      setOverDark(false)
      return
    }
    const NAV_H = 72
    let raf = 0
    const update = () => {
      raf = 0
      setOverDark(
        darks.some((el) => {
          const r = el.getBoundingClientRect()
          return r.top <= NAV_H && r.bottom >= NAV_H
        })
      )
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <nav
      className={`ft-nav${overHero ? ' is-over-hero' : ''}${overDark ? ' is-over-dark' : ''}`}
      aria-label="Hauptnavigation"
    >
      <div className="ft-nav-inner">
        <Link className="ft-nav-brand" href="/" aria-label="FT Sicherheitstechnik: zur Startseite">
          {/*
            Both supplied lockups, stacked and crossfaded rather than swapped on
            one <img>: changing src would drop the painted logo for a frame
            while the other decodes, which reads as a flicker every time the bar
            passes a dark section. Only the ink-on-light one carries the alt —
            the white variant is the same mark, and announcing it twice would
            just repeat the company name.
          */}
          <span className="ft-nav-logo-wrap">
            <Image
              className="ft-nav-logo ft-nav-logo--ink"
              src="/logo-black.png"
              alt="FT Sicherheitstechnik: Beratung, Verkauf, Service, Schulung"
              width={800}
              height={164}
              priority
            />
            <Image
              className="ft-nav-logo ft-nav-logo--light"
              src="/logo.png"
              alt=""
              aria-hidden="true"
              width={800}
              height={164}
              priority
            />
          </span>
        </Link>

        <div className="ft-nav-links">
          {navItems.map((item) => (
            <Link
              key={item.href}
              className="ft-nav-link"
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
          <Button href="/kontakt" size="sm" style={{ marginLeft: 'var(--sp-2)' }}>
            Anfrage starten
          </Button>
        </div>
      </div>
    </nav>
  )
}
