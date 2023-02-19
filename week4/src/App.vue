<script setup>
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";
import { useStatusStore } from "@/stores/statusStore.js";

const statusStore = useStatusStore();
const fullPage = ref(true);
const { getIsLoading } = storeToRefs(statusStore);
const isLoading = computed(() => getIsLoading);
</script>

<template>
  <Loading v-model:active="isLoading" :is-full-page="fullPage">
    <template v-slot:default>
      <img width="100" src="./assets/loading.svg" alt="" />
    </template>
  </Loading>
  <RouterView />
</template>

<style scoped></style>
