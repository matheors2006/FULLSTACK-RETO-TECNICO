# Pokédex - Reto Técnico Frontend

Este proyecto es una aplicación web responsiva construida con React que consume la [PokéAPI](https://pokeapi.co/) para mostrar un listado paginado de Pokémon, detalles individuales y gestión de favoritos. 

## 🚀 Instrucciones de Instalación y Ejecución

Para correr este proyecto localmente, asegúrate de tener Node.js instalado. Sigue estos pasos:

1. Clonar el repositorio (o descomprimir el archivo).
2. Abrir una terminal en la raíz del proyecto.
3. Instalar las dependencias ejecutando:
   ```bash
   npm install

## Iniciar el servidor de desarrollo local:

npm run dev

Abrir el navegador en la ruta indicada por la terminal (generalmente http://localhost:5173/).

🛠 Decisiones Técnicas y Arquitectura
Para este reto, me enfoqué en crear una arquitectura escalable, separando claramente la lógica de negocio de la interfaz de usuario.

## Stack Tecnológico Elegido
Vite + React ≥ 18: Elegido sobre Create React App por su velocidad de compilación, recarga en caliente (HMR) ultrarrápida y configuración moderna.

TypeScript (Bonus): Implementado para garantizar la seguridad de tipos, prevenir errores en tiempo de desarrollo y documentar implícitamente las complejas respuestas de la PokéAPI.

React Router v6: Utilizado para la navegación SPA (Single Page Application) fluida entre el listado, los detalles y la vista de favoritos.

CSS Modules: Opté por CSS Modules en lugar de librerías externas (como Bootstrap o Tailwind) para
mantener el bundle ligero, garantizar que los estilos estén encapsulados por componente y 
evitar colisiones de clases, cumpliendo con el requisito de una UI limpia.

## Patrones y Estructura

## Separación de Servicios (src/services/api.ts): 
Toda la lógica de peticiones fetch 
está aislada en un único archivo. Si la URL de la API cambia o se necesita añadir 
tokens en el futuro, solo se modifica un lugar.

## Custom Hooks (useFavorites.ts): 
La lógica de leer, guardar y eliminar 
elementos del localStorage se extrajo a un hook personalizado. Esto mantiene los componentes 
de React limpios y enfocados únicamente en la presentación.

## Componentes Inteligentes: 
El componente PokemonCard recibe datos mínimos
de la lista principal y se encarga de autogestionar su propio estado de carga y obtener 
sus detalles específicos (imagen oficial y tipos).

## Funcionalidades Extra Implementadas (Bonus)
Filtro Múltiple por Tipo: Se implementó una lógica de filtrado avanzado. Dado que la PokéAPI 
no permite paginación nativa al filtrar por tipo, la aplicación realiza llamadas 
concurrentes (Promise.all), combina los resultados, elimina duplicados en memoria 
usando Map, y aplica una paginación local fluida.

📁 Estructura de Carpetas
src/components/: Componentes reutilizables de UI (Tarjetas, Loader, Navbar).

src/pages/: Vistas principales enrutadas.

src/services/: Capa de conexión de red y llamadas a la API.

src/hooks/: Lógica abstraída y reutilizable.

src/types/: Interfaces de TypeScript para las respuestas de la API.

📌 Notas Adicionales
Se priorizó el uso de las imágenes "Official Artwork" de la PokéAPI por su mayor 
resolución y estética, utilizando los "sprites" por defecto como respaldo (fallback) en caso de 
que el arte oficial no esté disponible.

El estado de carga (Loader) se construyó con CSS puro inyectado para evitar dependencias visuales externas.