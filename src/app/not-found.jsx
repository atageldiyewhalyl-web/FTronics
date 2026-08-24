import { Button } from '@/components/ui'

export const metadata = { title: 'Seite nicht gefunden' }

export default function NotFound() {
  return (
    <section className="ft-section">
      <div className="ft-shell">
        <div className="ft-prose">
          <p className="ft-eyebrow">Fehler 404</p>
          <h1>Diese Seite gibt es nicht.</h1>
          <p style={{ color: 'var(--fg-secondary)' }}>
            Der Link ist möglicherweise veraltet. Nutzen Sie die Navigation oder gehen Sie zurück zur
            Startseite.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 'var(--sp-6)' }}>
            <Button href="/">Zur Startseite</Button>
            <Button variant="secondary" href="/kontakt">Kontakt aufnehmen</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
