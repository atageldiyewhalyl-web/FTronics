import Link from 'next/link'

/* ============================================================
   Core design-system components.
   Markup + class names mirror the Claude Design handoff bundle
   (_ds_bundle.js) so the built site matches the artboards 1:1.
   ============================================================ */

/** Button — primary | secondary | signal | quiet, optional size="sm". */
export function Button({ variant = 'primary', size, href, external, disabled, children, className = '', ...rest }) {
  const cls = `ft-btn ft-btn--${variant}${size === 'sm' ? ' ft-btn--sm' : ''}${className ? ' ' + className : ''}`

  if (href && !disabled) {
    if (external || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) {
      return <a className={cls} href={href} {...rest}>{children}</a>
    }
    return <Link className={cls} href={href} {...rest}>{children}</Link>
  }
  if (href) return <span className={cls} aria-disabled="true" {...rest}>{children}</span>
  return <button className={cls} disabled={disabled} {...rest}>{children}</button>
}

/** Card — default | bento | stat. `stat` renders title as the numeral. */
/* `media` makes the picture the whole card and sets the words on top of it,
   over a scrim that holds their contrast whatever the photograph does
   underneath. Decorative by definition: the title already says what it
   shows, so alt is empty and a screen reader skips straight to the words. */
export function Card({ variant, title, media, icon, children, className = '', ...rest }) {
  const cls = `ft-card${variant ? ` ft-card--${variant}` : ''}${media ? ' ft-card--media' : ''}${className ? ' ' + className : ''}`
  if (variant === 'stat') {
    return (
      <div className={cls} {...rest}>
        {icon && <span className="ft-card-icon" aria-hidden="true">{icon}</span>}
        <span className="ft-stat-num">{title}</span>
        <span className="ft-stat-label">{children}</span>
      </div>
    )
  }
  return (
    <div className={cls} {...rest}>
      {media && (
        <div className="ft-card-media">
          <img src={media} alt="" loading="lazy" decoding="async" />
        </div>
      )}
      <div className="ft-card-body">
        {/* Decorative: the title beside it already names the thing, so an
            announced icon would only say it twice. */}
        {icon && <span className="ft-card-icon" aria-hidden="true">{icon}</span>}
        {title && <h4>{title}</h4>}
        <div className="ft-card-copy">{children}</div>
      </div>
    </div>
  )
}

export function Chip({ status, children, className = '', ...rest }) {
  return (
    <span className={`ft-chip${status ? ' ft-chip--status' : ''}${className ? ' ' + className : ''}`} {...rest}>
      {children}
    </span>
  )
}

export function ChipRow({ children, ...rest }) {
  return <div className="ft-chip-row" {...rest}>{children}</div>
}

/** SectionHead — the eyebrow/title/lead opener used by every section. */
export function SectionHead({ eyebrow, title, lead, as: H = 'h2', reveal = true, ...rest }) {
  const r = reveal ? { 'data-rev': '' } : {}
  return (
    <header lang="de" {...(reveal ? { 'data-rev-group': '' } : {})} {...rest}>
      {eyebrow && <p className="ft-eyebrow" {...r}>{eyebrow}</p>}
      {title && <H {...r}>{title}</H>}
      {lead && <p className="ft-lead" {...r}>{lead}</p>}
    </header>
  )
}

/** Field — input | select (via options) | textarea, with error state. */
export function Field({ label, type = 'text', textarea, options, error, id, name, ...rest }) {
  const fid = id || `f-${(label || 'x').replace(/\W+/g, '-').toLowerCase()}`
  const eid = error ? `${fid}-err` : undefined
  const shared = { id: fid, name: name || fid, 'aria-describedby': eid, ...rest }

  return (
    <div className="ft-field">
      {label && <label htmlFor={fid}>{label}</label>}
      {textarea ? (
        <textarea {...shared} />
      ) : options ? (
        /* defaultValue only when the caller is not driving this itself. A
           select carrying both it and a value is neither controlled nor
           uncontrolled as far as React is concerned, and it warns; every
           existing caller passes no value and still gets the empty default. */
        <select {...shared} {...(rest.value === undefined ? { defaultValue: '' } : null)}>
          {options.map((o, i) =>
            i === 0 ? (
              <option key={o} value="" disabled>{o}</option>
            ) : (
              <option key={o}>{o}</option>
            )
          )}
        </select>
      ) : (
        <input type={type} {...shared} />
      )}
      {error && <p className="ft-error" id={eid}>{error}</p>}
    </div>
  )
}

/**
 * Placeholder — stands in for imagery that was not supplied with the handoff.
 * Holds the artboard's exact aspect ratio so there is zero layout shift when
 * a real asset replaces it. Swap for <Image> once assets exist.
 */
export function Placeholder({ label, ratio = '16 / 9', rounded = 'var(--r-xl)', className = '' }) {
  return (
    <div
      className={`ft-media ${className}`}
      style={{ aspectRatio: ratio, borderRadius: rounded }}
      role="img"
      aria-label={label}
    >
      <div className="ft-ph"><span>{label}</span></div>
    </div>
  )
}

/**
 * Media — a real image in a ratio-locked frame. Uses object-fit: contain so a
 * product cutout is never stretched or cropped, whatever the slot's ratio.
 * `pad` insets the subject so it doesn't touch the frame edge.
 */
/* `fit="cover"` for photographs, which are meant to fill the frame — the
   contain default exists for product cutouts and would letterbox a photo. */
export function Media({ src, alt, ratio = '16 / 9', rounded = 'var(--r-xl)', pad = '0', tint, bare = false, fit = 'contain', className = '' }) {
  return (
    <div
      className={`ft-media${bare ? ' ft-media--bare' : ''} ${className}`}
      style={{
        aspectRatio: ratio,
        borderRadius: bare ? 0 : rounded,
        background: tint || 'transparent',
        padding: pad,
      }}
    >
      <img
        className={`ft-media-img${fit === 'cover' ? ' ft-media-img--cover' : ''}`}
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

/** Shared closing-CTA product flatlay. Decorative: surrounding CTA copy
    already communicates the offer, while this simply gives the close a
    consistent product-led finish. */
export function CtaFlatlay() {
  return (
    <div data-rev className="ft-cta-flatlay">
      <img
        src="/cta-flatlay.webp"
        alt=""
        width={2400}
        height={896}
        loading="lazy"
        decoding="async"
      />
    </div>
  )
}

/** Shell — the --container (1260px) column used by every section. */
export function Shell({ children, className = '', ...rest }) {
  return <div className={`ft-shell ${className}`} {...rest}>{children}</div>
}
