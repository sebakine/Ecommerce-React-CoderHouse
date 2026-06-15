import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingBag, Trash2, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockProducts'

function CartDrawer() {
  const { items, removeItem, clearCart, totalPrice, isDrawerOpen, closeDrawer } = useCart()
  const navigate = useNavigate()

  // Cierra el drawer y navega al checkout sin recargar la página.
  const handleCheckout = () => {
    closeDrawer()
    navigate('/checkout')
  }

  // Bloquea el scroll de fondo y permite cerrar con la tecla Escape.
  useEffect(() => {
    if (!isDrawerOpen) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeDrawer()
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isDrawerOpen, closeDrawer])

  const isEmpty = items.length === 0

  return (
    <>
      <div
        onClick={closeDrawer}
        aria-hidden="true"
        className={`fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm transition-opacity duration-300 ease-in-out
                    ${isDrawerOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito de compras"
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-stone-50 shadow-2xl
                    transition-transform duration-300 ease-in-out
                    ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-6 py-5">
          <h2 className="font-display text-xl font-medium text-stone-900">Tu carrito</h2>
          <button
            type="button"
            onClick={closeDrawer}
            aria-label="Cerrar carrito"
            className="grid h-9 w-9 place-items-center rounded-full text-stone-600
                       transition-colors duration-300 ease-in-out hover:bg-stone-200 hover:text-stone-900"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-100 text-stone-400">
              <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
            </div>
            <p className="text-stone-600">Tu carrito está vacío.</p>
            <button
              type="button"
              onClick={closeDrawer}
              className="text-sm font-semibold text-amber-800 underline-offset-4 transition-colors duration-300 ease-in-out hover:text-amber-900 hover:underline"
            >
              Seguir explorando
            </button>
          </div>
        ) : (
          <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
            {items.map((item) => (
              <li key={item.id} className="flex gap-4">
                <img
                  src={item.pictureUrl}
                  alt={item.title}
                  loading="lazy"
                  className="h-20 w-20 flex-shrink-0 rounded-xl object-cover"
                />
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-medium leading-tight text-stone-900">{item.title}</h3>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      aria-label={`Eliminar ${item.title}`}
                      className="text-stone-400 transition-colors duration-300 ease-in-out hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-0.5 text-sm text-stone-500">
                    {formatPrice(item.price)} · {item.quantity} u.
                  </p>
                  <p className="mt-auto text-sm font-semibold text-stone-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}

        {!isEmpty && (
          <footer className="border-t border-stone-200 px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-stone-600">Total</span>
              <span className="font-display text-2xl font-medium text-stone-900">
                {formatPrice(totalPrice())}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full rounded-full bg-amber-800 px-6 py-3.5 text-sm font-semibold text-stone-50
                         shadow-sm transition-all duration-300 ease-in-out hover:bg-amber-900 hover:shadow-lg"
            >
              Proceder al Pago
            </button>

            <button
              type="button"
              onClick={clearCart}
              className="mt-3 w-full text-center text-sm font-medium text-stone-500
                         transition-colors duration-300 ease-in-out hover:text-red-600"
            >
              Vaciar carrito
            </button>
          </footer>
        )}
      </aside>
    </>
  )
}

export default CartDrawer
