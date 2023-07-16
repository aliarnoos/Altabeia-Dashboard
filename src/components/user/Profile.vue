<template>
  <div class="p-10 flex flex-col items-start gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold pb-2 border-b-4 border-green-500">
      Manage Profile
    </h1>
    <!-- <div class="border-b-4 pb-8 border-green-500">
      <div class="flex gap-2 text-lg">
        <p class="font-bold">Email:</p>
        <p>{{ email }}</p>
      </div>
      <div class="flex gap-2 text-lg">
        <p class="font-bold">Role:</p>
        <p>{{ role }}</p>
      </div>
    </div> -->
    <ChangePassword />
  </div>
</template>

<script setup lang="ts">
// import { useUserStore } from "@/stores/user";
import ChangePassword from "../auth/ChangePassword.vue";

// const userStroe = useUserStore();

// const email = userStroe.user.email;
// const role = userStroe.user.roles;
</script>
