<template>
  <div class="screen dashboard" @click="closeDashboard">
    <section class="dashboard" v-click-outside="closeDashboard">
      <section class="members">
        <h3>Board members</h3>
        <ul class="member-list clean-list flex gap-1 justify-center">
          <li v-for="member in board.members">
            <img :src="member.imgUrl" :alt="member.username" />
            <p>{{ member.fullname }}</p>
          </li>
        </ul>
      </section>
      <section class="stats flex gap-2 justify-center">
        <div>
          <h4>Cards</h4>
          <p>{{ totalCards }}</p>
        </div>
        <div>
          <h4>Over due cards</h4>
          <p>{{ overdueCards }}</p>
        </div>
        <div>
          <h4>Todos done</h4>
          <p>{{ todosDone }}</p>
        </div>
      </section>

      <section class="charts flex">
        <article class="tasks-by-labels">
          <h3>Activities per member</h3>
          <line-chart />
        </article>
        <article class="tasks-by-labels">
          <h3>Cards per group</h3>
          <bar-chart />
        </article>
        <article class="tasks-by-labels">
          <h3>Labels by cards</h3>
          <doughnut-chart />
        </article>
      </section>
    </section>
  </div>
</template>
<script>
import doughnutChart from '../cmps/dashboard-doughnut.vue'
import barChart from '../cmps/dashboard-bar.vue'
import lineChart from '../cmps/dashboard-line.vue'
export default {
  name: 'dashboard',
  data() {
    return {}
  },
  created() {},
  methods: {
    closeDashboard() {
      this.$router.push('/board/' + this.board._id)
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
    totalCards() {
      let count = 0
      this.board.groups.forEach(g => {
        count += g.tasks.length
      })
      return count
    },
    overdueCards() {
      let count = 0
      const now = Date.now()
      this.board.groups.forEach(g => {
        g.tasks.forEach(t => {
          if (t.dueDate && t.dueDate < now) count += 1
        })
      })
      return count
    },
    todosDone() {
      let allTodos = 0,
        doneTodos = 0
      this.board.groups.forEach(g => {
        g.tasks.forEach(t => {
          t.todoLists.forEach(l => {
            allTodos += l.todos.length
            doneTodos += l.todos.filter(td => td.isDone).length
          })
        })
      })
      return doneTodos+' / '+allTodos
    },
  },
  unmounted() {},
  components: { doughnutChart, barChart, lineChart },
}
</script>
