<template>
  <v-app-bar color="black" prominent height="30px">
    <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Daiv DV</v-toolbar-title>
    <v-spacer></v-spacer>
  </v-app-bar>
  <v-navigation-drawer v-model="drawer" location="left" temporary color="grey-darken-4" fixed height="10%">
    <v-list :items="items"></v-list>
  </v-navigation-drawer>
  <v-main>
    <router-view />
  </v-main>
</template>

<script>

export default {
  data: () => ({
    drawer: false,
    group: null,
    items: [
      {
        title: 'Inicio',
        value: 'home',
        icon: 'mdi-home',
      },
      {
        title: 'Sobre mi',
        value: 'about',
        icon: 'mdi-account',
      },
      {
        title: 'Proyectos',
        value: 'projects',
        icon: 'mdi-folder',
      },
      {
        title: 'UES',
        value: 'ues',
        icon: 'mdi-school',
      }
    ],
  }),

  watch: {
    group() {
      this.drawer = false
    },
  },
}

</script>

<style scoped>
.fixed {
  position: fixed;
}
</style>