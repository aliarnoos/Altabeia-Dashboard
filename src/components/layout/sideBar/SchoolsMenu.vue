<template>
  <div class=" flex flex-col">
    <button
      @click="toogleUserDropDown"
      class="p-4 flex gap-2 hover:text-green-400 items-center"
      :class="{ 'bg-gray-900': showDropDown }"
    >
    <i class="fa-solid fa-school"></i>    
    Schools
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
  { id: 1, label: "Schools", path: "/schools" },

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
