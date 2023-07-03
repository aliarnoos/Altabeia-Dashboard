<template>
  <div>
    <form @submit.prevent="addContact">
      <label for="type">Contact Type:</label>
      <select
        v-model="type"
        class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
      >
        <option value="Email">Email</option>
        <option value="Phone">Phone</option>
        <option value="Address">Address</option>
      </select>
      <label for="value">Contact Value:</label>
      <input
        v-model="value"
        type="text"
        name="value"
        id="value"
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
      <button
        class="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700"
      >
        Add
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import sendHttpRequest from "../../api/httpRequest";
import { useTokenStore } from "../../stores/token";

const type = ref("");
const value = ref("");
const visibility = ref(true);

const tokenStore = useTokenStore();
const addContact = async () => {
  try {
    const response = await sendHttpRequest(
      "POST",
      "http://localhost:3000/admin/contacts",
      {
        type: type.value,
        value: value.value,
        isVisible: visibility.value,
      },
      tokenStore.token
    );
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};
</script>

<style scoped></style>
