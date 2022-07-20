<template>
    <section class="board-nav-bar">
        <board-filter />
    </section>
</template>
<script>
import boardFilter from './board-filter.vue'
export default {
    name: 'board-nav-bar',
    props: { type: Object },
    data() {
        return {}
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
    components: {
        boardFilter,
    }
}
</script>