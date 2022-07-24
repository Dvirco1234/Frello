<template>
    <div class="group-list">
        <Container
            orientation="horizontal"
            @drop="onColumnDrop($event)"
            @drag-start="dragStart"
            :drop-placeholder="upperDropPlaceholderOptions"
        >
            <Draggable v-for="group in groups" :key="group.id">
                <group-preview
                    :key="group.id"
                    :group="group"
                    :scene="scene"
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
            scene: {
                groups: null,
            },
        }
    },
    created() {
        // this.scene.groups = this.groups
        this.scene.groups = JSON.parse(JSON.stringify(this.groups))
    },
    methods: {
        // onColumnDrop(dropResult) {
        //   console.log('dropResult:', dropResult)
        //     const scene = Object.assign({}, this.scene)
        //     scene.groups = applyDrag(scene.groups, dropResult)
        //     this.scene = scene
        //     this.updateGroups()
        // },
        // onCardDrop(groupId, dropResult) {
        //     if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
        //         const scene = Object.assign({}, this.scene)
        //         const group = scene.groups.filter(g => g.id === groupId)[0]
        //         const groupIndex = scene.groups.indexOf(group)
        //         const newGroup = Object.assign({}, group)
        //         newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
        //         scene.groups.splice(groupIndex, 1, newGroup)
        //         this.scene = scene
        //         this.updateGroups()
        //     }
        // },
        onColumnDrop(dropResult) {
            this.$store.dispatch({type: 'onColumnDrop', dropResult})
        },
        onCardDrop(groupId, dropResult) {

        },
        dragStart() {
            console.log('drag started')
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
        }
    },
    computed: {
        // groupsToEdit() {
        //     return JSON.parse(JSON.stringify(this.$store.getters.board.groups))
        // }
    }
}
</script>
<style>
</style>