import Link from 'next/link'

export function FormPrivacyNotice() {
  return (
    <p className="ft-form-privacy-notice">
      Mit dem Absenden verarbeiten wir Ihre Angaben zur Bearbeitung Ihrer Anfrage. Einzelheiten,
      Rechtsgrundlagen und Ihre Rechte finden Sie in unserer{' '}
      <Link href="/datenschutz">Datenschutzerklärung</Link>.
    </p>
  )
}
