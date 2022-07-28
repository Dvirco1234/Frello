<template>
  <nav class="td-side-bar">
    <h4>Suggested</h4>
    <div class="suggested btn-group">
      <button @click="toggleJoinToTask">
        <div class="icon-sm i-members"></div>
        <span>{{ joinTxt }}</span>
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
          <div class="icon-sm i-clock"></div>
          <span>Dates</span>
        </button>
        <date-modal
          v-if="dateModalOpen"
          @close-date-modal="dateModalOpen = false"
        />
      </li>
      <li class="sidebar-btn-container">
        <button @click="attachModalOpen = true" class="sidebar-btn">
          <div class="icon-sm i-attachment"></div>
          <span>Attachment</span>
        </button>
        <attach-modal
          v-if="attachModalOpen"
          @close-attach-modal="attachModalOpen = false"
        />
      </li>
      <li class="sidebar-btn-container">
        <button class="sidebar-btn" @click="coverModalOpen = true">
          <div class="icon-sm i-cover"></div>
          <span>Cover</span>
        </button>
        <cover-modal
          v-if="coverModalOpen"
          @close-cover-modal="coverModalOpen = false"
          @set-cover="setCover"
        />
      </li>
    </ul>
    <h4>Actions</h4>
    <ul class="btn-group clean-list">
      <li class="sidebar-btn-container">
        <button class="sidebar-btn" @click="watchTask">
          <div class="icon-sm i-eye"></div>
          <span>{{ watchTxt }}</span>
        </button>
      </li>
      <li class="sidebar-btn-container">
        <button class="sidebar-btn" @click="moveTaskModalOpen = true">
          <div class="icon-sm i-move"></div>
          <span>Move</span>
        </button>
        <move-task-modal
          v-if="moveTaskModalOpen"
          @close-move-task-modal="moveTaskModalOpen = false"
        />
      </li>
      <li class="sidebar-btn-container">
        <button @click="archTask" class="sidebar-btn">
          <div class="icon-sm i-archive"></div>
          <span>Archive</span>
        </button>
      </li>
    </ul>
  </nav>
</template>
<script>
import labelEditModal from './label-edit-modal.vue'
import membersEditModal from './members-edit-modal.vue'
import todoModal from './todo-modal.vue'
import dateModal from './date-modal.vue'
import coverModal from './cover-modal.vue'
import moveTaskModal from './move-task-modal.vue'
import attachModal from './attach-modal.vue'
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
      moveTaskModalOpen: false,
      attachModalOpen: false,
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
    toggleJoinToTask() {
      this.$emit('toggle-join')
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
    watchTask() {
      this.$emit('toggle-watch')
    },
    setCover(cover) {
      this.$emit('set-cover',cover)
    },
  },
  computed: {
    watchTxt() {
      if (this.task.isWatched) return 'Unwatch'
      return 'Watch'
    },
    joinTxt() {
      const loggedInUser = this.$store.getters.loggedinUser
      if (this.task.memberIds.includes(loggedInUser._id)) return 'Leave'
      return 'Join'
    },
  },
  unmounted() {},
  components: {
    labelEditModal,
    membersEditModal,
    todoModal,
    dateModal,
    coverModal,
    moveTaskModal,
    attachModal,
  },
}
</script>
