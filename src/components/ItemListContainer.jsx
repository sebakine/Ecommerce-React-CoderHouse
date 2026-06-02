import { CATEGORIES, products } from '../data/mockProducts'
import ProductCard from './ProductCard'

function ItemListContainer({ greeting, activeCategory, onCategoryChange }) {
  const visibleProducts =
    activeCategory === 'all'
      ? products
      : products.filter((product) => product.category === activeCategory)

  return (
    <section id="catalogo" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-20 sm:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-800">
          Catálogo
        </span>
        <h2 className="mt-4 font-display text-3xl font-light leading-snug text-stone-900 sm:text-4xl">
          {greeting}
        </h2>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
        {CATEGORIES.map((category) => {
          const isActive = category.id === activeCategory
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryChange(category.id)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 ease-in-out
                          ${
                            isActive
                              ? 'bg-amber-800 text-stone-50 shadow-sm'
                              : 'border border-stone-200 text-stone-600 hover:border-amber-800 hover:text-amber-800'
                          }`}
            >
              {category.label}
            </button>
          )
        })}
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default ItemListContainer
