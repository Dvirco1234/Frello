<template>
    <section class="user-menu nav-dropdown" v-click-outside="toggleDropdown">
        <header class="flex align-center justify-center">
            <h4>Account</h4>
            <button class="close-btn" @click="toggleDropdown">
                <span class="flex align-center"><img src="../assets/close.svg" /></span>
            </button>
        </header>
    </section>
</template>
<script>
export default {
    name: '',
    props: { type: Object },
    data() {
        return {}
    },
    created() {},
    methods: {},
    computed: {},
    unmounted() {},
    components: {},
}
</script>
