import { createStore } from 'vuex'
import { userStore } from './modules/user'
import { postsStore } from './modules/posts'

const store = createStore({
  modules: {
    userStore,
    postsStore,
  }
})

export default store
