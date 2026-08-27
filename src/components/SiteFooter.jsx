import Link from 'next/link'
import { site, footerColumns, legalLinks } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="ft-footer">
      <div className="ft-footer-inner">
        <div className="ft-footer-grid">
          <div>
            <h5>FT Sicherheitstechnik</h5>
            <p className="ft-footer-tag">
              Smarte Sicherheitstechnik nach Ihren Ansprüchen. Seit über 15 Jahren Ihr Partner für
              Alarmanlagen, Videoüberwachung und Smart Home in der Metropolregion Rhein-Neckar.
            </p>
          </div>

          {Object.entries(footerColumns).map(([heading, links]) => (
            <div key={heading}>
              <h5>{heading}</h5>
              <ul>
                {links.map((l) => (
                  <li key={l.label}>
                    {l.href.startsWith('tel:') || l.href.startsWith('mailto:') ? (
                      <a href={l.href}>{l.label}</a>
                    ) : (
                      <Link href={l.href}>{l.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ft-footer-legal">
          <span>
            © {new Date().getFullYear()} {site.name}. Alle Rechte vorbehalten. USt-IdNr: {site.vatId}
          </span>
          <a className="ft-footer-madeby" href="https://nüll.com" target="_blank" rel="noopener noreferrer">
            Site made by <strong>nüll.</strong>
          </a>
          <nav aria-label="Rechtliches">
            {legalLinks.map((l) => (
              <Link key={l.href} href={l.href}>{l.label}</Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
