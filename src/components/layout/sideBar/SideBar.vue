<template>
  <div class="flex flex-col bg-gray-800 text-white min-h-screen w-80">
    <div class="flex flex-col py-6">
      <RouterLink
        to="/admin/profile"
        class="text-lg text-center flex gap-2 justify-center items-center hover:text-green-600"
      >
        <i class="fas fa-user"></i>
        <p>My Profile</p>
      </RouterLink>
      <button
        class="m-2 p-2 flex gap-2 hover:text-green-400 font-bold items-center"
      >
        <i class="fa-solid fa-chart-line"></i>
        <p>Dashboard</p>
      </button>
      <button
        @click="toogleUserDropDown"
        class="m-2 p-2 flex gap-2 hover:text-green-400 font-bold items-center"
      >
        <i class="fas fa-home"></i>
        Home
        <span
          v-if="!showUserDropDown"
          class="material-symbols-outlined ml-auto"
        >
          arrow_drop_down
        </span>
        <span v-else class="material-symbols-outlined ml-auto">
          arrow_drop_up
        </span>
      </button>
      <div v-if="showUserDropDown" class="w-full bg-gray-900">
        <SideBarButton :links="links" />
      </div>
      <button
        class="m-2 p-2 flex gap-2 hover:text-green-400 font-bold items-center"
      >
        <i class="fa-solid fa-phone"></i>
        <p>Contact</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideBarButton from "./sideBarButton.vue";

const showUserDropDown = ref(false);

const toogleUserDropDown = () => {
  showUserDropDown.value = !showUserDropDown.value;
};

const links = ref([
  { id: 1, label: "Registration Fees", path: "/registration" },
  { id: 2, label: "Contacts", path: "/contacts" },
  { id: 3, label: "Social Media", path: "/social-media" },
  { id: 4, label: "Jobs", path: "/jobs" },
  { id: 5, label: "Teachers", path: "/teachers" },
  { id: 6, label: "Schools", path: "/schools" },
  { id: 7, label: "Facilities", path: "/facilities" },
  { id: 8, label: "Activities", path: "/activities" },
]);
</script>
