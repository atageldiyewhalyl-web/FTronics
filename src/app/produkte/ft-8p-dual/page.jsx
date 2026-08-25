import { StandardProductPage } from '@/components/standard-product-page'
import { productPageData } from '@/lib/product-page-data'

const product = productPageData['ft-8p-dual']

export const metadata = {
  title: product.metaTitle,
  description: product.metaDescription,
  alternates: { canonical: `/produkte/${product.slug}` },
}

export default function FT8PDUALPage() {
  return <StandardProductPage product={product} />
}
