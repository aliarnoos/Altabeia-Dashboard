import { ref } from "vue";
import { defineStore } from "pinia";
import jwtDecode from "jwt-decode";

export const useTokenStore = defineStore("token", () => {
  const localStorageKey = "authToken";
  const token = ref<string | null>(
    sessionStorage.getItem(localStorageKey) || null
  );
  const expiration = ref<number | null>();

  const setToken = (newToken: string, date: number) => {
    token.value = newToken;
    sessionStorage.setItem(localStorageKey, newToken);
    setExpireation(date);
  };

  const setExpireation = (date: number) => {
    expiration.value = date;
  };

  const setNull = () => {
    token.value = null;
    expiration.value = null;
    sessionStorage.removeItem(localStorageKey);
  };

  const validateToken = (): boolean => {
    try {
      const tokenValue = token.value;
      if (tokenValue) {
        const decodedToken: any = jwtDecode(tokenValue);
        if (decodedToken) {
          const currentDate = new Date().getTime() / 1000;
          if (decodedToken.exp > currentDate) {
            return true; // Token is valid
          }
        }
      }
      return false;
    } catch (error) {
      console.error(error);
      return false; // Token is invalid or not present
    }
  };

  return { token, expiration, setToken, setNull, validateToken };
});
