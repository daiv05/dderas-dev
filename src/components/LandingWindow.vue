<template>
  <section class="hero-shell">
    <v-container fluid class="hero-grid">
      <v-row class="hero-row" align="stretch">
        <v-col cols="12" md="6">
          <div ref="copyBlock" class="hero-copy">
            <p class="eyebrow" data-animate>Hola, soy</p>
            <h1 class="hero-title" data-animate>
              David Deras
              <span class="hero-emphasis">
                Full Stack Engineer enfocado en Vue, Laravel y TypeScript
              </span>
            </h1>
            <p class="role-line" data-animate>
              <span class="role-label mono">Rol actual</span>
              <span ref="roleTicker" class="role-value">{{ currentRole }}</span>
            </p>
            <p class="hero-lead" data-animate>
              Más de dos años construyendo sistemas institucionales y plataformas públicas con Vue
              3, Laravel y despliegues en la nube. Combino arquitectura full stack, research y UX
              para entregar software accesible y listo para escalar.
            </p>

            <div ref="ctaGroup" class="hero-actions">
              <v-btn
                color="primary"
                variant="flat"
                rounded="pill"
                size="large"
                @click="scrollToProjects"
              >
                Ver proyectos
              </v-btn>
              <v-btn
                variant="outlined"
                rounded="pill"
                size="large"
                href="mailto:davidderas50@gmail.com"
              >
                Contacto directo
              </v-btn>
            </div>

            <div ref="ledgerBlock" class="hero-ledger">
              <div class="ledger-title">Stack operativo</div>
              <div class="ledger-grid">
                <div v-for="tech in techStack" :key="tech.name" class="ledger-item">
                  <span class="label">{{ tech.name }}</span>
                  <span class="value mono">{{ tech.detail }}</span>
                </div>
              </div>
            </div>
          </div>
        </v-col>

        <v-col cols="12" md="6">
          <div ref="boardBlock" class="hero-board">
            <div class="board-section" data-animate>
              <div class="board-label">Agenda inmediata</div>
              <ul class="board-list">
                <li v-for="item in agenda" :key="item.title">
                  <span>{{ item.title }}</span>
                  <span class="mono">{{ item.status }}</span>
                </li>
              </ul>
            </div>

            <div class="board-section" data-animate>
              <div class="board-label">Snapshot</div>
              <div class="chipline">
                <span v-for="note in focusNotes" :key="note.label">
                  {{ note.label }} · {{ note.value }}
                </span>
              </div>
            </div>

            <div class="board-section code-area" data-animate>
              <div class="board-label">profile.js</div>
              <div class="code-highlight" v-html="highlightedSnippet"></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { codeToHtml } from 'shiki';
import { ref, onMounted, onUnmounted, watch } from 'vue';

import { useAppStore } from '@/store/app';

const copyBlock = ref(null);
const boardBlock = ref(null);
const ledgerBlock = ref(null);
const ctaGroup = ref(null);
const roleTicker = ref(null);
const appStore = useAppStore();
let ctx;

const techStack = [
  { name: 'Frontend', detail: 'Vue 3 + TS · Vite · Pinia' },
  { name: 'Backend', detail: 'Laravel 11 · PHP 8 · Node APIs' },
  { name: 'Infra', detail: 'Vercel · Railway · Azure Static' },
  { name: 'UX Ops', detail: 'Vuetify · GSAP · Vitest' },
];

const agenda = [
  { title: 'Portal clínico DTIC - MINSAL', status: 'Release semanal' },
  { title: 'ERP Carmencita Store', status: 'Optimización post go-live' },
  { title: 'MusyCharts OSS', status: 'Feature tracking en TS' },
];

const focusNotes = [
  { label: 'Base', value: 'San Salvador, SV' },
  { label: 'Experiencia', value: '+2 años Full Stack' },
  { label: 'Sectores', value: 'GovTech · Retail · Analítica' },
];

