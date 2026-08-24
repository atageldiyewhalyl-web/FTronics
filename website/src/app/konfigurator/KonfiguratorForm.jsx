'use client'

import { useState } from 'react'
import { Button, Field } from '@/components/ui'

/* ============================================================
   Konfigurator — the 4-step system configurator.
   Client component: step state, single/multi select, summary
   rail and the quote form. Copy verbatim from the artboard.
   ============================================================ */

/* ---------------- step data ---------------- */

const steps = [
  {
    key: 'objekt',
    multi: false,
    rail: 'Objekttyp wählen',
    title: 'Was möchten Sie schützen?',
    hint: 'Schritt 1 von 4: Wählen Sie Ihren Objekttyp',
    min: 150,
    options: ['Wohnung', 'Haus', 'Büro', 'Lagerhalle', 'Geschäft'],
  },
  {
    key: 'bereiche',
    multi: true,
    rail: 'Bereiche wählen',
    title: 'Welche Bereiche möchten Sie absichern?',
    hint: 'Schritt 2 von 4: Mehrfachauswahl möglich',
    min: 150,
    options: ['Außenbereich', 'Innenbereich', 'Eingang', 'Garage', 'Garten'],
  },
  {
    key: 'funktionen',
    multi: true,
    rail: 'Funktionen wählen',
    title: 'Welche Funktionen benötigen Sie?',
    hint: 'Schritt 3 von 4: Mehrfachauswahl möglich',
    min: 180,
    options: ['Alarmanlage', 'Videoüberwachung', 'Zutrittskontrolle', 'Smart Home', 'Brandschutz'],
  },
  {
    rail: 'Zusammenfassung',
    title: 'Ihre Zusammenfassung',
    hint: 'Schritt 4 von 4: Prüfen Sie Ihre Auswahl und senden Sie Ihre Anfrage',
  },
]

/** Summary rail — visible label + the state key it reads. */
const summaryRows = [
  ['Objekttyp', 'objekt'],
  ['Bereiche', 'bereiche'],
  ['Funktionen', 'funktionen'],
]

const formFields = [
  { label: 'Name *', name: 'name', required: true },
  { label: 'E-Mail *', name: 'email', type: 'email', required: true },
  { label: 'Telefon', name: 'telefon', type: 'tel' },
  { label: 'Anmerkungen', name: 'anmerkungen', textarea: true },
]

/* ---------------- option tile styles ---------------- */

const tileBase = {
  minHeight: 96,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '1rem',
  font: '500 15px var(--font-ui)',
  borderRadius: 'var(--r-md)',
  cursor: 'pointer',
  transition: 'background var(--dur-2) var(--ease-out),border-color var(--dur-2) var(--ease-out),color var(--dur-2) var(--ease-out)',
}

const tileOff = {
  ...tileBase,
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  color: 'var(--fg-secondary)',
}

const tileOn = {
  ...tileBase,
  background: 'var(--btn-primary-bg)',
  border: '1px solid var(--btn-primary-bg)',
  color: 'var(--btn-primary-fg)',
}

/* Step transition — mirrors the artboard's stepIn keyframe. */
const stepInCss = `
@keyframes stepIn{from{opacity:0;transform:translateX(24px)}to{opacity:1;transform:none}}
.step-in{animation:stepIn var(--dur-3) var(--ease-out)}
@media(prefers-reduced-motion:reduce){.step-in{animation:none}}
`

const cardShell = {
  background: 'var(--bg-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
}

/* ---------------- component ---------------- */

