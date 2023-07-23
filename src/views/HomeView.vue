<template>
  <main>
    <PopupCard />
    <IsLoading></IsLoading>
    <div class="flex flex-row">
      <SideBar />
      <div class="w-full">
        <HeaderBar />
        <RouterView class="m-8 mb-16"  :key="route.path"/>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script setup lang="ts">
import SideBar from "../components/layout/sideBar/SideBar.vue";
import { useRequestStore } from "@/stores/request";
import { useTokenStore } from "@/stores/token";
import { useUserStore } from "@/stores/user";
import { onBeforeMount } from "vue";
import IsLoading from "../components/common/IsLoading.vue";
import jwtDecode from "jwt-decode";
import PopupCard from "@/components/common/PopupCard.vue";
import { useMessageStore } from "@/stores/statusMessage";
import HeaderBar from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import { useRoute } from "vue-router";

const requestStore = useRequestStore();
const userStore = useUserStore();
const tokenStore = useTokenStore();
const messageStore = useMessageStore();
const route = useRoute()

const setUser = async () => {
  const response = await requestStore.getData(
    import.meta.env.VITE_API_URL + "/admin/user",
    tokenStore.token || undefined
  );
  userStore.user = response.user;
};

const REFRESH_TIMEOUT = 120; // 2 minutes in seconds
const refreshToken = async (): Promise<void> => {
  const tokenValue = tokenStore.token;
  if (tokenValue) {
    const decodedToken: any = jwtDecode(tokenValue);
    const currentDate = new Date().getTime() / 1000;
    const expirationTime = decodedToken.exp;
    const remainingTime = expirationTime - currentDate;

    if (remainingTime > REFRESH_TIMEOUT) {
      const timeout = (remainingTime - REFRESH_TIMEOUT) * 1000;

      await new Promise((resolve) => setTimeout(resolve, timeout));

      const response = await requestStore.postData(
        import.meta.env.VITE_API_URL + "/admin/refresh",
        {},
        tokenValue
      );
      const { access_token, expire_date } = response;
      tokenStore.setToken(access_token, expire_date);
    }
  }
};

onBeforeMount(() => {
  setUser();
  refreshToken();
});
</script>
