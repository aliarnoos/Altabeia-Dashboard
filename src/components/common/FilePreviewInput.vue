<template>
  <div class="flex flex-col items-center gap-2">
    <label
      for="fileInput"
      class="mt-2 px-4 py-2 border border-gray-300 rounded flex items-center justify-center cursor-pointer hover:bg-gray-300"
    >
      <span class="material-symbols-outlined"> attach_file </span>
      <span>Choose File</span>
      <input
        id="fileInput"
        ref="fileInput"
        type="file"
        class="opacity-0"
        @change="onFileChange"
        accept="image/*"
        :required="props.required"
      />
    </label>
    <div v-if="imageError" class="text-red-600 text-xs mb-3">
      {{ imageError }}
    </div>
    <div v-if="url" class="relative">
      <img :src="url" class="w-40" />
      <button
        type="button"
        class="rounded text-red-500 hover:text-red-600 absolute top-0 right-0"
        @click="removeFile"
      >
        <span class="material-symbols-outlined bg-white font-bold">
          close
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["required"]);

const url = ref<string | null>(null);
const fileInput = ref();
const imageError = ref();

const emit = defineEmits(["updateFile"]);

const onFileChange = (e: any) => {
  const file = e.target.files[0];
  const inValed = validateImage(file);
  if (!inValed) {
    imageError.value = null;
    url.value = URL.createObjectURL(file);
    emit("updateFile", fileInput);
  } else {
    imageError.value = inValed;
  }
};

const removeFile = () => {
  fileInput.value = "";
  url.value = null;
};

const validateImage = (file: any) => {
  let extention;
  if (file != null && file != "") {
    extention = file?.name.split(".").pop();
  }

  if (file === "" || file == null) {
    return "please select an image";
  } else if (parseFloat(file.size) > 600000) {
    return "Image size must be less than 600kb";
  } else if (extention != "png" && extention != "jpg" && extention != "jpeg") {
    return "Image must be in png, jpg or jpeg format";
  } else {
    return null;
  }
};
</script>

<!-- <template>
  <div>
    <div class="relative h-max mb-3 group overflow-hidden w-4/12">
      <img
        :src="imagePreview ? imagePreview : '/images/image-ph.png'"
        class="w-full rounded-lg object-cover border object-center"
        alt="image"
      />
      <input
        type="file"
        hidden
        id="image"
        @input="setImage"
        accept="image/png, image/jpeg, image/jpg"
      />
      <label
        for="image"
        class="h-full w-full bg-black/40 opacity-0 group-hover:opacity-100 transition-all rounded-lg grid place-content-center cursor-pointer absolute top-0 left-0"
      >
        <div class="text-white text-center">
          <div class="text-2xl">
            <FontAwesomeIcon icon="camera" />
          </div>
          <div class="text-sm">Upload Image</div>
        </div>
      </label>
    </div>
    <div class="text-red-600 text-xs mb-3 mt-3">{{ imageError }}</div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["modelValue"]);
const emit = defineEmits(["update:modelValue"]);

const imagePreview = ref();
const imageError = ref();

const setImage = (e: any) => {
  imageError.value = validateImage(e.target.files[0]);
  if (!imageError.value) {
    emit("update:modelValue", e.target.files[0]);
    imagePreview.value = URL.createObjectURL(e.target.files[0]);
  }
};
const validateImage = (file: any) => {
  let extention;
  if (file != null && file != "") {
    extention = file?.name.split(".").pop();
  }

  if (file === "" || file == null) {
    return "please select an image";
  } else if (parseFloat(file.size) > 600000) {
    return "Image size must be less than 600kb";
  } else if (extention != "png" && extention != "jpg" && extention != "jpeg") {
    return "Image must be in png, jpg or jpeg format";
  } else {
    return null;
  }
};
</script> -->
