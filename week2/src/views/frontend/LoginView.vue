<script setup>
import { ref, inject } from "vue";
import axios from "axios";
// import { useUserStore } from "@/stores/users";
import { useRouter } from "vue-router";

// const store = useUserStore();

const router = useRouter();
const swal = inject("$swal");

const url = import.meta.env.VITE_BASE_URL;
const username = ref("howcrazys@gmail.com");
const password = ref("hex123456");

const submitHandler = () => {
  const params = {
    username: username.value,
    password: password.value,
  };
  axios
    .post(`${url}/admin/signin`, params)
    .then(({ data }) => {
      console.log(data);
      const { token, expired } = data;

      document.cookie = `ttShopToken=${token}; expires=${new Date(expired)}; `;

      // router.push({
      //   name: `${user?.role?.includes("admin") ? "admin" : "index"}`,
      // });
      router.push({
        name: "admin_index",
      });
    })
    .catch((error) => {
      console.dir(error);
      swal(error?.response?.data);
    });
};
</script>

<template>
  <div>
    <form class="bg-light p-4">
      <div class="mb-3">
        <label for="username" class="form-label">信箱</label>
        <input
          v-model="username"
          type="email"
          class="form-control"
          id="username"
          aria-describedby="emailHelp"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
        />
      </div>
      <button @click="submitHandler" type="submit" class="btn btn-primary">
        送出
      </button>
      <div>
        沒有帳號嗎？
        <router-link to="/register">註冊去</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
