<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <CreatePost @post-created="handlePostCreated" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import CreatePost from '../components/posts/post.vue'

interface Post {
  id: number;
  title: string;
  imageUrl: string;
  description: string;
  createdAt: Date;
}

const router = useRouter()
const showCreateModal = ref(false)
const posts = ref<Post[]>([])

const recentPosts = computed(() => posts.value.slice(0, 3))
const totalPosts = computed(() => posts.value.length)
const postsThisMonth = computed(() => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  return posts.value.filter(post => new Date(post.createdAt) >= startOfMonth).length
})

const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

const openCreatePostModal = () => {
  showCreateModal.value = true
}

const handlePostCreated = (newPost: Post) => {
  posts.value.unshift(newPost)
  showCreateModal.value = false
  // Optionally, you can redirect to the posts page or show a success message
}

onMounted(async () => {
  // Fetch posts from your API or store
  // This is a placeholder. Replace with actual API call.
  posts.value = [
    { id: 1, title: "Sunset at the beach", imageUrl: "https://picsum.photos/id/1011/800/800", description: "Beautiful sunset captured at the local beach", createdAt: new Date("2023-05-01") },
    { id: 2, title: "Mountain vista", imageUrl: "https://picsum.photos/id/1018/800/800", description: "Breathtaking view from the mountain top", createdAt: new Date("2023-05-02") },
    { id: 3, title: "City lights", imageUrl: "https://picsum.photos/id/1033/800/800", description: "Night cityscape with dazzling lights", createdAt: new Date("2023-05-03") },
  ]
})
</script>