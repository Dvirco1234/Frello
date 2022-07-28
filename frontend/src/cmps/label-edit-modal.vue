<template>
  <section
    class="label-modal sidebar-modal flex flex-col"
    v-click-outside="closeEditLabels"
  >
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
      v-if="!editingLabel"
      class="modal-input"
      type="text"
      placeholder="Search labels..."
      v-model="filterString"
      v-focus
    />
    <input
      v-else
      placeholder="Enter label title..."
      class="modal-input"
      v-model="labelToEdit.title"
      type="text"
      v-focus
    />
    <main v-if="!editingLabel">
      <div class="label-list clean-list">
        <h4>Labels</h4>
        <span
          v-for="label in filteredLabels"
          :key="label.id"
          class="label-modal-item flex"
        >
          <button
            :style="{ backgroundColor: label.color }"
            class="task-label flex"
            @click.stop="toggleLabel(label.id)"
          >
            <p>{{ label.title }}</p>
            <span v-if="taskLabelIds.includes(label.id)" class="icon-sm i-check"></span>
          </button>
          <button
            class="label-edit-btn flex align-center justify-center"
            @click.stop="setEditedLabel(label)"
          >
            <img src="../assets/edit.svg" alt="edit" />
          </button>
        </span>
      </div>
      <button class="new-label-btn flex justify-center" @click.stop="newLabel">
        Create new label
      </button>
    </main>

    <main v-else>
      <ul class="label-list clean-list">
        <h4>Select a color</h4>
        <li
          v-for="color in labelColors"
          :key="color"
          class="label-modal-item flex"
        >
          <button
            :style="{ backgroundColor: color }"
            class="task-label"
            @click="setColor(color)"
          ></button>
        </li>
      </ul>
      <div class="flex space-between">
        <button @click="saveLabel" class="save-label-btn">Save</button>
        <button @click="editingLabel = false">Cancel</button>
      </div>
    </main>
  </section>
</template>
<script>
export default {
  name: 'label-edit-modal',
  props: { taskLabelIds: Array },
  data() {
    return {
      editingLabel: false,
      labelToEdit: null,
      filterString: '',
    }
  },
  created() {},
  methods: {
    closeEditLabels() {
      this.editingLabel = false
      this.$emit('close')
    },
    toggleLabel(labelId) {
      this.$emit('toggle-label', labelId)
    },
    setColor(color) {
      this.labelToEdit.color = color
    },
    saveLabel() {
      this.$emit('save-label', this.labelToEdit)
      this.editingLabel = false
    },
    setEditedLabel(label) {
      this.editingLabel = true
      this.labelToEdit = JSON.parse(JSON.stringify(label))
    },
    newLabel() {
      this.labelToEdit = { title: '', color: '#1B6AA7' }
      this.editingLabel = true
    },
  },
  computed: {
    boardLabels() {
      return this.$store.getters.boardLabels
    },
    labelColors() {
      const colors = []
      this.boardLabels.forEach(label => {
        const color = label.color
        if (!colors.includes(color)) colors.push(color)
      })
      return colors
    },
    filteredLabels() {
      const regex = new RegExp(this.filterString, 'i')
      return this.boardLabels.filter(label => regex.test(label.title))
    },
  },
  unmounted() {},
  components: {},
}
</script>
