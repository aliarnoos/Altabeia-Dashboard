<template>
  <div class="flex flex-col bg-gray-800 text-white min-h-screen w-80">
    <div class="flex flex-col py-6">
      <RouterLink
        to="/admin/profile"
        class="text-center flex gap-2 mb-6 justify-center items-center hover:text-green-600"
      >
        <i class="fas fa-user"></i>
        <p>My Profile</p>
      </RouterLink>
      <RouterLink
        to="/"
        class="m-2 p-4 flex gap-2 hover:text-green-400 items-center"
      >
        <i class="fa-solid fa-chart-line"></i>
        <p>Dashboard</p>
      </RouterLink>
      <button
        @click="toogleUserDropDown"
        class="p-4 flex gap-2 hover:text-green-400 items-center"
        :class="{ 'bg-gray-900': showDropDown }"
      >
        <i class="fas fa-home"></i>
        Home
        <i v-if="showDropDown" class="fa-solid fa-caret-up ml-auto"></i>
        <i v-else class="fa-solid fa-caret-down ml-auto"></i>
      </button>
      <div v-if="showDropDown" class="w-full bg-gray-900">
        <SideBarButton :links="links" />
      </div>
      <button class="m-2 p-4 flex gap-2 hover:text-green-400 items-center">
        <i class="fa-solid fa-phone"></i>
        <p>Contact</p>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import SideBarButton from "./sideBarButton.vue";
import { useRoute } from "vue-router";

const showDropDown = ref(false);
const route = useRoute();

const pagePath = route.fullPath;

const links = ref([
  { id: 1, label: "Registration Fees", path: "/registration" },
  { id: 2, label: "Contacts", path: "/contacts" },
  { id: 3, label: "Social Media", path: "/social-media" },
  { id: 4, label: "Jobs", path: "/jobs" },
  { id: 5, label: "Teachers", path: "/teachers" },
  { id: 6, label: "Schools", path: "/schools" },
  { id: 7, label: "Facilities", path: "/facilities" },
  { id: 8, label: "Activities", path: "/activities" },
  { id: 9, label: "Banners", path: "/banners" },
  { id: 10, label: "Image Sliders", path: "/image-slider" },
]);

links.value.map((link) => {
  if (link.path == pagePath) {
    showDropDown.value = true;
  }
});
const toogleUserDropDown = () => {
  showDropDown.value = !showDropDown.value;
};
</script>
