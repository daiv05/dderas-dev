<template>
  <footer class="site-footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <p class="eyebrow">David Deras</p>
        <p>
          Full Stack Engineer en San Salvador. Construyo sistemas públicos y ERP con Vue 3,
          TypeScript y Laravel, documentando cada entrega para que los equipos escalen sin fricción.
        </p>
      </div>

      <div class="footer-links">
        <p class="mono">Mapa rápido</p>
        <div class="nav-pills">
          <router-link to="/inicio">Inicio</router-link>
          <router-link to="/proyectos">Proyectos</router-link>
          <router-link to="/documentos-y-guias">Recursos UES</router-link>
          <router-link to="/herramientas">Herramientas</router-link>
        </div>
        <a class="cv-link" href="/David_Deras_Frontend_Engineer.pdf" download>Descargar CV</a>
      </div>

      <div class="footer-contact">
        <p class="mono">Contacto</p>
        <a href="tel:+50374641460">(+503) 7464-1460</a>
        <a href="mailto:davidderas50@gmail.com">davidderas50@gmail.com</a>
        <div class="social-inline">
          <a href="https://github.com/daiv05" target="_blank" rel="noopener">GitHub</a>
          <a href="https://linkedin.com/in/dderas" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://twitter.com/daiv_09" target="_blank" rel="noopener">Twitter</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="mono">© deras.dev - {{ currentYear }}</span>
      <span>Construido con Vue · Vuetify · GSAP</span>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';

const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped lang="scss">
.site-footer {
  border-top: 1px solid var(--line-soft);
  padding: 2.5rem var(--shell-padding);
}

.footer-inner {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.footer-brand p:last-child {
  color: var(--text-subtle);
}

.footer-links,
.footer-contact {
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.nav-pills {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.nav-pills a {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.35rem 0.85rem;
  font-size: 0.85rem;
}

.cv-link {
  font-size: 0.9rem;
  text-decoration: underline;
  width: fit-content;
}

.footer-links a,
.footer-contact a {
  text-decoration: none;
}

.social-inline {
  display: flex;
  gap: 0.75rem;
}

.footer-bottom {
  border-top: 1px solid var(--line-soft);
  padding-right: 60px;
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  color: var(--text-subtle);
}
</style>
