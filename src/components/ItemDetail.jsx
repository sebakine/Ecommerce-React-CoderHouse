import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Check } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice, CATEGORIES } from '../data/mockProducts'
import ItemCount from './ItemCount'

// Componente de presentación: muestra la vista detallada del producto recibido por props
// e integra el contador ItemCount para seleccionar las unidades a agregar al carrito.
function ItemDetail({ product }) {
  const { addItem, openDrawer } = useCart()
  const [added, setAdded] = useState(0)

  const categoryLabel =
    CATEGORIES.find((category) => category.id === product.category)?.label ?? product.category

  const handleAdd = (quantity) => {
    addItem(product, quantity)
    setAdded(quantity)
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600
                   transition-colors duration-300 ease-in-out hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" /> Volver al catálogo
      </Link>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-stone-200 bg-stone-100">
          <img
            src={product.pictureUrl}
            alt={product.title}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div>
          <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-800">
            {categoryLabel}
          </span>
          <h1 className="mt-3 font-display text-4xl font-light leading-tight text-stone-900">
            {product.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-stone-600">{product.description}</p>

          <p className="mt-8 font-display text-3xl font-medium text-stone-900">
            {formatPrice(product.price)}
          </p>

          <div className="mt-8">
            {added > 0 ? (
              // Confirmación tras agregar: se reemplaza el contador por accesos rápidos.
              <div className="flex flex-col gap-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
                  <Check className="h-4 w-4" /> Agregaste {added} unidad{added > 1 ? 'es' : ''} al carrito.
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={openDrawer}
                    className="rounded-full bg-amber-800 px-6 py-3 text-sm font-semibold text-stone-50
                               shadow-sm transition-all duration-300 ease-in-out hover:bg-amber-900 hover:shadow-lg"
                  >
                    Ver carrito
                  </button>
                  <Link
                    to="/"
                    className="rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-700
                               transition-colors duration-300 ease-in-out hover:border-amber-800 hover:text-amber-800"
                  >
                    Seguir comprando
                  </Link>
                </div>
              </div>
            ) : (
              <ItemCount stock={product.stock} initial={1} onAdd={handleAdd} />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ItemDetail
