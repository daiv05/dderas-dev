<template>
  <v-app-bar color="black" prominent>
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Daiv DV</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="left" temporary color="grey-darken-4" fixed>
    <v-list nav>
      <v-list-item v-for="item in items" :prepend-icon="item.icon" :title="item.title" :value="item.value"
        :to="item.to"></v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="wrapper">
    <router-view />
  </v-main>
  <Footer />
</template>

<script>
import Footer from '@/components/Footer.vue'
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Inicio',
        value: 'home',
        icon: 'mdi-home',
        to: '/inicio',
      },
      {
        title: 'Sobre mi',
        value: 'about',
        icon: 'mdi-account',
        to: '/me',
      },
      {
        title: 'Proyectos',
        value: 'projects',
        icon: 'mdi-folder',
        to: '/proyectos',
      },
      {
        title: 'UES',
        value: 'ues',
        icon: 'mdi-school',
        to: '/documentos-y-guias',
      },
      {
        title: 'Tutoriales',
        value: 'tutorials',
        icon: 'mdi-book-open-page-variant',
        to: '/tutoriales',
      }
    ],
  }),
  components: {
    Footer,
  },
  watch: {
    group() {
      this.drawer = false
    },
  },
}

</script>

<style>

* {
    box-sizing: border-box;
}

@font-face {
  font-family: "Montserrat-Regular";
  src: url("../../assets/fonts/Montserrat-Medium.ttf");
}

.wrapper {
  font-family: Montserrat-Regular, serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>