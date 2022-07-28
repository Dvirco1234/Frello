<template>
  <DoughnutChart class="doughnut-chart" :chartData="labelData" />
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
      labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
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
    this.labelData.labels = this.board.labels.map(l => l.title)
    this.labelData.datasets[0].backgroundColor = this.board.labels.map(
      l => l.color
    )
    this.labelData.datasets[0].data = this.fillData()
  },
  methods: {
    fillData() {
      const labelMap = {}
      if(!this.board.groups)return
      this.board.groups.forEach(g => {
        if(!g.tasks) return
        g.tasks.forEach(t => {
            if(!t.labelIds) return
          t.labelIds.forEach(id => {
            if (!labelMap[id]) {
              labelMap[id] = 0
            }
            labelMap[id]++
          })
        })
      })
    
    //   const data = []
    //   for (let label in labelMap) {
    //     data.push(labelMap[label])
    //   }
    },

    //     const dataMap = {}
    //     toys.forEach(toy => {
    //         toy.labels.forEach(label => {
    //             if (!dataMap[label]) {
    //                 dataMap[label] = {}
    //                 dataMap[label].count = 0
    //                 dataMap[label].sum = 0
    //             }
    //             dataMap[label].count++
    //             dataMap[label].sum += toy.price
    //         })
    //     })
    //     return dataMap;
  },
  computed: {
    board() {
      return this.$store.getters.board
    },
  },
})
</script>
