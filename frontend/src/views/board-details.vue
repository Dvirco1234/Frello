<template>
  <section class="board-details">
    <board-nav-bar />
    <h1>board details</h1>
    <!-- <group-list :groups="board.groups"/> -->
    <section class="group-list flex">
      <group-preview
        v-for="group in board.groups"
        :key="group.id"
        :group="group"
        @addTask="onAddTask"
        :boardLabels="board.labels"
        :boardMembers="board.members"
      />
      <!-- <div class="add-group group-preview"></div> -->
      <article class="add-group group-preview">
        <div v-if="!isNewGroupEdit">
          <button @click="toggleAddGroup">+ Add another list</button>
        </div>
        <div v-else>
          <form @submit.prevent="addGroup">
            <input type="text" placeholder="Enter a title for this card..." />
            <button>Add card</button>
            <button @click="toggleAddGroup">x</button>
          </form>
        </div>
      </article>
    </section>
  </section>
</template>
<script>
import boardNavBar from '../cmps/board-nav-bar.vue'
// import groupList from '../cmps/group-list.vue'
import groupPreview from '../cmps/group-preview.vue'
import { boardService } from '../services/board-service'

export default {
  name: 'board-details',
  // props: { type: Object },
  data() {
    return {
      isNewGroupEdit: false,
      groupToAdd: null,
    }
  },
  created() {
    const { id } = this.$route.params
    this.$store.dispatch({ type: 'board', action: 'set', board: id })
    this.groupToAdd = boardService.getEmpty('group')
  },
  methods: {
    toggleAddGroup() {
      this.isNewGroupEdit = !this.isNewGroupEdit
    },
    addGroup() {
      this.$store.dispatch({
        type: 'group',
        action: 'save',
        group: this.groupToAdd,
      })
      this.toggleAddGroup()
    },
    onAddTask(task, groupId) {
      this.$store.dispatch({ type: 'task', action: 'save', task, groupId })
    },
  },
  unmounted() {},
  components: {
    boardNavBar,
    // groupList,
    groupPreview,
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
}
</script>

<style>
.board-details {
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  height: 100%;
}

.add-group {
  height: 40px;
}
</style>
