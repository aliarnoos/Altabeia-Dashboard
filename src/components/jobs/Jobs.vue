<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Jobs</h1>
      <RouterLink
        to="jobs/add"
        class="bg-green-500 rounded p-4 text-white font-bold hover:bg-green-600"
      >
        Add Job
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
          <td class="border p-4 text-center">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-4 text-center flex justify-center gap-4">
            <RouterLink
              :to="`/jobs/${item.id}`"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
            </RouterLink>
            <button
              @click="deleteJob(item.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl"> delete </span>
            </button>
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
  startDate: string;
  closeDate: string;
  attachment: string;
  attachmentUrl: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();

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

const statusMessage = ref();

const showStatusMessage = (event: any) => {
  fetchJobs();
  if (event.value) {
    statusMessage.value = event.value;
  } else {
    statusMessage.value = "Something went wrong!";
  }
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
};
// const activeEdit = (item: any) => {
//   selectedJob.value = {
//     title: {
//       ku: item.titleKu,
//       en: item.titleEn,
//       ar: item.titleAr,
//       tu: item.titleTu,
//     },
//     startDate: item.startDate,
//     closeDate: item.closeDate,
//     attachment: item.attachment,
//     isVisible: item.isVisible,
//     id: item.id,
//   };
//   editState.value = true;
// };

const deleteJob = async (jobId: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/jobs/${jobId}`,
    tokenStore.token || ""
  );
  console.log(response);
  statusMessage.value = response.message;
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
  fetchJobs();
};
</script>
