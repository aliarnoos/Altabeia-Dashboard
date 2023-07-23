<template>
  <div class="flex justify-center itemss-center w-8/12 ml-auto mr-auto">
    <div class="bg-white ">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Article</h1>
      <form @submit.prevent="updateArticle" class="flex flex-col gap-8">
        <div v-if="items?.titleEn" class="w-full grid grid-cols-2 gap-4">
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
        </div>

        <div v-if="items?.subTitleEn" class="w-full grid grid-cols-2 gap-4">
          <label for="nameKu">SubTitile_KU:</label>
          <input
            v-model="subTitle.ku"
            type="text"
            name="nameKu"
            id="nameKu"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
          <label for="nameEn">SubTitile_EN:</label>
          <input
            v-model="subTitle.en"
            type="text"
            name="nameEn"
            id="nameEn"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
          <label for="nameAr">SubTitile_AR:</label>
          <input
            v-model="subTitle.ar"
            type="text"
            name="nameAr"
            id="nameAr"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
          <label for="nameTu">SubTitile_TU:</label>
          <input
            v-model="subTitle.tu"
            type="text"
            name="nameTu"
            id="nameTu"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
        </div>

        <div v-if="items?.buttonEn" class="w-full grid grid-cols-2 gap-4">

          <label for="nameTu">Button_KU:</label>
          <input
          v-model="button.ku"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="nameTu">Button_EN:</label>
        <input
          v-model="button.en"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="nameTu">Button_AR:</label>
        <input
          v-model="button.ar"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="nameTu">Button_TU:</label>
        <input
          v-model="button.tu"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />

        <label for="nameTu">Button_URL:</label>
        <input
          v-model="button.url"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        </div>

        <div v-if="items?.buttonTwoEn" class="w-full grid grid-cols-2 gap-4">
          <label for="nameTu">Button_Two_KU:</label>
          <input
          v-model="buttonTwo.ku"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />

          <label for="nameTu">Button_Two_EN:</label>
          <input
          v-model="buttonTwo.en"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />

          <label for="nameTu">Button_Two_AR:</label>
          <input
          v-model="buttonTwo.ar"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />

          <label for="nameTu">Button_Two_TU:</label>
          <input
          v-model="buttonTwo.tu"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />

          <label for="nameTu">Button_Two_URL:</label>
          <input
          v-model="buttonTwo.url"
          type="text"
          name="nameTu"
          id="nameTu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
          </div>
          <template v-if="items?.descriptionEn">
            <label for="descriptionKu">Description_KU:</label>
        <TipTapEditor v-model="description.ku" :hasYoutubeLink="false" />

        <label for="descriptionEn">Description_EN:</label>
        <TipTapEditor v-model="description.en" :hasYoutubeLink="false" />

        <label for="descriptionAr">Description_AR:</label>
        <TipTapEditor v-model="description.ar" :hasYoutubeLink="false" />

        <label for="descriptionTu">Description_TU:</label>
        <TipTapEditor v-model="description.tu" :hasYoutubeLink="false" />
          </template>


        <label for="icon">Image:</label>
        <ImagePreviewInput
          v-model="imageInput"
        />
        
        <div class="w-full grid grid-cols-2">
          <label for="isVisible">Visible:</label>
          <input
            v-model="visibility"
            type="checkbox"
            name="isVisible"
            id="isVisible"
            class=" px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
          />
        </div>
        <div class="col-span-2 flex gap-2 mt-4">
          <button
            class="w-full py-2 px-4 bg-green-500 text-white font-bold rounded hover:bg-green-600"
          >
            Update
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
import { onBeforeMount } from "vue";
import { useLoadingStore } from "@/stores/loading";
import { useRoute, useRouter } from "vue-router";
import { useMessageStore } from "@/stores/statusMessage";
import ImagePreviewInput from "../common/ImagePreviewInput.vue";
import TipTapEditor from "../common/textInput/TipTapEditor.vue";
import { onBeforeRouteUpdate } from 'vue-router';

