<template>
  <section class="cover-modal sidebar-modal" v-click-outside="closeCoverModal">
    <header class="flex justify-center">
      <p>Cover</p>
      <img
        class="close-modal"
        src="../assets/xmark-solid.svg"
        alt="close"
        @click.stop="closeCoverModal"
      />
    </header>
    <main class="modal-main flex flex-col" v-if="!searchingPhotos">
      <h4>Colors</h4>
      <ul class="cover-color-list clean-list grid">
        <li v-for="color in colors" :key="color">
          <div
            class="cover-color"
            @click="setCover(color)"
            :style="{ backgroundColor: color }"
          ></div>
        </li>
      </ul>
      <button @click="setCover('reset')">Reset</button>
      <h4>Photos from Unsplash</h4>
      <ul class="default-img-list clean-list grid">
        <li v-for="(image, idx) in images" :key="idx">
          <img @click="setCover(image)" class="image" :src="image" />
        </li>
      </ul>
      <button @click.stop="searchingPhotos = true">Search for photos</button>
    </main>
    <aside v-else class="search-photos-container">
      <input
        class="query-input"
        type="text"
        placeholder="Search Unsplash for photos"
        v-focus
        v-model="queryString"
        @input="debaunceSearch"
      />
      <h4>Results</h4>
      <article>
        <ul class="query-photo-list clean-list grid">
          <li v-for="(url, idx) in queryPhotos" :key="idx">
            <img @click="setCover(url)" :src="url" alt="Unsplash photo" />
          </li>
        </ul>
      </article>
    </aside>
  </section>
</template>
<script>
import { boardService } from '../services/board-service'
import { utilService } from '../services/util-service'
export default {
  name: 'cover-modal',
  // props: {type: Object},
  data() {
    return {
      searchingPhotos: false,
      debaunceTimeout: null,
      queryString: '',
      queryPhotos: [],

      colors: [
        '#7BC86C',
        '#F5DD2A',
        '#FAAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#EFEFEF',
        '#6DECA9',
        '#F78DD4',
        '#16243D',
      ],
      images: [
        'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1557246565-8a3d3ab5d7f6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=944&q=80',
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1444464666168-49d633b86797?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
      ],
    }
  },
  created() {},
  methods: {
    closeCoverModal() {
      this.$emit('close-cover-modal')
    },
    async getPhotos() {
      try {
        const res = await boardService.getQueryPhotos(this.queryString)
        this.queryPhotos = res
      } catch (err) {
        console.error(err)
      }
    },
    debaunceSearch() {
      clearTimeout(this.debaunceTimeout)
      this.debaunceTimeout = setTimeout(this.getPhotos, 1200)
    },
    setCover(cover) {
      const { groupId } = this.$route.params
      const { taskId } = this.$route.params
      this.$store.dispatch({
        type: 'setState',
        action: 'setCover',
        groupId,
        taskId,
        cover,
      })
      this.closeCoverModal()
    },
  },
  computed: {},
  unmounted() {},
  components: {},
}
</script>
