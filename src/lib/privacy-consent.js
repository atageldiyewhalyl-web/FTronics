export const CONSENT_COOKIE_NAME = 'ft_privacy_consent'
export const CONSENT_VERSION = '2026-10-16'
export const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180
export const CONSENT_CHANGE_EVENT = 'ft:consent-change'
export const OPEN_PRIVACY_SETTINGS_EVENT = 'ft:open-privacy-settings'

const OPTIONAL_CATEGORIES = ['marketing', 'externalMedia']

function safeWindow() {
  return typeof window !== 'undefined' ? window : null
}

export function globalPrivacyControlEnabled() {
  const browser = safeWindow()
  return browser?.navigator?.globalPrivacyControl === true
}

export function readConsent() {
  const browser = safeWindow()
  if (!browser) return null

  const prefix = `${CONSENT_COOKIE_NAME}=`
  const raw = browser.document.cookie
    .split(';')
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))

  if (!raw) return null

  try {
    const consent = JSON.parse(decodeURIComponent(raw.slice(prefix.length)))
    if (consent?.version !== CONSENT_VERSION) return null
    if (consent?.necessary !== true) return null
    if (!OPTIONAL_CATEGORIES.every((key) => typeof consent[key] === 'boolean')) return null
    return consent
  } catch {
    return null
  }
}

export function hasConsent(category) {
  if (category === 'necessary') return true
  return readConsent()?.[category] === true
}

export function writeConsent(preferences, source = 'settings') {
  const browser = safeWindow()
  if (!browser) return null

  const gpc = globalPrivacyControlEnabled()
  const consent = {
    version: CONSENT_VERSION,
    necessary: true,
    marketing: gpc ? false : preferences.marketing === true,
    externalMedia: preferences.externalMedia === true,
    gpc,
    source,
    updatedAt: new Date().toISOString(),
  }

  const secure = browser.location.protocol === 'https:' ? '; Secure' : ''
  browser.document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(consent))}; Path=/; Max-Age=${CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
  browser.dispatchEvent(new CustomEvent(CONSENT_CHANGE_EVENT, { detail: consent }))
  return consent
}

export function updateConsentCategory(category, value, source = 'service') {
  if (!OPTIONAL_CATEGORIES.includes(category)) return readConsent()
  const current = readConsent() || { marketing: false, externalMedia: false }
  return writeConsent({ ...current, [category]: value === true }, source)
}

function expireCookie(name, domain = '') {
  const domainPart = domain ? `; Domain=${domain}` : ''
  document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${domainPart}`
}

export function clearKnownMarketingStorage() {
  const browser = safeWindow()
  if (!browser) return

  const cookieNames = browser.document.cookie
    .split(';')
    .map((part) => part.trim().split('=')[0])
    .filter((name) => /^(_gcl_|_ga|_gid|_gat|IDE$|test_cookie$)/.test(name))

  const hostname = browser.location.hostname
  const registrableDomain = hostname.endsWith('ftsicherheitstechnik.com')
    ? '.ftsicherheitstechnik.com'
    : ''

  cookieNames.forEach((name) => {
    expireCookie(name)
    expireCookie(name, hostname)
    if (registrableDomain) expireCookie(name, registrableDomain)
  })

  try {
    Object.keys(browser.localStorage)
      .filter((key) => /^(_gcl|_ga)/.test(key))
      .forEach((key) => browser.localStorage.removeItem(key))
  } catch {
    // Storage can be unavailable in hardened/private browser modes.
  }
}

export function openPrivacySettings() {
  const browser = safeWindow()
  if (!browser) return
  browser.dispatchEvent(new Event(OPEN_PRIVACY_SETTINGS_EVENT))
}
