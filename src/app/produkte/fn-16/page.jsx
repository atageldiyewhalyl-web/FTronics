import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['fn-16']

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FN16Page() {
  return <StandardProductPage product={product} />
}
