'use client'

import { useEffect, useState } from 'react'

/* ============================================================
   Sticky Sprungmarken-Leiste — the only interactive part of the
   product detail page. The anchors work without JS; the observer
   just moves the active underline while the reader scrolls,
   exactly like the artboard's [data-tab] / [data-tabsec] pair.
   Kept as its own client island so the page stays a Server
   Component and can export metadata.
   ============================================================ */

const barStyle = {
  position: 'sticky',
  top: 72,
  zIndex: 40,
  background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  borderBottom: '1px solid var(--border)',
  marginTop: '2.5rem',
}

const tabStyle = {
  font: '500 13.5px var(--font-ui)',
  textDecoration: 'none',
  padding: '14px 2px',
  borderBottom: '2px solid transparent',
  whiteSpace: 'nowrap',
  transition: 'color var(--dur-2) var(--ease-out), border-color var(--dur-2) var(--ease-out)',
}

export function ProductTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0].id)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    tabs.forEach((t) => {
      const el = document.getElementById(t.id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [tabs])

  return (
    <nav style={barStyle} aria-label="Abschnitte">
      <div className="ft-shell" style={{ display: 'flex', gap: '1.6rem', overflowX: 'auto' }}>
        {tabs.map((t) => {
          const isActive = t.id === active
          return (
            <a
              key={t.id}
              href={`#${t.id}`}
              onClick={() => setActive(t.id)}
              aria-current={isActive ? 'true' : undefined}
              style={{
                ...tabStyle,
                color: isActive ? 'var(--fg)' : 'var(--fg-secondary)',
                borderBottomColor: isActive ? 'var(--ft-signal-500)' : 'transparent',
              }}
            >
              {t.label}
            </a>
          )
        })}
      </div>
    </nav>
  )
}
