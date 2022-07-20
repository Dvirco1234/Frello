<template>
    <section class="board-details">
        <board-nav-bar />
        <h1>board details</h1>
        <group-list :groups="board.groups"/>
    </section>
</template>
<script>
import boardNavBar from '../cmps/board-nav-bar.vue'
import groupList from '../cmps/group-list.vue'

export default {
    name: 'board-details',
    // props: { type: Object },
    data() {
        return {}
    },
    created() {},
    methods: {},
    unmounted() {},
    components: {
        boardNavBar,
        groupList,
    },
    computed: {
        board() {
            return this.$store.getters.board
        },
    },
}
</script>

<style>
.board-details {
    margin-bottom: 8px;
    overflow-x: auto;
    overflow-y: hidden;
    height: 100%;
}
</style>
