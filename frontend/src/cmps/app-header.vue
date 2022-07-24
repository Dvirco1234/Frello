<template>
    <section class="app-header full">
        <section class="nav-bar flex">
            <section class="left-side flex align-center">
                <h1 class="logo flex" @click="$router.push('/')"><span><img class="icon svg-img" src="../assets/trello-brand.svg">Frello</span></h1>
                <ul class="nav-links flex clean-list">
                    <!-- <li class="menu" @click="modal">
                        Workspaces<span><img :src="arrowImg" /></span>
                    </li> -->
                    <li v-for="btn in navBtns" :key="btn.name" :class="{ opened: btn.isOpen, 'create-btn': btn.name === 'Create' }">
                        <div class="nav-btn flex align-center" @click="toggleDropdown(btn.name)">
                            {{ btn.name }}
                            <span v-if="btn.name !== 'Create'" class="flex flex-center"><img class="svg-img" src="../assets/arrow-down.svg" /></span>
                        </div>
                        <nav-dropdown v-if="btn.isOpen" v-click-outside="toggleDropdown" :btn="btn" 
                            @toggleDropdown="toggleDropdown"/>
                    </li>
                </ul>
            </section>
            <section class="right-side flex align-center">
                <span class="info-btn flex align-center svg-img"><img :src="infoImg" /></span>
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
            // arrowImg: 'https://www.svgrepo.com/show/145159/down-arrow.svg',
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
