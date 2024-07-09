import { getAllPermissions } from '../../apis'
import { useToast } from 'vue-toastification';

interface Permission {
  id: string;
  description: string;
}

interface State {
  permissions: Permission[];
  isLoading: boolean;
}

const initialState: State = {
  permissions: [],
  isLoading: false,
}


export const permissionsStore = {
  state: initialState,
  mutations: {
    setPermissions(state: State, permissions: Permission[]) {
      state.permissions = permissions
    },
    setLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchPermissions(context: any, ) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await getAllPermissions()
        if (error) {
          console.log(error)
          return
        }
        context.commit('setPermissions', data)
        context.commit('setLoading', false)
        return data
      } catch (error) {
        console.error(error)
        context.commit('setLoading', false)
        return null
      }
    },
  },
}