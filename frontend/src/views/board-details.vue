<template>
    <router-view />
    <section class="board-details" v-if="board" :style="background">
        <app-header style="background-color: rgba(0, 0, 0, 0.3)" />
        <board-nav-bar v-if="board" :board="board" @toggleStarred="onToggleStarred"
            @change-board-title="onChangeBoardtitle" />
        <div class="board-details-scroll">
            <section class="group-list flex">
                <group-list :groups="board.groups" :boardLabels="board.labels" :boardMembers="board.members"
                    @onAddTask="onAddTask" @onSaveGroup="onSaveGroup" @onUpdateGroups="onUpdateGroups" />
                <article class="add-group">
                    <div v-show="!isNewGroupEdit">
                        <button class="add-list-btn" @click="openAddGroup">
                            <span class="flex align-center"><img src="../assets/plus.svg" /></span>
                            Add another list
                        </button>
                    </div>
                    <div v-show="isNewGroupEdit" class="new-group-container" v-click-outside="closeAddGroup">
                        <form @submit.prevent="onSaveGroup">
                            <input type="text" v-model="groupToAdd.title" placeholder="Enter list title..." v-focus />
                            <div class="btns flex">
                                <button type="submit" class="add-group-btn">Add list</button>
                                <span class="cancel-group-btn icon-lg i-close" @click="closeAddGroup"></span>
                            </div>
                        </form>
                    </div>
                </article>
                <div class="spacer"></div>
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
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket-service'
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
        // this.$store.dispatch({ type: 'board', action: 'set', board: id })
        socketService.emit(SOCKET_EMIT_SET_TOPIC, id)
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
        this.groupToAdd = boardService.getEmpty('group')
    },
    methods: {
        openAddGroup() {
            this.isNewGroupEdit = !this.isNewGroupEdit
            this.groupToAdd = boardService.getEmpty('group')
        },
        closeAddGroup() {
            this.isNewGroupEdit = false
            this.groupToAdd = boardService.getEmpty('group')
        },
        async onSaveGroup(editedGroup) {
            console.log('editedGroup: ', editedGroup)
            await this.$store.dispatch({
                type: 'group',
                action: 'save',
                group: editedGroup?.id ? editedGroup : {...this.groupToAdd},
            })
            this.groupToAdd = boardService.getEmpty('group')
            // if (!editedGroup.id) this.toggleAddGroup()
        },
        onAddTask(task, groupId) {
            this.$store.dispatch({ type: 'task', action: 'save', task, groupId })
        },
        onUpdateGroups(groups) {
            this.$store.dispatch({ type: 'updateGroups', groups })
        },
        onToggleStarred() {
            this.$store.dispatch({ type: 'setState', action: 'toggleBoardStarred' })
        },
        onChangeBoardtitle(title) {
            this.$store.dispatch({
                type: 'setState',
                action: 'changeBoardTitle',
                title,
            })
        },
        updateBoard(updatedBoard) {
            // console.log(updatedBoard);
            this.$store.commit({ type: 'updateBoard', updatedBoard })
        }
    },
    unmounted() {
        socketService.off(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
    },
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
                return `background-image: url('${this.board?.style.background}')`
            } else {
                return `background-color: ${this.board?.style.background}`
            }
        },
    },
    watch: {
        '$route.params.id': {
            handler() {
                const { id } = this.$route.params
                this.$store.dispatch({ type: 'clearCurrBoard' })
                this.$store.dispatch({ type: 'board', action: 'set', board: id })
            },
            immediate: true,
        },
    },
}
</script>
