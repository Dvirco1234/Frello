<template>
  <div class="screen show"></div>
  <section class="task-details grid" v-click-outside="closeEdit">
    <button class="round-btn close-btn" @click="closeEdit">
      <img src="../assets/xmark-solid.svg" />
    </button>

    <main class="td-main-container flex flex-col gap-2">
      <section class="td-section">
        <header>
          <div class="icon-lg i-title"></div>
          <article class="title-container flex">
            <h2 contenteditable="true" spellcheck="false" @blur="saveTitle">
              {{ taskData.task.title }}
            </h2>
          </article>
        </header>
        <div>
          <p class="task-group">in list {{ taskData.group.title }}</p>
        </div>
      </section>

      <section class="td-section">
        <task-members-labels
          :task="taskData.task"
          @toggle-label="toggleLabel"
          @save-label="saveLabel"
          @toggle-member="toggleMember"
        />
      </section>

      <section class="td-section">
        <task-description
          :description="taskData.task?.description"
          @save-desc="saveDesc"
        />
      </section>

      <section class="td-section">
        <task-activities />
      </section>
    </main>
    <side-bar
      @arch-task="archTask"
      :task="taskData.task"
      @toggle-label="toggleLabel"
      @save-label="saveLabel"
      @toggle-member="toggleMember"
    />
  </section>
</template>
<script>
import taskMembersLabels from '../cmps/task-members-labels.vue'
import sideBar from '../cmps/task-details-sidebar.vue'
import taskDescription from '../cmps/task-details-desc.vue'
import taskActivities from '../cmps/task-details-act.vue'
import { utilService } from '../services/util-service'
export default {
  name: 'group-details',
  components: { sideBar, taskMembersLabels, taskDescription, taskActivities },
  data() {
    return {
      // taskToEdit: null,
    }
  },
  created() {
    const { taskId } = this.$route.params
    const { groupId } = this.$route.params
    // this.$store.commit({ type: 'setCurrTask', groupId, taskId })
    // this.taskToEdit = JSON.parse(
    //   JSON.stringify(this.$store.getters.currTaskData.task)
    // )
  },
  methods: {
    //title
    saveTitle(e) {
      const title = e.target.innerText
      this.$store.dispatch({
        type: 'setState',
        action: 'editTaskTitle',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        title,
      })
    },
    closeEdit() {
      this.$router.go(-1)
    },

    archTask() {
      this.$store.dispatch({
        type: 'setState',
        action: 'archiveTask',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
      })
      this.$router.go(-1)
    },
    //desc
    saveDesc(description) {
      this.$store.dispatch({
        type: 'setState',
        action: 'saveTaskDescription',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        description,
      })
    },

    //labels
    saveLabel(label) {
      this.$store.dispatch({
        type: 'setState',
        action: 'saveLabel',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        label,
      })
    },

    toggleLabel(labelId) {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleLabel',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        labelId,
      })
    },

    //members
    toggleMember(memberId) {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleMember',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        memberId,
      })
    },
  },
  computed: {
    taskData() {
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.commit({ type: 'setCurrTask', taskId, groupId })
      return this.$store.getters.currTaskData
    },
  },
}
</script>
