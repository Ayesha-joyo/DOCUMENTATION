"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "../hooks/use-cart"
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group"
import { Label } from "../components/ui/label"
import { Button } from "../components/ui/button"
import Image from "next/image"

export default function CheckoutPage() {
  const router = useRouter()  // Keep it in case you need to redirect after the order is placed
  const { items } = useCart()
  const [paymentMethod, setPaymentMethod] = useState("bank-transfer")
  
  // Removed saveInfo and setSaveInfo as they are not being used
  // const [saveInfo, setSaveInfo] = useState(false) 

  const total = items.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission (for now, just log)
    console.log("Order placed")
    
    // Redirect after placing the order (example of using `router`)
    router.push("/thank-you") // You can change this to wherever you want to redirect after the order is placed.
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Billing Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Billing Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ... (rest of the form fields remain unchanged) ... */}
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold">Order Summary</h2>

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Payment Method</h3>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                <Label htmlFor="bank-transfer">Direct Bank Transfer</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="text-sm text-gray-600">
            Your personal data will be used to support your experience throughout this website, to manage access to your
            account, and for other purposes described in our privacy policy.
          </div>

          <Button
            type="submit"
            className="w-full transition-all duration-200 hover:bg-primary/90"
          >
            Place Order
          </Button>
        </div>
      </div>
    </div>
  )
}
