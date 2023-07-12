<template>
  <header
    class="border-2 mb-8 py-4 px-6 w-full flex justify-between items-center"
  >
    <div class="flex items-center">
      <h1 class="text-2xl font-bold">Altabeia</h1>
    </div>
    <div class="flex items-center">
      <span class="mr-4">{{ userStore.user?.email }}</span>
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
import { useLoadingStore } from "@/stores/loading";
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const router = useRouter();
const useLoading = useLoadingStore();
const logout = async () => {
  useLoading.setLoading();
  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/logout`,
    {},
    tokenStore.token || ""
  );
  if (response) {
    router.push("/");
    tokenStore.setNull();
    useLoading.setFalse();
    router.push("/login");
  }
};
</script>

<style scoped>
/* Add any custom styling for the component here */
</style>
