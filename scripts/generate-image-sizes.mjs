/* Writes src/lib/image-sizes.js — the intrinsic pixel dimensions of every
   file in public/, so <Image> can be given a true width/height without each
   component hardcoding numbers that silently rot when art is replaced.

   Why a generated map rather than <Image fill>: several hero images are sized
   by CSS media queries (see .ft-phero-img in globals.css, which changes both
   height and object-position below the tablet breakpoint). `fill` writes
   position and box size as INLINE styles, and inline beats a class — so it
   overrides those media queries and the mobile crop is lost. Passing real
   width/height keeps layout entirely in the stylesheet.

   Run after adding or replacing anything in public/:  npm run images:sizes
*/
import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const PUBLIC = 'public'
const OUT = path.join('src', 'lib', 'image-sizes.js')

const files = fs
  .readdirSync(PUBLIC)
  .filter((f) => /\.(webp|png|jpe?g|avif)$/i.test(f))
  .sort()

const entries = []
for (const f of files) {
  const { width, height } = await sharp(path.join(PUBLIC, f)).metadata()
  if (width && height) entries.push([`/${f}`, width, height])
}

const body = entries.map(([p, w, h]) => `  '${p}': [${w}, ${h}],`).join('\n')

fs.writeFileSync(
  OUT,
  `/* GENERATED FILE — do not edit by hand.
   Source: scripts/generate-image-sizes.mjs   Regenerate: npm run images:sizes
   Intrinsic [width, height] of every image in public/. */

const sizes = {
${body}
}

/* Spread into <Image>: <Image src={src} {...sizeOf(src)} … />
   Falls back to a 16:9 box for a path that is not in the map, so a missing
   entry degrades to a slightly wrong aspect rather than a build failure. */
export function sizeOf(src) {
  const found = sizes[src]
  if (!found) return { width: 1600, height: 900 }
  return { width: found[0], height: found[1] }
}

export default sizes
`,
  'utf8'
)

console.log(`wrote ${entries.length} image dimensions to ${OUT}`)
