<template>
  <div class="z-50">
    <p
      v-if="statusMessageStore.message == 'Something went wrong!'"
      class="bg-red-500 text-white px-4 py-2 rounded absolute top-5 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessageStore.message }}
    </p>
    <p
      v-else-if="statusMessageStore.message"
      class="bg-green-500 text-white px-4 py-2 rounded absolute top-5 right-10 m-4 drop-shadow-md z-20"
    >
      {{ statusMessageStore.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from "@/stores/statusMessage";

const statusMessageStore = useMessageStore();
</script>
