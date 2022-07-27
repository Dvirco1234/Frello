<template>
    <section class="nav-dropdown">
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
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>{{ board.name }}</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Recent'" class="recent-nav">
                <div class="recent-board" v-for="board in boards">
                    <h4>{{ board.name }}</h4>
                    <div class="board-link flex">
                        <div v-if="board.style.background" class="icon flex align-center justify-center">{{$filters.firstLetter(board.title)}}</div>
                        <div v-else class="icon flex align-center justify-center">F</div>
                        <h4>{{ currBoard.title }}</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Starred'" class="starred-nav">
                <h4 class="link-desc">Starred boards</h4>
                <div class="starred-boards" v-for="board in starredBoards">
                    <div class="board-link flex">
                        <div v-if="board.style.background" class="icon flex align-center justify-center">{{$filters.firstLetter(board.title)}}</div>
                        <div v-else class="icon flex align-center justify-center">F</div>
                        <h4>{{ board.title }}</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Templates'" class="templates-nav">
                <h4 class="link-desc">Top templates</h4>
                <div class="templates-boards" v-for="board in templates">
                    <div class="board-link flex">
                        <div v-if="board.style.background" class="icon flex align-center justify-center">{{$filters.firstLetter(board.title)}}</div>
                        <div v-else class="icon flex align-center justify-center">F</div>
                        <h4>{{ board.title }}</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Create'" class="create-nav">
                <button class="create-link-btn" @click="isCreateModalOpen = !isCreateModalOpen">
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
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>
<script>
export default {
    name: 'nav-dropdown',
    props: { btn: Object },
    data() {
        return {
            boardsOptions: [
                { title: 'Current Board', router: '', name: '' },
                { title: 'Your Boards', router: '/board', name: 'Frello Boards' },
            ],
            isCreateModalOpen: false,
        }
    },
    created() {
        console.log(this.btn)
        this.boardsOptions[0].router = '/board/' + this.currBoard._id
        this.boardsOptions[0].name = this.currBoard.title
    },
    methods: {
        toggleDropdown() {
            this.$emit('toggleDropdown')
        },
        goToBoard(router) {
            this.$router.push(router)
            this.toggleDropdown()
        },
    },
    computed: {
        currBoard() {
            return this.$store.getters.board
        },
        starredBoards() {
            const boards = this.$store.getters.boards
            return boards.filter(board => board.isStarred)
        },
        templates() {
            const boards = this.$store.getters.boards
            return boards.filter(board => board.isTemplate)
        },
    },
    unmounted() {},
    components: {},
}
</script>
