<template>
  <section class="board-preview flex flex-col" @click="goToBoard" :style="background">
    <div class="background">
      <p>{{ board.title }}</p>
    </div>
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
  created() { },
  methods: {
    goToBoard() {
      this.$router.push('/board/' + this.board._id)
    },
  },
  computed: {
    creationTime() {
      return new Date(this.board.createdAt).toLocaleString('he')
    },
    background() {
      if (this.board.style.background.length > 10) {
        return `background-image: url('${this.board.style.background}')`
      } else {
        return this.board.style.background
      }
    }
  },
  unmounted() { },
  components: {},
}
</script>
<style>
</style>
