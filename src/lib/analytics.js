function currentPagePath() {
  if (typeof window === 'undefined') return ''
  return `${window.location.pathname}${window.location.search}`
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
  if (typeof window === 'undefined') return

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({
    event,
    page_path: currentPagePath(),
    ...parameters,
  })
}

function trackGoogleAdsConversion(leadType, eventId) {
  if (typeof window === 'undefined') return

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
  pushDataLayer('contact_click', {
    contact_method: contactMethod,
  })
}

export function trackConfiguratorProgress(stage, stepNumber, parameters = {}) {
  pushDataLayer('configurator_progress', {
    configurator_stage: stage,
    step_number: stepNumber,
    ...parameters,
  })
}
