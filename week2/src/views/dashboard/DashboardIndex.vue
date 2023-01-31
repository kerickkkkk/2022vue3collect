<script setup>
import axios from "axios";
import { ref, onMounted, inject } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const swal = inject("$swal");

const url = import.meta.env.VITE_BASE_URL;
const apiPath = import.meta.env.VITE_PATH;

const products = ref([]);

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
      console.log(data);
      products.value = [data.products];
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
    });
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
    {{ products }}
  </div>
</template>

<style scoped lang="scss"></style>
