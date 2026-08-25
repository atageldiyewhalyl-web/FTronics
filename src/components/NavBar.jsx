'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { navItems } from '@/lib/site'
import { Button } from './ui'

/* Below this the links collapse into the sheet. Matches the @media in
   globals.css — the sheet is hidden by CSS above it, and this copy is what
   lets the component close a sheet that is left open across the boundary. */
const SHEET_MQ = '(max-width:900px)'

/** Chevron for a menu trigger. Rotates when its menu is open. */
function Caret() {
  return (
    <svg className="ft-nav-caret" viewBox="0 0 10 6" width="10" height="6" aria-hidden="true" focusable="false">
      <path d="M1 1.5 5 5 9 1.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

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

  /* Label of the open desktop submenu, or null. One value rather than a flag
     per item: only one menu is ever open, and opening a second must close the
     first without the two states having to agree. */
  const [openMenu, setOpenMenu] = useState(null)

  /* The mobile sheet. Separate from openMenu — the sheet lists every route
     including the submenu's, so the two never coexist. */
  const [sheetOpen, setSheetOpen] = useState(false)

  const menuRefs = useRef(new Map())
  const burgerRef = useRef(null)
  const sheetRef = useRef(null)

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

  /* Arriving somewhere is the end of navigating: both surfaces close on the
     route, not on the click, so a link that lands on the current page still
     puts them away. */
  useEffect(() => {
    setOpenMenu(null)
    setSheetOpen(false)
  }, [pathname])

  /* Escape closes whichever surface is open and hands focus back to the
     control that opened it, so keyboard users are not dropped at the top of
     the document. */
  useEffect(() => {
    if (!openMenu && !sheetOpen) return
    const onKey = (e) => {
      if (e.key !== 'Escape') return
      if (sheetOpen) {
        setSheetOpen(false)
        burgerRef.current?.focus()
      } else {
        const trigger = menuRefs.current.get(openMenu)
        setOpenMenu(null)
        trigger?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [openMenu, sheetOpen])

  /* A press anywhere off the open submenu dismisses it. On pointerdown rather
     than click so the menu is gone before the thing underneath reacts. */
  useEffect(() => {
    if (!openMenu) return
    const onDown = (e) => {
      if (!e.target.closest?.('.ft-nav-item--menu')) setOpenMenu(null)
    }
    document.addEventListener('pointerdown', onDown)
    return () => document.removeEventListener('pointerdown', onDown)
  }, [openMenu])

  /* The page behind the sheet must not scroll under it. The previous value is
     restored rather than cleared, so this cannot quietly take ownership of a
     property something else was already setting. */
  useEffect(() => {
    if (!sheetOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [sheetOpen])

  /* Widening past the breakpoint hides the sheet in CSS. Without this the
     scroll lock and the trap would survive that, leaving a desktop layout
     that cannot be scrolled. */
  useEffect(() => {
    if (!sheetOpen) return
    const mq = window.matchMedia(SHEET_MQ)
    const onChange = () => {
      if (!mq.matches) setSheetOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [sheetOpen])

  /* Focus moves into the sheet on open and is kept inside it while it is
     there — it covers the page, so tabbing to something underneath would put
     focus somewhere the viewer cannot see. The trigger is part of the cycle,
     which makes shift-Tab off the first link land on the control that opened
     the sheet rather than escaping it. */
  useEffect(() => {
    if (!sheetOpen) return
    const focusables = () => [
      burgerRef.current,
      ...(sheetRef.current?.querySelectorAll('a[href],button:not([disabled])') ?? []),
    ].filter(Boolean)

    focusables()[1]?.focus()

    const onKey = (e) => {
      if (e.key !== 'Tab') return
      const items = focusables()
      if (!items.length) return
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !items.includes(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [sheetOpen])

  const isActive = (href) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  /* A menu item has no href to test, so it reports itself current when any of
     the routes it collects is the one being shown. */
  const isGroupActive = (item) => (item.match ?? []).some((h) => pathname.startsWith(h))

  /* Hover opens the submenu, but only for a real pointer: on touch the same
     event fires just before the click that toggles it, which would open and
     close the menu in one tap. */
  const hoverOpen = useCallback((label) => (e) => {
    if (e.pointerType === 'mouse') setOpenMenu(label)
  }, [])
  const hoverClose = useCallback((e) => {
    if (e.pointerType === 'mouse') setOpenMenu(null)
  }, [])

  /* Down-arrow off the trigger is the standard way into a menu; it opens the
     submenu and lands on its first entry in one keystroke. */
  const onTriggerKey = (item) => (e) => {
    if (e.key !== 'ArrowDown') return
    e.preventDefault()
    setOpenMenu(item.label)
    requestAnimationFrame(() => {
      e.target.parentElement?.querySelector('.ft-nav-menu a')?.focus()
    })
  }

  /* Up and down walk the open submenu. Kept on the container so the handler
     does not have to be reattached per entry. */
  const onMenuKey = (e) => {
    if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return
    const links = [...e.currentTarget.querySelectorAll('a')]
    const i = links.indexOf(document.activeElement)
    if (i < 0) return
    e.preventDefault()
    const next = e.key === 'ArrowDown' ? i + 1 : i - 1
    links[(next + links.length) % links.length].focus()
  }

  return (
    <nav
      className={`ft-nav${overHero ? ' is-over-hero' : ''}${overDark ? ' is-over-dark' : ''}${sheetOpen ? ' is-sheet-open' : ''}`}
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
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="ft-nav-item ft-nav-item--menu"
                onPointerEnter={hoverOpen(item.label)}
                onPointerLeave={hoverClose}
              >
                <button
                  type="button"
                  className="ft-nav-link ft-nav-link--menu"
                  aria-expanded={openMenu === item.label}
                  aria-controls={`ft-menu-${item.label}`}
                  data-current={isGroupActive(item) ? 'true' : undefined}
                  onClick={() => setOpenMenu((o) => (o === item.label ? null : item.label))}
                  onKeyDown={onTriggerKey(item)}
                  ref={(el) => {
                    if (el) menuRefs.current.set(item.label, el)
                    else menuRefs.current.delete(item.label)
                  }}
                >
                  {item.label}
                  <Caret />
                </button>
                {/* Left mounted and hidden with visibility so it can fade both
                    ways, which display:none cannot do — and unlike opacity
                    alone, visibility still takes it out of the tab order and
                    out of the accessibility tree while it is closed. */}
                <div
                  className="ft-nav-menu"
                  id={`ft-menu-${item.label}`}
                  data-open={openMenu === item.label ? 'true' : undefined}
                  onKeyDown={onMenuKey}
                >
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      className="ft-nav-menu-link"
                      href={child.href}
                      aria-current={isActive(child.href) ? 'page' : undefined}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                className="ft-nav-link"
                href={item.href}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.label}
              </Link>
            )
          )}
          <Button href="/kontakt" size="sm" style={{ marginLeft: 'var(--sp-2)' }}>
            Anfrage starten
          </Button>
        </div>

        {/* The same two bars become the close mark, so the control never
            jumps or changes size between its states. */}
        <button
          type="button"
          ref={burgerRef}
          className="ft-nav-burger"
          aria-expanded={sheetOpen}
          aria-controls="ft-nav-sheet"
          aria-label={sheetOpen ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setSheetOpen((o) => !o)}
        >
          <span className="ft-burger-box" aria-hidden="true">
            <span />
            <span />
          </span>
        </button>
      </div>

      {/*
        Inside the bar and positioned against it, rather than fixed to the
        viewport. .ft-nav is sticky, so it is always the containing block for
        these two whatever else it is doing — where a fixed panel resolves
        against the initial containing block, which is not guaranteed to be
        the same width as the layout viewport the bar itself was laid out in.
        When the two disagree the panel is laid out wider than the screen and
        its right edge is simply cut off.
      */}
      <div
        className="ft-nav-scrim"
        data-open={sheetOpen ? 'true' : undefined}
        onClick={() => setSheetOpen(false)}
        aria-hidden="true"
      />
      <div
        id="ft-nav-sheet"
        ref={sheetRef}
        className="ft-nav-sheet"
        data-open={sheetOpen ? 'true' : undefined}
      >
        <ul className="ft-nav-sheet-list">
          {navItems.map((item) =>
            item.children ? (
              /* Both routes are shown outright rather than behind a second
                 tap: there are two of them, and a disclosure here would cost
                 an interaction to reveal what fits on screen anyway. */
              <li key={item.label}>
                <span className="ft-nav-sheet-label" id={`ft-sheet-${item.label}`}>
                  {item.label}
                </span>
                <ul className="ft-nav-sheet-sub" aria-labelledby={`ft-sheet-${item.label}`}>
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        className="ft-nav-sheet-link"
                        href={child.href}
                        aria-current={isActive(child.href) ? 'page' : undefined}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  className="ft-nav-sheet-link"
                  href={item.href}
                  aria-current={isActive(item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
        </ul>
        <Button href="/kontakt" className="ft-nav-sheet-cta">
          Anfrage starten
        </Button>
      </div>
    </nav>
  )
}
