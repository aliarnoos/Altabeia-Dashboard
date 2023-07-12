<template>
  <div class="flex justify-center items-center">
    <div class="bg-white w-8/12">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Registation Fee</h1>
      <form @submit.prevent="updateFee" class="grid grid-cols-2 gap-4">
        <label for="titleKu">Kurdish Title:</label>
        <input
          v-model="title.ku"
          type="text"
          name="titleKu"
          id="titleKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="titleEn">English Title:</label>
        <input
          v-model="title.en"
          type="text"
          name="titleEn"
          id="titleEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="titleAr"> Arabic Title:</label>
        <input
          v-model="title.ar"
          type="text"
          name="titleAr"
          id="titleAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="titleTu">Turkmen Title:</label>
        <input
          v-model="title.tu"
          type="text"
          name="titleTu"
          id="titleTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="price">Price:</label>
        <input
          v-model="price"
          type="text"
          name="price"
          id="price"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="isVisible">Visible:</label>
        <input
          v-model="visibility"
          type="checkbox"
          name="isVisible"
          id="isVisible"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Update
          </button>
          <RouterLink
            to="/registration"
            class="w-full py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-600 text-center"
          >
            Cancel
          </RouterLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";
import { useMessageStore } from "@/stores/statusMessage";
import { useRoute, useRouter } from "vue-router";
import { useLoadingStore } from "@/stores/loading";

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  price: string;
  isVisible: string;
}
const item = ref<Item>();

const loadingStore = useLoadingStore();
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();

const title = ref({
  ku: item.value?.titleKu,
  en: item.value?.titleEn,
  ar: item.value?.titleAr,
  tu: item.value?.titleTu,
});
const price = ref(item?.value?.price);
const visibility = ref(item?.value?.isVisible);
const id = route.params.id;

const fetchFee = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/registration-fee/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.registrationFee;

  title.value = {
    ku: item.value?.titleKu,
    en: item.value?.titleEn,
    ar: item.value?.titleAr,
    tu: item.value?.titleTu,
  };
  price.value = item?.value?.price;
  visibility.value = item.value?.isVisible;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchFee();
});

const updateFee = async () => {
  const fee = {
    title: title.value,
    price: price.value,
    isVisible: visibility.value,
  };
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/registration-fee/${id}`,
    fee,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/registration");
  }
};
</script>
