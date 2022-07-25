<template>
  <aside class="todo-modal" v-click-outside="closeTodoModal">
    <header class="flex justify-center">
      <p>Add checklist</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeTodoModal"
      />
    </header>
    <main>
      <h4>Title</h4>
      <input type="text" class="modal-input" v-model="todosTitle" />
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
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'newTodoList',
        groupId,
        taskId,
        title: this.todosTitle,
      })
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
