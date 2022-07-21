<template>
    <section class="board-nav-bar flex align-center">
        <div class="board-name">
            <input type="text" v-model="board.title">
        </div>
        <div class="mark-board-starred flex align-center justify-center">
            <span v-if="board.isStarred" class="star-full flex align-center"><img class="icon" src="../assets/star-full.svg"></span>
            <span v-else class="star-empty flex align-center"><img class="icon" src="../assets/star-empty.svg"></span>
        </div>
        <span class="board-header-divider"></span>
        <button @click="toggleFilterModal">Filter</button>
        <board-filter v-if="isFilterOpen"/>
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
        }
    },
    created() {},
    methods: {
        toggleFilterModal() {
            this.isFilterOpen = !this.isFilterOpen
        }
    },
    computed: {},
    unmounted() {},
    components: {
        boardFilter,
    },
}
</script>
