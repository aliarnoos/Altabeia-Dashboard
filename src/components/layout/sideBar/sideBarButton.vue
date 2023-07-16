<template>
  <div>
    <nav class="flex-grow">
      <ul class="space-y-2">
        <li
          links="ref(["
          v-for="link in links"
          :key="link.id"
          class="mb-2 pl-2 hover:bg-gray-800 cursor-pointer flex items-stretch"
        >
          <router-link :to="link.path" class="text-lg p-4 grow">{{
            link.label
          }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["links"]);

const links = props.links;
</script>

<style scoped></style>
