---
id: 'getting-started-vue-vite'
title: 'Comenzando con Vue 3 y Vite'
slug: 'comenzando-vue-vite'
date: 2025-12-04
summary: 'Una guía completa para configurar tu primer proyecto Vue 3 con Vite, incluyendo mejores prácticas y herramientas modernas.'
tags: ['Vue.js', 'Vite', 'Tailwind CSS']
image: /blog/getting-started-vue-vite/shared/vite+vue+tailwind.jpg
author: David Deras
lastmod: 2025-12-15
---

En esta guía, exploraremos cómo iniciar un proyecto moderno con Vue 3 y Vite, además como bonus instalaremos Tailwind CSS v4 para obtener estilos rápidos y responsivos. Cubriremos desde la configuración inicial hasta algunos tips para estructurar tu aplicación, manejar el estado global con Pinia, y optimizar el rendimiento. Por último subiremos el proyecto a GitHub para que lo puedas compartir.

[toc]

---

## Configurando el entorno

Antes de escribir una sola línea de Vue, debemos tener:

- Node.js, cualquier versión **LTS**. Recomiendo acostumbrarse a utilizar <a target="_blank" href="https://github.com/coreybutler/nvm-windows">nvm</a> para manejar múltiples versiones de Node.
- Un gestor de paquetes (aquí usaremos `npm`, que ya se instala con Node.js).
- <a target="_blank" href="https://code.visualstudio.com/">VS Code</a> actualizado
- <a target="_blank" href="https://www.desarrollolibre.net/blog/programacion-basica/la-guia-de-git-que-nunca-tuve">Git configurado</a> correctamente

Además, instala la extensión oficial de Vue.js para VS Code:

- <a target="_blank" href="https://marketplace.visualstudio.com/items?itemName=Vue.volar">Vue.js (Volar)</a>.
  Más adelante puede explorar otros plugins útiles como ESLint, Prettier y Tailwind CSS IntelliSense.

---

## ¿JavaScript o TypeScript?

Vue 3 tiene un soporte excelente para TypeScript, puedes usarlo teniendo en cuenta la <a target="_blank" href="https://vuejs.org/guide/typescript/overview.html">guía de uso oficial</a>.

No necesitas usar TypeScript en todos tus proyectos, especialmente si estás comenzando o solo quieres experimentar. Asi que mi recomendación es que valores tu contexto, la aplicación y tu equipo (si aplica), ¡investiga!

En esta guía usaremos JavaScript para mantener las cosas simples.

---

## Creando el proyecto con Vite

La forma más rápida de iniciar un proyecto Vue 3 con Vite es usando el comando:

```bash
npm create vue@latest
```

Si es primera vez que lo usas, te preguntará si deseas instalar el paquete `create-vue`. Responde que sí (escribimos `y` y damos ENTER).

![Instalando create-vue](/blog/getting-started-vue-vite/shared/install-create-vue-package.png)
_Instalando paquete: create-vue_

Nos preguntará por el nombre del proyecto, escribe el nombre que quieras:

![Nombre del proyecto](/blog/getting-started-vue-vite/shared/project-name.png)
_Asigna un nombre que te ayude a identificar tu proyecto_

Luego selecciona las opciones que necesites:

![Opciones del proyecto](/blog/getting-started-vue-vite/shared/project-options.png)
_Features disponibles al crear una app Vue_

Vamos punto por punto (tal como se muestra en la imagen, nos movemos con las flechas y seleccionamos con la barra espaciadora):

