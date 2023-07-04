<template>
  <aside class="flex flex-col bg-gray-800 text-white h-screen w-64">
    <div class="flex flex-col items-center justify-center py-6">
      <h1 class="text-2xl font-bold">Admin Dashboard</h1>
      <p
        @click="toogleUserDropDown"
        class="m-2 p-2 cursor-pointer hover:text-green-400"
      >
        {{ userStore.user?.email }}
      </p>
      <div
        v-if="showUserDropDown"
        class="flex flex-col m-2 p-4 w-full bg-gray-700"
      >
        <button @click="logout" class="m-2 hover:bg-red-400 rounded p-2">
          Logout
        </button>
        <button class="m-2 hover:bg-green-400 rounded p-2">
          Change Password
        </button>
      </div>
    </div>
    <nav class="flex-grow">
      <ul class="space-y-2">
        <li
          links="ref(["
          v-for="link in links"
          :key="link.id"
          class="p-4 hover:bg-gray-700 cursor-pointer"
        >
          <router-link :to="link.path" class="text-lg p-4">{{
            link.label
          }}</router-link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { onBeforeMount, ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const tokenStore = useTokenStore();
const router = useRouter();

const userStore = useUserStore();

const showUserDropDown = ref(false);

const toogleUserDropDown = () => {
  showUserDropDown.value = !showUserDropDown.value;
};

const links = ref([
  { id: 0, label: "Overview", path: "/" },
  { id: 1, label: "Banners", path: "#" },
  { id: 2, label: "Contacts", path: "#" },
  { id: 3, label: "Users", path: "#" },
  { id: 4, label: "Schools", path: "#" },
  { id: 5, label: "About", path: "#" },
  { id: 6, label: "Contacts", path: "contacts" },
]);

const logout = async () => {
  try {
    const response = await fetch("http://localhost:3000/admin/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenStore.token}`,
      },
      credentials: "include", // Send and receive cookies with the request
    });

    if (!response.ok) {
      throw new Error("Loginout failed");
    }

    router.push("/");
  } catch (error) {
    console.error(error);
  }
  tokenStore.setNull();
  router.push("/login");
};
</script>
