<template>
  <v-app class="blog-layout">
    <v-app-bar flat scroll-behavior="hide" scroll-threshold="100" elevation="0" class="blog-header">
      <div class="blog-header-content">
        <router-link :to="withLocalePath('/blog')" class="blog-brand">
          <span class="blog-brand-name">{{ t('navigation.brand.name') }}</span>
          <!-- <span class="blog-brand-tag">{{ t('navigation.brand.blogTagline') }}</span> -->
        </router-link>

        <div class="blog-header-actions">
          <v-btn rounded="pill" size="small" class="text-none" :to="withLocalePath('/')">
            {{ t('navigation.backToMain') }}
          </v-btn>

          <!-- <v-btn rounded="pill" size="small" class="text-none" :to="withLocalePath('/blog')">
            {{ t('navigation.backToBlog') }}
          </v-btn> -->

          <div class="blog-controls">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>
      </div>
    </v-app-bar>

    <!-- Contenido principal -->
    <v-main class="blog-main">
      <div class="blog-container" @click="handleImageClick">
        <router-view v-slot="{ Component }">
          <transition name="page-fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </div>
    </v-main>

    <!-- Footer simple -->
    <footer class="blog-footer">
      <div class="blog-footer-content">
        <p class="blog-footer-text">© {{ currentYear }} {{ t('navigation.brand.name') }}</p>
        <div class="blog-footer-links">
          <a href="https://github.com/daiv05" target="_blank" rel="noopener" aria-label="GitHub">
            <v-icon size="20" :icon="mdiGithub"></v-icon>
          </a>
          <a
            href="https://linkedin.com/in/dderas"
            target="_blank"
            rel="noopener"
            aria-label="LinkedIn"
          >
            <v-icon size="20" :icon="mdiLinkedin"></v-icon>
          </a>
          <a href="mailto:davidderas50@gmail.com" aria-label="Email">
            <v-icon size="20" :icon="mdiEmail"></v-icon>
          </a>
        </div>
      </div>
    </footer>

    <!-- Botón scroll to top -->
    <v-btn
      v-show="showScrollTop"
      :icon="mdiArrowUp"
      class="scroll-to-top"
      size="large"
      @click="scrollToTop"
    ></v-btn>

    <ImageViewer v-model="showImageViewer" :src="selectedImage.src" :alt="selectedImage.alt" />
  </v-app>
</template>

<script setup>
import { mdiArrowUp, mdiGithub, mdiLinkedin, mdiEmail } from '@mdi/js';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useTheme } from 'vuetify';

import ImageViewer from '@/components/ImageViewer.vue';
import LocaleToggle from '@/components/LocaleToggle.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useSeo } from '@/composables/useSeo';
import { useAppStore } from '@/store/app';

const theme = useTheme();
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const { t, locale } = useI18n();

useSeo();

const showScrollTop = ref(false);
const showImageViewer = ref(false);
const selectedImage = ref({ src: '', alt: '' });
const currentYear = new Date().getFullYear();

const handleImageClick = (event) => {
  const target = event.target;
  if (target.tagName === 'IMG' && target.closest('.markdown-body')) {
    if (target.closest('a')) return;

    selectedImage.value = {
      src: target.src,
      alt: target.alt || '',
    };
    showImageViewer.value = true;
  }
};

const getLocaleFromPath = (path) => {
  const seg = (path || '/').split('/')[1];
  return seg === 'es' ? 'es' : 'en';
};

const withLocalePath = (path) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  const pathToAdd = p === '/' ? '' : p;
  return appStore.language === 'es' ? `/es${pathToAdd}` : p;
};

const applyLanguage = (lang) => {
  locale.value = lang;
  document.documentElement.setAttribute('lang', lang);
};

const initializeLanguage = () => {
  const lang = getLocaleFromPath(route.path);
  appStore.language = lang;
  applyLanguage(lang);
};

initializeLanguage();

// Watchers
watch(
  () => appStore.theme,
  (val) => {
    theme.change(val);
    const meta = document.querySelector('#themeColor');
    if (meta) meta.setAttribute('content', theme.current.value.colors.surface);
    if (val === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },
  { immediate: true }
);

watch(
  () => appStore.language,
  (lang) => {
    applyLanguage(lang);
    const target = withLocalePath(route.path.replace(/^\/es(?=\/|$)/, '') || '/');
    if (target !== route.path) {
      router.replace(target);
    }
  }
);

// Scroll to top functionality
const handleScroll = () => {
  const main = document.querySelector('.blog-main');
  if (main) {
    showScrollTop.value = main.scrollTop > 300;
  }
};

const scrollToTop = () => {
  const main = document.querySelector('.blog-main');
  if (main) {
    main.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

onMounted(() => {
  const main = document.querySelector('.blog-main');
  if (main) {
    main.addEventListener('scroll', handleScroll);
  }
});

onUnmounted(() => {
  const main = document.querySelector('.blog-main');
  if (main) {
    main.removeEventListener('scroll', handleScroll);
  }
});
</script>

<style scoped>
.blog-layout {
  background: rgb(var(--v-theme-background));
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.blog-header {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgba(var(--v-theme-surface), 0.92) !important;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.blog-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 78ch;
  margin: 0 auto;
  padding: 0 16px;
}

.blog-brand {
  display: flex;
  flex-direction: column;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  margin-left: 1rem;
}

.blog-brand-name {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}

.blog-brand-tag {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-top: 2px;
}

.blog-header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.blog-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.blog-main {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
}

.blog-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 32px 16px;
}

.blog-footer {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  background: rgb(var(--v-theme-surface));
  padding: 16px;
}

.blog-footer-content {
  max-width: 78ch;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.blog-footer-text {
  margin: 0;
  font-size: 0.875rem;
  opacity: 0.7;
}

.blog-footer-links {
  display: flex;
  gap: 16px;
}

.blog-footer-links a {
  color: rgb(var(--v-theme-on-surface));
  opacity: 0.7;
  transition: opacity 0.2s;
}

.blog-footer-links a:hover {
  opacity: 1;
}

.scroll-to-top {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 1000;
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.2s ease;
}

.page-fade-enter-from,
.page-fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 600px) {
  .blog-header-content {
    padding: 0 12px;
  }

  .back-to-portfolio {
    display: none;
  }

  .blog-brand-name {
    font-size: 1.1rem;
  }

  .blog-container {
    padding: 24px 12px;
  }

  .blog-footer-content {
    flex-direction: column;
    gap: 12px;
    text-align: center;
  }
}
</style>
