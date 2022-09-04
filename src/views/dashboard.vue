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
            <p>{{ animatedTotalCards }}</p>
            <h5>Cards</h5>
          </div>
          <div class="dashboard-square">
            <p>{{ animatedOverDue }}</p>
            <h5>Over due cards</h5>
          </div>
          <div class="dashboard-square">
            <p>{{ animatedTodosDone }}/{{ todosData.all }}</p>
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
    return {
      animatedTotalCards: 0,
      animatedOverDue: 0,
      animatedTodosDone: 0,
    }
  },
  created() {
    const counterData = [
      { name: 'animatedTotalCards', data: this.totalCards },
      { name: 'animatedOverDue', data: this.overdueCards },
      { name: 'animatedTodosDone', data: this.todosData.done },
    ]
    counterData.forEach(val => this.animateValue(val.name, 0, val.data, 1000))
  },
  methods: {
    closeDashboard() {
      this.$router.push('/board/' + this.board._id)
    },
    animateValue(obj, start, end, duration) {
      let startTimestamp = null
      const step = timestamp => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        this[obj] = Math.floor(progress * (end - start) + start)
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
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
    todosData() {
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
      return { done: doneTodos, all: allTodos }
    },
  },
  unmounted() {},
  components: { doughnutChart, barChart, lineChart },
}
</script>
