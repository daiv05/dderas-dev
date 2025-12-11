<template>
  <section class="projects-section">
    <div class="projects-header">
      <p ref="label" class="eyebrow">{{ t('projects.eyebrow') }}</p>
      <h2 ref="titleEl" class="section-title">{{ t('projects.title') }}</h2>
      <p ref="descriptionEl" class="section-lead">
        {{ t('projects.lead') }}
      </p>
    </div>

    <v-expansion-panels
      ref="ledgerRef"
      v-model="panelModel"
      variant="accordion"
      class="projects-ledger"
    >
      <v-expansion-panel
        v-for="(project, i) in projects"
        :key="project.id"
        :ref="(el) => capturePanelRef(el, i)"
        elevation="0"
        class="project-panel"
      >
        <v-expansion-panel-title class="project-header">
          <v-row no-gutters align="center" class="ml-2 ml-md-0">
            <v-col cols="12" md="1" class="d-flex justify-start justify-md-center">
              <span class="mono date-label mb-4 mb-md-0">{{ project.date }}</span>
            </v-col>
            <v-col cols="12" md="9">
              <div class="header-main">
                <h3 class="project-title mb-2 mb-md-0">{{ project.name }}</h3>
                <v-row class="project-subtitle" dense>
                  <v-col cols="12" md="auto">
                    <span class="category">{{ project.category }}</span>
                  </v-col>
                  <v-col v-if="project.client" cols="12" md="auto">
                    <span>{{ project.client }}</span>
                  </v-col>
                </v-row>
              </div>
            </v-col>
            <v-col cols="12" md="2" class="text-center d-none d-md-block">
              <v-chip
                v-if="project.online"
                color="success"
                size="small"
                variant="tonal"
                class="status-chip"
              >
                En línea
              </v-chip>
            </v-col>
          </v-row>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <div class="project-content">
            <v-row>
              <v-col cols="12" md="8">
                <div class="section-block">
                  <h4 class="block-title">{{ t('projects.labels.summary') }}</h4>
                  <p class="block-text">{{ project.longDescription || project.description }}</p>
                </div>

                <div class="section-block mt-6">
                  <h4 class="block-title">{{ t('projects.labels.deliverables') }}</h4>
                  <ul class="feature-list">
                    <li v-for="feature in project.features" :key="feature">
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <div class="project-actions mt-6">
                  <v-btn
                    v-if="project.online && project.link && project.link !== '#'"
                    variant="tonal"
                    color="primary"
                    :href="project.link"
                    target="_blank"
                    :prepend-icon="mdiOpenInNew"
                    class="mr-2 text-none"
                  >
                    {{ t('projects.labels.viewOnline') }}
                  </v-btn>
                  <v-btn
                    v-if="project.repo && project.link_repo && project.link_repo !== '#'"
                    variant="tonal"
                    :href="project.link_repo"
                    target="_blank"
                    :prepend-icon="mdiGithub"
                    class="text-none"
                  >
                    {{ t('projects.labels.viewRepo') }}
                  </v-btn>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                <div class="meta-sidebar">
                  <div class="meta-item">
                    <span class="meta-label">{{ t('projects.labels.technologies') }}</span>
                    <div class="tech-tags">
                      <v-chip
                        v-for="tag in project.tags"
                        :key="tag"
                        size="small"
                        variant="outlined"
                        class="mr-1 mb-1"
                      >
                        {{ tag }}
                      </v-chip>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>

            <div v-if="media(project).length" class="media-section mt-8">
              <div class="d-flex justify-space-between align-center mb-4">
                <h4 class="block-title mb-0">{{ t('projects.labels.captures') }}</h4>
              </div>
              <v-slide-group show-arrows class="gallery-strip">
                <v-slide-group-item v-for="(image, idx) in media(project)" :key="idx">
                  <v-img
                    :src="image"
                    :alt="project.name"
                    class="gallery-thumb"
                    cover
                    @click="openGallery(project, idx)"
                  ></v-img>
                </v-slide-group-item>
              </v-slide-group>
            </div>
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

        <div class="lightbox-carousel">
          <div class="lightbox-track">
            <div
              v-for="(image, idx) in gallery.images"
              :key="idx"
              class="lightbox-frame"
              :class="{ 'lightbox-frame--active': gallery.index === idx }"
            >
              <v-img
                :src="image"
                :alt="gallery.project?.name"
                class="lightbox-image"
                contain
              ></v-img>
            </div>
          </div>
        </div>

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
import { mdiChevronLeft, mdiChevronRight, mdiClose, mdiOpenInNew, mdiGithub } from '@mdi/js';
import { ref, computed, onMounted, onUnmounted, onBeforeUpdate, nextTick, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { useEnterAnimations } from '@/composables/useEnterAnimations.js';
import { projectList } from '@/data/projects.js';

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
const {
  label,
  titleEl,
  descriptionEl,
  setPanelRef,
  resetPanelRefs,
  setupEnterAnimations,
  cleanupEnterAnimations,
} = useEnterAnimations();
const ledgerRef = ref(null);
const gallery = ref({ open: false, images: [], project: null, index: 0 });
const panelModel = ref(null);
const projectPanels = ref([]);

const capturePanelRef = (el, index) => {
  setPanelRef(el);
  if (el) {
    projectPanels.value[index] = el;
  }
};

watch(panelModel, async (newVal) => {
  if (newVal !== undefined && newVal !== null) {
    await nextTick();
    setTimeout(() => {
      const panel = projectPanels.value[newVal];
      const el = panel?.$el ?? panel;
      if (el && el.scrollIntoView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 300);
  }
});

onBeforeUpdate(() => {
  resetPanelRefs();
  projectPanels.value = [];
});

const media = (project) => {
  if (!project.images) return [];
  return Object.values(project.images);
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
  setupEnterAnimations({
    headerStart: 'top 80%',
    panelsStart: 'top 80%',
    headerTrigger: titleEl.value,
    panelsTrigger: ledgerRef.value?.$el ?? ledgerRef.value,
  });
});
onUnmounted(() => {
  cleanupEnterAnimations();
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
  background: transparent;
}

.project-panel {
  background: rgba(var(--v-theme-surface), 0.4) !important;
  border: 1px solid var(--line-soft);
  margin-bottom: 1rem;
  overflow: hidden;
  transition: border-color 0.2s ease;

  &::before {
    display: none;
  }

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.5);
  }
}

.project-header {
  padding: 1rem 0.5rem;
}

.date-label {
  color: var(--text-subtle);
  font-size: 0.9rem;
}

.header-main {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.project-title {
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 1.2;
}

.project-subtitle {
  font-size: 0.9rem;
  color: var(--text-subtle);
}

.category {
  letter-spacing: 0.05em;
  font-size: 0.75rem;
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}

.separator {
  opacity: 0.5;
}

.project-content {
  padding: 1rem 0.5rem 2rem;
}

.block-title {
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-subtle);
  margin-bottom: 1rem;
}

.block-text {
  line-height: 1.7;
  color: rgba(var(--v-theme-on-surface), 0.9);
  white-space: pre-line;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  li {
    position: relative;
    padding-left: 1.5rem;
    line-height: 1.5;
    color: rgba(var(--v-theme-on-surface), 0.85);

    &::before {
      content: '-';
      position: absolute;
      left: 0;
      color: rgb(var(--v-theme-primary));
    }
  }
}

.meta-sidebar {
  border-left: 1px solid var(--line-soft);
  padding-left: 2rem;
  height: 100%;
}

.meta-item {
  margin-bottom: 2rem;
}

.meta-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-subtle);
  margin-bottom: 0.75rem;
}

