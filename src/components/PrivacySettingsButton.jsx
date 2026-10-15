'use client'

import { openPrivacySettings } from '@/lib/privacy-consent'

export function PrivacySettingsButton() {
  return (
    <button className="ft-privacy-settings-button" type="button" onClick={openPrivacySettings}>
      Datenschutz-Einstellungen
    </button>
  )
}
