<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Why Us</h1>
      <RouterLink
        to="/why-us/add"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <i class="fa-solid fa-plus"></i>
        <p>Add Feature</p>
      </RouterLink>
    </div>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">Titile</th>
          <th class="p-2 border table-cell">SubTitile</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr>
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto text-center">
            {{ item.titleEn }}
          </td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            {{ item.subTitleEn }}
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
              :to="`/why-us/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteFeature(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
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
  subTitleKu: string;
  subTitleEn: string;
  subTitleAr: string;
  subTitleTu: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTu: string;
  contentType: string
  isVisible: string;
}

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();

const items = ref<Item[]>();

const fetchFeatures = async () => {
  loadingStore.setLoading();
  const url = new URL(`${import.meta.env.VITE_API_URL}/admin/general-content`);
    url.searchParams.append('contentType', 'whyUs');
  
  const response = await requestStore.getData(url.toString(), tokenStore.token || undefined);
  items.value = requestStore.fetchedData?.generalContent;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchFeatures();
});

const deleteFeature = async (id: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/general-content/${id}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  fetchFeatures();
};
</script>
