import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle2, Loader2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../data/mockProducts'

function Field({ label, name, type = 'text', value, onChange, error, placeholder, autoComplete }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-stone-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`mt-1.5 w-full rounded-xl border bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400
                    transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2
                    ${
                      error
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-stone-300 focus:border-amber-800 focus:ring-amber-800/20'
                    }`}
      />
      {error && <p className="mt-1.5 text-xs text-red-600">{error}</p>}
    </div>
  )
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^[0-9\s+()-]{7,}$/
const INITIAL_FORM = { nombre: '', telefono: '', email: '', confirmEmail: '' }

function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  // Vuelve al catálogo navegando con el router (sin recargar).
  const onBackToShop = () => navigate('/')
  const [form, setForm] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')
  const [order, setOrder] = useState(null)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.nombre.trim().length < 2) next.nombre = 'Ingresá tu nombre completo.'
    if (!PHONE_REGEX.test(form.telefono.trim())) next.telefono = 'Ingresá un teléfono válido.'
    if (!EMAIL_REGEX.test(form.email.trim())) next.email = 'Ingresá un email válido.'
    if (form.confirmEmail.trim() !== form.email.trim()) {
      next.confirmEmail = 'Los emails no coinciden.'
    }
    return next
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    // Simula el procesamiento de la orden y genera un número ficticio.
    setStatus('processing')
    const snapshot = { items, total: totalPrice() }

    setTimeout(() => {
      const generatedId = `CL-${Date.now().toString().slice(-6)}`
      setOrder({
        id: generatedId,
        buyer: form.nombre.trim(),
        email: form.email.trim(),
        items: snapshot.items,
        total: snapshot.total,
      })
      clearCart()
      setStatus('success')
    }, 1600)
  }

  if (status === 'success' && order) {
    return (
      <section className="mx-auto max-w-2xl px-5 py-24 sm:px-8">
        <div className="animate-fade-in-up rounded-3xl border border-stone-200 bg-white p-8 text-center shadow-sm sm:p-12">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-emerald-50 text-emerald-600">
            <CheckCircle2 className="h-9 w-9" strokeWidth={1.75} />
          </div>
          <h2 className="mt-6 font-display text-3xl font-light text-stone-900">
            ¡Gracias por tu compra, {order.buyer.split(' ')[0]}!
          </h2>
          <p className="mt-3 text-stone-600">
            Tu orden fue procesada con éxito. Enviamos la confirmación a{' '}
            <span className="font-medium text-stone-900">{order.email}</span>.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-100 px-5 py-2 text-sm">
            <span className="text-stone-500">N° de orden</span>
            <span className="font-semibold tracking-wide text-amber-800">{order.id}</span>
          </div>

          <ul className="mt-8 divide-y divide-stone-200 text-left">
            {order.items.map((item) => (
              <li key={item.id} className="flex items-center justify-between py-3">
                <span className="text-stone-700">
                  {item.title} <span className="text-stone-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-stone-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between border-t border-stone-200 pt-4">
            <span className="font-medium text-stone-900">Total abonado</span>
            <span className="font-display text-2xl font-medium text-stone-900">
              {formatPrice(order.total)}
            </span>
          </div>

          <button
            type="button"
            onClick={onBackToShop}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                       text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                       hover:bg-amber-900 hover:shadow-lg"
          >
            Volver a la tienda
          </button>
        </div>
      </section>
    )
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex max-w-2xl flex-col items-center px-5 py-32 text-center sm:px-8">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-stone-100 text-stone-400">
          <ShoppingBag className="h-7 w-7" strokeWidth={1.5} />
        </div>
        <h2 className="mt-6 font-display text-2xl font-light text-stone-900">
          No hay productos para comprar
        </h2>
        <p className="mt-3 text-stone-600">Agregá productos al carrito antes de finalizar la compra.</p>
        <button
          type="button"
          onClick={onBackToShop}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-amber-800 px-7 py-3.5
                     text-sm font-semibold text-stone-50 transition-all duration-300 ease-in-out hover:bg-amber-900"
        >
          Volver a la tienda
        </button>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <button
        type="button"
        onClick={onBackToShop}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-stone-600
                   transition-colors duration-300 ease-in-out hover:text-stone-900"
      >
        <ArrowLeft className="h-4 w-4" /> Seguir comprando
      </button>

      <h1 className="mt-6 font-display text-4xl font-light text-stone-900">Finalizar compra</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <form onSubmit={handleSubmit} noValidate className="lg:col-span-3">
          <div className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900">Tus datos</h2>

            <Field
              label="Nombre completo"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              error={errors.nombre}
              placeholder="Ana Pérez"
              autoComplete="name"
            />
            <Field
              label="Teléfono"
              name="telefono"
              type="tel"
              value={form.telefono}
              onChange={handleChange}
              error={errors.telefono}
              placeholder="+54 11 5555 5555"
              autoComplete="tel"
            />
            <Field
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="ana@email.com"
              autoComplete="email"
            />
            <Field
              label="Confirmar email"
              name="confirmEmail"
              type="email"
              value={form.confirmEmail}
              onChange={handleChange}
              error={errors.confirmEmail}
              placeholder="ana@email.com"
            />

            <button
              type="submit"
              disabled={status === 'processing'}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-800 px-6 py-3.5
                         text-sm font-semibold text-stone-50 shadow-sm transition-all duration-300 ease-in-out
                         hover:bg-amber-900 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-70"
            >
              {status === 'processing' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Procesando orden…
                </>
              ) : (
                'Finalizar Compra'
              )}
            </button>
          </div>
        </form>

        <aside className="lg:col-span-2">
          <div className="rounded-2xl border border-stone-200 bg-stone-100/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-medium text-stone-900">Tu pedido</h2>
            <ul className="mt-5 space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.pictureUrl}
                    alt={item.title}
                    loading="lazy"
                    className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-tight text-stone-900">{item.title}</p>
                    <p className="text-xs text-stone-500">{item.quantity} u.</p>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex items-center justify-between border-t border-stone-200 pt-4">
              <span className="text-stone-600">Total</span>
              <span className="font-display text-2xl font-medium text-stone-900">
                {formatPrice(totalPrice())}
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

export default Checkout
