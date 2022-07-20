<template>
    <section class="nav-dropdown">
        <header class="flex align-center justify-center">
            <h4 v-if="btn">{{ btn.name }}</h4>
            <button @click="toggleDropdown">x</button>
        </header>
        <main>
            <article v-if="btn.name === 'Boards'" class="boards-nav">
                <div class="curr-board" v-for="board in boards">
                    <h4>{{board.name}}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>Frello Board</h4>
                    </div>
                </div>
            </article>
            <article v-if="btn.name === 'Recent'" class="recent-nav">
                <div class="recent-board" v-for="board in boards">
                    <h4>{{board.name}}</h4>
                    <div class="board-link flex">
                        <div class="icon flex align-center justify-center">F</div>
                        <h4>Frello Board</h4>
                    </div>
                </div>
            </article>
        </main>
        <footer>
            <slot name="footer"></slot>
        </footer>
    </section>
</template>
<script>
export default {
    name: 'nav-dropdown',
    props: { btn: Object },
    data() {
        return {
            boards: [{name: 'Current Board'}, {name: 'Your Boards'}]
        }
    },
    created() {
        console.log(this.btn);
    },
    methods: {
        toggleDropdown() {
            // this.$emit('toggleDropdown', this.btn.name)
        }
    },
    computed: {
        // this.$store.getters.
    },
    unmounted() {},
    components: {},
}
</script>
