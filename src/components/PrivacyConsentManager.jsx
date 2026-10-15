'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import {
  CONSENT_CHANGE_EVENT,
  OPEN_PRIVACY_SETTINGS_EVENT,
  clearKnownMarketingStorage,
  globalPrivacyControlEnabled,
  readConsent,
  writeConsent,
} from '@/lib/privacy-consent'

const GOOGLE_ADS_ID = 'AW-960863776'
const emptyPreferences = { marketing: false, externalMedia: false }

function loadGoogleAds() {
  if (document.getElementById('ft-google-ads')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('consent', 'default', {
    ad_storage: 'granted',
    analytics_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
  })
  window.gtag('js', new Date())
  window.gtag('config', GOOGLE_ADS_ID)

  const script = document.createElement('script')
  script.id = 'ft-google-ads'
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`
  document.head.appendChild(script)
}

function updateGoogleConsent(granted) {
  if (typeof window.gtag !== 'function') return
  const value = granted ? 'granted' : 'denied'
  window.gtag('consent', 'update', {
    ad_storage: value,
    analytics_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  })
}

export function PrivacyConsentManager() {
  const [consent, setConsent] = useState(null)
  const [bannerOpen, setBannerOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [preferences, setPreferences] = useState(emptyPreferences)
  const [gpc, setGpc] = useState(false)
  const dialogRef = useRef(null)

  useEffect(() => {
    const stored = readConsent()
    const gpcDetected = globalPrivacyControlEnabled()
    setGpc(gpcDetected)
    setConsent(stored)
    setPreferences(stored || emptyPreferences)
    setBannerOpen(!stored)

    function handleConsentChange(event) {
      setConsent(event.detail)
      setPreferences(event.detail)
    }

    function handleOpenSettings() {
      const current = readConsent() || emptyPreferences
      setPreferences(current)
      setSettingsOpen(true)
      setBannerOpen(false)
    }

    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
    window.addEventListener(OPEN_PRIVACY_SETTINGS_EVENT, handleOpenSettings)
    return () => {
      window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
      window.removeEventListener(OPEN_PRIVACY_SETTINGS_EVENT, handleOpenSettings)
    }
  }, [])

  useEffect(() => {
    if (consent?.marketing) loadGoogleAds()
  }, [consent?.marketing])

  useEffect(() => {
    if (!settingsOpen) return undefined

    const previousFocus = document.activeElement
    const dialog = dialogRef.current
    dialog?.focus()

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSettingsOpen(false)
        if (!readConsent()) setBannerOpen(true)
        return
      }

      if (event.key !== 'Tab' || !dialog) return
      const focusable = [...dialog.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previousFocus?.focus?.()
    }
  }, [settingsOpen])

  function persist(next, source) {
    const hadMarketing = readConsent()?.marketing === true
    if (!next.marketing) {
      if (hadMarketing) updateGoogleConsent(false)
      clearKnownMarketingStorage()
    }

    const saved = writeConsent(next, source)
    setConsent(saved)
    setPreferences(saved)
    setBannerOpen(false)
    setSettingsOpen(false)

    // Once third-party code has executed, a reload is the reliable way to
    // remove its listeners and guarantee that withdrawal takes effect now.
    if (hadMarketing && !saved?.marketing) window.location.reload()
  }

  function closeSettings() {
    setSettingsOpen(false)
    if (!readConsent()) setBannerOpen(true)
  }

  return (
    <>
      {bannerOpen && (
        <section className="ft-consent-banner" aria-label="Datenschutz-Einstellungen">
          <div className="ft-consent-banner__copy">
            <p className="ft-consent-kicker">Ihre Privatsphäre</p>
            <h2>Sie entscheiden, was geladen wird</h2>
            <p>
              Notwendige Funktionen laufen immer. Google Ads und Google Maps laden wir erst nach
              Ihrer ausdrücklichen Einwilligung. Ihre Auswahl können Sie jederzeit ändern.
            </p>
            {gpc && (
              <p className="ft-consent-notice" role="status">
                Ihr Browser sendet Global Privacy Control. Marketing bleibt deshalb deaktiviert.
              </p>
            )}
            <p className="ft-consent-links">
              <Link href="/datenschutz">Datenschutz</Link>
              <Link href="/cookie-richtlinie">Cookie-Richtlinie</Link>
              <Link href="/impressum">Impressum</Link>
            </p>
          </div>
          <div className="ft-consent-banner__actions">
            <button
              className="ft-consent-action ft-consent-action--equal"
              type="button"
              onClick={() => persist({ marketing: false, externalMedia: false }, 'reject-all')}
            >
              Nur notwendige
            </button>
            <button
              className="ft-consent-action ft-consent-action--equal"
              type="button"
              onClick={() => persist({ marketing: !gpc, externalMedia: true }, 'accept-all')}
            >
              {gpc ? 'Externe Medien akzeptieren' : 'Alle akzeptieren'}
            </button>
            <button
              className="ft-consent-action ft-consent-action--settings"
              type="button"
              onClick={() => setSettingsOpen(true)}
            >
              Einstellungen
            </button>
          </div>
        </section>
      )}

      {settingsOpen && (
        <div className="ft-consent-overlay" onMouseDown={(event) => {
          if (event.target === event.currentTarget) closeSettings()
        }}>
          <section
            ref={dialogRef}
            className="ft-consent-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ft-consent-title"
            tabIndex={-1}
          >
            <div className="ft-consent-dialog__head">
              <div>
                <p className="ft-consent-kicker">Datenschutz-Einstellungen</p>
                <h2 id="ft-consent-title">Dienste auswählen</h2>
              </div>
              <button className="ft-consent-close" type="button" onClick={closeSettings} aria-label="Schließen">×</button>
            </div>

            <p className="ft-consent-intro">
              Optionale Dienste bleiben aus, bis Sie zustimmen. Eine Einwilligung ist freiwillig
              und kann mit Wirkung für die Zukunft widerrufen werden.
            </p>

            <div className="ft-consent-service-list">
              <label className="ft-consent-service">
                <span>
                  <strong>Notwendig</strong>
                  <small>Speichert Ihre Auswahl und ermöglicht Formulare sowie Seitensicherheit.</small>
                </span>
                <input type="checkbox" checked disabled aria-label="Notwendig, immer aktiv" />
              </label>

              <label className="ft-consent-service">
                <span>
                  <strong>Marketing – Google Ads</strong>
                  <small>Misst Anzeigen-Conversions nach erfolgreichen Anfragen. Anbieter: Google Ireland Limited.</small>
                  {gpc && <small className="ft-consent-gpc">Durch Global Privacy Control deaktiviert.</small>}
                </span>
                <input
                  type="checkbox"
                  checked={!gpc && preferences.marketing === true}
                  disabled={gpc}
                  onChange={(event) => setPreferences((current) => ({ ...current, marketing: event.target.checked }))}
                />
              </label>

              <label className="ft-consent-service">
                <span>
                  <strong>Externe Medien – Google Maps</strong>
                  <small>Lädt die interaktive Standortkarte. Dabei wird eine Verbindung zu Google hergestellt.</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences.externalMedia === true}
                  onChange={(event) => setPreferences((current) => ({ ...current, externalMedia: event.target.checked }))}
                />
              </label>
            </div>

            <p className="ft-consent-links">
              Details in der <Link href="/cookie-richtlinie" onClick={closeSettings}>Cookie-Richtlinie</Link>
              {' '}und <Link href="/datenschutz" onClick={closeSettings}>Datenschutzerklärung</Link>.
            </p>

            <div className="ft-consent-dialog__actions">
              <button
                className="ft-consent-action ft-consent-action--secondary"
                type="button"
                onClick={() => persist({ marketing: false, externalMedia: false }, 'settings-reject-all')}
              >
                Alle ablehnen
              </button>
              <button
                className="ft-consent-action ft-consent-action--primary"
                type="button"
                onClick={() => persist(preferences, 'settings-save')}
              >
                Auswahl speichern
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}
