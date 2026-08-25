/* Shared spec marks.
   Lifted out of the home page so the product catalogue can draw its spec
   row from the same set — two icon systems for the same eleven ideas meant
   the two surfaces disagreed on what a sensor or a channel looks like. */

/* Marks for the three promises. Solid, and rounded by stroking each filled
   shape in its own colour with round joins: the stroke rides the silhouette,
   so every corner comes back rounded and the whole form fattens up a little at
   the same time. Drawing the same softness into the path data by hand would
   mean an arc at every junction, and it would have to be redrawn at each size.
   Nothing here ends in a point. */
export function IconMark({ children, size = 30 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  )
}

/* Spec marks for the product cards. Same construction as the marks above —
   solid shapes stroked in their own colour, nothing ending in a point — drawn
   at 15px to sit on a 12px line of text. Each one has to survive being read at
   a glance beside its own word, so they stay geometric: a frame, a drop, a
   spark, a bolt, a die, a figure. */
export const specMarks = {
  /* A frame, knocked through, for the picture's resolution. */
  res: (
    <IconMark size={15}>
      <path
        fillRule="evenodd"
        d="M4.6 5.4h14.8a2.2 2.2 0 0 1 2.2 2.2v8.8a2.2 2.2 0 0 1-2.2 2.2H4.6a2.2 2.2 0 0 1-2.2-2.2V7.6a2.2 2.2 0 0 1 2.2-2.2Zm.8 3a.9.9 0 0 0-.9.9v5.4a.9.9 0 0 0 .9.9h13.2a.9.9 0 0 0 .9-.9V9.3a.9.9 0 0 0-.9-.9H5.4Z"
      />
    </IconMark>
  ),
  /* A drop, for the weather it is sealed against. */
  weather: (
    <IconMark size={15}>
      <path d="M12 2.9a1.2 1.2 0 0 0-1 .6C9.5 6.2 6.1 9.7 6.1 13.3a5.9 5.9 0 0 0 11.8 0c0-3.6-3.4-7.1-4.9-9.8a1.2 1.2 0 0 0-1-.6Z" />
    </IconMark>
  ),
  /* A spark, for the part that does the thinking. */
  ai: (
    <IconMark size={15}>
      <path d="M12 3a1 1 0 0 1 1 .8l.8 3a3.2 3.2 0 0 0 2.4 2.4l3 .8a1 1 0 0 1 0 2l-3 .8a3.2 3.2 0 0 0-2.4 2.4l-.8 3a1 1 0 0 1-2 0l-.8-3a3.2 3.2 0 0 0-2.4-2.4l-3-.8a1 1 0 0 1 0-2l3-.8a3.2 3.2 0 0 0 2.4-2.4l.8-3A1 1 0 0 1 12 3Z" />
    </IconMark>
  ),
  /* A bolt, for the power that arrives down the same cable as the picture. */
  power: (
    <IconMark size={15}>
      <path d="M13.7 2.8a1 1 0 0 1 .9 1.3l-1.4 4.5h3.4a1.1 1.1 0 0 1 .9 1.8l-7 9.1a1 1 0 0 1-1.8-.9l1.4-4.7H6.7a1.1 1.1 0 0 1-.9-1.8l7-9a1 1 0 0 1 .9-.3Z" />
    </IconMark>
  ),
  /* A die, for the sensor the picture is made on. */
  sensor: (
    <IconMark size={15}>
      <path
        fillRule="evenodd"
        d="M8.6 4.2h6.8a4.4 4.4 0 0 1 4.4 4.4v6.8a4.4 4.4 0 0 1-4.4 4.4H8.6a4.4 4.4 0 0 1-4.4-4.4V8.6a4.4 4.4 0 0 1 4.4-4.4Zm.3 4a.9.9 0 0 0-.9.9v5.8a.9.9 0 0 0 .9.9h6.2a.9.9 0 0 0 .9-.9V9.1a.9.9 0 0 0-.9-.9H8.9Z"
      />
    </IconMark>
  ),
  /* A figure, for the face the camera is asked to know. */
  face: (
    <IconMark size={15}>
      <path d="M12 4.4a3.7 3.7 0 1 1 0 7.4 3.7 3.7 0 0 1 0-7.4Zm0 8.9c3.9 0 7.1 2 7.1 4.5a1.3 1.3 0 0 1-1.3 1.3H6.2a1.3 1.3 0 0 1-1.3-1.3c0-2.5 3.2-4.5 7.1-4.5Z" />
    </IconMark>
  ),
  /* A glass, for the reach a motorised lens has. */
  zoom: (
    <IconMark size={15}>
      <path
        fillRule="evenodd"
        d="M10.7 3.4a7.3 7.3 0 0 1 5.9 11.6l3.6 3.6a1.3 1.3 0 0 1-1.8 1.8l-3.6-3.6A7.3 7.3 0 1 1 10.7 3.4Zm0 2.6a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Z"
      />
    </IconMark>
  ),
  /* A moon, for the hours the picture still has to hold up. */
  night: (
    <IconMark size={15}>
      <path d="M20.2 14.5a1.1 1.1 0 0 0-1.4-1.4 6.7 6.7 0 0 1-8-8 1.1 1.1 0 0 0-1.4-1.4 8.7 8.7 0 1 0 10.8 10.8Z" />
    </IconMark>
  ),
  /* A horn, for the voice that goes back the other way. */
  audio: (
    <IconMark size={15}>
      <path d="M12.4 4.4a1.1 1.1 0 0 0-1.8-.8L6.8 6.9H4.6A1.7 1.7 0 0 0 2.9 8.6v6.8a1.7 1.7 0 0 0 1.7 1.7h2.2l3.8 3.3a1.1 1.1 0 0 0 1.8-.8V4.4Z" />
      <path d="M16 8.3a1.1 1.1 0 0 0-1.4 1.6 3.3 3.3 0 0 1 0 4.2A1.1 1.1 0 0 0 16 15.7a5.3 5.3 0 0 0 0-7.4Z" />
    </IconMark>
  ),
  /* Four panes, for the cameras a recorder is holding at once. */
  channels: (
    <IconMark size={15}>
      <path d="M5.6 4.4h3.2a1.3 1.3 0 0 1 1.3 1.3v3.2a1.3 1.3 0 0 1-1.3 1.3H5.6a1.3 1.3 0 0 1-1.3-1.3V5.7a1.3 1.3 0 0 1 1.3-1.3Zm9.6 0h3.2a1.3 1.3 0 0 1 1.3 1.3v3.2a1.3 1.3 0 0 1-1.3 1.3h-3.2a1.3 1.3 0 0 1-1.3-1.3V5.7a1.3 1.3 0 0 1 1.3-1.3ZM5.6 13.8h3.2a1.3 1.3 0 0 1 1.3 1.3v3.2a1.3 1.3 0 0 1-1.3 1.3H5.6a1.3 1.3 0 0 1-1.3-1.3v-3.2a1.3 1.3 0 0 1 1.3-1.3Zm9.6 0h3.2a1.3 1.3 0 0 1 1.3 1.3v3.2a1.3 1.3 0 0 1-1.3 1.3h-3.2a1.3 1.3 0 0 1-1.3-1.3v-3.2a1.3 1.3 0 0 1 1.3-1.3Z" />
    </IconMark>
  ),
  /* A shield, for what the housing is rated to survive. */
  shield: (
    <IconMark size={15}>
      <path d="M12 2.7a1.3 1.3 0 0 1 .5.1l6.2 2.5a1.3 1.3 0 0 1 .8 1.2v4.6c0 4.2-2.6 7.8-6.5 9.4a2 2 0 0 1-1.5 0c-3.9-1.6-6.5-5.2-6.5-9.4V6.5a1.3 1.3 0 0 1 .8-1.2l6.2-2.5a1.3 1.3 0 0 1 .5-.1Z" />
    </IconMark>
  ),
  /* Stacked platters, for where the footage lands. */
  storage: (
    <IconMark size={15}>
      <path d="M4.8 5.4h14.4a1.5 1.5 0 0 1 1.5 1.5v2.2a1.5 1.5 0 0 1-1.5 1.5H4.8a1.5 1.5 0 0 1-1.5-1.5V6.9a1.5 1.5 0 0 1 1.5-1.5Zm0 8h14.4a1.5 1.5 0 0 1 1.5 1.5v2.2a1.5 1.5 0 0 1-1.5 1.5H4.8a1.5 1.5 0 0 1-1.5-1.5v-2.2a1.5 1.5 0 0 1 1.5-1.5Z" />
    </IconMark>
  ),
}

