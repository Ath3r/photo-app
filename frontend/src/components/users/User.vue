<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex-shrink-0 h-10 w-10">
          <img class="h-10 w-10 rounded-full" :src="`https://picsum.photos/id/${user.id}/200/300`" :alt="user.name">
        </div>
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ user.email }}</div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium flex text-center">
      <button v-if="currentUser.role.permissions.map((p) => p.type).includes(PERMISSION_TO_EDIT)" @click="$emit('edit', user)" class="text-indigo-600 hover:text-indigo-900 mr-2">Edit</button>
      <button v-if="currentUser.role.permissions.map((p) => p.type).includes(PERMISSION_TO_DELETE)" @click="$emit('delete', user.id)" class="text-red-600 hover:text-red-900">Delete</button>
    </td>
  </tr>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const currentUser = computed(() => store.state.userStore.user)


const PERMISSION_TO_EDIT = 'user:update'
const PERMISSION_TO_DELETE = 'user:delete'

defineProps<{
  user: User
}>()

defineEmits<{
  (e: 'edit', user: User): void
  (e: 'delete', userId: number): void
}>()
</script>