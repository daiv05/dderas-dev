<template>
    <transition name="fade" mode="out-in">
      <div v-if="isLoaded">
        <landing-window/>
        <info />
      </div>
    </transition>
  </template>
  
  <script setup>
  import LandingWindow from '@/components/LandingWindow.vue';
  import info from '@/components/Info.vue';
  import { ref } from 'vue';
  
  let isLoaded = ref(false);
  
  setTimeout(() => {
    isLoaded.value = true;
  }, 500);
  
  </script>
  
  <style>
  
  </style>
  