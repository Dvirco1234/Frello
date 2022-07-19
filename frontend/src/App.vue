<template>
  <section class="app main-layout">
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

  components: { appHeader },
}
</script>
