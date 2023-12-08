<template>
  <div>
    <transition :name="name" ::appear="true">
      <div v-if="isVisible">
        <slot></slot>
      </div>
    </transition>
  </div>
</template>

<script>
let isPassiveSupported = false;
try {
  const options = Object.defineProperty({}, 'passive', {
    get: () => isPassiveSupported = true
  });
  window.addEventListener('test', null, options);
} catch (err) {
  console.log("Passive not supported");
}

export default {
  props: {
    name: String,
    appear: { type: Boolean, default: false },
    offsetTop: { type: Number, default: 0 },
    duration: { type: Number, default: 1 }
  },

  data: () => ({
    isVisible: false
  }),

  methods: {
    inViewport() {
      const rect = this.$el.getBoundingClientRect()
      return rect.top <= (window.innerHeight - this.offsetTop) && rect.left <= window.innerWidth
    },
    detectVisibility() {
      this.isVisible = this.inViewport()
    }
  },

  mounted() {
    this.$nextTick(this.detectVisibility)
    window.addEventListener('scroll', this.detectVisibility, isPassiveSupported ? { passive: true } : false)
    window.addEventListener('resize', this.detectVisibility, isPassiveSupported ? { passive: true } : false)
    window.addEventListener('orientationchange', this.detectVisibility, isPassiveSupported ? { passive: true } : false)
  },

  destroyed() {
    window.removeEventListener('scroll', this.detectVisibility)
    window.removeEventListener('resize', this.detectVisibility)
    window.removeEventListener('orientationchange', this.detectVisibility)
  }
}
</script>

<style>
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(25px);
  opacity: 0;
}
</style>