1. **TypeScript**: como mencionamos antes, usaremos JavaScript, así que ignoramos.
2. **JSX Support**: Ignoramos, no usaremos <a target="_blank" href="https://kinsta.com/es/blog/que-es-jsx/">JSX</a>.
3. **Router (SPA development)**: Vue Router es esencial para trabajar con Vue como SPA (Single Page Application). No ahondaremos en temas de <a target="_blank" href="https://www.geeksforgeeks.org/blogs/spa-vs-mpa-which-one-is-better-for-you/">SPA vs MPA</a>, solo ten presente que Vue funciona como SPA por defecto. Selecciona esta opción.
4. **Pinia (state management)**: es el reemplazo oficial de Vuex para manejo de estado. Nos ayudará a manejar datos compartidos entre componentes. Selecciona esta opción.
5. **Vitest (unit testing)**: es el framework de testing recomendado para proyectos con Vite. Ignoramos por ahora.
6. **End-to-End Testing**: es una herramienta para pruebas E2E. Ignoramos por ahora.
7. **ESLint (error prevention)**: es una herramienta para mantener la calidad del código, ayudando a detectar errores y mantener un estilo consistente. Recomiendo mucho su uso, aunque es importante personalizarlo según tu equipo y proyecto. La seleccionaremos para explorarla un poco más adelante.
8. **Prettier (code formatting)**: es una herramienta para formatear el código automáticamente, recomiendo mucho usarla (aunque al igual que ESLint, es importante configurarla según tus necesidades, o directamente no usarla). En este caso la seleccionaremos también para explorarla.

Despues de seleccionar según las necesidades de tu proyecto, presionamos ENTER y ahora nos preguntará sobre algunas features experimentales de Vite:

![Features experimentales de Vite](/blog/getting-started-vue-vite/shared/project-experimental-options.png)
_Features experimentales de Vite_

1. **Oxlint**: es un nuevo linter, parte de <a target="_blank" href="https://oxc.rs/">OXC</a>, una nueva colección de herramientas de javascript escritas en Rust, Oxlint es en extremo rápido y promete bastante, sin embargo como se menciona en su web: "En esta etapa, Oxlint puede utilizarse para sustituir por completo a ESLint en proyectos pequeños y medianos." Por ahora, recomiendo seguir usando ESLint, así que ignoramos esta opción.
2. **rolldown vite (experimental)**: Rolldown-vite es una bifurcación de Vite que utiliza Rolldown en lugar de Rollup y esbuild, con el objetivo de obtener el máximo rendimiento. Pronto se convetirá en el paquete por defecto, por ahora ignoremos esta opción.

Despues de seleccionar las opciones, presionamos ENTER.

Nos preguntará si queremos empezar con un proyecto totalmente en blanco o con ejemplos. Si es tu primera vez, te recomiendo seleccionar "No" para que puedas ver una estructura básica con ejemplos. Esa será la opción que seleccionaremos aquí.

Vite creará la estructura inicial del proyecto y nos dará algunos comandos útiles, vamos ejecutando uno por uno:

![Proyecto creado](/blog/getting-started-vue-vite/shared/project-created.png)
_Proyecto creado_

1. Primero navegamos a la carpeta del proyecto:

```bash
cd nombre-del-proyecto
```

2. Instalamos las dependencias (esto puede tardar unos minutos dependiendo de tu conexión):

```bash
npm install
```

3. Este comando es para correr Prettier, no tendrá ningún efecto porque no hemos modificado nada aún, pero es bueno tenerlo presente:

```bash
npm run format
```

4. Finalmente, iniciamos el servidor de desarrollo:

```bash
npm run dev
```

![Servidor de desarrollo corriendo](/blog/getting-started-vue-vite/shared/dev-server-running.png)
_Servidor de desarrollo levantado_

Vite corre el servidor de desarrollo en `http://localhost:5173/` (el puerto puede variar si el 5173 ya está en uso (5174, 5175, etc.) ).

> El puerto 5173 es un guiño al propio Vite:
>
> - 5 = V
> - 1 = I
> - 7 = T
> - 3 = E
>
> Aunque más allá de eso, Vite utiliza el puerto 5173 porque es poco habitual en entornos de desarrollo, lo que reduce la probabilidad de conflictos con otros servidores locales. Vía <a target="_blank" href="https://medium.com/@bishakhghosh0/why-localhost-5173-is-every-frontend-developers-best-friend-b3bb5b6fb1db">Why localhost:5173 is Every Frontend Developer’s Best Friend</a>.

