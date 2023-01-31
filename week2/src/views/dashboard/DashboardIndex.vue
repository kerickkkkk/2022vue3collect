<script setup>
import axios from "axios";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const swal = inject("$swal");

const url = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

const products = ref([]);
const tempProduct = ref({});
const checkLogin = () => {
  axios
    .post(`${url}/api/user/check`)
    .then(({ data }) => {
      if (data.success) {
        getProducts();
      } else {
        swal("請重新登入");
        router.push({
          name: "login",
        });
      }
      // const { token, expired } = data;

      // document.cookie = `ttShopToken=${token}; expires=${new Date(expired)};`;
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
      router.push({
        name: "login",
      });
    });
};

const getProducts = () => {
  axios
    .get(`${url}/api/${apiPath}/admin/products/all`)
    .then(({ data }) => {
      products.value = Object.values(data.products);
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
    });
};
const getProduct = (id) => {
  tempProduct.value = products.value.find((item) => item.id === id);
};
onMounted(() => {
  // 從 cookie 取出
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("ttShopToken="))
    ?.split("=")[1];
  // 預先載入
  axios.defaults.headers.common["Authorization"] = token;
  checkLogin();
});
</script>

<template>
  <div>
    後臺首頁
    <div class="container">
      <div class="row py-3">
        <div class="col-md-6">
          <h2>產品列表</h2>
          <table class="table table-hover mt-4">
            <thead>
              <tr>
                <th width="150">產品名稱</th>
                <th width="120">原價</th>
                <th width="120">售價</th>
                <th width="150">是否啟用</th>
                <th width="120">查看細節</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td width="150">{{ product.title }}</td>
                <td width="120">{{ product.origin_price }}</td>
                <td width="120">{{ product.price }}</td>
                <td width="150">
                  <span v-if="product.is_enabled" class="text-success"
                    >啟用</span
                  >
                  <span v-else>未啟用</span>
                </td>
                <td width="120">
                  <button
                    @click="getProduct(product.id)"
                    type="button"
                    class="btn btn-primary"
                  >
                    查看細節
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            目前有 <span>{{ products.length }}</span> 項產品
          </p>
        </div>
        <div class="col-md-6">
          <h2>單一產品細節</h2>
          <template v-if="tempProduct.id">
            <div class="card mb-3">
              <img
                :src="tempProduct.imageUrl"
                class="card-img-top primary-image"
                alt="主圖"
              />
              <div class="card-body">
                <h5 class="card-title">
                  {{ tempProduct.title }}
                  <span class="badge bg-primary ms-2">{{}}</span>
                </h5>
                <p class="card-text">商品描述：{{ tempProduct.description }}</p>
                <p class="card-text">商品內容：{{ tempProduct.content }}</p>
                <div class="d-flex">
                  <p class="card-text me-2">{{ tempProduct.price }}</p>
                  <p class="card-text text-secondary">
                    <del>{{ tempProduct.origin_price }}</del>
                  </p>
                  元 / {{ tempProduct.unit }}
                </div>
              </div>
            </div>
            <template v-if="tempProduct?.imagesUrl?.length > 0">
              <img
                v-for="image in tempProduct.imagesUrl"
                :src="image"
                :key="image"
                alt="image"
                class="images m-2"
              />
            </template>
          </template>
          <p v-else class="text-secondary">請選擇一個商品查看</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
