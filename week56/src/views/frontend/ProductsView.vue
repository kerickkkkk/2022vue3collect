<script setup>
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { storeToRefs } from "pinia";
import Pagination from "../../components/base/PaginationComponent.vue";
import { useStatusStore } from "@/stores/statusStore.js";
import { useProductsStore } from "../../stores/productsStore";
import { useCartsStore } from "../../stores/cartsStore";

const router = useRouter();
const statusStore = useStatusStore();
const cartStore = useCartsStore();
const productsStore = useProductsStore();
const { addCart } = cartStore;
const { getProducts } = productsStore;
const { productsGetter: products, paginationGetter: pagination } =
  storeToRefs(productsStore);

const { setLoading } = statusStore;
const swal = inject("$swal");

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
const loadingBlock = ref(false);
//
// const products = ref([]);
// const pagination = ref(null);

// const getProducts = (page = 1) => {
// 1. 關於分頁元件，如當前頁面為產品列表第一頁，可以將分頁的第一頁的按鈕設置為不可點擊(或使用 return 跳出函式)，
// 避免發出重複的 API 請求。當前是第二頁的話，就將第二頁分頁設置為不可點擊...以此類推
// setLoading(true);
// axios
//   .get(`${baseUrl}/api/${apiPath}/products?page=${page}`)
//   .then(({ data }) => {
//     setLoading(false);
//     products.value = data.products;
//     pagination.value = data.pagination;
//   })
//   .catch((error) => {
//     setLoading(false);
//     console.dir(error);
//     swal(error?.response?.data);
//   });
// };
const getProductDetail = (id) => {
  setLoading(true);
  axios
    .get(`${baseUrl}/api/${apiPath}/product/${id}`)
    .then(({ data }) => {
      if (data.success) {
        router.push({ name: "product", params: { id } });
      }
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.dir(error);
      swal(error?.response?.data);
    });
};

onMounted(() => {
  getProducts();
});
</script>

<template>
  <!-- 產品區塊 -->
  <div class="container">
    <h3 class="text-center my-4">產品</h3>
    <div class="row">
      <div class="col-md-4 mb-3" v-for="item in products" :key="item.id">
        <div class="card h-100">
          <img :src="item.imageUrl" class="card-img-top" alt="圖片" />
          <div class="card-body">
            <div class="d-flex justify-content-between">
              <h5 class="card-title">{{ item.title }}</h5>
              <div>
                <div class="badge rounded-pill bg-secondary h5">
                  {{ item.category }}
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-between">
              <template v-if="item.origin_price === item.price">
                <span class="h5 ms-auto">${{ item.origin_price }}</span>
              </template>
              <template v-else>
                <del>${{ item.origin_price }}</del>
                <span class="text-danger h5 ms-auto">${{ item.price }}</span>
              </template>
            </div>
            <div class="d-flex justify-content-center">
              <button
                @click="getProductDetail(item.id)"
                class="btn btn-outline-primary me-3"
                type="button"
              >
                <span
                  v-if="loadingBlock.itemLoading === item.id"
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                >
                </span>
                <!-- Loading... -->
                看詳細
              </button>
              <button
                @click="addCart(item.id, 1)"
                class="btn btn-danger"
                type="button"
              >
                <span
                  v-if="loadingBlock.itemLoading === item.id"
                  class="spinner-grow spinner-grow-sm"
                  role="status"
                  aria-hidden="true"
                ></span>

                加入購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <template v-if="pagination">
      <Pagination
        :current_page="pagination.current_page"
        :total_pages="pagination.total_pages"
        :has_next="pagination.has_next"
        :has_pre="pagination.has_pre"
        @get-page="getProducts"
      ></Pagination>
    </template>
  </div>
</template>
