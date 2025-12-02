<template>
  <section class="projects-section">
    <div class="projects-header">
      <p ref="label" class="eyebrow">{{ t('projects.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('projects.title') }}</h2>
      <p ref="descriptionEl" class="section-lead">
        {{ t('projects.lead') }}
      </p>
    </div>

    <v-expansion-panels ref="ledgerRef" variant="accordion" class="projects-ledger">
      <v-expansion-panel v-for="project in projects" :key="project.id" :ref="setPanelRef">
        <v-expansion-panel-title>
          <div class="panel-title">
            <div class="panel-heading">
              <span class="mono">{{ project.date }}</span>
              <strong>{{ project.name }}</strong>
            </div>
            <div class="panel-meta">
              <span class="badge">{{ project.category }}</span>
              <span v-if="project.client" class="client-tag">{{ project.client }}</span>
            </div>
          </div>
          <span v-if="project.online" class="status">En línea</span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="project-layout">
            <div class="project-main">
              <article class="summary-card">
                <h4>{{ t('projects.labels.summary') }}</h4>
                <p>
                  {{ project.longDescription || project.description }}
                </p>
              </article>

              <article class="feature-card">
                <h4>{{ t('projects.labels.deliverables') }}</h4>
                <ul>
                  <li v-for="feature in project.features" :key="feature">
                    {{ feature }}
                  </li>
                </ul>
              </article>
            </div>

            <aside class="project-aside">
              <div v-if="project.client" class="info-sheet">
                <p class="label">{{ t('projects.labels.client') }}</p>
                <p>{{ project.client }}</p>
              </div>
              <div class="info-sheet">
                <p class="label">{{ t('projects.labels.technologies') }}</p>
                <p>{{ project.technologies || tagsAsText(project) }}</p>
              </div>
              <div class="chip-stack">
                <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
              </div>
            </aside>
          </div>

          <div v-if="media(project).length" class="media-strip">
            <div class="media-header">
              <p>{{ t('projects.labels.captures') }}</p>
              <v-btn variant="text" size="small" @click="openGallery(project)">
                {{ t('projects.labels.viewFullscreen') }}
              </v-btn>
            </div>
            <v-slide-group show-arrows class="thumbs-group">
              <v-slide-group-item v-for="(image, idx) in media(project)" :key="idx">
                <v-img
                  :src="image"
                  :alt="project.name"
                  class="media-thumb"
                  cover
                  @click="openGallery(project, idx)"
                ></v-img>
              </v-slide-group-item>
            </v-slide-group>
          </div>

          <div class="project-links">
            <v-btn
              v-if="project.online && project.link && project.link !== '#'"
              variant="flat"
              color="primary"
              rounded="pill"
              :href="project.link"
              target="_blank"
            >
              {{ t('projects.labels.viewOnline') }}
            </v-btn>
            <v-btn
              v-if="project.repo && project.link_repo && project.link_repo !== '#'"
              variant="outlined"
              rounded="pill"
              :href="project.link_repo"
              target="_blank"
            >
              {{ t('projects.labels.viewRepo') }}
            </v-btn>
          </div>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-dialog v-model="gallery.open" fullscreen transition="dialog-bottom-transition">
      <div class="lightbox">
        <div class="lightbox-bar">
          <div>
            <p class="eyebrow">{{ gallery.project?.category }}</p>
            <h3>{{ gallery.project?.name }}</h3>
          </div>
          <v-btn :icon="mdiClose" variant="text" @click="closeGallery"></v-btn>
        </div>

        <v-slide-group v-model="gallery.index" show-arrows center-active class="lightbox-group">
          <v-slide-group-item v-for="(image, idx) in gallery.images" :key="idx" :value="idx">
            <div
              class="lightbox-frame"
              :class="{ 'lightbox-frame--active': gallery.index === idx }"
            >
              <v-img :src="image" :alt="gallery.project?.name" class="lightbox-image" cover></v-img>
            </div>
          </v-slide-group-item>
        </v-slide-group>

        <div class="lightbox-controls">
          <v-btn :icon="mdiChevronLeft" variant="tonal" @click="stepGallery(-1)"></v-btn>
          <span class="mono">{{ gallery.index + 1 }} / {{ gallery.images.length }}</span>
          <v-btn :icon="mdiChevronRight" variant="tonal" @click="stepGallery(1)"></v-btn>
        </div>
      </div>
    </v-dialog>
  </section>
</template>

<script setup>
import { mdiChevronLeft, mdiChevronRight, mdiClose } from '@mdi/js';
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';

import { projectList } from '@/data/projects.js';
import { gsap, ScrollTrigger, getMainScroller, gsapDefaults } from '@/plugins/gsap';

const { t, locale } = useI18n();
const projects = computed(() =>
  projectList.map((project) => {
    const translation = project.translations?.[locale.value] ?? project.translations?.en ?? {};
    return {
      ...project,
      ...translation,
    };
  })
);
const label = ref(null);
const titleEl = ref(null);
const descriptionEl = ref(null);
const ledgerRef = ref(null);
let panelRefs = [];
const gallery = ref({ open: false, images: [], project: null, index: 0 });
let ctx;

const setPanelRef = (el) => {
  const target = el?.$el ?? el;
  if (target && !panelRefs.includes(target)) {
    panelRefs.push(target);
  }
};

onBeforeUpdate(() => {
  panelRefs = [];
});

const media = (project) => {
  if (!project.images) return [];
  return Object.values(project.images);
};

const tagsAsText = (project) => {
  return project.tags?.length ? project.tags.join(', ') : '—';
};

const openGallery = (project, idx = 0) => {
  gallery.value = {
    open: true,
    images: media(project),
    project,
    index: idx,
  };
};

const closeGallery = () => {
  gallery.value.open = false;
  gallery.value.index = 0;
};

const stepGallery = (direction) => {
  if (!gallery.value.images.length) return;
  const total = gallery.value.images.length;
  gallery.value.index = (gallery.value.index + direction + total) % total;
};

onMounted(async () => {
  await nextTick();

  const scroller = getMainScroller();
  const headerTargets = [label.value, titleEl.value, descriptionEl.value].filter(Boolean);
  const panels = panelRefs.filter(Boolean);

  ctx = gsap.context(() => {
    if (headerTargets.length) {
      gsap.from(headerTargets, {
        ...gsapDefaults,
        opacity: 0,
        y: 24,
        stagger: 0.15,
      });
    }

    if (panels.length) {
      gsap.from(panels, {
        ...gsapDefaults,
        opacity: 0,
        y: 30,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ledgerRef.value?.$el ?? ledgerRef.value,
          start: 'top 80%',
          once: true,
          scroller: scroller,
        },
      });
    }
  });

  setTimeout(() => ScrollTrigger.refresh(), 100);
});

onUnmounted(() => {
  ctx?.revert();
  panelRefs = [];
});
</script>

<style scoped lang="scss">
.projects-section {
  padding: var(--section-gap) var(--shell-padding);
}

.projects-header {
  max-width: 820px;
  margin: 0 auto 2.5rem;
  text-align: center;
}

.projects-ledger {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-lg);
  background: rgba(var(--v-theme-surface), 0.7);
}

.panel-title {
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: space-between;
}

.panel-heading {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.panel-meta {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.badge {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.15rem 0.85rem;
  font-size: 0.8rem;
}

.client-tag {
  font-size: 0.8rem;
  color: var(--text-subtle);
}

.status {
  font-size: 0.85rem;
  color: rgb(var(--v-theme-success));
}

.project-layout {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(220px, 1fr);
  gap: 1.5rem;
  align-items: start;
}

.project-main {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.summary-card,
.feature-card,
.info-sheet {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 1.1rem;
  background: rgba(var(--v-theme-surface), 0.65);
}

.summary-card p {
  color: var(--text-subtle);
  margin: 0;
}

.feature-card ul {
  margin: 0;
  padding-left: 1.1rem;
  color: var(--text-subtle);
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.project-aside {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-sheet .label {
  font-size: 0.75rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-subtle);
  margin-bottom: 0.2rem;
}

.chip-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.chip-stack span {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
  padding: 0.15rem 0.85rem;
  font-size: 0.8rem;
  color: var(--text-subtle);
}

.media-strip {
  border: 1px solid var(--line-soft);
  border-radius: var(--radius-md);
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.media-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-subtle);
}

.thumbs-group :deep(.v-slide-group__content) {
  gap: 1rem;
}

.media-thumb {
  width: 220px;
  height: 140px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--line-soft);
  cursor: pointer;
  transition:
    transform 0.3s ease,
    opacity 0.3s ease;
}

.media-thumb:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}

.project-links {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-top: 1.25rem;
}

.lightbox {
  width: 100%;
  height: 100%;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: rgba(7, 7, 12, 0.92);
  color: #fff;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lightbox-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lightbox-group {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-group :deep(.v-slide-group__content) {
  gap: 2rem;
  align-items: center;
}

.lightbox-frame {
  width: min(960px, 80vw);
  height: min(620px, 75vh);
  border-radius: var(--radius-lg);
  border: 1px solid rgba(255, 255, 255, 0.15);
  background: rgba(12, 12, 18, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.15;
  transform: scale(0.9);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.lightbox-frame--active {
  opacity: 1;
  transform: scale(1);
}

.lightbox-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.lightbox-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.85);
}

@media (max-width: 900px) {
  .project-layout {
    grid-template-columns: 1fr;
  }

  .media-thumb {
    width: 100%;
  }

  .lightbox-frame {
    width: 100%;
    height: 60vh;
  }
}

:deep(.v-expansion-panel-title) {
  border-bottom: 1px solid var(--line-soft);
}

:deep(.v-expansion-panel:last-of-type .v-expansion-panel-title) {
  border-bottom: none;
}
</style>
