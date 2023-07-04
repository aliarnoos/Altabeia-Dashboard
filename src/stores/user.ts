import { ref } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("user", () => {
  let user = ref();
  const setUser = (newUser: string) => {
    user.value = newUser;
  };
  const setNull = () => {
    user.value = null;
  };
  return { user, setUser, setNull };
});
