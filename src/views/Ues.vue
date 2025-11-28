<template>
  <section class="ues-section">
    <div class="ues-header">
      <p ref="label" class="eyebrow">Recursos UES</p>
      <h2 ref="titleEl" class="section-title">Repositorio colaborativo</h2>
      <p ref="descriptionEl" class="section-lead">
        Material académico para Ingeniería de Sistemas. Todo organizado por modalidad para que
        encuentres guías, laboratorios y formatos sin perder tiempo.
      </p>
    </div>

    <div class="ues-grid">
      <v-sheet
        v-for="category in categories"
        :key="category.title"
        ref="setPanelRef"
        class="ues-panel"
        elevation="0"
        rounded="xl"
      >
        <div class="panel-head">
          <span class="mono">{{ category.mode }}</span>
          <strong>{{ category.title }}</strong>
        </div>
        <p>{{ category.description }}</p>
        <ul class="resource-list">
          <li v-for="item in category.featured" :key="item.name">
            <a :href="item.link" target="_blank">{{ item.name }}</a>
          </li>
        </ul>
        <v-btn variant="outlined" rounded="pill" :href="category.driveLink" target="_blank">
          Abrir carpeta
        </v-btn>
      </v-sheet>
    </div>

    <v-sheet class="ues-disclaimer" elevation="0">
      <div>
        <h3>Notas</h3>
        <p>
          Este repositorio es comunitario y evoluciona con aportes estudiantiles. Si ves enlaces
          rotos o quieres sumar material, escríbeme.
        </p>
      </div>
      <v-btn variant="text" rounded="pill" href="mailto:davidderas50@gmail.com">
        Compartir recurso
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted } from 'vue';

gsap.registerPlugin(ScrollTrigger);

const label = ref(null);
const titleEl = ref(null);
const descriptionEl = ref(null);
const panelRefs = ref([]);
let ctx;

const categories = [
  {
    title: 'Modalidad presencial',
    mode: 'Campus',
    description: 'Parciales, laboratorios y resúmenes de asignaturas impartidas en aula.',
    driveLink: 'LINK_A_CARPETA_PRESENCIAL',
    featured: [
      { name: 'Matemática I · Guías', link: '#' },
      { name: 'Programación I · Ejemplos', link: '#' },
      { name: 'Física I · Laboratorios', link: '#' },
    ],
  },
  {
    title: 'Modalidad a distancia',
    mode: 'Virtual',
    description: 'Tutorías grabadas, guías y material diseñado para autoestudio.',
    driveLink: 'LINK_A_CARPETA_DISTANCIA',
    featured: [
      { name: 'Material didáctico', link: '#' },
      { name: 'Guías de estudio', link: '#' },
      { name: 'Tutorías destacadas', link: '#' },
    ],
  },
  {
    title: 'Extras y utilidades',
    mode: 'General',
    description: 'Pensum, formatos administrativos, software recomendado y utilidades.',
    driveLink: 'LINK_A_CARPETA_EXTRAS',
    featured: [
      { name: 'Pensum oficial', link: '#' },
      { name: 'Formatos UES', link: '#' },
      { name: 'Herramientas de apoyo', link: '#' },
    ],
  },
];

const setPanelRef = (el) => {
  if (el && !panelRefs.value.includes(el)) {
    panelRefs.value.push(el);
  }
};

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from([label.value, titleEl.value, descriptionEl.value], {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from(panelRefs.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.ues-grid',
        start: 'top 85%',
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
.ues-section {
  padding: var(--section-gap) var(--shell-padding);
}

.ues-header {
  max-width: 780px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.ues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.ues-panel {
  border: 1px solid var(--line-soft) !important;
  background: rgba(var(--v-theme-surface), 0.7);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panel-head {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.resource-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.resource-list a {
  text-decoration: underline;
}

.ues-disclaimer {
  border: 1px solid var(--line-strong) !important;
  border-radius: var(--radius-lg);
  padding: 1.5rem 2rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .ues-disclaimer {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
