<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Teachers</h1>
      <RouterLink
        to="/teachers/add"
        class="flex justify-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <span class="material-symbols-outlined"> add </span>
        Add Teacher
      </RouterLink>
    </div>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">ID</th>
          <th class="p-2 border">Name</th>
          <th class="p-2 border">Position</th>
          <th class="p-2 border">Visible</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-center">{{ item.id }}</td>
          <td class="border p-2">{{ item.nameEn }}</td>
          <td class="border p-2">{{ item.positionEn }}</td>

          <td class="border p-2">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 flex justify-center items-center gap-4">
            <RouterLink
              :to="`/teachers/${item.id}`"
              class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined"> edit_square </span>
            </RouterLink>
            <p class="text-xl">|</p>
            <button
              @click="deleteTeacher(item.id)"
              class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "../../stores/request";
import { onBeforeMount, ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useMessageStore } from "@/stores/statusMessage";

interface Item {
  nameEn: string;
  positionEn: string;
  imageUrl: string;
  isVisible: string;
  id: number;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();

const items = ref<Item[]>();

const fetchTeachers = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/teachers",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.teachers;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchTeachers();
});

const deleteTeacher = async (teacherId: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/${teacherId}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  fetchTeachers();
};
</script>
