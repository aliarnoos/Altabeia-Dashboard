import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTokenStore = defineStore("token", () => {
  let token = ref();
  const setToken = (newToken: string) => {
    token.value = newToken;
  };
  const setNull = () => {
    token.value = null;
  };
  return { token, setToken, setNull };
});
