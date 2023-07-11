<template>
  <div class="w-10/12 flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Add New Teacher:</h1>
      <form @submit.prevent="addTeacher" class="grid grid-cols-2 gap-4">
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
        <FilePreviewInput
          @updateFile="(event:any) => fileInput = event.value"
          :required="true"
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
            Add
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
import { ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";
import { useMessageStore } from "@/stores/statusMessage";
import { useRouter } from "vue-router";
import FilePreviewInput from "../common/FilePreviewInput.vue";

const name = {
  ku: "",
  en: "",
  ar: "",
  tu: "",
};
const position = {
  ku: "",
  en: "",
  ar: "",
  tu: "",
};
const visibility = ref(true);
let imagePath: string;
const fileInput = ref();

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const messageStore = useMessageStore();
const router = useRouter();

const addTeacher = async () => {
  if (fileInput?.value?.files?.[0]) {
    await uploadImage();
  }

  const teacher = {
    nameKu: name.ku,
    nameEn: name.en,
    nameAr: name.ar,
    nameTu: name.tu,
    positionKu: position.ku,
    positionEn: position.en,
    positionAr: position.ar,
    positionTu: position.tu,
    image: imagePath,
    isVisible: visibility.value,
  };

  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/`,
    teacher,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/teachers");
  }
};

const uploadImage = async () => {
  const file = fileInput?.value?.files?.[0];

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

  // const uploadResponse = await requestStore.putData(url, formData);
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
