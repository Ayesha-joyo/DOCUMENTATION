"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string | undefined  // Change 'any' to string or undefined (assuming the image is a URL or undefined)
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
            (item) =>
              item.id === newItem.id &&
              item.color === newItem.color &&
              item.size === newItem.size,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === existingItem.id && item.color === existingItem.color && item.size === existingItem.size
                  ? { ...item, quantity: item.quantity + newItem.quantity }
                  : item
              ),
            }
          }

          return { items: [...state.items, newItem] }
        }),
      updateQuantity: (item, change) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === item.id && i.color === item.color && i.size === item.size
              ? { ...i, quantity: Math.max(1, i.quantity + change) }
              : i
          ),
        })),
      removeItem: (item) =>
        set((state) => ({
          items: state.items.filter((i) => i.id !== item.id || i.color !== item.color || i.size !== item.size),
        })),
    }),
    {
      name: "cart-storage", // Persist the cart in localStorage or sessionStorage
    },
  ),
)
