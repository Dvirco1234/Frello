<template>
  <div class="screen show">
    <section class="dashboard" v-click-outside="closeDashboard">
      <h3>Cards by labels</h3>
      <div class="tasks-by-labels">
        <doughnut-chart />
      </div>
    </section>
  </div>
</template>
<script>
import doughnutChart from '../cmps/dashboard-doughnut.vue'
export default {
  name: 'dashboard',
  // props: {type: Object},
  data() {
    return {}
  },
  created() {},
  methods: {
    closeDashboard(){
      this.$router.go(-1)
    }
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
  unmounted() {},
  components: { doughnutChart },
}
</script>
