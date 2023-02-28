<script setup>
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import Modal from "bootstrap/js/dist/modal";
import { useStatusStore } from "@/stores/statusStore.js";

const statusStore = useStatusStore();
const swal = inject("$swal");
const { setLoading } = statusStore;
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

const deleteProductModal = ref(null);
const productId = ref(0);
const productTitle = ref("");
const emit = defineEmits(["getProducts"]);
const show = ({ id, title }) => {
  deleteProductModal.value.show();
  productId.value = id;
  productTitle.value = title;
};
const delProduct = (id) => {
  setLoading(true);
  axios({
    method: "DELETE",
    url: `${baseUrl}/api/${apiPath}/admin/product/${id}`,
  })
    .then(({ data }) => {
      if (data.success) {
        setLoading(false);
        swal(data.message);
        emit("getProducts");
        deleteProductModal.value.hide();
      }
    })
    .catch((error) => {
      console.dir(error);
      setLoading(false);
    });
};
onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];

  // 存取 ID 只會掛載一次 是否要改更通用的 或者在抽出一層
  deleteProductModal.value = new Modal("#deleteProductModalDom", {
    focus: false,
  });
  axios.defaults.headers.common["Authorization"] = token;
});
// 開放方法使用
defineExpose({ show });
</script>
<template>
  <div
    id="deleteProductModalDom"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <strong class="text-danger">{{ productTitle }}</strong>
          商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            @click="delProduct(productId)"
            type="button"
            class="btn btn-danger"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
