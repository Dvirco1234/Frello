<template>
    <div v-if="isCreateModalOpen" style="position: relative" ><create-board-modal @closeModal="toggleDropdown" @goBack="toggleCreateMoadl" :isHeaderModal="true" v-click-outside="toggleDropdown"/></div>
    <section v-else class="nav-dropdown" v-click-outside="toggleDropdown">
        <header class="flex align-center justify-center">
            <h4 v-if="btn">{{ btn.name }}</h4>
            <button class="close-btn" @click="toggleDropdown">
                <span class="flex align-center"><img src="../assets/close.svg" /></span>
            </button>
        </header>
        <main>
            <article v-if="btn.name === 'Boards'" class="boards-nav">
                <div class="curr-board" v-for="board in boardsOptions">
                    <h4 class="link-desc">{{ board.title }}</h4>
                    <div class="board-link flex" @click="goToBoard(board.router)">
                        <div
                            v-if="board.bgc"
                            class="icon flex align-center justify-center"
                            :style="background(board.bgc)"
                        >
                            {{ $filters.firstLetter(board.name) }}
                        </div>
                        <div v-else class="icon flex align-center justify-center">F</div>
                        <h4>{{ board.name }}</h4>
                    </div>
                </div>
            </article>
            <article v-else-if="btn.name === 'Create'" class="create-nav">
                <button class="create-link-btn" @click="toggleCreateMoadl">
                    <span class="flex align-center"
                        ><img src="../assets/trello-icon.svg" />
                        <h4 class="create-desc">Create board</h4></span
                    >
                    <p>
                        A board is made up of cards ordered on lists. Use it to manage projects, track information, or
                        organize anything.
                    </p>
                </button>
                <button class="create-link-btn">
                    <span class="flex align-center"
                        ><img src="../assets/template.svg" />
                        <h4 class="create-desc">Start with a template</h4></span
                    >
                    <p>Get started faster with a board template.</p>
                </button>
            </article>
            <article v-else class="nav-boards">
                <h4 class="link-desc">{{ currBtn.title }}</h4>
                <div v-if="currBtn.title === 'Starred boards' && !currBtn.boards.length" class="no-starred-board">
                    <img class="unstarred-img" src="../assets/starred-boards.svg">
                    <p>Star important boards to access them quickly and easily.</p>
                </div>
                <div class="boards" v-for="board in currBtn.boards">
                    <div class="board-link flex align-center" @click="goToBoard(board._id)">
                        <div
                            v-if="board.style.background"
                            class="icon flex align-center justify-center"
                            :style="background(board.style.background)"
                        >
                            {{ $filters.firstLetter(board.title) }}
                        </div>
                        <div v-else class="icon flex align-center justify-center">F</div>
                        <h4>{{ board.title }}</h4>
                        <span
                            v-if="btn.name === 'Starred'"
                            class="starred-board starred icon-sm i-star-full"
                            @click.stop="onToggleStarred(board)"
                        ></span>
                    </div>
                </div>
            </article>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>
<script>
import createBoardModal from './create-board-modal.vue'

export default {
    name: 'nav-dropdown',
    props: { btn: Object },
    data() {
        return {
            boardsOptions: [
                { title: 'Current Board', router: '', name: '', bgc: '' },
                { title: 'Your Boards', router: '', name: 'Frello Boards', bgc: '' },
            ],
            isCreateModalOpen: false,
            // currBtn: null,
        }
    },
    created() {
        // const { router, name, bgc } = this.boardsOptions[0]
        this.boardsOptions[0] = {
            title: 'Current Board',
            router: this.currBoard ? this.currBoard._id : this.boards[0]._id,
            name: this.currBoard ? this.currBoard.title : this.boards[0].title,
            bgc: this.currBoard ? this.currBoard.style.background : this.boards[0].style.background,
        }

        // this.boardsOptions[0].router = this.currBoard ? this.currBoard._id : this.boards[0]
        // this.boardsOptions[0].name = this.currBoard.title
        // this.boardsOptions[0].bgc = this.currBoard.style.background
    },
    methods: {
        toggleDropdown() {
            this.$emit('toggleDropdown')
        },
        // goToBoard(router) {
        //     this.$router.push(router)
        //     this.toggleDropdown()
        // },
        background(code) {
            if (code.length > 10) {
                return `background-image: url('${code}')`
            } else {
                return `background: ${code}`
            }
        },
        onToggleStarred(board) {
            this.$store.dispatch({ type: 'setState', action: 'toggleBoardStarred', board })
        },
        goToBoard(boardId) {
            this.$router.push('/board/' + boardId)
            this.toggleDropdown()
        },
        toggleCreateMoadl() {
            this.isCreateModalOpen = !this.isCreateModalOpen
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.$store.getters.board
        },
        recents() {
            const boards = this.$store.getters.boards
            return boards
        },
        starredBoards() {
            const boards = this.$store.getters.boards
            return boards.filter(board => board.isStarred)
        },
        templates() {
            const boards = this.$store.getters.templateBoards
            return boards //.filter(board => board.isTemplate)
        },
        currBtn() {
            // if (this.btn.name === 'Boards') this.currBtn = { boards: this.recents, title: 'Current board' }
            if (this.btn.name === 'Recent') return { boards: this.recents, title: 'Recent boards' }
            if (this.btn.name === 'Starred') return { boards: this.starredBoards, title: 'Starred boards' }
            if (this.btn.name === 'Templates') return { boards: this.templates, title: 'Top templates' }
        },
    },
    unmounted() {
        if (this.btn.isCreateModalOpen) this.btn.isCreateModalOpen = false
    },
    components: {
        createBoardModal,
    },
}
</script>
