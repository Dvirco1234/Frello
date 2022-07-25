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
          <p class="task-group">
            in list <span>{{ taskData.group.title }}</span>
          </p>
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

      <section class="td-section" v-if="dueDate">
        <div>
          <article class="due-date">
            <h4>Due date</h4>
            <button class="flex align-center" @click="dateModalOpen = true">
              {{ dueDate }}
              <span class="due-date-txt" :class="{ overdue: overDueTxt == 'Over due' }">{{
                overDueTxt
              }}</span>
            </button>
            <date-modal
              v-if="dateModalOpen"
              @close-date-modal="dateModalOpen = false"
            />
          </article>
        </div>
      </section>

      <section class="td-section">
        <task-description
          :description="taskData.task?.description"
          @save-desc="saveDesc"
        />
      </section>

      <section v-if="taskData.task?.todoLists?.length">
        <todo-lists :todoLists="taskData.task.todoLists" />
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
import todoLists from '../cmps/todo-lists.vue'
import dateModal from '../cmps/date-modal.vue'
export default {
  name: 'group-details',
  components: {
    sideBar,
    taskMembersLabels,
    taskDescription,
    taskActivities,
    todoLists,
    dateModal,
  },
  data() {
    return {
      dateModalOpen: false,
    }
  },
  created() {},
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
    dueDate() {
      const timestamp = this.taskData.task.dueDate
      if (!timestamp) return
      const date = new Date(timestamp)
      const hours = '' + date.getHours()
      const minutes = '' + date.getMinutes()
      return (
        date.toLocaleDateString('he') +
        ' at ' +
        hours.padStart(2, '0') +
        ':' +
        minutes.padStart(2, '0')
      )
    },
    overDueTxt() {
      const timestamp = this.taskData.task.dueDate
      if (timestamp < Date.now()) return 'Over due'
      return 'On schedule'
    },
  },
}
</script>
