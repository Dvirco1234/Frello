<template>
    <section class="create-board-modal" :class="{'in-header': isHeaderModal}">
        <header class="flex align-center justify-center">
            <span v-if="isHeaderModal" @click="goBack" class="go-back flex align-center"
                ><img class="go-back" src="../assets/back-icon.svg"
            /></span>
            <h4>Create board</h4>
            <span @click="closeModal" class="flex align-center"
                ><img class="close-modal" src="../assets/close.svg"
            /></span>
        </header>
        <main>
            <section class="flex justify-center">
                <div class="board-bgc-preview flex justify-center" :style="background">
                    <img src="../assets/board-preview-skeleton.svg" />
                </div>
            </section>
            <section class="bgc-pick">
                <h4>Background</h4>
                <div class="imgs flex space-between">
                    <button
                        class="img-pick"
                        v-for="img in imgs"
                        :style="'background-image: url(' + img + ')'"
                        :key="img"
                        @click="pickBg(img)"
                    >
                        <span class="screen"></span>
                        <span v-if="img === currBg" class="flex align-center justify-center icon-sm i-check"></span>
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
                        <span class="screen"></span>
                        <span
                            v-if="color.code === currBg"
                            class="flex align-center justify-center icon-sm i-check"
                        ></span>
                    </button>
                    <button class="more-colors flex align-center justify-center" @click="moreModalOpen = true">
                        <span class="flex justify-center"><img class="icon" src="../assets/more-horiz.svg" /></span>
                    </button>
                </div>
                <h4 class="board-title">Board title<span>*</span></h4>
                <form @submit.prevent="createBoard">
                    <input v-focus type="text" v-model="newBoard.title" />
                    <p v-if="!newBoard.title"><span>👋</span>Board title is required</p>
                    <button class="create-btn" :disabled="!newBoard.title">Create</button>
                </form>
                <more-modal v-if="moreModalOpen" @close-cover-modal="moreModalOpen = false" @pick-img="pickBg" />
            </section>
            <!-- <img src="../assets/imgs/img-2.jpg" alt=""> -->
        </main>
    </section>
</template>
<script>
import moreModal from './cover-modal.vue'
import { boardService } from '../services/board-service'

export default {
    name: '',
    // props: { imgs: Array, colors: Array, newBoard: Object },
    props: { isHeaderModal: Boolean },
    data() {
        return {
            newBoard: null,
            currBg: '#0079BF',
            moreModalOpen: false,
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
        }
    },
    created() {
        this.newBoard = boardService.getEmpty()
    },
    methods: {
        closeModal() {
            this.$emit('closeModal')
        },
        pickBg(code) {
            this.newBoard.style.background = code
            this.currBg = code
        },
        // createBoard() {
        //     this.$emit('createBoard', this.newBoard)
        // },
        async createBoard() {
            this.closeModal()
            const newBoard = await this.$store.dispatch({ type: 'board', action: 'save', board: this.newBoard })
            this.$router.push('/board/' + newBoard._id)
            this.newBoard = boardService.getEmpty()
        },
        goBack() {
            this.$emit('goBack')
        }
    },
    computed: {
        background() {
            if (this.currBg.length > 10) {
                return `background-image: url('${this.currBg}')`
            } else {
                return `background-color: ${this.currBg}`
            }
        },
    },
    unmounted() {},
    components: { moreModal },
}
</script>