const currentRole = ref('');
const roles = [
  'Full Stack Engineer · DTIC - MINSAL',
  'Vue 3 + Laravel Specialist',
  'Mentor de habilidades digitales UES',
  'Facilitador de workshops JS/TS',
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

const codeSnippet = `const davidDeras = {
  location: 'San Salvador, SV',
  stack: ['Vue 3 + TS', 'Laravel 11', 'Node tooling'],
  sectors: ['GovTech', 'Retail', 'Data Viz'],
  currently: () => ['DTIC - MINSAL', 'MusyCharts OSS']
}
export default davidDeras;`;
const highlightedSnippet = ref('');

const escapeHtml = (str) =>
  str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const highlightSnippet = async () => {
  highlightedSnippet.value = `<pre class="code-pre"><code>${escapeHtml(codeSnippet)}</code></pre>`;
  try {
    highlightedSnippet.value = await codeToHtml(codeSnippet, {
      lang: 'js',
      theme: appStore.theme === 'dark' ? 'github-dark-default' : 'github-light',
    });
  } catch (error) {
    console.warn('No se pudo cargar Shiki', error);
  }
};

const typeWriter = () => {
  const current = roles[roleIndex];

  if (isDeleting) {
    currentRole.value = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    currentRole.value = current.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? 45 : 90;

  if (!isDeleting && charIndex === current.length) {
    typeSpeed = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
};

const scrollToProjects = () => {
  const projectsSection = document.querySelector('.projects-section');
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: 'smooth' });
  }
};

onMounted(() => {
  highlightSnippet();
  ctx = gsap.context(() => {
    const copyTargets = copyBlock.value?.querySelectorAll('[data-animate]') ?? [];
    const boardTargets = boardBlock.value?.querySelectorAll('[data-animate]') ?? [];

    gsap.from(copyTargets, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    });

    gsap.from(ctaGroup.value, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      delay: 0.4,
      ease: 'power3.out',
    });

    gsap.from(ledgerBlock.value, {
      opacity: 0,
      y: 24,
      duration: 0.8,
      delay: 0.5,
      ease: 'power3.out',
    });

    gsap.from(boardTargets, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.2,
      delay: 0.3,
      ease: 'power3.out',
    });
  });

  setTimeout(typeWriter, 600);
});

onUnmounted(() => {
  ctx?.revert();
});

watch(
  () => appStore.theme,
  (_val) => {
    highlightSnippet();
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.hero-shell {
  padding: clamp(2rem, 6vw, 4rem) 0;
  border-bottom: 1px solid var(--line-soft);
}

.hero-grid {
  max-width: var(--page-max-width);
  margin: 0 auto;
}

.hero-copy,
.hero-board {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: clamp(1.5rem, 3vw, 2.75rem);
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  height: 100%;
}

.hero-title {
  font-size: clamp(2.5rem, 6vw, 3.75rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.hero-emphasis {
  display: block;
  font-size: clamp(1.1rem, 2.2vw, 1.35rem);
  font-weight: 500;
  color: var(--text-subtle);
}

.role-line {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.role-label {
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.role-value {
  font-size: 1.5rem;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.35rem;
  height: 2.2rem;
}

.hero-lead {
  font-size: 1.1rem;
  color: var(--text-subtle);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.hero-ledger {
  border-top: 1px solid var(--line-soft);
  padding-top: 1.25rem;
}

.ledger-title {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}

.ledger-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.75rem;
}

.ledger-item {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-sm);
  padding: 0.85rem 1rem;
}

.ledger-item .label {
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.hero-board {
  gap: 1.5rem;
}

.board-section {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-label {
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.board-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.board-list li {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.5rem;
}

.board-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.code-area {
  gap: 1rem;
}

.code-highlight {
  margin: 0;
  font-family: var(--font-mono);
  font-size: 0.9rem;
  line-height: 1.6;
  border-radius: var(--radius-sm);
  overflow-x: auto;
}

.code-highlight :deep(code) {
  text-shadow: none;
}

.code-pre {
  margin: 0;
}

@media (max-width: 959px) {
  .hero-copy,
  .hero-board {
    margin-bottom: 1.5rem;
  }
}
</style>
