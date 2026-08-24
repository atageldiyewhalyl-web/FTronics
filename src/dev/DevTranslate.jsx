'use client'

/* ============================================================
   DEV ONLY — the floating DE↔EN switch.

   Never rendered in a production build: src/dev/index.js resolves
   to a no-op component when NODE_ENV === 'production', so neither
   this file nor the dictionary reaches the shipped bundle.

   · Click DE / EN, or press ⌘⇧L (Ctrl+Shift+L), to flip the page.
   · Expand the panel for per-page coverage, a list of strings the
     dictionary is still missing, and a one-click copy of them as
     ready-to-paste dictionary entries.
   · Drag the grip to move it; the corner is remembered.
   ============================================================ */

import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { applyTo, revertAll, scanPage, translatePage } from './engine'

const STORE_KEY = 'ft-dev-translate'

/**
 * Keep the tool on screen. The position is remembered, so a spot that was
 * fine on a wide window can sit far past the right edge on a narrow one —
 * which strands the tool where nobody can reach it. Clamped on restore, on
 * resize and while dragging.
 *
 * Measured from the element rather than assumed: the bar is ~196px wide and
 * much taller again with the panel open, so a fixed guess leaves it hanging
 * over the edge.
 */
const clampPos = ({ x, y }, el) => {
  const w = el?.offsetWidth || 196
  const h = el?.offsetHeight || 41
  return {
    x: Math.max(8, Math.min(window.innerWidth - w - 8, x)),
    y: Math.max(8, Math.min(window.innerHeight - h - 8, y)),
  }
}

const readStore = () => {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || '{}')
  } catch {
    return {}
  }
}

