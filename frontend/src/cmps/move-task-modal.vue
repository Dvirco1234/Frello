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
          <select  v-model="selectedGroup">
            <option v-for="group in groups" :key="group.id" :value="group">
              {{ group.title }}
            </option>
          </select>
        </div>
        <div class="dest-select pos-dest">
          <label>Position</label>
          <select v-model="selectedIdx">
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
      //set on created
      urlBoardId: null,
      urlGroupId: null,
      urlTaskId: null,
      //v-model updates
      selectedGroup: null,
      selectedIdx: null,
    }
  },
  created() {
    //getting information about the task from url params
    const { id, groupId, taskId } = this.$route.params
    this.urlBoardId = id
    this.urlGroupId = groupId
    this.urlTaskId = taskId

    //setting the data for the current task location (group,idx)
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
    moveTask() {
      this.$store.dispatch({
        type: 'setState',
        action: 'moveTask', //specifying the wished mutation function
        from: { groupId: this.urlGroupId, taskId: this.urlTaskId },
        to: { groupId: this.selectedGroup.id, idx: this.selectedIdx },
      })
      //go to the new location of the task
      this.$router.push({
        path: `/board/${this.urlBoardId}/${this.selectedGroup.id}/${this.urlTaskId}`,
      })
    },
  },
  computed: {
    groups() {
      //changing the postion of the current group so the select will show it first as selected
      const groups = JSON.parse(JSON.stringify(this.$store.getters.groups))
      const groupIdx = groups.findIndex(g => g.id === this.urlGroupId)
      groups.unshift(groups.splice(groupIdx, 1)[0])
      return groups
    },
  },
}
</script>
