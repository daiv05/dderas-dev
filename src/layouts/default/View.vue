<template>
  <v-app>
    <v-app-bar
      :elevation="scrolled ? 4 : 0"
      :class="['app-header', { 'scrolled': scrolled, 'hidden': !showHeader }]"
      app
      fixed
    >
      <div class="header-content">
        <div class="logo-section">
          <router-link to="/inicio" class="logo-link">
            <div class="logo">
              <span class="logo-bracket">&lt;</span>
              <span class="logo-text">DD</span>
              <span class="logo-bracket">/&gt;</span>
            </div>
          </router-link>
        </div>

        <nav class="desktop-nav">
          <router-link
            v-for="item in items"
            :key="item.value"
            :to="item.to"
            class="nav-link"
            active-class="active"
          >
            <v-icon :icon="item.icon" size="20"></v-icon>
            <span>{{ item.title }}</span>
          </router-link>
        </nav>

        <div class="header-actions">
          <v-btn
            icon
            variant="text"
            class="theme-toggle"
            @click="toggleTheme"
          >
            <v-icon :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"></v-icon>
          </v-btn>

          <v-app-bar-nav-icon
            variant="text"
            @click.stop="drawer = !drawer"
            class="mobile-menu-btn"
          ></v-app-bar-nav-icon>
        </div>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      location="right"
      temporary
      class="mobile-drawer"
      width="320"
    >
      <div class="drawer-header">
        <div class="drawer-logo">
          <span class="logo-bracket">&lt;</span>
          <span class="logo-text">David Deras</span>
          <span class="logo-bracket">/&gt;</span>
        </div>
        <v-btn
          icon="mdi-close"
          variant="text"
          @click="drawer = false"
        ></v-btn>
      </div>

      <v-divider></v-divider>

      <v-list nav class="drawer-nav">
        <v-list-item
          v-for="item in items"
          :key="item.value"
          :prepend-icon="item.icon"
          :title="item.title"
          :value="item.value"
          :to="item.to"
          @click="drawer = false"
          class="drawer-nav-item"
        ></v-list-item>
      </v-list>

      <div class="drawer-footer">
        <p class="footer-text">Hecho con ❤️ usando Vue.js</p>
        <div class="social-links">
          <v-btn
            icon="mdi-github"
            variant="text"
            size="small"
            href="https://github.com/daiv05"
            target="_blank"
          ></v-btn>
          <v-btn
            icon="mdi-linkedin"
            variant="text"
            size="small"
            href="https://linkedin.com"
            target="_blank"
          ></v-btn>
          <v-btn
            icon="mdi-email"
            variant="text"
            size="small"
            href="mailto:davidderas50@gmail.com"
          ></v-btn>
        </div>
      </div>
    </v-navigation-drawer>

    <v-main class="main-wrapper">
      <div class="page-background"></div>
      <router-view v-slot="{ Component }">
        <transition name="page-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <Footer />

    <v-btn
      v-show="showScrollTop"
      icon="mdi-chevron-up"
      class="scroll-to-top"
      @click="scrollToTop"
      size="large"
    ></v-btn>
  </v-app>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useTheme } from 'vuetify';
import Footer from '@/components/Footer.vue';
import sidebar_items from '@/sidebar-items.js';

const theme = useTheme();
const drawer = ref(false);
const scrolled = ref(false);
const showScrollTop = ref(false);
const showHeader = ref(true);
const isDark = ref(true);
const items = sidebar_items;

let lastScrollY = 0;

const handleScroll = () => {
  const currentScrollY = window.scrollY;

  // Mostrar header al hacer scroll hacia arriba o en el tope
  if (currentScrollY < lastScrollY || currentScrollY < 100) {
    showHeader.value = true;
  } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
    showHeader.value = false;
  }

  scrolled.value = currentScrollY > 50;
  showScrollTop.value = currentScrollY > 500;
  lastScrollY = currentScrollY;
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};

const toggleTheme = () => {
  isDark.value = !isDark.value;
  isDark.value ? theme.change('dark') : theme.change('light');
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  theme.change('dark');
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped lang="scss">
.app-header {
  background: rgba(var(--v-theme-background), 0.8) !important;
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.1);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background 0.25s ease;

  &.scrolled {
    background: rgba(var(--v-theme-background), 0.95) !important;
    // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
  }

  &.hidden {
    transform: translateY(-100%);
  }

  :deep(.v-toolbar__content) {
    padding: 0 3%;
  }
}

.header-content {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo-section {
  .logo-link {
    text-decoration: none;

    .logo {
      display: flex;
      align-items: center;
      gap: 0.25rem;
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.25rem;
      transition: all var(--transition-base);

      .logo-bracket {
        color: rgb(var(--v-theme-primary));
        font-size: 1.5rem;
        font-weight: 700;
      }

      .logo-text {
        color: rgb(var(--v-theme-on-surface));
        letter-spacing: -0.02em;
        font-weight: 700;
      }

      &:hover {
        transform: translateY(-2px);

        .logo-bracket {
          color: var(--color-accent);
        }
      }
    }
  }
}

.desktop-nav {
  display: flex;
  gap: 0.5rem;

  .nav-link {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    text-decoration: none;
    color: rgb(var(--v-theme-on-surface));
    opacity: 0.8;
    font-weight: 500;
    font-size: 0.9375rem;
    transition: all var(--transition-fast);

    &:hover {
      opacity: 1;
      background: rgba(var(--v-theme-on-surface), 0.05);
    }

    &.active {
      opacity: 1;
      color: rgb(var(--v-theme-primary));
      background: var(--primary-opacity-10);
      font-weight: 600;
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;

  .theme-toggle {
    transition: all var(--transition-base);

    &:hover {
      transform: rotate(20deg);
    }
  }

  .mobile-menu-btn {
    display: none;
  }
}

.mobile-drawer {
  background: rgba(10, 9, 8, 0.98) !important;
  backdrop-filter: blur(20px);

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;    .drawer-logo {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.125rem;

      .logo-bracket {
        color: rgb(var(--v-theme-primary));
      }
    }
  }

  .drawer-nav {
    padding: 1rem 0;

    .drawer-nav-item {
      margin: 0.25rem 1rem;
      border-radius: 8px;
      transition: all var(--transition-base);

      &:hover {
        background: var(--primary-opacity-10);
      }

      :deep(.v-list-item-title) {
        font-weight: 500;
      }
    }
  }

  .drawer-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    border-top: 1px solid rgba(var(--v-theme-on-surface), 0.1);

    .footer-text {
      font-size: 0.875rem;
      opacity: 0.6;
      margin-bottom: 1rem;
      text-align: center;
    }

    .social-links {
      display: flex;
      justify-content: center;
      gap: 0.5rem;
    }
  }
}

.main-wrapper {
  position: relative;
  min-height: 100vh;

  .page-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(at 0% 0%, var(--primary-opacity-15) 0px, transparent 50%),
      radial-gradient(at 100% 100%, var(--secondary-opacity-10) 0px, transparent 50%);
  }
}

.scroll-to-top {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  background: rgb(var(--v-theme-primary)) !important;
  color: white !important;
  // box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    // box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }
}

.page-fade-enter-active,
.page-fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.page-fade-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.page-fade-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

@media (max-width: 960px) {
  .desktop-nav {
    display: none;
  }

  .header-actions .mobile-menu-btn {
    display: flex;
  }
}

@media (max-width: 600px) {
  .scroll-to-top {
    bottom: 1rem;
    right: 1rem;
  }
}
</style>
