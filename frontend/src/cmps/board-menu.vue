<template>
    <section class="board-menu">
        <section v-if="!backgroundMenu & !colorsMenu" class="menu">
            <header class="flex flex-center">
                <p>Menu</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
            </header>
            <ul class="clean-list">
                <li class="flex" @click="backgroundMenu = true">
                    <div class="bg" :style="background"></div>
                    Change background
                </li>
            </ul>
        </section>
        <section v-else-if="backgroundMenu">
            <header class="flex flex-center">
                <p>Change background</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
                <span class="back-btn" @click="backgroundMenu = false"></span>
            </header>
            <main class="flex justify-center">
                <div class="photos">
                    <img src="../assets/photos-thumbnail.jpg">
                    <div class="title">Photos</div>
                </div>
                <div class="colors" @click="(colorsMenu = true) && (backgroundMenu = false)">
                    <img src="../assets/colors.jpg" />
                    <div class="title">Colors</div>
                </div>
            </main>
        </section>
        <section v-if="colorsMenu">
            <header class="flex flex-center">
                <p>Colors</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
                <span class="back-btn" @click="colorsMenu = false"></span>
            </header>
            <main class="flex justify-center">
                <div class="colors">
                    colors
                </div>
            </main>
        </section>



    </section>
</template>
<script>
export default {
    name: 'board-menu',
    props: { boardImg: String },
    data() {
        return {
            backgroundMenu: false,
            colorsMenu: false
        }
    },
    created() { },
    methods: {
        closeMenu() {
            this.$emit('closeMenu')
        }
    },
    computed: {
        background() {
            if (this.boardImg.length > 10) {
                return `background-image: url('${this.boardImg}')`
            } else {
                return this.boardImg
            }
        },
    },
    unmounted() { },
    components: {},
}
</script>
