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
        <article class="main-content">
            <div class="workspace-title">YOUR BOARDS</div>
            <div class="board-list-container flex">
                <div v-show="boards" class="board-list flex clean-list">
                    <div class="create-board">
                        <button class="flex flex-center" @click="isCreateModalOpen = !isCreateModalOpen">
                            Create new board
                        </button>
                        <div class="create-board-modal" v-if="isCreateModalOpen" v-click-outside="closeModal">
                            <header class="flex align-center justify-center">
                                <h4>Create board</h4>
                                <span @click="isCreateModalOpen = false" class="flex align-center"
                                    ><img class="close-modal" src="../assets/close.svg"
                                /></span>
                            </header>
                            <main>
                                <section class="flex justify-center">
                                    <div
                                        class="board-bgc-preview flex justify-center"
                                        :style="{ backgroundColor: currBg }"
                                    >
                                        <img src="../assets/board-preview-skeleton.svg" />
                                    </div>
                                </section>
                                <section class="bgc-pick">
                                    <h4>Background</h4>
                                    <div class="imgs">
                                        <button
                                            class="img-pick"
                                            v-for="img in imgs"
                                            :style="background"
                                            :key="img.url"
                                            :title="img.name"
                                        >
                                            <!-- @click="pickImg(img.url)" -->
                                            <img :src="img.url" />
                                            <!-- <div v-if="color.code === currBg">
                                                <span class="flex align-center justify-center icon-sm i-check"></span>
                                                <span class="screen"></span>
                                            </div> -->
                                        </button>
                                    </div>
                                    <div class="colors flex space-between">
                                        <button
                                            class="color-pick"
                                            v-for="color in colors"
                                            :key="color.code"
                                            :style="{ backgroundColor: color.code }"
                                            :title="color.name"
                                            @click="pickBg(color.code)"
                                        >
                                            <!-- <div class="flex align-center justify-center"><span v-if="color.code === currBg" class="flex align-center justify-center icon-sm i-check"></span></div> -->
                                            <div v-if="color.code === currBg">
                                                <span class="flex align-center justify-center icon-sm i-check"></span>
                                                <span class="screen"></span>
                                            </div>
                                        </button>
                                        <button class="more-colors flex align-center justify-center">
                                            <span class="flex justify-center"
                                                ><img class="icon" src="../assets/more-horiz.svg"
                                            /></span>
                                        </button>
                                    </div>
                                    <h4 class="board-title">Board title<span>*</span></h4>
                                    <form @submit.prevent="createBoard">
                                        <input v-focus type="text" v-model="newBoard.title" />
                                        <p v-if="!newBoard.title"><span>👋</span>Board title is required</p>
                                        <button :disabled="!newBoard.title">Create</button>
                                    </form>
                                </section>
                            </main>
                        </div>
                    </div>
                    <span v-for="board in boards" :key="board._id">
                        <board-preview :board="board" />
                    </span>
                    <img src="../assets/imgs/img-1.jpg" />
                </div>
            </div>
        </article>
    </section>
</template>
<script>
import boardPreview from '../cmps/board-preview.vue'
import appHeader from '../cmps/app-header.vue'
import { boardService } from '../services/board-service'

export default {
    name: 'board-app',
    // props: { type: Object },
    data() {
        return {
            newBoard: null,
            isCreateModalOpen: false,
            currBg: '#0079BF',
            colors: [
                { name: 'Blue', code: '#0079BF' },
                { name: 'Orange', code: '#D29034' },
                { name: 'Green', code: '#509939' },
                { name: 'Red', code: '#B04733' },
                { name: 'Purple', code: '#88619E' },
            ],
            imgs: [
                { url: '../assets/imgs/img-1.jpg', name: '' },
                { url: '../assets/imgs/img-2.jpg', name: '' },
                { url: '../assets/imgs/img-3.jpg', name: '' },
                { url: '../assets/imgs/img-4.jpg', name: '' },
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
        pickBg(code) {
            this.newBoard.style.background = code
            this.currBg = code
        },
        createBoard() {
            this.$store.dispatch({ type: 'board', action: 'save', board: this.newBoard })
            this.closeModal()
            // this.$router.push('/board/' + this.currBoard._id)
        },
    },
    computed: {
        boards() {
            return this.$store.getters.boards
        },
        currBoard() {
            return this.$store.getters.board
        },
        background() {
            if (this.board.style.background.length > 10) {
                return `background-image: url('${this.currBg}')`
            } else {
                return `background-color: ${this.currBg}`
            }
        },
    },
    unmounted() {},
    components: {
        boardPreview,
        appHeader,
    },
}
</script>
