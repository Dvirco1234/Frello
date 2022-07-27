<template>
  <section class="board-menu">
    <section v-if="page === 'Menu'" class="menu">
      <header class="flex flex-center">
        <p>Menu</p>
        <span
          class="close-modal icon-lg i-close"
          @click.stop="closeMenu"
        ></span>
      </header>

      <ul class="clean-list">
        <li class="flex" @click="page = 'backgroundMenu'">
          <div class="bg" :style="background"></div>
          Change background
        </li>
        <div class="list-saperator">
          <li class="flex activity-title">
            <span class="flex flex-center icon-sm i-activity"></span>
            Activity
          </li>

          <!-- <div class="user-activity flex">
                        <img
                            src="https://trello-members.s3.amazonaws.com/62d05e2907aa7637f2b3a943/8fb46202f6e9c14172ad453caec4860a/50.png" />
                        <div class="txt-container">
                            <span class="username">Shalhev Nagauker</span>
                            changed the background of this board
                            <div class="date">13 minutes ago</div>
                        </div>
                    </div> -->

          <div class="user-activity flex" v-for="activity in activities">
            <img
              :src="activity.byMember.imgUrl"
              :title="
                activity.byMember.fullname +
                ' (' +
                activity.byMember.username +
                ')'
              "
            />
            <div class="txt-container">
              <span class="username">{{ activity.byMember.fullname }}</span>
              {{ activity.txt }} on {{ activity.task.title }}
              <div class="date">{{ time2TimeAgo(activity.createdAt) }}</div>
            </div>
          </div>
        </div>
      </ul>
    </section>

    <section v-else-if="page === 'backgroundMenu'">
      <header class="flex flex-center">
        <p>Change background</p>
        <span
          class="close-modal icon-lg i-close"
          @click.stop="closeMenu"
        ></span>
        <span class="back-btn" @click="page = 'Menu'"></span>
      </header>
      <main class="flex justify-center">
        <div class="photos" @click="page = 'photosMenu'">
          <img class="image" src="../assets/photos-thumbnail.jpg" />
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
        <span
          class="close-modal icon-lg i-close"
          @click.stop="closeMenu"
        ></span>
        <span class="back-btn" @click="page = 'backgroundMenu'"></span>
      </header>
      <main class="bg-container">
        <div
          v-for="color in colors"
          class="image"
          :style="{ backgroundColor: color }"
          @click="changeBg(color)"
        ></div>
      </main>
    </section>

    <section v-else-if="page === 'photosMenu'">
      <header class="flex flex-center">
        <p>Photos by Unsplash</p>
        <span
          class="close-modal icon-lg i-close"
          @click.stop="closeMenu"
        ></span>
        <span class="back-btn" @click="page = 'backgroundMenu'"></span>
      </header>
      <input
        class="query-input"
        type="text"
        placeholder="Search Unsplash for photos"
        v-focus
        v-model="queryString"
        @input="debaunceSearch"
      />
      <main class="bg-container">
        <img
          v-if="!queryString"
          v-for="image in images"
          class="image"
          :src="image"
          @click="changeBg(image)"
        />
        <img
          v-else
          v-for="(url, idx) in queryPhotos"
          :key="idx"
          class="image"
          :src="url"
          @click="changeBg(url)"
        />
      </main>
    </section>
  </section>
</template>
<script>
import { boardService } from '../services/board-service'
export default {
  name: 'board-menu',
  props: { boardImg: String, activities: Object },
  data() {
    return {
      page: 'Menu',
      colors: [
        '#0079bf',
        '#d29034',
        '#519839',
        '#b04632',
        '#89609e',
        '#cd5a91',
        '#4bbf6b',
        '#00aecc',
        '#838c91',
      ],
      queryString: '',
      debaunceTimeout: null,
      queryPhotos: [],
      images: [
        'https://images.unsplash.com/photo-1658494787703-ac2062c5b6ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1658246944434-04b7ec2cb7f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1658211260722-416576a2f1ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1654597718404-76d724a30d24?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1653641563300-742183619684?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/1536x1920/14102bbfca8c4a7cbe28d1d4917545bb/photo-1644410910976-e2ad19f7a2d3.jpg',
        'https://images.unsplash.com/photo-1485738422979-f5c462d49f74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1554401922-3ac1c68b2715?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1571210774504-471a564d5bf0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1566412608885-68c9e5500417?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1454372182658-c712e4c5a1db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1562016600-ece13e8ba570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1522997169209-1629f3f89fdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg',
        'https://images.unsplash.com/photo-1504716325983-cb91edab7e7d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80',
      ],
    }
  },
  created() {},
  methods: {
    closeMenu() {
      this.$emit('closeMenu')
    },
    changeBg(bg) {
      this.$store.dispatch({
        type: 'setState',
        action: 'setBg',
        background: bg,
      })
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
    time2TimeAgo(ts) {
      const monthNames = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]
      var time = new Date(ts)
      var nowTs = Date.now()
      var seconds = (nowTs - ts) / 1000

      // more than two days
      if (seconds > 2 * 24 * 3600) {
        return (
          monthNames[time.getMonth()] +
          ' ' +
          time.getDate() +
          ' at ' +
          time.getHours() +
          ':' +
          time.getMinutes()
        )
      }
      // a day
      if (seconds > 24 * 3600) {
        return 'yesterday at ' + time.getHours() + ':' + time.getMinutes()
      }

      if (seconds > 3600 * 2) {
        return Math.floor((seconds / 3600) * 2) + ' hours ago'
      }
      if (seconds > 3600) {
        return 'an hour ago'
      }
      if (seconds > 60) {
        return Math.floor(seconds / 60) + ' minutes ago'
      }
      if (seconds < 60) {
        return Math.floor(seconds) + ' seconds ago'
      }
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
  unmounted() {},
  components: {},
}
</script>
