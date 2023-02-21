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

const productModal = ref(null);
const tempProduct = ref({
  // 避免多一層會有錯誤
  imageUrl: "",
});
// 暫存多圖的連結
const imagesUrl = ref("");
const modalType = ref("");
const emit = defineEmits(["getProducts"]);
const show = (product, type) => {
  productModal.value.show();
  modalType.value = type;
  tempProduct.value = product;
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

const addEditProduct = (id) => {
  const method = modalType.value === "new" ? "post" : "put";
  const url =
    modalType.value === "new"
      ? `${baseUrl}/api/${apiPath}/admin/product`
      : `${baseUrl}/api/${apiPath}/admin/product/${id}`;
  const data = { data: tempProduct.value };
  setLoading(true);
  axios({
    method,
    url,
    data,
  })
    .then(({ data }) => {
      if (data.success) {
        setLoading(false);
        emit("getProducts");
        productModal.value.hide();
        swal(data.message);
        // 集中到 getProducts 內 resetProduct
        // resetProduct();
        // getProducts();
      }
    })
    .catch((error) => {
      console.dir(error);
      setLoading(false);
      // 在確認沒有權限的寫法
    });
};

onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];

  // 存取 ID 只會掛載一次
  productModal.value = new Modal("#productModal", {
    // 避免連點的時候 有 Uncaught RangeError: Maximum call stack size exceeded.
    focus: false,
  });
  axios.defaults.headers.common["Authorization"] = token;
});
// 開放方法使用
defineExpose({ show });
</script>
<template>
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
                    id="imageUrl"
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
                  <label for="imagesUrl" class="form-label">輸入子圖片組</label>
                  <input
                    id="imagesUrl"
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
              <div class="row">
                <div class="col-6">
                  <h6>星等</h6>
                  <div class="rating">
                    <span
                      class="star"
                      :class="{ 'bg-warning': n <= tempProduct.star }"
                      v-for="n in 5"
                      :key="n"
                      @click="tempProduct.star = n"
                    ></span>

                    <input type="hidden" v-model="tempProduct.star" />
                  </div>
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
</template>
<style lang="scss" scoped>
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
.rating {
  display: flex;
  justify-content: center;
}

:deep(.star) {
  display: inline-block;
  width: 1em;
  height: 1em;
  background-color: lightgray;
  -webkit-clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  cursor: pointer;
  // hover 的要再看看
}
</style>
