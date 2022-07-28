<template>
    <section class="app-header full">
        <section class="nav-bar flex">
            <section class="left-side flex align-center">
                <h1 class="logo flex" @click="$router.push('/')">
                    <span><img class="icon svg-img" src="../assets/trello-brand.svg" />Frello</span>
                </h1>
                <ul class="nav-links flex clean-list">
                    <li
                        v-for="btn in navBtns"
                        :key="btn.name"
                        :class="{ opened: btn.isOpen, 'create-btn': btn.name === 'Create' }"
                    >
                        <div class="nav-btn flex align-center" @click="toggleDropdown(btn.name)">
                            {{ btn.name }}
                            <span v-if="btn.name !== 'Create'" class="flex flex-center"
                                ><img class="svg-img" src="../assets/arrow-down.svg"
                            /></span>
                        </div>
                        <nav-dropdown v-if="btn.isOpen" :btn="btn" @toggleDropdown="toggleDropdown" />
                    </li>
                </ul>
            </section>
            <section class="right-side flex align-center">
                <div class="search flex">
                    <span class="search-icon flex align-center"><img src="../assets/search.svg" /></span>
                    <input type="text" class="search-input" placeholder="Search" />
                </div>
                <!-- <span class="info-btn flex align-center svg-img"><img :src="infoImg" /></span> -->
                <span class="user-img flex" @click="toggleUserMenu">
                    <img v-if="user" :src="user.imgUrl" :title="user.fullname + ' (' + user.username + ')'"/>
                    <img v-else src="../assets/guest-user.svg" title="Hello guest, please click to log in!"/>
                </span>
                <user-modal v-if="isUserMenuOpen" :btn="btn" @toggleDropdown="toggleDropdown" />
            </section>
        </section>
    </section>
</template>
<script>
import router from '../router/index.js'
import { clickOutsideDirective } from '../directives/index.js'
import navDropdown from './nav-dropdown.vue'
import userModal from './user-modal.vue'
export default {
    name: 'app-header',
    data() {
        return {
            // arrowImg: 'https://www.svgrepo.com/show/145159/down-arrow.svg',
            infoImg: 'https://www.svgrepo.com/show/26894/info.svg',
            currOpenedDropdown: null,
            isUserMenuOpen: false,
            navBtns: [
                {
                    name: 'Boards',
                    isOpen: false,
                    data: '',
                },
                {
                    name: 'Recent',
                    isOpen: false,
                    data: '',
                },
                {
                    name: 'Starred',
                    isOpen: false,
                    data: '',
                },
                {
                    name: 'Templates',
                    isOpen: false,
                    data: '',
                },
                {
                    name: 'Create',
                    isOpen: false,
                    isCreateModalOpen: false,
                    data: '',
                },
            ],
        }
    },
    methods: {
        toggleDropdown(name = '') {
            this.navBtns.map(btn => (btn.isOpen = false))
            if (!name) return
            const idx = this.navBtns.findIndex(btn => btn.name === name)
            this.navBtns[idx].isOpen = true
            this.currOpenedDropdownIdx = idx
        },
        toggleUserMenu() {
            this.isUserMenuOpen = !this.isUserMenuOpen
        },
    },
    components: {
        navDropdown,
        userModal,
    },
}
</script>

<style>
/* .modal {
    background-color: rgb(130, 130, 130);
    width: 300px;
    border-radius: 3px;
    height: 50px;
    position: absolute;
    top: 44px;
} */
</style>
