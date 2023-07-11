<template>
  <div
    v-if="loadingStore.loading"
    class="fixed top-0 left-0 w-full h-full bg-white bg-opacity-80 flex justify-center items-center z-40"
  >
    <div
      class="w-28 h-28 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { ref, onMounted, onUnmounted } from "vue";

const loadingStore = useLoadingStore();

// Trigger the loading state on component mount

// Clean up on component unmount
onUnmounted(() => {
  loadingStore.setFalse();
});
</script>
