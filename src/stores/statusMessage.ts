import { ref } from "vue";
import { defineStore } from "pinia";

export const useMessageStore = defineStore("message", () => {
  const message = ref<string | null>();
  const setMessage = (newMessage: string) => {
    message.value = newMessage;
    setTimeout(() => {
      message.value = null;
    }, 2000);
  };

  const setFailMessage = () => {
    message.value = "Something went wrong!";
  };

  return { message, setMessage, setFailMessage };
});
