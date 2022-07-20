import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boardApp from '../views/board-app.vue'
import boardDetails from '../views/board-details.vue'
import userDetails from '../views/user-details.vue'
import loginSignup from '../views/login-signup.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: homePage
    },
    {
      path: '/board',
      name: 'board-app',
      component: boardApp
    },
    {
      path: '/board/:id',
      name: 'board-details',
      component: boardDetails
    },
    {
      path: '/user/:id',
      name: 'user-details',
      component: userDetails
    },
    {
      path: '/login',
      name: 'login-signup',
      component: loginSignup
    },
  ]
})

export default router
