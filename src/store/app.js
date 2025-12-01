// Utilities
import { useStorage } from '@vueuse/core';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: useStorage('theme', 'dark'),
    language: useStorage('language', 'en'),
  }),
});
