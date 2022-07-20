<template>
    <section class="app-header full">
        <section class="nav-bar flex">
            <section class="left-side flex">
                <h1 class="logo">Frello</h1>
                <ul class="nav-links flex clean-list">
                    <!-- <li class="menu" @click="modal">
                        Workspaces<span><img :src="arrowImg" /></span>
                    </li> -->
                    <li v-for="btn in navBtns" :key="btn.name" :class="{ opened: btn.isOpen, 'create-btn': btn.name === 'Create' }">
                        <div class="nav-btn" @click="toggleDropdown(btn.name)">
                        <span>
                            <span>{{ btn.name }}</span>
                            <span v-if="btn.name !== 'Create'"><img :src="arrowImg" /></span>
                        </span>
                        </div>
                        <nav-dropdown v-if="btn.isOpen" v-click-outside="toggleDropdown" :btn="btn" />
                    </li>
                    <!-- <li class="create-btn">
                        <div class="nav-btn" @click="toggleDropdown('Create')">
                        Create
                        </div>
                        <nav-dropdown v-if="createBtn.isOpen" v-click-outside="toggleDropdown" :btn="createBtn" />
                    </li> -->
                </ul>
            </section>
            <section class="right-side flex align-center">
                <span class="info-btn"><img :src="infoImg" /></span>
            </section>
        </section>
    </section>
</template>
<script>
import router from '../router/index.js'
import { clickOutsideDirective } from '../directives/index.js'
import navDropdown from './nav-dropdown.vue'
export default {
    name: 'app-header',
    data() {
        return {
            arrowImg: 'https://www.svgrepo.com/show/145159/down-arrow.svg',
            infoImg: 'https://www.svgrepo.com/show/26894/info.svg',
            currOpenedDropdown: null,
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
                    data: '',
                },
            ],
            // createBtn: {
            //     name: 'Create',
            //     isOpen: false,
            //     data: '',
            // },
        }
    },
    methods: {
        toggleDropdown(name = '') {
            // this.isDropdownOpen = !this.isDropdownOpen
            this.navBtns.map(btn => (btn.isOpen = false))
            if (!name) return
            const idx = this.navBtns.findIndex(btn => btn.name === name)
            this.navBtns[idx].isOpen = true
            this.currOpenedDropdownIdx = idx
        },
        // closeDropdown() {
        //     this.navBtns[currOpenedDropdownIdx].isOpen = false
        //     this.currOpenedDropdown = null
        // },
    },
    components: {
        navDropdown,
    },
}
</script>

<style>
.modal {
    background-color: rgb(130, 130, 130);
    width: 300px;
    border-radius: 3px;
    height: 50px;
    position: absolute;
    top: 44px;
}
</style>
