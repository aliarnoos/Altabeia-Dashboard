<template>
  <div class="p-10 ">
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
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='campus'" :class="!item.isVisible ? 'opacity-40' : ''">

          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />    

        </div>
      </div>
    </div>

    <h2 class="mr-auto font-bold text-xl">Activity: </h2>
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='activity'" :class="!item.isVisible ? 'opacity-40' : ''">

          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />   
        </div>
      </div>
    </div>

    <h2 class="mr-auto font-bold text-xl">kindergaten: </h2>
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='kindergaten'" :class="!item.isVisible ? 'opacity-40' : ''">
          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />    
        </div>
      </div>
    </div>

    <h2 class="mr-auto font-bold text-xl">Elementary School: </h2>
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='elementarySchool'" :class="!item.isVisible ? 'opacity-40' : ''">
          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />    
        </div>
      </div>
    </div>

    <h2 class="mr-auto font-bold text-xl">High School - Females: </h2>
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='highSchoolFemales'" :class="!item.isVisible ? 'opacity-40' : ''">
          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />    
        </div>
      </div>
    </div>

    <h2 class="mr-auto font-bold text-xl">High School - Males: </h2>
    <div class="flex items-start gap-6 m-4 mb-10">
      <div v-for="item in items" class=" relative">
        <div v-if="item.contentType=='highSchoolMales'" :class="!item.isVisible ? 'opacity-40' : ''">
          <button @click="deleteImage(item.id)" class=" absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
            <i class="fa-solid fa-trash text-xs"></i>
          </button>
            <img
              :src="item.imageUrl" 
              class=" rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
              alt="image"
              @click="router.push(`/image-slider/${item.id}`)"
            />    
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "../../stores/request";
import { onBeforeMount, ref } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useMessageStore } from "@/stores/statusMessage";
import { useRouter } from "vue-router";

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
const router = useRouter()
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

const deleteImage = async (id: number) => {
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
