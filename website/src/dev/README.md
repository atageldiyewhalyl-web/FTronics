# DE ↔ EN preview overlay (development only)

A floating switch that flips the rendered page between the German source copy
and an English preview. It exists so the site can be read, reviewed and
screenshotted in English without touching the pages themselves — the German
JSX stays the single source of truth.

## Using it

The pill sits bottom-left on every page while `next dev` is running.

| | |
|---|---|
| **DE / EN** | flip the page; the choice survives reloads and route changes |
| **⌘⇧L** (`Ctrl+Shift+L`) | same flip from the keyboard |
| **percentage** | dictionary coverage for the current page; amber when something is missing |
| **▴ / ▾** | open the panel |
| **grip** | drag the tool out of the way; the position is remembered |

The panel breaks coverage into **translated**, **language-neutral** (model
numbers, spec values, units — correct as-is in both languages) and
**missing**, lists every string the dictionary does not have, and copies them
as ready-to-paste entries. **Outline** marks each translated string green and
each missing one amber directly on the page. **Rescan** rebuilds the tally
from what is on screen right now.

## Adding translations

Everything lives in [`dictionary.js`](./dictionary.js), keyed by the exact
on-page string with whitespace collapsed:

```js
export const de2en = {
  "Jetzt Anfrage starten": "Start your enquiry now",
}
```

Walk the site with the tool open, hit **Copy as entries**, paste the result
into `de2en` and fill in the English side. Strings that should stay untouched
go in the `neutral` set instead.

Coverage is complete for every route as of writing, including the
configurator's later steps and the form success states, which never appear in
the server-rendered HTML.

## Why it cannot ship

`src/app/layout.jsx` renders `<DevTranslate />` from [`index.js`](./index.js),
which resolves to a no-op when `NODE_ENV === 'production'`. The bundler
inlines that constant and prunes the branch before module resolution, so the
widget, the engine and the dictionary never enter the production graph.

Verified against a real build — no widget markup, no dictionary, no English
strings in the output:

```bash
npm run build --prefix website && grep -rl "data-ft-devtranslate\|de2en" website/.next
```

## Notes

- Legal pages (Impressum, Datenschutz, AGB) are translated **for preview
  only**. The German text is the binding version.
- The engine swaps text nodes and the `alt`, `aria-label`, `placeholder` and
  `title` attributes, plus `document.title`, and restores every original
  exactly on switching back.
