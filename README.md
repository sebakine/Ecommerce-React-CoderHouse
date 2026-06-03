#  CoffeeLink

E-commerce de café de especialidad — tostaduría premium y artículos de preparación.
Frontend construido con **React + Vite + Tailwind CSS**, con una estética moderna,
minimalista y premium (estilo apple-like) en una paleta cálida `stone` + `amber`.

Frontend 100% funcional e interactivo: estado global del carrito, drawer lateral,





##  Stack


UI          React 19 (componentes funcionales)
Build       Vite 6                             
Estilos     Tailwind CSS v4 (plugin de Vite)   
Iconos      lucide-react                       
Tipografía  Fraunces (display) · Hanken Grotesk



##  Puesta en marcha


npm install      # instalar dependencias
npm run dev      # entorno de desarrollo (http://localhost:5173)
npm run build    # build de producción
npm run preview  # previsualizar el build


##  Sistema de diseño

Paleta cálida de especialidad sobre las escalas de Tailwind:

- **Fondos / superficies:** `stone-50`, `stone-100`, `white`
- **Texto:** `stone-900` (títulos), `stone-600/500` (secundario)
- **Acento:** `amber-800` con `hover:amber-900`
- **Tipografía:** `font-display` (Fraunces) para títulos, `font-sans` (Hanken Grotesk) para texto

> **Nota:** usa **Tailwind CSS v4**, configurado desde el CSS (`@import "tailwindcss"` +
> `@theme`) y el plugin `@tailwindcss/vite`, sin `tailwind.config.js`.
