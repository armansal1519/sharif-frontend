import { defineStore } from "pinia";

export const useAdminStore = defineStore("admin", {
  state: () => ({
    adminAccessToken: "",
    adminRefreshToken: "",
    admin: null,
    isAuth: false,
  }),

  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
