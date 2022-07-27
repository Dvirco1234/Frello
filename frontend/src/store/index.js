import { createStore } from 'vuex'
import boardStore from './modules/board-module.js'
import userStore from './modules/user-module.js'

const store = createStore({
  strict: true,
  state: {},
  getters: {},
  mutations: {
    pushActivity(state, { action, groupId, taskId }) {
      console.log(state.userStore.loggedinUser);
      // const user = state.loggedinUser
      // console.log('userIS:', user);

    },
  },
  actions: {},
  modules: {
    boardStore,
    userStore,
  },
})

export default store
