<template>
  <DoughnutChart :chartData="labelData" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { DoughnutChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'doghnut-chart',
  components: { DoughnutChart },
  setup() {
    const labelData = {
      labels: [],
      datasets: [
        {
          data: [],
          backgroundColor: [],
        },
      ],
    }

    return { labelData }
  },
  created() {
    this.fillData()
  },
  methods: {
    fillData() {
      const labelMap = {}
      this.board.groups.forEach(g => {
        g.tasks.forEach(t => {
          t.labelIds.forEach(id => {
            if (!labelMap[id]) {
              labelMap[id] = 0
            }
            labelMap[id]++
          })
        })
      })
      for (let labelId in labelMap) {
        this.labelData.datasets[0].data.push(labelMap[labelId]) //the count for the label id
        const fullLabel = this.board.labels.find(l => l.id === labelId)
        this.labelData.labels.push(fullLabel.title)
        this.labelData.datasets[0].backgroundColor.push(fullLabel.color)
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
