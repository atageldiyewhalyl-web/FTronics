import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['fn-64-pro']

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FN64PROPage() {
  return <StandardProductPage product={product} />
}
