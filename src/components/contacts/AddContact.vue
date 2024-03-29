<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hideSidebar"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
      <form @submit.prevent="updateContact" class="grid grid-cols-2 gap-4">
        <label for="value">Contact Value:</label>
        <input
          v-model="value"
          type="text"
          name="value"
          id="value"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="type">Contact Type:</label>
        <select
          v-model="type"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        >
          <option value="Email">Email</option>
          <option value="Phone">Phone</option>
          <option value="Address">Address</option>
        </select>
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
            class="w-full py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-600"
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
import { useMessageStore } from "@/stores/statusMessage";

const emit = defineEmits(["cancelEdit", "added"]);

const type = ref();
const value = ref();
const visibility = ref(true);

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const messageStore = useMessageStore();

const statusMessage = ref();

const updateContact = async () => {
  const contact = {
    type: type.value,
    value: value.value,
    isVisible: visibility.value,
  };
  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/contacts/`,
    contact,
    tokenStore.token || ""
  );
  if (response) {
    statusMessage.value = response.message;
    emit("cancelEdit");
  }
  emit("added");
  messageStore.setMessage(response.message);
};

const hideSidebar = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }
};
</script>
