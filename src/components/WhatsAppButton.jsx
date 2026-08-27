import { site } from '@/lib/site'
import { Button } from './ui'

export function WhatsAppButton({ children = 'WhatsApp', className = '', ...rest }) {
  return (
    <Button
      variant="secondary"
      href={site.whatsappHref}
      external
      target="_blank"
      rel="noopener noreferrer"
      className={`ft-btn--whatsapp${className ? ` ${className}` : ''}`}
      {...rest}
    >
      {children}
    </Button>
  )
}
