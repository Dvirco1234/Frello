<template>
    <app-header />
    <section class="board-app flex justify-center">
        <nav class="left-nav flex justify-center">
            <ul class="clean-list">
                <li class="boards flex align-center">
                    <img src="../assets/trello-brand.svg" />
                    Boards
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
                            <board-preview v-if="i <= 4" :board="board" @createFromTemlate="createBoard" />
                        </span>
                    </div>
                </div>
            </section>
            <section class="filtered-boards" v-for="filter in boardFilters">
                <div class="filtered-title flex">
                    <span class="icon-lg" :class="filter.class"></span>
                    <h3>{{filter.title}}</h3>
                </div>
                <div v-if="filter.boards === 'starred'" class="filtered-list-container flex">
                    <div v-show="starredBoards" class="filtered-list board-list flex clean-list">
                        <span v-for="board in starredBoards" :key="board._id">
                            <board-preview :board="board" @toggleStarred="onToggleStarred"/>
                        </span>
                    </div>
                </div>
                <div v-else class="filtered-list-container flex">
                    <div v-show="recentBoards" class="filtered-list board-list flex clean-list">
                        <span v-for="board in recentBoards" :key="board._id">
                            <board-preview :board="board" @toggleStarred="onToggleStarred"/>
                        </span>
                    </div>
                </div>
            </section>
            <!-- <section class="starred-boards">
                <div class="starred-title flex">
                    <span class="icon-lg i-star"></span>
                    <h3>Starred boards</h3>
                </div>
                <div class="starred-list-container flex">
                    <div v-show="starredBoards" class="starred-list board-list flex clean-list">
                        <span v-for="(board) in starredBoards" :key="board._id">
                            <board-preview :board="board" />
                        </span>
                    </div>
                </div>
            </section> -->
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
                            :colors="colors"
                            :imgs="imgs"
                            :newBoard="newBoard"
                            @closeModal="closeModal"
                            @createBoard="createBoard"
                        />
                    </div>
                    <span v-for="board in boards" :key="board._id">
                        <board-preview :board="board" @toggleStarred="onToggleStarred" />
                    </span>
                    <!-- <img src="../assets/imgs/img-1.jpg" /> -->
                </div>
            </div>
        </main>
    </section>
</template>
<script>
import boardPreview from '../cmps/board-preview.vue'
import appHeader from '../cmps/app-header.vue'
import createBoardModal from '../cmps/create-board-modal.vue'
import { boardService } from '../services/board-service'

export default {
    name: 'board-app',
    // props: { type: Object },
    data() {
        return {
            newBoard: null,
            isCreateModalOpen: false,
            // currBg: '#0079BF',
            // templates: [],
            colors: [
                { name: 'Blue', code: '#0079BF' },
                { name: 'Orange', code: '#D29034' },
                { name: 'Green', code: '#509939' },
                { name: 'Red', code: '#B04733' },
                { name: 'Purple', code: '#88619E' },
            ],
         imgs: [
        'https://images.unsplash.com/photo-1658494787703-ac2062c5b6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1658246944434-04b7ec2cb7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1658211260722-416576a2f1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1654597718404-76d724a30d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',

      ],
            boardFilters: [{title: 'Starred boards', class: 'i-star', boards: 'starred'}, {title: 'Recently viewed', class: 'i-clock', boards: 'recent'}]
        }
    },
    created() {
        this.newBoard = boardService.getEmpty()
        // this.templates = boardService.getTemplates()
    },
    methods: {
        closeModal() {
            this.isCreateModalOpen = false
        },
        createBoard(board) {
            this.$store.dispatch({ type: 'board', action: 'save', board })
            this.closeModal()
            this.newBoard = boardService.getEmpty()
            // this.$router.push('/board/' + this.currBoard._id)
        },
        onToggleStarred(board) {
            this.$store.dispatch({ type: 'setState', action: 'toggleBoardStarred', board })
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
            const recents = []
            recents.push(this.$store.getters.boards[0])
            return recents
        },
        templates() {
            const boards = this.$store.getters.boards
            return boards.filter(board => board.isTemplate)
        }
    },
    unmounted() {},
    components: {
        boardPreview,
        appHeader,
        createBoardModal,
    },
}
</script>
