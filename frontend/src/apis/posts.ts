import api from './api'

export const getPosts = async(query: any) => {
  try {
    const { sort } = query || {}
    const { data: res } = await api.get(
      `/posts${sort ? `?${new URLSearchParams(sort)}` : ''}`,
    )
    return { data: res.data, error: null}
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
    const { data } = await api.post('/posts', post, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const updatePost = async({
  description,
  id,
}: {
  description: string;
  id: number;
}) => {
  try {
    const { data } = await api.patch(`/posts/${id}`, {
      description,
    });
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}

export const deletePost = async(postId: number) => {
  try {
    const { data } = await api.delete(`/posts/${postId}`);
    return { data, error: null}
  } catch (error: any) {
    console.error(error)
    return { data: null, error: error?.message || 'Something went wrong' }
  }
}
