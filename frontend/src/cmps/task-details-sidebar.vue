<template>
  <nav class="td-side-bar">
    <h4>Suggested</h4>
    <div class="suggested btn-group">
      <button>
        <div class="icon-sm i-members"></div>
        <span>Join</span>
      </button>
    </div>
    <h4>Add to card</h4>
    <ul class="btn-group clean-list">
      <li class="sidebar-btn-container">
        <button @click="editingMembers = true">
          <div class="icon-sm i-members"></div>
          <span>Members</span>
        </button>
          
        <members-edit-modal
          v-if="editingMembers"
          @close="closeEditMembers"
          @update-members="updateMembers"
          :taskMemberIds="task.memberIds"
        />
      </li>
      <li class="sidebar-btn-container">
        <button @click="editingLabels = true">
          <div class="icon-sm i-labels"></div>
          <span>Labels</span>
        </button>
        <label-edit-modal
          v-if="editingLabels"
          @close="closeEditLabels"
          @toggleLabel="toggleLabel"
          @save-label="saveLabel"
        />
      </li>
      <button>
        <div class="icon-sm i-checklist"></div>
        <span>Checklist</span>
      </button>
      <button>
        <div class="icon-div flex flex-center">
          <img class="btn-icon" src="../assets/clock.svg" alt="dates" />
        </div>
        <span>Dates</span>
      </button>
      <button>
        <div class="icon-sm i-attachment"></div>
        <span>Attachment</span>
      </button>
      <button>
        <div class="icon-sm i-cover"></div>
        <span>Cover</span>
      </button>
    </ul>
    <h4>Actions</h4>
    <div class="btn-group">
      <button>
        <div class="icon-sm i-move"></div>
        <span>Move</span>
      </button>
      <button>
        <div class="icon-sm i-copy"></div>
        <span>Copy</span>
      </button>
      <button @click="archTask">
        <div class="icon-sm i-archive"></div>
        <span>Archive</span>
      </button>
    </div>
  </nav>
</template>
<script>
import labelEditModal from './label-edit-modal.vue'
import membersEditModal from './members-edit-modal.vue'
export default {
  name: 'task-side-bar',
  props: { task: Object },
  data() {
    return {
      editingLabels: false,
      editingMembers: false,
    }
  },
  created() {},
  methods: {
    archTask() {
      this.$emit('arch-task')
    },
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
  },
  computed: {},
  unmounted() {},
  components: { labelEditModal, membersEditModal },
}
</script>
