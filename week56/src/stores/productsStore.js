import { defineStore } from "pinia";
import { getProductsApi } from "@/api/products";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: [],
    pagination: [],
  }),
  getters: {
    // state 與 getters 命名不可重複 加上後綴 getter
    productsGetter: ({ products }) => products,
    paginationGetter: ({ pagination }) => pagination,
  },
  actions: {
    async getProducts(page = 1) {
      try {
        if (page === this.pagination.value?.current_page) {
          return false;
        }
        const { products, pagination } = await getProductsApi(page);
        this.products = products;
        this.pagination = pagination;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
