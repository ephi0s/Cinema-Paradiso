# Cinema Paradiso

Catálogo de Películas con React y Vite. Implementación de React Router DOM para navegación entre páginas. Utilización de React Hooks para manejo de estado y efectos secundarios.

La aplicación utiliza un archivo JSON para obtener la lista de las 500 películas más vistas en IMDb. Este JSON se regenera cada 6 horas, lo que nos permite acceder a una respuesta de API sin necesidad de tokens ni suscripciones a servicios de pago.

Los datos son procesados internamente para extraer la información relevante y crear un array de objetos con la siguiente estructura:

```typescript
interface PeliculaAPI {
    url: string;
    name: string;
    image: string;
    id?: string;
    ratingValue?: number;
    director?: { name: string };
    description?: string;
    datePublished?: string;
    actor?: { name: string }[]; // may contain multiple actors
    genre?: string[]; // array of genres
    trailer?: { embedUrl?: string;[key: string]: unknown }; // trailer info
}
```
Con esto, crearemos una carátula para cada película con su respectivo título, imagen y enlace a su detalle.

Cuando accedemos a la página de detalles de una película, se mostrará su información completa, incluyendo su título, valoración, director, fecha de estreno y descripción. Esta, también, implementada en nuestra API interna.

Los datos de la API interna se almacenan en el archivo `api.ts` y se pueden acceder desde cualquier componente de la aplicación. Hacer esto nos permite aislar la lógica de la API de la lógica de la aplicación, y con ello poder cambiar el backend de la aplicación sin afectar al diseño de la misma.

Para mantenimiento futuro, podría implemtarse un acceso a una API externa, como por ejemplo, la API de IMDb o The Movie Database (TMDB). Aislar la api externa de la que utilizaremos en nuestra app implica que solo necesitemos modificar un archivo, acelerando el proceso de mantenimiento y actualización de la aplicación.

El resultado es un directorio de componentes que subdivide la web en sus diferentes secciones (cabecera, carátulas, buscador, detalles de películas, etc.), una api interna que provee los datos a estos componentes, y una interfaz que carga esos componentes para dar lugar a la web.

## Herramientas utilizadas:

- Node.js (Entorno de ejecución)
- pnpm (Gestor de paquetes)
- Antigravity (Editor de código)
- React (Diseño de interfaz basada en componentes)
- React Router DOM (Gestión de rutas y navegación)
- Vite (Entorno de desarrollo)
- TypeScript (Lenguaje de programación)


## Implementación inicial

El primer componente en implementarse fue el componente de carátulas, cuyo diseño se basa en el encapsulamiento de fragmentos de un formulario. Para eso utilizamos el tag `fieldset` y `legend` para darle un aspecto más estético y funcional a la carátula. Este componente se envuelve entonces en una ruta de react-router-dom para que pueda ser accedido desde la página principal, y con ello, se puede acceder a los detalles de la película.

Tras esto, se procedió a implementar el buscador, intentando ser lo más minimalista posible, con la idea que se introdujera posteriormente en la cabecera de la página.

Hecho esto, se crearon la cabecera y el pie de página, introduciéndose en la main app, reduciendo así el trabajo posterior que supondría la creación de una cabecera y pie por cada página de forma explícita.

Quedó todo hecho, tras esto y habiendo probado varias apis sin éxito, se llega al proyecto de este blob automatizado que se encuentra en github. Este, como se explicó más arriba, provee las 500 películas más vistas en IMDb, con su respectiva información, lo que permitía acceder a toda la información que usaríamos en los componentes.

Ahora tocaba la integración del "backend" (realmente es un middleware, ya que no se cuenta con proveedor de base de datos ni procesamiento más allá del estético), creando una api local, esta se sitúa en el archivo `api.ts`, en su propio directorio dentro de `src/components/api/` donde a futuro se podrían agregar más apis, sus diferentes configuraciones, etcétera.

Hubo que modificar los componentes para que usaran nuestra "api" improvisada, y metimos manos a todos los componentes. Tras varias pruebas, el resultado podía considerarse "apto".

Hecho todo esto, ahora tocaba crear el contenido dinámico, concretamente el detalle de las películas. Para eso, se crea un nuevo componente, `DetallePelis.tsx`, que se encarga de mostrar la información de una película en detalle. Los resultados iterativos de dichos datos se extraen de un nuevo objeto de nuestra "api", con todo el contenido adicional que muestra dicha vista.

