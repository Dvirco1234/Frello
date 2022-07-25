<template>
    <section class="board-preview flex flex-col" @click="goToBoard" :style="background">
        <div class="bg-screen">
            <p>{{ board.title }}</p>
            <span @click.stop="toggleBoardStarred">
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
            this.$router.push('/board/' + this.board._id)
            console.log('this.board:', this.board)
        },
        toggleBoardStarred() {
            this.isBoardStarred = !this.isBoardStarred
            console.log('toggle');
            this.$emit('toggleStarred', this.board)
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
