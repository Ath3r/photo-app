<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { HomeIcon, UsersIcon, Bars3Icon, XMarkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/vue/24/outline'

const route = useRoute()
const router = useRouter()
const store = useStore()

const isSidebarOpen = ref(false)

const user = computed(() => store?.state.userStore.user)

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon, roles: [] },
  { name: 'Users', href: '/users', icon: UsersIcon, roles: ['user:readAll'] },
]

const filteredNavigation = computed(
  () => navigation.filter(
    item => user.value?.role?.permissions.some(
      (permission : any) => item.roles.length === 0 ? true : item.roles.find((role: any) => role === permission.type)
    )
  )
)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

const logout = () => {
  localStorage.removeItem('token')
  router.push('/login')
}

onMounted(async () => {
  if (!user.value) {
    try {
      await store.dispatch('fetchUser')
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
      logout()
    }
  }
})
</script>


<template>
  <div>
    <!-- Mobile menu -->
    <div class="fixed inset-0 flex z-40 md:hidden" role="dialog" aria-modal="true" v-if="isSidebarOpen">
      <div class="fixed inset-0 bg-gray-600 bg-opacity-75" aria-hidden="true" @click="toggleSidebar"></div>
      <div class="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-white">
        <div class="absolute top-0 right-0 -mr-12 pt-2">
          <button type="button" class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="toggleSidebar">
            <span class="sr-only">Close sidebar</span>
            <XMarkIcon class="h-6 w-6 text-white" aria-hidden="true" />
          </button>
        </div>
        <div class="flex-shrink-0 flex items-center px-4">
          Photo App
        </div>
        <div class="mt-5 flex-1 h-0 overflow-y-auto">
          <nav class="px-2 space-y-1">
            <RouterLink v-for="item in filteredNavigation" :key="item.name" :to="item.href" :class="[route.path === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-base font-medium rounded-md']">
              <component :is="item.icon" :class="[route.path === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-4 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button @click="logout" class="flex-shrink-0 group block w-full">
            <div class="flex items-center">
              <div>
                <ArrowLeftOnRectangleIcon class="inline-block h-9 w-9 rounded-full text-gray-400" />
              </div>
              <div class="ml-3">
                <p class="text-base font-medium text-gray-700 group-hover:text-gray-900">
                  Logout
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Desktop sidebar -->
    <div class="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div class="flex flex-col flex-grow border-r border-gray-200 pt-5 bg-white overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          Photo App
        </div>
        <div class="mt-5 flex-grow flex flex-col">
          <nav class="flex-1 px-2 pb-4 space-y-1">
            <RouterLink v-for="item in filteredNavigation" :key="item.name" :to="item.href" :class="[route.path === item.href ? 'bg-gray-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900', 'group flex items-center px-2 py-2 text-sm font-medium rounded-md']">
              <component :is="item.icon" :class="[route.path === item.href ? 'text-gray-500' : 'text-gray-400 group-hover:text-gray-500', 'mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
              {{ item.name }}
            </RouterLink>
          </nav>
        </div>
        <div class="flex-shrink-0 flex border-t border-gray-200 p-4">
          <button @click="logout" class="flex-shrink-0 group block w-full">
            <div class="flex items-center">
              <div>
                <ArrowLeftOnRectangleIcon class="inline-block h-9 w-9 rounded-full text-gray-400" />
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                  Logout ({{ user.name }})
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu button -->
    <div class="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
      <button type="button" class="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden" @click="toggleSidebar">
        <span class="sr-only">Open sidebar</span>
        <Bars3Icon class="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>