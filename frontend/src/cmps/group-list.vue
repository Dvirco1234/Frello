<template>
    <div class="card-scene">
        <Container
            orientation="horizontal"
            @drop="onColumnDrop($event)"
            @drag-start="dragStart"
            :drop-placeholder="upperDropPlaceholderOptions"
        >
            <Draggable v-for="group in scene.groups" :key="group.id">
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
import { applyDrag, generateItems } from '../services/dnd-util.service'

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
            dropPlaceholderOptions: {
                className: 'drop-preview',
                animationDuration: '150',
                showOnTop: true,
            },
            scene: {
                groups: null,
                type: 'container',
                props: {
                    orientation: 'horizontal',
                },
            },
        }
    },
    created() {
        this.scene.groups = JSON.parse(JSON.stringify(this.groups))
        // const draggableGroups = JSON.parse(JSON.stringify(this.groups))
        this.scene.groups.map(g => {
          g.type = 'container'
          g.props = {
            orientation: 'vertical',
            className: 'card-container',
        }
        g.tasks.map(t => {
            t.type = 'draggable'
            t.props = {className: 'card'}
        })
        })
        console.log('this.scene.groups:', this.scene.groups)
    },
    methods: {
        onColumnDrop(dropResult) {
          console.log('dropResult:', dropResult)
            const scene = Object.assign({}, this.scene)
            scene.groups = applyDrag(scene.groups, dropResult)
            this.scene = scene
        },
        onCardDrop(groupId, dropResult) {
            // console.log('groupId', groupId);
            // console.log('dropResult:', dropResult)
            if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
                const scene = Object.assign({}, this.scene)
                const group = scene.groups.filter(g => g.id === groupId)[0]
                const groupIndex = scene.groups.indexOf(group)
                const newGroup = Object.assign({}, group)
                newGroup.tasks = applyDrag(newGroup.tasks, dropResult)
                scene.groups.splice(groupIndex, 1, newGroup)
                this.scene = scene
            }
        },
        // getCardPayload(columnId) {
        //     return index => {
        //         return this.scene.children.filter(p => p.id === columnId)[0].children[index]
        //     }
        // },
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
    },
}
</script>
<style>
/* .card-ghost {
    transition: transform 0.18s ease;
    transform: rotateZ(5deg)
} */
</style>