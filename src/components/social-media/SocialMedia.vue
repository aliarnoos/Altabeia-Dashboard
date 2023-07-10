<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <UpdateSocialMedia
      v-if="editState"
      @cancelEdit="editState = false"
      @statusMessage="(event) => showStatusMessage(event)"
      :socialMedia="selectedSocialMedia"
      class="w-5/12"
    />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">Type</th>
          <th class="p-2 border">URL</th>
          <th class="p-2 border">Visibility</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.type }}</td>
          <td class="border p-2 text-center">{{ item.url }}</td>
          <td class="border p-2 text-center">
            {{ item.isVisible ? "Visible" : "Hidden" }}
          </td>
          <td class="border p-2 text-center">
            <button
              @click="activeEdit(item)"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
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
import { useTokenStore } from "@/stores/token";
import { onBeforeMount, ref } from "vue";
import { useRequestStore } from "@/stores/request";
import UpdateSocialMedia from "./UpdateSocialMedia.vue";

interface Item {
  id: number;
  type: string;
  url: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const items = ref<Item[]>();

const fetchSocialMedia = async () => {
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/social-media",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.socialMedia;
};

onBeforeMount(async () => {
  fetchSocialMedia();
});

const editState = ref(false);

const selectedSocialMedia = ref();

const statusMessage = ref();

const showStatusMessage = (event: any) => {
  fetchSocialMedia();
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
  selectedSocialMedia.value = {
    type: item.type,
    url: item.url,
    isVisible: item.isVisible,
    id: item.id,
  };
  editState.value = true;
};
</script>