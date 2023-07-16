<template>
  <div class="p-10 flex flex-col items-start gap-10 overflow-x-auto">
    <h1 class="text-3xl font-bold underline underline-offset-8 unde">
      Manage Profile
    </h1>
    <div class="border-b-4 pb-8 border-green-500">
      <div class="flex gap-2 text-lg">
        <p class="font-bold">Email:</p>
        <p>{{ userStroe.user.email }}</p>
      </div>
      <div class="flex gap-2 text-lg">
        <p class="font-bold">Role:</p>
        <p>{{ userStroe.user.roles }}</p>
      </div>
    </div>
    <ChangePassword />
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user";
import ChangePassword from "../auth/ChangePassword.vue";

const userStroe = useUserStore();
</script>
