import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['fe-6l']

export const metadata = {
  /* `absolute`: the title already opens with the FTronics brand, so the
     root layout's " | FT Sicherheitstechnik" suffix would only repeat it
     and push the tag past the SERP truncation point. */
  title: { absolute: product.metaTitle },
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FE6LPage() {
  return <StandardProductPage product={product} />
}
