<template>
  <section>
    <board-nav-bar />
    <h1>board app</h1>
<<<<<<< HEAD
=======
    <group-list />
>>>>>>> 7559d7596c012b0ef0b65b93302a206d6b2f57fb
    <pre>{{ board }}</pre>
  </section>
</template>
<script>
import boardNavBar from '../cmps/board-nav-bar.vue'
import groupList from '../cmps/group-list.vue'
export default {
  name: '',
  props: { type: Object },
  data() {
    return {}
  },
  created() { },
  methods: {},
  unmounted() { },
  components: {
    boardNavBar,
    groupList,
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
}
</script>
