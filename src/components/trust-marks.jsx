import { IconMark } from '@/components/spec-marks'

/**
 * TrustMarks — the three claims both solution pages open with.
 *
 * Mark and word rather than three pills: a chip is a tag on a thing, and the
 * catalogue puts them on products — these are claims about the company, which
 * is what the marks are for. Drawn at 15px so they sit on their own line of
 * text; the shapes are the home page's own region, star and shield, because
 * two drawings of the same idea is how two surfaces start disagreeing.
 */
const marks = [
  [
    <IconMark size={15} key="m">
      <path
        fillRule="evenodd"
        d="M12 2.6a7.5 7.5 0 0 0-7.5 7.5c0 5.2 6.4 10.8 6.7 11a1.2 1.2 0 0 0 1.6 0c.3-.2 6.7-5.8 6.7-11A7.5 7.5 0 0 0 12 2.6Zm0 4.9a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Z"
      />
    </IconMark>,
    'Vor-Ort-Service',
  ],
  [
    <IconMark size={15} key="m">
      <path d="M12 2.9a.9.9 0 0 1 .8.5l2.3 4.7 5.1.7a.9.9 0 0 1 .5 1.6l-3.7 3.6.9 5.1a.9.9 0 0 1-1.3 1L12 18.7l-4.6 2.4a.9.9 0 0 1-1.3-1l.9-5.1-3.7-3.6a.9.9 0 0 1 .5-1.6l5.1-.7 2.3-4.7a.9.9 0 0 1 .8-.5Z" />
    </IconMark>,
    'Top 100 Deutschlands',
  ],
  [
    <IconMark size={15} key="m">
      <path
        fillRule="evenodd"
        d="M11.5 2.6a1.4 1.4 0 0 1 1 0l6.4 2.5a1.4 1.4 0 0 1 .9 1.3v4.9c0 4.5-3 7.7-7.3 9.5a1.4 1.4 0 0 1-1 0c-4.3-1.8-7.3-5-7.3-9.5V6.4a1.4 1.4 0 0 1 .9-1.3l6.4-2.5Zm4 6.7a1.1 1.1 0 0 0-1.6 0l-3.2 3.2-1.1-1.1a1.1 1.1 0 0 0-1.6 1.6l1.9 1.9a1.1 1.1 0 0 0 1.6 0l4-4a1.1 1.1 0 0 0 0-1.6Z"
      />
    </IconMark>,
    'DSGVO-konform',
  ],
]

export function TrustMarks(props) {
  return (
    <div className="ft-marks" {...props}>
      {marks.map(([mark, label]) => (
        <span className="ft-spec" key={label}>{mark}{label}</span>
      ))}
    </div>
  )
}
