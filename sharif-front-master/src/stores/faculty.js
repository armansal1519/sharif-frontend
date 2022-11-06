import { defineStore } from "pinia";

export const useFacultyStore = defineStore("faculty", {
  state: () => ({
    facultyAccessToken: "",
    facultyRefreshToken: "",
    faculty: null,
    isAuth: false,
    aoa: null,
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
