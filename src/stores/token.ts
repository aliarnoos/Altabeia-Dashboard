import { ref } from "vue";
import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";

export const useTokenStore = defineStore("token", () => {
  const localStorageKey = "authToken";
  const token = ref<string | null>(
    localStorage.getItem(localStorageKey) || null
  );
  const expireation = ref<number | null>();

  const setToken = (newToken: string, date: number) => {
    token.value = newToken;
    localStorage.setItem(localStorageKey, newToken);
    setExpireation(date);
  };

  const setExpireation = (date: number) => {
    expireation.value = date;
  };

  const setNull = () => {
    token.value = null;
    expireation.value = null;
    localStorage.removeItem(localStorageKey);
  };

  const validateToken = (): boolean => {
    const tokenValue = token.value;
    if (tokenValue) {
      const decodedToken: any = jwtDecode(tokenValue);
      const currentDate = new Date().getTime() / 1000;

      if (decodedToken.exp > currentDate) {
        return true; // Token is valid
      }
    }
    return false; // Token is invalid or not present
  };

  return { token, setToken, setNull, validateToken };
});
