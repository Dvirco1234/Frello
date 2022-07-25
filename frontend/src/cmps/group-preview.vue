<template>
  <article class="group-preview flex flex-col">
    <header class="flex space-between">
      <!-- css - looks like it isnt an input, on focus looks like input -->
      <input
        class="group-title"
        type="text"
        v-model="groupToEdit.title"
        @blur="saveGroup"
      />
      <div class="header-icon-container flex align-center gap-1">
        <div v-if="group.isWatched" class="watched-icon flex flex-center">
          <img src="../assets/eye.svg" alt="watched" />
        </div>
        <div
          class="list-action-btn flex flex-center"
          @click.stop="groupMenuOpen = !groupMenuOpen"
        >
          <span class="flex align center"
            ><img src="../assets/more-horiz.svg"
          /></span>
          <group-menu-modal
            v-if="groupMenuOpen"
            :group="group"
            @close-menu="groupMenuOpen = false"
            @add-card="isNewTaskEdit = true"
          />
        </div>
      </div>
    </header>
    <main ref="container">
      <!-- <div class="task-list" v-for="task in group.tasks" :key="task.id">
                <task-preview :task="task" :group="group" :boardLabels="boardLabels" :boardMembers="boardMembers" />
            </div> -->
      <div class="task-container">
        <Container
          group-name="group"
          orientation="vertical"
          @drop="e => onCardDrop(group.id, e)"
          :get-child-payload="getCardPayload()"
          drag-class="card-ghost"
          drop-class="card-ghost-drop"
          class="card"
          :drop-placeholder="dropPlaceholderOptions"
        >
          <Draggable v-for="task in group.tasks" :key="task.id">
            <task-preview
              :task="task"
              :group="group"
              :boardLabels="boardLabels"
              :boardMembers="boardMembers"
            />
          </Draggable>
        </Container>
      </div>
      <div v-if="isNewTaskEdit" class="add-task">
        <form @submit.prevent="addTask">
          <textarea
            v-focus
            id="add-task"
            v-model="taskToAdd.title"
            placeholder="Enter a title for this card..."
          ></textarea>
          <div class="flex align center">
            <button class="add-card-btn">Add card</button>
            <span
              class="cancel-card-btn flex flex-center"
              @click="toggleAddTask"
            >
              <img src="../assets/xmark-solid.svg"
            /></span>
          </div>
        </form>
      </div>
    </main>
    <footer class="flex">
      <div v-if="!isNewTaskEdit">
        <button class="add-a-card-btn flex align-center" @click="toggleAddTask">
          <span class="flex align-center"
            ><img class="svg" src="../assets/plus.svg"
          /></span>
          <span style="padding: 5px">Add a card</span>
        </button>
      </div>
    </footer>
  </article>
</template>
<script>
import taskPreview from '../cmps/task-preview.vue'
import groupMenuModal from '../cmps/group-menu-modal.vue'
import { boardService } from '../services/board-service'

import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'group-preview',
  // props: { group: Object, taskToAdd: Object },
  props: {
    group: Object,
    boardLabels: Object,
    boardMembers: Object,
    scene: Object,
  },
  data() {
    return {
      groupToEdit: { ...this.group },
      groupMenuOpen: false,
      isNewTaskEdit: false,
      taskToAdd: null,
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  created() {
    this.taskToAdd = boardService.getEmpty('task')
  },
  methods: {
    toggleAddTask() {
      this.isNewTaskEdit = !this.isNewTaskEdit
      if (this.isNewTaskEdit) {
        const el = this.$refs.scrollToMe
        // const el = this.$refs.container
        console.log('el:', el)
        el.scrollTop = el.scrollHeight
        // if (el) el.scrollIntoView({ behavior: 'smooth' })
      }
    },
    addTask() {
      this.$emit('addTask', this.taskToAdd, this.group.id)
      this.taskToAdd = boardService.getEmpty('task')
    },
    saveGroup() {
      if (this.groupToEdit.title !== this.group.title)
        this.$emit('saveGroup', this.groupToEdit)
    },
    getCardPayload() {
      return index => {
        return this.group.tasks[index]
      }
    },
    onCardDrop(groupId, e) {
      this.$emit('onCardDrop', groupId, e)
    },
  },
  components: {
    taskPreview,
    groupMenuModal,
    Container,
    Draggable,
  },
}
</script>
