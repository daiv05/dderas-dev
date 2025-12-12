<template>
  <v-btn
    class="theme-toggle"
    icon
    variant="text"
    density="comfortable"
    :title="
      t(
        appStore.theme === 'dark'
          ? 'navigation.themeToggle.toLight'
          : 'navigation.themeToggle.toDark'
      )
    "
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <v-icon
      :icon="appStore.theme === 'dark' ? mdiWeatherSunny : mdiWeatherNight"
      size="22"
    ></v-icon>
  </v-btn>
</template>

<script setup>
import { mdiWeatherSunny, mdiWeatherNight } from '@mdi/js';
import { useI18n } from 'vue-i18n';

import { useAppStore } from '@/store/app';

const { t } = useI18n();
const appStore = useAppStore();

const toggleTheme = () => {
  appStore.theme = appStore.theme === 'dark' ? 'light' : 'dark';
};
</script>

<style scoped>
.theme-toggle {
  color: var(--text-subtle);
}

.theme-toggle:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}
</style>
