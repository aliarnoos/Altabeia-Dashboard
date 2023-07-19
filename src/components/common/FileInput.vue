<template>
  <div class="flex flex-col gap-2">
    <label
      for="fileInput"
      class="mt-2 px-4 py-2 border border-gray-300 rounded flex items-center justify-center gap-2 cursor-pointer hover:bg-gray-300"
    >
      <i class="fa-solid fa-paperclip"></i>
      <span>{{ fileState }}</span>
      <input
        id="fileInput"
        ref="fileInput"
        type="file"
        class="opacity-0"
        @change="onFileChange"
        :required="props.required"
        accept="application/pdf, application/docx,"
      />
    </label> 
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps(["required", "imageSrc"]);

const url = ref<string | null>(null);
const fileInput = ref();

const emit = defineEmits(["updateFile"]);

const fileState = ref("Choose File")
const onFileChange = (e: any) => {
  const file = e.target.files[0];
  fileState.value = fileInput?.value?.files?.[0]?.name 
  console.log(file)
    url.value = URL.createObjectURL(file);
    emit("updateFile", fileInput);
};

</script>