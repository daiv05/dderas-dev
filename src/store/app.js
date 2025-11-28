// Utilities
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useAppStore = defineStore('app', {
  state: () => ({
    theme: useStorage('theme', 'dark'),
  }),
})
