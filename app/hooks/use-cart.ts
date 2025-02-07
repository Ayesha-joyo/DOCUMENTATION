"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: any
  color: string
  size: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addToCart: (item: CartItem) => void
  updateQuantity: (item: CartItem, change: number) => void
  removeItem: (item: CartItem) => void
}

export const useCart = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      addToCart: (newItem) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.id === newItem.id && item.color === newItem.color && item.size === newItem.size,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item === existingItem ? { ...item, quantity: item.quantity + newItem.quantity } : item,
              ),
            }
          }

          return { items: [...state.items, newItem] }
        }),
      updateQuantity: (item, change) =>
        set((state) => ({
          items: state.items.map((i) => (i === item ? { ...i, quantity: Math.max(1, i.quantity + change) } : i)),
        })),
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i !== item),
        })),
    }),
    {
      name: "cart-storage",
    },
  ),
)

