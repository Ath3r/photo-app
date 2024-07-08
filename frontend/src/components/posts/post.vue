<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Your Posts</h1>
      <button @click="showCreateModal = true" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
        Create New Post
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="post in sortedPosts" :key="post.id" class="bg-white rounded-lg shadow-md overflow-hidden">
        <img :src="post.imageUrl" :alt="post.title" class="w-full h-64 object-cover"/>
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800 mb-2">{{ post.title }}</h2>
          <p class="text-sm text-gray-600 mb-2">{{ truncateDescription(post.description) }}</p>
          <p class="text-xs text-gray-400">{{ formatDate(post.createdAt) }}</p>
          <div class="mt-2 flex justify-end space-x-2">
            <button @click="editPost(post)" class="text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
              Edit
            </button>
            <button @click="deletePost(post.id)" class="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <CreatePost v-if="showCreateModal" @close="showCreateModal = false" @post-created="addPost" />
    <EditPost v-if="showEditModal" :post="currentPost" @close="showEditModal = false" @post-updated="updatePost" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CreatePost from './CreatePost.vue'
import EditPost from './EditPost.vue'

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

const posts = ref<Post[]>([
  { id: 1, title: "Sunset at the beach", imageUrl: "https://picsum.photos/id/1011/800/800", description: "Beautiful sunset captured at the local beach", createdAt: new Date("2023-05-01") },
  { id: 2, title: "Mountain vista", imageUrl: "https://picsum.photos/id/1018/800/800", description: "Breathtaking view from the mountain top", createdAt: new Date("2023-05-02") },
  { id: 3, title: "City lights", imageUrl: "https://picsum.photos/id/1033/800/800", description: "Night cityscape with dazzling lights", createdAt: new Date("2023-05-03") },
  { id: 4, title: "Forest path", imageUrl: "https://picsum.photos/id/1043/800/800", description: "Serene walkway through a lush forest", createdAt: new Date("2023-05-04") },
])

const sortBy = ref('createdAt')
const showCreateModal = ref(false)
const showEditModal = ref(false)
const currentPost = ref<Post | null>(null)

const sortedPosts = computed(() => {
  return [...posts.value].sort((a, b) => {
    if (sortBy.value === 'createdAt') {
      return b.createdAt.getTime() - a.createdAt.getTime()
    } else {
      return a.title.localeCompare(b.title)
    }
  })
})

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const truncateDescription = (description: string, maxLength: number = 100) => {
  if (description.length <= maxLength) return description;
  return description.substr(0, maxLength) + '...';
}

const editPost = (post: Post) => {
  currentPost.value = post
  showEditModal.value = true
}

const deletePost = (postId: number) => {
  if (confirm('Are you sure you want to delete this post?')) {
    posts.value = posts.value.filter(p => p.id !== postId)
  }
}

const addPost = (newPost: Post) => {
  posts.value.unshift(newPost)
  showCreateModal.value = false
}

const updatePost = (updatedPost: Post) => {
  const index = posts.value.findIndex(p => p.id === updatedPost.id)
  if (index !== -1) {
    posts.value[index] = updatedPost
  }
  showEditModal.value = false
}
</script>