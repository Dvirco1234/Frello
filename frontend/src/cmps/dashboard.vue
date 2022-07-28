<template>
  <section class="dashboard">
    <h3>Cards by labels</h3>
    <div class="tasks-by-labels">
      <doughnut-chart/>
    </div>
  </section>
</template>
<script>
import doughnutChart from './dashboard-doughnut.vue'
export default {
  name: 'dashboard',
  // props: {type: Object},
  data() {
    return {}
  },
  created() {},
  methods: {},
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  unmounted() {},
  components: { doughnutChart },
}
</script>
