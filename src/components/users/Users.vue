<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Users</h1>
      <button
        v-if="userStore.user?.roles=='primary-admin'"
        @click="activeEdit"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <i class="fa-solid fa-plus"></i>
        <p>Add User</p>
      </button>
    </div>    
    <AddUser
      v-if="editState"
      @cancelEdit="editState = false"
      @added="() => fetchUsers()"
      class="w-5/12"
    />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Email</th>
          <th class="p-2 border">Role</th>
          <th class="p-2 border">State</th>
          <th v-if="userStore.user?.roles=='primary-admin'" class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2 text-center">{{ item.email }}</td>
          <td class="border p-2 text-center">{{ item.roles }}</td>
          <td class="border p-2"> 
            <div :class=" (item.state=='active' ? 'bg-green-500 w-4 h-4 rounded-full ml-auto mr-auto' : 'bg-red-500 w-4 h-4 rounded-full  ml-auto mr-auto') "></div>
          </td>
          <td v-if="userStore.user?.roles=='primary-admin'" class="border p-2 text-center">
            <button
              @click="toggleState(item)"
              class="hover:text-green-700 font-bold p-2 pl-4 pr-4 rounded"
            >
            <i v-if="item.state=='active'" class="fa-solid fa-stop"></i>
            <i v-else class="fa-solid fa-play"></i>
            {{ item.state=='active' ? 'Suspend' : 'Activate' }}
            </button>
            <!-- <span class="text-xl">|</span>
            <button
              @click="deleteUser(item.id)"
              class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <i class="fa-solid fa-trash"></i>
            </button> -->
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "@/stores/token";
import { onBeforeMount, ref } from "vue";
import { useRequestStore } from "@/stores/request";
import { useLoadingStore } from "@/stores/loading";
import { useMessageStore } from "@/stores/statusMessage";
import { useUserStore } from "@/stores/user";
import AddUser from "./AddUser.vue";

interface Item {
  id: number;
  email: string;
  roles: string;
  state: string
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore()
const userStore = useUserStore()
const items = ref<Item[]>();

const fetchUsers = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/users",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.users;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchUsers();
});

// const role = ref()

const editState = ref(false);

const selectedUser = ref();

const toggleState = async (item: Item) => {
  loadingStore.setLoading()
  const newState = item.state=='active' ? 'suspended' : 'active'
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/users/${item.id}`,
    {state: newState},
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
}
fetchUsers()
}

const activeEdit = (item: any) => {
  selectedUser.value = {
    email: item.email,
    roles: item.roles,
    id: item.id,
  };
  editState.value = true;
};

const deleteUser = async (id: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/users/${id}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  fetchUsers();
};
</script>