Ahora, el problema era: ¿Cómo generamos las diferentes páginas de detalle si no tenemos una generación dinámica de contenido? El truco se encuentra en `app.tsx`, rehecho casi desde cero para integrar rutas de react, utilizando el react-router-dom para generar las rutas de la página principal (path=/) y la de los detalles (path=/pelis/:id).

A partir de ahí, toca crear el buscador, y comenzamos el log de cambios automatizado, que se encuentra a continuación:


## Historial de Implementaciones

### Sistema de Navegación y Rutas

Implementación de React Router DOM para navegación entre páginas.

**Archivos modificados:**
- Instalada dependencia `react-router-dom` vía pnpm
- `src/main.tsx`: Agregado `BrowserRouter` envolviendo el componente App
- `src/App.tsx`: Agregado sistema de rutas con `Routes` y `Route`
  - Ruta `/`: Lista de películas
  - Ruta `/pelis/:id`: Página de detalles individual

**Resultado:** La aplicación ahora soporta navegación sin recargas de página y URLs únicas para cada película.

---

### Extracción de IDs de Películas

**Cambio:** Modificación en `src/components/api/api.ts` para extraer y exponer IDs de IMDB (había un fallo, ya que estábamos cargando la url de cada película en IMDB en vez de su id).

**Implementación:**
- Agregada expresión regular para extraer ID del formato `/title/tt1234567/`
- Modificada la interfaz `PeliculaAPI` para incluir campos opcionales del API
- Creado export adicional `datospeli` con información completa (la implementación inicial estaba rota, y no podíamos acceder a los datos de la película de forma individual)

**Exports disponibles:**
- `peli` (default): Datos básicos (id, peli_titulo, peli_imagen, peli_url)
- `datospeli` (named): Datos completos (id, titulo, imagen, url, valoracion, director, descripcion, fecha)

**Resultado:** Ahora podemos acceder a los datos de la película de forma individual, y mostrarlos en la página de detalles.

---

### Componente de Detalles de Película

**Cambio:** Creación de `src/components/DetallePelis.tsx` y su CSS.

Esto se produjo dado que nuestra implementación inicial no funcionaba. Procedimos a limpiarla, darle un "lavado de cara" y comprobar su funcionamiento.

**Implementación:**
- Uso de `useParams` para obtener ID desde URL
- Búsqueda de película en array `datospeli`
- Renderizado condicional si película no existe
- Display de: título, valoración, director, fecha, descripción
- Links de navegación (IMDB y volver a lista)

**Archivos creados:**
- `src/components/DetallePelis.tsx`
- `src/components/DetallePelis.css`

---

### Refactorización de Lista de Películas

**Cambio:** Movida lógica de renderizado de lista desde `App.tsx` a nuevo componente.

**Archivos afectados:**
- `src/pelis.tsx`: Creado componente `ListaPelis` que renderiza grid de películas
- `src/App.tsx`: Simplificado para manejar solo estructura y routing

---

### Actualización de Componente Caratulas

**Cambio:** Modificación para usar navegación de React Router.

**Implementación en `src/components/Caratulas.tsx`:**
- Reemplazado `<a href>` por `<Link to>` de react-router-dom. Esto se hizo para que la carga fuera dinámica (en el navegador no se producía recarga de página)
- Links apuntan a `/pelis/${id}` en lugar de URL externa (ahora se usan las rutas de react-router-dom)
- Agregada prop `id` a la interfaz Props
- Removida prop `peli_url` (ya no necesaria para navegación interna)
- Agregado atributo `loading="lazy"` a las imágenes para que la visualización de las mismas no supusiera una gran carga en el navegador.

---

### Implementación de Búsqueda

**Cambio:** Sistema de búsqueda en tiempo real.

**Arquitectura:**
- Estado `searchQuery` manejado en `App.tsx` con `useState`. Esta aproximación permitió por fin que el buscador no rompiera el contenido.
- Pasado como prop a `BuscadorPelis` (`setSearchQuery`) y `ListaPelis` (`searchQuery`). Gracias a esto, el buscador se conecta con la lista de películas y regenera una nueva lista con los resultados de la búsqueda.

**Archivos modificados:**
- `src/App.tsx`: Agregado estado de búsqueda y paso de props
- `src/components/BuscadorPelis.tsx`: 
  - Agregada interfaz Props
  - Input controlado con estado local
  - Actualización en tiempo real mediante `onChange`
