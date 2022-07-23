<template>
  <aside class="label-modal flex flex-col" v-click-outside="closeEditLabels">
    <header class="flex justify-center">
      <p>Labels</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeEditLabels"
      />
    </header>
    <input
      class="modal-input"
      type="text"
      placeholder="Search labels"
      v-focus
    />
    <ul class="label-list clean-list">
      <h4>Labels</h4>
      <li
        v-for="label in boardLabels"
        :key="label.id"
        class="label-modal-item flex"
      >
        <button :style="{ backgroundColor: label.color }" class="task-label">
          {{ label.title }}
        </button>
        <button class="label-edit-btn flex align-center justify-center">
          <img src="../assets/edit.svg" alt="edit" />
        </button>
      </li>
    </ul>
    <button class="new-label-btn">Create new label</button>
  </aside>
</template>
<script>
export default {
  name: 'label-edit-modal',
  props: { type: Object },
  data() {
    return {}
  },
  created() {},
  methods: {
    closeEditLabels() {
      this.$emit('close')
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.boardLabels
    },
  },
  unmounted() {},
  components: {},
}
</script>
