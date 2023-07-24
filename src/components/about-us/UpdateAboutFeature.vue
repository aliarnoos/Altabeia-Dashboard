<template>
  <div class="flex justify-center items-center">
    <div class="bg-white">
      <h1 class="text-2xl font-bold text-left mb-14">Edit Feature</h1>
      <form @submit.prevent="updateFeature" class="grid grid-cols-2 gap-4">
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

        <label for="subTitleKu">SubTitile_KU:</label>
        <input
          v-model="subTitle.ku"
          type="text"
          name="subTitleKu"
          id="subTitleKu"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="subTitleEn">SubTitile_EN:</label>
        <input
          v-model="subTitle.en"
          type="text"
          name="subTitleEn"
          id="subTitleEn"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="subTitleAr">SubTitile_AR:</label>
        <input
          v-model="subTitle.ar"
          type="text"
          name="subTitleAr"
          id="subTitleAr"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-green-600"
        />
        <label for="subTitleTu">SubTitile_TU:</label>
        <input
          v-model="subTitle.tu"
          type="text"
          name="subTitleTu"
          id="subTitleTu"
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
            to="/why-us"
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
import TipTapEditor from "../common/textInput/TipTapEditor.vue";

interface Item {
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

const fetchProgram = async () => {
  loadingStore.setLoading();
  await requestStore.getData(
    `${import.meta.env.VITE_API_URL}/admin/general-content/${id}`,
    tokenStore.token || undefined
  );
  item.value = requestStore.fetchedData.generalContent;

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
    subTitle.value = {
      ku: item.value?.subTitleKu,
      en: item.value?.subTitleEn,
      ar: item.value?.subTitleAr,
      tu: item.value?.subTitleTu,
    }

    visibility.value = item.value.isVisible;
  }
  loadingStore.setFalse();
};

onBeforeMount(async () => {
  fetchProgram();
});

const title = ref({
  ku: item.value?.titleKu,
  en: item.value?.titleEn,
  ar: item.value?.titleAr,
  tu: item.value?.titleTu,
});
const subTitle = ref({
  ku: item.value?.subTitleKu,
  en: item.value?.subTitleEn,
  ar: item.value?.subTitleAr,
  tu: item.value?.subTitleTu,
});
const description = ref({
  ku: item.value?.descriptionKu || "",
  en: item.value?.descriptionEn || "",
  ar: item.value?.descriptionAr || "",
  tu: item.value?.descriptionTu || "",
});
const visibility = ref(item.value?.isVisible);


const updateFeature = async () => {
  loadingStore.setLoading();

  const feature = {
    titleKu: title.value.ku,
    titleEn: title.value.en,
    titleAr: title.value.ar,
    titleTu: title.value.tu,
    subTitleku: item.value?.subTitleKu,
    subTitleen: item.value?.subTitleEn,
    subTitlear: item.value?.subTitleAr,
    subTitletu: item.value?.subTitleTu,
    descriptionKu: description.value.ku,
    descriptionEn: description.value.en,
    descriptionAr: description.value.ar,
    descriptionTu: description.value.tu,
    isVisible: visibility.value,
  };

  const response = await requestStore.updateData(
    `${import.meta.env.VITE_API_URL}/admin/general-content/${id}`,
    feature,
    tokenStore.token || ""
  );
  if (response) {
    messageStore.setMessage(response.message);
    router.push("/why-us");
  }
  loadingStore.setFalse();
};


</script>
