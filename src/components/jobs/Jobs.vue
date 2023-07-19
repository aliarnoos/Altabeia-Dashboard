<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Jobs</h1>
      <RouterLink
        to="jobs/add"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white font-bold hover:bg-green-600"
      >
      <i class="fa-solid fa-plus"></i>
      <span>

        Add Job
      </span>
      </RouterLink>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Start Date</th>
          <th class="p-2 border">Close Date</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <td class="border p-2">{{ item.startDate }}</td>
          <td class="border p-2">{{ item.closeDate }}</td>
          <td class="border p-2 text-center">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td
            class="border p-2 text-center flex justify-center items-center gap-4"
          >
            <RouterLink
              :to="`/jobs/${item.id}`"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </RouterLink>
            <p class="text-xl">|</p>
            <button
              @click="deleteJob(item.id)"
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
  startDate: string;
  closeDate: string;
  attachment: string;
  attachmentUrl: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();

const items = ref<Item[]>();

const fetchJobs = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/jobs",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.jobs;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchJobs();
});

const deleteJob = async (jobId: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/jobs/${jobId}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }

  fetchJobs();
};
</script>
