<template>
  <nav class="td-side-bar">
    <h4>Suggested</h4>
    <div class="suggested btn-group">
      <button>
        <img class="btn-icon" src="../assets/person.svg" alt="members" />
        <span>Join</span>
      </button>
    </div>
    <h4>Add to card</h4>
    <div class="btn-group">
      <button @click="editingMembers = true">
        <img class="btn-icon" src="../assets/person.svg" alt="members" />
        <span>Members</span>
        <members-edit-modal
          v-if="editingMembers"
          @close="closeEditMembers"
          :taskMembers="task.members"
        />
      </button>
      <button @click="editingLabels = true">
        <img class="btn-icon labels" src="../assets/label.png" alt="labels" />
        <span>Labels</span>
        <label-edit-modal v-if="editingLabels" @close="closeEditLabels" />
      </button>
      <button>
        <img class="btn-icon" src="../assets/checklist.svg" alt="checklist" />
        <span>Checklist</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/clock.svg" alt="dates" />
        <span>Dates</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/attach.svg" alt="attachment" />
        <span>Attachment</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/cover.svg" alt="cover" />
        <span>Cover</span>
      </button>
    </div>
    <h4>Actions</h4>
    <div class="btn-group">
      <button>
        <img class="btn-icon" src="../assets/arrow-right.svg" alt="move" />
        <span>Move</span>
      </button>
      <button>
        <img class="btn-icon" src="../assets/copy.svg" alt="copy" />
        <span>Copy</span>
      </button>
      <button @click="archTask">
        <img class="btn-icon" src="../assets/archive.svg" alt="archive" />
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
  },
  computed: {},
  unmounted() {},
  components: { labelEditModal, membersEditModal },
}
</script>
