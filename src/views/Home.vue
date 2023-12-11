<template>
  <transition name="fade" mode="out-in">
    <div v-if="isLoaded">
      <landing-window/>
      <description />
    </div>
  </transition>
</template>

<script setup>
import LandingWindow from '@/components/LandingWindow.vue';
import Description from '@/components/Description.vue';
import { ref } from 'vue';

let isLoaded = ref(false);

setTimeout(() => {
  isLoaded.value = true;
}, 500);

</script>

<style>

</style>
