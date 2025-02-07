"use client"

import { useCart } from "../hooks/use-cart"
import { CartItem } from "./cart-item"
import { OrderSummary } from "./order-summary"

export default function CartPage() {
  const { items } = useCart()

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">YOUR CART</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={`${item.id}-${item.color}-${item.size}`} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}

