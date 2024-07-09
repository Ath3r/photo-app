<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Users</h1>

    <div class="mb-6 flex justify-between items-center">
      <div class="w-1/3">
        <input v-model="searchQuery" type="text" placeholder="Search users..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
      </div>
    </div>

    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
    <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <User 
            v-for="user in filteredUsers" 
            :key="user.id" 
            :user="user" 
            @edit="editUser" 
            @delete="deleteUser"
          />
        </tbody>
      </table>
    </div>

    <div class="mt-4 flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ totalUsers }}</span>
          results
        </p>
      </div>
    </div>

    <EditUser 
      v-if="showEditModal" 
      :user="editingUser" 
      :all-permissions="allPermissions"
      @close="closeEditModal"
      @save="savePermissions"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import User from '../components/users/User.vue'
import EditUser from '../components/users/EditUser.vue'
import { User as UserType } from '../types'

const store = useStore()

const users = computed(() => store.state.userStore.users)
const isLoading = computed(() => store.state.userStore.isLoading)
const allPermissions = computed(() => store.state.permissionsStore.permissions)

const editingUser = ref<UserType | null>(null)
const showEditModal = ref(false)
const searchQuery = ref('')

onMounted(() => {
  store.dispatch('fetchUsers')
  store.dispatch('fetchPermissions')
})

const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return users.value.filter((user: UserType) => 
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const totalUsers = computed(() => filteredUsers.value.length)

const editUser = (user: UserType) => {
  editingUser.value = JSON.parse(JSON.stringify(user))  // Create a deep copy
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
  editingUser.value = null
}

const savePermissions = (updatedUser: UserType) => {
  store.dispatch('updateUser', updatedUser)
  closeEditModal()
}

const deleteUser = (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    store.dispatch('deleteUser', userId)
  }
}
</script>