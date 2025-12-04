<template>
  <header class="post-header">
    <h1 class="post-title">{{ title }}</h1>
    <div class="inline-meta">
      <span v-if="date">{{ date }}</span>
      <div v-if="tags?.length" class="chipline">
        <span v-for="t in tags" :key="t">#{{ t }}</span>
      </div>
    </div>
    <img v-if="image" class="post-hero" :src="image" :alt="title" />
    <p v-if="summary" class="section-lead" style="margin-top: 0.5rem">{{ summary }}</p>
  </header>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  date: { type: String, default: '' },
  tags: { type: Array, default: () => [] },
  image: { type: String, default: '' },
  summary: { type: String, default: '' },
});
</script>

<style scoped>
.post-header {
  display: grid;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.post-title {
  font-size: clamp(2rem, 5vw, 2.6rem);
}
.post-hero {
  border-radius: var(--radius-md);
  border: 1px solid var(--line-soft);
  margin-top: 0.5rem;
}
</style>
