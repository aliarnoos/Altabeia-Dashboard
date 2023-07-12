<template>
  <header
    class="border-2 mb-8 py-4 px-6 w-full flex justify-between items-center"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">Altabeia</h1>
    </div>
    <div class="flex items-center">
      <span class="mr-4">{{ userStore.user?.name }}</span>
      <button
        @click="logout"
        class="px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white rounded"
      >
        Logout
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();

const logout = () => {
  // Implement your logout logic here
};
</script>

<style scoped>
/* Add any custom styling for the component here */
</style>
