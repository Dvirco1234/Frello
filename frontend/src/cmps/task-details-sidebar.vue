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
        <button @click="editingMembers = true" class="sidebar-btn">
          <div class="icon-sm i-members"></div>
          <span>Members</span>
        </button>

        <members-edit-modal
          v-if="editingMembers"
          @close="closeEditMembers"
          @toggle-member="toggleMember"
          :taskMemberIds="task.memberIds"
        />
      </li>
      <li class="sidebar-btn-container">
        <button class="sidebar-btn" @click="editingLabels = true">
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
      <li class="sidebar-btn-container">
        <button @click="todoModalOpen = true" class="sidebar-btn">
          <div class="icon-sm i-checklist"></div>
          <span>Checklist</span>
        </button>
        <todo-modal
          v-if="todoModalOpen"
          @close-todo-modal="todoModalOpen = false"
        />
      </li>
      <li class="sidebar-btn-container">
        <button @click="dateModalOpen = true" class="sidebar-btn">
          <div class="icon-div flex">
            <img class="btn-icon" src="../assets/clock.svg" alt="dates" />
          </div>
          <span>Dates</span>
        </button>
        <date-modal
          v-if="dateModalOpen"
          @close-date-modal="dateModalOpen = false"
        />
      </li>
      <!-- <button class="sidebar-btn">
        <div class="icon-sm i-attachment"></div>
        <span>Attachment</span>
      </button> -->
      <li class="sidebar-btn-container">
        <button class="sidebar-btn" @click="coverModalOpen = true">
          <div class="icon-sm i-cover"></div>
          <span>Cover</span>
        </button>
        <cover-modal
          v-if="coverModalOpen"
          @close-cover-modal="coverModalOpen = false"
        />
      </li>
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
import todoModal from './todo-modal.vue'
import dateModal from './date-modal.vue'
import coverModal from './cover-modal.vue'
export default {
  name: 'task-side-bar',
  props: { task: Object },
  data() {
    return {
      editingLabels: false,
      editingMembers: false,
      todoModalOpen: false,
      dateModalOpen: false,
      coverModalOpen: false,
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
    toggleMember(memberId) {
      this.$emit('toggle-member', memberId)
    },
  },
  computed: {},
  unmounted() {},
  components: {
    labelEditModal,
    membersEditModal,
    todoModal,
    dateModal,
    coverModal,
  },
}
</script>
