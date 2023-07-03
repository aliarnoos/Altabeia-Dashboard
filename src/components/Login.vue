<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 shadow-md rounded-md w-80">
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
          class="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenStore } from "../stores/token";
import { useRouter } from "vue-router";
import sendHttpRequest from "../api/httpRequest";

const router = useRouter();

const email = ref("");
const password = ref("");
const tokenStore = useTokenStore();

async function login() {
  const emailValue = email.value;
  const passwordValue = password.value;

  try {
    const response = await sendHttpRequest(
      "POST",
      "http://localhost:3000/admin/signin",
      {
        email: emailValue,
        password: passwordValue,
      }
    );
    console.log(response);
    const { access_token, expire_date } = response;

    tokenStore.setToken(access_token);
    router.push("/");
  } catch (error) {
    console.error(error);
  }
}

//   try {
//     const response = await fetch("http://localhost:3000/admin/signin", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email: emailValue, password: passwordValue }),
//       credentials: "include", // Send and receive cookies with the request
//     });

//     if (!response.ok) {
//       throw new Error("Login failed");
//     }

//     const data = await response.json();
//     const { access_token, expire_date } = data;

//     console.log(data);
//     tokenStore.setToken(access_token);
//     router.push("/");
//   } catch (error) {
//     console.error(error);
//   }
// }
</script>
../api/httpRequest
