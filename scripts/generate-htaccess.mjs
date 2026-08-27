/* Generates deploy/.htaccess from src/lib/redirects.mjs.

   Only needed if the site keeps the current Apache host instead of
   being served by the Next.js runtime. If Next serves the site, the
   redirects() block in next.config.mjs already covers this and the
   generated file is unused.

   Run: npm run redirects:htaccess
*/
import fs from 'node:fs'
import path from 'node:path'
import { legacyRedirects } from '../src/lib/redirects.mjs'

const out = path.join(process.cwd(), 'deploy', '.htaccess')

const lines = [
  '# ============================================================',
  '# Legacy .html → clean URL redirects',
  '# GENERATED FILE — do not edit by hand.',
  '# Source: src/lib/redirects.mjs   Regenerate: npm run redirects:htaccess',
  '# ============================================================',
  '',
  '<IfModule mod_rewrite.c>',
  '  RewriteEngine On',
  '',
]

for (const { source, destination } of legacyRedirects) {
  const from = source.replace(/^\//, '').replace(/\./g, '\\.')
  lines.push(`  RewriteRule ^${from}$ ${destination} [R=301,L]`)
}

lines.push(
  '',
  '  # Safety net: any other legacy .html URL loses the extension.',
  '  # Product detail pages are excluded — they are all listed above.',
  '  RewriteCond %{REQUEST_URI} !^/produkt-detail-',
  '  RewriteRule ^(.+)\\.html$ /$1 [R=301,L]',
  '</IfModule>',
  ''
)

fs.mkdirSync(path.dirname(out), { recursive: true })
fs.writeFileSync(out, lines.join('\n'), 'utf8')
console.log(`Wrote ${legacyRedirects.length} redirects + 1 catch-all to ${out}`)
