<template>
  <aside class="members-modal sidebar-modal flex flex-col" v-click-outside="closeEditMembers">
    <header class="flex justify-center">
      <p>Members</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click="closeEditMembers"
      />
    </header>
    <input
      class="modal-input"
      type="text"
      placeholder="Search members"
      v-model="filterString"
      v-focus
    />
    <ul class="member-edit-list clean-list">
      <h4>Board members</h4>
      <li
        v-for="member in filteredMembers"
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
            <span>{{ member.fullname }} ({{member.username}})</span>
          </div>
          <span v-if="taskMemberIds?.includes(member._id)"  class="is-on-task flex flex-center">
          <div class="icon-sm i-check"></div>
            <!-- <img class="td-plus" src="../assets/done.svg" alt="is-on-task" /> -->
          </span>
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
      filterString: '',
    }
  },
  created() {},
  methods: {
    closeEditMembers() {
      this.$emit('close')
    },
    toggleMember(memberId) {
      // console.log(memberId)
      // if (this.membersToEdit?.includes(memberId)) {
      //   const idx = this.membersToEdit.findIndex(id => id === memberId)
      //   this.membersToEdit.splice(idx, 1)
      // } else this.membersToEdit.push(memberId)
      // console.log(this.membersToEdit)
      this.$emit('toggle-member', memberId)
    },
  },
  computed: {
    boardMembers() {
      return this.$store.getters.boardMembers
    },
    filteredMembers() {
      const regex = new RegExp(this.filterString, 'i')
      return this.boardMembers.filter(m => regex.test(m.fullname))
    },
  },
  unmounted() {},
  components: {},
}
</script>
