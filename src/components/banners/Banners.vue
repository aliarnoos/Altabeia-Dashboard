<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold flex justify-start w-full">Banners</h1>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <!-- <th class="p-2 border">Description</th> -->
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <!-- <td class="border p-2">{{ item.descriptionEn }}</td> -->
          <td class="border p-4 text-center">
            <i v-if="item.isVisible" class="fa-solid fa-eye"></i>
            <i v-else-if="!item.isVisible" class="fa-solid fa-eye-slash"></i> 
          </td>
          <td class="border p-4 text-center">
            <RouterLink
              :to="`/banners/${item.id}`"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "../../stores/request";
import { onBeforeMount, ref } from "vue";
import { useLoadingStore } from "@/stores/loading";

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTu: string;
  image: string;
  imageUrl: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();

const items = ref<Item[]>();

const fetchBanners = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/banners",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.banners;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchBanners();
});
</script>
