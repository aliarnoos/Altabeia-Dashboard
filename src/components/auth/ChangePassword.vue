<template class="w-5/12">
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
      <form @submit.prevent="updatePassword" class="grid grid-cols-2 gap-4">
        <label for="password">New Password:</label>
        <input
          v-model="password"
          type="text"
          name="password"
          id="password"
          required
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
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { ref } from "vue";

const requestStore = useRequestStore();
const tokenStore = useTokenStore();

const emit = defineEmits(["cancelEdit", "statusMessage"]);

const password = ref();
const statusMessage = ref();

const updatePassword = async () => {
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/me/password`,
    { newPassword: password.value },
    tokenStore.token || ""
  );
  if (response) {
    statusMessage.value = response.message;
    emit("cancelEdit");
  }
  emit("statusMessage", statusMessage);
};
</script>
