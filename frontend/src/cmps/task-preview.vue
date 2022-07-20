<template>
  <article class="task-preview" @click="isEdited = true">
    <div class="edit-btn flex flex-center"><span>🖊</span></div>
    <div v-if="task.labelIds" class="task-labels flex">
      <div
        v-for="label in getLabels"
        class="label"
        :style="{ backgroundColor: label.color }"
        @click.stop="LabelText"
      ></div>
    </div>
    <p>{{ task.title }}</p>
    <div v-if="task.memberIds" class="membersImgs flex">
      <span v-for="member in getMembers">
        <img :src="member.imgUrl" />
      </span>
    </div>

    <task-details
      v-show="isEdited"
      :task="task"
      :group="group"
      :boardMembers="boardMembers"
      :boardLabels="boardLabels"
    />
  </article>
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
  created() {},
  methods: {
    labelText() {
      this.$emit('labelText')
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
  unmounted() {},
  components: { taskDetails },
}
</script>
<style>
.task-preview {
  background-color: white;
  padding: 6px 8px;
  margin-bottom: 8px;
  box-shadow: 0 1px 0 #091e4240;
  position: relative;
  color: #172b4d;
}

.task-preview:hover {
  background-color: #f4f5f7;
  cursor: pointer;
}

.edit-btn {
  position: absolute;
  right: 0.1em;
  top: 0.1em;
  width: 2em;
  height: 2em;
  border-radius: 3px;
  text-align: center;
  opacity: 0;
}

.edit-btn:hover {
  background-color: #ececf0;
}

.task-preview:hover .edit-btn {
  opacity: 1;
}

.label {
  display: inline-block;
  width: 40px;
  height: 0.57em;
  /* height: 100%; */
  margin-inline-end: 0.2em;
  border-radius: 10px;
}

.membersImgs {
  justify-content: flex-end;
  /* margin-inline-end: 8px; */
}

.membersImgs span {
  margin-inline-start: 0.4em;
}

.membersImgs img {
  border-radius: 50%;
  width: 2em;
  height: 2em;
}
</style>
