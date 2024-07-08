import api from './api'

export const login = async(user: any) => {
  try {
    const { data : res } = await api.post('/auth/login', user)
    localStorage.setItem('token', res.data.token)
    return { data: res.data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const signup = async(user: any) => {
  try {
    const { data : res } = await api.post('/auth/signup', user)
    localStorage.setItem('token', res.data.token)
    return { data: res.data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}