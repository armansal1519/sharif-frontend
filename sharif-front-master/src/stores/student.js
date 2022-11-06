import { defineStore } from "pinia";

export const useStudentStore = defineStore("student", {
  state: () => ({
    studentAccessToken: "",
    studentRefreshToken: "",
    student: null,
    isAuth: false,
    hasSendForm: false,
    form: null,
    formData: null,
    formDataLoaded: false,
  }),

  getters: {
    getIsAuth(state) {
      return state.isAuth;
    },
    getFormItem(state) {
      if (state.formData === null) return false;
      let data = state.formData.formItems;
      let res = {};
      for (let i = 0; i < data.length; i++) {
        if (res.hasOwnProperty(data[i].group_name)) {
          res[data[i].group_name].push(data[i]);
        } else {
          res[data[i].group_name] = [data[i]];
        }
      }
      console.log("form item", res)
      return res;
    },
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
