'use client'

import { useState } from 'react'
import { Button, Field } from '@/components/ui'

/* ============================================================
   Anfrage-Formular — the only interactive part of /kontakt.
   Mirrors the artboard's sc-if states: form → Bestätigung.
   Kept as its own client island so the page stays a Server
   Component and can export metadata.
   ============================================================ */

const betreffOptions = [
  'Bitte wählen...',
  'Alarmanlage',
  'Videoüberwachung',
  'Zutrittskontrolle',
  'Smart Home',
  'Brandschutz',
  'Sonstiges',
]

const kundentypen = ['Privat', 'Gewerbe']

export function KontaktForm() {
  const [sent, setSent] = useState(false)

  if (sent) {
    return (
      <div
        role="status"
        aria-live="polite"
        style={{
          border: '1px solid var(--border)', borderRadius: 'var(--r-md)',
          padding: '1.4rem', background: 'var(--bg-raised)',
        }}
      >
        <p style={{ margin: '0 0 .3em', color: 'var(--ft-ok)', fontWeight: 600 }}>● Anfrage gesendet</p>
        <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
          Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        setSent(true)
      }}
    >
      <Field label="Name *" name="name" autoComplete="name" required />
      <Field label="E-Mail *" type="email" name="email" autoComplete="email" required />
      <Field label="Telefon" type="tel" name="telefon" autoComplete="tel" />
      <Field label="Betreff *" name="betreff" options={betreffOptions} required />

      <fieldset style={{ margin: '.2rem 0 1rem', padding: 0, border: 0 }}>
        <legend
          style={{
            fontSize: 'var(--t-body-sm)', color: 'var(--fg-secondary)',
            fontWeight: 500, padding: 0, margin: '0 0 .5em',
          }}
        >
          Kundentyp
        </legend>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          {kundentypen.map((k, i) => (
            <label
              key={k}
              style={{
                display: 'flex', gap: 8, alignItems: 'center',
                fontSize: 'var(--t-body-sm)', cursor: 'pointer',
              }}
            >
              <input
                type="radio"
                name="kundentyp"
                value={k}
                defaultChecked={i === 0}
                style={{ accentColor: 'var(--ft-ink-900)' }}
              />{' '}
              {k}
            </label>
          ))}
        </div>
      </fieldset>

      <Field label="Nachricht *" textarea name="nachricht" required />

      <label
        style={{
          display: 'flex', gap: 10, alignItems: 'flex-start',
          fontSize: 'var(--t-body-sm)', color: 'var(--fg-secondary)',
          margin: '.4rem 0 1.2rem', cursor: 'pointer',
        }}
      >
        <input type="checkbox" name="datenschutz" required style={{ marginTop: 3, accentColor: 'var(--ft-ink-900)' }} />
        <span>Ich stimme der Verarbeitung meiner Daten gemäß der Datenschutzerklärung zu. *</span>
      </label>

      <Button type="submit">Anfrage senden</Button>
    </form>
  )
}
