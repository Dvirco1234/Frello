<template>
    <div class="group-list-con">
        <Container
            orientation="horizontal"
            @drop="onColumnDrop($event)"
            @drag-start="dragStart"
            :drop-placeholder="upperDropPlaceholderOptions"
            class="card-container"
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
    },
    methods: {

        onColumnDrop(dropResult) {
            this.$store.dispatch({type: 'onColumnDrop', dropResult})
        },
        onCardDrop(groupId, dropResult) {
            this.$store.dispatch({type: 'onCardDrop',groupId, dropResult})
        },
        dragStart() {
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
    }
}
</script>
