<template>
  <footer class="bg-gray-700 text-white py-8 px-1 border-t-4 border-gray-800">
    <div class="container mx-auto flex flex-col gap-4 text-center">
      <p>&copy; {{ year }} Admin Dashboard. All rights reserved.</p>
      <p>Developed by Black Ace</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue';



const year = ref(new Date().getFullYear())
</script>
