# ☕ CoffeeLink

E-commerce de café de especialidad — tostaduría premium y artículos de preparación.
Frontend construido con **React + Vite + Tailwind CSS**, con una estética moderna,
minimalista y premium (estilo apple-like) en una paleta cálida `stone` + `amber`.

> Frontend 100% funcional e interactivo: estado global del carrito, drawer lateral,
> catálogo dinámico por categorías y un flujo de checkout completo con confirmación.
> Datos mock (sin backend real).

---

## 🛠️ Stack

| Capa        | Tecnología                          |
| ----------- | ----------------------------------- |
| UI          | React 19 (componentes funcionales)  |
| Build       | Vite 6                              |
| Estilos     | Tailwind CSS v4 (plugin de Vite)    |
| Iconos      | lucide-react                        |
| Tipografía  | Fraunces (display) · Hanken Grotesk |

---

## 🚀 Puesta en marcha

```bash
npm install      # instalar dependencias
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # build de producción
npm run preview  # previsualizar el build
```

---

## 📂 Estructura

```
src/
├── context/
│   └── CartContext.jsx       # Estado global del carrito (add/remove/clear/totales) + Drawer
├── components/
│   ├── NavBar.jsx            # Nav fija + branding + categorías + menú hamburguesa móvil
│   ├── CartWidget.jsx        # Ícono de carrito con badge (lee totalProducts)
│   ├── CartDrawer.jsx        # Sidebar lateral con items, subtotales, total y checkout
│   ├── Hero.jsx              # Sección de impacto (H1 + CTAs)
│   ├── ItemListContainer.jsx # Pestañas de categoría + grid responsiva de productos
│   ├── ProductCard.jsx       # Tarjeta con selector de cantidad y "Agregar"
│   ├── Nosotros.jsx          # Sección narrativa con layout asimétrico
│   └── Checkout.jsx          # Formulario validado + procesamiento + confirmación
├── data/
│   └── mockProducts.js       # Catálogo mock + categorías + formatPrice()
├── App.jsx                   # Orquesta navegación shop ⇄ checkout + monta el Drawer
├── index.css                 # Tailwind v4 + tokens de fuente + animaciones
└── main.jsx                  # Entrada (envuelve la app en <CartProvider>)
```

---

## 🧠 Decisiones de arquitectura

- **Estado global con Context API** (`CartContext`): expone `addItem(item, qty)`,
  `removeItem(id)`, `clearCart()`, `totalProducts()`, `totalPrice()` y el control de
  apertura del Drawer. Un hook `useCart()` mantiene limpio el consumo.
- **Navegación sin router**: `App` gestiona la vista (`shop` ⇄ `checkout`) y la categoría
  activa, sincronizada con la NavBar. El Drawer se monta de forma global para animar
  su entrada/salida con `transition-transform`.
- **Imágenes**: URLs reales de Unsplash verificadas (HTTP 200), con `loading="lazy"`.

---

## 🎨 Sistema de diseño

Paleta cálida de especialidad sobre las escalas de Tailwind:

- **Fondos / superficies:** `stone-50`, `stone-100`, `white`
- **Texto:** `stone-900` (títulos), `stone-600/500` (secundario)
- **Acento:** `amber-800` con `hover:amber-900`
- **Tipografía:** `font-display` (Fraunces) para títulos, `font-sans` (Hanken Grotesk) para texto

> **Nota:** usa **Tailwind CSS v4**, configurado desde el CSS (`@import "tailwindcss"` +
> `@theme`) y el plugin `@tailwindcss/vite`, sin `tailwind.config.js`.
