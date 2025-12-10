<template>
  <section class="about-shell">
    <div class="about-header">
      <p ref="label" class="eyebrow">{{ t('about.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('about.title') }}</h2>
      <p ref="subtitle" class="section-lead">
        {{ t('about.lead') }}
      </p>
    </div>

    <div class="about-grid">
      <div ref="profileSection" class="profile-column">
        <div class="profile-card">
          <img src="/img/me/maki.jpg" alt="David Deras" />
          <ul class="fact-list">
            <li v-for="fact in quickFacts" :key="fact.label">
              <span class="label">{{ fact.label }}</span>
              <span class="value">{{ fact.value }}</span>
            </li>
          </ul>
          <div class="profile-actions">
            <v-btn
              variant="flat"
              color="primary"
              rounded="pill"
              href="/cv/David_Deras_FullStack_Developer.pdf"
              download="David_Deras_FullStack_Developer.pdf"
            >
              {{ t('about.buttons.downloadCv') }}
            </v-btn>
            <v-btn variant="outlined" rounded="pill" href="mailto:davidderas50@gmail.com">
              {{ t('about.buttons.contact') }}
            </v-btn>
          </div>
        </div>
      </div>

      <div ref="detailsSection" class="details-column">
        <div class="detail-block">
          <h3>{{ focusContent.title }}</h3>
          <p>
            {{ focusContent.body }}
          </p>
        </div>

        <div class="detail-block">
          <div class="block-header">
            <h3>{{ skillsContent.title }}</h3>
            <span class="mono">{{ skillsContent.updated }}</span>
          </div>
          <div class="skills-grid">
            <div v-for="skill in skills" :key="skill.name" class="skill-card">
              <v-icon :icon="getSkillIcon(skill.name)" size="32" color="primary" class="mb-2" />
              <span class="skill-name">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <div class="detail-block">
          <h3>{{ experienceContent.title }}</h3>
          <v-timeline
            density="compact"
            side="end"
            align="start"
            truncate-line="both"
            class="experience-timeline"
          >
            <v-timeline-item
              v-for="item in experience"
              :key="item.title"
              dot-color="primary"
              size="x-small"
            >
              <div class="mb-4">
                <div class="text-caption mono mb-1">{{ item.date }}</div>
                <div class="text-h6 font-weight-bold mb-1">{{ item.title }}</div>
                <p class="text-body-2 text-medium-emphasis mb-2">{{ item.description }}</p>
                <div class="chipline">
                  <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
                </div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </div>

        <div class="detail-block">
          <h3>{{ interestsContent.title }}</h3>
          <div class="chipline">
            <span v-for="interest in interests" :key="interest">{{ interest }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import {
  mdiVuejs,
  mdiLaravel,
  mdiApi,
  mdiPalette,
  mdiLanguagePhp,
  mdiLanguageTypescript,
  mdiServerNetwork,
} from '@mdi/js';
import { ref, onMounted, onUnmounted, computed, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  gsap,
  ScrollTrigger,
  getMainScroller,
  gsapDefaults,
  isElementInViewport,
  animateInOnEnter,
} from '@/plugins/gsap';

const label = ref(null);
const titleEl = ref(null);
const subtitle = ref(null);
const profileSection = ref(null);
const detailsSection = ref(null);
let ctx;
const { t, tm } = useI18n();
const quickFacts = computed(() => tm('about.quickFacts') ?? []);
const skillsContent = computed(() => tm('about.skills') ?? { items: [] });
const skills = computed(() => skillsContent.value.items ?? []);
const focusContent = computed(() => tm('about.focus') ?? {});
const experienceContent = computed(() => tm('about.experience') ?? { timeline: [] });
const experience = computed(() => experienceContent.value.timeline ?? []);
const interestsContent = computed(() => tm('about.interests') ?? { items: [] });
const interests = computed(() => interestsContent.value.items ?? []);

const getSkillIcon = (name) => {
  const n = name.toLowerCase();
  if (n.includes('vue')) return mdiVuejs;
  if (n.includes('laravel')) return mdiLaravel;
  if (n.includes('rest') || n.includes('api')) return mdiApi;
  if (n.includes('ux') || n.includes('ui')) return mdiPalette;
  if (n.includes('php')) return mdiLanguagePhp;
  if (n.includes('typescript') || n.includes('ts')) return mdiLanguageTypescript;
  return mdiServerNetwork;
};

const setupAnimations = () => {
  const scroller = getMainScroller();

  ctx = gsap.context(() => {
    const headerTargets = [label.value, titleEl.value, subtitle.value].filter(Boolean);

    if (headerTargets.length) {
      // Si ya está visible, no animar
      const alreadyVisible = isElementInViewport(titleEl.value, scroller);
      if (alreadyVisible) {
        gsap.set(headerTargets, { clearProps: 'all' });
      } else {
        gsap.from(headerTargets, {
          ...gsapDefaults,
          opacity: 0,
          y: 24,
          stagger: 0.15,
          scrollTrigger: {
            trigger: titleEl.value,
            start: 'top 80%',
            once: true,
            scroller: scroller,
          },
        });
      }
    }

    if (profileSection.value) {
      animateInOnEnter(profileSection.value, {
        from: { opacity: 0, x: -40 },
        to: { ...gsapDefaults, opacity: 1, x: 0, duration: 0.9 },
        trigger: profileSection.value,
        scroller,
        start: 'top 80%',
        once: true,
      });
    }

    if (detailsSection.value) {
      animateInOnEnter(detailsSection.value, {
        from: { opacity: 0, x: 40 },
        to: { ...gsapDefaults, opacity: 1, x: 0, duration: 0.9 },
        trigger: detailsSection.value,
        scroller,
        start: 'top 80%',
        once: true,
      });
    }
  });

  setTimeout(() => ScrollTrigger.refresh(), 100);
};

onMounted(async () => {
  await nextTick();
  setupAnimations();
});

onUnmounted(() => {
  ctx?.revert();
});

// Recargar animaciones cuando cambie el idioma
watch(
  () => experienceContent.value,
  async () => {
    await nextTick();
    ctx?.revert();
    setupAnimations();
  },
  { deep: true }
);
</script>

<style scoped lang="scss">
.about-shell {
  padding: var(--section-gap) var(--shell-padding);
}

.about-header {
  max-width: 840px;
  margin: 0 auto 3rem;
  text-align: center;
}

.about-grid {
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 2rem;
  align-items: start;
}

.profile-card {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.profile-card img {
  width: 100%;
  border-radius: var(--radius-md);
}

.fact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.fact-list li {
  border-bottom: 1px solid var(--line-soft);
  padding-bottom: 0.65rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.fact-list li:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.fact-list .label {
  font-size: 0.8rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-subtle);
}

.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.details-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.detail-block {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  padding: 1.5rem;
  background: rgba(var(--v-theme-surface), 0.7);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.block-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.skill-card {
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition:
    transform 0.2s,
    border-color 0.2s;
}

.skill-card:hover {
  transform: translateY(-2px);
  border-color: rgb(var(--v-theme-primary));
}

.skill-name {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.3;
}

.timeline {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.timeline p {
  color: var(--text-subtle);
  margin: 0.35rem 0 0.5rem;
}

@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .profile-card {
    max-width: 420px;
    margin: 0 auto;
  }
}
</style>