/* ---------------- spec text -> mark ----------------
   Resolved from the spec string itself so each surface keeps one source of
   truth: the copy stays the copy, and the mark is derived from it. Order
   matters — "Motorzoom" has to reach `zoom` before "MP" reaches `res`, and
   "Gesichtserkennung" has to reach `face` before "erkennung" reaches `ai`. */
const specRules = [
  [/gesichtserkennung|face/, 'face'],
  [/zoom|\d\s*mm/, 'zoom'],
  [/^ip\d/, 'weather'],
  [/ik10|vandal|aluminium/, 'shield'],
  [/°c/, 'weather'],
  [/dual-light|ir\s*\d|\bnm\b|^bis\s/, 'night'],
  [/audio|spl/, 'audio'],
  [/kanäle|kanale|hybrid|channel/, 'channels'],
  [/sata|raid|anr/, 'storage'],
  [/poe|^\d+w$/, 'power'],
  [/sony|imx|cmos|starvis|f1\.|f\//, 'sensor'],
  [/ki-|vca|tracking|\bai\b|analytics|local|cloud/, 'ai'],
]

export function markFor(spec) {
  const t = spec.toLowerCase()
  const hit = specRules.find(([re]) => re.test(t))
  /* Everything left is a picture spec — resolution, frame rate, WDR, codec,
     the HDMI it comes out of — so the frame is the honest default. */
  return specMarks[hit ? hit[1] : 'res']
}
