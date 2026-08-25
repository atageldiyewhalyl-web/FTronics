import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['fb-8a-max']

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FB8AMaxPage() {
  return <StandardProductPage product={product} />
}
