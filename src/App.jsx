import { Routes, Route } from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/Home'
import ItemListContainer from './components/ItemListContainer'
import ItemDetailContainer from './components/ItemDetailContainer'
import Checkout from './components/Checkout'
import NotFound from './components/NotFound'
import CartDrawer from './components/CartDrawer'

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <NavBar />

      <main className="flex-1">
        <Routes>
          {/* '/' : home con catálogo completo */}
          <Route path="/" element={<Home />} />
          {/* '/category/:id' : catálogo filtrado por categoría (ruta parametrizada única) */}
          <Route path="/category/:id" element={<ItemListContainer />} />
          {/* '/item/:id' : detalle de un producto */}
          <Route path="/item/:id" element={<ItemDetailContainer />} />
          {/* '/checkout' : finalizar compra */}
          <Route path="/checkout" element={<Checkout />} />
          {/* '*' : 404 de respaldo para enlaces rotos o inexistentes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-stone-500 sm:flex-row sm:px-8">
          <p className="font-display text-lg text-stone-900">
            Coffee<span className="text-amber-800">Link</span>
          </p>
          <p>© {new Date().getFullYear()} CoffeeLink. Tostado con dedicación.</p>
        </div>
      </footer>

      {/* El carrito vive fuera de las rutas para persistir en toda la navegación. */}
      <CartDrawer />
    </div>
  )
}

export default App
