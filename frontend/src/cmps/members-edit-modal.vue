<template>
  <aside class="members-modal flex flex-col" v-click-outside="closeEditMembers">
    <header class="flex justify-center">
      <p>Members</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeEditMembers"
      />
    </header>
    <input
      class="modal-input"
      type="text"
      placeholder="Search members"
      v-focus
    />
    <ul class="member-edit-list clean-list">
      <h4>Board members</h4>
      <li
        v-for="member in boardMembers"
        :key="member._id"
        class="members-modal-item"
      >
        <button
          class="task-member flex align-center space-between"
          @click="toggleMember(member._id)"
        >
          <div class="flex align-center">
            <img
              class="memberImg"
              :src="member.imgUrl"
              :alt="member.fullname"
            />
            <span>{{ member.fullname }}</span>
          </div>
          <span v-if="taskMemberIds?.includes(member._id)">v</span>
        </button>
      </li>
    </ul>
  </aside>
</template>
<script>
export default {
  name: 'member-edit-modal',
  props: { taskMemberIds: Array },
  data() {
    return {
      membersToEdit: JSON.parse(JSON.stringify(this.taskMemberIds)),
    }
  },
  created() {},
  methods: {
    closeEditMembers() {
      this.$emit('close')
    },
    toggleMember(memberId) {
      if (this.membersToEdit?.includes(memberId)) {
        const idx = this.membersToEdit.findIndex(m => m._id === memberId)
        this.membersToEdit.splice(idx, 1)
      } else this.membersToEdit.push(memberId)
      this.$emit('update-members', this.membersToEdit)
    },
  },
  computed: {
    boardMembers() {
      return this.$store.getters.boardMembers
    },
  },
  unmounted() {},
  components: {},
}
</script>
