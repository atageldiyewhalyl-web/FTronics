import { site } from '@/lib/site'

export const metadata = {
  title: 'Impressum',
  description: 'Impressum der FT Sicherheitstechnik Mannheim, Angaben gemäß § 5 TMG.',
  alternates: { canonical: '/impressum' },
  robots: { index: false, follow: true },
}

export default function Impressum() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <div className="ft-prose">
          <p className="ft-eyebrow">Rechtliches</p>
          <h1>Impressum</h1>
          <p className="ft-lead">Angaben gemäß § 5 TMG</p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-12)' }}>Angaben gemäß § 5 TMG</h2>
          <p>
            {site.founder}<br />
            {site.name}<br />
            {site.street}<br />
            {site.postalCode} {site.city}
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>Kontakt</h2>
          <p>
            Telefon: 0621 159 647 34<br />
            Telefax: {site.fax}<br />
            E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>Umsatzsteuer-ID</h2>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
            {site.vatId}
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>
            Angaben zur Berufshaftpflichtversicherung
          </h2>
          <p>
            Name und Sitz des Versicherers:<br />
            andsafe Aktiengesellschaft<br />
            Provinzial-Allee 1<br />
            48159 Münster
          </p>
          <p>Geltungsraum der Versicherung: Deutschland</p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>Redaktionell verantwortlich</h2>
          <p>
            {site.founder}<br />
            {site.street}<br />
            {site.postalCode} {site.city}
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>EU-Streitschlichtung</h2>
          <p>
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
            <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noreferrer">
              https://ec.europa.eu/consumers/odr/
            </a>
            . Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <h2 style={{ fontSize: 'var(--t-h4)', marginTop: 'var(--sp-8)' }}>
            Verbraucherstreitbeilegung / Universalschlichtungsstelle
          </h2>
          <p>
            Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle teilzunehmen.
          </p>
        </div>
      </div>
    </section>
  )
}
