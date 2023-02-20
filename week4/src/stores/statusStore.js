import { defineStore } from "pinia";
export const useStatusStore = defineStore("status", {
  state: () => ({
    isLoading: false,
  }),

  getters: {
    getIsLoading: ({ isLoading }) => {
      return isLoading;
    },
  },
  actions: {
    setLoading(status) {
      this.isLoading = status;
    },
  },
});
