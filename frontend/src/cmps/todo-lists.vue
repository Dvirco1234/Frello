<template>
  <section
    v-for="list in todoLists"
    :key="list.id"
    class="td-section todo-list"
  >
    <section>
      <div>
        <div class="icon-lg i-checklist"></div>
      </div>
      <div class="td-title space-between">
        <h3>{{ list.title }}</h3>
        <button @click="deleteList(list.id)">Delete</button>
      </div>
    </section>
    <section class="flex align-center">
      <div class="flex justify-center">
        <span class="percents">{{ list.prograss || '0%' }}</span>
      </div>
      <div class="proggress-bar">
        <div class="bar" :style="{ width: list?.prograss||'0%' }"></div>
      </div>
    </section>
    <section v-for="todo in list.todos" :key="todo.id">
      <div class="todo-item" @click="toggleDone(list.id, todo.id)">
        <input type="checkbox" :checked="todo.isDone" />
        <span>
          {{ todo.title }}
        </span>
      </div>
    </section>
    <section>
      <div></div>
      <div class="add-todo-container">
        <div v-if="addingTodoTo !== list.id">
          <button @click="setAddTodo(list.id)">Add an item</button>
        </div>
        <div v-else v-click-outside="closeInput">
          <input
            type="text"
            v-model="titleTxt"
            placeholder="Add an item"
            v-focus
          />
          <div class="add-todo-btns flex">
            <button @click="addTodo(list.id)" class="save-btn">Save</button>
            <button @click="closeInput">Cancel</button>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
<script>
export default {
  name: 'task-todos',
  props: { todoLists: Array },
  data() {
    return {
      addingTodoTo: null,
      titleTxt: '',
    }
  },
  created() {},
  methods: {
    setAddTodo(id) {
      this.addingTodoTo = id
    },
    closeInput() {
      this.addingTodoTo = null
      this.titleTxt = ''
    },
    addTodo(listId) {
      if (!this.titleTxt) return
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'addTodo',
        groupId,
        taskId,
        listId,
        title: this.titleTxt,
      })
      this.closeInput()
    },
    toggleDone(listId, todoId) {
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleTodo',
        groupId,
        taskId,
        listId,
        todoId,
      })
    },
    deleteList(listId) {
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'deleteTodoList',
        groupId,
        taskId,
        listId,
      })
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
