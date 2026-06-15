import { useState } from 'react'
import { Minus, Plus } from 'lucide-react'

// Componente de presentación: gestiona solo el contador local de unidades.
// Recibe el stock disponible, una cantidad inicial y la función onAdd que ejecuta el contenedor.
function ItemCount({ stock, initial = 1, onAdd }) {
  const [quantity, setQuantity] = useState(initial)

  const decrease = () => setQuantity((q) => Math.max(1, q - 1))
  const increase = () => setQuantity((q) => Math.min(stock, q + 1))

  const noStock = stock <= 0

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <div className="flex items-center rounded-full border border-stone-200">
          <button
            type="button"
            onClick={decrease}
            disabled={quantity <= 1 || noStock}
            aria-label="Disminuir cantidad"
            className="grid h-10 w-10 place-items-center rounded-full text-stone-600
                       transition-colors duration-300 ease-in-out hover:text-amber-800 disabled:opacity-40"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="w-8 text-center text-base font-semibold tabular-nums text-stone-900">
            {quantity}
          </span>
          <button
            type="button"
            onClick={increase}
            disabled={quantity >= stock || noStock}
            aria-label="Aumentar cantidad"
            className="grid h-10 w-10 place-items-center rounded-full text-stone-600
                       transition-colors duration-300 ease-in-out hover:text-amber-800 disabled:opacity-40"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <span className="text-sm text-stone-500">
          {noStock ? 'Sin stock disponible' : `${stock} unidades disponibles`}
        </span>
      </div>

      <button
        type="button"
        onClick={() => onAdd(quantity)}
        disabled={noStock}
        className="rounded-full bg-amber-800 px-7 py-3.5 text-sm font-semibold text-stone-50 shadow-sm
                   transition-all duration-300 ease-in-out hover:bg-amber-900 hover:shadow-lg
                   disabled:cursor-not-allowed disabled:opacity-50"
      >
        Agregar al carrito
      </button>
    </div>
  )
}

export default ItemCount
