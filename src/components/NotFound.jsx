import { Link } from 'react-router-dom'
import { Coffee } from 'lucide-react'

// Vista de respaldo para la ruta comodín '*' (enlaces rotos o inexistentes).
function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center sm:px-8">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-100 text-amber-800">
        <Coffee className="h-7 w-7" strokeWidth={1.5} />
      </div>
      <p className="mt-6 font-display text-6xl font-light text-stone-900">404</p>
      <h1 className="mt-2 font-display text-2xl font-light text-stone-900">
        Esta página se enfrió
      </h1>
      <p className="mt-3 text-stone-600">
        No encontramos lo que buscabas. Puede que el enlace ya no exista.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                   text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                   hover:bg-amber-900 hover:shadow-lg"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFound
