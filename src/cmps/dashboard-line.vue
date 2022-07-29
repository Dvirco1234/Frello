<template>
  <LineChart :chartData="groupData" />
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
