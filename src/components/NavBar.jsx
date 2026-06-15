import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import CartWidget from './CartWidget'

const CATEGORY_LINKS = [
  { label: 'Granos', category: 'granos' },
  { label: 'Cafeteras', category: 'cafeteras' },
  { label: 'Accesorios', category: 'accesorios' },
]

function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  // Clases de los NavLink de escritorio; isActive resalta la categoría actual.
  const linkClass = ({ isActive }) =>
    'relative text-sm font-medium transition-colors duration-300 ease-in-out ' +
    'after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-amber-800 ' +
    'after:transition-all after:duration-300 hover:after:w-full ' +
    (isActive
      ? 'text-amber-800 after:w-full'
      : 'text-stone-600 hover:text-stone-900 after:w-0')

  const mobileLinkClass = ({ isActive }) =>
    'block w-full rounded-lg px-3 py-2.5 text-left text-base font-medium transition-colors duration-300 ease-in-out ' +
    (isActive ? 'bg-stone-100 text-amber-800' : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900')

  return (
    <nav className="sticky top-0 z-40 border-b border-stone-200/70 bg-stone-50/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        {/* Logo: Link al inicio sin recargar la página. */}
        <Link
          to="/"
          onClick={closeMenu}
          className="font-display text-2xl font-medium tracking-tight text-stone-900"
        >
          Coffee<span className="text-amber-800">Link</span>
        </Link>

        <ul className="hidden items-center gap-9 md:flex">
          {CATEGORY_LINKS.map((link) => (
            <li key={link.category}>
              <NavLink to={`/category/${link.category}`} className={linkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/#nosotros" className={linkClass}>
              Nosotros
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-1">
          <CartWidget />

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
            className="grid h-11 w-11 place-items-center rounded-full text-stone-800
                       transition-colors duration-300 ease-in-out hover:bg-stone-100 md:hidden"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <ul className="animate-fade-in-up space-y-1 border-t border-stone-200/70 bg-stone-50 px-5 pb-4 pt-2 md:hidden">
          {CATEGORY_LINKS.map((link) => (
            <li key={link.category}>
              <NavLink
                to={`/category/${link.category}`}
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li>
            <NavLink to="/#nosotros" onClick={closeMenu} className={mobileLinkClass}>
              Nosotros
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  )
}

export default NavBar
