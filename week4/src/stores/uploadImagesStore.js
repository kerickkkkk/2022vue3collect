import { defineStore } from "pinia";
import axios from "axios";
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("ttShopToken="))
  ?.split("=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const useUploadImagesStore = defineStore("uploadImages", {
  state: () => ({
    images: [],
  }),

  getters: {
    getImages: ({ images }) => {
      return images;
    },
  },
  actions: {
    setImage(file) {
      // 這一層是否要防禦
      // return new Promise((resolve, reject) => {
      // if (file) {
      const url = `${baseUrl}/api/${apiPath}/admin/upload`;
      const formData = new FormData();
      formData.append("file-to-upload", file);
      return axios({
        method: "post",
        url,
        data: formData,
      });
      // } else {
      // reject({ msg: "檔案有誤" });
      // }
      // });
    },
  },
});
