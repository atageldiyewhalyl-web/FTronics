'use client'

import { useState } from 'react'
import { Button, Field } from '@/components/ui'

/* ============================================================
   CTA-Anfrageformular — the closing call to action's own form.

   The same fields /kontakt asks for, split across two steps:
   the three a visitor can answer without thinking, and then
   what the enquiry is actually about. Seven fields stacked
   beside a headline read as a wall and get skipped; three read
   as a question, and by the time they are answered the form is
   already begun.

   Two steps, one <form>. "Weiter" is a submit button rather
   than a plain one so the browser runs its own required and
   type=email checks on the way past — onSubmit advances while
   there is a step left and only sends on the last one. The
   step that is not showing is unmounted rather than hidden,
   because a hidden required field cannot be focused: the
   browser blocks the submit and then has nowhere to report it,
   so the button would simply do nothing. That is also why the
   values live in state here rather than in the DOM — going
   back a step has to bring the answers back with it.
   ============================================================ */

/* Verbatim from /kontakt's form. Two lists in two files is one more than
   there should be — see the note in the page's section comment. */
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

/* Title only. The count beside it is the progress bar's job, and a "Schritt 1
   von 2" under a bar already reading 1 / 2 says it a third time. */
const stepHeads = ['Ihre Kontaktdaten', 'Worum geht es?']

const empty = {
  name: '', email: '', telefon: '',
  betreff: '', kundentyp: kundentypen[0], nachricht: '',
}

export function CtaAnfrageForm() {
  const [step, setStep] = useState(1)
  const [sent, setSent] = useState(false)
  const [data, setData] = useState(empty)

  const set = (key) => (e) => setData((d) => ({ ...d, [key]: e.target.value }))
  const head = stepHeads[step - 1]

  if (sent) {
    return (
      <div className="ft-cta-form-panel" role="status" aria-live="polite">
        <p style={{ margin: '0 0 .3em', color: 'var(--ft-ok)', fontWeight: 600 }}>● Anfrage gesendet</p>
        <p style={{ margin: 0, color: 'var(--fg-secondary)', fontSize: 'var(--t-body-sm)' }}>
          Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen.
        </p>
      </div>
    )
  }

  return (
    <form
      className="ft-cta-form-panel"
      onSubmit={(e) => {
        e.preventDefault()
        if (step < 2) setStep(2)
        else setSent(true)
      }}
    >
      {/* Progress. Same two marks the configurator uses — the rail's name on
          the left, the count on the right, a filled bar under both — so a
          visitor who has been through that one already knows this shape. */}
      <div style={{ marginBottom: '1.4rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
          <span style={{ font: '600 15px var(--font-display)', color: 'var(--fg)' }}>{head}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-tertiary)' }}>
            {step} / 2
          </span>
        </div>
        <div
          role="progressbar"
          aria-label="Fortschritt"
          aria-valuemin={1}
          aria-valuemax={2}
          aria-valuenow={step}
          aria-valuetext={`Schritt ${step} von 2: ${head}`}
          style={{ height: 4, background: 'var(--ft-paper-92)', borderRadius: 'var(--r-pill)', overflow: 'hidden' }}
        >
          <div
            style={{
              height: '100%', background: 'var(--ft-signal-500)', borderRadius: 'var(--r-pill)',
              width: `${(step / 2) * 100}%`, transition: 'width var(--dur-3) var(--ease-out)',
            }}
          />
        </div>
      </div>

      {/* keyed on step so the entrance replays when the fields change under it,
          the same way the configurator moves between its own steps. Its own
          class and keyframe rather than that page's .step-in: that one is
          injected by the configurator's own <style> tag and only exists while
          that page is mounted. */}
      <div className="ft-cta-step" key={step}>
        {step === 1 ? (
          <>
            <Field label="Name *" name="name" autoComplete="name" required
              value={data.name} onChange={set('name')} />
            <Field label="E-Mail *" type="email" name="email" autoComplete="email" required
              value={data.email} onChange={set('email')} />
            <Field label="Telefon" type="tel" name="telefon" autoComplete="tel"
              value={data.telefon} onChange={set('telefon')} />
          </>
        ) : (
          <>
            <Field label="Betreff *" name="betreff" options={betreffOptions} required
              value={data.betreff} onChange={set('betreff')} />

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
                {kundentypen.map((k) => (
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
                      checked={data.kundentyp === k}
                      onChange={set('kundentyp')}
                      style={{ accentColor: 'var(--ft-ink-900)' }}
                    />{' '}
                    {k}
                  </label>
                ))}
              </div>
            </fieldset>

            <Field label="Nachricht *" textarea name="nachricht" required
              value={data.nachricht} onChange={set('nachricht')} />

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
          </>
        )}
      </div>

      <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
        {/* type="button": the only control here that must not run validation
            or submit, since going back is allowed from a half-filled step. */}
        {step === 2 && (
          <Button type="button" variant="secondary" onClick={() => setStep(1)}>
            Zurück
          </Button>
        )}
        <Button type="submit">{step === 1 ? 'Weiter' : 'Anfrage senden'}</Button>
      </div>
    </form>
  )
}
