<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-lg font-bold mb-8">Change Password</h1>
      <form @submit.prevent="updatePassword" class="grid grid-cols-2 gap-4">
        <label for="password">Password:</label>
        <input
          v-model="password"
          type="text"
          name="password"
          id="password"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="newPassword">New Password:</label>
        <input
          v-model="newPassword"
          type="text"
          name="newPassword"
          id="newPassword"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="confPassword">Confirm New Password:</label>
        <input
          v-model="confPassword"
          type="text"
          name="confPassword"
          id="confPassword"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Update
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-600 text-xs mb-3">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRequestStore } from "@/stores/request";
import { useMessageStore } from "@/stores/statusMessage";
import { useTokenStore } from "@/stores/token";
import { ref } from "vue";

const requestStore = useRequestStore();
const tokenStore = useTokenStore();
const statusMessage = useMessageStore();

const password = ref();
const newPassword = ref();
const confPassword = ref();
const errorMessage = ref();

const updatePassword = async () => {
  if (newPassword.value != confPassword.value) {
    errorMessage.value = "Passwords do not match!";
  } else {
    errorMessage.value = null;
    const response = await requestStore.updateData(
      `${import.meta.env.VITE_API_URL}/admin/me/password`,
      { password: password.value, newPassword: newPassword.value },
      tokenStore.token || ""
    );
    if (response) {
      statusMessage.setMessage(response.message);
    }
    password.value = null;
    newPassword.value = null;
    confPassword.value = null;
  }
};
</script>
