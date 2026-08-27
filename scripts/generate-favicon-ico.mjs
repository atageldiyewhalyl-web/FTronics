/* Writes public/favicon.ico from public/icon.png.

   Why this exists: modern browsers use the metadata.icons config in
   layout.jsx (/icon.png), but browsers, RSS/feed readers, and some crawlers
   still request /favicon.ico directly and unconditionally as a fallback,
   with no <link> tag involved. Without a file at that exact path, those
   clients get nothing.

   sharp cannot encode .ico, so this hand-builds the file: an ICO container is
   a small binary header (ICONDIR + one ICONDIRENTRY) followed by raw image
   data, and the Vista-era ICO format allows that payload to be a plain PNG
   rather than the old uncompressed bitmap — every current browser reads that
   form. See https://en.wikipedia.org/wiki/ICO_(file_format)#Icon_resource_structure

   Run after replacing public/icon.png:  npm run favicon
*/
import fs from 'node:fs'
import sharp from 'sharp'

const SIZE = 64 // 0 in the 1-byte width/height field means 256; keep it real-valued

const png = await sharp('public/icon.png').resize(SIZE, SIZE).png().toBuffer()

const dir = Buffer.alloc(6)
dir.writeUInt16LE(0, 0) // reserved
dir.writeUInt16LE(1, 2) // type: 1 = icon
dir.writeUInt16LE(1, 4) // image count

const entry = Buffer.alloc(16)
entry.writeUInt8(SIZE, 0) // width
entry.writeUInt8(SIZE, 1) // height
entry.writeUInt8(0, 2) // color count (0 = no palette)
entry.writeUInt8(0, 3) // reserved
entry.writeUInt16LE(1, 4) // color planes
entry.writeUInt16LE(32, 6) // bits per pixel
entry.writeUInt32LE(png.length, 8) // payload size
entry.writeUInt32LE(6 + 16, 12) // payload offset — right after this header

fs.writeFileSync('public/favicon.ico', Buffer.concat([dir, entry, png]))
console.log(`wrote public/favicon.ico (${SIZE}x${SIZE}, ${png.length} bytes payload)`)
