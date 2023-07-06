<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hideSidebar"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
      <form @submit.prevent="updateSocialMedia" class="grid grid-cols-2 gap-4">
        <label for="value">Social Media Type:</label>
        <input
          v-model="type"
          type="text"
          name="type"
          id="type"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="type">Social Media URL:</label>
        <input
          v-model="url"
          type="text"
          name="url"
          id="url"
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
          <button
            type="button"
            @click="$emit('cancelEdit')"
            class="w-full py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-600"
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

const props = defineProps(["socialMedia"]);
const emit = defineEmits(["cancelEdit", "statusMessage"]);

const url = ref(props.socialMedia.url);
const type = ref(props.socialMedia.type);
const visibility = ref(props.socialMedia.isVisible);
const socialMediaId = props.socialMedia.id;

const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const statusMessage = ref();

const updateSocialMedia = async () => {
  const socialMedia = {
    url: url.value,
    type: type.value,
    isVisible: visibility.value,
  };
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/social-media/${socialMediaId}`,
    socialMedia,
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
