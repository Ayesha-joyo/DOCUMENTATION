"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useCart } from "../hooks/use-cart"

export function OrderSummary() {
  const router = useRouter()
  const { items } = useCart()
  const [promoCode, setPromoCode] = useState("")

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const deliveryFee = 15
  const total = subtotal + deliveryFee

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    // Add promo code logic here
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow space-y-4">
      <h2 className="text-xl font-bold">Order Summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Delivery Fee</span>
          <span>${deliveryFee.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <form onSubmit={handleApplyPromo} className="space-y-2">
        <Input
          type="text"
          placeholder="Add promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="transition-all duration-200 hover:border-primary focus:border-primary"
        />
        <Button type="submit" variant="outline" className="w-full transition-all duration-200 hover:bg-primary/10">
          Apply
        </Button>
      </form>

      <Button
        className="w-full transition-all duration-200 hover:bg-primary/90"
        onClick={() => router.push("/checkout")}
      >
        Go to Checkout →
      </Button>
    </div>
  )
}