export default function DevTranslate() {
  const pathname = usePathname()
  const rootRef = useRef(null)

  const [ready, setReady] = useState(false)
  const [lang, setLang] = useState('de')
  const [open, setOpen] = useState(false)
  const [mark, setMark] = useState(false)
  const [pos, setPos] = useState({ x: 16, y: 16 })
  const [counts, setCounts] = useState({ hits: 0, neutral: 0, misses: 0 })
  const [missList, setMissList] = useState([])
  const [copied, setCopied] = useState(false)

  // Refs the MutationObserver reads — it must not re-subscribe on every render.
  const langRef = useRef(lang)
  const markRef = useRef(mark)
  const applying = useRef(false)
  // key -> 'hit' | 'neutral' | 'miss', accumulated across passes. Counting
  // unique strings rather than nodes is what keeps repeat passes honest: a
  // node already swapped is skipped, but a neutral one is met again each time.
  const seen = useRef(new Map())
  langRef.current = lang
  markRef.current = mark

  /* ---------- persistence (after mount, so SSR and CSR agree) ---------- */
  useEffect(() => {
    const s = readStore()
    if (s.lang === 'en') setLang('en')
    if (s.open) setOpen(true)
    if (s.mark) setMark(true)
    if (s.pos && typeof s.pos.x === 'number') setPos(s.pos)
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORE_KEY, JSON.stringify({ lang, open, mark, pos }))
  }, [ready, lang, open, mark, pos])

  /* ---------- translation passes -------------------------------------- */

  const publish = useCallback(() => {
    const c = { hits: 0, neutral: 0, misses: 0 }
    const missing = []
    for (const [key, status] of seen.current) {
      if (status === 'hit') c.hits++
      else if (status === 'neutral') c.neutral++
      else {
        c.misses++
        missing.push(key)
      }
    }
    setCounts(c)
    setMissList(missing.sort((a, b) => a.localeCompare(b, 'de')))
  }, [])

  /** Translate whatever is still German. Safe to call repeatedly. */
  const pass = useCallback(
    (reset) => {
      applying.current = true
      if (reset) seen.current = new Map()
      translatePage(seen.current, { mark: markRef.current })
      applying.current = false
      publish()
    },
    [publish]
  )

  /** Coverage preview while the page is still German — read-only. */
  const preview = useCallback(() => {
    seen.current = scanPage()
    publish()
  }, [publish])

  /* ---------- react to language + route ------------------------------- */
  useEffect(() => {
    if (!ready) return
    if (lang === 'en') pass(true)
    else {
      applying.current = true
      revertAll()
      applying.current = false
      preview()
    }
    // Route changes swap the whole <main>, so this has to re-run per path.
  }, [ready, lang, pathname, pass, preview])

  /* ---------- highlight toggle ---------------------------------------- */
  useEffect(() => {
    if (!ready || lang !== 'en') return
    if (!mark) {
      document.querySelectorAll('[data-ftt]').forEach((el) => el.removeAttribute('data-ftt'))
    } else {
      applying.current = true
      applyTo(document.body, { mark: true })
      applying.current = false
    }
  }, [ready, mark, lang])

  /* ---------- catch client-rendered content ---------------------------- */
  useEffect(() => {
    if (!ready) return
    let timer = 0
    const obs = new MutationObserver(() => {
      if (applying.current || langRef.current !== 'en') return
      clearTimeout(timer)
      timer = setTimeout(() => pass(false), 200)
    })
    obs.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => {
      clearTimeout(timer)
      obs.disconnect()
    }
  }, [ready, pass])

  /* ---------- ⌘⇧L / Ctrl+Shift+L --------------------------------------- */
  useEffect(() => {
    const onKey = (e) => {
      if (e.shiftKey && (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'l') {
        e.preventDefault()
        setLang((l) => (l === 'de' ? 'en' : 'de'))
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Once the bar is on the page its real size is known, so a restored
  // position can be pulled back into view; same again whenever the window
  // changes size, or when opening the panel makes it taller.
  useEffect(() => {
    if (!ready) return
    const settle = () => setPos((p) => clampPos(p, rootRef.current))
    settle()
    window.addEventListener('resize', settle)
    return () => window.removeEventListener('resize', settle)
  }, [ready, open])

  /* ---------- drag ------------------------------------------------------ */
  const drag = useRef(null)
  const onPointerDown = (e) => {
    drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    setPos(clampPos({ x: e.clientX - drag.current.dx, y: e.clientY - drag.current.dy }, rootRef.current))
  }
  const onPointerUp = () => {
    drag.current = null
  }

  const copyMisses = async () => {
    const body = missList.map((k) => `  ${JSON.stringify(k)}: ${JSON.stringify(k)},`).join('\n')
    await navigator.clipboard.writeText(body)
    setCopied(true)
    setTimeout(() => setCopied(false), 1600)
  }

  if (!ready) return null

  const total = counts.hits + counts.neutral + counts.misses
  const pct = total ? Math.round(((counts.hits + counts.neutral) / total) * 100) : 100

  return (
    <div
      ref={rootRef}
      data-ft-devtranslate=""
      className="ftt-root"
      style={{ left: pos.x, bottom: pos.y }}
      lang="en"
      translate="no"
    >
      <style>{CSS}</style>

      <div className="ftt-bar">
        <button
          className="ftt-grip"
          type="button"
          title="Drag to move"
          aria-label="Move the translation tool"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span /><span /><span /><span /><span /><span />
        </button>

        <div className="ftt-seg" role="group" aria-label="Preview language">
          {['de', 'en'].map((code) => (
            <button
              key={code}
              type="button"
              className={`ftt-segbtn${lang === code ? ' is-on' : ''}`}
              aria-pressed={lang === code}
              onClick={() => setLang(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>

        <span className={`ftt-pct${counts.misses ? ' is-warn' : ''}`} title="Dictionary coverage on this page">
          {pct}%
        </span>

        <button
          className="ftt-toggle"
          type="button"
          aria-expanded={open}
          aria-label={open ? 'Collapse panel' : 'Expand panel'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '▾' : '▴'}
        </button>
      </div>

      {open && (
        <div className="ftt-panel">
          <div className="ftt-meter" aria-hidden="true">
            <i style={{ flex: counts.hits || 0 }} className="ftt-m-hit" />
            <i style={{ flex: counts.neutral || 0 }} className="ftt-m-neu" />
            <i style={{ flex: counts.misses || 0 }} className="ftt-m-miss" />
          </div>

          <ul className="ftt-legend">
            <li><b className="ftt-m-hit" />{counts.hits} translated</li>
            <li><b className="ftt-m-neu" />{counts.neutral} language-neutral</li>
            <li><b className="ftt-m-miss" />{counts.misses} missing</li>
          </ul>

          <div className="ftt-row">
            <label className="ftt-check">
              <input type="checkbox" checked={mark} onChange={(e) => setMark(e.target.checked)} />
              Outline translated / missing on the page
            </label>
            {/* The tally accumulates, so copy that has since left the page would
                otherwise linger in the list. Rescan rebuilds it from scratch. */}
            <button
              type="button"
              className="ftt-copy"
              title="Rebuild the tally from what is on the page right now"
              onClick={() => (lang === 'en' ? pass(true) : preview())}
            >
              Rescan
            </button>
          </div>

          {missList.length > 0 ? (
            <>
              <div className="ftt-misshead">
                <span>Not in the dictionary</span>
                <button type="button" className="ftt-copy" onClick={copyMisses}>
                  {copied ? 'Copied' : 'Copy as entries'}
                </button>
              </div>
              <ol className="ftt-misslist">
                {missList.slice(0, 60).map((k) => (
                  <li key={k} title={k}>{k}</li>
                ))}
              </ol>
              {missList.length > 60 && <p className="ftt-more">+{missList.length - 60} more — use Copy</p>}
            </>
          ) : (
            <p className="ftt-clean">Every string on this page is covered.</p>
          )}

          <p className="ftt-foot">
            Dev-only overlay · <kbd>⌘⇧L</kbd> toggles · edit <code>src/dev/dictionary.js</code>
          </p>
        </div>
      )}
    </div>
  )
}

const CSS = `
.ftt-root{position:fixed;z-index:2147483000;font:500 12px/1.4 ui-sans-serif,-apple-system,"Segoe UI",sans-serif;color:#e8eaed;-webkit-font-smoothing:antialiased}
.ftt-root *{box-sizing:border-box}
.ftt-bar{display:flex;align-items:center;gap:8px;padding:6px 8px;background:#16181c;border:1px solid #2c3036;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.38)}
.ftt-grip{display:grid;grid-template-columns:repeat(2,3px);gap:3px;padding:6px 4px;background:none;border:0;cursor:grab;touch-action:none}
.ftt-grip:active{cursor:grabbing}
.ftt-grip span{width:3px;height:3px;border-radius:50%;background:#5b626b}
.ftt-seg{display:flex;background:#0e1013;border:1px solid #2c3036;border-radius:7px;overflow:hidden}
.ftt-segbtn{padding:4px 11px;background:none;border:0;color:#8b939c;font:inherit;font-weight:700;letter-spacing:.04em;cursor:pointer}
.ftt-segbtn.is-on{background:#eb0a16;color:#fff}
.ftt-pct{min-width:34px;text-align:right;color:#7fd18f;font-variant-numeric:tabular-nums}
.ftt-pct.is-warn{color:#f0b33c}
.ftt-toggle{width:22px;height:22px;background:none;border:0;color:#8b939c;font-size:11px;cursor:pointer}
.ftt-panel{width:320px;margin-top:6px;padding:12px;background:#16181c;border:1px solid #2c3036;border-radius:10px;box-shadow:0 8px 28px rgba(0,0,0,.38)}
.ftt-meter{display:flex;height:5px;gap:2px;border-radius:3px;overflow:hidden;background:#0e1013}
.ftt-meter i{display:block}
.ftt-m-hit{background:#3f9e5a}.ftt-m-neu{background:#495159}.ftt-m-miss{background:#d8a12a}
.ftt-legend{display:flex;flex-wrap:wrap;gap:4px 12px;margin:8px 0 10px;padding:0;list-style:none;color:#a8b0b9;font-size:11px}
.ftt-legend li{display:flex;align-items:center;gap:5px}
.ftt-legend b{width:8px;height:8px;border-radius:2px}
.ftt-row{display:flex;align-items:center;justify-content:space-between;gap:10px}
.ftt-check{display:flex;align-items:center;gap:7px;color:#a8b0b9;font-size:11px;cursor:pointer}
.ftt-check input{accent-color:#eb0a16;margin:0}
.ftt-misshead{display:flex;align-items:center;justify-content:space-between;margin:12px 0 6px;color:#a8b0b9;font-size:11px;text-transform:uppercase;letter-spacing:.06em}
.ftt-copy{padding:3px 8px;background:#23272d;border:1px solid #343a41;border-radius:5px;color:#e8eaed;font:inherit;font-size:10px;text-transform:none;letter-spacing:0;cursor:pointer}
.ftt-copy:hover{background:#2c3138}
.ftt-misslist{max-height:210px;margin:0;padding:0 0 0 4px;overflow:auto;list-style:none;font-size:11px;color:#c9d0d7}
.ftt-misslist li{padding:3px 0;border-bottom:1px solid #23262b;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ftt-misslist em{color:#6d757e;font-style:normal}
.ftt-more,.ftt-clean{margin:8px 0 0;color:#8b939c;font-size:11px}
.ftt-foot{margin:12px 0 0;padding-top:9px;border-top:1px solid #23262b;color:#6d757e;font-size:10px}
.ftt-foot kbd,.ftt-foot code{background:#0e1013;border:1px solid #2c3036;border-radius:3px;padding:1px 4px;font-size:10px}
[data-ftt="hit"]{outline:1px dashed rgba(63,158,90,.75);outline-offset:2px}
[data-ftt="miss"]{outline:1px dashed rgba(216,161,42,.95);outline-offset:2px;background:rgba(216,161,42,.10)}
`
