<template>
  <section class="overview-section">
    <div class="overview-header">
      <p ref="titleEl" class="eyebrow">Mapa de contenidos</p>
      <h2 ref="headingEl" class="section-title">Espacios en constante iteración</h2>
      <p ref="descriptionEl" class="section-lead">
        Proyectos, guías y recursos que crecen con cada entrega. Todo está dividido en rutas claras
        para que explores según lo que necesitas.
      </p>
    </div>

    <div class="overview-grid">
      <v-sheet
        v-for="area in areas"
        :key="area.title"
        ref="setPanelRef"
        class="overview-panel"
        elevation="0"
        rounded="xl"
        tabindex="0"
        @click="navigateTo(area.to)"
        @keyup.enter="navigateTo(area.to)"
        @keyup.space.prevent="navigateTo(area.to)"
      >
        <div class="panel-top">
          <span class="mono">{{ area.label }}</span>
          <span class="panel-link">{{ area.cta }}</span>
        </div>
        <h3>{{ area.title }}</h3>
        <p>{{ area.body }}</p>
        <div class="panel-tags">
          <span v-for="tag in area.tags" :key="tag">{{ tag }}</span>
        </div>
      </v-sheet>
    </div>

    <v-sheet ref="ctaSection" class="collab-panel" elevation="0">
      <div>
        <h3>¿Construimos algo nuevo?</h3>
        <p>
          Busco colaborar con equipos que valoran investigación, documentación y ciclos cortos.
          Comparte tu idea y diseñamos un plan.
        </p>
      </div>
      <v-btn variant="outlined" rounded="pill" size="large" href="mailto:davidderas50@gmail.com">
        Escribir mensaje
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

gsap.registerPlugin(ScrollTrigger);

const router = useRouter();
const titleEl = ref(null);
const headingEl = ref(null);
const descriptionEl = ref(null);
const panelRefs = ref([]);
const ctaSection = ref(null);
let ctx;

const areas = [
  {
    label: '01',
    title: 'Proyectos y casos',
    body: 'Sistemas empresariales, dashboards y herramientas personales con documentación técnica clara.',
    tags: ['Vue 3', 'Laravel', 'Vuetify'],
    cta: 'Ver dossier',
    to: '/proyectos',
  },
  {
    label: '02',
    title: 'Tutoriales y notas',
    body: 'Guías cortas sobre despliegues, cloud y automatizaciones que uso a diario.',
    tags: ['Azure', 'Railway', 'Automatización'],
    cta: 'Abrir blog',
    to: '/tutoriales',
  },
  {
    label: '03',
    title: 'Recursos UES',
    body: 'Repositorio colectivo para la Escuela de Sistemas: pensum, guías, parciales y material de apoyo.',
    tags: ['Documentos', 'Laboratorios', 'Pensum'],
    cta: 'Entrar al drive',
    to: '/documentos-y-guias',
  },
];

const setPanelRef = (el) => {
  if (el && !panelRefs.value.includes(el)) {
    panelRefs.value.push(el);
  }
};

const navigateTo = (path) => {
  router.push(path);
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from([titleEl.value, headingEl.value, descriptionEl.value], {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.overview-section',
        start: 'top 85%',
        once: true,
      },
    });

    gsap.from(panelRefs.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.overview-grid',
        start: 'top 80%',
        once: true,
      },
    });

    gsap.from(ctaSection.value, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.collab-panel',
        start: 'top 90%',
        once: true,
      },
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped lang="scss">
.overview-section {
  padding: var(--section-gap) var(--shell-padding);
  border-bottom: 1px solid var(--line-soft);
}

.overview-header {
  max-width: 720px;
  margin: 0 auto 3rem;
  text-align: center;
}

.overview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.overview-panel {
  border: 1px solid var(--line-soft) !important;
  background: rgba(var(--v-theme-surface), 0.7);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  cursor: pointer;
  transition:
    border-color var(--transition-base),
    transform var(--transition-base);
}

.overview-panel:focus-visible {
  outline: none;
  border-color: var(--line-strong) !important;
}

.overview-panel:hover {
  transform: translateY(-4px);
  border-color: var(--line-strong) !important;
}

.panel-top {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.panel-link {
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.overview-panel h3 {
  font-size: 1.4rem;
  margin: 0;
}

.overview-panel p {
  color: var(--text-subtle);
}

.panel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
}

.panel-tags span {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 0.85rem;
}

.collab-panel {
  border: 1px solid var(--line-strong) !important;
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
}

.collab-panel h3 {
  margin-bottom: 0.5rem;
}

.collab-panel p {
  color: var(--text-subtle);
  max-width: 520px;
}

@media (max-width: 768px) {
  .collab-panel {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
