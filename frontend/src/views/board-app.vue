<template>
    <app-header />
  <section class="board-app flex justify-center">
    <nav class="left-nav flex justify-center">
      <ul class="clean-list">
        <li class="boards flex align-center">
          <img src="../assets/trello-brand.svg">
          Boards
        </li>
      </ul>

    </nav>
    <article class="main-content">
      <div class="workspace-title">YOUR WORKSPACES</div>
      <div class="board-list-container flex">

        <div v-show="boards" class="board-list flex clean-list">
          <span v-for="board in boards" :key="board._id">
            <board-preview :board="board" />
          </span>
          <button class="flex flex-center">Create new board</button>
        </div>
      </div>
    </article>
  </section>
</template>
<script>
import boardPreview from '../cmps/board-preview.vue'
import appHeader from '../cmps/app-header.vue'
export default {
  name: 'board-app',
  props: { type: Object },
  data() {
    return {}
  },
  created() { },
  methods: {},
  computed: {
    boards() {
      return this.$store.getters.boards
    },
  },
  unmounted() { },
  components: {
    boardPreview,
    appHeader
  },
}
</script>
