<template>
  <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">Users</h1>

    <!-- Search and filter options -->
    <div class="mb-6 flex justify-between items-center">
      <div class="w-1/3">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search users..."
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        >
      </div>
    </div>

    <!-- Users table -->
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img class="h-10 w-10 rounded-full" :src="user.avatar" :alt="user.name">
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ user.postCount }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex text-center">
              <button @click="editUser(user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
              <button v-if="currentUser.role === 'admin'" @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div class="mt-4 flex justify-between items-center">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          <span class="font-medium">{{ paginationStart }}</span>
          to
          <span class="font-medium">{{ paginationEnd }}</span>
          of
          <span class="font-medium">{{ totalUsers }}</span>
          results
        </p>
      </div>
      <div cla>
        <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
          <button
            @click="prevPage"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            @click="nextPage"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
          >
            Next
          </button>
        </nav>
      </div>
    </div>

    <!-- Edit User Modal -->
    <div v-if="showEditModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
              Edit User Permissions
            </h3>
            <div class="mt-4">
              <p class="text-sm text-gray-500 mb-2">User: {{ editingUser?.name }}</p>
              <div class="space-y-2">
                <div v-for="permission in allPermissions" :key="permission" class="flex items-center">
                  <input 
                    type="checkbox" 
                    :id="permission" 
                    :value="permission" 
                    v-model="selectedPermissions"
                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  >
                  <label :for="permission" class="ml-2 block text-sm text-gray-900">
                    {{ permission }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button @click="savePermissions" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
              Save Changes
            </button>
            <button @click="closeEditModal" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  avatar: string;
  postCount: number;
}

// Mock current user (replace with actual auth logic)
const currentUser = ref({ role: 'admin' })

const editingUser = ref<User | null>(null)
const selectedPermissions = ref<string[]>([])

// List of all  permissions
const allPermissions = [
  'create_post',
  'edit_post',
  'delete_post',
  'view_users',
  'edit_users',
  'delete_users',
  'manage_settings'
]

const users = ref<User[]>([
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john@example.com', 
    role: 'admin', 
    avatar: 'https://i.pravatar.cc/150?img=1', 
    postCount: 15,
    permissions: ['create_post', 'edit_post', 'delete_post', 'view_users', 'edit_users', 'delete_users', 'manage_settings']
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane@example.com', 
    role: 'user', 
    avatar: 'https://i.pravatar.cc/150?img=2', 
    postCount: 8,
    permissions: ['create_post', 'edit_post', 'delete_post']
  },
])



const closeEditModal = () => {
  showEditModal.value = false
  editingUser.value = null
  selectedPermissions.value = []
}

const savePermissions = () => {
  if (editingUser.value) {
    const userIndex = users.value.findIndex(u => u.id === editingUser.value!.id)
    if (userIndex !== -1) {
      users.value[userIndex] = {
        ...users.value[userIndex],
        permissions: selectedPermissions.value
      }
      // In a real application, you would make an API call here to update the user's permissions
      console.log(`Updated permissions for user ${editingUser.value.name}:`, selectedPermissions.value)
    }
  }
  closeEditModal()
}

const searchQuery = ref('')
const roleFilter = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const showEditModal = ref(false)

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesRole = !roleFilter.value || user.role === roleFilter.value
    return matchesSearch && matchesRole
  })
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredUsers.value.slice(start, end)
})

const totalUsers = computed(() => filteredUsers.value.length)
const totalPages = computed(() => Math.ceil(totalUsers.value / itemsPerPage))

const paginationStart = computed(() => (currentPage.value - 1) * itemsPerPage + 1)
const paginationEnd = computed(() => Math.min(currentPage.value * itemsPerPage, totalUsers.value))

const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++
}

const editUser = (user: User) => {
  // Implement edit user logic
  console.log('Edit user:', user)
  showEditModal.value = true
}

const deleteUser = (userId: number) => {
  if (confirm('Are you sure you want to delete this user?')) {
    // Implement delete user logic
    console.log('Delete user:', userId)
    users.value = users.value.filter(user => user.id !== userId)
  }
}
</script>