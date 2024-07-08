import { getProfile, login, signup } from "../../apis"
import { useToast } from "vue-toastification";


interface State {
  user: any,
  users: any[],
}

const initialState: State = {
  user: null,
  users: [],
}

const toast = useToast()


export const userStore = {
  state: initialState,
  mutations: {
    setUser(state: State, user: any) {
      state.user = user
    },
    setUsers(state: State, users: any[]) {
      state.users = users
    },
  },
  actions: {
    async login(context: any, user: any, ) {
      try {
        const { data, error } = await login(user)
        if (error) {
          toast.error(`Unable to login: ${error}`)
          localStorage.removeItem('token')
          return context.commit('setUser', null)
        }
        toast.success(`Logged in successfully`)
        context.commit('setUser', data)
        localStorage.setItem('token', data.token)
        return data
      } catch (error) {
        toast.error(`Unable to login: ${error}`)
        console.error(error)
        localStorage.removeItem('token')
        return context.commit('setUser', null)
      }
    },
    async signup(context: any, user: any) {
      try {
        const { data, error } = await signup(user)
        if (error) {
          toast.error(`Unable to login: ${error}`)
          console.log(error)
          return 
        }
        toast.success(`User ${user.email} created successfully`)
        context.commit('setUser', data)
        return data
      } catch (error) {
        toast.error(`Unable to login: ${error}`)
        console.error(error)
        return null
      }
    },
    async fetchUser(context: any) {
      try {
        const { data, error } = await getProfile()
        if (error) {
          console.log(error)
          return
        }
        context.commit('setUser', data)
        return data
      } catch (error) {
        console.error(error)
        return null
      }
    },
  },
  getters: {
    isAuthenticated: (state: State) => localStorage.getItem('token') && state.user.id,
    user: (state: State) => state.user,
    users: (state: State) => state.users,
  },
}