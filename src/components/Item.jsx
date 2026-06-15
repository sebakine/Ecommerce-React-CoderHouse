import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { formatPrice } from '../data/mockProducts'

// Componente de presentación: recibe un producto por props y muestra su tarjeta.
// El acceso al detalle se hace con <Link> de React Router (sin recargar la página).
function Item({ product }) {
  return (
    <article
      className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white
                 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl hover:shadow-stone-200/60"
    >
      <Link to={`/item/${product.id}`} className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        <img
          src={product.pictureUrl}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
      </Link>

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

        <Link
          to={`/item/${product.id}`}
          className="group/btn mt-5 inline-flex items-center justify-center gap-2 rounded-full
                     bg-amber-800 px-4 py-2.5 text-sm font-semibold text-stone-50 shadow-sm
                     transition-all duration-300 ease-in-out hover:bg-amber-900 hover:shadow-lg"
        >
          Ver detalle
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover/btn:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </article>
  )
}

export default Item
