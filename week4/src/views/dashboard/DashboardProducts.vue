<script setup>
import axios from "axios";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import Modal from "bootstrap/js/dist/modal";

const router = useRouter();
const swal = inject("$swal");

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
const modalType = ref("");
const productModalDom = ref(null);
const productModal = ref(null);
const delProductModalDom = ref(null);
const delProductModal = ref(null);
// 暫存多圖的連結
const imagesUrl = ref("");
const getProducts = () => {
  axios
    .get(`${baseUrl}/api/${apiPath}/admin/products`)
    .then(({ data }) => {
      products.value = data.products;
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
      // 在確認沒有權限的寫法
      router.push({ name: "login" });
    });
};
const getProduct = (id) => {
  tempProduct.value = products.value.find((item) => item.id === id);
};
const openModalHandler = (type, id) => {
  modalType.value = type;
  if (type === "new" || type === "edit") {
    if (type === "edit") {
      getProduct(id);
    }
    productModal.value.show();
  } else if (type === "delete") {
    tempProduct.value.id = id;
    delProductModal.value.show();
  } else {
    swal("錯誤");
  }
};
const addEditProduct = (id) => {
  const method = modalType.value === "new" ? "post" : "put";
  const url =
    modalType.value === "new"
      ? `${baseUrl}/api/${apiPath}/admin/product`
      : `${baseUrl}/api/${apiPath}/admin/product/${id}`;
  const data = { data: tempProduct.value };
  axios({
    method,
    url,
    data,
  })
    .then(({ data }) => {
      if (data.success) {
        swal(data.message);
        resetProduct();
        getProducts();
        productModal.value.hide();
      }
    })
    .catch((error) => {
      console.dir(error);
      // 在確認沒有權限的寫法
    });
};
const delProduct = (id) => {
  axios({
    method: "DELETE",
    url: `${baseUrl}/api/${apiPath}/admin/product/${id}`,
  })
    .then(({ data }) => {
      if (data.success) {
        swal(data.message);
        resetProduct();
        getProducts();
        delProductModal.value.hide();
      }
    })
    .catch((error) => {
      console.dir(error);
    });
};
const resetProduct = () => {
  tempProduct.value = { ...productObj };
  imagesUrl.value = "";
};
const addImagesUrl = () => {
  if (tempProduct.value.imagesUrl) {
    tempProduct.value.imagesUrl.push(imagesUrl.value);
  } else {
    tempProduct.value.imagesUrl = [imagesUrl.value];
  }
  imagesUrl.value = "";
};
const delImagesUrl = (index) => {
  tempProduct.value.imagesUrl.splice(index, 1);
};
onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];
  // 預先載入
  productModal.value = new Modal(productModalDom.value);
  delProductModal.value = new Modal(delProductModalDom.value);
  axios.defaults.headers.common["Authorization"] = token;
  getProducts();
});
</script>

<template>
  <div class="container">
    <div class="text-end mt-4">
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
                @click="openModalHandler('edit', product.id)"
                type="button"
                class="btn btn-outline-primary btn-sm"
              >
                編輯
              </button>
              <button
                @click="openModalHandler('delete', product.id)"
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
  </div>
  <!-- Modal -->
  <!-- 新增 修改 -->
  <div
    id="productModal"
    ref="productModalDom"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>{{ modalType === "new" ? "新增" : "編輯" }}產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入圖片網址</label>
                  <input
                    v-model="tempProduct.imageUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
              </div>
              <div class="mb-2">
                <div class="mb-3">
                  <label for="imageUrl" class="form-label">輸入子圖片組</label>
                  <input
                    v-model="imagesUrl"
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                  />
                </div>
                <div class="row">
                  <div
                    v-for="(url, i) in tempProduct.imagesUrl"
                    :key="url"
                    class="position-relative col-4"
                  >
                    <div class="px-1 py-2">
                      <img class="img-fluid" :src="url" alt="" />
                      <button
                        @click="delImagesUrl(i)"
                        class="btn btn-outline-primary rounded-circle position-absolute top-0 end-0 py-1 px-2"
                      >
                        X
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <button
                  v-if="imagesUrl !== ''"
                  @click="addImagesUrl"
                  class="btn btn-outline-primary btn-sm d-block w-100"
                >
                  新增圖片
                </button>
              </div>
              <!-- <div>
                <button class="btn btn-outline-danger btn-sm d-block w-100">
                  刪除圖片
                </button>
              </div> -->
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  v-model="tempProduct.title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    v-model="tempProduct.category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    v-model="tempProduct.unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    v-model="tempProduct.origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    v-model="tempProduct.price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="content" class="form-label">產品描述</label>
                <textarea
                  id="content"
                  v-model="tempProduct.content"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  v-model="tempProduct.description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    v-model="tempProduct.is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="resetProduct"
          >
            取消
          </button>
          <button
            @click="addEditProduct(tempProduct.id)"
            type="button"
            class="btn btn-primary"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  刪除 -->
  <div
    id="delProductModal"
    ref="delProductModalDom"
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
          <strong class="text-danger"></strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
            @click="resetProduct"
          >
            取消
          </button>
          <button
            @click="delProduct(tempProduct.id)"
            type="button"
            class="btn btn-danger"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
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
