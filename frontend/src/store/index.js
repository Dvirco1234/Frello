import { createStore } from 'vuex'
import boardStore from './modules/board-module.js'
import userStore from './modules/user-module.js'

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    boardStore,
    userStore,
  },
})

export default store
