<template>
    <router-view />
    <section class="board-details" v-if="board" :style="background">
        <section v-if="board.isTemplate" class="template-screen">
            <div class="template-create flex align-center justify-center">
                <p>This is a public template for anyone to copy.</p>
                <button class="template-btn -create" @click="createFromTemlate">Create board from template</button>
                <button class="template-btn -back" @click="$router.go(-1)">Back</button>
            </div>
        </section>
        <app-header v-if="board" :style="{ 'backgroundColor': this.board.style.avgColor }" />
        <board-nav-bar v-if="board" :board="board" @toggleStarred="onToggleStarred"
            @addMemberToBoard="onAddMemberToBoard" @change-board-title="onChangeBoardtitle" />
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
    <section class="loader" v-else>
        <img src="../assets/spinner.svg" />
    </section>
</template>
<script>
import boardNavBar from '../cmps/board-nav-bar.vue'
import groupList from '../cmps/group-list.vue'
import groupPreview from '../cmps/group-preview.vue'
import appHeader from '../cmps/app-header.vue'
import { boardService } from '../services/board-service'
import { utilService } from '../services/util-service'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_BOARD_UPDATED } from '../services/socket-service'
import { FastAverageColor } from 'fast-average-color'
// import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
    name: 'board-details',
    // props: { type: Object },
    data() {
        return {
            isNewGroupEdit: false,
            groupToAdd: null,
            avgColor: null,
        }
    },
    async created() {
        const { id } = this.$route.params
        await this.$store.dispatch({ type: 'loadUsers' })
        socketService.emit(SOCKET_EMIT_SET_TOPIC, id)
        socketService.on(SOCKET_EVENT_BOARD_UPDATED, this.updateBoard)
        this.groupToAdd = boardService.getEmpty('group')
        this.avgBgColor()


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
            await this.$store.dispatch({
                type: 'setState',
                action: 'saveGroup',
                group: editedGroup?.id ? editedGroup : { ...this.groupToAdd },
            })
            this.groupToAdd = boardService.getEmpty('group')
            // if (!editedGroup.id) this.toggleAddGroup()
        },
        onAddTask(task, groupId) {
            const activity = {
                txt: 'created card',
                createdAt: Date.now(),
                byMember: this.$store.getters.loggedinUser,
                task,
            }
            this.$store.commit({ type: 'newActivity', activity })
            this.$store.dispatch({ type: 'setState', action: 'addTask', groupId, task })
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
        onAddMemberToBoard(member) {
            this.$store.dispatch({
                type: 'setState',
                action: 'addMemberToBoard',
                member,
            })
        },
        updateBoard(updatedBoard) {
            // console.log(updatedBoard);
            this.$store.commit({ type: 'updateBoard', updatedBoard })
        },
        async createFromTemlate() {
            const board = JSON.parse(JSON.stringify(this.board))
            delete board._id
            board.isTemplate = false
            board.createdBy = this.loggedInUser
            board.members.push(this.loggedInUser)
            board.groups.forEach(g => {
                g.id = utilService.makeId()
                g.tasks.map(t => t.id = utilService.makeId())
            })

            const newBoard = await this.$store.dispatch({ type: 'board', action: 'save', board })
            this.$router.push('/board/' + newBoard._id)
        },
        async avgBgColor() {
            if (!this.board) {
                setTimeout(() => {
                    this.avgBgColor()
                }, 0);
            } else if (this.board.style.background.length > 10) {
                const fac = new FastAverageColor()
                const avColor = await fac.getColorAsync(this.board.style.background)
                this.avgColor = avColor.hexa
            } else {
                this.avgColor = this.board.style.background
            }
        },

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
        FastAverageColor,
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
        loggedInUser() {
            return this.$store.getters.loggedinUser
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
