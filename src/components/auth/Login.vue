<template>
  <div
    class="flex flex-col gap-10 justify-center items-center min-h-screen bg-gray-100"
  >
    <h1 class="text-4xl bold">Welocme:</h1>

    <div
      class="bg-white p-8 flex justify-center flex-col gap-4 shadow-md rounded-md w-80"
    >
      <h2 class="text-2xl font-bold mb-4">Login</h2>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Email</label
          >
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
            required
          />
        </div>
        <div class="mb-6">
          <label
            for="password"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Password</label
          >
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
            required
          />
        </div>
        <button
          type="button"
          @click="login"
          class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
        >
          Login
        </button>
      </form>
      <p v-if="errorMessage" class="text-red-600 font-bold">
        Wrong email or password!
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRouter } from "vue-router";
import { useRequestStore } from "@/stores/request";

const router = useRouter();
const requestStore = useRequestStore();
const email = ref("");
const password = ref("");
const tokenStore = useTokenStore();

const errorMessage = ref();

async function login() {
  const emailValue = email.value;
  const passwordValue = password.value;
  const response = await requestStore.postData(
    import.meta.env.VITE_API_URL + "/admin/signin",
    { email: emailValue, password: passwordValue },
    tokenStore.token || ""
  );
  if (response.access_token) {
    const { access_token, expire_date } = response;
    tokenStore.setToken(access_token, expire_date);
    router.replace("/");
  } else {
    errorMessage.value = response.message;
  }
}
</script>
