<script setup>
import axios from "axios";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import Pagination from "../../components/base/PaginationComponent.vue";
import { useStatusStore } from "@/stores/statusStore.js";
import AddEditProductModal from "./components/AddEditProductModal.vue";
import DeleteProductModal from "./components/DeleteProductModal.vue";
import UploadImageModal from "../../components/modal/UploadImageModal.vue";
const router = useRouter();
const statusStore = useStatusStore();
const swal = inject("$swal");

const { setLoading } = statusStore;
const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

const productObj = {
  category: "",
  content: "",
  description: "",
  imageUrl: "",
  imagesUrl: [],
  is_enabled: "",
  num: "",
  origin_price: 0,
  price: 0,
  title: "",
  unit: "",
};

const products = ref([]);
const tempProduct = ref({ ...productObj });
const pagination = ref(null);
const modalType = ref("");
// const productModalDom = ref(null);
const addEditProductRef = ref(null);
// const productModal = ref(null);
const uploadImageRef = ref(null);
const deleteProductRef = ref(null);
const getProducts = (page = 1) => {
  resetProduct();
  setLoading(true);
  axios
    .get(`${baseUrl}/api/${apiPath}/admin/products?page=${page}`)
    .then(({ data }) => {
      products.value = data.products;
      pagination.value = data.pagination;
    })
    .catch((error) => {
      setLoading(false);
      console.dir(error);
      swal(error?.response?.data);
      // 在確認沒有權限的寫法
      router.push({ name: "login" });
    })
    .finally(() => setLoading(false));
};
// 更改從一開始就根據寫入狀態直接給物件
// const getProduct = (id) => {
//   tempProduct.value = products.value.find((item) => item.id === id);
// };
const openUploadModal = () => {
  uploadImageRef.value.show();
};
const openModalHandler = (type, product) => {
  modalType.value = type;
  if (type === "new") {
    resetProduct();
  } else {
    tempProduct.value = product;
  }
  if (type === "new" || type === "edit") {
    addEditProductRef.value.show(tempProduct.value, modalType.value);
  } else if (type === "delete") {
    deleteProductRef.value.show(product);
  } else {
    swal("錯誤");
  }
};
// 保留比較 Modal 拆分前比較用
// const addEditProduct = (id) => {
//   const method = modalType.value === "new" ? "post" : "put";
//   const url =
//     modalType.value === "new"
//       ? `${baseUrl}/api/${apiPath}/admin/product`
//       : `${baseUrl}/api/${apiPath}/admin/product/${id}`;
//   const data = { data: tempProduct.value };
//   setLoading(true);
//   axios({
//     method,
//     url,
//     data,
//   })
//     .then(({ data }) => {
//       if (data.success) {
//         setLoading(false);
//         swal(data.message);
//         resetProduct();
//         getProducts();
//         productModal.value.hide();
//       }
//     })
//     .catch((error) => {
//       console.dir(error);
//       setLoading(false);
//       // 在確認沒有權限的寫法
//     });
// };

const resetProduct = () => {
  tempProduct.value = { ...productObj };
};
// const addImagesUrl = () => {
//   if (tempProduct.value.imagesUrl) {
//     tempProduct.value.imagesUrl.push(imagesUrl.value);
//   } else {
//     tempProduct.value.imagesUrl = [imagesUrl.value];
//   }
//   imagesUrl.value = "";
// };
// const delImagesUrl = (index) => {
//   tempProduct.value.imagesUrl.splice(index, 1);
// };
onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];
  // 預先載入
  // productModal.value = new Modal(productModalDom.value);
  // delProductModal.value = new Modal(delProductModalDom.value);
  axios.defaults.headers.common["Authorization"] = token;
  getProducts();
});
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
      <button @click="openUploadModal" class="btn btn-primary me-3">
        上傳圖片
      </button>
      <button @click="openModalHandler('new')" class="btn btn-primary">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="120">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td class="text-end">{{ product.origin_price }}</td>
          <td class="text-end">{{ product.price }}</td>
          <td>
            <span v-if="product.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <div class="btn-group">
              <button
                @click="openModalHandler('edit', product)"
                type="button"
                class="btn btn-outline-primary btn-sm"
              >
                編輯
              </button>
              <button
                @click="openModalHandler('delete', product)"
                type="button"
                class="btn btn-outline-danger btn-sm"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="pagination?.total_pages">
      <Pagination
        :current_page="pagination.current_page"
        :total_pages="pagination.total_pages"
        :has_next="pagination.has_next"
        :has_pre="pagination.has_pre"
        @get-page="getProducts"
      ></Pagination>
    </div>
  </div>
  <!-- Modal -->
  <!-- 新增 修改 保留對照刪除前後-->
  <AddEditProductModal
    ref="addEditProductRef"
    @get-products="getProducts"
  ></AddEditProductModal>
  <!--  刪除 -->
  <DeleteProductModal
    ref="deleteProductRef"
    @get-products="getProducts"
  ></DeleteProductModal>
  <UploadImageModal ref="uploadImageRef"></UploadImageModal>
  <!-- Modal -->
</template>

<style scoped lang="scss">
img {
  object-fit: contain;
  max-width: 100%;
}

.primary-image {
  height: 300px;
}

.images {
  height: 150px;
}
</style>
