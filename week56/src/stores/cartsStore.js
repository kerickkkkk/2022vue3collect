import { defineStore } from "pinia";
import { getCartsApi, postCartsApi, putCartApi } from "@/api/carts";

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
    findProductIdInCarts(id) {
      return this.carts.find((item) => item.id === id) ? true : false;
    },
    async getCarts() {
      try {
        const { data } = await getCartsApi();
        this.carts = data.carts;
        this.total = data.total;
        this.finalTotal = data.final_total;
        console.log(data);
      } catch (e) {
        console.log(e);
      }
    },
    async addCart(id, qty) {
      qty = qty * 1 || 1;
      try {
        if (this.findProductIdInCarts(id)) {
          await putCartApi(id, qty);
        } else {
          await postCartsApi(id, qty);
        }
        this.getCarts();
      } catch (e) {
        console.log(e);
      }
    },
  },
});
