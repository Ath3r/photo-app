<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        404 - Page Not Found
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Oops! The page you're looking for doesn't exist.
      </p>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <div class="text-center">
          <p class="text-indigo-600 text-5xl font-bold mb-4">404</p>
          <p class="text-gray-700 mb-6">
            We couldn't find the page you're looking for. It might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <RouterLink
            to="/"
            class="w-full inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Go back to homepage
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>