<template>
  <section class="create-board-modal">
    <header class="flex align-center justify-center">
      <h4>Create board</h4>
      <span @click="closeModal" class="flex align-center"
        ><img class="close-modal" src="../assets/close.svg"
      /></span>
    </header>
    <main>
      <section class="flex justify-center">
        <div class="board-bgc-preview flex justify-center" :style="background">
          <img src="../assets/board-preview-skeleton.svg" />
        </div>
      </section>
      <section class="bgc-pick">
        <h4>Background</h4>
        <div class="imgs flex space-between">
          <button
            class="img-pick"
            v-for="img in imgs"
            :style="'background-image: url(' + img + ')'"
            :key="img"
            @click="pickBg(img)"
          >
            <span class="screen"></span>
            <span
              v-if="img === currBg"
              class="flex align-center justify-center icon-sm i-check"
            ></span>
          </button>
        </div>
        <div class="colors flex space-between">
          <button
            class="color-pick"
            v-for="color in colors"
            :key="color.code"
            :style="{ backgroundColor: color.code }"
            :title="color.name"
            @click="pickBg(color.code)"
          >
            <span class="screen"></span>
            <span
              v-if="color.code === currBg"
              class="flex align-center justify-center icon-sm i-check"
            ></span>
          </button>
          <button class="more-colors flex align-center justify-center"  @click="moreModalOpen = true">
            <span class="flex justify-center"
              ><img class="icon" src="../assets/more-horiz.svg"
            /></span>
          </button>
        </div>
        <h4 class="board-title">Board title<span>*</span></h4>
        <form @submit.prevent="createBoard">
          <input v-focus type="text" v-model="newBoard.title" />
          <p v-if="!newBoard.title"><span>👋</span>Board title is required</p>
          <button class="create-btn" :disabled="!newBoard.title">Create</button>
        </form>
        <more-modal v-if="moreModalOpen" @close-cover-modal="moreModalOpen = false" @pick-img="pickBg"/>
      </section>
      <!-- <img src="../assets/imgs/img-2.jpg" alt=""> -->
    </main>
  </section>
</template>
<script>
import moreModal from './cover-modal.vue'
export default {
  name: '',
  props: { imgs: Array, colors: Array, newBoard: Object },
  data() {
    return {
      // newBoard: null,
      currBg: '#0079BF',
      moreModalOpen: false,
    }
  },
  created() {
    console.log(this.newBoard)
  },
  methods: {
    closeModal() {
      this.$emit('closeModal')
    },
    pickBg(code) {
      this.newBoard.style.background = code
      this.currBg = code
    },
    createBoard() {
      this.$emit('createBoard', this.newBoard)
    },
  },
  computed: {
    background() {
      if (this.currBg.length > 10) {
        return `background-image: url('${this.currBg}')`
      } else {
        return `background-color: ${this.currBg}`
      }
    },
  },
  unmounted() {},
  components: { moreModal },
}
</script>
