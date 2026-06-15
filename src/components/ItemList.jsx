import Item from './Item'

// Componente de presentación: recibe la lista de productos por props y la renderiza.
// Cada hijo lleva su prop `key` única basada en el id del producto (requisito de React).
function ItemList({ products }) {
  if (products.length === 0) {
    return (
      <p className="mt-12 text-center text-stone-500">
        No hay productos en esta categoría.
      </p>
    )
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Item key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ItemList
