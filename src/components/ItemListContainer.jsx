import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { CATEGORIES, getProducts, categoryExists } from '../data/mockProducts'
import ItemList from './ItemList'
import NotFound from './NotFound'

// Componente CONTENEDOR: maneja estado, efectos y la obtención de datos.
function ItemListContainer({ greeting = 'Descubrí el café de especialidad' }) {
  // useParams captura el :id de la categoría desde la URL (/category/:id).
  const { id: categoryId } = useParams()
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Consume la Promesa asíncrona; si hay categoryId filtra, si no trae todo.
    getProducts(categoryId)
      .then((data) => setProducts(data))
      .finally(() => setLoading(false))
    // categoryId va en las dependencias para re-ejecutar al navegar entre categorías.
  }, [categoryId])

  // Si la URL trae una categoría que no existe, mostramos la vista 404.
  if (categoryId && !categoryExists(categoryId)) return <NotFound />

  // Título dinámico según la categoría activa de la URL.
  const activeCategory = CATEGORIES.find((category) => category.id === categoryId)
  const heading = activeCategory ? activeCategory.label : greeting

  return (
    <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-800">
          Catálogo
        </span>
        <h2 className="mt-4 font-display text-3xl font-light leading-snug text-stone-900 sm:text-4xl">
          {heading}
        </h2>
      </div>

      {/* Filtros por categoría: Link mantiene la navegación SPA y resalta la activa. */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((category) => {
          const isActive =
            category.id === 'all' ? !categoryId : category.id === categoryId
          const to = category.id === 'all' ? '/' : `/category/${category.id}`
          return (
            <Link
              key={category.id}
              to={to}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out
                          ${
                            isActive
                              ? 'bg-amber-800 text-stone-50 shadow-sm'
                              : 'border border-stone-200 text-stone-600 hover:border-amber-800 hover:text-amber-800'
                          }`}
            >
              {category.label}
            </Link>
          )
        })}
      </div>

      {loading ? (
        <div className="mt-20 flex flex-col items-center gap-3 text-stone-500">
          <Loader2 className="h-7 w-7 animate-spin text-amber-800" />
          <p className="text-sm">Cargando productos…</p>
        </div>
      ) : (
        <ItemList products={products} />
      )}
    </section>
  )
}

export default ItemListContainer
