<template>
  <div class="w-10/12 p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <UpdateTeacher
      v-if="editState"
      @cancelEdit="editState = false"
      @statusMessage="(event) => showStatusMessage(event)"
      :teacher="selectedTeacher"
      class="w-5/12"
    />
    <table class="w-full">
      <thead>
        <tr>
          <th class="p-2 border">Name Kurdish</th>
          <th class="p-2 border">Name English</th>
          <th class="p-2 border">Name Arabic</th>
          <th class="p-2 border">Name Turkmen</th>
          <th class="p-2 border">Position Kurdish</th>
          <th class="p-2 border">Position English</th>
          <th class="p-2 border">Position Arabic</th>
          <th class="p-2 border">Positon Turkmen</th>
          <th class="p-2 border">Image</th>
          <th class="p-2 border">Visibility</th>
          <th class="p-2 border">Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td class="border p-2">{{ item.nameKu }}</td>
          <td class="border p-2">{{ item.nameEn }}</td>
          <td class="border p-2">{{ item.nameAr }}</td>
          <td class="border p-2">{{ item.nameTu }}</td>
          <td class="border p-2">{{ item.positionKu }}</td>
          <td class="border p-2">{{ item.positionEn }}</td>
          <td class="border p-2">{{ item.positionAr }}</td>
          <td class="border p-2">{{ item.positionTu }}</td>
          <td class="border p-2">
            <img :src="item.imageUrl" alt="teacher" class="w-20 rounded" />
          </td>

          <td class="border p-4">
            {{ item.isVisible ? "Visible" : "Hidden" }}
          </td>
          <td class="border p-4 text-center">
            <button
              @click="activeEdit(item)"
              class="bg-green-500 hover:bg-green-600 text-white font-bold p-2 pl-4 pr-4 rounded"
            >
              <span class="material-symbols-outlined text-xl">
                edit_square
              </span>
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

const items = ref<Item[]>();

const fetchTeachers = async () => {
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/teachers",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.teachers;
};

onBeforeMount(async () => {
  fetchTeachers();
});

const editState = ref(false);

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
</script>