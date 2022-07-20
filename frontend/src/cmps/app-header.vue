<template>
  <section class="app-header full">
    <section class="nav-bar flex">
      <section class="left-side flex">

        <h1 class="logo">Frello</h1>
        <ul class="nav-links flex clean-list">
          <li>Workspaces<span><img :src="arrowImg"></span></li>
          <li>Recent<span><img :src="arrowImg"></span></li>
          <li>Starred<span><img :src="arrowImg"></span></li>
          <li>Templates<span><img :src="arrowImg"></span></li>
          <li class="create-btn">Create</li>
          <!-- <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/board">Boards</router-link></li>
        <li><router-link to="/login">Login</router-link></li> -->
        </ul>
      </section>
      <section class="right-side flex  align-center">
        <span class="info-btn"><img :src="infoImg"></span>
      </section>
    </section>
  </section>
</template>
<script>
import router from '../router/index.js'
export default {
  name: 'app-header',
  data() {
    return {
      arrowImg: 'https://www.svgrepo.com/show/145159/down-arrow.svg',
      infoImg: 'https://www.svgrepo.com/show/26894/info.svg'
    }
  },
}


</script>
