<script setup>
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import { useStatusStore } from "@/stores/statusStore.js";
import { useCartsStore } from "../../stores/cartsStore";
import { storeToRefs } from "pinia";
import { postOrderApi } from "@/api/orders.js";
// const router = useRouter();
const statusStore = useStatusStore();
const cartsStore = useCartsStore();
const { setLoading } = statusStore;
const { getCarts, updateCart, deleteCart, deleteAllCarts } = cartsStore;
const {
  cartsGetter: carts,
  totalGetter: total,
  finalTotalGetter: finalTotal,
} = storeToRefs(cartsStore);
const swal = inject("$swal");

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

const emptyUserData = {
  name: "",
  email: "",
  tel: "",
  address: "",
  message: "",
};

const products = ref([]);
const pagination = ref(null);

const userData = ref({
  name: "",
  email: "",
  tel: "",
  address: "",
  message: "",
});
const resetUser = () => {
  userData.value = { ...emptyUserData.value };
};
const getProducts = () => {
  setLoading(true);
  axios
    .get(`${baseUrl}/api/${apiPath}/products?page=1`)
    .then(({ data }) => {
      setLoading(false);
      products.value = data.products;
      pagination.value = data.pagination;
    })
    .catch((error) => {
      setLoading(false);
      console.dir(error);
      swal(error?.response?.data);
    });
};
const submitOrder = () => {
  if (carts.value.length <= 0) {
    swal("購物車沒產品");
    return false;
  }
  const data = {
    data: {
      user: {
        name: userData.value.name,
        tel: userData.value.tel,
        email: userData.value.email,
        address: userData.value.address,
      },
      message: userData.value.message,
    },
  };

  postOrderApi(data)
    .then((res) => {
      swal(`${res.message}，訂單編號：${res.orderId}，總價: ${res.total} 元。`);
      getCarts();
      resetUser();
    })
    .then((error) => {
      console.log(error);
    });
};
onMounted(() => {
  getProducts();
});
</script>

<template>
  <!-- 產品區塊 -->
  <div class="container">
    <h3>購物車區塊</h3>
    <div class="row">
      <!-- 購物車區塊 -->
      <div class="row">
        <div class="text-end">
          <!-- 購物車頁面，當購物車內沒有產品時，可以讓「清空購物車」按鈕不顯示，或是讓按鈕呈現無法點擊的狀態 -->
          <button
            :disabled="carts.length <= 0"
            @click="deleteAllCarts"
            class="btn btn-sm btn-outline-danger"
          >
            清空購物車
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">商品選項</th>
              <th scope="col">單價</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
              <th scope="col">刪除</th>
            </tr>
          </thead>
          <tbody v-cloak>
            <template v-if="carts.length > 0">
              <tr v-for="cart in carts" :key="cart.id">
                <th>
                  <div class="cart__title d-flex">
                    <div class="me-3">
                      <img
                        :src="cart.product.imageUrl"
                        :alt="cart.product.title"
                        width="50"
                        class="img-fluid"
                      />
                    </div>
                    <div class="cart__title__content">
                      <div class="h6">{{ cart.product.title }}</div>
                      <p>規格</p>
                    </div>
                  </div>
                </th>
                <td class="text-end">NT ${{ cart.product.price }}</td>
                <td>
                  <div
                    class="btn-group"
                    role="group"
                    aria-label="Basic checkbox toggle button group"
                  >
                    <button
                      @click="updateCart(cart.id, cart.product.id, ++cart.qty)"
                      type="button"
                      class="btn btn-primary"
                    >
                      +
                    </button>

                    <input
                      @change="updateCart(cart.id, cart.product.id, cart.qty)"
                      v-model="cart.qty"
                      type="number"
                      min="1"
                      class="form-control rounded-0"
                      style="width: 80px"
                    />

                    <button
                      :disabled="cart.qty < 2"
                      @click="updateCart(cart.id, cart.product.id, --cart.qty)"
                      type="button"
                      class="btn btn-primary"
                    >
                      -
                    </button>
                  </div>
                </td>
                <td class="text-end">NT ${{ cart.final_total }}</td>
                <td>
                  <button
                    @click="deleteCart(cart.id)"
                    class="btn btn-sm btn-outline-danger"
                  >
                    刪除
                  </button>
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td colspan="100" class="text-center">
                  購物車沒有東西
                  <!-- 抽出做時間倒數 -->
                  <routerLink to="/products"> 挑選產品去</routerLink>
                </td>
              </tr>
            </template>
          </tbody>
          <tfoot>
            <tr>
              <td class="text-end" colspan="100">原價 NT $ {{ total }}</td>
            </tr>
            <tr>
              <td class="text-end" colspan="100">總價 NT $ {{ finalTotal }}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
    <h3>驗證區塊</h3>
    <VForm @submit="submitOrder" v-slot="{ errors }">
      <div class="mb-3">
        <label for="name" class="form-label">姓名</label>
        <VField
          v-model="userData.name"
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入 姓名"
          rules="required"
        ></VField>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <VField
          v-model="userData.email"
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
        ></VField>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">電話</label>
        <VField
          v-model="userData.tel"
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入 電話"
          rules="required|min:8|max:10"
        ></VField>
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <div class="mb-3">
        <label for="address" class="form-label">地址</label>
        <VField
          v-model="userData.address"
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入 地址"
          rules="required"
        ></VField>
        <error-message
          v-model="userData.address"
          name="地址"
          class="invalid-feedback"
        ></error-message>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          v-model="userData.message"
          class="form-control"
          id="message"
          placeholder="請輸入 留言"
          aria-describedby="message"
        ></textarea>
      </div>
      <button class="btn btn-primary" type="submit">送出訂單</button>
    </VForm>
  </div>
</template>
