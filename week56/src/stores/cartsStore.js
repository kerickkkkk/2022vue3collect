import { defineStore } from "pinia";
import {
  getCartsApi,
  postCartsApi,
  putCartApi,
  deleteCartApi,
  deleteAllCartsApi,
} from "@/api/carts";

export const useCartsStore = defineStore("carts", {
  state: () => ({
    carts: [],
    total: 0,
    finalTotal: 0,
  }),
  getters: {
    cartsGetter: ({ carts }) => carts,
    totalGetter: ({ total }) => total,
    finalTotalGetter: ({ finalTotal }) => finalTotal,
  },
  actions: {
    async getCarts() {
      try {
        const { data } = await getCartsApi();
        this.carts = data.carts;
        this.total = data.total;
        this.finalTotal = data.final_total;
      } catch (e) {
        console.log(e);
      }
    },
    async addCart(id, qty = 1) {
      qty = qty * 1 || 1;
      try {
        await postCartsApi(id, qty);
        this.getCarts();
      } catch (e) {
        console.log(e);
      }
    },
    async updateCart(cartId, id, qty = 1) {
      qty = qty * 1 || 1;
      try {
        await putCartApi(cartId, id, qty);
        this.getCarts();
      } catch (e) {
        console.log(e);
      }
    },
    async deleteCart(cartId) {
      try {
        await deleteCartApi(cartId);
        this.getCarts();
      } catch (e) {
        console.log(e);
      }
    },

    async deleteAllCarts(cartId) {
      try {
        await deleteAllCartsApi(cartId);
        this.getCarts();
      } catch (e) {
        console.log(e);
      }
    },
  },
});
