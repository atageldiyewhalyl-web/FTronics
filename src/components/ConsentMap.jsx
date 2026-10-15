'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  CONSENT_CHANGE_EVENT,
  hasConsent,
  openPrivacySettings,
  updateConsentCategory,
} from '@/lib/privacy-consent'

export function ConsentMap({ address }) {
  const [allowed, setAllowed] = useState(false)
  const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=16&output=embed`
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`

  useEffect(() => {
    setAllowed(hasConsent('externalMedia'))
    function handleConsentChange(event) {
      setAllowed(event.detail?.externalMedia === true)
    }
    window.addEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
    return () => window.removeEventListener(CONSENT_CHANGE_EVENT, handleConsentChange)
  }, [])

  if (allowed) {
    return (
      <iframe
        className="ft-map"
        title={`Karte: ${address}`}
        src={mapUrl}
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    )
  }

  return (
    <div className="ft-map-consent">
      <div>
        <p className="ft-consent-kicker">Externer Inhalt</p>
        <h4>Google Maps ist deaktiviert</h4>
        <p>
          Mit „Karte laden“ willigen Sie ein, dass Google Maps geladen wird und dabei Daten wie
          Ihre IP-Adresse an Google übermittelt werden können. Mehr dazu in unserer{' '}
          <Link href="/datenschutz">Datenschutzerklärung</Link>.
        </p>
      </div>
      <div className="ft-map-consent__actions">
        <button
          className="ft-btn ft-btn--primary"
          type="button"
          onClick={() => {
            const saved = updateConsentCategory('externalMedia', true, 'google-maps-two-click')
            setAllowed(saved?.externalMedia === true)
          }}
        >
          Karte laden
        </button>
        <a className="ft-btn ft-btn--secondary" href={directionsUrl} target="_blank" rel="noopener noreferrer">
          Route extern öffnen
        </a>
        <button className="ft-btn ft-btn--quiet" type="button" onClick={openPrivacySettings}>
          Einstellungen öffnen
        </button>
      </div>
    </div>
  )
}
