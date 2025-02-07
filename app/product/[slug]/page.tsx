/*import { client } from "@/sanity/lib/client"
import type { Product } from "@/types/products"
import { groq } from "next-sanity"
import ProductDetail from "./product-detail"

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      _type,
      image,
      price,
      description,
      colors,
      sizes
    }`,
    { slug },
  )
}

export default async function ProductPage({ params }: ProductPageProps )  {
  
  const product = await getProduct(params.slug)
  return <ProductDetail product={product} />
  
  
}
*/

/*import { client } from "@/sanity/lib/client"
import type { Product } from "@/types/products"
import { groq } from "next-sanity"
import ProductDetail from "./product-detail"

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      _type,
      image,
      price,
      description,
      colors,
      sizes
    }`,
    { slug },
  )
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)
  return <ProductDetail product={product} />
}*/


import { client } from "@/sanity/lib/client"
import type { Product } from "@/types/products"
import { groq } from "next-sanity"
import ProductDetail from "./product-detail"

interface ProductPageProps {
  params: { slug: string }
}

async function getProduct(slug: string): Promise<Product> {
  return client.fetch(
    groq`*[_type == "product" && slug.current == $slug][0]{
      _id,
      productName,
      _type,
      image,
      price,
      description,
      colors,
      sizes
    }`,
    { slug },
  )
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.slug)

  // Add type check to ensure product exists
  if (!product) {
    return <div>Product not found</div>
  }

  return <ProductDetail product={product} />
}










