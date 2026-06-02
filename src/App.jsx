import { useState } from 'react'
import { useCart } from './context/CartContext'
import NavBar from './components/NavBar'
import Hero from './components/Hero'
import ItemListContainer from './components/ItemListContainer'
import Nosotros from './components/Nosotros'
import Checkout from './components/Checkout'
import CartDrawer from './components/CartDrawer'

function App() {
  const { closeDrawer } = useCart()
  const [view, setView] = useState('shop')
  const [activeCategory, setActiveCategory] = useState('all')

  const scrollToSection = (id) => {
    // Espera a que la sección esté montada antes de desplazar.
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }, 60)
  }

  const handleSelectCategory = (category) => {
    setActiveCategory(category)
    setView('shop')
    scrollToSection('catalogo')
  }

  const handleNavNosotros = () => {
    setView('shop')
    scrollToSection('nosotros')
  }

  const handleGoHome = () => {
    setView('shop')
    setActiveCategory('all')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCheckout = () => {
    closeDrawer()
    setView('checkout')
    window.scrollTo({ top: 0 })
  }

  return (
    <div className="flex min-h-screen flex-col bg-stone-50">
      <NavBar
        onSelectCategory={handleSelectCategory}
        onNavNosotros={handleNavNosotros}
        onGoHome={handleGoHome}
      />

      <main className="flex-1">
        {view === 'shop' ? (
          <>
            <Hero />
            <ItemListContainer
              greeting="Descubrí el café de especialidad"
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
            <Nosotros />
          </>
        ) : (
          <Checkout onBackToShop={handleGoHome} />
        )}
      </main>

      <footer className="border-t border-stone-200 bg-stone-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-stone-500 sm:flex-row sm:px-8">
          <p className="font-display text-lg text-stone-900">
            Coffee<span className="text-amber-800">Link</span>
          </p>
          <p>© {new Date().getFullYear()} CoffeeLink. Tostado con dedicación.</p>
        </div>
      </footer>

      <CartDrawer onCheckout={handleCheckout} />
    </div>
  )
}

export default App
