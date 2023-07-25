<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Activities</h1>
      <RouterLink
        to="/activities/add"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <i class="fa-solid fa-plus"></i>
        <p>Add Activity</p>
      </RouterLink>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <!-- <th class="p-2 border">Description</th> -->
          <!-- <th class="p-2 border">Summary</th> -->
          <th class="p-2 border">Date</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <!-- <td class="border p-2">{{ item.descriptionEn }}</td>
          <td class="border p-2">{{ item.summaryEn }}</td> -->
          <td class="border p-2 text-center">{{ item.date }}</td>
          <td class="border p-4 text-center">
            <i v-if="item.isVisible" class="fa-solid fa-eye"></i>
            <i v-else-if="!item.isVisible" class="fa-solid fa-eye-slash"></i>          
          </td>
          <td
            class="border p-2 text-center flex justify-center items-center gap-4"
          >
            <RouterLink
              :to="`/activities/${item.id}`"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </RouterLink>
            <p class="text-xl">|</p>
            <button
              @click="deleteActivity(item.id)"
              class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-trash"></i>
            </button>
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
import { useMessageStore } from "@/stores/statusMessage";

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  summaryKu: string;
  summaryEn: string;
  summaryAr: string;
  summaryTu: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTu: string;
  image: string;
  imageUrl: string;
  date: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();

const items = ref<Item[]>();

const fetchActivities = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/activities",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.activities;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchActivities();
});

const deleteActivity = async (jobId: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/activities/${jobId}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  fetchActivities();
};
</script>
