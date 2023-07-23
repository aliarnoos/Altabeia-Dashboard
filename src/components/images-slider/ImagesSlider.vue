<template>
  <div class="p-10 flex items-center flex-col gap-10 overflow-x-auto">
    <div class="flex items-center justify-between w-full">
      <h1 class="text-3xl font-bold text-center">Images</h1>
      <RouterLink
        to="/image-slider/add"
        class="flex justify-center items-center gap-2 bg-green-500 rounded p-4 text-white ml-auto font-bold hover:bg-green-600"
      >
        <i class="fa-solid fa-plus"></i>
        <p>Add Image</p>
      </RouterLink>
    </div>
    <h2 class="mr-auto font-bold text-xl">Campus: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">Image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='campus'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
                :to="`/image-slider/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="mr-auto font-bold text-xl">Activities: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">Image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='activities'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
                :to="`/image-slider/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="mr-auto font-bold text-xl">Kindergarten: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">Image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='kindergarten'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
              :to="`/image-slider/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="mr-auto font-bold text-xl">Elementary School: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">Image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='elementarySchool'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
              :to="`/image-slider/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="mr-auto font-bold text-xl">High School - Females: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='highSchoolFemales'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
              :to="`/image-slider/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <h2 class="mr-auto font-bold text-xl">High School - Males: </h2>
    <table class="w-full table">
      <thead>
        <tr>
          <th class="p-2 border table-cell">ID</th>
          <th class="p-2 border table-cell">image</th>
          <th class="p-2 border table-cell">Visible</th>
          <th class="p-2 border table-cell">Actions</th>
        </tr>
      </thead>
      <tbody v-for="item in items" :key="item.id">
        <tr v-if="item.contentType=='highSchoolMales'">
          <td class="border p-2 table-cell text-center">{{ item.id }}</td>
          <td class="border p-2 justify-center table-cell ml-auto mr-auto">
            <img :src="item.imageUrl" alt="slide image" class="w-20 ml-auto mr-auto">
          </td>
          <td class="border p-2 text-center table-cell">
            {{ item.isVisible ? "Yes" : "No" }}
          </td>
          <td class="border p-2 justify-center items-center gap-4 table-cell">
            <div class="flex justify-center items-center">
              <RouterLink
                :to="`/teachers/${item.id}`"
                class="hover:text-green-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-pen-to-square"></i>
              </RouterLink>
              <p class="text-xl">|</p>
              <button
                @click="deleteTeacher(item.id)"
                class="hover:text-red-600 font-bold p-2 pl-4 pr-4 rounded"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
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
  image: string;
  contentId: number;
  contentType: string;
  imageUrl: string;
  isVisible: string;
  id: number;
}

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();

const items = ref<Item[]>();

const fetchImages = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/image-slider",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.imageSlides;
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchImages();
});

const deleteTeacher = async (id: number) => {
  const response = await requestStore.deleteData(
    `${import.meta.env.VITE_API_URL}/admin/image-slider/${id}`,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  fetchImages();
};
</script>
