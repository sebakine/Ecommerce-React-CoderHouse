import { ArrowRight } from 'lucide-react'

function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-stone-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 50% -10%, rgba(180, 131, 70, 0.22), transparent 70%), ' +
            'radial-gradient(45% 45% at 85% 25%, rgba(231, 222, 209, 0.7), transparent 60%)',
        }}
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 py-28 text-center sm:py-36">
        <span className="mb-6 inline-flex items-center rounded-full border border-stone-200 bg-stone-50/60 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-stone-600">
          Tostado en lotes pequeños
        </span>

        <h1 className="font-display text-5xl font-light leading-[1.05] tracking-tight text-stone-900 sm:text-7xl">
          El café de especialidad,
          <span className="block italic text-amber-800">en su punto exacto.</span>
        </h1>

        <p className="mt-7 max-w-xl text-lg leading-relaxed text-stone-600">
          Granos de origen seleccionados a mano y tostados con precisión, junto a los
          métodos de preparación que transforman cada taza en un ritual.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#catalogo"
            className="group inline-flex items-center gap-2 rounded-full bg-stone-900 px-7 py-3.5
                       text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                       hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-lg"
          >
            Explorar el catálogo
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>

          <a
            href="#nosotros"
            className="text-sm font-semibold text-stone-900 underline-offset-4
                       transition-colors duration-300 ease-in-out hover:text-amber-800 hover:underline"
          >
            Conocé nuestra historia
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
