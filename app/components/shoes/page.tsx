"use client"

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { allProducts } from "@/sanity/lib/querries"
import type { Product } from "@/types/products"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const SHOES = () => {
  const [product, setProduct] = useState<Product[]>([])

  useEffect(() => {
    async function fetchproduct() {
      const fetchedProduct: Product[] = await client.fetch(allProducts)
      setProduct(fetchedProduct)
    }
    fetchproduct()
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Our Latest Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {product.map((product) => (
          <Link
            href={`/product/${product.slug.current}`}
            key={product._id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            {product.image && (
              <Image
                src={urlFor(product.image).url() || "/placeholder.svg"}
                alt={product.productName}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-md"
              />
            )}
            <h2 className="text-lg font-semibold mt-4">{product.productName}</h2>
            <p className="text-gray-500 mt-2">{product.price ? `$${product.price}` : "Price not available"}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default SHOES


