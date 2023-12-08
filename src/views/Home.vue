<template>
  <transition name="fade" mode="out-in">
    <div class="wrapper" v-if="isLoaded">
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
}, 1000);

</script>

<style>

@font-face {
    font-family: "Montserrat-Regular";
    src: url("../assets/fonts/Montserrat-Medium.ttf");
}

.wrapper {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

</style>
