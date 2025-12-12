<template>
  <v-menu location="top center" origin="bottom center" transition="scale-transition">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        icon
        variant="text"
        class="language-btn"
        density="comfortable"
        aria-label="Change locale"
      >
        <v-icon :icon="mdiTranslate" size="small"></v-icon>
      </v-btn>
    </template>
    <v-list density="compact" nav>
      <v-list-item
        v-for="option in languageOptions"
        :key="option.value"
        :value="option.value"
        :active="appStore.language === option.value"
        color="primary"
        @click="appStore.language = option.value"
      >
        <v-list-item-title>{{ option.label }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
import { mdiTranslate } from '@mdi/js';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useAppStore } from '@/store/app';

const { t } = useI18n();
const appStore = useAppStore();

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
</script>

<style scoped>
.language-btn {
  color: var(--text-subtle);
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
}

.language-btn:hover {
  color: var(--text-main);
  background: var(--bg-soft);
}
</style>
