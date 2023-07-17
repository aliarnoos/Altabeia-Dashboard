<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Add Activities</h1>
      <form @submit.prevent="addActivity" class="grid grid-cols-2 gap-4">
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

        <label for="descriptionKu">Description_KU:</label>
        <TipTapEditor v-model="description.ku" :hasYoutubeLink="false" />

        <label for="descriptionEn">Description_EN:</label>
        <TipTapEditor v-model="description.en" :hasYoutubeLink="false" />

        <label for="descriptionAr">Description_AR:</label>
        <TipTapEditor v-model="description.ar" :hasYoutubeLink="false" />

        <label for="descriptionTu">Description_TU:</label>
        <TipTapEditor v-model="description.tu" :hasYoutubeLink="false" />

        <label for="summaryKu">Summary_KU:</label>
        <TipTapEditor v-model="summary.ku" :hasYoutubeLink="false" />

        <label for="summaryEn">Summary_EN:</label>
        <TipTapEditor v-model="summary.en" :hasYoutubeLink="false" />

        <label for="summaryKu">Summary_AR:</label>
        <TipTapEditor v-model="summary.ar" :hasYoutubeLink="false" />

        <label for="summaryKu">Summary_TU:</label>
        <TipTapEditor v-model="summary.tu" :hasYoutubeLink="false" />
        <label for="image">Image:</label>
        <FilePreviewInput
          @updateFile="(event:any) => imageInput = event.value"
          :required="false"
        />
        <label for="date">Date:</label>
        <input
          v-model="date"
          type="date"
          name="date"
          id="date"
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
            Add
          </button>
          <RouterLink
            to="/activities"
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
import FilePreviewInput from "../common/FilePreviewInput.vue";
import TipTapEditor from "../common/textInput/TipTapEditor.vue";

interface Item {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTu: string;
  summaryKu: string;
  summaryEn: string;
  summaryAr: string;
  summaryTu: string;
  icon: string;
  iconBgColor: string;
  isVisible: string;
}
const tokenStore = useTokenStore();
const requestStore = useRequestStore();
const loadingStore = useLoadingStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();

const item = ref<Item>();

const title = ref({
  ku: item.value?.titleKu,
  en: item.value?.titleEn,
  ar: item.value?.titleAr,
  tu: item.value?.titleTu,
});
const summary = ref({
  ku: item.value?.summaryKu || "",
  en: item.value?.summaryEn || "",
  ar: item.value?.summaryAr || "",
  tu: item.value?.summaryTu || "",
});
const description = ref({
  ku: item.value?.descriptionKu || "",
  en: item.value?.descriptionEn || "",
  ar: item.value?.descriptionAr || "",
  tu: item.value?.descriptionTu || "",
});
const image = ref();
const date = ref();
const visibility = ref(true);
let attachmentPath: string;

const imageInput = ref();

const addActivity = async () => {
  loadingStore.setLoading();
  if (imageInput?.value?.files?.[0]) {
    await uploadImage();
  }
  const activity = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    descriptionKu: item.value?.descriptionKu,
    descriptionEn: item.value?.descriptionEn,
    descriptionAr: item.value?.descriptionAr,
    descriptionTu: item.value?.descriptionTu,
    summaryKu: item.value?.summaryKu,
    summaryEn: item.value?.summaryEn,
    summaryAr: item.value?.summaryAr,
    summaryTu: item.value?.summaryTu,
    image: attachmentPath,
    date: date.value,
    isVisible: visibility.value,
  };

  const response = await requestStore.postData(
    `${import.meta.env.VITE_API_URL}/admin/activities/`,
    activity,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/activities");
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
