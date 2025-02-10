import Image from "next/image"
import { X } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { Button } from "../components/ui/button"
import { useCart } from "../hooks/use-cart"
import type { CartItem } from "../hooks/use-cart"

interface CartItemProps {
  item: CartItem
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  // Check if image is available, and fallback to placeholder if not
  const imageUrl = item.image ? urlFor(item.image).url() : "/placeholder.svg"

  return (
    <div className="flex gap-4 items-center p-4 bg-white rounded-lg shadow">
      <div className="relative w-24 h-24">
        <Image
          src={imageUrl}
          alt={item.name}
          fill
          className="object-cover rounded"
        />
      </div>

      <div className="flex-1">
        <h3 className="font-semibold">{item.name}</h3>
        <p className="text-sm text-gray-600">
          Size: {item.size} | Color: {item.color}
        </p>

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center border rounded">
            <button
              onClick={() => updateQuantity(item, -1)}
              className="px-3 py-1 hover:bg-gray-100"
              disabled={item.quantity <= 1}
            >
              -
            </button>
            <span className="px-3 py-1">{item.quantity}</span>
            <button onClick={() => updateQuantity(item, 1)} className="px-3 py-1 hover:bg-gray-100">
              +
            </button>
          </div>
          <span className="font-semibold">${item.price * item.quantity}</span>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeItem(item)}
        className="text-gray-400 hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
