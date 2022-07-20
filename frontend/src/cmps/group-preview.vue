<template>
    <article class="group-preview flex flex-col">
        <header class="flex space-between">
            <!-- css - looks like it isnt an input, on focus looks like input -->
            <input class="group-title" type="text" v-model="group.title" />
        </header>
        <main>
            <!-- <task-list v-for="task in group.tasks"/> -->
            <div class="task-list" v-for="task in group.tasks">
                <task-preview :task="task" :group="group" :boardLabels="boardLabels" :boardMembers="boardMembers" />
            </div>
        </main>
        <footer class="flex">
            <div class="flex" v-if="!isNewTaskEdit">
                <button class="add-card-btn" @click="toggleAddTask"><span>+</span> Add a card</button>
                <!-- <button title="Create from template...">icon</button> -->
            </div>
            <div v-else>
                <form @submit.prevent="addTask">
                    <!-- <textarea id="" cols="30" rows="10" placeholder="Enter a title for this card..."></textarea> -->
                    <input type="text" v-model="taskToAdd.title" placeholder="Enter a title for this card...">
                    <button>Add card</button>
                    <button @click="toggleAddTask">x</button>
                </form>
            </div>
        </footer>
    </article>
</template>
<script>
import taskPreview from '../cmps/task-preview.vue'
import { boardService } from '../services/board-service'

export default {
    name: 'group-preview',
    // props: { group: Object, taskToAdd: Object },
    props: { group: Object, boardLabels: Object, boardMembers: Object },
    data() {
        return {
            isNewTaskEdit: false,
            taskToAdd: null,
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
            // console.log('adding task')
            // this.group.push(this.taskToAdd)
            this.$emit('addTask', this.taskToAdd, this.group.id)
            // this.$emit('updateGroup', this.group)
            this.taskToAdd = boardService.getEmpty('task')
            // this.toggleAddTask()
        },

    },
    computed: {},
    unmounted() { },
    components: {
        taskPreview,
    },
}
</script>
<style>
.group-preview {
    background-color: #ebecf0;
    padding: 0px 8px;
    min-width: 272px;
    margin: 4px;
    /* gap: 8px; */
}

.group-preview header{
    height: 40px;
    align-items: center;
}

.group-title {
    border: none;
    background-color: transparent;
    padding-inline-start: .6em;
    height: 28px;
}
.group-title:focus{
    outline:none;
    box-shadow: inset 0 0 0 2px #0079bf;
    background-color: #fff;
    border-radius: 3px;
}

.group-preview .add-card-btn {
    width: 228px;
    height: 28px;
    text-align: left;
    border: none;
    color: #5e6c84;
    background-color: #ebecf0;
}

.group-preview .add-card-btn:hover {
    cursor: pointer;
    background-color: #091e4214;
    color: #172b4d;
}
.group-preview footer{
    margin-top: 4px;
    margin-bottom: 8px;
}
/* .task-list {
    gap: 8px;
} */
</style>
