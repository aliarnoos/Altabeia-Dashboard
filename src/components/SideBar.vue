<template>
  <aside class="flex flex-col bg-gray-800 text-white h-screen w-64">
    <div class="flex flex-col items-center justify-center py-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
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
        <button @click="logout" class="m-2 hover:bg-red-500 rounded p-2">
          Logout
        </button>
        <button class="m-2 hover:bg-green-500 rounded p-2">
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
          class="mb-2 pl-2 hover:bg-gray-700 cursor-pointer flex items-stretch"
        >
          <router-link :to="link.path" class="text-lg p-4 grow">{{
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
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

const tokenStore = useTokenStore();
const router = useRouter();
const userStore = useUserStore();
const requestStore = useRequestStore();

const showUserDropDown = ref(false);

const toogleUserDropDown = () => {
  showUserDropDown.value = !showUserDropDown.value;
};

const links = ref([
  { id: 0, label: "Overview", path: "/" },
  { id: 1, label: "Banners", path: "#" },
  { id: 2, label: "Social Media", path: "/social-media" },
  { id: 3, label: "Users", path: "#" },
  { id: 4, label: "Schools", path: "#" },
  { id: 5, label: "Registration", path: "/registration" },
  { id: 6, label: "Contacts", path: "contacts" },
]);

const logout = async () => {
  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/logout`,
    {},
    tokenStore.token || ""
  );
  if (response) {
    router.push("/");
    tokenStore.setNull();
    router.push("/login");
  }
};
</script>
