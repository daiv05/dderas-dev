<template>
  <v-app-bar color="black" style="overflow: initial; z-index: 998">
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
import sidebar_items from '@/sidebar-items.js'
export default {
  data: () => ({
    drawer: false,
    group: null,
    items: sidebar_items,
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