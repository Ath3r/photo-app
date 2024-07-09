import * as postsApi from "../../apis/posts";
import { useToast } from 'vue-toastification';
const toast = useToast()
interface State {
  posts: Post[];
  isLoading: boolean;
}

const initialState: State = {
  posts: [],
  isLoading: false,
}


export const postsStore = {
  state: initialState,
  mutations: {
    setPosts(state: State, posts: Post[]) {
      state.posts = posts
    },
    setLoading(state: State, isLoading: boolean) {
      state.isLoading = isLoading
    },
  },
  actions: {
    async fetchPosts(context: any, query: any) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await postsApi.getPosts(query)
        if (error) {
          console.log(error)
          return
        }
        context.commit('setPosts', data)
        context.commit('setLoading', false)
        return data
      } catch (error) {
        console.error(error)
        return null
      }
    },
    async createPost(context: any, post: any) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await postsApi.createPost(post)
        if (error) {
          toast.error(error)
          console.log(error)
          context.commit('setLoading', false)
          return
        }
        context.commit('setPosts', data)
        context.commit('setLoading', false)
        toast.success('Post created successfully')
        return data
      } catch (error) {
        toast.error(error)
        console.error(error)
        context.commit('setLoading', false)
        return null
      }
    },
    async deletePost(context: any, postId: number) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await postsApi.deletePost(postId)
        if (error) {
          toast.error(error)
          console.log(error)
          context.commit('setLoading', false)
          return
        }
        await context.dispatch('fetchPosts', { sort: {
          createdAt: 'desc'
        }})
        toast.success('Post deleted successfully')
        return data
      } catch (error) {
        toast.error(error)
        console.error(error)
        context.commit('setLoading', false)
        return null
      }
    },
    async updatePost(context: any, post: any) {
      try {
        context.commit('setLoading', true)
        const { data, error } = await postsApi.updatePost(post)
        if (error) {
          toast.error(error)
          console.log(error)
          context.commit('setLoading', false)
          return
        }
        await context.dispatch('fetchPosts', { sort: {
          createdAt: 'desc'
        }})
        toast.success('Post updated successfully')
        return data
      } catch (error) {
        toast.error(error)
        console.error(error)
        context.commit('setLoading', false)
        return null
      }
    },
  },
}