# Blog App MERN

Aplicación de blog (Admin view) desarrollada con el framework Next.js, utilizando una arquitectura MERN (MongoDB, Express, React, Node.js).

## Comenzando

Primero, ejecuta el servidor de desarrollo:

```bash
npm run dev
# o
yarn dev
# o
pnpm dev
# o
bun dev
```

Abre [http://localhost:3000](http://localhost:3000) con tu navegador para ver el resultado.

## Estructura del Proyecto

```plaintext
.env
.gitignore
.next/
components/
hooks/
lib/
models/
pages/
public/
styles/
README.md
package.json
```

### Componentes

- [`components/Blog.js`]: Componente para manejar la creación y edición de blogs.
- [`components/Loading.js`]: Componente para mostrar una animación de carga.

### Hooks

- [`hooks/useFetchData.js`]: Hook personalizado para obtener datos de una API.

### Modelos

- [`models/blog.js`]: Modelo de Mongoose para los blogs.

### Páginas

- [`pages/index.js`]: Página principal.
- [`pages/blogs/addblog.js`]: Página para agregar un nuevo blog.
- [`pages/blogs/edit/[...id].js`]: Página para editar un blog existente.
- [`pages/draft.js`]: Página para manejar borradores de blogs.

## Despliegue en Vercel

La forma más fácil de desplegar tu aplicación Next.js es usar la [Plataforma Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) de los creadores de Next.js.

Consulta [documentación de despliegue de Next.js](https://nextjs.org/docs/deployment) para más detalles.
