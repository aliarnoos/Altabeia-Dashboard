<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Contacts</h1>
      <button
        @click="addState=true"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <i class="fa-solid fa-plus"></i>
        <p>Add Contact</p>
      </button>
      </div>
    <UpdateContact
      v-if="editState"
      @cancelEdit="editState = false"
      @updated="() => fetchContacts()"
      :contact="selectedContact"
      class="w-5/12"
    />
    <AddContact
      v-if="addState"
      @cancelEdit="addState = false"
      @added="() => fetchContacts()"
      class="w-5/12"
    />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Type</th>
          <th class="p-2 border">Value</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2 text-center">{{ item.type }}</td>
          <td class="border p-2 text-center">{{ item.value }}</td>
          <td class="border p-2 text-center">
            <i v-if="item.isVisible" class="fa-solid fa-eye"></i>
            <i v-else-if="!item.isVisible" class="fa-solid fa-eye-slash"></i>
          </td>
          <td class="border p-2 text-center">
            <button
              @click="activeEdit(item)"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-pen-to-square"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "@/stores/token";
import { onBeforeMount, ref } from "vue";
import UpdateContact from "../../components/contacts/UpdateContact.vue";
import { useRequestStore } from "@/stores/request";
import { useLoadingStore } from "@/stores/loading";
import AddContact from "./AddContact.vue";
interface Item {
  id: number;
  type: string;
  value: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const items = ref<Item[]>();

const fetchContacts = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/contacts",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.contacts;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchContacts();
});

const editState = ref(false);
const addState = ref(false);

const selectedContact = ref();

// const statusMessage = ref();

// const showStatusMessage = (event: any) => {
//   fetchContacts();
//   if (event.value) {
//     statusMessage.value = event.value;
//   } else {
//     statusMessage.value = "Something went wrong!";
//   }
//   setTimeout(() => {
//     statusMessage.value = null;
//   }, 2000);
// };
const activeEdit = (item: any) => {
  selectedContact.value = {
    type: item.type,
    value: item.value,
    isVisible: item.isVisible,
    id: item.id,
  };
  editState.value = true;
};
</script>
