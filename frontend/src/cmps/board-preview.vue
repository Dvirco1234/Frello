<template>
    <section class="board-preview flex flex-col" @click="goToBoard" :style="background">
        <div class="bg-screen">
            <div v-if="board.isTemplate" class="template"><span class="flex justify-center align-center">Template</span></div>
            <p>{{ board.title }}</p>
            <span v-if="!board.isTemplate" @click.stop="toggleBoardStarred">
              <span
                  v-if="!isBoardStarred"
                  class="board-star icon-sm i-star-empty"
                  title="Click to star this board. It will be added to your starred list."
              ></span>
              <span v-else class="board-star starred icon-sm i-star-full"></span>
            </span>
        </div>
    </section>
</template>
<script>
export default {
    name: 'board-preview',
    props: {
        board: {
            type: Object,
        },
    },
    data() {
        return {
          isBoardStarred: null,
        }
    },
    created() {
      this.isBoardStarred = this.board.isStarred
    },
    methods: {
        goToBoard() {
            if(this.board.isTemplate) return this.createBoard()

            this.$router.push('/board/' + this.board._id)
            console.log('this.board:', this.board)
        },
        toggleBoardStarred() {
            this.isBoardStarred = !this.isBoardStarred
            console.log('toggle');
            this.$emit('toggleStarred', this.board)
        },
        createBoard() {
            const board = JSON.parse(JSON.stringify(this.board))
            delete board._id
            board.isTemplate = false
            this.$emit('createFromTemlate', board)
        },
    },
    computed: {
        creationTime() {
            return new Date(this.board.createdAt).toLocaleString('he')
        },
        background() {
            if (this.board.style.background.length > 10) {
                return `background-image: url('${this.board.style.background}')`
            } else {
                return `background-color: ${this.board.style.background}`
            }
        },
    },
    unmounted() {},
    components: {},
}
</script>
<style></style>
