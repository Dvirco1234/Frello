<template>
  <section class="app-header full">
    <section class="nav-bar flex">
      <section class="left-side flex">

        <h1 class="logo">Frello</h1>
        <ul class="nav-links flex clean-list">
          <li class="menu" @click="modal">Workspaces<span><img :src="arrowImg"></span>
          </li>
          <div class="modal" :class="{ hidden: isHidden }">ABC</div>
          <li>Recent<span><img :src="arrowImg"></span></li>
          <li>Starred<span><img :src="arrowImg"></span></li>
          <li>Templates<span><img :src="arrowImg"></span></li>
          <li class="create-btn">Create</li>
        </ul>
      </section>
      <section class="right-side flex align-center">
        <span class="info-btn"><img :src="infoImg"></span>
      </section>
    </section>
  </section>
</template>
<script>
import router from '../router/index.js'
import { clickOutsideDirective } from '../directives/index.js'
export default {
  name: 'app-header',
  data() {
    return {
      arrowImg: 'https://www.svgrepo.com/show/145159/down-arrow.svg',
      infoImg: 'https://www.svgrepo.com/show/26894/info.svg',
      isHidden: true
    }
  },
  methods: {
    modal() {
      this.isHidden = !this.isHidden
    }
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
