/* ============================================================
   DEV ONLY — DE↔EN preview engine.

   Walks the live DOM, swaps German text nodes and translatable
   attributes for their English counterparts, and can put every
   original back byte-for-byte. Nothing here is imported by the
   production bundle; see src/dev/index.js for the gate.

   Design notes
   -----------
   · Originals live in WeakMaps keyed by the node itself, so revert
     is exact and nothing leaks when a node is garbage-collected.
   · Text nodes keep their leading/trailing whitespace. React splits
     "Foo <b>bar</b> baz" into separate text nodes and that padding
     is what holds the words apart — collapsing it glues them.
   · Lookup is on the whitespace-collapsed string, which is also the
     key format the dictionary is authored in.
   ============================================================ */

import { de2en, neutral } from './dictionary'

export const ATTRS = ['alt', 'aria-label', 'placeholder', 'title']

/** Dictionary key format: collapse all whitespace runs, trim the ends. */
export const norm = (s) => s.replace(/\s+/g, ' ').trim()

/**
 * Subtrees that never hold translatable copy (or are the tool itself).
 *
 * TITLE/META/LINK are in here because the App Router renders document
 * metadata *inside <body>* — React hoists it logically, but in the DOM the
 * <title> sits in the body where the tree walker would otherwise swap its
 * text directly, behind applyTitle's back.
 */
const SKIP_TAGS = new Set([
  'SCRIPT', 'STYLE', 'NOSCRIPT', 'CODE', 'PRE',
  'HEAD', 'TITLE', 'META', 'LINK', 'BASE',
])
const isSkipped = (el) =>
  !el || SKIP_TAGS.has(el.tagName) || el.closest('[data-ft-devtranslate]') !== null

/** Worth translating at all? Needs a letter and some substance. */
const translatable = (t) => t.length >= 2 && /[A-Za-zÄÖÜäöüß]/.test(t) && !/^https?:\/\//.test(t)

/*
 * Both maps store { original, applied }: what the node said before we touched
 * it, and what we wrote. React reuses the same text node when a component
 * re-renders with different copy — the configurator's step label is one node
 * for all four steps — so "have we handled this node?" has to mean "is it
 * still showing what we wrote?", not merely "have we seen it?". Otherwise the
 * second step's German is skipped forever, and reverting would restore the
 * first step's text over it.
 */
let originalText = new WeakMap() // Text    -> { original, applied }
let originalAttrs = new WeakMap() // Element -> { attr: { original, applied } }
const originalTitle = { original: null, applied: null }

/* ---------- lookup ---------------------------------------------------- */

/** Everything the dictionary can produce, for the already-English check. */
const englishValues = new Set(Object.values(de2en))

/**
 * @returns {{ status: 'hit'|'neutral'|'miss', en?: string }}
 * `en` is absent when the string needs no swap: either it is already the
 * English we would have produced (Fast Refresh reloads this module while the
 * DOM stays translated) or it reads the same in both languages — model
 * numbers, spec values, units. Both are a pass, not a gap.
 */
export function lookup(key) {
  if (Object.prototype.hasOwnProperty.call(de2en, key)) return { status: 'hit', en: de2en[key] }
  if (englishValues.has(key)) return { status: 'hit' }
  if (neutral.has(key)) return { status: 'neutral' }
  return { status: 'miss' }
}

/* ---------- apply / revert -------------------------------------------- */

function swapText(node, en) {
  const raw = node.nodeValue
  const lead = raw.match(/^\s*/)[0]
  const tail = raw.match(/\s*$/)[0]
  const applied = lead + en + tail
  originalText.set(node, { original: raw, applied })
  node.nodeValue = applied
}

/** True while the node still shows exactly what we last wrote into it. */
const isOurs = (node) => originalText.get(node)?.applied === node.nodeValue

function textNodesIn(root) {
  const out = []
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) =>
      isSkipped(n.parentElement) || !translatable(norm(n.nodeValue))
        ? NodeFilter.FILTER_REJECT
        : NodeFilter.FILTER_ACCEPT,
  })
  let n
  while ((n = walker.nextNode())) out.push(n)
  return out
}

function elementsWithAttrs(root) {
  const sel = ATTRS.map((a) => `[${a}]`).join(',')
  const out = root.nodeType === Node.ELEMENT_NODE && root.matches?.(sel) ? [root] : []
  if (root.querySelectorAll) out.push(...root.querySelectorAll(sel))
  return out.filter((el) => !isSkipped(el))
}

