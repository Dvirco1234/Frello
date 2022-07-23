<template>
    <article class="group-preview flex flex-col">
        <header class="flex space-between">
            <!-- css - looks like it isnt an input, on focus looks like input -->
            <input class="group-title" type="text" v-model="groupToEdit.title" @blur="saveGroup" />
            <div class="list-action-btn flex flex-center">
                <span class="flex align center"><img src="../assets/more-horiz.svg" /></span>
                <!-- <span>...</span> -->
            </div>
        </header>
        <main>
            <!-- <div class="task-list" v-for="task in group.tasks" :key="task.id">
                <task-preview :task="task" :group="group" :boardLabels="boardLabels" :boardMembers="boardMembers" />
            </div> -->
            <Container
                group-name="group"
                @drop="e => onCardDrop(group.id, e)"
                :get-child-payload="getCardPayload()"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                :drop-placeholder="dropPlaceholderOptions"
            >
                <Draggable v-for="task in group.tasks" :key="task.id" >
                    <task-preview :task="task" :group="group" :boardLabels="boardLabels" :boardMembers="boardMembers" />
                </Draggable>
            </Container>
        </main>
        <footer class="flex">
            <div v-if="!isNewTaskEdit">
                <button class="add-a-card-btn flex align-center" @click="toggleAddTask">
                    <span class="flex align-center"><img class="svg" src="../assets/plus.svg" /></span>
                    <span style="padding: 5px">Add a card</span>
                </button>
                <!-- <button title="Create from template...">icon</button> -->
            </div>
            <div v-else class="add-task">
                <form @submit.prevent="addTask">
                    <textarea
                        id="add-task"
                        v-model="taskToAdd.title"
                        placeholder="Enter a title for this card..."
                        v-focus
                    ></textarea>
                    <div>
                        <button class="add-card-btn">Add card</button>
                        <button class="cancel-card-btn" @click="toggleAddTask">X</button>
                    </div>
                </form>
            </div>
        </footer>
    </article>
</template>
<script>
import taskPreview from '../cmps/task-preview.vue'
import { boardService } from '../services/board-service'

import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
    name: 'group-preview',
    // props: { group: Object, taskToAdd: Object },
    props: { group: Object, boardLabels: Object, boardMembers: Object, scene: Object },
    data() {
        return {
            groupToEdit: { ...this.group },
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
        // console.log('this.group.tasks:', this.group.tasks)
        this.taskToAdd = boardService.getEmpty('task')
    },
    methods: {
        toggleAddTask() {
            this.isNewTaskEdit = !this.isNewTaskEdit
        },
        addTask() {
            this.$emit('addTask', this.taskToAdd, this.group.id)
            this.taskToAdd = boardService.getEmpty('task')
        },
        saveGroup() {
            if (this.groupToEdit.title !== this.group.title) this.$emit('saveGroup', this.groupToEdit)
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
    computed: {},
    unmounted() {},
    components: {
        taskPreview,
        Container,
        Draggable,
    },
}
</script>
<style>
.card-ghost {
    /* background-color: blue; */
}
</style>