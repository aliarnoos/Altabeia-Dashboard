<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Jobs</h1>
    <!-- <UpdateRegistration
      v-if="editState"
      @cancelEdit="editState = false"
      @statusMessage="(event) => showStatusMessage(event)"
      :fee="selectedFee"
      class="w-5/12"
    /> -->
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">title Kurdish</th>
          <th class="p-2 border">title English</th>
          <th class="p-2 border">title Arabic</th>
          <th class="p-2 border">title Turkmen</th>
          <th class="p-2 border">Start Date</th>
          <th class="p-2 border">Close Date</th>
          <th class="p-2 border">Attachment</th>
          <th class="p-2 border">Visibility</th>
          <th class="p-2 border">Edit</th>
          <th class="p-2 border">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2">{{ item.titleKu }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <td class="border p-2">{{ item.titleAr }}</td>
          <td class="border p-2">{{ item.titleTu }}</td>
          <td class="border p-2">{{ item.startDate }}</td>
          <td class="border p-2">{{ item.closeDate }}</td>
          <td class="border p-2">{{ item.attachment }}</td>

          <td class="border p-4">
            {{ item.isVisible ? "Visible" : "Hidden" }}
          </td>
          <td class="border p-4 text-center">
            <button
              @click="activeEdit(item)"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
            </button>
          </td>
          <td class="border p-2">
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

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  startDate: string;
  closeDate: string;
  attachment: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const items = ref<Item[]>();

const fetchJobs = async () => {
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/jobs",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.jobs;
};

onBeforeMount(async () => {
  fetchJobs();
});

const editState = ref(false);

const selectedFee = ref();

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
const activeEdit = (item: any) => {
  selectedFee.value = {
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
