import { defineStore } from "pinia";
import axios from "axios";
import { useStatusStore } from "@/stores/statusStore.js";
// 無法用 inject 改直接引入
import Swal from "sweetalert2";
const statusStore = useStatusStore();
const { setLoading } = statusStore;
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("ttShopToken="))
  ?.split("=")[1];
axios.defaults.headers.common["Authorization"] = token;

export const useUploadImagesStore = defineStore("uploadImages", {
  state: () => ({
    imagesUrl: [],
  }),

  getters: {
    gettersImagesUrl: ({ imagesUrl }) => {
      return imagesUrl;
    },
  },
  actions: {
    setImage(file) {
      // 這一層是否要防禦
      const url = `${baseUrl}/api/${apiPath}/admin/upload`;
      const formData = new FormData();
      formData.append("file-to-upload", file);
      return axios({
        method: "post",
        url,
        data: formData,
      });
    },
    deleteImageUrl(index) {
      this.imagesUrl.splice(index, 1);
      this.updateImagesUrl();
    },
    async updateImagesUrl(finishUrl, isNew = false) {
      // 使用一個未啟用的多圖當作連結儲存地
      // 處理可以刪掉連結的部分
      if (finishUrl) {
        this.imagesUrl.push(finishUrl);
      }
      const data = {
        category: "圖床",
        content: "圖床用",
        description: "圖床用",
        id: "-NOqSXY5EM4pdTaqnSJr",
        imageUrl: "",
        is_enabled: 0,
        num: 1,
        origin_price: 100,
        price: 100,
        star: 5,
        title: "圖床",
        unit: "張",
        // 更改這個地方
        imagesUrl: this.imagesUrl,
      };
      const url = `${baseUrl}/api/${apiPath}/admin/product/${data.id}`;
      setLoading(true);
      // 指向有問題
      // axios({
      //   method: "put",
      //   url,
      //   data: { data },
      // })
      //   .then((response) => {
      //     console.log(response);
      //   })
      //   .catch((error) => console.log(error));
      try {
        const { data: result } = await axios({
          method: "put",
          url,
          data: { data },
        });
        setLoading(false);
        if (result.success) {
          const text = isNew ? `已上傳圖片` : `已刪除圖片`;
          Swal.fire({
            text,
            customClass: {
              container: "position-absolute",
            },
            toast: true,
            showConfirmButton: false,
            position: "bottom-right",
            timer: 1500,
          });
          this.getImagesUrl();
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    },
    getImagesUrl() {
      const id = "-NOqSXY5EM4pdTaqnSJr";
      const url = `${baseUrl}/api/${apiPath}/admin/products/all`;
      setLoading(true);
      axios({
        method: "get",
        url,
      })
        .then(({ data }) => {
          this.imagesUrl = data.products[id].imagesUrl || [];
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    },
  },
});
