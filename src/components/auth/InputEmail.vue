<template>
  <div class="flex justify-center items-center m-20">
    <div v-if="!isSent" class="bg-white">
      <h1 class="text-lg font-bold mb-8">Enter your Email: </h1>
      <form @submit.prevent="sendLink" class="grid grid-cols-2 gap-4">
        <label for="email">Email:</label>
        <input
          v-model="email"
          type="text"
          name="email"
          id="email"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Send
          </button>
        </div>
        <p v-if="errorMessage" class="text-red-600 text-xs mb-3">
          {{ errorMessage }}
        </p>
      </form>
    </div>
    
    <div v-else-if="isSent" class="flex justify-center items-center flex-col gap-8">
      <h1 class=" text-4xl">A reset link has been sent to your Email!</h1>
      <i class="fa-regular fa-circle-check text-8xl text-green-600"></i>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import { useRequestStore } from "@/stores/request";
import { useMessageStore } from "@/stores/statusMessage";
import { useTokenStore } from "@/stores/token";
import { ref } from "vue";

const requestStore = useRequestStore();
const tokenStore = useTokenStore();
const statusMessage = useMessageStore();
const loadingStore = useLoadingStore()

const email = ref();
const errorMessage = ref();

const isSent = ref(false)

const sendLink = async () => {
  loadingStore.setLoading()
    errorMessage.value = null;
    const response = await requestStore.postData(
      `${import.meta.env.VITE_API_URL}/admin/send-password-reset-link`,
      { email: email.value },
      tokenStore.token || ""
    );
    if (response) {
    statusMessage.setMessage(response.message);
    email.value = null;
    isSent.value = true
  }
  loadingStore.setFalse()
};
</script>
