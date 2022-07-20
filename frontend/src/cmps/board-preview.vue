<template>
  <section class="board-preview flex flex-col align-center">
    <h3>{{ board.title }}</h3>
    <p>created {{ creationTime }}</p>
    <ul class="clean-list">
      <li v-for="member in board.members" :key="member._id">
        {{ member.fullname }}
      </li>
    </ul>
    <button @click="goToBoard">Go to board</button>
  </section>
</template>
<script>
export default {
  name: 'board-preview',
  props: {
    board: {
      type: Object,
    },
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    goToBoard() {
      this.$store.dispatch({ type: 'setCurrBoard', board: this.board })
      this.$router.push(`/board/${this.board._id}`)
    },
  },
  computed: {
    creationTime() {
      return new Date(this.board.createdAt).toLocaleString('he')
    },
  },
  unmounted() {},
  components: {},
}
</script>
<style>
.board-preview {
  background-color: rgb(235, 237, 241);
  padding: 8px;
  width: 272px;
  margin: 4px;
  gap: 8px;
}
</style>
