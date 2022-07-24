<template>
    <app-header />
    <section class="board-details" :style="background">
        <div class="board-details-scroll">
        <board-nav-bar :board="board" />
        <section class="group-list flex">
            <group-list
                :groups="board.groups"
                :boardLabels="board.labels"
                :boardMembers="board.members"
                @onAddTask="onAddTask"
                @onSaveGroup="onSaveGroup"
                @onUpdateGroups="onUpdateGroups"
            />
            <article class="add-group">
                <div v-if="!isNewGroupEdit">
                    <button class="add-list-btn" @click="toggleAddGroup">
                        <span class="flex align-center"><img src="../assets/plus.svg" /></span>
                        Add another list
                    </button>
                </div>
                <div v-else class="new-group-container">
                    <form @submit.prevent="onSaveGroup">
                        <input type="text" v-model="groupToAdd.title" placeholder="Enter list title..." v-focus />
                        <button class="add-group-btn">Add list</button>
                        <button class="cancel-group-btn" @click="toggleAddGroup">X</button>
                    </form>
                </div>
            </article>
        </section>
        </div>
    </section>
</template>
<script>
import boardNavBar from '../cmps/board-nav-bar.vue'
import groupList from '../cmps/group-list.vue'
import groupPreview from '../cmps/group-preview.vue'
import { boardService } from '../services/board-service'
import appHeader from '../cmps/app-header.vue'
// import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
    name: 'board-details',
    // props: { type: Object },
    data() {
        return {
            isNewGroupEdit: false,
            groupToAdd: null,
        }
    },
    created() {
        const { id } = this.$route.params
        this.$store.dispatch({ type: 'board', action: 'set', board: id })
        this.groupToAdd = boardService.getEmpty('group')
    },
    methods: {
        toggleAddGroup() {
            this.isNewGroupEdit = !this.isNewGroupEdit
        },
        onSaveGroup(editedGroup) {
            this.$store.dispatch({
                type: 'group',
                action: 'save',
                group: editedGroup?.id ? editedGroup : this.groupToAdd,
            })
            if (!editedGroup.id) this.toggleAddGroup()
        },
        onAddTask(task, groupId) {
            this.$store.dispatch({ type: 'task', action: 'save', task, groupId })
        },
        onUpdateGroups(groups) {
            this.$store.dispatch({ type: 'updateGroups', groups })
        }
    },
    unmounted() { },
    components: {
        appHeader,
        boardNavBar,
        groupList,
        groupPreview,
        // Container,
        // Draggable,
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
        // boardToEdit() {
        //     return JSON.parse(JSON.stringify(this.$store.getters.board))
        // },
        background() {
            if (this.board.style.background.length > 10) {
                return `background-image: url('${this.board.style.background}')`
            } else {
                return this.board.style.background
            }
        }
    },
}
</script>
