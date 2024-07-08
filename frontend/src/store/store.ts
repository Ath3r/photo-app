import { createStore } from 'vuex'
import { userStore } from './modules/user'

const store = createStore({
  modules: {
    user: userStore,
  }
})

export default store
