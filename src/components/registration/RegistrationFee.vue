<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold flex justify-start w-full">
      Registation Fees
    </h1>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Price</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.titleEn }}</td>
          <td class="border p-2 text-center">{{ item.price }}</td>
          <td class="border p-2 text-center">
            <i v-if="item.isVisible" class="fa-solid fa-eye"></i>
            <i v-else-if="!item.isVisible" class="fa-solid fa-eye-slash"></i>
          </td>
          <td class="border p-4 text-center">
            <RouterLink
              :to="`/registration/${item.id}`"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-pen-to-square"></i>
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
  titleEn: string;
  price: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();

const items = ref<Item[]>();

const fetchFees = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/registration-fee",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.registrationFees;
  loadingStore.setFalse();
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
