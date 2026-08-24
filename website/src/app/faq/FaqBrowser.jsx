'use client'

import { useState } from 'react'

/* ============================================================
   FaqBrowser — the sticky category bar plus the 31 accordions.
   Client-only because the artboard filters the list in place;
   the accordions themselves stay native <details>, so opening
   and closing a question needs no JavaScript at all.
   Data is owned by page.jsx (server) and passed down, so the
   FAQPage JSON-LD and the visible list can never drift apart.
   ============================================================ */

export function FaqBrowser({ categories, faqs }) {
  const [active, setActive] = useState('alle')

  return (
    <>
      <div className="faq-bar">
        <div className="faq-bar-inner" role="group" aria-label="Fragen nach Kategorie filtern">
          {categories.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className="faq-filter"
              aria-pressed={active === id}
              onClick={() => setActive(id)}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <section style={{ padding: '2.5rem 0 clamp(5rem,7vw,8rem)' }}>
        <div className="ft-shell" style={{ maxWidth: 900 }}>
          {faqs.map((f, i) => (
            <details
              className="faq"
              key={f.q}
              data-cat={f.cat}
              hidden={active !== 'alle' && active !== f.cat}
            >
              <summary>
                <span className="faq-n">{String(i + 1).padStart(2, '0')}</span>
                <span className="q">{f.q}</span>
                <span className="chev" aria-hidden="true">↓</span>
              </summary>
              <p className="faq-a">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
