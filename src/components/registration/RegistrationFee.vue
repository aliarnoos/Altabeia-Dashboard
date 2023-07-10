<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold mb-8 text-center">Registation Fees</h1>

    <UpdateRegistration
      v-if="editState"
      @cancelEdit="editState = false"
      @statusMessage="(event) => showStatusMessage(event)"
      :fee="selectedFee"
      class="w-5/12"
    />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">title Kurdish</th>
          <th class="p-2 border">title English</th>
          <th class="p-2 border">title Arabic</th>
          <th class="p-2 border">title Turkmen</th>
          <th class="p-2 border">Price</th>
          <th class="p-2 border">Visibility</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2">{{ item.titleKu }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <td class="border p-2">{{ item.titleAr }}</td>
          <td class="border p-2">{{ item.titleTu }}</td>
          <td class="border p-2">{{ item.price }}</td>
          <td class="border p-2">
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
import UpdateRegistration from "./UpdateRegistration.vue";

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  price: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const items = ref<Item[]>();

const fetchFees = async () => {
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/registation-fee",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.registrationFees;
};

onBeforeMount(async () => {
  fetchFees();
});

const editState = ref(false);

const selectedFee = ref();

const statusMessage = ref();

const showStatusMessage = (event: any) => {
  fetchFees();
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
    price: item.price,
    isVisible: item.isVisible,
    id: item.id,
  };
  editState.value = true;
};
</script>
