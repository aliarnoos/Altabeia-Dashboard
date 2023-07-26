<template>
  <div class="p-10  ">
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

    <div>
    <h2 class="font-bold text-xl">Activity: </h2>
    <div class="flex flex-wrap gap-6 m-4 mb-10">
      <div v-for="item in filteredItems('activities')" :key="item.id" class="relative">
        <button @click="deleteImage(item.id)" class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 text-center z-20 hover:bg-red-600">
          <i class="fa-solid fa-trash text-xs"></i>
        </button>
        <img
          :src="item.imageUrl"
          class="rounded-lg object-cover border object-center w-60 hover:opacity-30 cursor-pointer"
          alt="image"
          @click="router.push(`/image-slider/${item.id}`)"
        />
      </div>
    </div>
  </div>
    
    <h2 class="mr-auto font-bold text-xl">Campus: </h2>
    <div class="flex items-start flex-wrap  gap-6 m-4 mb-10">
      <div v-for="item in filteredItems('campus')" class=" relative">
        <div :class="!item.isVisible ? 'opacity-40 w-60' : ' w-60'">

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



    <h2 class="mr-auto font-bold text-xl">Kindergarten: </h2>
    <div class="flex items-start flex-wrap  gap-6 m-4 mb-10">
      <div v-for="item in filteredItems('kindergarten')" class=" relative">
        <div :class="!item.isVisible ? 'opacity-40 w-60' : 'w-60'">
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
    <div class="flex items-start flex-wrap  gap-6 m-4 mb-10">
      <div v-for="item in filteredItems('elementarySchool')" class=" relative">
        <div :class="!item.isVisible ? 'opacity-40 w-60' : 'w-60'">
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
    <div class="flex items-start flex-wrap  gap-6 m-4 mb-10">
      <div v-for="item in filteredItems('highSchoolFemales')" class=" relative">
        <div :class="!item.isVisible ? 'opacity-40 w-60' : 'w-60'">
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

    <h2 class="font-bold text-xl">High School - Males: </h2>
    <div class="flex gap-6 m-4 flex-wrap  mb-10">
      <div v-for="item in filteredItems('highSchoolMales')" class=" relative">
        <div :class="!item.isVisible ? 'opacity-40 w-60' : 'w-60'">
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
import { computed, onBeforeMount, ref } from "vue";
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

const filteredItems = ((type: string) => {
  return items?.value?.filter(item => item.contentType === type && item.isVisible);
});


const fetchImages = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/image-slider",
    tokenStore.token || undefined
  );
  items.value = requestStore.fetchedData.imageSlides;
  loadingStore.setFalse();

  console.log(queryItems('campus'))
};

const queryItems = (type: string) => {
  
  const list = items?.value?.map(item => {
    if (item.contentType==type) {
      return item
    }
  })
  return list
}

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
