import { hasConsent } from '@/lib/privacy-consent'

function currentPagePath() {
  if (typeof window === 'undefined') return ''
  return `${window.location.pathname}${window.location.search}`
}

const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const leadEndpoint = process.env.NEXT_PUBLIC_LEAD_CAPTURE_ENDPOINT || ''
const interactionEndpoint = supabaseUrl
  ? `${supabaseUrl}/functions/v1/ft-lead-interaktion`
  : leadEndpoint.replace(/ft-lead-anfrage\/?$/, 'ft-lead-interaktion')

function deviceClass() {
  const width = window.innerWidth || 0
  if (width < 768) return 'mobile'
  if (width < 1100) return 'tablet'
  return 'desktop'
}

// Anonymous first-party log in Supabase (ft_lead_interaktionen). It stores no
// IP, cookie or visitor ID, so it runs regardless of marketing consent and
// gives the client report counts that GA4 misses when cookies are declined.
function logInteraction(eventType, details = {}) {
  if (typeof window === 'undefined' || !interactionEndpoint.includes('ft-lead-interaktion')) return

  const params = new URLSearchParams(window.location.search)
  const body = JSON.stringify({
    eventType,
    pagePath: window.location.pathname,
    utmSource: params.get('utm_source'),
    utmMedium: params.get('utm_medium'),
    utmCampaign: params.get('utm_campaign'),
    fromGoogleAds: params.has('gclid') || params.has('gbraid') || params.has('wbraid'),
    device: deviceClass(),
    details,
  })

  try {
    // text/plain keeps sendBeacon a simple request (no CORS preflight) and the
    // beacon survives the page handing off to the phone or mail app.
    const sent = navigator.sendBeacon?.(interactionEndpoint, new Blob([body], { type: 'text/plain' }))
    if (!sent) {
      fetch(interactionEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body,
        keepalive: true,
      }).catch(() => {})
    }
  } catch {
    // Logging must never break the click.
  }
}

const GOOGLE_ADS_ID = 'AW-960863776'
const GOOGLE_ADS_CONVERSION_LABELS = {
  contact_form: '9ERXCKa2g4AdEKC8lsoD',
  configurator: 'sfQqCKm2g4AdEKC8lsoD',
}

export function createAnalyticsEventId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function pushDataLayer(event, parameters = {}) {
  if (typeof window === 'undefined' || !hasConsent('marketing')) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('event', event, {
    page_path: currentPagePath(),
    ...parameters,
  })
}

function trackGoogleAdsConversion(leadType, eventId) {
  if (typeof window === 'undefined' || !hasConsent('marketing')) return

  const conversionLabel = GOOGLE_ADS_CONVERSION_LABELS[leadType]
  if (!conversionLabel) return

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag('event', 'conversion', {
    send_to: `${GOOGLE_ADS_ID}/${conversionLabel}`,
    transaction_id: eventId,
  })
}

export function trackLeadGenerated({
  eventId,
  formName,
  subject,
  customerType,
  configurator,
}) {
  const isConfigurator = formName === 'System-Konfigurator'
  const leadType = isConfigurator ? 'configurator' : 'contact_form'

  pushDataLayer('generate_lead', {
    event_id: eventId,
    lead_type: leadType,
    form_name: formName || 'Unbekanntes Formular',
    lead_service: subject || 'Nicht angegeben',
    customer_type: customerType || 'Nicht angegeben',
    object_type: configurator?.objekt || 'Nicht angegeben',
  })
  trackGoogleAdsConversion(leadType, eventId)
}

export function trackContactClick(contactMethod) {
  logInteraction(`${contactMethod}_click`)
  pushDataLayer('contact_click', {
    contact_method: contactMethod,
  })
}

export function trackConfiguratorProgress(stage, stepNumber, parameters = {}) {
  if (stage === 'start' || stage === 'final_step') {
    logInteraction(`configurator_${stage}`, { object_type: parameters.object_type || '' })
  }
  pushDataLayer('configurator_progress', {
    configurator_stage: stage,
    step_number: stepNumber,
    ...parameters,
  })
}
