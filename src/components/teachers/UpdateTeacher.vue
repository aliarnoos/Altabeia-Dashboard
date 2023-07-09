<template>
  <div
    class="fixed top-0 left-0 w-screen h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10"
    @click="hideSidebar"
  >
    <div class="bg-white w-fit p-6 rounded-lg">
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
        <input
          v-on:change="image"
          type="file"
          name="image"
          id="image"
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
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
          <button
            type="button"
            @click="$emit('cancelEdit')"
            class="w-full py-2 px-4 bg-red-500 text-white font-bold rounded hover:bg-red-600"
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

const props = defineProps(["teacher"]);
const emit = defineEmits(["cancelEdit", "statusMessage"]);

const name = ref(props.teacher.name);
const position = ref(props.teacher.position);
const visibility = ref(props.teacher.isVisible);
const image = ref(props.teacher.imageUrl);
const teacherId = props.teacher.id;

const tokenStore = useTokenStore();
const requestStore = useRequestStore();

const statusMessage = ref();

const updateTeacher = async () => {
  const teacher = {
    nameKu: name.value.ku,
    nameEn: name.value.en,
    nameAr: name.value.ar,
    nameTu: name.value.tu,
    positionKu: position.value.ku,
    positionEn: position.value.en,
    positionAr: position.value.ar,
    positionTu: position.value.tu,
    // image: image.value || null,
    isVisible: visibility.value,
  };
  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/teachers/${teacherId}`,
    teacher,
    tokenStore.token || ""
  );
  if (response) {
    statusMessage.value = response.message;
    emit("cancelEdit");
  }
  emit("statusMessage", statusMessage);
};

const hideSidebar = (event: any) => {
  // Check if the click event target is outside the sidebar
  if (event.target.classList.contains("bg-opacity-50")) {
    emit("cancelEdit");
  }

  async function uploadImage(fileInput: any) {
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const response = await requestStore.postData(
      `${import.meta.env.VITE_API_URL}/admin/presigned-url/`,
      {},
      tokenStore.token || ""
    );

    const { url } = await response.json();

    // Upload the file to the pre-signed URL
    const uploadResponse = await fetch(url, {
      method: "PUT",
      body: file,
      headers: {
        "Content-Type": file.type,
      },
    });

    if (uploadResponse.ok) {
      // The file was uploaded successfully
      console.log("File uploaded to S3:", file);
      // You can perform any additional actions here, such as displaying the uploaded image on your webpage
    } else {
      // Handle the error if the file upload fails
      console.error("Failed to upload file to S3:", uploadResponse.status);
    }
  }
};
</script>
