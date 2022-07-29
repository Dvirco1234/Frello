<template>
  <div class="screen dashboard" @click="closeDashboard">
    <section class="dashboard" v-click-outside="closeDashboard">
      <article class="tasks-by-labels">
        <h3>Cards by labels</h3>
        <doughnut-chart />
      </article>
      <article class="tasks-by-labels">
        <h3>Cards per group</h3>
        <bar-chart />
      </article>
      <article class="tasks-by-labels">
        <h3>Activity per member</h3>
        <line-chart />
      </article>
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
  },
  unmounted() {},
  components: { doughnutChart, barChart, lineChart },
}
</script>
