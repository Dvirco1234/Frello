<template>
  <section>
    <h2>Boards</h2>
    <ul v-show="boards" class="board-list clean-list">
      <li v-for="board in boards" :key="board._id">
        <board-preview :board="board" />
      </li>
    </ul>
    <button>+</button>
  </section>
</template>
<script>
import boardPreview from '../cmps/board-preview.vue'
export default {
  name: 'board-app',
  props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  unmounted() {},
  components: {
    boardPreview,
  },
}
</script>
