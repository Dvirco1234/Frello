<template>
  <article class="task-preview" @click="isEdited = true">
    <div class="edit-btn flex flex-center"><span><img src="../assets/edit.svg"/></span></div>
    <div v-if="task.labelIds" class="task-labels flex">
      <div v-for="label in getLabels" class="label" :style="{ backgroundColor: label.color }" @click.stop="LabelText">
      </div>
    </div>
    <p>{{ task.title }}</p>
    <div v-if="task.memberIds" class="membersImgs flex">
      <span v-for="member in getMembers">
        <img :src="member.imgUrl" />
      </span>
    </div>
  </article>
  <task-details v-show="isEdited" @closeEdit="closeEdit" :task="task" :group="group" :boardMembers="boardMembers"
    :boardLabels="boardLabels" />
  <!-- <pre>{{ task }}</pre> -->
</template>
<script>
import taskDetails from './task-details.vue'
export default {
  name: 'task-preview',
  props: {
    task: Object,
    group: Object,
    boardMembers: Object,
    boardLabels: Object,
  },
  data() {
    return {
      labelsIds: null,
      members: null,
      isEdited: false,
    }
  },
  created() { },
  methods: {
    labelText() {
      this.$emit('labelText')
    },
    closeEdit() {
      this.isEdited = false
    },
  },
  computed: {
    showMembers(memberId) {
      const members = this.boardMembers.filter(member => member.id === memberId)
      return members
    },
    getMembers() {
      const members = this.boardMembers.filter(member =>
        this.task.memberIds.includes(member._id)
      )
      return members
    },
    getLabels() {
      const labels = this.boardLabels.filter(label =>
        this.task.labelIds.includes(label.id)
      )
      return labels
    },
  },
  unmounted() { },
  components: { taskDetails },
}
</script>
