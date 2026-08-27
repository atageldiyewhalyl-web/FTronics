import { site } from '@/lib/site'

/* Web app manifest — mainly affects "Add to Home Screen" on Android/Chrome
   and how the site's tab/task-switcher entry looks. Uses the same icon files
   layout.jsx already declares in metadata.icons; no new assets needed.
   theme_color is the brand red from src/styles/tokens/colors.css
   (--ft-red-brand), kept in sync by hand since that file has no JS export. */
export default function manifest() {
  return {
    name: `${site.name} — Sicherheitstechnik ${site.city}`,
    short_name: site.altName,
    description:
      'Alarmanlagen, Videoüberwachung, Zutrittskontrolle & Brandschutz für Gewerbe und Privat in Mannheim und der Metropolregion Rhein-Neckar.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#eb0a16',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
