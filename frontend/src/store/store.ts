import { createStore } from 'vuex'
import { userStore } from './modules/user'
import { postsStore } from './modules/posts'
import { permissionsStore } from './modules/permissions'

const store = createStore({
  modules: {
    userStore,
    postsStore,
    permissionsStore,
  }
})

export default store
