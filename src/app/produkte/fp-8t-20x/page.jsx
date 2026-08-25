import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['fp-8t-20x']

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FP8T20XPage() {
  return <StandardProductPage product={product} />
}
