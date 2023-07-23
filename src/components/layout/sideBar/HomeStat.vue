<template>
    <div class=" flex flex-col py-6">
      <button
        @click="toogleUserDropDown"
        class="p-4 flex gap-2 hover:text-green-400 items-center"
        :class="{ 'bg-gray-900': showDropDown }"
      >
      <i class="fa-solid fa-arrow-down-wide-short"></i>        
      Statistics
        <i v-if="showDropDown" class="fa-solid fa-caret-up ml-auto"></i>
        <i v-else class="fa-solid fa-caret-down ml-auto"></i>
      </button>
      <div v-if="showDropDown" class="pl-4 w-full bg-gray-900">
        <SideBarButton :links="links" />
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
  { id: 0, label: "Banner", path: "/article/3" },
  { id: 1, label: "Students Number", path: "/article/4" },
  { id: 2, label: "Trophies", path: "/article/5" },
  { id: 3, label: "Average", path: "/article/6" },

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
