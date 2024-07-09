import * as api from "../../apis"
import { useToast } from "vue-toastification";


interface State {
  user: any,
  users: any[],
  isLoading: boolean,
}

const initialState: State = {
  user: null,
  users: [],
  isLoading: false,
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
    setLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async login(context: any, user: any, ) {
      try {
        const { data, error } = await api.login(user)
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
        const { data, error } = await api.signup(user)
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
        const { data, error } = await api.getProfile()
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
    async fetchUsers(context: any) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await api.getUsers()
        if (error) {
          console.log(error)
          return
        }
        context.commit('setLoading', false)
        context.commit('setUsers', data)
        return data
      } catch (error) {
        context.commit('setLoading', false)
        console.error(error)
        return null
      }
    },
    async updateUser(context: any, user: User) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await api.updateUser(user)
        if (error) {
          toast.error(`Unable to update user: ${error}`)
          console.log(error)
          context.commit('setLoading', false)
          return
        }
        await context.dispatch('fetchUsers')
        toast.success(`User ${user.email} updated successfully`)
        return data
      } catch (error) {
        toast.error(`Unable to update user: ${error}`)
        console.error(error)
        context.commit('setLoading', false)
        return null
      }
    },
  },
}