<template>
  <section class="app-header main-layout full">
    <section class="flex space-between">
      <h1>Frello</h1>
      <ul class="route-links flex clean-list">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/board">Boards</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
      </ul>
    </section>
  </section>
</template>
<script>
import router from '../router/index.js'
export default {
  name: 'app-header',
}
</script>
