<template>
    <section class="board-nav-bar flex align-center space-between">
        <div class="left-nav flex align-center">
            <div class="board-name">
                <input type="text" v-model="board.title">
            </div>
            <div class="mark-board-starred flex align-center justify-center" @click="toggleBoardStarred" 
                @mouseover="isStarHovered=true" @mouseleave="isStarHovered=false">
                <span v-if="!board.isStarred || isStarHovered" class="star-empty flex align-center"><img class="icon" 
                        src="../assets/star-empty.svg"></span>
                <span v-else class="star-full flex align-center"><img class="icon"
                        src="../assets/star-full.svg"></span>
            </div>
            <span class="board-header-divider"></span>
            <div class="board-members flex flex-center">
                <span v-for="member in board.members" class="flex"><img :src="member.imgUrl" :title="member.fullname + ' (' + member.username + ')'"></span>
                <button class="share-btn"><img src="../assets/share.svg" class="icon" title="Share board"> Share</button>
            </div>
        </div>
        <div class="right-nav">
            <button @click="toggleFilterModal"><img src="../assets/filter.svg" class="icon"> Filter</button>
            <button class="menu-btn"><img src="../assets/more-horiz.svg" class="icon"> Show menu</button>
        </div>
        <board-filter v-if="isFilterOpen" />
    </section>
</template>
<script>
import boardFilter from './board-filter.vue'
export default {
    name: 'board-nav-bar',
    props: { board: Object },
    data() {
        return {
            isFilterOpen: false,
            isBoardStarred: false,
            isStarHovered: false,
        }
    },
    created() {
        this.isBoardStarred = this.board.isStarred
     },
    methods: {
        toggleFilterModal() {
            this.isFilterOpen = !this.isFilterOpen
        },
        toggleBoardStarred() {
            this.isBoardStarred = !this.isBoardStarred
            this.$emit('toggleStarred')
        }
    },
    computed: {},
    unmounted() { },
    components: {
        boardFilter,
    },
}
</script>
