<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold mb-4 text-center">Teachers</h1>
    <UpdateTeacher
      v-if="editState"
      @cancelEdit="editState = false"
      @statusMessage="(event) => showStatusMessage(event)"
      :teacher="selectedTeacher"
      class="w-5/12"
    />
    <AddTeacherVue
      v-if="addTeacherState"
      @cancelEdit="addTeacherState = false"
      @statusMessage="(event: Event) => showStatusMessage(event)"
      class="w-5/12"
    />
    <button
      @click="() => (addTeacherState = true)"
      class="bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
    >
      Add Teacher
    </button>
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border text-xs">Name_KU</th>
          <th class="p-2 border text-xs">Name_EN</th>
          <th class="p-2 border text-xs">Name_AR</th>
          <th class="p-2 border text-xs">Name_TU</th>
          <th class="p-2 border text-xs">Position_KU</th>
          <th class="p-2 border text-xs">Position_EN</th>
          <th class="p-2 border text-xs">Position_AR</th>
          <th class="p-2 border text-xs">Positon_TU</th>
          <th class="p-2 border text-xs">Image</th>
          <th class="p-2 border text-xs">Visibility</th>
          <th class="p-2 border text-xs">Edit</th>
          <th class="p-2 border text-xs">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2 text-xs">{{ item.nameKu }}</td>
          <td class="border p-2 text-xs">{{ item.nameEn }}</td>
          <td class="border p-2 text-xs">{{ item.nameAr }}</td>
          <td class="border p-2 text-xs">{{ item.nameTu }}</td>
          <td class="border p-2 text-xs">{{ item.positionKu }}</td>
          <td class="border p-2 text-xs">{{ item.positionEn }}</td>
          <td class="border p-2 text-xs">{{ item.positionAr }}</td>
          <td class="border p-2 text-xs">{{ item.positionTu }}</td>
          <td class="border p-2 text-xs flex justify-center items-center">
            <img :src="item.imageUrl" alt="teacher" class="w-20 rounded" />
          </td>

          <td class="border p-2">
            {{ item.isVisible ? "Visible" : "Hidden" }}
          </td>
          <td class="border p-2 text-center">
            <button
              @click="activeEdit(item)"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
            </button>
          </td>
          <td class="border p-2 text-center">
            <button
              @click="deleteTeacher(item.id)"
              class="bg-red-500 hover:bg-red-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl"> delete </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p
      v-if="statusMessage == 'Something went wrong!'"
      class="bg-red-500 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessage }}
    </p>
    <p
      v-else-if="statusMessage"
      class="bg-green-500 text-white px-4 py-2 rounded absolute top-10 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "../../stores/request";
import { onBeforeMount, ref } from "vue";
import UpdateTeacher from "./UpdateTeacher.vue";
import AddTeacherVue from "./AddTeacher.vue";
import { useLoadingStore } from "@/stores/loading";

interface Item {
  nameKu: string;
  nameEn: string;
  nameAr: string;
  nameTu: string;
  positionKu: string;
  positionEn: string;
  positionAr: string;
  positionTu: string;
  imageUrl: string;
  isVisible: string;
  id: number;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();

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

const editState = ref(false);
const addTeacherState = ref(false);
const selectedTeacher = ref();

const statusMessage = ref();

const showStatusMessage = (event: any) => {
  fetchTeachers();
  if (event.value) {
    statusMessage.value = event.value;
  } else {
    statusMessage.value = "Something went wrong!";
  }
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
};
const activeEdit = (item: any) => {
  selectedTeacher.value = {
    name: {
      ku: item.nameKu,
      en: item.nameEn,
      ar: item.nameAr,
      tu: item.nameTu,
    },
    position: {
      ku: item.positionKu,
      en: item.positionEn,
      ar: item.positionAr,
      tu: item.positionTu,
    },
    imageUrl: item.imageUrl,
    isVisible: item.isVisible,
    id: item.id,
  };
  editState.value = true;
};

const deleteTeacher = async (teacherId: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/${teacherId}`,
    tokenStore.token || ""
  );
  console.log(response);
  statusMessage.value = response.message;
  setTimeout(() => {
    statusMessage.value = null;
  }, 2000);
  fetchTeachers();
};
</script>
