<template>
  <LineChart :chartData="activityData" :options="options" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { LineChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

export default defineComponent({
  name: 'line-chart',
  components: { LineChart },
  data() {
    return {
      activityData: {
        labels: [],
        datasets: [
          {
            label: 'Activity',
            data: [],
            backgroundColor: ['#61bd4f', '#f2d600', '#ff9f1a', '#eb5a46', '#c377e0', '#0079bf', '#00c2e0', '#51e898', '#ff78cb', '#344563', '#b3bac5'],
            fontColor: ['white']
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false
          },
            title: {
                display: true,
                text: 'Activities per member',
                font: {
                    size: 32,
                    weight:200
                }
            },
        },
        elements: {
            line: {
                backgroundColor: 'white',
                borderColor: 'gray',
                borderWidth: 2
            }
        },
        scales: {
        x: {
            grid: {
                display: false,
            }
        },
        y: {
            grid: {
                display: true,
            }   
        }
    }
    }
    }
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
