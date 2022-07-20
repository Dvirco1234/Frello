<template>
  <section class="app main-layout">
  <!-- <section class="app main-layout app-container"> -->
    <app-header />
    <router-view />
  </section>
</template>
<script>
import appHeader from './cmps/app-header.vue'
export default {
  name: 'app-vue',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
  },

  components: { appHeader },
}
</script>
