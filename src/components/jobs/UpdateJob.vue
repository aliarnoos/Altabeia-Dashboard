<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hidePopup"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
      <form @submit.prevent="updateJob" class="grid grid-cols-2 gap-4">
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
        <div class="flex gap-2">
          <input
            ref="fileInput"
            type="file"
            name="attachment"
            id="attachment"
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
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
            Update
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

const props = defineProps(["job"]);
const emit = defineEmits(["cancelEdit", "statusMessage"]);

const title = ref(props.job.title);
const startDate = ref(props.job.startDate);
const closeDate = ref(props.job.closeDate);
const visibility = ref(props.job.isVisible);
const jobId = props.job.id;
let attachmentPath: string;

const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const statusMessage = ref();
const fileInput = ref();

const removeFile = () => {
  fileInput.value.value = "";
};
const updateJob = async () => {
  if (fileInput.value.files[0]) {
    await uploadImage();
  }
  const job = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    startDate: startDate.value,
    closeDate: closeDate.value,
    attachment: attachmentPath,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/jobs/${jobId}`,
    job,
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

const hidePopup = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }
};
</script>
