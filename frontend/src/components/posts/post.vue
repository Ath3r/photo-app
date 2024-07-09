<template>
  
  <div v-if="isLoading" class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  </div>
  <div v-else class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Posts</h1>
      <select
        v-model="createdAt"
        @change="handleSort"
        class="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="desc" :selected="createdAt === 'dsc'">Newest First</option>
        <option value="asc" :selected="createdAt === 'asc'">Oldest First</option>
      </select>
      <button @click="showCreateModal = true" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Create New Post
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="post in posts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="getPhotoUrl(post.url)" :alt="post.description" class="w-full h-64 object-cover"/>
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ post.description }}</h2>
          <p class="text-xs text-gray-400">{{ formatDate(new Date(post.createdAt)) }}</p>
          <div class="mt-2 flex justify-end space-x-2">
            <button v-if="currentUser.id === post.userId" @click="editPost(post)" class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
              Edit
            </button>
            <button v-if="currentUser.id === post.userId" @click="deletePost(post.id)" class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <CreatePost v-if="showCreateModal" @close="() => showCreateModal = false" />
    <EditPost
        v-if="showEditModal"
        :post="currentPost"
        @close="closeEditModal"
        @update="updatePost"
        />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import CreatePost from './CreatePost.vue'
import EditPost from './EditPost.vue'
import { formatDate, getPhotoUrl } from '../../utils'

const store = useStore()

const posts = computed(() => store.state.postsStore.posts)
const isLoading = computed(() => store.state.postsStore.isLoading)
const currentUser = computed(() => store.state.userStore.user)

const createdAt = ref('desc')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const currentPost = ref<Post | null>(null)

const closeEditModal = () => {
  showEditModal.value = false
  currentPost.value = null
}

const updatePost = async (post: any) => {
  await store.dispatch('updatePost', post)
  closeEditModal()
}


const editPost = (post: Post) => {
  currentPost.value = post
  showEditModal.value = true
}

const deletePost = async (postId: number) => {
  await store.dispatch('deletePost', postId)
}


const handleSort = async () => {
  await store.dispatch('fetchPosts', { sort: {
  createdAt: createdAt.value,
}})
}

onMounted(async () => {
  await store.dispatch('fetchPosts', { sort: {
    createdAt: createdAt.value
  }})
})

</script>