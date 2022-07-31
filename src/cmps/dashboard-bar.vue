<template>
  <BarChart :chartData="groupData" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'
import { reduce } from 'lodash'

Chart.register(...registerables)

export default defineComponent({
  name: 'bar-chart',
  components: { BarChart },
  data() {
    return {
      groupData: {
        labels: [],
        datasets: [
          {
            data: [],
            backgroundColor: [
              '#eb5a46',
              '#0079bf',
              '#ff9f1a',
              '#c377e0',
              '#51e898',
              '#ff78cb',
              '#61bd4f',
              '#f2d600',
              '#00c2e0',
              '#344563',
              '#b3bac5',
            ],
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: 'Cards per group',
            font: {
              size: 32,
              weight: 200,
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
          },
          y: {
            grid: {
              display: true,
            },
          },
        },
      },
    }
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