export function KonfiguratorForm() {
  const [step, setStep] = useState(1)
  const [picked, setPicked] = useState({ objekt: null, bereiche: [], funktionen: [] })
  const [submitted, setSubmitted] = useState(false)

  const current = steps[step - 1]

  const nextDisabled = current.options
    ? current.multi
      ? picked[current.key].length === 0
      : !picked[current.key]
    : false

  const isOn = (cfg, label) =>
    cfg.multi ? picked[cfg.key].includes(label) : picked[cfg.key] === label

  function choose(cfg, label) {
    setPicked((p) => {
      if (!cfg.multi) return { ...p, [cfg.key]: label }
      const cur = p[cfg.key]
      return {
        ...p,
        [cfg.key]: cur.includes(label) ? cur.filter((x) => x !== label) : [...cur, label],
      }
    })
  }

  function summaryValue(key) {
    const v = picked[key]
    if (Array.isArray(v)) return v.length ? v.join(', ') : 'nicht gewählt'
    return v || 'nicht gewählt'
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <style href="ft-konfigurator-stepin" precedence="default">{stepInCss}</style>

      <section style={{ padding: 'clamp(3rem,5vw,5rem) 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell">
          {/* Intro */}
          <header data-rev-group style={{ maxWidth: 680 }}>
            <p className="ft-eyebrow" data-rev>System-Konfigurator</p>
            <h1 data-rev>Ihr individuelles Sicherheits&shy;konzept</h1>
            <p className="ft-lead" data-rev style={{ margin: '1rem 0 0' }}>
              In nur 4 Schritten zu Ihrem persönlichen Angebot, kostenlos und unverbindlich.
            </p>
          </header>

          {/* Progress */}
          <div style={{ margin: '2.5rem 0 2rem', maxWidth: 820 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ font: '500 13px var(--font-ui)', color: 'var(--fg-secondary)' }}>
                {current.rail}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--fg-tertiary)' }}>
                {step} / 4
              </span>
            </div>
            <div
              role="progressbar"
              aria-label="Fortschritt"
              aria-valuemin={1}
              aria-valuemax={4}
              aria-valuenow={step}
              aria-valuetext={`Schritt ${step} von 4: ${current.rail}`}
              style={{
                height: 4, background: 'var(--ft-paper-92)',
                borderRadius: 'var(--r-pill)', overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%', background: 'var(--ft-signal-500)',
                  borderRadius: 'var(--r-pill)', width: `${(step / 4) * 100}%`,
                  transition: 'width var(--dur-3) var(--ease-out)',
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
              gap: 'clamp(1.5rem,3vw,3rem)', alignItems: 'start',
            }}
          >
            {/* Step column */}
            <div style={{ minWidth: 0 }}>
              <div className="step-in" key={step}>
                <h3 style={{ marginBottom: '.3em' }}>{current.title}</h3>
                <p
                  style={{
                    color: 'var(--fg-tertiary)', fontSize: 'var(--t-body-sm)',
                    marginBottom: '1.5rem',
                  }}
                >
                  {current.hint}
                </p>

                {/* Steps 1–3 — option tiles */}
                {current.options && (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: `repeat(auto-fill,minmax(${current.min}px,1fr))`,
                      gap: 12,
                    }}
                  >
                    {current.options.map((label) => {
                      const on = isOn(current, label)
                      return (
                        <button
                          key={label}
                          type="button"
                          aria-pressed={on}
                          onClick={() => choose(current, label)}
                          style={on ? tileOn : tileOff}
                        >
                          {label}
                        </button>
                      )
                    })}
                  </div>
                )}

                {/* Step 4 — quote form / confirmation */}
                {step === 4 &&
                  (submitted ? (
                    <div role="status" style={{ ...cardShell, padding: '2rem' }}>
                      <p style={{ margin: '0 0 .4em', color: 'var(--ft-ok)', fontWeight: 600 }}>
                        ● Anfrage gesendet
                      </p>
                      <p style={{ margin: 0, color: 'var(--fg-secondary)' }}>
                        Vielen Dank! Wir melden uns innerhalb von 24 Stunden mit Ihrem
                        unverbindlichen Angebot.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} style={{ ...cardShell, padding: '1.8rem' }}>
                      <h4 style={{ marginBottom: '1em' }}>Unverbindliches Angebot anfordern</h4>
                      {formFields.map((f) => (
                        <Field key={f.name} {...f} />
                      ))}
                      <label
                        style={{
                          display: 'flex', gap: 10, alignItems: 'flex-start',
                          fontSize: 'var(--t-body-sm)', color: 'var(--fg-secondary)',
                          margin: '.5rem 0 1.2rem', cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          name="datenschutz"
                          required
                          style={{ marginTop: 3, accentColor: 'var(--ft-ink-900)' }}
                        />
                        <span>
                          Ich stimme der Verarbeitung meiner Daten gemäß der
                          Datenschutzerklärung zu. *
                        </span>
                      </label>
                      <Button type="submit">Unverbindliches Angebot anfordern</Button>
                    </form>
                  ))}
              </div>

              {/* Step navigation */}
              <div style={{ display: 'flex', gap: 12, marginTop: '2rem' }}>
                {step > 1 && !submitted && (
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setStep((s) => Math.max(1, s - 1))}
                  >
                    Zurück
                  </Button>
                )}
                {step < 4 && (
                  <Button
                    type="button"
                    disabled={nextDisabled}
                    onClick={() => {
                      if (!nextDisabled) setStep((s) => Math.min(4, s + 1))
                    }}
                  >
                    Weiter
                  </Button>
                )}
              </div>
            </div>

            {/* Summary rail */}
            <aside style={{ ...cardShell, padding: '1.6rem', position: 'sticky', top: 96 }}>
              <p
                style={{
                  font: '500 12px var(--font-ui)', letterSpacing: '.06em',
                  textTransform: 'uppercase', color: 'var(--fg-tertiary)', margin: '0 0 1.2rem',
                }}
              >
                Ihre Auswahl
              </p>
              <div
                style={{
                  display: 'flex', flexDirection: 'column', gap: '1rem',
                  fontSize: 'var(--t-body-sm)',
                }}
              >
                {summaryRows.map(([label, key], i) => (
                  <div
                    key={key}
                    style={i === 0 ? undefined : { borderTop: '1px solid var(--border)', paddingTop: '1rem' }}
                  >
                    <p style={{ margin: '0 0 .3em', color: 'var(--fg-tertiary)' }}>{label}</p>
                    <p style={{ margin: 0, fontWeight: 500 }}>{summaryValue(key)}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  )
}