Si entramos a esa URL en nuestro navegador, veremos la app Vue corriendo:

![App Vue corriendo](/blog/getting-started-vue-vite/shared/vue-app-running.png)
_App Vue corriendo_

Como puedes ver, el equipo de Vue comparte varios recursos oficiales para aprender más sobre el framework, comenzando por la <a target="_blank" href="https://vuejs.org/guide/introduction.html">documentación oficial</a>. Explora cada enlace para aprender y conocer sobre todo el ecosistema.

---

## Estructura del proyecto

Pasemos a ver la estructura inicial, abre el proyecto en tu editor de código favorito (recomiendo VS Code):

```bash
my-vue-app/
├── .vscode/              # (Si estás en VS Code) Configuración de Visual Studio Code
├── node_modules/         # Dependencias del proyecto, generadas al instalar los paquetes
├── public/               # Archivos estáticos
├── src/                  # Código fuente de la aplicación
│   ├── assets/           # Recursos como imágenes y estilos
│   ├── components/       # Componentes Vue reutilizables
│   ├── router/           # Configuración de Vue Router
│   ├── store/            # Configuración de Pinia
│   ├── views/            # Vistas para las rutas
│   ├── App.vue           # Componente raíz de la aplicación
│   └── main.js           # Punto de entrada de la aplicación
├── .editorconfig         # Configuración de EditorConfig
├── .gitattributes        # Configuración de Git
├── .gitignore            # Archivos y carpetas ignoradas por Git
├── .prettierrc.json      # Configuración de Prettier
├── .eslint.config.js     # Configuración de ESLint
├── index.html            # Archivo HTML principal
├── jsconfig.json         # Configuración de JavaScript para el editor
├── package-lock.json     # Versiones exactas de las dependencias (autogenerado)
├── package.json          # Información del proyecto y scripts
├── README.md             # Documentación del proyecto
└── vite.config.js        # Configuración de Vite
```

La estructura puede variar ligeramente dependiendo de las opciones seleccionadas al crear el proyecto (por ejemplo, si se incluye o no ESLint o Pinia). Además, si estás usando VS Code es probable que veas la carpeta `.vscode/` con configuraciones específicas para el editor y que algunos archivos los veas "agrupados":

![Estructura del proyecto en VS Code](/blog/getting-started-vue-vite/shared/project-structure-nested.png)
_Estructura del proyecto en VS Code_

Esto es solo una forma visual que tiene VS Code para organizar los archivos, puedes mostrarlos individualmente (opción que prefiero) cambiando el valor de `"explorer.fileNesting.enabled"` a `false` en el archivo `.vscode\settings.json`.

### Entendiendo las carpetas principales

- `public/`: Aquí van los archivos estáticos que no serán procesados por Vite. Puedes colocar imágenes, fuentes u otros recursos que necesites servir directamente.
- `src/`: Esta es la carpeta más importante, contiene todo el código fuente de tu aplicación. Aquí tenemos:
  - `assets/`: Aquí van los recursos como imágenes y estilos CSS.
  - `components/`: Aquí van los componentes Vue reutilizables que puedes usar en diferentes partes de tu aplicación, por ejemplo, botones, tarjetas, modales, etc.
  - `router/`: Aquí va la configuración de <a href="https://router.vuejs.org/" target="_blank">Vue Router</a>, donde defines las rutas de tu aplicación y cómo se navega entre ellas.
  - `store/`: Aquí va la configuración de <a href="https://pinia.vuejs.org/" target="_blank">Pinia</a>, donde defines el <a href="https://kinsta.com/es/blog/vue-pinia/" target="_blank">estado global de tu aplicación. </a>
  - `views/`: Aquí van las vistas principales que corresponden a las rutas definidas en Vue Router. Cada vista generalmente representa una página completa, caso contrario a los componentes que son partes más pequeñas y reutilizables. A final todos son archivos `.vue`, por lo que la diferencia radica en su propósito y uso.
  - `App.vue`: Este es el componente raíz de tu aplicación, donde se monta todo (ya explicaremos más adelante).
  - `main.js`: Este es el punto de entrada de tu aplicación, donde se inicializa Vue, se configuran los plugins (como Vue Router y Pinia) y se monta la aplicación en el DOM.

