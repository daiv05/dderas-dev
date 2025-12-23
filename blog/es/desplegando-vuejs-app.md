---
id: 'deploying-vuejs-app'
title: 'Desplegando Vue.js App'
slug: 'desplegando-vuejs-app'
date: 2023-03-01
summary: 'Automatiza el despliegue de una SPA en Vercel con variables seguras.'
tags: ['Vue.js', Vercel]
image: /blog/deploying-a-vuejs-app/shared/vue-vercel.png
author: David Deras
lastmod: 2025-12-04
---

# CONTENIDO EN CONSTRUCCIÓN

---

En esta ocasión, vamos a ver cómo desplegar una aplicación Vue.js en <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">Vercel</a>, una plataforma de despliegue en la nube que facilita la publicación de aplicaciones web. Vercel ofrece una integración perfecta con frameworks modernos como Vue.js, Nuxt, Svelte, etc., permitiendo un despliegue rápido y sencillo.

## Requisitos previos

Lo primero que necesitamos es una cuenta en Vercel. Si no tienes una, puedes registrarte de forma gratuita en su sitio web, tomas el plan personal y creas la cuenta usando tu correo electrónico o tu cuenta de Google/GitHub/GitLab/Bitbucket.

Luego de eso podemos proceder a crear un nuevo proyecto en Vercel. En esta guía usaremos la interfaz de Vercel en lugar de la línea de comandos para mayor facilidad.

## Creando un nuevo proyecto en Vercel

1. Inicia sesión en tu cuenta de Vercel.
2. Haz clic en el botón "Add New" y selecciona "Project".

![Agregar nuevo proyecto en Vercel](/blog/deploying-a-vuejs-app/shared/add-new-project.png)
_Agregar nuevo proyecto en Vercel_

3. Conecta tu repositorio de GitHub, GitLab o Bitbucket donde tienes tu aplicación Vue.js. Si aún no has conectado tu cuenta, Vercel te guiará para hacerlo.
4. Selecciona el repositorio de la aplicación Vue.js que deseas desplegar.

![Seleccionar repositorio en Vercel](/blog/deploying-a-vuejs-app/shared/import-project.png)
_Para esta guía seleccionaré "project-test"_

5. Vercel detectará automáticamente que es una aplicación con Vite (el empaquetador por defecto de Vue.js) y configurará los ajustes de construcción y despliegue. Si abres el selector de frameworks, verás la gran variedad de frameworks soportados por Vercel. Podrás ver que también está Vue.js (que hace referencia a Vue CLI) pero al menos para proyectos actuales lo normal es crearlos con Vite ya no con la CLI.

- **Framework Preset**: Indica que framework estás utilizando. En este caso, Vercel detecta automáticamente "Vite".
- **Root Directory**: Si tu proyecto Vue.js está en una subcarpeta, especifica la ruta aquí. Lo normal es dejarlo con el valor por defecto (./).
- **Build Command**: El comando para construir tu aplicación. Para Vue.js con Vite, es `npm run build` o `vite build`. Si por alguna razón haz cambiado el script de construcción en tu `package.json`, asegúrate de actualizarlo aquí.
- **Output Directory**: La carpeta donde se generan los archivos estáticos después de la construcción. Para Vue.js con Vite, es `dist`. Puedes comprobar esto ejecutando `npm run build` localmente y viendo dónde se generan los archivos. Si has cambiado la configuración de salida en `vite.config.js`, asegúrate de reflejar ese cambio aquí.
- **Install Command**: El comando para instalar las dependencias. Normalmente es `npm install` o `yarn install`, dependiendo del gestor de paquetes que uses.