/**
 * Translate everything under `root` in place.
 *
 * Status is recorded per unique string in `seen`, not per node, because
 * `applyTo` runs again on every DOM change: a node already swapped is
 * skipped, but a neutral or missing one is met again each pass, and
 * per-pass counters would keep inflating.
 *
 * @param {Node} root
 * @param {{ mark?: boolean, seen?: Map<string, 'hit'|'neutral'|'miss'> }} opts
 */
export function applyTo(root, { mark = false, seen } = {}) {
  const record = (key, status, el) => {
    if (seen) seen.set(key, status)
    if (mark && el && status !== 'neutral') el.setAttribute('data-ftt', status)
  }

  for (const node of textNodesIn(root)) {
    if (isOurs(node)) {
      // Nothing to redo, but it is still a hit: keep it in the tally and let
      // the highlight pass outline it, keyed on the German it replaced.
      record(norm(originalText.get(node).original), 'hit', node.parentElement)
      continue
    }
    const key = norm(node.nodeValue)
    const { status, en } = lookup(key)
    if (status === 'hit' && en !== undefined) swapText(node, en)
    record(key, status, node.parentElement)
  }

  for (const el of elementsWithAttrs(root)) {
    for (const attr of ATTRS) {
      if (!el.hasAttribute(attr)) continue
      const raw = el.getAttribute(attr)
      const ours = originalAttrs.get(el)?.[attr]
      if (ours?.applied === raw) {
        record(norm(ours.original), 'hit', null)
        continue
      }
      const key = norm(raw)
      if (!translatable(key)) continue
      const { status, en } = lookup(key)
      if (status === 'hit' && en !== undefined) {
        const store = originalAttrs.get(el) || {}
        store[attr] = { original: raw, applied: en }
        originalAttrs.set(el, store)
        el.setAttribute(attr, en)
      }
      record(key, status, null)
    }
  }
}

/** Put every original back. Safe to call when nothing was translated. */
export function revertAll(root = document.body) {
  for (const node of textNodesIn(root)) {
    // Only undo our own swap; if React has since written something else there,
    // that value is already the current German and must be left alone.
    if (isOurs(node)) node.nodeValue = originalText.get(node).original
  }
  const sel = ATTRS.map((a) => `[${a}]`).join(',')
  for (const el of root.querySelectorAll(sel)) {
    const store = originalAttrs.get(el)
    if (!store) continue
    for (const [attr, v] of Object.entries(store)) {
      if (el.getAttribute(attr) === v.applied) el.setAttribute(attr, v.original)
    }
  }
  originalText = new WeakMap()
  originalAttrs = new WeakMap()
  for (const el of root.querySelectorAll('[data-ftt]')) el.removeAttribute('data-ftt')
  if (originalTitle.applied !== null && document.title === originalTitle.applied) {
    document.title = originalTitle.original
  }
  originalTitle.original = originalTitle.applied = null
  document.documentElement.lang = 'de'
}

/** Translate <title> too — it shows in the tab and is easy to forget. */
export function applyTitle(seen) {
  // Re-check rather than latch: the App Router re-renders <title> after
  // hydration and on every route change, overwriting what we set.
  if (originalTitle.applied !== null && document.title === originalTitle.applied) return
  const key = norm(document.title)
  if (!translatable(key)) return
  const { status, en } = lookup(key)
  if (status === 'hit' && en !== undefined) {
    originalTitle.original = document.title
    originalTitle.applied = en
    document.title = en
  }
  if (seen) seen.set(key, status)
}

/** Full-page pass. Fills `seen` with the status of every string handled. */
export function translatePage(seen, { mark = false } = {}) {
  applyTo(document.body, { mark, seen })
  applyTitle(seen)
  document.documentElement.lang = 'en'
}

/** Every string the current page shows, with its status — read-only. */
export function scanPage() {
  const seen = new Map()
  for (const node of textNodesIn(document.body)) {
    const key = norm(node.nodeValue)
    if (!seen.has(key)) seen.set(key, lookup(key).status)
  }
  for (const el of elementsWithAttrs(document.body)) {
    for (const attr of ATTRS) {
      if (!el.hasAttribute(attr)) continue
      const key = norm(el.getAttribute(attr))
      if (translatable(key) && !seen.has(key)) seen.set(key, lookup(key).status)
    }
  }
  const titleKey = norm(document.title)
  if (translatable(titleKey) && !seen.has(titleKey)) seen.set(titleKey, lookup(titleKey).status)
  return seen
}
