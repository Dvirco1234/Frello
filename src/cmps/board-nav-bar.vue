<template>
    <section class="board-nav-bar flex align-center space-between">
        <div class="left-nav flex align-center">
            <div class="board-name">
                <input type="text" v-model="boardTitle" @blur="saveBoardTitle" />
            </div>
            <div
                class="mark-board-starred flex align-center justify-center"
                @click="toggleBoardStarred"
                @mouseover="isStarHovered = true"
                @mouseleave="isStarHovered = false"
            >
                <span v-if="!board.isStarred || isStarHovered" class="star-empty flex align-center"
                    ><img class="icon" src="../assets/star-empty.svg"
                /></span>
                <span v-else class="star-full flex align-center"
                    ><img class="icon" src="../assets/star-full.svg"
                /></span>
            </div>
            <span class="board-header-divider"></span>
            <div class="board-members flex flex-center">
                <container v-if="board.members.length" behaviour="copy" style="height: 32px" class="members-container" orientation="horizontal" group-name="3" :get-child-payload="getChildPayload">
                    <draggable @mousedown="this.$store.commit({ type: 'memberDrag', isDrag: true })" style="height: 32px" class="avatar-container" v-for="member in board.members" :key="member._id" :title="member.fullname">
                        <img v-if="member.imgUrl" :src="member.imgUrl"/>
                        <!-- <span v-else>{{ member.fullname.split(' ')[0].split('')[0] + member.fullname.split(' ')[1].split('')[0] }}</span> -->
                    </draggable>
                </container>
                <!-- <span v-for="member in board.members" class="flex" @drag=""
                    ><img :src="member.imgUrl" :title="member.fullname + ' (' + member.username + ')'"
                /></span> -->
                <div class="add-members">
                    <button class="share-btn" title="Add members to board" @click="toggleMemberList">
                        <img src="../assets/share.svg" class="icon" />
                        Add
                    </button>
                    <div v-if="isMembersListOpen" class="members-list" v-click-outside="toggleMemberList">
                        <header class="flex align-center justify-center">
                            <h4>Select members</h4>
                            <button class="close-btn" @click="toggleMemberList">
                                <span class="icon-sm i-close close-icon"></span>
                            </button>
                        </header>
                        <ul class="users">
                            <li
                                v-for="user in users"
                                :key="user._id"
                                class="flex align-center"
                                @click="toggleMember(user)"
                            >
                                <span class="flex align-center">
                                    <img
                                        class="user-img"
                                        v-if="user"
                                        :src="user.imgUrl"
                                        :title="user.fullname + ' (' + user.username + ')'"
                                    />
                                    <img
                                        class="user-img"
                                        v-else
                                        src="../assets/guest-user.svg"
                                        title="Hello guest, please click to log in!"
                                    />
                                </span>
                                <div v-if="user" class="user-details">
                                    <h3>{{ user.fullname }}</h3>
                                    <p>{{ $filters.userName(user.username) }}</p>
                                    <!-- <span v-if="checkIfMember(user._id)"></span> -->
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="right-nav">
            <button @click="goToDashboard"><img src="../assets/dashboard.svg" class="icon" /> Dashboard</button>
            <button class="menu-btn" @click="toggleMenuModal">
                <img src="../assets/more-horiz.svg" class="icon" /> Show menu
            </button>
        </div>
        <board-menu
            @closeMenu="isMenuOpen = false"
            :boardImg="board.style.background"
            :activities="board.activities"
            :isMenuOpen="isMenuOpen"
        />
    </section>
</template>
<script>
import boardMenu from './board-menu.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
    name: 'board-nav-bar',
    props: { board: Object },
    data() {
        return {
            isMenuOpen: false,
            isBoardStarred: false,
            isStarHovered: false,
            boardTitle: this.board.title,
            isMembersListOpen: false,
            // boardToEdit: JSON.parse(JSON.stringify(this.board)),
            // members: this.boardMembers,
        }
    },
    created() {
        this.isBoardStarred = this.board.isStarred
    },
    methods: {
        goToDashboard() {
            this.$router.push(this.board._id + '/dashboard')
        },
        toggleMenuModal() {
            this.isMenuOpen = !this.isMenuOpen
            this.isFilterOpen = false
        },
        toggleBoardStarred() {
            this.isBoardStarred = !this.isBoardStarred
            this.$emit('toggleStarred')
        },
        toggleMemberList() {
            // console.log('users:', this.users)
            this.isMembersListOpen = !this.isMembersListOpen
        },
        toggleMember(user) {
            this.$emit('addMemberToBoard', user)
        },
        saveBoardTitle() {
            this.$emit('change-board-title', this.boardTitle)
        },
        //     saveBoardTitle(e) {
        //   // const title = e.target.value
        //   this.$emit('change-board-title', title)
        // }
        getChildPayload(idx) {
            return this.$store.getters.boardMembers[idx]
        },

    },
    computed: {
        users() {
            return this.$store.getters.users.filter(user => {
                const idx = this.boardMembers.findIndex(bm => bm._id === user._id)
                return idx === -1
            })
            // const allMembers = this.$store.getters.users
            // const boardMembers = this.$store.getters.boardMembers
            // return allMembers.filter(member => {
            //     const idx = boardMembers.findIndex(bm => bm._id === member._id)
            //     return idx === -1
            // })
        },
        boardMembers() {
            return this.$store.getters.boardMembers
        },
        boardCreatedBy() {
            return this.$store.getters.boardCreatedBy
        },
    },
    unmounted() {},
    components: {
        boardMenu,
        Container,
        Draggable
    },
}
</script>
