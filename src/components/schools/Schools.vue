<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold flex justify-start w-full">Schools</h1>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Description</th>
          <th class="p-2 border">Icon BG Color</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <td class="border p-2">{{ item.descriptionEn }}</td>
          <td class="border p-2 text-center">
            {{ item.iconBgColor }}
          </td>
          <td class="border p-4">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-4 text-center">
            <RouterLink
              :to="`/schools/${item.id}`"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
    <p
      v-if="statusMessage == 'Something went wrong!'"
      class="bg-red-500 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessage }}
    </p>
    <p
      v-else-if="statusMessage"
      class="bg-green-500 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessage }}
    </p>
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
  icon: string;
  iconUrl: string;
  iconBgColor: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();

const items = ref<Item[]>();

const fetchSchools = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/schools",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.schools;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchSchools();
});

const editState = ref(false);

const selectedSchool = ref();

const statusMessage = ref();

const showStatusMessage = (event: any) => {
  fetchSchools();
  if (event.value) {
    statusMessage.value = event.value;
  } else {
    statusMessage.value = "Something went wrong!";
  }
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
};
const activeEdit = (item: any) => {
  selectedSchool.value = {
    title: {
      ku: item.titleKu,
      en: item.titleEn,
      ar: item.titleAr,
      tu: item.titleTu,
    },
    startDate: item.startDate,
    closeDate: item.closeDate,
    attachment: item.attachment,
    isVisible: item.isVisible,
    id: item.id,
  };
  editState.value = true;
};
</script>
