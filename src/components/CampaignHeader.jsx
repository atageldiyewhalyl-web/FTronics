import Image from 'next/image'
import Link from 'next/link'
import { site } from '@/lib/site'
import styles from './campaign-header.module.css'

export function CampaignHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" aria-label="FT Sicherheitstechnik: zur Startseite">
          <Image src="/logo-black.webp" alt="FT Sicherheitstechnik" width={800} height={164} sizes="(max-width: 767px) 178px, 225px" className={styles.logo} loading="eager" />
        </Link>
        <nav aria-label="Beratung und Kontakt" className={styles.contact}>
          <a href={site.phoneHref} className={styles.phone}><span>Persönlich in Mannheim</span>{site.phone}</a>
          <a href="#anfrage" className={styles.button}>Beratung anfragen</a>
        </nav>
      </div>
    </header>
  )
}
