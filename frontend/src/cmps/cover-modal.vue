<template>
  <section class="cover-modal sidebar-modal" v-click-outside="closeCoverModal">
    <header class="flex justify-center">
      <p>Cover</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeCoverModal"
      />
    </header>
    <main>
      <h4>Colors</h4>
      <ul class="cover-color-list clean-list grid">
        <li v-for="color in colors" :key="color">
          <div
            class="cover-color"
            @click="setCover(color)"
            :style="{ backgroundColor: color }"
          ></div>
        </li>
      </ul>
      <button @click="setCover('reset')">Reset</button>
    </main>
  </section>
</template>
<script> 
export default {
  name: 'cover-modal',
  // props: {type: Object},
  data() {
    return {
      colors: [
        '#7BC86C',
        '#F5DD2A',
        '#FAAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#EFEFEF',
        '#6DECA9',
        '#F78DD4',
        '#16243D',
      ],
    }
  },
  created() {},
  methods: {
    closeCoverModal() {
      this.$emit('close-cover-modal')
    },
    setCover(color) {
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'setCover',
        groupId,
        taskId,
        color,
      })
      this.closeCoverModal()
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
