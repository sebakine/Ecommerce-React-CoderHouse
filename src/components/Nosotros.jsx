const PILLARS = [
  {
    title: 'Origen trazable',
    text: 'Compramos directo a pequeños productores y pagamos precios justos por encima del mercado.',
  },
  {
    title: 'Tueste artesanal',
    text: 'Lotes pequeños tostados a mano para resaltar el perfil único de cada finca.',
  },
  {
    title: 'Sustentabilidad',
    text: 'Empaques compostables y procesos que minimizan el desperdicio en toda la cadena.',
  },
]

const img = (id) =>
  `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

function Nosotros() {
  return (
    <section id="nosotros" className="scroll-mt-20 border-t border-stone-200 bg-stone-100/60">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div className="relative lg:col-span-6">
            <img
              src={img('1442550528053-c431ecb55509')}
              alt="Granos de café recién tostados"
              loading="lazy"
              className="aspect-[4/5] w-full rounded-3xl object-cover shadow-xl"
            />
            <img
              src={img('1518057111178-44a106bad636')}
              alt="Preparación de café de especialidad"
              loading="lazy"
              className="absolute -bottom-8 -right-4 hidden aspect-square w-44 rounded-2xl border-4 border-stone-100 object-cover shadow-2xl sm:block lg:w-52"
            />
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-amber-800">
              Nuestra historia
            </span>
            <h2 className="mt-4 font-display text-4xl font-light leading-tight text-stone-900 sm:text-5xl">
              Café con propósito,
              <span className="italic text-amber-800"> de la finca a tu taza.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-stone-600">
              CoffeeLink nació de una obsesión simple: que cada taza cuente la historia
              de quien la cultivó. Viajamos a origen, construimos relaciones de largo
              plazo con los productores y tostamos con la precisión que el grano merece.
            </p>

            <dl className="mt-10 grid gap-8 sm:grid-cols-3">
              {PILLARS.map((pillar) => (
                <div key={pillar.title}>
                  <dt className="font-display text-lg font-medium text-stone-900">
                    {pillar.title}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-stone-600">
                    {pillar.text}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Nosotros
