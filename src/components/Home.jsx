import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from './Hero'
import ItemListContainer from './ItemListContainer'
import Nosotros from './Nosotros'

// Página de inicio: compone el landing (Hero + catálogo + Nosotros).
// El catálogo completo se delega al contenedor ItemListContainer.
function Home() {
  const location = useLocation()

  // Permite que enlaces como "/#nosotros" desplacen a la sección sin recargar.
  useEffect(() => {
    if (!location.hash) return
    document
      .getElementById(location.hash.slice(1))
      ?.scrollIntoView({ behavior: 'smooth' })
  }, [location])

  return (
    <>
      <Hero />
      <ItemListContainer greeting="Descubrí el café de especialidad" />
      <Nosotros />
    </>
  )
}

export default Home
