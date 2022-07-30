<template>
  <LineChart :chartData="activityData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'line-chart',
  components: { LineChart },
  setup() {
    const activityData = {
      labels: [],
      datasets: [
        {
          label: '',
          data: [],
          backgroundColor: [
            '#81D4FA',
            '#E1F5FE',
            '#2962FF',
            '#B3E5FC',
            '#4FC3F7',
            '#2979FF',
            '#0277BD',
            '#03A9F4',
            '#039BE5',
            '#29B6F6',
          ],
        },
      ],
    }

    return { activityData }
  },
  created() {
    this.fillData()
  },
  methods: {
    fillData() {
      const activityMap = {}
      this.board.activities.forEach(a => {
        const fullname = a.byMember.fullname
        if (!activityMap[fullname]) activityMap[fullname] = 0
        activityMap[fullname]++
      })
      for (let fullname in activityMap) {
        this.activityData.labels.push(fullname)
        this.activityData.datasets[0].data.push(activityMap[fullname])
      }
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
})
</script>
