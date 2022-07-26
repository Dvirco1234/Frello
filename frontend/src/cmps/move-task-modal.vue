<template>
  <section
    class="move-task-modal sidebar-modal"
    v-click-outside="closeMoveModal"
  >
    <header class="flex justify-center">
      <p>Move card</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeMoveModal"
      />
    </header>
    <main>
      <h4>Select destination</h4>
      <div class="select-container flex">
        <div class="dest-select">
          <label>List</label>
          <select class="list-dest">
            <option value="">asdasd</option>
            <option value="">hasdasd</option>
            <option value="">hasdasd</option>
          </select>
        </div>
        <div class="dest-select">
          <label>Position</label>
          <select class="position-dest">
            <option value="">asdasd</option>
            <option value="">hasdasd</option>
            <option value="">hasdasd</option>
          </select>
        </div>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  name: '',
  props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {
    closeMoveModal() {
      this.$emit('close-move-task-modal')
    },
  },
  computed: {
    groups() {
      return this.$store.getters.groups
    },
  },
  unmounted() {},
  components: {},
}
</script>
