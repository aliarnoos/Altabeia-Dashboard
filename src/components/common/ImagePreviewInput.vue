<template>
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
            <i class="fa-solid fa-camera"></i>          
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
</script>
