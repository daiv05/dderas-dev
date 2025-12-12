<template>
  <section class="hero-shell">
    <v-container fluid class="hero-grid">
      <v-row class="hero-row" align="stretch">
        <v-col cols="12" md="6">
          <div ref="copyBlock" class="hero-copy">
            <p class="eyebrow" data-animate>{{ t('hero.eyebrow') }}</p>
            <h1 class="hero-title" data-animate>
              {{ t('hero.title') }}
              <span class="hero-emphasis">
                {{ t('hero.highlight') }}
              </span>
            </h1>
            <p class="role-line" data-animate>
              <span class="role-label mono">{{ t('hero.roleLabel') }}</span>
              <span ref="roleTicker" class="role-value">{{ currentRole }}</span>
            </p>
            <p class="hero-lead" data-animate>
              {{ t('hero.lead') }}
            </p>

            <div ref="ctaGroup" class="hero-actions">
              <v-btn
                color="primary"
                variant="flat"
                rounded="pill"
                size="large"
                class="text-none"
                @click="goToProjects"
              >
                {{ t('hero.ctas.primary') }}
              </v-btn>
              <v-btn
                variant="outlined"
                rounded="pill"
                size="large"
                class="text-none"
                href="mailto:davidderas50@gmail.com"
              >
                {{ t('hero.ctas.secondary') }}
              </v-btn>
            </div>

            <div ref="ledgerBlock" class="hero-ledger">
              <div class="ledger-title">{{ t('hero.stackTitle') }}</div>
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
              <div class="board-label">{{ t('hero.agendaTitle') }}</div>
              <ul class="board-list">
                <li v-for="item in agenda" :key="item.title">
                  <span>{{ item.title }}</span>
                  <span class="mono">{{ item.status }}</span>
                </li>
              </ul>
            </div>

            <div class="board-section" data-animate>
              <div class="board-label">{{ t('hero.snapshotTitle') }}</div>
              <div class="chipline">
                <span v-for="note in focusNotes" :key="note.label">
                  {{ note.label }} · {{ note.value }}
                </span>
              </div>
            </div>

            <div class="board-section code-area" data-animate>
              <div class="board-label">{{ t('hero.codeLabel') }}</div>
              <div class="code-highlight" v-html="highlightedSnippet"></div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script setup>
import { codeToHtml } from 'shiki';
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { gsap, gsapDefaults } from '@/plugins/gsap';
import { useAppStore } from '@/store/app';

const copyBlock = ref(null);
const boardBlock = ref(null);
const ledgerBlock = ref(null);
const ctaGroup = ref(null);
const roleTicker = ref(null);
const appStore = useAppStore();
const router = useRouter();
const { t, tm, locale } = useI18n();
let ctx;

const techStack = computed(() => tm('hero.techStack') ?? []);
const agenda = computed(() => tm('hero.agenda') ?? []);
const focusNotes = computed(() => tm('hero.focusNotes') ?? []);

const currentRole = ref('');
const roles = computed(() => tm('hero.roles') ?? []);
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
  const list = roles.value;
  if (!list.length) {
    setTimeout(typeWriter, 1500);
    return;
  }

  const current = list[roleIndex % list.length] ?? '';

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
    roleIndex = (roleIndex + 1) % list.length;
    typeSpeed = 500;
  }

  setTimeout(typeWriter, typeSpeed);
};

const goToProjects = () => {
  const projectsPath = appStore.language === 'es' ? '/es/projects' : '/projects';
  router.push(projectsPath);
};

onMounted(async () => {
  await nextTick();
  highlightSnippet();

  // Asegurar visibilidad inicial
  gsap.set([copyBlock.value, boardBlock.value, ctaGroup.value, ledgerBlock.value], {
    clearProps: 'all',
  });

  ctx = gsap.context(() => {
    const copyTargets = copyBlock.value?.querySelectorAll('[data-animate]') ?? [];
    const boardTargets = boardBlock.value?.querySelectorAll('[data-animate]') ?? [];

    if (copyTargets.length) {
      gsap.from(copyTargets, {
        ...gsapDefaults,
        opacity: 0,
        y: 24,
        stagger: 0.15,
      });
    }

    if (ctaGroup.value) {
      gsap.from(ctaGroup.value, {
        ...gsapDefaults,
        opacity: 0,
        y: 24,
        delay: 0.4,
      });
    }

    if (ledgerBlock.value) {
      gsap.from(ledgerBlock.value, {
        ...gsapDefaults,
        opacity: 0,
        y: 24,
        delay: 0.5,
      });
    }

    if (boardTargets.length) {
      gsap.from(boardTargets, {
        ...gsapDefaults,
        opacity: 0,
        y: 30,
        stagger: 0.2,
        delay: 0.3,
      });
    }
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

watch(
  () => locale.value,
  () => {
    roleIndex = 0;
    charIndex = 0;
    isDeleting = false;
  }
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
  height: 5.4rem;
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
