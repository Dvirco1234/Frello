<template>
    <section class="user-menu" v-click-outside="toggleDropdown">
        <header class="flex align-center justify-center">
            <h4>Account</h4>
            <button class="close-btn" @click="toggleDropdown">
                <!-- <span class="flex align-center"><img src="../assets/close.svg" /></span> -->
                <span class="icon-sm i-close close-icon"></span>
            </button>
        </header>
        <main>
            <section class="user flex">
                <div class="user-avatar">
                    <img class="user-img" v-if="user" :src="user.imgUrl" :title="user.fullname + ' (' + user.username + ')'" />
                    <img class="user-img" v-else src="../assets/guest-user.svg" title="Hello guest, please click to log in!" />
                </div>
                <div v-if="user" class="user-details">
                    <h3>{{user.fullname}}</h3>
                    <p>{{user.username}}</p>
                </div>
                <div v-else class="user-details">
                    <h3>Guest</h3>
                    <p>guest@guest.com</p>
                </div>
            </section>
            <section>
                <button class="user-menu-btn" v-if="user.username !== 'demo_user'" @click="logout">Log out</button>
                <button class="user-menu-btn" v-else @click="login">Log in</button>
            </section>
        </main>
    </section>
</template>
<script>
export default {
    name: 'user-menu',
    props: { user: Object },
    data() {
        return {}
    },
    created() {},
    methods: {
        toggleDropdown() {
            this.$emit('toggleUserMenu')
        },
        login() {
            this.$router.push('/login')
        },
        logout() {
            this.$store.dispatch({ type: 'logout'})
            this.toggleDropdown()
        },
    },
    computed: {},
    unmounted() {},
    components: {},
}
</script>
