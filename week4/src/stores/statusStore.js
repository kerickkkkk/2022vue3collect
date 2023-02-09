import { defineStore } from "pinia";
export const useStatusStore = defineStore("status", {
  state: () => ({
    isLoading: false,
  }),

  getters: {
    getIsLoading: ({ isLoading }) => isLoading,
  },
  actions: {
    setLoading(status) {
      this.isLoading = status;
    },
  },
});
