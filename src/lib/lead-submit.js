const supabaseUrl = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
const leadEndpoint =
  process.env.NEXT_PUBLIC_LEAD_CAPTURE_ENDPOINT ||
  (supabaseUrl ? `${supabaseUrl}/functions/v1/ft-lead-anfrage` : '')
const notifyEmails = process.env.NEXT_PUBLIC_LEAD_NOTIFY_EMAILS || 'halyl@xn--nll-hoa.com'

export async function submitLead(payload) {
  const lead = {
    ...payload,
    pageUrl: typeof window !== 'undefined' ? window.location.href : '',
    notifyEmails,
    createdAt: new Date().toISOString(),
  }

  if (!leadEndpoint) {
    throw new Error('Missing lead capture endpoint.')
  }

  try {
    const stored = JSON.parse(window.localStorage.getItem('ft_lead_anfragen') || '[]')
    stored.push(lead)
    window.localStorage.setItem('ft_lead_anfragen', JSON.stringify(stored.slice(-100)))
  } catch {
    // Local storage is only a best-effort browser-side backup.
  }

  const response = await fetch(leadEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(lead),
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok || result?.ok !== true) {
    throw new Error(result?.error || `Lead endpoint returned ${response.status}`)
  }

  return result
}
