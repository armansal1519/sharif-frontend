<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <q-card style="width: 360px; height: 480px">
      <div class="q-pa-md" style="max-width: 400px">
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            filled
            v-model="code"
            :label="getAdminLogin.student_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="password"
            :label="getAdminLogin.national_code"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <div>
            <q-btn
              :label="getAdminLogin['submit']"
              @click="onSubmit"
              type="submit"
              color="primary"
            />
          </div>
        </q-form>
      </div>
    </q-card>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStudentStore } from "stores/student";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia/dist/pinia";
import { useLangStore } from "stores/lang";
import { api } from "boot/axios";
import { useAdminStore } from "stores/admin";

export default {
  name: "AdminAuth",
  setup() {
    const router = useRouter();
    const code = ref(null);
    const password = ref(null);

    const langStore = useLangStore();
    const adminStore = useAdminStore();

    const { getAdminLogin } = storeToRefs(langStore);

    const onSubmit = async () => {
      api
        .post("/admin/login", {
          code: code.value,
          password: password.value,
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            localStorage.setItem("a-access", resp.data.access);
            localStorage.setItem("a-refresh", resp.data.refresh);
            adminStore.studentAccessToken = resp.data.token;
            adminStore.studentRefreshToken = resp.data.refresh;
            adminStore.student = resp.data.student;
            adminStore.isAuth = true;
          }
        }).catch(err=>{
        console.log("err",err)
      })
        .then(() => {
          router.push("/admin/home");
        });
    };

    return {
      code,
      password,
      getAdminLogin,

      onSubmit,

      onReset() {
        code.value = null;
        password.value = null;
      },
    };
  },
};
</script>

<style scoped></style>
