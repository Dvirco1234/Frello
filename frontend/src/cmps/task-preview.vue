<template>
  <article class="task-preview" @click="openDetails">
    <div class="edit-btn flex flex-center">
      <span class="flex"><img src="../assets/edit.svg" /></span>
    </div>
    <div v-if="task.labelIds" class="task-labels flex">
      <div v-for="label in getLabels" class="label" :style="{ backgroundColor: label.color }" @click.stop="LabelText"
        :title="label.title"></div>
    </div>
    <p>{{ task.title }}</p>

    <div class="footer flex space-between align-center">
      <div class="badges flex">
        <span v-if="task.description" title="This card has a description." class="icon-sm i-desc"></span>
        <span v-if="task.comments?.length" title="Comments" class="icon-sm i-comment"><span class="number">{{task.comments.length}}</span></span>
        <!-- <span v-if="task.attachments?.length" title="Attachments" class="icon-sm i-attachment"><span class="number">{{task.attachments.length}}</span></span> -->
        <!-- <span v-if="task.checklists?.length" title="Checklist" class="icon-sm i-checklist"><span class="number">{{task.checklists.length}}</span></span> -->
      </div>
      <div class="members">
        <div v-if="task.memberIds?.length" class="membersImgs flex">
        <span v-for="member in getMembers">
          <img :src="member.imgUrl" :title="member.fullname + ' (' + member.username + ')'" />
        </span>
      </div>
      </div>
    </div>

  </article>
</template>
<script>
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
    }
  },
  created() { },
  methods: {
    labelText() {
      this.$emit('labelText')
    },
    openDetails() {
      const boardId = this.$route.params.id
      this.$router.push(boardId + `/${this.group.id}/${this.task.id}`)
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
}
</script>
