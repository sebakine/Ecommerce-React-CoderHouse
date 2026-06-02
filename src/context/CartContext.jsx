import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart() debe usarse dentro de un <CartProvider>')
  }
  return context
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  const addItem = (item, quantity = 1) => {
    setItems((prev) => {
      // Si el producto ya existe, acumula la cantidad.
      const existing = prev.find((product) => product.id === item.id)
      if (existing) {
        return prev.map((product) =>
          product.id === item.id
            ? { ...product, quantity: product.quantity + quantity }
            : product,
        )
      }
      return [...prev, { ...item, quantity }]
    })
  }

  const removeItem = (itemId) => {
    setItems((prev) => prev.filter((product) => product.id !== itemId))
  }

  const clearCart = () => setItems([])

  const totalProducts = () =>
    items.reduce((total, product) => total + product.quantity, 0)

  const totalPrice = () =>
    items.reduce((total, product) => total + product.price * product.quantity, 0)

  const openDrawer = () => setIsDrawerOpen(true)
  const closeDrawer = () => setIsDrawerOpen(false)

  const value = {
    items,
    addItem,
    removeItem,
    clearCart,
    totalProducts,
    totalPrice,
    isDrawerOpen,
    openDrawer,
    closeDrawer,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
