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
          :members="taskMembers || []"
          :labels="taskLabels || []"
        />
      </section>

      <section class="td-section">
        <description :description="task?.description" />
      </section>

      <section class="td-section">
        <activity />
      </section>
    </main>
    <side-bar @arch-task="archTask" />
  </section>
</template>
<script>
import taskMembersLabels from './task-members-labels.vue'
import sideBar from './task-details-sidebar.vue'
import description from './task-details-desc.vue'
import activity from './task-details-act.vue'
export default {
  name: '',
  props: {
    task: Object,
    group: Object,
    boardMembers: Object,
    boardLabels: Object,
  },
  components: { sideBar, taskMembersLabels, description, activity },
  data() {
    return {}
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
        task: this.task,
      })
    },
  },
  computed: {
    taskMembers() {
      if (this.task.memberIds) {
        return this.boardMembers.filter(member =>
          this.task.memberIds.includes(member._id)
        )
      }
    },
    taskLabels() {
      if (this.task.labelIds) {
        const labels = this.boardLabels.filter(label =>
          this.task.labelIds.includes(label.id)
        )
        return labels
      }
    },
  },
}
</script>
