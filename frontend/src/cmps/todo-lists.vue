<template>
  <section v-for="list in todoLists" :key="list.id" class="td-section">
    <section>
      <div>
        <div class="icon-lg i-checklist"></div>
      </div>
      <div class="td-title space-between">
        <h3>{{ list.title }}</h3>
        <button>Delete</button>
      </div>
    </section>
    <section v-for="todo in list.todos" :key="todo.id">
      <div>
        <input type="checkbox" />
      </div>
      <div>
        <span>
          <p>todo</p>
        </span>
      </div>
    </section>
    <section>
      <div></div>
      <div class="add-todo-container">
        <div v-if="!addingTodo">
          <button @click="addingTodo = true">add an item</button>
        </div>
        <div v-else>
          <input
            type="text"
            v-model="todoTxt"
          />
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
      addingTodo: false,
      todoTxt: 'Add an item',
    }
  },
  created() {},
  methods: {},
  computed: {},
  unmounted() {},
  components: {},
}
</script>
