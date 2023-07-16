<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Facility</h1>
      <form @submit.prevent="updateFacility" class="grid grid-cols-2 gap-4">
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
        <!-- <input
          v-model="description.ku"
          type="text"
          name="descriptionKu"
          id="descriptionKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        /> -->
        <TipTap v-model="description.ku" :hasYoutubeLink="false" />

        <label for="descriptionEn">Description_EN:</label>
        <input
          v-model="description.en"
          type="text"
          name="descriptionEn"
          id="descriptionEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="descriptionAr">Description_AR:</label>
        <input
          v-model="description.ar"
          type="text"
          name="descriptionAr"
          id="descriptionAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="descriptionTu">Description_TU:</label>
        <input
          v-model="description.tu"
          type="text"
          name="descriptionTu"
          id="descriptionTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="icon">Icon:</label>
        <FilePreviewInput
          @updateFile="(event:any) => iconInput = event.value"
          :required="false"
        />
        <label for="iconBgColor">Icon Background Color:</label>
        <input
          v-model="iconBgColor"
          type="color"
          name="iconBgColor"
          id="iconBgColor"
          required
          class="w-full h-10 bg-white px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
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
            to="/facilities"
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
import TipTap from "../common/textInput/TipTap.vue";

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

const id = route.params.id;

const item = ref<Item>();

const fetchFacility = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/facilities/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.facility;

  if (item.value) {
    title.value = {
      ku: item.value.titleKu,
      en: item.value.titleEn,
      ar: item.value.titleAr,
      tu: item.value.titleTu,
    };
    description.value = {
      ku: item.value.descriptionKu,
      en: item.value.descriptionEn,
      ar: item.value.descriptionAr,
      tu: item.value.descriptionTu,
    };
    iconBgColor.value = item.value.iconBgColor;
    visibility.value = item.value.isVisible;

    visibility.value = item.value.isVisible;
  }
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchFacility();
});

const title = ref({
  ku: item.value?.titleKu,
  en: item.value?.titleEn,
  ar: item.value?.titleAr,
  tu: item.value?.titleTu,
});
const description = ref({
  ku: "",
  en: item.value?.descriptionEn,
  ar: item.value?.descriptionAr,
  tu: item.value?.descriptionTu,
});
const icon = ref(item.value?.icon);
const iconBgColor = ref(item.value?.iconBgColor);
const visibility = ref(item.value?.isVisible);
let attachmentPath: string;

const iconInput = ref();

const updateFacility = async () => {
  console.log(description.value.ku);
  if (iconInput?.value?.files?.[0]) {
    await uploadImage();
  }
  const facility = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    descriptionKu: description.value.ku,
    descriptionEn: description.value.en,
    descriptionAr: description.value.ar,
    descriptionTu: description.value.tu,
    icon: icon.value,
    iconBgColor: iconBgColor.value,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/facilities/${id}`,
    facility,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/facilities");
  }
};

const uploadImage = async () => {
  const file = iconInput.value.files[0];

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