### ¿Es suficiente esta estructura?

Esta es la estructura básica que Vite genera para un proyecto Vue 3. Es un buen punto de partida, pero a medida que tu aplicación crezca, es probable que necesites organizar mejor tu código. Existen algunas prácticas comunes para estructurar proyectos Vue más grandes, como:

- Crear subcarpetas por módulo/funcionalidad dentro de las distintas carpetas, como `components/` y `views/`. Por ejemplo:

```bash
my-vue-app/
├── src/
│   ├── assets/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   └── shared/
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.vue
│   │   │   └── RegisterForm.vue
│   │   ├── dashboard/
│   │   │   ├── StatsCard.vue
│   │   │   └── ChartWidget.vue
│   │   └── shared/
│   │       ├── BaseButton.vue
│   │       └── BaseModal.vue
│   │
│   ├── views/
│   │   ├── auth/
│   │   │   ├── LoginView.vue
│   │   │   └── RegisterView.vue
│   │   ├── dashboard/
│   │   │   └── DashboardView.vue
│   │   └── home/
│   │       └── HomeView.vue
│   │
│   ├── store/
│   │   ├── auth/
│   │   │   └── auth.store.js
│   │   ├── dashboard/
│   │   │   └── dashboard.store.js
│   │   └── shared/
│   │       └── ui.store.js
│   │
│   ├── router/
│   │   ├── auth.routes.js
│   │   ├── dashboard.routes.js
│   │   └── index.js
│   │
│   ├── App.vue
│   └── main.js
├── ...
```

**Puedes usar este enfoque** en apps pequeñas o medianas en las que quieres un poco más de orden sin complicarte demasiado. **La limitante** es que a medida que la app crece, puede volverse difícil manejar dependencias entre módulos y mantener el código organizado, porque todo está disperso en varias carpetas.

- En otros casos, puedes optar por una estructura basada en funcionalidades o módulos, donde cada uno tiene su propia carpeta que contiene componentes, vistas, y lógica relacionada. Por ejemplo:

```bash
my-vue-app/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── components/
│   │   │   │   └── LoginForm.vue
│   │   │   ├── views/
│   │   │   │   └── LoginView.vue
│   │   │   ├── store/
│   │   │   │   └── auth.store.js
│   │   │   ├── router/
│   │   │   │   └── auth.routes.js
│   │   │   └── index.js
│   │   │
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── views/
│   │   │   ├── store/
│   │   │   ├── router/
│   │   │   └── index.js
│   │   │
│   │   └── users/
│   │       ├── components/
│   │       ├── views/
│   │       ├── store/
│   │       ├── router/
│   │       └── index.js
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   ├── BaseButton.vue
│   │   │   └── BaseModal.vue
│   │   ├── composables/
│   │   │   └── useFetch.js
│   │   ├── store/
│   │   │   └── ui.store.js
│   │   ├── utils/
│   │   │   └── formatDate.js
│   │   └── constants/
│   │       └── roles.js
│   │
│   ├── router/
│   │   └── index.js
│   │
│   ├── assets/
│   ├── App.vue
│   └── main.js
├── ...
```

Cada módulo o característica tiene **todo lo que necesita en un solo lugar**, lo que facilita la navegación y el mantenimiento del código. Este enfoque es especialmente útil en aplicaciones grandes y complejas. Al dividir por módulos puede haber cierta duplicación de código si varias características comparten componentes o lógica similar, y esto se mitiga utilizando la carpeta `shared/`, donde puedes colocar componentes reutilizables, composables, utilidades y constantes que se usan en toda la aplicación.

Al final, la elección depende del tamaño y complejidad de tu proyecto, así como de las **_preferencias de tu equipo_**.

