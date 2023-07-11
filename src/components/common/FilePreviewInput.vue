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

const emit = defineEmits(["updateFile"]);

const onFileChange = (e: any) => {
  const file = e.target.files[0];
  url.value = URL.createObjectURL(file);
  emit("updateFile", fileInput);
};

const removeFile = () => {
  fileInput.value = "";
  url.value = null;
};
</script>
