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
        <router-link :to="withLocalePath('/')" class="brand-mark">
          <span class="brand-initial">{{ t('navigation.brand.name') }}</span>
          <span class="brand-tag">{{ t('navigation.brand.tagline') }}</span>
        </router-link>

        <v-divider class="nav-divider" thickness="1"></v-divider>

        <v-list density="compact" nav class="nav-list">
          <v-list-item
            v-for="item in items"
            :key="item.value"
            :class="['nav-link', { 'nav-link--active': isActive(item) }]"
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
            <ThemeToggle />
            <LocaleToggle />
          </div>
          <v-divider></v-divider>
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
          <p class="mobile-title" @click="goTo({ to: '/', value: 'home' })">
            {{ t('navigation.brand.shortName') }}
          </p>
          <div class="mobile-controls">
            <ThemeToggle />
            <LocaleToggle />
          </div>
        </div>

        <div v-if="!isDesktop" class="mobile-nav">
          <v-slide-group v-model="mobileSection" show-arrows>
            <v-slide-group-item v-for="item in items" :key="item.value" :value="item.value">
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
import { mdiArrowUp, mdiEmail, mdiGithub, mdiLinkedin, mdiMenu } from '@mdi/js';
import { ref, computed, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from 'vue-router';
import { useTheme, useDisplay } from 'vuetify';

import Footer from '@/components/Footer.vue';
import LocaleToggle from '@/components/LocaleToggle.vue';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { useLocaleNavigation } from '@/composables/useLocaleNavigation';
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

const { t } = useI18n();
const { withLocalePath, initializeLanguage, setupWatchers } = useLocaleNavigation();
useSeo();

const drawer = ref(false);
const showScrollTop = ref(false);

const basePath = (path) => path.replace(/^\/es(?=\/|$)/, '') || '/';

const getInitialMobileSection = () => {
  const currentPath = basePath(route.path);
  const active = items.find((item) => item.to === currentPath);
  return active ? active.value : (items[0]?.value ?? null);
};

const mobileSection = ref(getInitialMobileSection());

const isDesktop = computed(() => display.mdAndUp.value);

initializeLanguage();

watchEffect(() => {
  drawer.value = isDesktop.value;
});

watch(
  () => appStore.theme,
  (val) => {
    theme.change(val);
    const meta = document.querySelector('#themeColor');
    if (meta) meta.setAttribute('content', theme.current.value.colors.surface);
  },
  { immediate: true }
);

setupWatchers(() => {
  setTimeout(() => {
    const root = document.querySelector('.shell-content');
    if (root) {
      const animatedElements = root.querySelectorAll('[style*="opacity"], [style*="transform"]');
      clearGSAPProps(Array.from(animatedElements));
    }
    refreshScrollTriggers();
  }, 100);
});

watch(
  () => route.path,
  (path) => {
    const p = basePath(path);
    const active = items.find((item) => item.to === p);
    if (active) {
      mobileSection.value = active.value;
    }
  }
);

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
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
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

.mobile-controls {
  display: flex;
  align-items: center;
  gap: 0.35rem;
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
