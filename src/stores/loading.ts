import { ref } from "vue";
import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", () => {
  let loading = ref(false);
  const setLoading = () => {
    loading.value = true;
  };
  const setFalse = () => {
    loading.value = false;
  };
  return { loading, setFalse, setLoading };
});
