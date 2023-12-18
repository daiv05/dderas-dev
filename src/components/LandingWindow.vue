<template>
  <v-carousel cycle width="100%" height="90vh" :show-arrows="false" :hide-delimiters="true">
    <v-carousel-item v-for="image in images" :src="image.img" :lazy-src="image.img" :alt="image.alt" cover>
      <div class="text">
        <h1>{{ image.title }}</h1>
        <hr />
        <p>{{ image.text }}</p>
      </div>
    </v-carousel-item>
  </v-carousel>
</template>
<script>
export default {
  name: 'LandingWindow',
  data: () => ({
    images: [
      {
        img: '/img/slides/punpun_wallpaper.jpg',
        title: 'Daiv DV',
        text: 'Full Stack Web Developer',
        alt: 'Punpun Wallpaper'
      },
      {
        img: '/img/slides/ues-wall.jpg',
        title: 'UES Drive',
        text: 'Repositorio de archivos. Ing de Sistemas Informáticos',
        alt: 'UES Wallpaper'
      },
      {
        img: '/img/slides/project-wall.jpg',
        title: 'Proyectos',
        text: 'Proyectos personales y de la universidad',
        alt: 'Project Wallpaper'
      }
    ]
  }),
  methods: {
  }
}
</script>

<style scoped>
.text {
  color: #f2f2f2;
  text-shadow: 2px 2px 4px #000000;
  font-size: 15px;
  padding: 8px 12px;
  position: absolute;
  bottom: 8px;
  width: 100%;
  text-align: center;
}
</style>