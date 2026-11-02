'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { site, legalLinks } from '@/lib/site'
import { campaignRoutes } from '@/lib/campaigns'
import { PrivacySettingsButton } from './PrivacySettingsButton'
import styles from './campaign-footer.module.css'

export function CampaignFooter({ children }) {
  const pathname = usePathname()
  if (!campaignRoutes.includes(pathname)) return children
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.business}><strong>{site.name}</strong><a href={`mailto:${site.email}`}>{site.email}</a><span>© {new Date().getFullYear()} FT Sicherheitstechnik</span></div>
        <nav aria-label="Rechtliches" className={styles.legal}>{legalLinks.map(link => <Link href={link.href} key={link.href}>{link.label}</Link>)}<PrivacySettingsButton /></nav>
      </div>
    </footer>
  )
}
