<script setup lang="ts">
import SideBar from "../components/SideBar.vue";
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";

const requestStore = useRequestStore();
const userStore = useUserStore();
const tokenStore = useTokenStore();

const setUser = async () => {
  const response = await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/user",
    tokenStore.token || undefined
  );
  userStore.user = response.user;
};

onBeforeMount(() => {
  setUser();
});
</script>

<template>
  <main class="flex flex-row">
    <side-bar class="basis-1/6" />
    <RouterView />
  </main>
</template>
