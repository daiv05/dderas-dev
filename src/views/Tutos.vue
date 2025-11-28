<template>
  <section class="tutorials-section">
    <div class="tutorials-header">
      <p ref="label" class="eyebrow">Notas y tutoriales</p>
      <h2 ref="titleEl" class="section-title">Bitácora técnica abierta</h2>
      <p ref="descriptionEl" class="section-lead">
        Registros prácticos sobre despliegue, cloud y automatización. Son apuntes que uso para
        repetir procesos sin fricción.
      </p>
    </div>

    <div class="filters">
      <v-slide-group v-model="selectedCategory" class="filter-group" center-active show-arrows>
        <v-slide-group-item value="all">
          <v-btn rounded="pill" size="small" :class="chipClass('all')">Todos</v-btn>
        </v-slide-group-item>
        <v-slide-group-item v-for="category in categories" :key="category" :value="category">
          <v-btn rounded="pill" size="small" :class="chipClass(category)">{{ category }}</v-btn>
        </v-slide-group-item>
      </v-slide-group>

      <v-text-field
        v-model="searchQuery"
        variant="outlined"
        hide-details
        density="comfortable"
        label="Buscar por tema o etiqueta"
        rounded="pill"
        clearable
      ></v-text-field>
    </div>

    <div class="tutorial-table-wrapper">
      <table class="tutorial-table">
        <thead>
          <tr>
            <th>Tutorial</th>
            <th>Área</th>
            <th>Año</th>
            <th>Etiquetas</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tutorial in filteredTutorials" :key="tutorial.id">
            <td>
              <div class="tutorial-title">{{ tutorial.name }}</div>
              <div class="tutorial-description">{{ tutorial.description }}</div>
            </td>
            <td>{{ tutorial.category }}</td>
            <td class="mono">{{ tutorial.date }}</td>
            <td>
              <div class="chipline">
                <span v-for="tag in tutorial.tags" :key="tag">{{ tag }}</span>
              </div>
            </td>
            <td>
              <v-btn
                variant="text"
                rounded="pill"
                size="small"
                :href="tutorial.link"
                target="_blank"
              >
                Abrir
              </v-btn>
            </td>
          </tr>
          <tr v-if="!filteredTutorials.length">
            <td colspan="5" class="empty-state">No hay resultados con los filtros actuales.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { ref, computed, onMounted, onUnmounted } from 'vue';

import tutos_list from '@/tutos.js';

const tutorials = ref(tutos_list);
const selectedCategory = ref('all');
const searchQuery = ref('');
const label = ref(null);
const titleEl = ref(null);
const descriptionEl = ref(null);
let ctx;

const categories = computed(() => {
  const cats = new Set(tutorials.value.map((t) => t.category));
  return Array.from(cats);
});

const filteredTutorials = computed(() => {
  let data = tutorials.value;

  if (selectedCategory.value !== 'all') {
    data = data.filter((t) => t.category === selectedCategory.value);
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    data = data.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description.toLowerCase().includes(query) ||
        t.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return data;
});

const chipClass = (value) => ({
  'chip-btn': true,
  'chip-btn--active': selectedCategory.value === value,
});

onMounted(() => {
  ctx = gsap.context(() => {
    gsap.from([label.value, titleEl.value, descriptionEl.value], {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });
  });
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped lang="scss">
.tutorials-section {
  padding: var(--section-gap) var(--shell-padding);
}

.tutorials-header {
  max-width: 760px;
  margin: 0 auto 2rem;
  text-align: center;
}

.filters {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.filter-group {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 0.5rem;
}

.chip-btn {
  border: 1px solid transparent;
}

.chip-btn--active {
  border-color: var(--line-strong);
}

.tutorial-table-wrapper {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  overflow-x: auto;
}

.tutorial-table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 1rem;
  border-bottom: 1px solid var(--line-soft);
  vertical-align: top;
}

th {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-align: left;
}

tr:last-child td {
  border-bottom: none;
}

.tutorial-description {
  color: var(--text-subtle);
  font-size: 0.95rem;
}

.empty-state {
  text-align: center;
  color: var(--text-subtle);
}

@media (max-width: 768px) {
  th,
  td {
    padding: 0.75rem;
  }
}
</style>
