<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Add New Job</h1>
      <form @submit.prevent="addJob" class="grid grid-cols-2 gap-6">
        <label for="nameKu">Titile_KU:</label>
        <input
          v-model="title.ku"
          type="text"
          name="nameKu"
          id="nameKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameEn">Titile_EN:</label>
        <input
          v-model="title.en"
          type="text"
          name="nameEn"
          id="nameEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameAr">Titile_AR:</label>
        <input
          v-model="title.ar"
          type="text"
          name="nameAr"
          id="nameAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="nameTu">Titile_TU:</label>
        <input
          v-model="title.tu"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="startDate">Start Date:</label>
        <input
          v-model="startDate"
          type="date"
          name="startDate"
          id="startDate"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="closeDate">Close Date:</label>
        <input
          v-model="closeDate"
          type="date"
          name="closeDate"
          id="closeDate"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="attachment">Attachment:</label>
        <FileInput
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
            to="/jobs"
            class="w-full py-2 px-4 text-center bg-gray-500 text-white font-bold rounded hover:bg-gray-600"
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
import { useRouter } from "vue-router";
import { useMessageStore } from "@/stores/statusMessage";
import FileInput from "../common/FileInput.vue";

const title = {
  ku: "",
  en: "",
  ar: "",
  tu: "",
};
const startDate = ref();
const closeDate = ref();
const visibility = ref(true);
let attachmentPath: string;

const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const messageStore = useMessageStore();

const router = useRouter();

const fileInput = ref();

const removeFile = () => {
  fileInput.value.value = "";
};
const addJob = async () => {
  if (fileInput.value.files[0]) {
    await uploadImage();
  }
  const job = {
    titleKu: title.ku,
    titleEn: title.en,
    titleAr: title.ar,
    titleTu: title.tu,
    startDate: startDate.value,
    closeDate: closeDate.value,
    attachment: attachmentPath,
    isVisible: visibility.value,
  };

  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/jobs/`,
    job,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/jobs");
  }
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

  // const uploadResponse = await requestStore.putData(url, formData);
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
