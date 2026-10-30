'use client'

import { useEffect, useState } from 'react'
import { site } from '@/lib/site'
import styles from './page.module.css'

export function MobileContact() {
  const [contactVisible, setContactVisible] = useState(false)
  useEffect(() => {
    const form = document.getElementById('anfrage')
    const hero = document.getElementById('hero-actions')
    const final = document.getElementById('final-actions')
    if (!form || !hero || !final) return
    let heroPassed = false
    let formVisible = false
    let finalVisible = false
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.target === hero) heroPassed = !entry.isIntersecting && entry.boundingClientRect.bottom <= 68
        if (entry.target === form) formVisible = entry.isIntersecting
        if (entry.target === final) finalVisible = entry.isIntersecting
      }
      setContactVisible(heroPassed && !formVisible && !finalVisible)
    }, { rootMargin: '-68px 0px 0px' })
    observer.observe(hero)
    observer.observe(form)
    observer.observe(final)
    return () => observer.disconnect()
  }, [])
  return (
    <nav className={styles.mobileContact} aria-label="Direkter Kontakt" hidden={!contactVisible}>
      <a href={site.phoneHref}>Jetzt anrufen</a>
      <a className={styles.primary} href="#anfrage">Beratung anfragen <span aria-hidden="true">↗</span></a>
    </nav>
  )
}
