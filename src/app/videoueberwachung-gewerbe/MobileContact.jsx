'use client'

import { useEffect, useState } from 'react'
import { site } from '@/lib/site'
import styles from './page.module.css'

export function MobileContact() {
  const [formVisible, setFormVisible] = useState(false)
  useEffect(() => {
    const form = document.getElementById('anfrage')
    if (!form) return
    const observer = new IntersectionObserver(([entry]) => setFormVisible(entry.isIntersecting))
    observer.observe(form)
    return () => observer.disconnect()
  }, [])
  return (
    <nav className={styles.mobileContact} aria-label="Direkter Kontakt" hidden={formVisible}>
      <a href={site.phoneHref}>Jetzt anrufen</a>
      <a className={styles.primary} href="#anfrage">Beratung anfragen <span aria-hidden="true">↗</span></a>
    </nav>
  )
}
