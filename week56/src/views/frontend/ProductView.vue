<script setup>
import { ref, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStatusStore } from "@/stores/statusStore.js";
import { useCartsStore } from "../../stores/cartsStore";

const route = useRoute();
const statusStore = useStatusStore();
const cartStore = useCartsStore();
const { setLoading } = statusStore;
const swal = inject("$swal");
const { addCart } = cartStore;
const qty = ref(1);

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
const product = ref([]);

const getProduct = (id) => {
  setLoading(true);
  axios
    .get(`${baseUrl}/api/${apiPath}/product/${id}`)
    .then(({ data }) => {
      console.log(data);
      product.value = data.product;
      setLoading(false);
    })
    .catch((error) => {
      setLoading(false);
      console.dir(error);
      swal(error?.response?.data);
    });
};

const numCountHandler = (type) => {
  if (type === "minus") {
    qty.value = qty.value > 0 ? qty.value - 1 : 0;
  } else if (type === "plus") {
    qty.value += 1;
  }
};
onMounted(() => {
  const { id } = route.params;
  getProduct(id);
});
</script>

<template>
  <div class="container">
    <h3 class="text-center my-4">產品詳細</h3>
    <div class="container">
      <div class="row mb-3 p-3">
        <div class="col-md-6 mb-3">
          <div class="slide__main">
            <div
              class="bg-cover img-fluid"
              :style="`background-image: url(${product.imageUrl})`"
              style="min-height: 350px"
            />
          </div>
        </div>
        <div class="col-md-6 mb-3">
          <div>
            <h1 class="text-primary mb-3">
              {{ product.title }}
            </h1>
            <p>
              {{ product.description }}
            </p>
            <p>付款方式： ATM 、 信用卡</p>
            <div class="d-flex align-items-center mb-2">
              <div class="me-2">數量:</div>
              <div
                class="btn-group me-3"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <button
                  :disabled="qty < 2"
                  type="button"
                  class="btn btn-primary"
                  @click="numCountHandler('minus')"
                >
                  -
                </button>
                <input
                  v-model.number="qty"
                  type="number"
                  min="1"
                  class="form-control rounded-0"
                  style="width: 80px"
                />
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="numCountHandler('plus')"
                >
                  +
                </button>
              </div>
              {{ product.unit }}
            </div>
            <div class="d-flex justify-content-end mb-2">
              <div
                :class="{
                  'text-decoration-line-through':
                    product.origin_price !== product.price,
                }"
              >
                原價： {{ product.origin_price }} 元
              </div>
              <div
                v-if="product.origin_price !== product.price"
                class="text-primary ms-auto"
              >
                特價：<span class="h4">
                  {{ product.price }}
                </span>
                元
              </div>
            </div>
            <div class="d-flex justify-content-end">
              <div
                class="btn btn-outline-primary me-2"
                @click.prevent.stop="addCart(product.id, product.num)"
              >
                加入購物車
              </div>
              <button
                type="button"
                class="btn btn-primary"
                @click.prevent="addCart(true)"
              >
                直接結帳
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
