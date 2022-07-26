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
                <header class="flex space-between">
                    <div class="templates-title flex">
                        <span><img src="../assets/template.svg"></span>
                        <h2>Most popular templates</h2>
                        <button></button>
                    </div>
                </header>
            </section>
            <div class="workspace-title">YOUR BOARDS</div>
            <div class="board-list-container flex">
                <div v-show="boards" class="board-list flex clean-list ">
                    <div class="create-board">
                        <button class="flex flex-center" @click="isCreateModalOpen = !isCreateModalOpen">
                            Create new board
                        </button>
                        <create-board-modal v-if="isCreateModalOpen" v-click-outside="closeModal" 
                            :colors="colors" :imgs="imgs" :newBoard="newBoard" @closeModal="closeModal" @createBoard="createBoard"/>
                    </div>
                    <span v-for="board in boards" :key="board._id">
                        <board-preview :board="board" @toggleStarred="onToggleStarred"/>
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
            colors: [
                { name: 'Blue', code: '#0079BF' },
                { name: 'Orange', code: '#D29034' },
                { name: 'Green', code: '#509939' },
                { name: 'Red', code: '#B04733' },
                { name: 'Purple', code: '#88619E' },
            ],
            imgs: [
                { url: 'https://images.unsplash.com/photo-1658604663578-04634f4cb897?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=Mnw3MDY2fDB8MXxjb2xsZWN0aW9ufDJ8MzE3MDk5fHx8fHwyfHwxNjU4NzU5NzEy&ixlib=rb-1.2.1&q=80&w=400', name: '' },
                { url: '../../assets/imgs/img-2.jpg', name: '' },
                { url: '../../assets/imgs/img-3.jpg', name: '' },
                { url: '/../../assets/imgs/img-4.jpg', name: '' },
            ],
        }
    },
    created() {
        this.newBoard = boardService.getEmpty()
    },
    methods: {
        closeModal() {
            this.isCreateModalOpen = false
        },
        // pickBg(code) {
        //     this.newBoard.style.background = code
        //     this.currBg = code
        // },
        createBoard(board) {
            this.$store.dispatch({ type: 'board', action: 'save', board })
            this.closeModal()
            this.newBoard = boardService.getEmpty()
            // this.$router.push('/board/' + this.currBoard._id)
        },
        onToggleStarred(board) {
            this.$store.dispatch({ type: 'setState', action: 'toggleBoardStarred', board })
        }
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.$store.getters.board
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
