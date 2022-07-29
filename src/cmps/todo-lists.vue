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
        <div class="flex gap-1">
          <button
            v-if="
              !list.checkedHidden && list.todos.filter(td => td.isDone).length
            "
            @click="toggleHideChecked(list.id)"
          >
            Hide checked items
          </button>
          <button
            v-else-if="list.todos.filter(td => td.isDone).length"
            @click="toggleHideChecked(list.id)"
          >
            Show checked items
          </button>
          <button @click="deleteList(list.id)">Delete</button>
        </div>
      </div>
    </section>
    <section class="flex align-center">
      <div class="flex justify-center">
        <span class="percents">{{ list.prograss || '0%' }}</span>
      </div>
      <div class="proggress-bar">
        <div
          class="bar"
          :class="{ done: list.prograss === '100%' }"
          :style="{ width: list?.prograss || '0%' }"
        ></div>
      </div>
    </section>
    <section v-for="todo in list.todos" :key="todo.id">
      <div
        class="todo-item"
        v-if="!list.checkedHidden || !todo.isDone"
        @click="toggleDone(list.id, todo.id)"
      >
        <input type="checkbox" :checked="todo.isDone" />
        <span :class="{ crossed: todo.isDone }">
          {{ todo.title }}
        </span>
      </div>
    </section>
    <section>
      <div class="add-todo-container">
        <div v-if="addingTodoTo !== list.id">
          <button @click="setAddTodo(list.id)">Add an item</button>
        </div>
        <div v-else v-click-outside="closeInput">
          <form @submit="addTodo(list.id)">
            <input
              type="text"
              v-model="titleTxt"
              placeholder="Add an item"
              v-focus
              required
            />
          </form>
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
      urlGroupId: this.$route.params.groupId,
      urlTaskId: this.$route.params.taskId,
      addingTodoTo: null,
      titleTxt: '',
    }
  },
  created() {},
  emits:['delete-list','add-todo'],
  methods: {
    setAddTodo(id) {
      this.addingTodoTo = id
    },
    closeInput() {
      this.addingTodoTo = null
      this.titleTxt = ''
    },
    addTodo(listId) {
      if(!this.titleTxt) return
      this.$emit('add-todo', listId,this.titleTxt)
    },
    toggleDone(listId, todoId) {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleTodo',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        listId,
        todoId,
      })
    },
    deleteList(listId) {
      this.$emit('delete-list', listId)
    },
    toggleHideChecked(listId) {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleHideChecked',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        listId,
      })
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
