<script setup lang="ts">
import SideBar from "../components/SideBar.vue";
import AddContact from "../components/contacts/AddContact.vue";
</script>

<template>
  <main class="flex flex-row">
    <side-bar class="basis-1/6" />
    <RouterView />
  </main>
</template>
