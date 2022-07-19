import { createRouter, createWebHashHistory } from 'vue-router'
import homePage from '../views/home-page.vue'
import boardApp from '../views/board-app.vue'

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
    }
  ]
})

export default router
