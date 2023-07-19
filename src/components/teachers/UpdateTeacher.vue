<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Teacher</h1>
      <form @submit.prevent="updateTeacher" class="grid grid-cols-2 gap-4">
        <label for="nameKu">Kurdish Name:</label>
        <input
          v-model="name.ku"
          type="text"
          name="nameKu"
          id="nameKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameEn">English Name:</label>
        <input
          v-model="name.en"
          type="text"
          name="nameEn"
          id="nameEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameAr">Arabic Name:</label>
        <input
          v-model="name.ar"
          type="text"
          name="nameAr"
          id="nameAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameTu">Turkmen Name:</label>
        <input
          v-model="name.tu"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="positionKu">Kurdish Position:</label>
        <input
          v-model="position.ku"
          type="text"
          name="positionKu"
          id="positionKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="positionEn">English Position:</label>
        <input
          v-model="position.en"
          type="text"
          name="positionEn"
          id="positionEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="positionAr">Arabic Position:</label>
        <input
          v-model="position.ar"
          type="text"
          name="positionAr"
          id="positionAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="positionTu">Turkmen Position:</label>
        <input
          v-model="position.tu"
          type="text"
          name="positionTu"
          id="positionTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="image">Image:</label>
        <ImagePreviewInput
          v-model="fileInput"
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
            to="/teachers"
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
import { onBeforeMount, ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";
import { useMessageStore } from "@/stores/statusMessage";
import { useLoadingStore } from "@/stores/loading";
import { useRoute, useRouter } from "vue-router";
import ImagePreviewInput from "@/components/common/ImagePreviewInput.vue";

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();
const id = route.params.id;

interface Item {
  nameEn: string;
  nameAr: string;
  nameKu: string;
  nameTu: string;
  positionEn: string;
  positionAr: string;
  positionKu: string;
  positionTu: string;
  image: string;
  imageUrl: string;
  isVisible: string;
  id: number;
}
const item = ref<Item>();
const fileInput = ref();

const fetchTeacher = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.teacher;
  name.value = {
    ku: item.value?.nameKu,
    en: item.value?.nameEn,
    ar: item.value?.nameAr,
    tu: item.value?.nameTu,
  };
  position.value = {
    ku: item.value?.positionKu,
    en: item.value?.positionEn,
    ar: item.value?.positionAr,
    tu: item.value?.positionTu,
  };
  visibility.value = item.value?.isVisible;
  loadingStore.setFalse();
  console.log(item.value?.imageUrl);
  fileInput.value = item.value?.imageUrl;
};

onBeforeMount(async () => {
  fetchTeacher();
});

const name = ref({
  ku: item.value?.nameKu,
  en: item.value?.nameEn,
  ar: item.value?.nameAr,
  tu: item.value?.nameTu,
});
const position = ref({
  ku: item.value?.positionKu,
  en: item.value?.positionEn,
  ar: item.value?.positionAr,
  tu: item.value?.positionTu,
});
const visibility = ref(item.value?.isVisible);
let imagePath: string;

const removeFile = () => {
  fileInput.value.value = "";
};
const updateTeacher = async () => {
  loadingStore.setLoading();
  if (fileInput?.value?.files?.[0]) {
    await uploadImage();
  }

  const teacher = {
    nameKu: name.value.ku,
    nameEn: name.value.en,
    nameAr: name.value.ar,
    nameTu: name.value.tu,
    positionKu: position.value.ku,
    positionEn: position.value.en,
    positionAr: position.value.ar,
    positionTu: position.value.tu,
    image: imagePath,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/${id}`,
    teacher,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/teachers");
  }
  loadingStore.setFalse();
};

const uploadImage = async () => {
  const file = fileInput.value.files[0];

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
  console.log(fileName);

  const uploadResponse = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  });

  if (uploadResponse.ok) {
    imagePath = fileName;
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
