<template>
  <section class="home-page">
    <header class="homepage-header flex space-between">
      <div class="logo flex flex-center" @click="$router.push('/')"><img src="../assets/Frello.svg"></div>
      <ul class="flex clean-list align-center">
        <li>Login</li>
        <li class="free">Get Frello for free</li>
      </ul>

    </header>
    <div class="hero">
      <div class="left-side">
        <h1>Frello helps teams move work forward.</h1>
        <p>Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way
          your team works is unique—accomplish it all with Frello.</p>
        <button @click="$router.push('/board')">Start demo - it’s free</button>
      </div>
      <div class="right-side">
        <img src="../assets/hero.webp" alt="hero" />
      </div>

    </div>

    <div class="home-info flex flex-col align-center">
      <div class="content flex flex-col align-center">
        <h1>It’s more than work. It’s a way of working together.</h1>
        <p>Start with a Frello board, lists, and cards. Customize and expand with more features as your teamwork grows.
          Manage projects, organize tasks, and build team spirit—all in one place.</p>
        <button @click="$router.push('/board')">Try it now</button>
      </div>
      <img src="../assets/board.webp" alt="board">
    </div>
  </section>
</template>
<script>
export default {
  name: '',
  props: { type: Object },
  data() {
    return {}
  },
  created() { },
  methods: {},
  computed: {},
  unmounted() { },
  components: {},
}
</script>
