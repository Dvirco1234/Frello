<template>
  <section class="task-details grid" v-click-outside="closeEdit">
    <button class="round-btn close-btn" @click="closeEdit">
      <img src="../assets/xmark-solid.svg" />
    </button>

    <main class="td-main-container flex flex-col gap-2">
      <section class="td-section">
        <header>
          <img class="td-icon" src="../assets/book.svg" alt="description" />
          <article class>
            <h2>{{ task.title }}</h2>
          </article>
        </header>
        <div>
          <p class="task-group">in list: {{ group.title }}</p>
        </div>
      </section>

      <section class="td-section">
        <task-members-labels
          :task="task"
          @toggle-label="toggleLabel"
          @save-label="saveLabel"
        />
      </section>

      <section class="td-section">
        <description :description="task?.description" @save-desc="saveDesc" />
      </section>

      <section class="td-section">
        <activity />
      </section>
    </main>
    <side-bar
      @arch-task="archTask"
      :task="task"
      @toggle-label="toggleLabel"
      @save-label="saveLabel"
    />
  </section>
</template>
<script>
import taskMembersLabels from './task-members-labels.vue'
import sideBar from './task-details-sidebar.vue'
import description from './task-details-desc.vue'
import activity from './task-details-act.vue'
import { utilService } from '../services/util-service'
export default {
  name: '',
  props: {
    task: Object,
    group: Object,
  },
  components: { sideBar, taskMembersLabels, description, activity },
  data() {
    return {
      taskToEdit: { ...this.task },
    }
  },
  created() {},
  methods: {
    closeEdit() {
      this.$emit('closeEdit')
    },
    archTask() {
      this.$store.dispatch({
        type: 'task',
        action: 'remove',
        groupId: this.group.id,
        task: this.taskToEdit,
      })
    },
    saveDesc(txt) {
      this.taskToEdit.description = txt
      this.$store.dispatch({
        type: 'task',
        action: 'save',
        groupId: this.group.id,
        task: this.taskToEdit,
      })
    },
    saveLabel(label) {
      //boardwide
      const board = JSON.parse(JSON.stringify(this.$store.getters.board))
      if (label.id) {
        const idx = board.labels.findIndex(l => l.id === label.id)
        board.labels.splice(idx, 1, label)
      } else {
        if (this.taskToEdit.labelIds.length >= 4) return
        label.id = utilService.makeId()
        board.labels.push(label)
        const group = board.groups.find(g => g.id === this.group.id)
        const task = group.tasks.find(t => t.id === this.task.id)
        task.labelIds.push(label.id)
      }
      this.$store.dispatch({
        type: 'board',
        action: 'save',
        board,
      })
    },
    toggleLabel(labelId) {
      const idx = this.task.labelIds.findIndex(id => id === labelId)
      if (idx !== -1) this.taskToEdit.labelIds.splice(idx, 1)
      else if (this.taskToEdit.labelIds.length < 4)
        this.taskToEdit.labelIds.push(labelId)
      this.$store.dispatch({
        type: 'task',
        action: 'save',
        groupId: this.group.id,
        task: this.taskToEdit,
      })
    },
  },
}
</script>
