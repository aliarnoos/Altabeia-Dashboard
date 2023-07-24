<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hideSidebar"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
      <form @submit.prevent="AddUser" class="grid grid-cols-2 gap-4">
        <label for="emil">Email:</label>
        <input
          v-model="email"
          type="email"
          name="emil"
          id="emil"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="password"
          name="password"
          id="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="role">Role:</label>
        <select
          v-model="role"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        >
          <option value="admin" >Admin</option>
          <option value="primary-admin">Primary Admin</option>
        </select>
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Add
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

const email = ref();
const password = ref();
const role = ref('admin');

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const messageStore = useMessageStore();

const AddUser = async () => {
  const user = {
    email: email.value,
    password: password.value,
    roles: role.value,
  };
  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/users/`,
    user,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    emit("cancelEdit");
  }
  emit("added");
};

const hideSidebar = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }
};
</script>
