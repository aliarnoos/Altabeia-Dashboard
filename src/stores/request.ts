import { ref } from "vue";
import { defineStore } from "pinia";
import {
  deleteRequest,
  getRequest,
  patchRequest,
  postRequest,
  putRequest,
} from "../api/httpRequest";

export const useRequestStore = defineStore("request", () => {
  const fetchedData = ref();

  const getData = async (url: string, token?: string) => {
    try {
      const response = await getRequest(url, token);
      fetchedData.value = response.data;
      return response;
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const updateData = async (url: string, data: {}, token: string) => {
    try {
      return await patchRequest(url, data, token);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const postData = async (url: string, data: {}, token: string) => {
    try {
      return await postRequest(url, data, token);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const putData = async (url: string, file: Buffer, token: string) => {
    try {
      return await putRequest(url, file, token);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const deleteData = async (url: string, token: string) => {
    try {
      return await deleteRequest(url, token);
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  return { fetchedData, getData, updateData, postData, deleteData };
});
