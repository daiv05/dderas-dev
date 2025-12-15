---
id: 'getting-started-vue-vite'
title: 'Comenzando con Vue 3 y Vite'
slug: 'comenzando-vue-vite'
date: 2025-12-04
summary: 'Una guía completa para configurar tu primer proyecto Vue 3 con Vite, incluyendo mejores prácticas y herramientas modernas.'
tags: ['vue', 'vite', 'tailwindcss']
image: /blog/comenzando-vue-vite/vite+vue+tailwind.jpg
author: David Deras
lastmod: 2025-12-15
---

En esta guía, exploraremos cómo iniciar un proyecto moderno con Vue 3 y Vite, además como bonus instalaremos Tailwind CSS v4 para obtener estilos rápidos y responsivos. Cubriremos desde la configuración inicial hasta algunos tips para estructurar tu aplicación, manejar el estado global con Pinia, y optimizar el rendimiento.

[toc]

---

## Configurando el entorno

Antes de escribir una sola línea de Vue, asegúrate de tener:

- Node.js, cualquier versión **LTS**. Recomiendo acostumbrarse a utilizar [nvm](https://github.com/coreybutler/nvm-windows) para manejar múltiples versiones de Node.
- Un gestor de paquetes confiable (aquí usaremos `npm`, que ya viene con Node.js).
- VS Code actualizado
- Git configurado correctamente

Además deberías instalar la extensión oficial de Vue.js para VS Code:

- [Vue.js (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar). 
  Más adelante puede explorar otros plugins útiles como ESLint, Prettier y Tailwind CSS IntelliSense.

---

## ¿JavaScript o TypeScript?

La documentación oficial de Vue 3 está escrita **pensando en TypeScript**.  
La API de composición, los `props`, los `emit`, los stores y los composables se benefician enormemente del tipado.

Pero, <a href="https://dev.to/holasoymalva/stop-using-typescript-for-small-projects-47hl" target="_blank">no necesitas usar TypeScript en todos lados</a>, especialmente si estás comenzando. Asi que mi recomendación es que valores tu contexto, la aplicación y tu equipo.
En esta guía usaremos JavaScript para mantener las cosas simples.

---

## Creando el proyecto con Vite
La forma más rápida de iniciar un proyecto Vue 3 con Vite es usando el comando:

```bash
npm create vue@latest
```

Si es primera vez que lo usas, te preguntará si deseas instalar el paquete `create-vue`. Responde que sí (`y` y damos ENTER).

![Instalando create-vue](/blog/comenzando-vue-vite/install-create-vue-package.png)
*Instalando create-vue*





## Estructura del proyecto: donde nacen o mueren las apps

Vue no impone una estructura rígida, pero **eso no significa que todas las estructuras sean buenas**.

Una estructura bien fundamentada separa responsabilidades:

src/
components/ → piezas reutilizables
pages/ → vistas asociadas a rutas
composables/ → lógica reutilizable (hooks)
store/ → estado global (Pinia)
services/ → acceso a APIs
router/ → definición de rutas
styles/ → estilos globales y tokens

### ¿Por qué esta separación?

- **Components** deben ser visuales y predecibles.
- **Pages** orquestan componentes, no contienen lógica compleja.
- **Composables** encapsulan lógica reutilizable y testeable.
- **Services** evitan que Axios o Fetch se filtren por toda la app.

Este patrón está alineado con:

- Principios de _Separation of Concerns_
- Recomendaciones del core team de Vue
- Prácticas comunes en apps medianas y grandes

> Si todo vive en `components/`, tu proyecto no es simple: está desordenado.

---

## Estado global: por qué Pinia es la elección correcta

Pinia no es “el nuevo Vuex”. Es **el reemplazo oficial**.

Fundamentos claros:

- API más simple
- Mejor soporte para TypeScript
- Integración natural con la Composition API
- Menos boilerplate, menos magia

Pinia adopta patrones explícitos:

- Estado claro
- Acciones declaradas
- Sin mutaciones ocultas

**Conclusión:** para cualquier proyecto nuevo en Vue 3, Pinia es la opción técnicamente correcta.

---

## Rutas: carga diferida y responsabilidad clara

Vue Router permite algo fundamental: **lazy-loading de vistas**.

Esto no es una optimización prematura; es una buena práctica respaldada por:

- Mejor tiempo de carga inicial
- Menor consumo de recursos
- Escalabilidad real

Cada ruta debe:

- Apuntar a una vista (`page`)
- Cargarla dinámicamente
- Delegar permisos y validaciones a _guards_ o composables

La ruta no es el lugar para lógica de negocio.  
Es el lugar para **decidir qué se muestra, no cómo funciona**.

---

## Estilos: Tailwind como herramienta, no como dogma

Tailwind CSS se ha consolidado porque:

- Elimina CSS muerto
- Facilita el diseño consistente
- Funciona extremadamente bien con componentes

Pero está fundamentado en una idea clave:

> **Los estilos también son parte de la lógica del componente.**

Eso no significa llenar archivos de clases ilegibles.  
Significa:

- Extraer patrones
- Usar componentes base
- Definir tokens (colores, spacing, tipografía)

Tailwind no reemplaza el criterio. Lo amplifica.

---

## Testing: lo que no pruebas, no existe

Vue 3 y Vite integran **Vitest** de forma nativa.  
Esto no es casualidad: la cercanía entre tooling y testing reduce fricción.

La base sólida:

- Probar **composables** antes que componentes
- Testear lógica, no estilos
- Usar componentes como integración, no como unidad aislada

**Fundamento:** la mayor parte de los bugs no están en el HTML, están en la lógica.

---

## VS Code + IA: productividad con responsabilidad

La IA no reemplaza al desarrollador, pero **sí amplifica sus decisiones**.

Usada correctamente:

- Acelera boilerplate
- Sugiere tests
- Explica errores complejos
- Ayuda a refactorizar

Usada sin criterio:

- Introduce bugs sutiles
- Genera código innecesario
- Oculta problemas de diseño

**Regla clave:**

> La IA propone. Tú decides.

VS Code, junto con extensiones oficiales (Volar, ESLint, TypeScript), crea un entorno donde los errores aparecen **antes** de ejecutar la app. Eso es ingeniería, no magia.

---

## Producción: pensar desde el primer día

Una app Vue no termina en `npm run dev`.

Desde el inicio deberías considerar:

- Variables de entorno bien definidas
- Separación entre config y código
- Builds reproducibles
- Deploys predecibles

Vite facilita esto, pero no lo hace automático.  
La responsabilidad sigue siendo del desarrollador.

---

## Reflexión final

Aprender Vue 3 no es aprender sintaxis.  
Es aprender a **pensar en componentes, estados, flujos y límites claros**.

Vue 3 + Vite + VS Code + IA forman un stack moderno, pero solo funciona bien si:

- Las decisiones están fundamentadas
- La estructura es clara
- El tooling se usa con criterio
- La IA se usa como apoyo, no como muleta

Si entiendes esto, no solo estás empezando con Vue.  
Estás empezando **bien**.

---

- Diagrama de estructura de carpetas (arquitectura)
- Flujo de carga de una ruta con lazy-loading
- Pirámide de testing (composables → vistas → e2e)
- Flujo de desarrollo con IA (idea → código → test → commit)
