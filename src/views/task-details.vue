<template>
  <div class="screen" v-if="taskData.task">
    <section class="task-details grid" v-click-outside="closeEdit">
      <button class="round-btn close-btn" @click="closeEdit">
        <div class="icon-lg i-close"></div>
      </button>
      <div
        v-if="taskData.task.cover"
        class="cover-container"
        :style="background"
      >
        <button class="cover-btn" @click="coverModalOpen = true">Cover</button>
        <cover-modal
          v-if="coverModalOpen"
          @close-cover-modal="coverModalOpen = false"
          @set-cover="setCover"
        />
      </div>
      <main
        class="td-main-container flex flex-col"
        :class="{ unpadded: taskData.task.cover }"
      >
        <section class="td-section">
          <header>
            <div class="icon-lg i-title"></div>
            <article class="title-container flex">
              <h2 contenteditable="true" spellcheck="false" @blur="saveTitle">
                {{ taskData.task?.title }}
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
                <span
                  class="due-date-txt"
                  :class="{
                    overdue: overDueTxt === 'over due',
                    today: overDueTxt == 'today',
                  }"
                  >{{ overDueTxt }}</span
                >
              </button>
              <date-modal
                v-if="dateModalOpen"
                @close-date-modal="dateModalOpen = false"
              />
            </article>
          </div>
        </section>

        <section class="td-section td-description">
          <task-description
            :description="taskData.task?.description"
            @save-desc="saveDesc"
          />
        </section>

        <section class="td-section" v-if="taskData.task?.attachments?.length">
          <attachments :attachments="taskData.task?.attachments" />
        </section>

        <section v-if="taskData.task?.todoLists?.length">
          <todo-lists
            :todoLists="taskData.task.todoLists"
            @add-todo="addTodo"
            @deleteList="deleteList"
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
        @toggle-watch="toggleWatchTask"
        @toggle-join="toggleJoinToTask"
        @set-cover="setCover"
      />
    </section>
  </div>
</template>
<script>
import taskMembersLabels from '../cmps/task-members-labels.vue'
import sideBar from '../cmps/task-details-sidebar.vue'
import taskDescription from '../cmps/task-details-desc.vue'
import taskActivities from '../cmps/task-details-act.vue'
import todoLists from '../cmps/todo-lists.vue'
import dateModal from '../cmps/date-modal.vue'
import coverModal from '../cmps/cover-modal.vue'
import attachments from '../cmps/task-details-attachments.vue'
export default {
  name: 'group-details',
  components: {
    sideBar,
    taskMembersLabels,
    taskDescription,
    taskActivities,
    todoLists,
    dateModal,
    coverModal,
    attachments,
  },
  data() {
    return {
      dateModalOpen: false,
      coverModalOpen: false,
      urlGroupId: null,
      urlTaskId: null,
    }
  },
  created() {
    const { groupId, taskId } = this.$route.params
    this.urlGroupId = groupId
    this.urlTaskId = taskId
    this.$store.commit({
      type: 'setCurrTask',
      taskId: this.urlTaskId,
      groupId: this.urlGroupId,
    })
  },
  methods: {
    //title
    saveTitle(e) {
      const activity = {
        txt: 'edited the card title',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

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
      const boardId = this.$route.params.id
      this.$router.push(`/board/${boardId}`)
    },
    setCover(cover) {
      const activity = {
        txt: 'edited updated the card cover',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'setCover',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
        cover,
      })
    },
    archTask() {
      const activity = {
        txt: 'archived a card',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'archiveTask',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
      })
      this.$router.go(-1)
    },
    toggleWatchTask() {
      this.$store.dispatch({
        type: 'setState',
        action: 'toggleWatchTask',
        groupId: this.taskData.group.id,
        taskId: this.taskData.task.id,
      })
    },
    //desc
    saveDesc(description) {
      const activity = {
        txt: 'edited the card description',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })
      this.$store.dispatch({
        type: 'setState',
        action: 'saveTaskDescription',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        description,
      })
    },

    //labels
    saveLabel(label) {
      const activity = {
        txt: 'saved a new label',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.dispatch({ type: 'newActivity', activity })
      this.$store.dispatch({
        type: 'setState',
        action: 'saveLabel',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        label,
        activity,
      })
    },

    toggleLabel(labelId) {
      const activity = {
        txt: 'edited the card labels',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'toggleLabel',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        labelId,
        activity,
      })
    },

    //members
    toggleMember(memberId) {
      const activity = {
        txt: 'edited the card members',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'toggleMember',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        memberId,
      })
    },
    toggleJoinToTask() {
      const loggedUser = this.$store.getters.loggedinUser
      const activity = {
        txt: '',
        createdAt: Date.now(),
        byMember: loggedUser,
        task: this.taskData.task,
      }
      activity.txt = this.taskData.task.memberIds.includes(loggedUser._id)
        ? 'left the card'
        : 'joined the card'
      this.$store.commit({ type: 'newActivity', activity })

      this.$store.dispatch({
        type: 'setState',
        action: 'toggleMember',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        memberId: loggedUser._id,
      })
    },

    addTodo(listId, titleTxt) {
      const activity = {
        txt: 'added a new todo task',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })
      this.$store.dispatch({
        type: 'setState',
        action: 'addTodo',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        listId,
        title: titleTxt,
      })
    },
    deleteList(listId) {
      const activity = {
        txt: 'deleted a todo list',
        createdAt: Date.now(),
        byMember: this.$store.getters.loggedinUser,
        task: this.taskData.task,
      }
      this.$store.commit({ type: 'newActivity', activity })
      this.$store.dispatch({
        type: 'setState',
        action: 'deleteTodoList',
        groupId: this.urlGroupId,
        taskId: this.urlTaskId,
        listId,
      })
    },
  },
  computed: {
    taskData() {
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
      const SECS_IN_24H = 86400
      const secsPassed = (Date.now() - this.taskData.task.dueDate) / 1000
      if (Math.abs(secsPassed) < SECS_IN_24H) return 'today'
      if (secsPassed > 0) return 'over due'
      return 'on schedule'
    },
    background() {
      const cover = this.taskData.task.cover
      if (cover.length > 10) {
        return `background-image: url('${cover}')`
      } else {
        return `background-color: ${cover}`
      }
    },
  },
  watch: {
    '$route.params': {
      handler() {
        const { groupId, taskId } = this.$route.params
        if (!taskId) return //closed
        this.$store.commit({
          type: 'setCurrTask',
          taskId,
          groupId,
        })
        this.urlGroupId = groupId
        this.urlTaskId = taskId
      },
      immediate: true,
    },
  },
}
</script>
