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
        class=" p-4 flex gap-2 hover:text-green-400 items-center"
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
      <div v-if="showDropDown" class="pl-4 w-full bg-gray-900">
        <HomeStat/>
        <SideBarButton :links="links" />
      </div>
      <SchoolsMenu/>
      <AboutMenu/>
      <ActivityMenu/>
      <RegiserationMenu/>
      <ContactMenu/>

      <RouterLink
      to="/jobs"
      class="p-4 flex gap-2 hover:text-green-400 items-center">
      <i class="fa-solid fa-briefcase"></i>        
      <p>Jobs</p>
      </RouterLink>

      <RouterLink
      to="/banners"
      class="p-4 flex gap-2 hover:text-green-400 items-center">
      <i class="fa-regular fa-file-image"></i>      
      <p>Banners</p>
      </RouterLink>

      <RouterLink
      to="/image-slider"
      class="p-4 flex gap-2 hover:text-green-400 items-center">
      <i class="fa-solid fa-images"></i>      
      <p>Images Slider</p>
      </RouterLink>

      <RouterLink
      to="/users"
      class="p-4 flex gap-2 hover:text-green-400 items-center">
      <i class="fa-solid fa-user-group"></i>      
      <p>Users</p>
      </RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import SideBarButton from "./sideBarButton.vue";
import { useRoute } from "vue-router";
import HomeStat from "./sub-menu/HomeStat.vue";
import SchoolsMenu from "./sub-menu/SchoolsMenu.vue";
import AboutMenu from "./sub-menu/AboutMenu.vue";
import ActivityMenu from "./sub-menu/ActivityMenu.vue";
import RegiserationMenu from "./sub-menu/RegiserationMenu.vue";
import ContactMenu from "./sub-menu/ContactMenu.vue";

const showDropDown = ref(false);
const route = useRoute();

const pagePath = route.fullPath;

const links = ref([
  { id: 1, label: "Home Banner", path: "/article/2" },
  { id: 2, label: "Why Us", path: "/article/7" },
  { id: 3, label: "Register", path: "/article/8" },

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
