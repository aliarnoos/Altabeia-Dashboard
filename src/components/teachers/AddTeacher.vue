<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hidePopup"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
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
        <div class="flex gap-2">
          <input
            ref="fileInput"
            type="file"
            name="image"
            id="image"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
            required
          />
          <button
            type="button"
            class="p-2 rounded bg-red-500 text-white hover:bg-red-600"
            @click="removeFile"
          >
            Remove
          </button>
        </div>

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
          <button
            type="button"
            @click="$emit('cancelEdit')"
            class="w-full py-2 px-4 bg-gray-500 text-white font-bold rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTokenStore } from "../../stores/token";
import { useRequestStore } from "@/stores/request";

const emit = defineEmits(["cancelEdit", "statusMessage"]);

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

const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const statusMessage = ref();
const fileInput = ref();

const removeFile = () => {
  fileInput.value.value = "";
};
const addTeacher = async () => {
  if (fileInput.value.files[0]) {
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
    statusMessage.value = response.message;
    emit("cancelEdit");
  }
  emit("statusMessage", statusMessage);
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

const hidePopup = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }
};
</script>
