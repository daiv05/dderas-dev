<template>
  <div class="app-loader" style="z-index: 2000;">
    <div class="circulo" style="width:100px; height:100px; background:rgb(222, 222, 222); border-radius:50px; display: flex; justify-content: center; align-items: center; box-shadow:  3px 3px 6px rgb(63, 63, 63);">
      <p style="font-size: small; font-weight: bolder; color: rgb(90, 90, 90);">
        Cargando...
      </p>
    </div>
  </div>
</template>

<script setup>
defineOptions({
  name: "AppLoader"
})
</script>

<style scoped>
.app-loader {
  position: fixed;
  top: 0;
  left: 0;
  min-height: 100vh;
  min-width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
