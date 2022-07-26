<template>
    <section class="board-menu">
        <section v-if="page === 'Menu'" class="menu">
            <header class="flex flex-center">
                <p>Menu</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
            </header>
            <ul class="clean-list">
                <li class="flex" @click="page = 'backgroundMenu'">
                    <div class="bg" :style="background"></div>
                    Change background
                </li>
            </ul>
        </section>

        <section v-else-if="page === 'backgroundMenu'">
            <header class="flex flex-center">
                <p>Change background</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
                <span class="back-btn" @click="page = 'Menu'"></span>
            </header>
            <main class="flex justify-center">
                <div class="photos" @click="page = 'photosMenu'">
                    <img class="image" src="../assets/photos-thumbnail.jpg">
                    <div class="title">Photos</div>
                </div>
                <div class="colors" @click="page = 'colorsMenu'">
                    <img class="image" src="../assets/colors.jpg" />
                    <div class="title">Colors</div>
                </div>
            </main>
        </section>

        <section v-else-if="page === 'colorsMenu'">
            <header class="flex flex-center">
                <p>Colors</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
                <span class="back-btn" @click="page = 'backgroundMenu'"></span>
            </header>
            <main class="bg-container">
                <div v-for="color in colors" class="image" :style="{ backgroundColor: color }" @click="changeBg(color)">
                </div>
            </main>
        </section>

        <section v-else-if="page === 'photosMenu'">
            <header class="flex flex-center">
                <p>Photos by Unsplash</p>
                <span class="close-modal icon-lg i-close" @click.stop="closeMenu"></span>
                <span class="back-btn" @click="page = 'backgroundMenu'"></span>
            </header>
            <main class="bg-container">
                <img v-for="image in images" class="image" :src="image" @click="changeBg(image)">

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
            page: 'Menu',
            colors: ['#0079bf', '#d29034', '#519839', '#b04632', '#89609e', '#cd5a91', '#4bbf6b', '#00aecc', '#838c91'],
            images: [
                'https://images.unsplash.com/photo-1658494787703-ac2062c5b6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
                'https://images.unsplash.com/photo-1658246944434-04b7ec2cb7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
                'https://images.unsplash.com/photo-1658211260722-416576a2f1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
                'https://images.unsplash.com/photo-1654597718404-76d724a30d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
                'https://images.unsplash.com/photo-1653641563300-742183619684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
                'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1536x1920/14102bbfca8c4a7cbe28d1d4917545bb/photo-1644410910976-e2ad19f7a2d3.jpg',
            ],

        }
    },
    created() { },
    methods: {
        closeMenu() {
            this.$emit('closeMenu')
        },
        changeBg(bg) {
            this.$store.dispatch({ type: 'setState', action: 'setBg', background: bg })
        },
    },
    computed: {
        background() {
            if (this.boardImg.length > 10) {
                return `background-image: url('${this.boardImg}')`
            } else {
                return `background-color: ${this.boardImg}`
            }
        },
    },
    unmounted() { },
    components: {},
}
</script>
