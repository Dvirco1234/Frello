<template>
  <section>
    <h1>board app</h1>
    <pre>{{board}}</pre>
  </section>
</template>
<script>
export default {
  name: '',
  props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {},
  unmounted() {},
  components: {},
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
}
</script>
