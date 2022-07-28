<template>
  <section class="app">
  <!-- <section class="app main-layout app-container"> -->
    <!-- <app-header /> -->
    <router-view />
  </section>
</template>
<script>
// import appHeader from './cmps/app-header.vue'
export default {
  name: 'app-vue',
  data() {
    return {}
  },
  created() {
    this.$store.dispatch({ type: 'loadBoards' })
    this.$store.dispatch({ type: 'getLoggedinUser' })
  },

  // components: { appHeader },
}
</script>
