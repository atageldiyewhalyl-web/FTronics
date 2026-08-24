import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

/* ============================================================
   FT Sicherheitstechnik — Design System
   A living style guide. Every value here is the source of truth
   from claude-design-brief.md §2–§4.
   ============================================================ */

/* ---------- helpers ---------- */

const hexToRgb = (hex) => {
  const h = hex.replace('#', '')
  const n = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16))
}
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}
const contrast = (a, b) => {
  const [l1, l2] = [luminance(a), luminance(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}

/* ---------- data ---------- */

const RAW_COLORS = [
  { name: 'paper', hex: '#ffffff', role: 'card / raised surface' },
  { name: 'paper-98', hex: '#fafbfb', role: 'card hover' },
  { name: 'paper-96', hex: '#f4f6f7', role: 'page ground' },
  { name: 'paper-92', hex: '#e9ecee', role: 'sunken / divider fill' },
  { name: 'slate-400', hex: '#697279', role: 'tertiary text' },
  { name: 'slate-500', hex: '#5c656c', role: 'secondary text' },
  { name: 'ink-600', hex: '#3a4147', role: 'strong icon' },
  { name: 'ink-900', hex: '#0e1012', role: 'primary text / primary button' },
]

const ACCENT = [
  { name: 'signal-500', hex: '#ff4d3d', role: 'graphic accent — rails, ticks, marks' },
  { name: 'signal-600', hex: '#e63c2d', role: 'focus ring' },
  { name: 'signal-700', hex: '#c62f1d', role: 'signal button — passes AA on white' },
]

const FUNCTIONAL = [
  { name: 'ok', hex: '#188444', role: 'operational status only — never a CTA' },
  { name: 'warn', hex: '#9a6112', role: 'warning' },
  { name: 'error', hex: '#c8232a', role: 'form error' },
]

const TYPE_SCALE = [
  { token: '--t-display', label: 'Display', size: 'clamp(3.25rem, 4.6vw + 2.1rem, 6rem)', lh: 1.02, ls: '-0.026em', w: 600, sample: 'Sicherheits­technik' },
  { token: '--t-h1', label: 'H1', size: 'clamp(2.75rem, 3.2vw + 1.95rem, 5rem)', lh: 1.05, ls: '-0.022em', w: 600, sample: 'Eine Kamera. Genau hingesehen.' },
  { token: '--t-h2', label: 'H2', size: 'clamp(2.2rem, 2.2vw + 1.65rem, 3.75rem)', lh: 1.08, ls: '-0.018em', w: 600, sample: 'Ganzheitliche Sicherheits­lösungen' },
  { token: '--t-h3', label: 'H3', size: 'clamp(1.6rem, 1vw + 1.35rem, 2.4rem)', lh: 1.15, ls: '-0.012em', w: 600, sample: 'Perimeterschutz — die erste Verteidigungslinie' },
  { token: '--t-h4', label: 'H4', size: 'clamp(1.25rem, 0.45vw + 1.14rem, 1.6rem)', lh: 1.25, ls: '-0.004em', w: 500, sample: 'Onboard-KI. Keine Cloud. Keine Latenz.' },
  { token: '--t-lead', label: 'Lead', size: 'clamp(1.15rem, 0.55vw + 1.02rem, 1.5rem)', lh: 1.45, ls: '-0.002em', w: 400, ui: true, sample: 'Kein Call-Center, kein Sub-Sub-Unternehmer. Unser eigenes Experten-Team plant, installiert und wartet jede Anlage persönlich.' },
  { token: '--t-body', label: 'Body', size: 'clamp(1rem, 0.25vw + 0.94rem, 1.15rem)', lh: 1.6, ls: '0', w: 400, ui: true, sample: 'Kabel sauber im Kanal. Bohrlöcher verspachtelt. Werkzeug aufgeräumt. Boden gefegt.' },
  { token: '--t-eyebrow', label: 'Eyebrow', size: 'clamp(0.95rem, 0.3vw + 0.88rem, 1.2rem)', lh: 1.1, ls: '0.06em', w: 500, ui: true, upper: true, sample: 'Unser Bekenntnis' },
]

const SPACE = [1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32, 40]
const SPACE_PX = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64, 20: 80, 24: 96, 32: 128, 40: 160 }

const RADII = [
  { token: '--r-sm', px: 8, use: 'chips, inputs' },
  { token: '--r-md', px: 14, use: 'buttons, small cards' },
  { token: '--r-lg', px: 20, use: 'standard card' },
  { token: '--r-xl', px: 28, use: 'feature card' },
  { token: '--r-bento', px: 36, use: 'full-bleed bento' },
]

const EASINGS = [
  { token: '--ease-out', value: 'cubic-bezier(0.16, 1, 0.30, 1)', use: 'the default — expo-out' },
  { token: '--ease-in-out', value: 'cubic-bezier(0.65, 0, 0.35, 1)', use: 'symmetric moves' },
  { token: '--ease-soft', value: 'cubic-bezier(0.33, 1, 0.68, 1)', use: 'gentle settle' },
]

const PANELS = [
  { n: '01', h: 'Ungeschützte Objekte sind verwundbar', p: 'Ohne professionelle Sicherheitstechnik ist jedes Objekt ein leichtes Ziel. Einbrüche dauern unter 60 Sekunden.' },
  { n: '02', h: 'Perimeterschutz — die erste Verteidigungslinie', p: 'PTZ-Kameras überwachen das gesamte Gelände, Tore werden zutrittskontrolliert, Außenleuchten reagieren auf Bewegung.' },
  { n: '03', h: 'Gebäudeüberwachung', p: '4K-Bullet- und Dome-Kameras an allen kritischen Punkten. KI unterscheidet Mensch, Fahrzeug und Tier.' },
  { n: '04', h: 'Alarmanlage & Sensorik', p: 'Tür- und Fensterkontakte, Bewegungsmelder, Glasbruchsensoren. Alarm in Millisekunden.' },
  { n: '05', h: 'App-Steuerung & Wartung', p: 'Push-Benachrichtigungen bei jedem Ereignis, jährliche Wartung durch unser Team direkt aus Mannheim.' },
]

const SCRUB_CAPTIONS = [
  'Sechs Bauteile. Jedes für sich.',
  'Sony Starvis Sensor. 4K bei Tag und Nacht.',
  'Smart IR · 18 LEDs. 30 m Reichweite.',
  'Onboard-KI. Keine Cloud. Keine Latenz.',
  'IP67 Aluminium. Für draußen gemacht.',
]

const NAV = [
  ['overview', 'Overview'],
  ['colour', 'Colour'],
  ['type', 'Typography'],
  ['space', 'Space & Layout'],
  ['radius', 'Radius'],
  ['motion', 'Motion'],
  ['buttons', 'Buttons'],
  ['cards', 'Cards & Chips'],
  ['forms', 'Forms'],
  ['scroll', 'Scroll Patterns'],
  ['rules', 'Do / Don’t'],
]

/* ---------- reusable bits ---------- */

function Section({ id, eyebrow, title, lead, children }) {
  return (
    <section className="ds-section" id={id}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      {title && <h2>{title}</h2>}
      {lead && <p className="lead" style={{ marginBottom: 'var(--sp-8)' }}>{lead}</p>}
      {children}
    </section>
  )
}

function Swatch({ name, hex, role, ground }) {
  const ratio = useMemo(() => contrast(hex, ground), [hex, ground])
  const pass = ratio >= 4.5
  return (
    <div className="swatch">
      <div className="swatch-chip" style={{ background: hex }} />
      <div className="swatch-meta">
        <b>{name}</b>
        <code>{hex}</code>
        <span className="swatch-ratio">{role}</span>
        <span className={`swatch-ratio ${pass ? 'pass' : 'fail'}`}>
          {ratio.toFixed(2)}:1 vs ground {pass ? '✓ AA' : '· large text only'}
        </span>
      </div>
    </div>
  )
}

/* ---------- Pattern A: pinned panel stack ---------- */

function PinnedStackDemo() {
  const scroller = useRef(null)
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? el.scrollTop / max : 0)
  }, [])

  const n = PANELS.length
  const pos = progress * n
  const active = Math.min(n - 1, Math.floor(pos))

  return (
    <div className="demo-frame">
      <span className="demo-hint">Scroll inside ↓</span>
      <div className="demo-scroller" ref={scroller} onScroll={onScroll}>
        <div className="pin-stack" style={{ height: `${(n + 1) * 420}px` }}>
          <div className="pin-stage">
            <div className="pin-rail">
              {PANELS.map((p, i) => (
                <span key={p.n} className={`pin-tick ${i === active ? 'is-active' : ''}`} />
              ))}
            </div>
            {PANELS.map((p, i) => {
              const d = Math.abs(pos - (i + 0.5))
              const opacity = Math.max(0, Math.min(1, 1.6 - d * 1.6))
              const y = (pos - (i + 0.5)) * -40
              return (
                <div key={p.n} className="pin-panel" style={{ opacity, transform: `translateY(${y}px)` }}>
                  <span className="pin-num">{p.n}</span>
                  <h4>{p.h}</h4>
                  <p>{p.p}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className="scrub-progress" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

/* ---------- Pattern B: scrub demo (stands in for scrubbed video) ---------- */

function ScrubDemo() {
  const scroller = useRef(null)
  const [progress, setProgress] = useState(0)

  const onScroll = useCallback(() => {
    const el = scroller.current
    if (!el) return
    const max = el.scrollHeight - el.clientHeight
    setProgress(max > 0 ? el.scrollTop / max : 0)
  }, [])

  const layers = ['Dome-Glas', 'Sensor', 'Objektiv', 'Smart IR', 'KI-Chip', 'Aluminium']
  const caption = SCRUB_CAPTIONS[Math.min(SCRUB_CAPTIONS.length - 1, Math.floor(progress * SCRUB_CAPTIONS.length))]

  return (
    <div className="demo-frame">
      <span className="demo-hint">Scroll to scrub ↓</span>
      <div className="demo-scroller" ref={scroller} onScroll={onScroll}>
        <div style={{ height: '1680px', position: 'relative' }}>
          <div className="scrub-stage">
            <div className="scrub-cam">
              {layers.map((l, i) => {
                const spread = progress * 78
                const offset = (i - (layers.length - 1) / 2) * spread
                const scale = 1 - i * 0.11
                return (
                  <div
                    key={l}
                    className="scrub-layer"
                    style={{
                      transform: `translateY(${offset}px) scale(${scale}) rotateX(${progress * 46}deg)`,
                      opacity: 0.35 + (1 - i / layers.length) * 0.65,
                      zIndex: layers.length - i,
                    }}
                  >
                    {progress > 0.25 ? l : ''}
                  </div>
                )
              })}
            </div>
            <div className="scrub-caption">{caption}</div>
          </div>
        </div>
      </div>
      <div className="scrub-progress" style={{ width: `${progress * 100}%` }} />
    </div>
  )
}

/* ---------- Pattern C: staggered reveal ---------- */

function RevealDemo() {
  const scroller = useRef(null)
  const groupRef = useRef(null)
  const [key, setKey] = useState(0)

  useEffect(() => {
    const root = scroller.current
    const group = groupRef.current
    if (!root || !group) return
    const items = [...group.querySelectorAll('[data-rev]')]
    items.forEach((el) => el.classList.remove('is-in'))
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          items.forEach((el, i) => setTimeout(() => el.classList.add('is-in'), i * 70))
          io.disconnect()
        })
      },
      { root, threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
    )
    io.observe(group)
    return () => io.disconnect()
  }, [key])

  return (
    <div className="demo-frame">
      <span className="demo-hint">Scroll ↓ · 70 ms stagger</span>
      <div className="demo-scroller" ref={scroller}>
        <div style={{ height: '300px', display: 'grid', placeItems: 'center', color: 'var(--fg-tertiary)', fontSize: 13 }}>
          keep scrolling…
        </div>
        <div ref={groupRef} style={{ padding: 'var(--sp-8)' }}>
          <p className="eyebrow" data-rev>Unsere Leistungen</p>
          <h4 data-rev style={{ fontSize: 26 }}>Ganzheitliche Sicherheitslösungen</h4>
          <p data-rev style={{ color: 'var(--fg-secondary)', fontSize: 14 }}>
            Von der Beratung bis zur Installation.
          </p>
          <div className="ds-grid cols-3" style={{ marginTop: 'var(--sp-6)' }}>
            {['Alarmanlagen', 'Videoüberwachung', 'Zutrittskontrolle'].map((t) => (
              <div className="card" data-rev key={t} style={{ padding: 'var(--sp-4)' }}>
                <h4 style={{ fontSize: 15, marginBottom: 4 }}>{t}</h4>
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: '160px' }} />
      </div>
      <div style={{ padding: 'var(--sp-3) var(--sp-4)', borderTop: '1px solid var(--border)' }}>
        <button className="btn btn--secondary btn--sm" onClick={() => setKey((k) => k + 1)}>Replay</button>
      </div>
    </div>
  )
}

/* ---------- Pattern E: horizontal gallery ---------- */

function GalleryDemo() {
  const rail = useRef(null)
  const products = [
    { n: 'FC-8D Pro', t: 'Dome IP-Kamera', c: ['4K 8MP', 'IP67', 'KI', 'PoE'] },
    { n: 'FB-8A Pro', t: 'Bullet IP-Kamera', c: ['4K 8MP', 'IP67', 'Gesichtserkennung'] },
    { n: 'FP-8T 20X', t: 'PTZ Speed Dome', c: ['20x Zoom', 'Auto-Tracking', 'IR 100m'] },
    { n: 'FN-64 Pro', t: '64-Kanal NVR', c: ['12MP', 'RAID', '8x SATA'] },
  ]
  const nudge = (dir) => rail.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  return (
    <>
      <div className="scroll-gallery" ref={rail} tabIndex={0} aria-label="FTronics Produkte"
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') { e.preventDefault(); nudge(1) }
          if (e.key === 'ArrowLeft') { e.preventDefault(); nudge(-1) }
        }}>
        {products.map((p) => (
          <div className="card scroll-item" key={p.n}>
            <div style={{ aspectRatio: '4/3', background: 'var(--bg-raised)', borderRadius: 'var(--r-md)', marginBottom: 'var(--sp-4)', display: 'grid', placeItems: 'center', color: 'var(--fg-tertiary)', fontSize: 12 }}>
              product render
            </div>
            <h4 style={{ fontSize: 17, marginBottom: 4 }}>{p.n}</h4>
            <p style={{ marginBottom: 'var(--sp-3)' }}>{p.t}</p>
            <div className="chip-row">{p.c.map((c) => <span className="chip" key={c}>{c}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="paddle-row">
        <button className="paddle" onClick={() => nudge(-1)} aria-label="Zurück">←</button>
        <button className="paddle" onClick={() => nudge(1)} aria-label="Weiter">→</button>
      </div>
    </>
  )
}

/* ---------- Motion demo ---------- */

function EaseDemo({ token, value, use }) {
  const [run, setRun] = useState(false)
  return (
    <div className="ease-demo">
      <div style={{ width: 150, flex: '0 0 auto' }}>
        <div style={{ font: '500 13px var(--font-ui)' }}>{token}</div>
        <div style={{ font: '400 11px ui-monospace, monospace', color: 'var(--fg-tertiary)' }}>{use}</div>
      </div>
      <div className="ease-track" onClick={() => setRun((r) => !r)}>
        <div className="ease-ball" style={{
          transform: run ? 'translateX(calc(100vw - 100%))' : 'translateX(0)',
          transitionProperty: 'transform',
          transitionDuration: '700ms',
          transitionTimingFunction: value,
          maxWidth: '100%',
        }} />
      </div>
      <button className="btn btn--secondary btn--sm" onClick={() => setRun((r) => !r)}>Play</button>
    </div>
  )
}

/* ============================================================
   Main
   ============================================================ */

export default function DesignSystem() {
  const [active, setActive] = useState('overview')

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-20% 0px -70% 0px' }
    )
    NAV.forEach(([id]) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  const ground = '#ffffff'

  return (
    <div className="ds-shell">
      {/* ---------------- Sidebar ---------------- */}
      <nav className="ds-nav" aria-label="Design system sections">
        <div className="ds-brand">
          <span className="ds-brand-mark">FT</span>
          <span className="ds-brand-text">
            <b>Design System</b>
            <span>FT Sicherheitstechnik</span>
          </span>
        </div>

        <div className="ds-nav-list">
          {NAV.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="ds-nav-link" aria-current={active === id}>
              <span className="ds-nav-dot" />
              {label}
            </a>
          ))}
        </div>

        <div className="ds-nav-foot">
          <p style={{ fontSize: 11, color: 'var(--fg-tertiary)', margin: 0 }}>
            v1.0 · DM Sans · one accent · light
          </p>
        </div>
      </nav>

      {/* ---------------- Main ---------------- */}
      <main className="ds-main">
        <Section
          id="overview"
          eyebrow="FT Sicherheitstechnik"
          title="Design System"
          lead="A light, single-world system for a Mannheim security-technology installer. Synthesised from three references — Bevel, Apple AirPods Pro, and Bridge — reduced to five enforced constraints."
        >
          <div className="ds-grid cols-2" style={{ marginBottom: 'var(--sp-8)' }}>
            <div className="dd dd--do">
              <h4>The five constraints</h4>
              <ul>
                <li>One accent colour. Never two.</li>
                <li>The primary button is never the accent.</li>
                <li>Headings 500–600 weight. Never bolder.</li>
                <li>Tracking tightens as type grows.</li>
                <li>Long pages are paid for with scroll choreography.</li>
              </ul>
            </div>
            <div className="dd">
              <h4>Token architecture</h4>
              <ul>
                <li><code className="inline">--ft-ink-900</code> — raw colour</li>
                <li><code className="inline">--bg</code> — semantic role</li>
                <li><code className="inline">--btn-primary-bg</code> — component property</li>
              </ul>
              <p style={{ fontSize: 13, color: 'var(--fg-tertiary)', marginTop: 'var(--sp-3)', marginBottom: 0 }}>
                Components read the semantic layer, never a raw hex. Retheming is a token swap, not a component rewrite.
              </p>
            </div>
          </div>

          <div className="ds-grid cols-4">
            {[['15+', 'Jahre Erfahrung'], ['5.0', 'Google-Bewertung'], ['18', 'FTronics Produkte'], ['Top 100', 'Deutschlands']].map(([n, l]) => (
              <div className="card card--stat" key={l}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- Colour ---------------- */}
        <Section id="colour" eyebrow="Foundations" title="Colour"
          lead="One accent, used at most twice per viewport. Everything else is neutral. Contrast ratios below are computed live against white.">
          <h4>Raw neutrals</h4>
          <div className="ds-grid cols-4" style={{ marginBottom: 'var(--sp-12)' }}>
            {RAW_COLORS.map((c) => <Swatch key={c.name} {...c} ground={ground} />)}
          </div>

          <h4>The single accent</h4>
          <div className="ds-grid cols-3" style={{ marginBottom: 'var(--sp-12)' }}>
            {ACCENT.map((c) => <Swatch key={c.name} {...c} ground={ground} />)}
          </div>

          <h4>Functional — never decorative</h4>
          <div className="ds-grid cols-3" style={{ marginBottom: 'var(--sp-8)' }}>
            {FUNCTIONAL.map((c) => <Swatch key={c.name} {...c} ground={ground} />)}
          </div>

          <div className="dd dd--dont">
            <h4>The rule that matters most</h4>
            <ul>
              <li>The current live site uses <b>three</b> accents (red, green, cyan) plus glows, on a near-black ground. Every reference uses <b>one</b>, on light.</li>
              <li>Green <code className="inline">--ft-ok</code> means “armed / online / success” only. It is never a call to action.</li>
              <li>No glow tokens, no bloom shadows. Depth = surface + 1px border + 3px lift.</li>
            </ul>
          </div>
        </Section>

        {/* ---------------- Typography ---------------- */}
        <Section id="type" eyebrow="Foundations" title="Typography"
          lead="DM Sans throughout — one family for display and UI, the way Bevel and Bridge each run a single face. Weight 600 maximum. Letter-spacing tightens as size grows; line-height compresses to match.">
          {TYPE_SCALE.map((t) => (
            <div className="spec-row" key={t.token}>
              <div className="spec-meta">
                <span><b>{t.label}</b></span>
                <span>{t.token}</span>
                <span>size <b>{t.size}</b></span>
                <span>lh <b>{t.lh}</b></span>
                <span>ls <b>{t.ls}</b></span>
                <span>weight <b>{t.w}</b></span>
              </div>
              <p className="spec-sample" style={{
                fontFamily: t.ui ? 'var(--font-ui)' : 'var(--font-display)',
                fontSize: `var(${t.token})`,
                lineHeight: t.lh,
                letterSpacing: t.ls,
                fontWeight: t.w,
                textTransform: t.upper ? 'uppercase' : 'none',
                color: t.label === 'Lead' ? 'var(--fg-secondary)' : t.label === 'Eyebrow' ? 'var(--fg-tertiary)' : 'var(--fg)',
              }}>
                {t.sample}
              </p>
            </div>
          ))}
          <div className="dd" style={{ marginTop: 'var(--sp-8)' }}>
            <h4>German requirement</h4>
            <ul>
              <li><code className="inline">hyphens: auto</code> + <code className="inline">lang="de"</code> — <i>Videoüberwachungsanlage</i> at 96px overflows a 1200px container otherwise.</li>
              <li><code className="inline">text-wrap: balance</code> on H1/H2 to prevent orphans in compound-heavy headlines.</li>
              <li>Bottom margins in <code className="inline">em</code>: h1 .2 · h2 .3 · h3 .5 · h4 .8 · p 1.</li>
            </ul>
          </div>
        </Section>

        {/* ---------------- Space ---------------- */}
        <Section id="space" eyebrow="Foundations" title="Space & Layout"
          lead="A 12-column grid on a 1200px container. Prose is capped at a 680px measure — never let body copy run the full width.">
          <div style={{ marginBottom: 'var(--sp-12)' }}>
            {SPACE.map((s) => (
              <div className="scale-row" key={s}>
                <span className="scale-label">--sp-{s} · {SPACE_PX[s]}px</span>
                <span className="scale-bar" style={{ width: SPACE_PX[s] }} />
              </div>
            ))}
          </div>
          <div className="ds-grid cols-3">
            {[['--container', '1200px', 'default'], ['--container-text', '680px', 'prose measure'], ['--section-pad', '80→160px', 'clamp(5rem, 7.143vw + 3.571rem, 10rem)']].map(([t, v, u]) => (
              <div className="card" key={t}>
                <h4 style={{ fontSize: 15, marginBottom: 6 }}>{t}</h4>
                <p style={{ marginBottom: 4 }}><code className="inline">{v}</code></p>
                <p style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{u}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- Radius ---------------- */}
        <Section id="radius" eyebrow="Foundations" title="Radius"
          lead="Large radii read as software; small radii read as document. Buttons are always pills.">
          <div className="ds-grid cols-3">
            {RADII.map((r) => (
              <div key={r.token}>
                <div className="radius-demo" style={{ borderRadius: r.px }}>{r.px}px</div>
                <p style={{ fontSize: 13, marginTop: 'var(--sp-2)', marginBottom: 0 }}>
                  <b style={{ fontWeight: 500 }}>{r.token}</b>
                  <span style={{ color: 'var(--fg-tertiary)' }}> — {r.use}</span>
                </p>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- Motion ---------------- */}
        <Section id="motion" eyebrow="Foundations" title="Motion"
          lead="Animate only transform, opacity, filter and clip-path. Never height, top, width or margin. Click a track to play.">
          {EASINGS.map((e) => <EaseDemo key={e.token} {...e} />)}
          <div className="ds-grid cols-5" style={{ gridTemplateColumns: 'repeat(5, 1fr)', marginTop: 'var(--sp-8)' }}>
            {[['--dur-1', '120ms', 'micro'], ['--dur-2', '240ms', 'button'], ['--dur-3', '420ms', 'card'], ['--dur-4', '700ms', 'section'], ['--dur-5', '1100ms', 'hero']].map(([t, v, u]) => (
              <div className="card" key={t} style={{ padding: 'var(--sp-4)' }}>
                <div style={{ font: '500 13px var(--font-ui)' }}>{v}</div>
                <div style={{ font: '400 11px ui-monospace, monospace', color: 'var(--fg-tertiary)' }}>{t}</div>
                <div style={{ fontSize: 11, color: 'var(--fg-tertiary)', marginTop: 4 }}>{u}</div>
              </div>
            ))}
          </div>
        </Section>

        {/* ---------------- Buttons ---------------- */}
        <Section id="buttons" eyebrow="Components" title="Buttons"
          lead="The primary button is near-black on the light ground — never the accent. That single rule is most of why the reference sites feel expensive.">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--sp-4)', alignItems: 'center', marginBottom: 'var(--sp-8)' }}>
            <button className="btn btn--primary">Kostenlose Beratung anfragen</button>
            <button className="btn btn--secondary">Produkte ansehen</button>
            <button className="btn btn--signal">Jetzt Anfrage starten</button>
            <button className="btn btn--quiet">Mehr erfahren →</button>
          </div>
          <div className="ds-grid cols-4">
            {[
              ['Primary', 'near-black on light', 'The main conversion action'],
              ['Secondary', 'transparent + border', 'Alternate path'],
              ['Signal', 'accent', 'Once per page, maximum'],
              ['Quiet', 'text only', 'Inline links'],
            ].map(([n, s, u]) => (
              <div className="card" key={n} style={{ padding: 'var(--sp-4)' }}>
                <h4 style={{ fontSize: 15, marginBottom: 4 }}>{n}</h4>
                <p style={{ fontSize: 12.5, marginBottom: 4 }}>{s}</p>
                <p style={{ fontSize: 12, color: 'var(--fg-tertiary)' }}>{u}</p>
              </div>
            ))}
          </div>
          <p className="ds-note" style={{ marginTop: 'var(--sp-6)' }}>
            All variants: pill radius, weight 500, 44px minimum touch target, <code className="inline">translateY(-1px)</code> on hover,
            <code className="inline">scale(.985)</code> on press, 2px accent focus ring at 3px offset.
          </p>
        </Section>

        {/* ---------------- Cards ---------------- */}
        <Section id="cards" eyebrow="Components" title="Cards & Chips"
          lead="Elevation is surface + 1px border + a 3px lift. No glow, no 3D tilt. Spec chips stay monochrome — colour-coding them is the trap.">
          <div className="ds-grid cols-3" style={{ marginBottom: 'var(--sp-8)' }}>
            {[
              ['Alarmanlagen', 'Hybride Ajax-Alarmanlagen mit App-Steuerung, Funk- und Draht-Komponenten.'],
              ['Videoüberwachung', '4K/8MP Kameras mit KI-Erkennung von Menschen und Fahrzeugen.'],
              ['Zutrittskontrolle', 'Fingerprint, RFID, PIN — flexibel und sicher.'],
            ].map(([t, d]) => (
              <div className="card" key={t}>
                <h4>{t}</h4>
                <p>{d}</p>
              </div>
            ))}
          </div>

          <div className="card card--bento" style={{ marginBottom: 'var(--sp-8)' }}>
            <p className="eyebrow" style={{ marginBottom: 'var(--sp-2)' }}>Unser Bekenntnis</p>
            <h4 style={{ fontSize: 'var(--t-h3)', maxWidth: 560 }}>
              Wir verlassen jeden Ort besser, als wir ihn vorgefunden haben.
            </h4>
            <p style={{ maxWidth: 480 }}>36px bento radius · full-bleed media slot · min-height 420px in production.</p>
          </div>

          <h4>Spec chips</h4>
          <div className="chip-row" style={{ marginBottom: 'var(--sp-4)' }}>
            {['4K 8MP', 'IP67', 'IK10', 'PoE', 'Sony IMX415', 'NDAA', 'KI-Analyse'].map((c) => (
              <span className="chip" key={c}>{c}</span>
            ))}
          </div>
          <div className="chip-row">
            <span className="chip chip--status">● Anlage scharf</span>
            <span className="chip chip--status">● Online</span>
          </div>
          <p className="ds-note" style={{ marginTop: 'var(--sp-3)' }}>
            Status chips are the only place functional green appears.
          </p>
        </Section>

        {/* ---------------- Forms ---------------- */}
        <Section id="forms" eyebrow="Components" title="Forms"
          lead="16px font size prevents iOS zoom. 52px minimum height. Focus is an accent border plus a soft 3px ring.">
          <div style={{ maxWidth: 520 }}>
            <div className="field">
              <label htmlFor="d-name">Name *</label>
              <input id="d-name" placeholder="Max Mustermann" />
            </div>
            <div className="field">
              <label htmlFor="d-subject">Betreff *</label>
              <select id="d-subject" defaultValue="">
                <option value="" disabled>Bitte wählen...</option>
                <option>Alarmanlage</option>
                <option>Videoüberwachung</option>
                <option>Zutrittskontrolle</option>
                <option>Smart Home</option>
                <option>Brandschutz</option>
                <option>Sonstiges</option>
              </select>
            </div>
            <div className="field">
              <label htmlFor="d-msg">Nachricht *</label>
              <textarea id="d-msg" placeholder="Wie können wir helfen?" />
            </div>
            <button className="btn btn--primary">Anfrage senden</button>
          </div>
        </Section>

        {/* ---------------- Scroll ---------------- */}
        <Section id="scroll" eyebrow="The important part" title="Scroll Patterns"
          lead="Scroll is the primary input device, not navigation. Each demo below is live — scroll inside the frames. Production uses Lenis + GSAP ScrollTrigger; these demos use native scroll to stay dependency-free.">

          <h4 style={{ marginTop: 'var(--sp-8)' }}>A · Pinned panel stack</h4>
          <p className="ds-note" style={{ marginBottom: 'var(--sp-4)' }}>
            Container <code className="inline">(N+1) × 100dvh</code>; stage is <code className="inline">position: sticky</code>;
            panels crossfade on scroll progress. Max 5 panels. The progress rail is the only accent in the section.
          </p>
          <PinnedStackDemo />

          <h4 style={{ marginTop: 'var(--sp-12)' }}>B · Scroll-scrubbed sequence</h4>
          <p className="ds-note" style={{ marginBottom: 'var(--sp-4)' }}>
            In production this is <code className="inline">video.currentTime = progress × duration</code> — the user scrubs a
            product demo with the wheel. This demo stands in with transformed layers. Encode with{' '}
            <code className="inline">-g 8 -movflags +faststart</code> or seeking stutters.
          </p>
          <ScrubDemo />

          <h4 style={{ marginTop: 'var(--sp-12)' }}>C · Staggered entrance reveal</h4>
          <p className="ds-note" style={{ marginBottom: 'var(--sp-4)' }}>
            IntersectionObserver at 0.15 threshold, <code className="inline">translateY(28px)</code> + fade, 70ms stagger,
            capped at 6 items, fires once and never re-animates.
          </p>
          <RevealDemo />

          <h4 style={{ marginTop: 'var(--sp-12)' }}>E · Horizontal scroll gallery</h4>
          <p className="ds-note" style={{ marginBottom: 'var(--sp-4)' }}>
            Scroll-snap plus paddle buttons. Focus the rail and use ← → keys — keyboard support is mandatory.
          </p>
          <GalleryDemo />

          <div className="dd" style={{ marginTop: 'var(--sp-12)' }}>
            <h4>Engine</h4>
            <pre className="block">{`const lenis = new Lenis({
  duration: 1.05,
  easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  smoothTouch: false,      // never hijack touch
});
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add(t => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);`}</pre>
          </div>
        </Section>

        {/* ---------------- Rules ---------------- */}
        <Section id="rules" eyebrow="Discipline" title="Do / Don’t"
          lead="The system holds together only if these hold. Most are one-line rules that are easy to break by accident.">
          <div className="ds-grid cols-2">
            <div className="dd dd--do">
              <h4>✓ Do</h4>
              <ul>
                <li>One accent, twice per viewport maximum.</li>
                <li>Primary button near-black. Always.</li>
                <li>Semibold 500–600 headlines.</li>
                <li>Negative tracking that tightens as type grows.</li>
                <li><code className="inline">dvh</code> not <code className="inline">vh</code> for pinned stages.</li>
                <li>Reveal once, never re-animate on scroll-up.</li>
                <li>Reserve every media box with <code className="inline">aspect-ratio</code>.</li>
                <li>Let one section carry the page.</li>
                <li><code className="inline">text-wrap: balance</code> on German display type.</li>
              </ul>
            </div>
            <div className="dd dd--dont">
              <h4>✕ Don’t</h4>
              <ul>
                <li>Don’t keep three accent colours.</li>
                <li>Don’t use glows or bloom for depth.</li>
                <li>Don’t run infinite ambient animations.</li>
                <li>Don’t hijack or block scroll. Ever.</li>
                <li>Don’t smooth-scroll touch.</li>
                <li>Don’t animate height / top / width / margin.</li>
                <li>Don’t colour-code spec chips.</li>
                <li>Don’t exceed 5 panels in a pinned stack.</li>
                <li>Don’t put more than 3 scrubbed videos on a page.</li>
                <li>Don’t let body copy exceed 680px.</li>
              </ul>
            </div>
          </div>

          <div className="dd" style={{ marginTop: 'var(--sp-8)' }}>
            <h4>Reduced motion is a hard gate</h4>
            <p style={{ fontSize: 14, color: 'var(--fg-secondary)' }}>
              Pinned stacks collapse into a normal vertical stack. Scrubbed video freezes at its poster with a manual play
              control. Lenis never initialises. This is not a degraded experience — it is a complete, static, readable page.
            </p>
          </div>
        </Section>
      </main>
    </div>
  )
}
