<template>
  <section class="date-modal sidebar-modal">
    <header class="flex justify-center">
      <p>Dates</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeDateModal"
      />
    </header>
    <main>
      <h4>Due date</h4>
      <div class="datetime-picker">
        <div>
          <el-date-picker
            v-model="selectedDate"
            type="datetime"
            placeholder="Select date and time"
            class="date-input"
          />
        </div>
      </div>

      <button class="set-date flex justify-center" @click="setDueDate">
        Set
      </button>
      <el-button class="flex justify-center" @click="closeDateModal"
        >Cancel</el-button
      >
    </main>
  </section>
</template>
<script>
export default {
  name: 'date-modal',
  // props: {type: Object},
  data() {
    return {
      selectedDate: null,
    }
  },
  created() {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.selectedDate = tomorrow.toISOString().substring(0, 10)
    //
  },
  methods: {
    closeDateModal() {
      this.$emit('close-date-modal')
    },
    setDueDate() {
      const activity = {
        txt: 'set a due date',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      const dueDate = new Date(this.selectedDate).getTime()
      this.$store.dispatch({
        type: 'setState',
        action: 'setDueDate',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        dueDate,
      })
      this.closeDateModal()
    },
  },
  computed: {
    taskData() {
      return this.$store.getters.currTaskData
    },
  },
  unmounted() {},
  components: {},
}
</script>
