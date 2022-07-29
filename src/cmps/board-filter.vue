<template>
    <section class="board-filter">
        <h1>Filter</h1>
        <label for="search">
            Keyboard
            <input id="search" type="search" placeholder="Enter a keyboard...">
        </label>

        <label for="members">
            Members
        </label>

        <label for="due-date">
            Due date
        </label>

        <label for="labels">
            Labels
        </label>

    </section>
</template>
<script>
export default {
    name: '',
    props: { type: Object },
    data() {
        return {
            filterBy: {
                txt: '',
                members: [],
                dueDate: '',
                labels: [],
            }
        }
    },
    created() { },
    methods: {
        setFilter() {
            this.$emit('setFilter', this.filterBy)
        }
    },
    computed: {},
    unmounted() { },
    components: {},
}
</script>
