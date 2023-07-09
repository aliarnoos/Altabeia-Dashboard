<template>
  <ChangePassword
    v-if="ChangePasswordState"
    @cancelEdit="ChangePasswordState = false"
    @statusMessage="(event) => showStatusMessage(event)"
  />
  <aside class="flex flex-col bg-gray-800 text-white h-screen w-64 basis-1/6">
    <div class="flex flex-col items-center justify-center py-6">
      <h1 class="text-2xl font-bold">Dashboard</h1>
      <button
        @click="toogleUserDropDown"
        class="m-2 p-2 flex justify-center items-center gap-1 hover:text-green-400 font-bold"
      >
        <span v-if="showUserDropDown" class="material-symbols-outlined">
          arrow_drop_up
        </span>
        <span v-else class="material-symbols-outlined"> arrow_drop_down </span>
        {{ userStore.user?.email }}
      </button>
      <div
        v-if="showUserDropDown"
        class="flex flex-col m-2 p-4 w-full bg-gray-700"
      >
        <button
          @click="logout"
          class="m-2 flex justify-center items-center gap-1 hover:bg-red-500 rounded p-2"
        >
          <span class="material-symbols-outlined text-lg"> logout </span>
          Logout
        </button>
        <button
          class="m-2 flex justify-center items-center gap-1 hover:bg-green-500 rounded p-2"
          @click="ChangePasswordState = true"
        >
          <span class="material-symbols-outlined text-lg"> edit </span>

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
  <p
    v-if="statusMessage == 'Something went wrong!'"
    class="bg-red-700 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
  >
    {{ statusMessage }}
  </p>
  <p
    v-else-if="statusMessage"
    class="bg-green-700 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
  >
    {{ statusMessage }}
  </p>
</template>

<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import ChangePassword from "./auth/ChangePassword.vue";

const tokenStore = useTokenStore();
const router = useRouter();
const userStore = useUserStore();
const requestStore = useRequestStore();

const showUserDropDown = ref(false);

const ChangePasswordState = ref(false);
const statusMessage = ref();
const showStatusMessage = (event: any) => {
  if (event.value) {
    statusMessage.value = event.value;
  } else {
    statusMessage.value = "Something went wrong!";
  }
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
};

const toogleUserDropDown = () => {
  showUserDropDown.value = !showUserDropDown.value;
};

const links = ref([
  { id: 0, label: "Overview", path: "/" },
  { id: 1, label: "Registration Fees", path: "/registration" },
  { id: 2, label: "Contacts", path: "contacts" },
  { id: 3, label: "Social Media", path: "/social-media" },
  { id: 4, label: "Jobs", path: "/jobs" },
  { id: 5, label: "Teachers", path: "/teachers" },
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
