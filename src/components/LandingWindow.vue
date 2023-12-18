<template>
  <v-carousel cycle width="100%" height="90vh" :show-arrows="false">
    <v-carousel-item v-for="image in images" position="100" :lazy-src="image"></v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: 'LandingWindow',
  data: () => ({
    images: [
      '/img/slides/punpun_wallpaper.jpg',
      '/img/slides/ues-wall.jpg',
      '/img/slides/project-wall.jpg'
    ]
  }),
  methods: {
  }
}
</script>