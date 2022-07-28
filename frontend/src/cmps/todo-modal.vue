<template>
  <aside class="todo-modal sidebar-modal" v-click-outside="closeTodoModal">
    <header class="flex justify-center">
      <p>Add checklist</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeTodoModal"
      />
    </header>
    <main>
      <h4>Title</h4>
      <input type="text" class="modal-input" v-model="todosTitle" v-focus />
      <button @click="newTodoList">Add</button>
    </main>
  </aside>
</template>
<script>
export default {
  name: 'todo-modal',
  data() {
    return {
      todosTitle: 'Checklist',
    }
  },
  created() {},
  methods: {
    closeTodoModal() {
      this.$emit('close-todo-modal')
    },
    newTodoList() {
      const activity = {
        txt: 'added a new todo list',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'newTodoList',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        title: this.todosTitle,
      })
      this.closeTodoModal()
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
