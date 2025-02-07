/*"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import type { Product } from "@/types/products"
import { useCart } from "@/app/hooks/use-cart"

interface ProductDetailProps  {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
    
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState("black")
  const [selectedSize, setSelectedSize] = useState("medium")
  const [quantity, setQuantity] = useState(1)
    
  const handleAddToCart = () => {
    addToCart({
        
      id: product._id,
      name: product.productName,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
    router.push("/cart")
  }


  // Rest of your existing ProductDetail component code...
};*/
"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { ProductDetailProps } from "@/types/products"
import { useCart } from "@/app/hooks/use-cart"
import { Button } from "@/app/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/components/ui/select"

export default function ProductDetail({ product }: ProductDetailProps) {
  const router = useRouter()
  const { addToCart } = useCart()
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "black")
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "medium")
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    addToCart({
      id: product._id,
      name: product.productName,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
    })
    router.push("/cart")
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          {product.image && (
            <Image
              src={urlFor(product.image).url() || "/placeholder.svg"}
              alt={product.productName}
              width={500}
              height={500}
              className="rounded-lg object-cover"
            />
          )}
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.productName}</h1>
          <p className="text-2xl font-semibold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>

          {product.colors && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Color:</h2>
              <Select value={selectedColor} onValueChange={setSelectedColor}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {product.colors.map((color) => (
                    <SelectItem key={color} value={color}>
                      {color}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {product.sizes && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Size:</h2>
              <Select value={selectedSize} onValueChange={setSelectedSize}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
                <SelectContent>
                  {product.sizes.map((size) => (
                    <SelectItem key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <h2 className="text-lg font-semibold mb-2">Quantity:</h2>
            <Select value={quantity.toString()} onValueChange={(value) => setQuantity(Number.parseInt(value, 10))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={handleAddToCart} className="mt-4">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}

