<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
            Edit Post
          </h3>
          <div class="mt-2">
            <input v-model="editedPost.title" type="text" placeholder="Title" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md">
            <div
              @dragover.prevent
              @drop.prevent="onDrop"
              @click="$refs.fileInput.click()"
              class="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer"
            >
              <p v-if="!editedPost.imageUrl" class="text-gray-500">Drag and drop an image here or click to select</p>
              <img v-else :src="editedPost.imageUrl" alt="Post image" class="mx-auto max-h-48 object-contain" />
              <input type="file" @change="onFileSelected" accept="image/*" class="hidden" ref="fileInput">
            </div>
            <textarea v-model="editedPost.description" placeholder="Description" class="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"></textarea>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button @click="updatePost" type="button" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
            Save Changes
          </button>
          <button @click="$emit('close')" type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  post: {
    id: number;
    title: string;
    imageUrl: string;
    description: string;
    createdAt: Date;
  }
}>()

const emit = defineEmits(['close', 'post-updated'])

const editedPost = ref({ ...props.post })

onMounted(() => {
  editedPost.value = { ...props.post }
})

const onDrop = (event: DragEvent) => {
  event.preventDefault();
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
}

const onFileSelected = (event: Event) => {
  const files = (event.target as HTMLInputElement).files;
  if (files && files.length > 0) {
    handleFile(files[0]);
  }
}

const handleFile = (file: File) => {
  if (file.type.startsWith('image/')) {
    const reader = new FileReader();
    reader.onload = (e) => {
      editedPost.value.imageUrl = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  } else {
    alert('Please upload an image file');
  }
}

const updatePost = () => {
  if (!editedPost.value.title || !editedPost.value.imageUrl || !editedPost.value.description) {
    alert('Please fill in all fields');
    return;
  }
  
  emit('post-updated', editedPost.value);
}
</script>