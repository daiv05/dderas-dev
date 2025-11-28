<template>
  <div v-if="isLoaded">
    <landing-window />
    <info />
  </div>
</template>

<script setup>
import { ref } from 'vue';

import info from '@/components/Info.vue';
import LandingWindow from '@/components/LandingWindow.vue';

let isLoaded = ref(false);

setTimeout(() => {
  isLoaded.value = true;
}, 500);
</script>

<style scoped>
/* -- */
</style>
