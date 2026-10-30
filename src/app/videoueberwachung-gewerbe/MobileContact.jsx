'use client'

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { site } from '@/lib/site'
import styles from './page.module.css'

export function MobileContact() {
  const contactRef = useRef(null)
  const [portalRoot, setPortalRoot] = useState(null)
  const [contactVisible, setContactVisible] = useState(false)
  useEffect(() => setPortalRoot(document.body), [])

  useEffect(() => {
    const contact = contactRef.current
    const form = document.getElementById('anfrage')
    const hero = document.getElementById('hero-actions')
    const final = document.getElementById('final-actions')
    const footer = document.querySelector('footer')
    if (!portalRoot || !contact || !form || !hero || !final) return
    const viewport = window.visualViewport
    const mobile = window.matchMedia('(max-width: 767px)')
    let heroPassed = false
    let formVisible = false
    let finalVisible = false
    let footerVisible = false
    let visible = false
    let frame = 0

    const syncVisibility = () => {
      const editing = document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')
      const next = mobile.matches && heroPassed && !formVisible && !finalVisible && !footerVisible && !editing && (!viewport || viewport.scale <= 1.05)
      if (next !== visible) {
        visible = next
        setContactVisible(next)
      }
    }

    const updatePosition = () => {
      if (mobile.matches) {
        // Document coordinates avoid Safari's stale position:fixed bottom
        // after its toolbar or keyboard changes the visible viewport.
        const bottom = viewport
          ? viewport.pageTop + viewport.height
          : window.scrollY + window.innerHeight
        contact.style.setProperty('--contact-bottom', `${bottom}px`)
      }
      syncVisibility()
    }
    const schedulePosition = () => {
      if (!frame) frame = requestAnimationFrame(() => {
        frame = 0
        updatePosition()
      })
    }

    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 68
        if (entry.target === form) formVisible = entry.isIntersecting
        if (entry.target === final) finalVisible = entry.isIntersecting
        if (entry.target === footer) footerVisible = entry.isIntersecting
      }
      updatePosition()
    }, { rootMargin: '-68px 0px 0px' })
    observer.observe(hero)
    observer.observe(form)
    observer.observe(final)
    if (footer) observer.observe(footer)
    window.addEventListener('scroll', schedulePosition, { passive: true })
    window.addEventListener('resize', schedulePosition)
    window.addEventListener('pageshow', schedulePosition)
    viewport?.addEventListener('scroll', schedulePosition, { passive: true })
    viewport?.addEventListener('resize', schedulePosition)
    document.addEventListener('focusin', schedulePosition)
    document.addEventListener('focusout', schedulePosition)
    mobile.addEventListener('change', schedulePosition)
    updatePosition()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', schedulePosition)
      window.removeEventListener('resize', schedulePosition)
      window.removeEventListener('pageshow', schedulePosition)
      viewport?.removeEventListener('scroll', schedulePosition)
      viewport?.removeEventListener('resize', schedulePosition)
      document.removeEventListener('focusin', schedulePosition)
      document.removeEventListener('focusout', schedulePosition)
      mobile.removeEventListener('change', schedulePosition)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [portalRoot])

  if (!portalRoot) return null
  return createPortal(
    <nav ref={contactRef} className={`${styles.page} ${styles.mobileContact}`} aria-label="Direkter Kontakt" hidden={!contactVisible}>
      <a href={site.phoneHref}>Jetzt anrufen</a>
      <a className={styles.primary} href="#anfrage">Beratung anfragen <span aria-hidden="true">↗</span></a>
    </nav>,
    portalRoot,
  )
}
