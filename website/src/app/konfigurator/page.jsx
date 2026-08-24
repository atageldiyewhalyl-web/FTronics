import { breadcrumbJsonLd, jsonLd } from '@/lib/site'
import { KonfiguratorForm } from './KonfiguratorForm'

/* The step state lives in a co-located client component, because a
   client component cannot export `metadata`. */

export const metadata = {
  /* `absolute` because the root layout's title template would otherwise
     append a second " | FT Sicherheitstechnik" to the verified title. */
  title: { absolute: 'Sicherheitssystem-Konfigurator | FT Sicherheitstechnik Mannheim' },
  description:
    'Konfigurieren Sie Ihr individuelles Sicherheitssystem online: Alarmanlagen, Videoüberwachung, Zutrittskontrolle. Kostenloses Angebot in Minuten. FT Sicherheitstechnik.',
  alternates: { canonical: '/konfigurator' },
}

const breadcrumb = breadcrumbJsonLd([
  { name: 'Startseite', href: '/' },
  { name: 'System-Konfigurator', href: '/konfigurator' },
])

export default function KonfiguratorPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumb)} />
      <KonfiguratorForm />
    </>
  )
}
