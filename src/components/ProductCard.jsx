import { useState } from 'react'
import { Check, Minus, Plus } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockProducts'

function ProductCard({ product }) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(99, q + 1))

  const handleAdd = () => {
    addItem(product, quantity)
    setQuantity(1)
    setAdded(true)
    // Confirmación visual temporal en el botón.
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white
                 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.pictureUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-lg font-medium leading-tight text-stone-900">
          {product.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-stone-500">
          {product.description}
        </p>

        <p className="mt-4 font-display text-xl font-medium text-stone-900">
          {formatPrice(product.price)}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <div className="flex items-center rounded-full border border-stone-200">
            <button
              type="button"
              onClick={decrease}
              aria-label="Disminuir cantidad"
              className="grid h-9 w-9 place-items-center rounded-full text-stone-600
                         transition-colors duration-300 ease-in-out hover:text-amber-800 disabled:opacity-40"
              disabled={quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-6 text-center text-sm font-semibold tabular-nums text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={increase}
              aria-label="Aumentar cantidad"
              className="grid h-9 w-9 place-items-center rounded-full text-stone-600
                         transition-colors duration-300 ease-in-out hover:text-amber-800"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <button
            type="button"
            onClick={handleAdd}
            className={`flex flex-1 items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold
                        text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                        ${added ? 'bg-emerald-700' : 'bg-amber-800 hover:bg-amber-900 hover:shadow-lg'}`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" /> Agregado
              </>
            ) : (
              'Agregar'
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
