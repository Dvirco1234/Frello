<template>
  <section class="board-nav-bar flex align-center space-between">
    <div class="left-nav flex align-center">
      <div class="board-name">
        <input type="text" v-model="boardTitle" @blur="saveBoardTitle" />
      </div>
      <div class="mark-board-starred flex align-center justify-center" @click="toggleBoardStarred"
        @mouseover="isStarHovered = true" @mouseleave="isStarHovered = false">
        <span v-if="!board.isStarred || isStarHovered" class="star-empty flex align-center"><img class="icon"
            src="../assets/star-empty.svg" /></span>
        <span v-else class="star-full flex align-center"><img class="icon" src="../assets/star-full.svg" /></span>
      </div>
      <span class="board-header-divider"></span>
      <div class="board-members flex flex-center">
        <span v-for="member in board.members" class="flex"><img :src="member.imgUrl" :title="member.fullname" /></span>
        <button class="share-btn">
          <img src="../assets/share.svg" class="icon" title="Share board" />
          Share
        </button>
      </div>
    </div>
    <div class="right-nav">
      <button @click="toggleFilterModal">
        <img src="../assets/filter.svg" class="icon" /> Filter
      </button>
      <button class="menu-btn" @click="toggleMenuModal">
        <img src="../assets/more-horiz.svg" class="icon" /> Show menu
      </button>
    </div>
    <board-filter v-if="isFilterOpen" />
    <board-menu v-if="isMenuOpen" @closeMenu="isMenuOpen = false" :boardImg="board.style.background"/>
  </section>
</template>
<script>
import boardFilter from './board-filter.vue';
import boardMenu from './board-menu.vue';
export default {
  name: 'board-nav-bar',
  props: { board: Object },
  data() {
    return {
      isFilterOpen: false,
      isMenuOpen: false,
      isBoardStarred: false,
      isStarHovered: false,
      boardTitle: this.board.title,
      // boardToEdit: JSON.parse(JSON.stringify(this.board)),
    }
  },
  created() {
    this.isBoardStarred = this.board.isStarred
  },
  methods: {
    toggleFilterModal() {
      this.isFilterOpen = !this.isFilterOpen
      this.isMenuOpen = false
    },
    toggleMenuModal() {
      this.isMenuOpen = !this.isMenuOpen
      this.isFilterOpen = false
    },
    toggleBoardStarred() {
      this.isBoardStarred = !this.isBoardStarred
      this.$emit('toggleStarred')
    },
    saveBoardTitle() {
      this.$emit('change-board-title', title)
    },
    //     saveBoardTitle(e) {
    //   // const title = e.target.value
    //   this.$emit('change-board-title', title)
    // }
  },
  computed: {},
  unmounted() { },
  components: {
    boardFilter,
    boardMenu,
  },
}
</script>