.gallery-strip :deep(.v-slide-group__content) {
  gap: 1rem;
}

.gallery-thumb {
  width: 240px;
  height: 150px;
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
}

.lightbox {
  width: 100%;
  height: 100%;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: rgba(var(--v-theme-surface), 0.98);
  color: rgb(var(--v-theme-on-surface));
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lightbox-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.lightbox-carousel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;
}

.lightbox-track {
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.lightbox-frame {
  flex-shrink: 0;
  width: min(960px, 80vw);
  height: min(620px, 75vh);
  background: rgb(var(--v-theme-surface));
  display: none;
  align-items: center;
  justify-content: center;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.lightbox-frame--active {
  display: flex;
  opacity: 1;
  transform: scale(1);
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.lightbox-image {
  width: 100%;
  height: 100%;
}

.lightbox-image :deep(img) {
  object-fit: contain;
  max-width: 100%;
  max-height: 100%;
}

.lightbox-controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.85rem;
  color: rgba(var(--v-theme-on-surface), 0.85);
}

@media (max-width: 960px) {
  .meta-sidebar {
    border-left: none;
    padding-left: 0;
    margin-top: 2rem;
    border-top: 1px solid var(--line-soft);
    padding-top: 2rem;
  }

  .project-header {
    padding: 1rem 0.5rem;
  }

  .gallery-thumb {
    width: 200px;
    height: 120px;
  }

  .lightbox-frame {
    width: 100%;
    height: 60vh;
  }
}

:deep(.v-expansion-panel-title) {
  border-bottom: 1px solid transparent;
}
</style>
