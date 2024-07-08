import api from './api'

export const getPosts = async() => {
  try {
    const { data } = await api.get('/posts')
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const getPost = async(id: string) => {
  try {
    const { data } = await api.get(`/posts/${id}`)
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const createPost = async(post: any) => {
  try {
    const { data } = await api.post('/posts', post)
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const updatePost = async(post: any) => {
  try {
    const { data } = await api.put('/posts', post);
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}