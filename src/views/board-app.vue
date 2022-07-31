<template>
    <section v-if="!boards.length" class="loader">
        <img src="../assets/spinner.svg" />
    </section>

    <section v-else>
        <app-header />
        <section class="board-app flex justify-center">
            <nav class="left-nav flex justify-center">
                <ul class="clean-list">
                    <li class="boards flex align-center">
                        <img src="../assets/trello-brand.svg" />
                        Boards
                    </li>
                    <li class="boards flex align-center">
                        <img src="../assets/template.svg" />
                        Templates
                    </li>
                </ul>
            </nav>
            <main class="main-content">
                <section class="templates">
                    <header class="templates-header flex space-between align-center">
                        <div class="templates-title flex">
                            <span class="flex align-center"><img src="../assets/template.svg" /></span>
                            <h2>Most popular templates</h2>
                        </div>
                        <!-- <div class="close-btn flex justify-center align-center">
                        <span class="icon-sm i-close close-icon"></span>
                    </div> -->
                    </header>
                    <div class="template-list-container flex">
                        <div v-show="templates" class="template-list board-list flex clean-list">
                            <span v-for="(board, i) in templates" :key="board._id">
                                <board-preview v-if="i <= 4" :board="board" />
                                <!-- <board-preview v-if="i <= 4" :board="board" @createFromTemlate="createBoard" /> -->
                            </span>
                        </div>
                    </div>
                </section>
                <section class="filtered-boards" v-for="filter in boardFilters">
                    <div v-if="filter" class="filtered-title flex">
                        <span class="icon-lg" :class="filter.class"></span>
                        <h3>{{ filter.title }}</h3>
                    </div>
                    <div class="filtered-list-container flex">
                        <div v-show="filter.boards" class="filtered-list board-list flex clean-list">
                            <span v-for="board in filter.boards" :key="board._id">
                                <board-preview :board="board" @toggleStarred="onToggleStarred" />
                            </span>
                        </div>
                    </div>
                </section>
                <div class="workspace-title">YOUR BOARDS</div>
                <div class="board-list-container flex">
                    <div v-show="boards" class="board-list flex clean-list">
                        <div class="create-board">
                            <button class="flex flex-center" @click="isCreateModalOpen = !isCreateModalOpen">
                                Create new board
                            </button>
                            <create-board-modal
                                v-if="isCreateModalOpen"
                                v-click-outside="closeModal"
                                @closeModal="closeModal"
                            />
                            <!-- <create-board-modal
                            v-if="isCreateModalOpen"
                            v-click-outside="closeModal"
                            :newBoard="newBoard"
                            @closeModal="closeModal"
                            @createBoard="createBoard"
                        /> -->
                        </div>
                        <span v-for="board in boards" :key="board._id">
                            <board-preview :board="board" @toggleStarred="onToggleStarred" />
                        </span>
                        <!-- <img src="../assets/imgs/img-1.jpg" /> -->
                    </div>
                </div>
            </main>
        </section>
    </section>
</template>
<script>
import boardPreview from '../cmps/board-preview.vue'
import appHeader from '../cmps/app-header.vue'
import createBoardModal from '../cmps/create-board-modal.vue'
// import { boardService } from '../services/board-service'

export default {
    name: 'board-app',
    data() {
        return {
            isCreateModalOpen: false,
        }
    },
    created() {
        // this.newBoard = boardService.getEmpty()
    },
    methods: {
        closeModal() {
            this.isCreateModalOpen = false
        },
        async createBoard(board) {
            this.closeModal()
            board.createdBy = this.loggedInUser
            board.members.push(this.loggedInUser)
            const newBoard = await this.$store.dispatch({ type: 'board', action: 'save', board })
            this.$router.push('/board/' + newBoard._id)
            this.newBoard = boardService.getEmpty()
        },
        onToggleStarred(board) {
            this.$store.dispatch({ type: 'setState', action: 'toggleBoardStarred', board })
        },
        background(bg) {
            if (bg > 10) {
                return `background-image: url('${bg}')`
            } else {
                return `background-color: ${bg}`
            }
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.$store.getters.board
        },
        starredBoards() {
            const boards = this.$store.getters.boards
            return boards.filter(board => board.isStarred)
        },
        recentBoards() {
            const boards = this.$store.getters.boards.filter(b => b.visitedAt).sort((a, b) => b.visitedAt - a.visitedAt)
            if (boards.length > 4) return boards.slice(0, 4)
            else return boards
        },
        templates() {
            return this.$store.getters.templateBoards.slice(0, 4)
            // const boards = this.$store.getters.templateBoards
            // return boards//.filter(board => board.isTemplate)
        },
        boardFilters() {
            let titles = []
            if (this.starredBoards.length)
                titles.push({ title: 'Starred boards', class: 'i-star', boards: this.starredBoards })
            if (this.recentBoards.length)
                titles.push({ title: 'Recently viewed', class: 'i-clock', boards: this.recentBoards })
            return titles
        },
        loggedInUser() {
            return this.$store.getters.loggedinUser
        },
    },
    unmounted() {},
    components: {
        boardPreview,
        appHeader,
        createBoardModal,
    },
}
</script>
