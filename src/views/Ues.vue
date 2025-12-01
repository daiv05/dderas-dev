<template>
  <section class="ues-section">
    <div class="ues-header">
      <p ref="label" class="eyebrow">{{ t('ues.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('ues.title') }}</h2>
      <p ref="descriptionEl" class="section-lead">
        {{ t('ues.lead') }}
      </p>
    </div>

    <div ref="gridRef" class="ues-grid">
      <v-sheet
        v-for="category in categories"
        :key="category.title"
        :ref="setPanelRef"
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
          {{ t('ues.buttons.openFolder') }}
        </v-btn>
      </v-sheet>
    </div>

    <v-sheet class="ues-disclaimer" elevation="0">
      <div>
        <h3>{{ t('ues.noteBlock.title') }}</h3>
        <p>
          {{ t('ues.noteBlock.body') }}
        </p>
      </div>
      <v-btn variant="text" rounded="pill" href="mailto:davidderas50@gmail.com">
        {{ t('ues.buttons.share') }}
      </v-btn>
    </v-sheet>
  </section>
</template>

<script setup>
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ref, onMounted, onUnmounted, onBeforeUpdate, computed, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

gsap.registerPlugin(ScrollTrigger);

const label = ref(null);
const titleEl = ref(null);
const descriptionEl = ref(null);
const gridRef = ref(null);
let panelRefs = [];
let ctx;

const { t, tm } = useI18n();
const categories = computed(() => tm('ues.categories') ?? []);

const setPanelRef = (el) => {
  const target = el?.$el ?? el;
  if (target && !panelRefs.includes(target)) {
    panelRefs.push(target);
  }
};

onBeforeUpdate(() => {
  panelRefs = [];
});

onMounted(async () => {
  await nextTick();

  const headerTargets = [label.value, titleEl.value, descriptionEl.value].filter(Boolean);
  const panels = panelRefs.filter(Boolean);

  ctx = gsap.context(() => {
    if (headerTargets.length) {
      gsap.from(headerTargets, {
        opacity: 0,
        y: 24,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }

    if (panels.length) {
      gsap.from(panels, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.value,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });

  ScrollTrigger.refresh();
});

onUnmounted(() => {
  ctx?.revert();
  panelRefs = [];
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
