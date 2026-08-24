/* ============================================================
   DEV ONLY — production gate for the DE↔EN overlay.

   `process.env.NODE_ENV` is inlined by the bundler, so in a
   production build the condition below folds to `false`, the
   branch is pruned before module resolution, and neither the
   widget nor the dictionary is ever pulled into the graph.
   Verify with:  npm run build --prefix website
                 grep -r "Sicherheitstechnik nach Ihren" website/.next/static
   ============================================================ */

let DevTranslate = () => null

if (process.env.NODE_ENV !== 'production') {
  DevTranslate = require('./DevTranslate').default
}

export { DevTranslate }