- `src/pelis.tsx`: 
  - Recibe `searchQuery` como prop
  - Filtra array `peli` usando `.filter()`
  - Muestra mensaje si no hay resultados

---

### Corrección de Header

**Cambio:** Solución a problemas de visualización del header. El buscador desbordaba en la página, haciendo difícil su uso, ya que el botón de búsqueda se encontraba fuera de la pantalla.

**Modificaciones en `src/App.css`:**
- Agregado `z-index: 1000` al header (las carátulas se encontraban por encima del header)
- Agregado `background` y `backdrop-filter` para darle un toquito de glamour (glassmorphism le llaman, efecto cristalino para los cervantinos)
- Incrementado `margin-top` de `#main-app` de 3rem a 5rem (para que el header no se superpusiera con el contenido)
- Agregado `overflow: hidden` a nav y logo. Adaptación para dispositivos de pantalla pequeña
- Centrado vertical del logo

**Modificaciones en `src/components/BuscadorPelis.css`:**
- Agregado `min-width: 0` al formulario y input para prevenir overflow

**Resultado:** Header fijo funciona correctamente sin superposición con contenido.

---

### Optimización de Rendimiento

**Cambio:** Implementación de lazy loading en imágenes.

**Archivos modificados:**
- `src/components/Caratulas.tsx`: Agregado `loading="lazy"` a tag `<img>`
- `src/components/DetallePelis.tsx`: Agregado `loading="lazy"` a imagen de detalle

**Beneficio:** Mejora significativa en tiempo de carga inicial, especialmente con el tamaño de la lista de películas.

---

## Posibles Mejoras

- 👍CSS. Los estilos son muy básicos. Hay que meterle mano al diseño móvil y al aspecto general de la página.
- Optimización de imágenes. Carga las imágenes de Amazon Web Services a una resolución muy alta. Sería recomendable buscar alguna fuente alternativa (hay imágenes que dan error 404) que ofreciera tamaños más reducidos. La descripción de las películas hacen bien en cargar esa resolución, pero las carátulas cargan demasiado el navegador por el tamaño de la lista de películas.
- 👍Mejoras en el buscador. Añadir opciones para buscar por actores, directores, géneros, etc. Actualmente hace una búsqueda en texto plano sobre los títulos solamente.
- Añadir un botón para acceder a los detalles de la película en TMDB en adición al de IMDB. Más fuentes implica más información disponible para el usuario.
- Información adicional en pie de página, metadatos, etcétera, así como optimizaciones para los motores de búsqueda.
- Integración en un repositorio git que permita el control de versiones y una posible colaboración con otros usuarios.
- 👍Probar en producción para ver si funciona correctamente.
- 👍Error detectado en el buscador. Al hacer una búsqueda en los detalles de la película, no ofrece ningua funcionalidad. Hacer la búsqueda debería recargar la vista a la lista de películas y con ello mostrar los resultados de la búsqueda.

## Actualizaciones:

1. Se corrige fallo en el buscador, eliminando la búsqueda automática al escribir en el cuadro de búsqueda, y con ello, al cambiar de vista con la búsqueda ya escrita, esta es realizada y se muestra el resultado en la lista de películas, saliendo en caso de estar en ella, de la vista de detalles de la película.

2. Corregido fallo en el footer. Este se superponía con el contenido de la página, lo que dificultaba su visualización. Se corrige el z-index para que el footer se muestre por encima del contenido.

3. Refactorización del código. Se cambian nombres de variables, funciones, clases CSS, etc. para que sean más descriptivos y fáciles de entender, y se unifican para que sean en español. Así mismo, se modulariza el CSS para utilizar variables y que sea más fácil de mantener. Se ha limpiado un poco la "API" para hacerla más descriptiva. Todo sigue en su sitio y sigue funcionando correctamente.

4. Rediseño UI. Se ha unificado el buscador en una única "pastilla" visual para mejorar la estética, utilizando el botón de limpieza nativo de los navegadores. Además, se han añadido animaciones de entrada "fade-in" para suavizar la carga de las carátulas de películas.

5. Buscador Responsivo. Se ha rediseñado el buscador para móviles a modo de "overlay" expansible, usando iconos SVG y transiciones suaves para mejorar la experiencia de uso en pantallas pequeñas. Se solucionaron problemas de limpieza de búsqueda y se eliminaron conflictos visuales con el logotipo.
