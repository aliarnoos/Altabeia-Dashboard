<template>
  <div class="w-10/12 p-10 flex flex-col gap-10">
    <AddContact v-if="editState" />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-4 border">Type</th>
          <th class="p-4 border">Value</th>
          <th class="p-4 border">Visibility</th>
          <th class="p-4 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-4">{{ item.type }}</td>
          <td class="border p-4">{{ item.value }}</td>
          <td class="border p-4">
            {{ item.isVisible ? "Visible" : "Hidden" }}
          </td>
          <td class="border p-4 flex justify-center">
            <button
              @click="toogleEdit"
              class="bg-green-500 hover:bg-green-700 text-white font-bold p-4 rounded"
            >
              Edit
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import sendHttpRequest from "@/api/httpRequest";
import { useTokenStore } from "@/stores/token";
import { onBeforeMount, ref } from "vue";
import AddContact from "../../components/contacts/AddContact.vue";
interface Item {
  id: number;
  type: string;
  value: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const items = ref<Item[]>();
const fetchContacts = async () => {
  try {
    const response = await sendHttpRequest(
      "GET",
      "http://localhost:3000/admin/contacts",
      {},
      tokenStore.token
    );
    console.log(response);
    items.value = response.data.contacts;
  } catch (error) {
    console.error(error);
  }
};
onBeforeMount(() => {
  fetchContacts();
});

const editState = ref(false);

const toogleEdit = (e: Event) => {
  editState.value = !editState.value;
};
</script>
