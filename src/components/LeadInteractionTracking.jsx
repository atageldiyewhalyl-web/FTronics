'use client'

import { useEffect } from 'react'
import { trackContactClick } from '@/lib/analytics'

function contactMethodForHref(href) {
  if (href.startsWith('tel:')) return 'phone'
  if (href.startsWith('mailto:')) return 'email'
  if (href.includes('wa.me/')) return 'whatsapp'
  return null
}

export function LeadInteractionTracking() {
  useEffect(() => {
    function handleClick(event) {
      const link = event.target.closest?.('a[href]')
      if (!link) return

      const contactMethod = contactMethodForHref(link.getAttribute('href') || '')
      if (contactMethod) trackContactClick(contactMethod)
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return null
}
