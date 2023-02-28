import { defineStore } from "pinia";
export const useUserStore = defineStore("user", {
  state: () => ({
    user: {
      id: 0,
      email: "",
    },
    token: "",
  }),
  getters: {
    getUser: (state) => state.user,
    getToken: (state) => state.token,
  },
});