---

## Entendiendo como se monta la app Vue

El punto de entrada de la aplicación es el archivo `src/main.js`. Aquí es donde se inicializa Vue, se configuran los plugins y se monta la aplicación en el DOM. Abre el archivo `src/main.js`:

```javascript
import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
```

Aquí estamos haciendo lo siguiente:

1. Importamos los estilos globales desde `main.css`. Este archivo contiene cualquier estilo que quieras aplicar globalmente.
2. Importamos la función `createApp` y `createPinia` para crear una nueva instancia de la aplicación y para configurar el estado global con Pinia.
3. Importamos el componente raíz `App.vue`.
4. Importamos la configuración de nuestras rutas desde `src/router/index.js`.
5. Creamos la instancia de la aplicación con `createApp(App)`, pasando el componente raíz `App` como argumento, indicando que este será el punto de partida de nuestra aplicación Vue, básicamente le estamos diciendo a Vue: "Aquí está el componente principal, constrúyeme la aplicación a partir de él".
6. Usamos `app.use(createPinia())` para registrar la instancia de Pinia, habilitando el manejo de estado global en nuestra aplicación.
7. Usamos `app.use(router)` para registrar la instancia de Vue Router y habilitar la navegación entre vistas.
8. Finalmente, montamos la aplicación en el elemento del DOM con el id `app` usando `app.mount('#app')`.

Ahora, abre el archivo `index.html` en la raíz del proyecto:

```html
<!DOCTYPE html>
<html lang="">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

Aquí vemos que el archivo HTML tiene un `<div>` con el id `app`, que es donde Vue montará nuestra aplicación. El `<script>` que le sigue carga nuestro archivo `main.js`, que es donde inicializamos Vue.

¿Y que es el componente `App.vue`? Es la raíz de nuestra aplicación. Abre el archivo `src/App.vue`:

```vue
<script setup>
import { RouterLink, RouterView } from 'vue-router';
import HelloWorld from './components/HelloWorld.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
/* Estilos CSS */
</style>
```

Aquí vemos que `App.vue` contiene un encabezado con un logo, un componente `HelloWorld`, y un menú de navegación con enlaces a las rutas definidas. El `<RouterView />` es donde se renderizarán las vistas correspondientes según la ruta actual, gracias a Vue Router.
Entonces, repasemos el flujo completo:

1. El archivo `index.html` es lo que el navegador nos muestra, y lo primero que hace es cargar `main.js`.
2. En `main.js`, se crea la aplicación Vue con `App.vue` como componente raíz (a parte de importar estilos, configurar Pinia, Vue Router y otras configuraciones).
3. `App.vue` define la estructura principal de la aplicación (como un layout principal) y utiliza `<RouterView />` para renderizar las vistas según la ruta actual.

Ahora exploremos la configuración de Vue Router. Abre el archivo `src/router/index.js`:

```javascript
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
```

Aquí estamos importando las funciones necesarias de Vue Router y definiendo una ruta básica para la vista `HomeView` y otra para `AboutView`. La ruta `/` renderiza `HomeView`, y la ruta `/about` carga `AboutView` utilizando carga diferida (<a href="https://medium.com/@drewcauchi/lazy-loading-in-vue-js-bb32018d2c2d" target="_blank">lazy loading</a>).

![Flujo de una app Vue](/blog/getting-started-vue-vite/es/explaining-vue-app.png)
_Flujo de una app Vue_

Esto quiere decir que todo lo que veas dentro de `App.vue` estará siempre presente (como el header y el menú de navegación), mientras que el contenido principal se mostrará dentro de `<RouterView />` y cambiará dependiendo de la ruta actual, gracias a Vue Router.

---

## Pinia para manejo de estado global

---

## Composables en Vue 3

---

## Optimización y buenas prácticas

---

## ESLint y Prettier

---

## EXTRA: Instalando Tailwind CSS v4

---

## EXTRA: Subiendo el proyecto a GitHub
