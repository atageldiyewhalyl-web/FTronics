'use client'

import { useRef, useState } from 'react'
import { FormPrivacyNotice } from '@/components/FormPrivacyNotice'
import { submitLead } from '@/lib/lead-submit'
import { site } from '@/lib/site'
import styles from './page.module.css'

export function InquiryForm({
  subject = 'Videoüberwachung für Gewerbe',
  formName = 'Landingpage Videoüberwachung Gewerbe',
  defaultMessage = 'Bitte beraten Sie mich zu einer passenden Videoüberwachung.',
  heading = 'Was möchten Sie absichern?',
  intro = 'Unser Team in Mannheim berät Sie persönlich.',
}) {
  const [state, setState] = useState('idle')
  const submitting = useRef(false)
  const resultRef = useRef(null)

  async function handleSubmit(event) {
    event.preventDefault()
    if (submitting.current) return
    const data = new FormData(event.currentTarget)
    const required = ['company', 'name', 'email']
    for (const name of required) {
      const field = event.currentTarget.elements.namedItem(name)
      field.setCustomValidity(String(data.get(name) || '').trim() ? '' : 'Bitte füllen Sie dieses Feld aus.')
      if (!field.reportValidity()) return
    }
    submitting.current = true
    setState('sending')
    try {
      await submitLead({
        fullName: String(data.get('name')).trim(),
        email: String(data.get('email')).trim(),
        phone: String(data.get('phone') || '').trim(),
        subject,
        customerType: 'Gewerbekunde',
        formName,
        message: [
          `Beratungsanfrage: ${subject}`,
          `Firma: ${String(data.get('company')).trim()}`,
          `Objekt: ${data.get('property') || 'Noch offen'}`,
          `PLZ / Ort: ${String(data.get('location') || '').trim() || 'Noch offen'}`,
          `Anliegen: ${String(data.get('message') || '').trim() || defaultMessage}`,
        ].join('\n'),
      })
      setState('success')
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch {
      setState('error')
    } finally {
      submitting.current = false
    }
  }

  return (
    <section id="anfrage" className={styles.formPanel} aria-labelledby="inquiry-heading" tabIndex={-1}>
      {state === 'success' ? (
        <div ref={resultRef} tabIndex={-1} role="status" className={styles.success}>
          <span className={styles.successMark} aria-hidden="true">✓</span>
          <h2 id="inquiry-heading">Ihre Anfrage ist angekommen.</h2>
          <p>Vielen Dank! Wir melden uns bei Ihnen, um Ihr Objekt und die nächsten Schritte zu besprechen.</p>
          <p>Sie möchten direkt mit uns sprechen?</p>
          <a href={site.phoneHref}>{site.phone}</a>
        </div>
      ) : (
        <>
          <h2 id="inquiry-heading">{heading}</h2>
          <p className={styles.formIntro}>{intro}</p>
          <form onSubmit={handleSubmit} aria-busy={state === 'sending'}>
            <fieldset disabled={state === 'sending'} className={styles.fields}>
              <label>Firmenname <span>*</span><input name="company" autoComplete="organization" maxLength={160} required onInput={e => e.target.setCustomValidity('')} /></label>
              <label>Ansprechpartner <span>*</span><input name="name" autoComplete="name" maxLength={160} required onInput={e => e.target.setCustomValidity('')} /></label>
              <label>E-Mail <span>*</span><input name="email" type="email" autoComplete="email" maxLength={254} required onInput={e => e.target.setCustomValidity('')} /></label>
              <label>Telefon <span className={styles.optional}>(optional)</span><input name="phone" type="tel" autoComplete="tel" maxLength={80} /></label>
              <details className={styles.extraFields}>
                <summary>Objektdetails ergänzen <span>(optional)</span></summary>
                <label>Art des Objekts<select name="property" defaultValue=""><option value="">Bitte auswählen</option><option>Lager / Logistik</option><option>Einzelhandel</option><option>Büro / Praxis</option><option>Industrie / Betriebsgelände</option><option>Anderes Gewerbeobjekt</option></select></label>
                <label>PLZ / Ort<input name="location" autoComplete="address-level2" maxLength={160} /></label>
                <label>Was ist Ihnen wichtig?<textarea name="message" rows={3} maxLength={2500} /></label>
              </details>
            </fieldset>
            <FormPrivacyNotice />
            {state === 'error' && <p role="alert" className={styles.error}>Das Senden hat nicht geklappt. Ihre Angaben bleiben erhalten. Bitte versuchen Sie es erneut oder rufen Sie uns unter <a href={site.phoneHref}>{site.phone}</a> an.</p>}
            <button type="submit" className={styles.primary} disabled={state === 'sending'}>{state === 'sending' ? 'Anfrage wird gesendet…' : 'Beratung anfragen'}<span aria-hidden="true">↗</span></button>
            <p className={styles.formNote}>Unverbindliche Anfrage. Kein Kaufabschluss.</p>
          </form>
        </>
      )}
    </section>
  )
}
