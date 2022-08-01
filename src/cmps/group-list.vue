<template>
  <div class="group-list-con">
    <Container
      v-if="groups && groups.length"
      orientation="horizontal"
      @drop="onColumnDrop($event)"
      @drag-start="dragStart"
      :drop-placeholder="upperDropPlaceholderOptions"
      class="outter"
      :get-child-payload="getParentPayload"
    >
      <Draggable v-for="group in groups" :key="group.id">
        <group-preview
          :key="group.id"
          :group="group"
          :data-group="group.id"
          :class="group.id"
          @addTask="onAddTask"
          @saveGroup="onSaveGroup"
          @onCardDrop="onCardDrop"
          :boardLabels="boardLabels"
          :boardMembers="boardMembers"
        />
      </Draggable>
    </Container>
  </div>
</template>

<script>
import groupPreview from '../cmps/group-preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import { applyDrag } from '../services/dnd-util.service'

export default {
  name: 'group-list',
  props: {
    groups: Array,
    boardLabels: Array,
    boardMembers: Object,
  },
  components: { Container, Draggable, groupPreview },
  data() {
    return {
      upperDropPlaceholderOptions: {
        className: 'cards-drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  created() {},
  methods: {
    onColumnDrop(dropResult) {
      this.$store.dispatch({ type: 'onColumnDrop', dropResult })
    },
    onCardDrop(groupId, dropResult) {
    //   const activity = {
    //     txt: 'moved a card',
    //     createdAt: Date.now(),
    //     byMember: this.$store.getters.loggedinUser,
    //     task: dropResult.payload,
    //   }
      this.$store.commit({ type: 'newActivity', activity })
      console.log('dropResult:', dropResult)
      this.$store.dispatch({ type: 'onCardDrop', groupId, dropResult })
    },
    dragStart(ev) {
      // if (!ev.isSource) return
      // const item = document.querySelector(`.${ev.payload.id}`)
      // const placeholder = document.querySelector('.outter')
      // // const placeholder = document.querySelector('.outter > .smooth-dnd-drop-preview-constant-class')
      // console.log('placeholder:', placeholder)
      // if (!placeholder) return
      // // placeholder.style.height = item.offsetHeight + 'px'
    },
    getParentPayload(index) {
      return this.groups[index]
    },
    log(...params) {
      console.log(...params)
    },
    onAddTask(task, groupId) {
      this.$emit('onAddTask', task, groupId)
    },
    onSaveGroup(editedGroup) {
      this.$emit('onSaveGroup', editedGroup)
    },
    updateGroups() {
      this.$emit('onUpdateGroups', this.scene.groups)
    },
  },
  computed: {
    // groupsToEdit() {
    //     return JSON.parse(JSON.stringify(this.$store.getters.board.groups))
    // }
  },
}
</script>
