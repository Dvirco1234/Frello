<template>
    <section class="login-signup flex align-center">
        <h1 class="logo flex justify-center" @click="$router.push('/')">
            <span class="flex align-center"><img class="icon svg-img" src="../assets/trello-brand.svg" /> Frello</span>
        </h1>
        <main>
            <article class="login-form flex flex-col align-center">
                <h2 v-if="!isNewUser">Log in to Frello</h2>
                <h2 v-else>Sign up to Frello</h2>
                <form v-if="!isNewUser" class="flex flex-col align-center" @submit.prevent="login">
                    <input type="text" v-model="credentials.username" placeholder="Enter username" />
                    <input type="password" v-model="credentials.password" placeholder="Enter password" />
                    <button>Log in</button>
                </form>
                <form v-else class="flex flex-col align-center" @submit.prevent="signup">
                    <input type="text" v-model="signupInfo.fullname" placeholder="Enter full name" />
                    <input type="text" v-model="signupInfo.username" placeholder="Enter username" />
                    <input type="password" v-model="signupInfo.password" placeholder="Enter password" />
                    <button>Sign up</button>
                </form>
                <div class="flex flex-col status" v-if="!isNewUser">
                    <p class="seperator">OR</p>
                    <div class="bottom-form-separator"></div>
                    <p @click="toggleStatus" class="toggle-status">Sign up for an account</p>
                </div>
                <div class="flex flex-col status" v-else>
                    <p class="seperator">Already have an account?</p>
                    <div class="bottom-form-separator"></div>
                    <p @click="toggleStatus" class="toggle-status">Log in</p>
                </div>
            </article>
        </main>
        <img class="bg-img left" src="../assets/login-bg-left.svg" />
        <img class="bg-img right" src="../assets/login-bg-right.svg" />
    </section>
</template>
<script>
export default {
    name: 'login-signup',
    // props: { type: Object },
    data() {
        return {
            user: null,
            credentials: {
                username: '',
                password: '',
            },
            signupInfo: {
                fullname: '',
                username: '',
                password: '',
            },
            isNewUser: false,
        }
    },
    created() {
        const { act } = this.$route.params
        if(act === 'signup') this.isNewUser = true
    },
    methods: {
        toggleStatus() {
            this.isNewUser = !this.isNewUser
        },
        async login() {
            this.$store.dispatch({ type: 'login', userCred: this.credentials })
            this.$router.push('/board')
        },
        async signup() {
            console.log('sign');
            this.$store.dispatch({ type: 'signup', userCred: this.signupInfo })
            this.$router.push('/board')
        },
    },
    computed: {},
    unmounted() {},
    components: {},
}
</script>
