<template>
    <article class="group-preview flex flex-col">
        <header class="flex space-between">
            <!-- css - looks like it isnt an input, on focus looks like input -->
            <input type="text" v-model="group.title" /> 
        </header>
        <main>
            <!-- <task-list v-for="task in group.tasks"/> -->
            <div class="tasks" v-for="task in group.tasks">
                <task-preview :task="task" />
            </div>
        </main>
        <footer class="flex">
            <div class="flex" v-if="!isNewTaskEdit">
                <button @click="toggleAddTask">+ Add a card</button>
                <button title="Create from template...">icon</button>
            </div>
            <div v-else>
                <form @submit.prevent="addTask">
                    <!-- <textarea id="" cols="30" rows="10" placeholder="Enter a title for this card..."></textarea> -->
                    <input type="text" placeholder="Enter a title for this card...">
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
    props: { group: Object },
    data() {
        return {
            isNewTaskEdit: false,
            taskToAdd: null,
        }
    },
    created() {
        console.log('this.group.tasks:', this.group.tasks)
        this.taskToAdd = boardService.getEmptyTask()
    },
    methods: {
        toggleAddTask() {
            this.isNewTaskEdit = !this.isNewTaskEdit
        },
        addTask() {
            console.log('adding task');
            this.toggleAddTask()
        }
    },
    computed: {},
    unmounted() {},
    components: {
        taskPreview,
    },
}
</script>
<style>
.group-preview {
    background-color: rgb(235, 237, 241);
    padding: 8px;
    width: 272px;
    margin: 4px;
    gap: 8px;
}
</style>
