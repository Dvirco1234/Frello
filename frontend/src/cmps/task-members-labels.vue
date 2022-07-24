<template>
  <section>
    <article class="members-labels-data flex align-center">
      <div v-if="taskMembers.length" class="members-container">
        <h4>Members</h4>
        <div class="membersImgs flex align-center">
          <span v-for="member in taskMembers" :key="member._id" class="flex align-center">
            <img class="memberImg" :src="member.imgUrl"  />
          </span>
          <button class="round-btn" @click="editingMembers = true">
            <img class="td-plus" src="../assets/plus.svg" alt="add"/>
          </button>
          <members-edit-modal
            v-if="editingMembers"
            @close="closeEditMembers"
            :taskMemberIds="task.memberIds"
            @toggle-member="toggleMember"
          />
        </div>
      </div>
      <div v-if="taskLabels.length" class="labels">
        <h4>Labels</h4>
        <div class="label-container flex">
          <button
            v-for="label in taskLabels"
            :key="label.id"
            class="task-label"
            :style="{ backgroundColor: label.color }"
            @click="editingLabels = true"
          >
            {{ label.title }}
          </button>
          <button class="add-label flex flex-center" @click="editingLabels = true">
            <img class="td-plus" src="../assets/plus.svg" alt="add" />
          </button>
          <label-edit-modal
            v-if="editingLabels"
            @close="closeEditLabels"
            @toggle-label="toggleLabel"
            @save-label="saveLabel"
          />
        </div>
      </div>
    </article>
  </section>
</template>
<script>
import labelEditModal from './label-edit-modal.vue'
import membersEditModal from './members-edit-modal.vue'
export default {
  name: 'task-members-labels',
  props: { task: Object },
  data() {
    return {
      editingLabels: false,
      labelToEdit: { title: '', color: null },
      editingMembers: false,
    }
  },
  created() {},
  methods: {
    closeEditLabels() {
      this.editingLabels = false
    },
    closeEditMembers() {
      this.editingMembers = false
    },
    toggleLabel(labelId) {
      this.$emit('toggle-label', labelId)
    },
    saveLabel(label) {
      this.$emit('save-label', label)
    },
    updateMembers(memberIds) {
      this.$emit('update-members', memberIds)
    },
    toggleMember(memberId){
      this.$emit('toggle-member',memberId)
    }
  },
  computed: {
    boardMembers() {
      return this.$store.getters.boardMembers
    },
    boardLabels() {
      return this.$store.getters.boardLabels
    },
    taskMembers() {
      if (this.task.memberIds) {
        return this.boardMembers.filter(member =>
          this.task.memberIds.includes(member._id)
        )
      }
    },
    taskLabels() {
      if (this.task.labelIds) {
        const labels = this.boardLabels.filter(label =>
          this.task.labelIds.includes(label.id)
        )
        return labels
      }
    },
  },
  unmounted() {},
  components: { labelEditModal, membersEditModal },
}
</script>
