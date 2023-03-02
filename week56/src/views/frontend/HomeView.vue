<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { RouterLink, RouterView } from "vue-router";
import { useCartsStore } from "../../stores/cartsStore";

const cartsStore = useCartsStore();
const { getCarts } = cartsStore;
const { cartsGetter: carts } = storeToRefs(cartsStore);

onMounted(() => {
  getCarts();
});
</script>

<template>
  <main>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">首頁</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav ms-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/admin/"
                >前往後台</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/products"
                >產品</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/messages"
                >最新消息</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/about"
                >關於我們</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/likes"
                >我的最愛</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/cart"
                >購物車(驗證練習)
                {{ carts?.length }}
              </router-link>
            </li>
            <template>
              <li class="nav-item">
                <a
                  @click="logout"
                  class="nav-link"
                  aria-current="page"
                  role="button"
                  >登出</a
                >
              </li>
            </template>
            <template>
              <li class="nav-item">
                <router-link to="/login" class="nav-link" aria-current="page"
                  >登入</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/register" class="nav-link" aria-current="page"
                  >註冊</router-link
                >
              </li>
            </template>
          </ul>
        </div>
      </div>
    </nav>
    <RouterView></RouterView>
  </main>
</template>
