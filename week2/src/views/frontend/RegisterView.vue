<script setup>
import { ref, inject } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const swal = inject("$swal");

const { VITE_BASE_URL: url } = import.meta.env;
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const submitHandler = () => {
  const config = {
    email: email.value,
    password: password.value,
  };

  axios
    .post(`${url}/register`, config)
    .then(() => {
      swal("註冊成功!").then(() => {
        // 導向
        router.push({
          name: "login",
        });
      });
    })
    .catch((error) => {
      // 重複 email 會跳錯誤訊息
      swal(error.response.data);
    });
};
</script>

<template>
  <div>
    <h2>註冊</h2>
    <form class="bg-light p-4">
      <div class="mb-3">
        <label for="email" class="form-label">信箱</label>
        <input
          v-model="email"
          type="email"
          class="form-control"
          id="email"
          aria-describedby="emailHelp"
          placeholder="請輸入信箱"
        />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">輸入密碼</label>
        <input
          v-model="password"
          type="password"
          class="form-control"
          id="password"
          placeholder="請輸入密碼"
        />
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">輸入確認密碼</label>
        <input
          v-model="confirmPassword"
          type="password"
          class="form-control"
          id="confirmPassword"
          placeholder="請再次輸入"
        />
      </div>
      <button
        @click.prevent="submitHandler"
        type="submit"
        class="btn btn-primary"
      >
        送出
      </button>
      <div>
        有帳號嗎？
        <router-link to="/login">登入</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
