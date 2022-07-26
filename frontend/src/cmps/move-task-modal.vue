<template>
  <section
    class="move-task-modal sidebar-modal"
    v-click-outside="closeMoveModal"
  >
    <header class="flex justify-center">
      <p>Move card</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeMoveModal"
      />
    </header>
    <main>
      <h4>Select destination</h4>
      <div class="select-container flex">
        <div class="dest-select list-dest">
          <label>List</label>
          <select @change="setSelectedGroup">
            <option v-for="group in groups" :key="group.id" :value="group.id">
              {{ group.title }}
            </option>
          </select>
        </div>
        <div class="dest-select pos-dest">
          <label>Position</label>
          <select @change="setSelectedIdx">
            <option
              v-for="(task, idx) in selectedGroup.tasks.length || 1"
              :key="idx"
              :value="idx"
            >
              {{ idx }}
            </option>
          </select>
        </div>
      </div>
      <button @click="moveTask" class="move-btn">Move</button>
    </main>
  </section>
</template>
<script>
export default {
  name: 'move-task-modal',
  data() {
    return {
      urlGroupId: null,
      urlTaskId: null,
      selectedGroup: null,
      selectedIdx: null,
    }
  },
  created() {
    this.urlGroupId = this.$route.params.groupId
    this.urlTaskId = this.$route.params.taskId

    const currGroup = this.$store.getters.groups.find(
      g => g.id === this.urlGroupId
    )
    this.selectedGroup = currGroup
    const currIdx = currGroup.tasks.findIndex(t => t.id === this.urlTaskId)
    this.selectedIdx = currIdx
  },
  methods: {
    closeMoveModal() {
      this.$emit('close-move-task-modal')
    },
    setSelectedGroup(e) {
      this.selectedGroup = this.groups.find(g => g.id === e.target.value)
    },
    setSelectedIdx(e) {
      this.selectedIdx = e.target.value
    },
    moveTask() {
      this.$router.go(-1)
      this.$store.dispatch({
        type: 'setState',
        action: 'moveTask',
        from: { groupId: this.urlGroupId, taskId: this.urlTaskId },
        to: { groupId: this.selectedGroup.id, idx: this.selectedIdx },
      })
    },
  },
  computed: {
    groups() {
      //changing the postion of the current group so the select will it by default
      const groups = JSON.parse(JSON.stringify(this.$store.getters.groups))
      const groupIdx = groups.findIndex(g => g.id === this.urlGroupId)
      const group = groups.splice(groupIdx, 1)[0]
      groups.unshift(group)
      return groups
    },
  },
}
</script>
