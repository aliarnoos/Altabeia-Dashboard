<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hideSidebar"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
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
            class="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
          >
            Update
          </button>
          <button
            type="button"
            @click="$emit('cancelEdit')"
            class="w-full py-2 px-4 bg-red-600 text-white font-bold rounded hover:bg-red-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";

const props = defineProps(["fee"]);
const emit = defineEmits(["cancelEdit", "statusMessage"]);

const title = ref(props.fee.title);
const price = ref(props.fee.price);
const visibility = ref(props.fee.isVisible);
const registationId = props.fee.id;

const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const statusMessage = ref();

const updateFee = async () => {
  const fee = {
    title: title.value,
    price: price.value,
    isVisible: visibility.value,
  };
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/registation-fee/${registationId}`,
    fee,
    tokenStore.token || ""
  );
  if (response) {
    statusMessage.value = response.message;
    emit("cancelEdit");
  }
  emit("statusMessage", statusMessage);
};

const hideSidebar = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }
};
</script>
