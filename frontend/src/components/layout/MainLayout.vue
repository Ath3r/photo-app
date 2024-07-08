<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <SidebarNavigation class="flex-shrink-0 w-64" />
    <div class="flex flex-col flex-1 overflow-hidden">
      <header class="bg-white shadow">
        <div class="px-4 py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        </div>
      </header>
      <main class="flex-1 overflow-y-auto p-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import SidebarNavigation from './SidebarNavigation.vue'
</script>