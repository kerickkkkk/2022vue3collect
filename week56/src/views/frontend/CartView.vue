<script setup>
import { ref, onMounted, inject } from "vue";
import axios from "axios";
import { useStatusStore } from "@/stores/statusStore.js";

// const router = useRouter();
const statusStore = useStatusStore();
const { setLoading } = statusStore;
const swal = inject("$swal");

const baseUrl = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;
const products = ref([]);
const pagination = ref(null);
const user = ref({
  name: "",
  email: "",
  tel: "",
  address: "",
  msg: "",
});
const getProducts = () => {
  setLoading(true);
  axios
    .get(`${baseUrl}/api/${apiPath}/products?page=1`)
    .then(({ data }) => {
      console.log(data);
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
  console.log("submitOrder");
};
onMounted(() => {
  getProducts();
});
</script>

<template>
  <!-- 產品區塊 -->
  <div class="container">
    <h3>驗證區塊</h3>
    <VForm @submit="submitOrder" v-slot="{ errors }">
      <div class="mb-3">
        <label for="name" class="form-label">姓名</label>
        <VField
          v-model="user.name"
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
          v-model="user.email"
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
          v-model="user.tel"
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
          v-model="user.address"
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入 地址"
          rules="required"
        ></VField>
        <error-message
          v-model="user.address"
          name="地址"
          class="invalid-feedback"
        ></error-message>
      </div>
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          v-model="user.msg"
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
