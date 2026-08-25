import { site } from '@/lib/site'

const routes = [
  ['/', 1.0, 'weekly'],
  ['/loesungen-privat', 0.9, 'weekly'],
  ['/loesungen-gewerbe', 0.9, 'weekly'],
  ['/produkte', 0.85, 'weekly'],
  ['/produkte/fc-8d-pro', 0.8, 'weekly'],
  ['/produkte/fc-8d', 0.8, 'weekly'],
  ['/produkte/fc-8d-zoom', 0.8, 'weekly'],
  ['/produkte/fc-6z-mini', 0.8, 'weekly'],
  ['/produkte/fb-8a-pro', 0.8, 'weekly'],
  ['/produkte/fb-8a-max', 0.8, 'weekly'],
  ['/produkte/fb-8b', 0.8, 'weekly'],
  ['/produkte/ft-8c-pro', 0.8, 'weekly'],
  ['/produkte/ft-8p-dual', 0.8, 'weekly'],
  ['/produkte/fp-8t-20x', 0.8, 'weekly'],
  ['/produkte/fp-8s-25x', 0.8, 'weekly'],
  ['/produkte/fe-6l', 0.8, 'weekly'],
  ['/produkte/fn-8', 0.8, 'weekly'],
  ['/produkte/fn-16', 0.8, 'weekly'],
  ['/produkte/fn-32', 0.8, 'weekly'],
  ['/produkte/fn-64-pro', 0.8, 'weekly'],
  ['/produkte/fr-8x', 0.8, 'weekly'],
  ['/produkte/fs-30', 0.8, 'weekly'],
  ['/konfigurator', 0.8, 'monthly'],
  ['/kontakt', 0.8, 'monthly'],
  ['/faq', 0.7, 'monthly'],
  ['/ratgeber', 0.7, 'monthly'],
  ['/support', 0.6, 'monthly'],
  ['/partner', 0.6, 'monthly'],
  ['/ueber-uns', 0.6, 'monthly'],
  ['/karriere', 0.5, 'monthly'],
]

export default function sitemap() {
  const now = new Date()
  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