interface items {
  id: number;
  titleKu: string;
  titleEn: string;
  titleAr: string;
  titleTu: string;
  subTitleKu: string;
  subTitleEn: string;
  subTitleAr: string;
  subTitleTu: string;
  descriptionKu: string;
  descriptionEn: string;
  descriptionAr: string;
  descriptionTu: string;
  buttonKu: string;
  buttonEn: string;
  buttonAr: string;
  buttonTu: string;
  buttonUrl: string;
  buttonTwoKu: string;
  buttonTwoEn: string;
  buttonTwoAr: string;
  buttonTwoTu: string;
  buttonTwoUrl: string;
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

let id = route.params.id;

const items = ref<items>();

const fetchArticle = async () => {
  id = route.params.id;
  loadingStore.setLoading();

  const url = new URL(`${import.meta.env.VITE_API_URL}/admin/general-content/${id}`);
    // url.searchParams.append('pageId', "1");
  
  await requestStore.getData(url.toString(), tokenStore.token || undefined);
  
  items.value = requestStore.fetchedData?.generalContent;
  if (items.value) {
    title.value = {
      ku: items.value.titleKu,
      en: items.value.titleEn,
      ar: items.value.titleAr,
      tu: items.value.titleTu,
    };
    subTitle.value = {
      ku: items.value.subTitleKu,
      en: items.value.subTitleEn,
      ar: items.value.subTitleAr,
      tu: items.value.subTitleTu,
    };
    description.value = {
      ku: items.value.descriptionKu,
      en: items.value.descriptionEn,
      ar: items.value.descriptionAr,
      tu: items.value.descriptionTu,
    };
    button.value = {
      ku: items.value?.buttonKu,
      en: items.value?.buttonEn,
      ar: items.value?.buttonAr,
      tu: items.value?.buttonTu,
      url: items.value?.buttonUrl
    }
    buttonTwo.value = {
      ku: items.value?.buttonTwoKu,
      en: items.value?.buttonTwoEn,
      ar: items.value?.buttonTwoAr,
      tu: items.value?.buttonTwoTu,
      url: items.value?.buttonTwoUrl
    }
    image.value = items.value.image;

    visibility.value = items.value.isVisible;
  }
  loadingStore.setFalse();
};


const fetchSubArticle = async () => {
  id = route.params.id;
  loadingStore.setLoading();

  const url = new URL(`${import.meta.env.VITE_API_URL}/admin/sub-content/`);
    url.searchParams.append('contentId', id[0]);
  
  const response =await requestStore.getData(url.toString(), tokenStore.token || undefined);
  console.log(response)
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchArticle();
});

const title = ref({
  ku: items.value?.titleKu,
  en: items.value?.titleEn,
  ar: items.value?.titleAr,
  tu: items.value?.titleTu,
});
const button = ref({
  ku: items.value?.buttonKu,
  en: items.value?.buttonEn,
  ar: items.value?.buttonAr,
  tu: items.value?.buttonTu,
  url: items.value?.buttonUrl
});
const buttonTwo = ref({
  ku: items.value?.buttonTwoKu,
  en: items.value?.buttonTwoEn,
  ar: items.value?.buttonTwoAr,
  tu: items.value?.buttonTwoTu,
  url: items.value?.buttonTwoUrl
});
const subTitle = ref({
  ku: items.value?.titleKu,
  en: items.value?.titleEn,
  ar: items.value?.titleAr,
  tu: items.value?.titleTu,
});
const description = ref({
  ku: items.value?.descriptionKu || "",
  en: items.value?.descriptionEn || "",
  ar: items.value?.descriptionAr || "",
  tu: items.value?.descriptionTu || "",
});
const image = ref(items.value?.image);
const visibility = ref(items.value?.isVisible);
let attachmentPath = items.value?.image;

const imageInput = ref();

const updateArticle = async () => {
  loadingStore.setLoading();

  if (imageInput.value) {
    await uploadImage();
  }
  const content = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    descriptionKu: description.value.ku,
    descriptionEn: description.value.en,
    descriptionAr: description.value.ar,
    descriptionTu: description.value.tu,
    image: attachmentPath,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/general-content/${id}`,
    content,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
  }
  loadingStore.setFalse();
};

const uploadImage = async () => {
  const file = imageInput.value;

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
