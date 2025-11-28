<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      :permanent="isDesktop"
      :scrim="!isDesktop"
      class="shell-nav"
      width="280"
    >
      <div class="nav-root">
        <router-link to="/inicio" class="brand-mark">
          <span class="brand-initial">David Deras</span>
          <span class="brand-tag">Fullstack & producto</span>
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
              <span class="nav-dot" :class="{ 'nav-dot--active': isActive(item) }"></span>
            </template>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>

        <div class="nav-bottom">
          <v-btn class="theme-toggle" variant="outlined" block rounded="pill" @click="toggleTheme">
            {{ appStore.theme === 'dark' ? 'Modo claro' : 'Modo oscuro' }}
          </v-btn>

          <div class="nav-links">
            <a href="https://github.com/daiv05" target="_blank" rel="noopener" aria-label="GitHub">
              GH
            </a>
            <a
              href="https://linkedin.com/in/dderas"
              target="_blank"
              rel="noopener"
              aria-label="LinkedIn"
            >
              IN
            </a>
            <a href="mailto:davidderas50@gmail.com" aria-label="Email">Mail</a>
          </div>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="shell-main">
      <div class="shell-main-inner">
        <div v-if="!isDesktop" class="mobile-top">
          <v-btn icon variant="text" @click="drawer = true">
            <v-icon icon="mdi-menu"></v-icon>
          </v-btn>
          <p class="mobile-title">David Deras</p>
          <v-btn
            variant="text"
            class="mobile-theme"
            rounded="pill"
            size="small"
            @click="toggleTheme"
          >
            {{ appStore.theme === 'dark' ? 'Oscuro' : 'Claro' }}
          </v-btn>
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
                {{ item.title }}
              </v-btn>
            </v-slide-group-item>
          </v-slide-group>
        </div>

        <div class="page-frame shell-content">
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
      icon="mdi-arrow-up"
      class="scroll-to-top"
      size="large"
      @click="scrollToTop"
    ></v-btn>
  </v-app>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useTheme, useDisplay } from 'vuetify';

import Footer from '@/components/Footer.vue';
import sidebar_items from '@/sidebar-items.js';
import { useAppStore } from '@/store/app';

const theme = useTheme();
const display = useDisplay();
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();
const items = sidebar_items;

const drawer = ref(false);
const showScrollTop = ref(false);
const mobileSection = ref(items[0]?.value ?? null);

const isDesktop = computed(() => display.mdAndUp.value);

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
  router.push(item.to);
  if (!isDesktop.value) {
    drawer.value = false;
  }
};

const handleMobileNav = (item) => {
  mobileSection.value = item.value;
  router.push(item.to);
};

const isActive = (item) => route.path === item.to;

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 500;
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.shell-nav {
  border-right: 1px solid var(--line-soft) !important;
  background: rgb(var(--v-theme-background)) !important;
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
  width: 10px;
  height: 10px;
  border-radius: 999px;
  border: 1px solid var(--line-soft);
  margin-right: 0.85rem;
}

.nav-dot--active {
  border-color: rgb(var(--v-theme-primary));
  background: rgb(var(--v-theme-primary));
}

.nav-bottom {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-top: auto;
}

.theme-toggle {
  border-color: var(--line-soft) !important;
}

.nav-links {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.nav-links a {
  padding: 0.35rem 0.75rem;
  border: 1px solid var(--line-soft);
  border-radius: 999px;
}

.shell-main {
  min-height: 100vh;
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
  padding: 1rem var(--shell-padding) 0;
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
