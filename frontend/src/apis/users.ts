import api from './api'

export const getUsers = async() => {
  try {
    const { data } = await api.get('/users')
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const updateUser = async(user: any) => {
  try {
    const { data } = await api.put('/users', user)
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const deleteUser = async(id: string) => {
  try {
    const { data } = await api.delete(`/users/${id}`)
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const createUser = async(user: any) => {
  try {
    const { data } = await api.post('/users', user)
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const getProfile = async () => {
  try {
    const { data: res } = await api.get('/users/me')
    return { data: res.data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}