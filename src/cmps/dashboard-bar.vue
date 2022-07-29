<template>
  <BarChart :chartData="groupData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'bar-chart',
  components: { BarChart },
  setup() {
    const groupData = {
      labels: [],
      datasets: [
        {
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
            '#0288D1',
            '#01579B',
            '#40C4FF',
            '#80DEEA',
            '#26C6DA',
            '#80D8FF',
            '#E0F7FA',
            '#B2EBF2',
            '#4DD0E1',
            '#00ACC1',
            '#0091EA',
            '#00B0FF',
            '#00BCD4',
          ],
        },
      ],
    }

    return { groupData }
  },
  created() {
    this.fillData()
  },
  methods: {
    fillData() {
      const groups = this.board.groups
      groups.forEach(g => {
        this.groupData.labels.push(g.title)
        this.groupData.datasets[0].data.push(g.tasks.length)
      })
    },
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
})
</script>
