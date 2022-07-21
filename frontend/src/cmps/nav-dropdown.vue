<template>
    <section class="nav-dropdown">
        <header class="flex align-center justify-center">
            <h4 v-if="btn">{{ btn.name }}</h4>
            <button class="close-btn" @click="toggleDropdown"><span class="flex align-center"><img src="../assets/close.svg"></span></button>
        </header>
        <main>
            <article v-if="btn.name === 'Boards'" class="boards-nav">
                <div class="curr-board" v-for="board in boards">
                    <h4 class="link-desc">{{ board.name }}</h4>
                    <div class="board-link flex" @click="goToBoard(board.router)">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>Frello Board</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Recent'" class="recent-nav">
                <div class="recent-board" v-for="board in boards">
                    <h4>{{ board.name }}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>{{ currBoard.title }}</h4>
                    </div>
                </div>
            </article>
            <!-- <article v-if="btn.name === 'Starred'" class="starred-nav">
                <div class="starred-boards" v-for="board in boards">
                    <h4>{{board.name}}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>{{currBoard.title}}</h4>
                    </div>
                </div>
            </article> -->
            <!-- <article v-if="btn.name === 'Templates'" class="templates-nav">
                <div class="templates-boards" v-for="board in templates">
                    <h4>{{board.name}}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>{{board.title}}</h4>
                    </div>
                </div>
            </article> -->
            <article v-if="btn.name === 'Create'" class="create-nav">
                <div>
                    <font-awesome-icon icon="fa-brands fa-trello" />
                </div>
                <!-- <div class="recent-board" v-for="board in boards">
                    <h4>{{ board.name }}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>{{ currBoard.title }}</h4>
                    </div>
                </div> -->
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
            boards: [{ name: 'Current Board', router: '' }, { name: 'Your Boards', router: '/board' }],
        }
    },
    created() {
        console.log(this.btn)
    },
    methods: {
        toggleDropdown() {
            this.$emit('toggleDropdown')
        },
        goToBoard(router) {
            this.$router.push(router)
            this.toggleDropdown()
        }
    },
    computed: {
        currBoard() {
            return this.$store.getters.board
        },
        // starredBoards(){
        //     const boards = this.$store.getters.boards
        //     return boards.filter(board => board.isStarred)
        // }
    },
    unmounted() {},
    components: {},
}
</script>
