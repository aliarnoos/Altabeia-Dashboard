<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Image</h1>
      <form @submit.prevent="updateImage" class="grid grid-cols-2 gap-4 ">
        <label for="positionAr">Content Type:</label>
        <select
          v-model="contentType"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          required
        >
        <option value="kindergarten">Kindergarten</option>
          <option value="elementarySchool">Elementary School</option>
          <option value="highSchoolMales">High School - Males</option>
          <option value="highSchoolFemales">High School - Females</option>
          <option value="campus">Campus</option>
          <option value="activities">Activities</option>
        </select>

        <label for="image">Image:</label>
        <ImagePreviewInput
        v-model="imageInput"
        :id="1"
        />
        <label for="isVisible">Visible:</label>
        <input
          v-model="visibility"
          type="checkbox"
          name="isVisible"
          id="isVisible"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Update
          </button>
          <RouterLink
            to="/image-slider"
            @click="$emit('cancelEdit')"
            class="w-full py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-600 text-center"
          >
            Back
          </RouterLink>
        </div>
        </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";
import { onBeforeMount } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useRoute, useRouter } from "vue-router";
import { useMessageStore } from "@/stores/statusMessage";
import ImagePreviewInput from "../common/ImagePreviewInput.vue";

interface Item {
  id: number;
  contentType: string
  image: string;
  imageUrl: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();

const contentType = ref();

const id = route.params.id;

const item = ref<Item>();

const fetchImage = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/image-slider/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.imageSlide;

  if (item.value) {
    contentType.value = item.value.contentType
    image.value = item.value.image;
    visibility.value = item.value.isVisible;
  }

  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchImage();
});

let imagePath: string;
const image = ref(item.value?.image);
const visibility = ref(item.value?.isVisible);
let attachmentPath = item.value?.image;

const imageInput = ref();

const updateImage = async () => {
  loadingStore.setLoading();

  if (imageInput?.value?.files?.[0]) {
    await uploadImage();
  }
  const image = {
    contentType: contentType.value,
    image: imagePath,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/image-slider/${id}`,
    image,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/image-slider");
  }
  loadingStore.setFalse();
};

const uploadImage = async () => {
  const file = imageInput.value.files[0];

  if (!file) {
    console.error("No file selected");
    return;
  }
  const fileName = generateUniqueFileName(file.name);
  const formData = new FormData();
  formData.append("file", file, fileName);
  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/presigned-url/`,
    { fileName },
    tokenStore.token || ""
  );

  const { url } = await response;

  const uploadResponse = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (uploadResponse.ok) {
    attachmentPath = fileName;
  } else {
    console.error("Failed to upload file to S3:", uploadResponse.status);
  }
};

const generateUniqueFileName = (fileName: string) => {
  const fileNameWithoutSpaces = fileName.replace(/\s/g, "");

  const timestamp = Date.now();

  const uniqueFileName = `${fileNameWithoutSpaces}_${timestamp}`;
  return uniqueFileName;
};
</script>
