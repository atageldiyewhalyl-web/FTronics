const conversionDestinations = {
  contact: 'AW-960863776/9ERXCKa2g4AdEKC8lsoD',
  configurator: 'AW-960863776/sfQqCKm2g4AdEKC8lsoD',
}

function createTransactionId(conversionType) {
  const randomPart = globalThis.crypto?.randomUUID?.()
    || `${Date.now()}-${Math.random().toString(36).slice(2)}`

  return `ft-${conversionType}-${randomPart}`
}

/**
 * Records a Google Ads lead only after the server has accepted the enquiry.
 * No contact details or other personally identifiable information are sent.
 */
export function trackLeadConversion(conversionType) {
  if (typeof window === 'undefined') return false

  const sendTo = conversionDestinations[conversionType]
  if (!sendTo) return false

  try {
    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments)
    }

    const transactionId = createTransactionId(conversionType)

    window.dataLayer.push({
      event: 'ft_lead_success',
      lead_type: conversionType,
      transaction_id: transactionId,
    })

    window.gtag('event', 'conversion', {
      send_to: sendTo,
      transaction_id: transactionId,
    })

    return true
  } catch {
    // Analytics must never prevent the user from seeing a successful submission.
    return false
  }
}
