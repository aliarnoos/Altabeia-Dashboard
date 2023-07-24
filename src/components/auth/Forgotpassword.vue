<template>
  <div class="flex justify-center items-center m-20">
    <div class="bg-white">
      <h1 class="text-lg font-bold mb-8">Change Password</h1>
      <form @submit.prevent="updatePassword" class="grid grid-cols-2 gap-4">
        <label for="newPassword">New Password:</label>
        <input
          v-model="newPassword"
          type="password"
          name="newPassword"
          id="newPassword"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="confPassword">Confirm New Password:</label>
        <input
          v-model="confPassword"
          type="password"
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
import jwtDecode from "jwt-decode";
import { onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const requestStore = useRequestStore();
const tokenStore = useTokenStore();
const messageStore = useMessageStore();
const route = useRoute()
const router = useRouter()

const newPassword = ref();
const confPassword = ref();
const errorMessage = ref();


const resetToken = route.query.resetToken?.toLocaleString(); 


const validateToken = async (token: string) => {
  try {
    const decodedToken: any = jwtDecode(token);

    if (decodedToken.exp) {
      const currentTimestamp = Date.now() / 1000; 
      if (decodedToken.exp < currentTimestamp) {
        // Token is expired
        router.replace('/login')
        messageStore.setMessage('Invalid URL!')
        return false;
      }
    }

    return true;
  } catch (error) {
    return false;
  }
}

onBeforeMount(() => {
  const resetToken = route.query.resetToken?.toLocaleString() || ""; 
  validateToken(resetToken)
})
const updatePassword = async () => {
  if (newPassword.value != confPassword.value) {
    errorMessage.value = "Passwords do not match!";
  } else {
    errorMessage.value = null;
    const response = await requestStore.postData(
      `${import.meta.env.VITE_API_URL}/admin/reset-password`,
      { newPassword: newPassword.value, resetToken },
        resetToken || ""
    );
    if (response) {
      messageStore.setMessage(response.message);
    }
    newPassword.value = null;
    confPassword.value = null;
    router.replace('/login')
  }
};
</script>
