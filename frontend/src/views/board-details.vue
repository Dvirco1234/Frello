<template>
  <section class="board-details">
    <board-nav-bar :board="board" />
    <!-- <group-list :groups="board.groups"/> -->
    <section class="group-list flex">
      <group-preview v-for="group in board.groups" :key="group.id" :group="group" @addTask="onAddTask"
        @saveGroup="onSaveGroup" :boardLabels="board.labels" :boardMembers="board.members" />
      <!-- <div class="add-group group-preview"></div> -->
      <article class="add-group">
        <div v-if="!isNewGroupEdit">
          <button class="add-list-btn" @click="toggleAddGroup">
          <span class="flex align-center"><img src="../assets/plus.svg"/></span> 
          Add another list</button>
        </div>
        <div v-else class="new-group-container">
          <form @submit.prevent="onSaveGroup">
            <input type="text" v-model="groupToAdd.title" placeholder="Enter list title..." v-focus />
            <button class="add-group-btn">Add list</button>
            <button class="cancel-group-btn" @click="toggleAddGroup">🗙</button>
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
    onSaveGroup(editedGroup) {
      this.$store.dispatch({
        type: 'group',
        action: 'save',
        group: editedGroup?.id ? editedGroup : this.groupToAdd,
      })
      if (!editedGroup.id) this.toggleAddGroup()
    },
    onAddTask(task, groupId) {
      this.$store.dispatch({ type: 'task', action: 'save', task, groupId })
    },
  },
  unmounted() { },
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
/* .board-details {
  margin-bottom: 8px;
  overflow-x: auto;
  overflow-y: hidden;
  height: calc(100vh - 44px - 7px);
}

.group-list {
    align-items: flex-start;
}

.add-group {
  height: 40px;
} */
</style>
