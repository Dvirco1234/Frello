<template>
  <section>
    <board-nav-bar />
    <h1>board app</h1>
    <group-list />
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
