<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Edit School</h1>
      <form
        @submit.prevent="updateSchool"
        class="grid grid-cols-2 gap-4 justify-items-start"
      >
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

        <label for="icon">Icon:</label>
        <FilePreviewInput
          @updateFile="(event:any) => iconInput = event.value"
          :required="false"
          :key="1"
        />
        <label for="image">Image :</label>
        <FilePreviewInput
          @updateFile="(event:any) => imageInput = event.value"
          :required="false"
          :key="2"
        />

        <label for="backgoundImage">Backgound Image :</label>
        <FilePreviewInput
          @updateFile="(event:any) => backgoundImageInput = event.value"
          :required="false"
          :key="3"
        />

        <label for="iconBgColor">Icon Background Color:</label>
        <input
          v-model="iconBgColor"
          type="color"
          name="iconBgColor"
          id="iconBgColor"
          required
          class="w-20 h-16 bg-white px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
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
            to="/schools"
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
  icon: string;
  image: string;
  backgoundImage: string;
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

const fetchSchool = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/schools/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.school;

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
    image.value = item.value.image;
    icon.value = item.value.icon;
  }
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchSchool();
});

const title = ref({
  ku: "",
  en: "",
  ar: "",
  tu: "",
});
const description = ref({
  ku: "",
  en: "",
  ar: "",
  tu: "",
});
const icon = ref<string | null | undefined>(item.value?.icon);
const image = ref<string | null | undefined>(item.value?.image);
const iconBgColor = ref(item.value?.iconBgColor);
const backgoundImage = ref<string | null | undefined>(item.value?.icon);
const visibility = ref(item.value?.isVisible);
let attachmentPath: string;

const backgoundImageInput = ref();
const imageInput = ref();
const iconInput = ref();

const updateSchool = async () => {
  if (backgoundImageInput?.value?.files?.[0]) {
    backgoundImage.value = await uploadImage(
      backgoundImageInput?.value?.files?.[0]
    );
  }
  if (imageInput?.value?.files?.[0]) {
    image.value = await uploadImage(imageInput?.value?.files?.[0]);
  }
  if (iconInput?.value?.files?.[0]) {
    icon.value = await uploadImage(iconInput?.value?.files?.[0]);
  }
  const school = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    descriptionKu: description.value.ku,
    descriptionEn: description.value.en,
    descriptionAr: description.value.ar,
    descriptionTu: description.value.tu,
    icon: icon.value,
    image: image.value,
    iconBgColor: iconBgColor.value,
    backgoundImage: backgoundImage.value,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/schools/${id}`,
    school,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/schools");
  }
};

const uploadImage = async (file: any) => {
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
    return fileName;
  } else {
    console.error("Failed to upload file to S3:", uploadResponse.status);
    return null;
  }
};

const generateUniqueFileName = (fileName: string) => {
  const fileNameWithoutSpaces = fileName.replace(/\s/g, "");

  const timestamp = Date.now();

  const uniqueFileName = `${fileNameWithoutSpaces}_${timestamp}`;
  return uniqueFileName;
};
</script>
