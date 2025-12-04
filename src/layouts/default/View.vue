<template>
  <v-app class="h-screen">
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="isDesktop"
      :scrim="!isDesktop"
      class="shell-nav"
      width="280"
    >
      <div class="nav-root">
        <router-link to="/" class="brand-mark">
          <span class="brand-initial">{{ t('navigation.brand.name') }}</span>
          <span class="brand-tag">
            {{
              basePath(route.path).startsWith('/blog')
                ? t('navigation.brand.blogTagline')
                : t('navigation.brand.tagline')
            }}
          </span>
        </router-link>

        <v-divider class="nav-divider" thickness="1"></v-divider>

        <v-btn
          v-if="basePath(route.path).startsWith('/blog')"
          class="back-button text-none"
          variant="outlined"
          rounded="pill"
          @click="goTo({ to: withLocalePath('/'), value: 'back' })"
        >
          <template #prepend>
            <v-icon :icon="mdiArrowLeft"></v-icon>
          </template>
          {{ t('navigation.backToMain') || 'Volver' }}
        </v-btn>

        <v-list ref="navList" density="compact" nav class="nav-list" @scroll="handleNavScroll">
          <v-list-item
            v-for="item in itemsComputed"
            :key="item.value"
            :class="[
              'nav-link',
              { 'nav-link--active': isActive(item) },
              { 'nav-link--blog-index': item.isBlogIndex },
            ]"
            @click="goTo(item)"
          >
            <template #prepend>
              <v-icon
                class="nav-dot"
                :class="{ 'nav-dot--active': isActive(item) }"
                :icon="item.icon"
              ></v-icon>
            </template>
            <v-list-item-title>{{ item.title ?? t(item.titleKey) }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <div class="nav-bottom">
          <div class="nav-controls">
            <v-btn class="theme-toggle" variant="outlined" rounded="pill" @click="toggleTheme">
              <template #prepend>
                <v-icon
                  :icon="appStore.theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight"
                ></v-icon>
              </template>
              {{
                t(
                  appStore.theme === 'dark'
                    ? 'navigation.themeToggle.toLight'
                    : 'navigation.themeToggle.toDark'
                )
              }}
            </v-btn>
            <v-btn-toggle
              v-model="appStore.language"
              class="language-toggle"
              density="comfortable"
              rounded="pill"
              mandatory
            >
              <v-btn
                v-for="option in languageOptions"
                :key="option.value"
                :value="option.value"
                variant="text"
                size="small"
                width="50%"
              >
                {{ option.label }}
              </v-btn>
            </v-btn-toggle>
          </div>

          <div class="nav-links">
            <a href="https://github.com/daiv05" target="_blank" rel="noopener" aria-label="GitHub">
              <v-icon size="18" :icon="mdiGithub"></v-icon>
            </a>
            <a
              href="https://linkedin.com/in/dderas"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              <v-icon size="18" :icon="mdiLinkedin"></v-icon>
            </a>
            <a href="mailto:davidderas50@gmail.com" aria-label="Email">
              <v-icon size="18" :icon="mdiEmail"></v-icon>
            </a>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="shell-main">
      <div class="shell-main-inner">
        <div v-if="!isDesktop" class="mobile-top">
          <v-btn icon variant="text" title="Open menu" @click="drawer = true">
            <v-icon :icon="mdiMenu"></v-icon>
          </v-btn>
          <p class="mobile-title">
            {{ t('navigation.brand.shortName') }}
          </p>
          <div class="mobile-controls">
            <v-btn
              variant="text"
              class="mobile-theme"
              rounded="pill"
              size="small"
              @click="toggleTheme"
            >
              <template #prepend>
                <v-icon
                  size="18"
                  :icon="appStore.theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight"
                ></v-icon>
              </template>
              {{
                !isDesktop
                  ? ''
                  : t(
                      appStore.theme === 'dark'
                        ? 'navigation.themeToggle.lightShort'
                        : 'navigation.themeToggle.darkShort'
                    )
              }}
            </v-btn>
            <!-- <v-btn-toggle
              v-model="appStore.language"
              class="mobile-language"
              density="comfortable"
              rounded="pill"
              mandatory
            >
              <v-btn
                v-for="option in languageOptions"
                :key="`mobile-${option.value}`"
                :value="option.value"
                variant="text"
                size="x-small"
              >
                {{ option.label }}
              </v-btn>
            </v-btn-toggle> -->
          </div>
        </div>

        <div v-if="!isDesktop" class="mobile-nav">
          <v-slide-group v-model="mobileSection" show-arrows>
            <v-slide-group-item v-for="item in itemsComputed" :key="item.value" :value="item.value">
              <v-btn
                variant="text"
                rounded="pill"
                size="small"
                class="nav-chip"
                :class="{ 'nav-chip--active': mobileSection === item.value }"
                @click="handleMobileNav(item)"
              >
                {{ item.title ?? t(item.titleKey) }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </div>

        <div class="shell-content">
          <router-view v-slot="{ Component }">
            <transition name="page-fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>

        <div class="footer-frame">
          <Footer />
        </div>
      </div>
    </v-main>

    <v-btn
      v-show="showScrollTop"
      :icon="mdiArrowUp"
      class="scroll-to-top"
      size="large"
      @click="scrollToTop"
    ></v-btn>
  </v-app>
</template>

<script setup>
import {
  mdiArrowUp,
  mdiEmail,
  mdiGithub,
  mdiLinkedin,
  mdiMenu,
  mdiWeatherSunny,
  mdiWeatherNight,
  mdiArrowLeft,
  mdiViewList,
  mdiFileDocumentOutline,
} from '@mdi/js';
import { ref, computed, onMounted, onUnmounted, watch, watchEffect, nextTick } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useTheme, useDisplay } from 'vuetify';

import Footer from '@/components/Footer.vue';
import { useSeo } from '@/composables/useSeo';
import { setupGSAP, clearGSAPProps, refreshScrollTriggers } from '@/plugins/gsap';
import sidebarItems from '@/router/sidebar-items.js';
import { useAppStore } from '@/store/app';

const theme = useTheme();
const display = useDisplay();
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const items = sidebarItems;
const navList = ref(null);
const postsPerPage = 10;
const displayedPostsCount = ref(postsPerPage);
const blogModules = import.meta.glob('/blog/**/*.md', { eager: true });
const blogPosts = computed(() => {
  const locale = getLocaleFromPath(route.path);
  const entries = Object.keys(blogModules)
    .map((path) => {
      const mod = blogModules[path];
      const segments = path.split('/').filter(Boolean);
      const fileName = segments.pop() || '';
      const slug = fileName.replace(/\.md$/, '');
      const detectedLocaleEn = segments.includes('en') ? 'en' : null;
      const detectedLocale = segments.includes('es') ? 'es' : detectedLocaleEn;

      // El frontmatter puede estar en mod.frontmatter o directamente en mod
      const fm = mod?.frontmatter || mod || {};

      return {
        title: fm.title || slug,
        date: fm.date || '',
        to: `/blog/${fm.slug || slug}`,
        icon: mdiFileDocumentOutline,
        value: fm.slug || slug,
        detectedLocale,
        summary: fm.summary || '',
        tags: fm.tags || [],
      };
    })
    .filter((p) => p.detectedLocale === locale)
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return entries;
});

const displayedPosts = computed(() => {
  return blogPosts.value.slice(0, displayedPostsCount.value);
});

const itemsComputed = computed(() => {
  if (basePath(route.path).startsWith('/blog')) {
    return [
      {
        title: t('navigation.viewBlogEntries') || 'Ver entradas de blog',
        to: withLocalePath('/blog'),
        icon: mdiViewList,
        value: 'blog',
        isBlogIndex: true,
      },
      ...displayedPosts.value,
    ];
  }
  return items;
});
const { t, locale } = useI18n();
const supportedLanguages = new Set(['en', 'es']);
useSeo();

const drawer = ref(false);
const showScrollTop = ref(false);
const mobileSection = ref(items[0]?.value ?? null);
const languageOptions = computed(() => [
  {
    value: 'en',
    label: t('navigation.languageToggle.en'),
  },
  {
    value: 'es',
    label: t('navigation.languageToggle.es'),
  },
]);

const isDesktop = computed(() => display.mdAndUp.value);

const applyLanguage = (lang) => {
  locale.value = lang;
  document.documentElement.setAttribute('lang', lang);
};

const getLocaleFromPath = (path) => {
  const seg = (path || '/').split('/')[1];
  return seg === 'es' ? 'es' : 'en';
};

const basePath = (path) => path.replace(/^\/es(?=\/|$)/, '') || '/';

const withLocalePath = (path) => {
  const p = path.startsWith('/') ? path : `/${path}`;
  const pathToAdd = p === '/' ? '' : p;
  return appStore.language === 'es' ? `/es${pathToAdd}` : p;
};

const initializeLanguage = () => {
  const lang = getLocaleFromPath(route.path);
  appStore.language = lang;
  applyLanguage(lang);
};

initializeLanguage();

watchEffect(() => {
  drawer.value = isDesktop.value;
});

watch(
  () => appStore.theme,
  (val) => {
    theme.change(val);
  },
  { immediate: true }
);

watch(
  () => appStore.language,
  async (lang) => {
    applyLanguage(lang);
    const target = withLocalePath(basePath(route.path));
    if (target !== route.path) {
      router.replace(target);
    }
    await nextTick();
    setTimeout(() => {
      const root = document.querySelector('.shell-content');
      if (root) {
        const animatedElements = root.querySelectorAll('[style*="opacity"], [style*="transform"]');
        clearGSAPProps(Array.from(animatedElements));
      }
      refreshScrollTriggers();
    }, 100);
  }
);

watch(
  () => route.path,
  (p) => {
    const lang = getLocaleFromPath(p);
    if (supportedLanguages.has(lang) && lang !== appStore.language) {
      appStore.language = lang;
    }
    displayedPostsCount.value = postsPerPage;
  }
);

watch(
  () => route.path,
  (path) => {
    const active = items.find((item) => item.to === path);
    if (active) {
      mobileSection.value = active.value;
    }
  }
);

const toggleTheme = () => {
  appStore.theme = appStore.theme === 'dark' ? 'light' : 'dark';
};

const goTo = (item) => {
  router.push(withLocalePath(item.to));
  if (!isDesktop.value) {
    drawer.value = false;
  }
};

const handleMobileNav = (item) => {
  mobileSection.value = item.value;
  router.push(withLocalePath(item.to));
};

const isActive = (item) => route.path === withLocalePath(item.to);

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleNavScroll = (e) => {
  const element = e.target;
  if (!element) return;

  const scrollPercentage =
    (element.scrollTop / (element.scrollHeight - element.clientHeight)) * 100;

  if (scrollPercentage > 80 && displayedPostsCount.value < blogPosts.value.length) {
    displayedPostsCount.value = Math.min(
      displayedPostsCount.value + postsPerPage,
      blogPosts.value.length
    );
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  // Inicializar GSAP con el scroller personalizado
  setupGSAP();
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.h-screen {
  height: 100vh;
}

.shell-nav {
  border-right: 1px solid var(--line-soft) !important;
  background: rgb(var(--v-theme-background)) !important;
  height: 100vh;
}

.nav-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 1.5rem;
  gap: 1.5rem;
  min-height: 0;
}

.brand-mark {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-family: var(--font-mono);
  font-weight: 600;
  letter-spacing: 0.06em;
}

.brand-initial {
  font-size: 1.1rem;
}

.brand-tag {
  font-size: 0.85rem;
  color: var(--text-subtle);
}

.nav-divider {
  border-color: var(--line-soft) !important;
}

.back-button {
  width: 100%;
  margin-bottom: 0.75rem;
  border-color: var(--line-soft) !important;

  :deep(.v-btn__prepend) {
    margin-inline-end: 0.5rem;
  }
}

.nav-list {
  flex: 1;
  padding: 0;
  overflow-y: auto;
  min-height: 0;
}

:deep(.v-list-item__content) {
  gap: 0.35rem;
}

.nav-link {
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  margin-bottom: 0.5rem;
  padding-inline: 0.75rem;
}

.nav-link--blog-index {
  background: var(--bg-soft);
  border-color: var(--line-soft) !important;
  font-weight: 600;
}

.nav-link--blog-index:hover {
  background: var(--bg-muted);
  border-color: var(--line-strong) !important;
}

.nav-link--active {
  border-color: var(--line-strong);
}

.nav-dot {
  margin-right: 0.85rem;
}

.nav-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.nav-controls {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.theme-toggle {
  border-color: var(--line-soft) !important;

  :deep(.v-btn__prepend) {
    margin-inline-end: 0.5rem;
  }
}

.language-toggle {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.language-toggle :deep(.v-btn) {
  min-width: 52px;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.nav-links a {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.shell-main {
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.shell-main-inner {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.shell-content {
  flex: 1;
}

.footer-frame {
  padding-top: 0;
}

.mobile-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem var(--shell-padding) 1rem;
  position: sticky;
  top: 0;
  background: rgb(var(--v-theme-background));
  z-index: 5;
}

.mobile-title {
  font-weight: 600;
}

.mobile-theme {
  border: 1px solid var(--line-soft);

  :deep(.v-btn__prepend) {
    margin-inline-end: 0.35rem;
  }
}

.mobile-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
}

.mobile-language {
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.mobile-nav {
  padding: 0.5rem var(--shell-padding);
  border-bottom: 1px solid var(--line-soft);
}

.nav-chip {
  border: 1px solid transparent;
}

.nav-chip--active {
  border-color: var(--line-strong);
}

.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  border: 1px solid var(--line-strong);
  background: rgb(var(--v-theme-background));
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(16px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

@media (max-width: 600px) {
  .scroll-to-top {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
