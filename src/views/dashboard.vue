<template>
  <div class="screen" @click="closeDashboard">
    <section class="dashboard" v-click-outside="closeDashboard">
      <div class="dashboard-card quick-look">
        <header>
          <h3>Quick look</h3>
        </header>
        <h4>Members</h4>
        <ul class="member-list clean-list">
          <li v-for="member in board.members" class="member">
            <img :src="member.imgUrl" :alt="member.username" />
            <p>{{ member.fullname }}</p>
          </li>
        </ul>
        <h4>Stats</h4>
        <div class="quick-data">
          <div class="dashboard-square">
            <p>{{ totalCards }}</p>
            <h5>Cards</h5>
          </div>
          <div class="dashboard-square">
            <p>{{ overdueCards }}</p>
            <h5>Over due cards</h5>
          </div>
          <div class="dashboard-square">
            <p>{{ todosDone }}</p>
            <h5>Todos done</h5>
          </div>
        </div>
      </div>

      <div class="dashboard-card line">
        <line-chart />
      </div>

      <div class="dashboard-card bar">
        <bar-chart />
      </div>

      <div class="dashboard-card doughnut">
        <doughnut-chart />
      </div>
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
      return doneTodos + ' / ' + allTodos
    },
  },
  unmounted() {},
  components: { doughnutChart, barChart, lineChart },
}
</script>
