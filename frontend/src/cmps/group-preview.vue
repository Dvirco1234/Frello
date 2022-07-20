<template>
    <article class="group-preview flex flex-col">
        <header class="flex space-between">
            <!-- css - looks like it isnt an input, on focus looks like input -->
            <input class="group-title" type="text" v-model="groupToEdit.title" @blur="saveGroup" />
            <div class="list-action-btn flex flex-center">
                <span>...</span>
            </div>
        </header>
        <main>
            <!-- <task-list v-for="task in group.tasks"/> -->
            <div class="task-list" v-for="task in group.tasks">
                <task-preview :task="task" :group="group" :boardLabels="boardLabels" :boardMembers="boardMembers" />
            </div>
        </main>
        <footer class="flex">
            <div class="flex" v-if="!isNewTaskEdit">
                <button class="add-a-card-btn" @click="toggleAddTask"><span>+</span> Add a card</button>
                <!-- <button title="Create from template...">icon</button> -->
            </div>
            <div v-else>
                <form @submit.prevent="addTask">
                    <textarea id="add-task" v-model="taskToAdd.title"
                        placeholder="Enter a title for this card..."></textarea>
                    <!-- <input type="text" v-model="taskToAdd.title" placeholder="Enter a title for this card..."> -->
                    <button class="add-card-btn">Add card</button>
                    <button class="cancel-card-btn" @click="toggleAddTask">🗙</button>
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
            groupToEdit: { ...this.group },
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
        saveGroup() {
            if(this.groupToEdit.title!==this.group.title)
            this.$emit('saveGroup', this.groupToEdit)
        }

    },
    computed: {},
    unmounted() { },
    components: {
        taskPreview,
    },
}
</script>
<style>
/* .group-preview {
    background-color: #ebecf0;
    padding: 0px 8px;
    min-width: 272px;
    margin: 4px;
}

.group-preview header {
    height: 40px;
    align-items: center;
}


.group-title {
    border: none;
    background-color: transparent;
    padding-inline-start: .6em;
    height: 28px;
}

.group-title:focus {
    outline: none;
    box-shadow: inset 0 0 0 2px #0079bf;
    background-color: #fff;
    border-radius: 3px;
}

.group-preview .list-action-btn {
    padding: .5em;
    width: 28px;
    height: 28px;
    text-align: center;
    border-radius: 3px;
}

.group-preview .list-action-btn:hover {
    background-color: #091e4214;
    cursor: pointer;
}

.group-preview .add-a-card-btn {
    width: 228px;
    height: 28px;
    text-align: left;
    border: none;
    border-radius: 3px;
    color: #5e6c84;
    background-color: #ebecf0;
}

.group-preview .add-a-card-btn:hover {
    cursor: pointer;
    background-color: #091e4214;
    color: #172b4d;
}

.group-preview .add-card-btn {
    background-color: #0079bf;
    border: none;
    color: #fff;
    padding: 6px 12px;
    border-radius: 3px;
}

.group-preview .add-card-btn:hover {
    cursor: pointer;
    background-color: #026aa7;
}

.group-preview .cancel-card-btn {
    border: none;
    color: #6b778c;
}

.group-preview .cancel-card-btn:hover {
    cursor: pointer;
    color: #172b4d;

}

.group-preview textarea {
    overflow-wrap: break-word;
    resize: none;
    height: 54px;
    width: 100%;
    font-family: Segoe UI, Roboto, Helvetica, sans-serif;
    font-size: 14px;
    padding: 6px 8px;
    border-radius: 3px;
    box-shadow: 0 1px 0 #091e4240;
    border: none;
}

.group-preview textarea:focus {
    outline: none;
}

.group-preview footer {
    margin-top: 4px;
    margin-bottom: 8px;
}

.group-preview form {
    width: 100%;
} */

/* .task-list {
    gap: 8px;
} */
</style>
