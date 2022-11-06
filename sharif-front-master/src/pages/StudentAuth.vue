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
            v-model="studentNumber"
            :label="getStudentLogin.student_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            filled
            v-model="nationalCode"
            :label="getStudentLogin.national_code"
            lazy-rules
            :rules="[
              (val) => (val !== null && val !== '') || 'Please type your age',
              (val) => (val > 0 && val < 100) || 'Please type a real age',
            ]"
          />

          <div>
            <q-btn
              :label="getStudentLogin['submit']"
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

export default {
  name: "StudentAuth",
  setup() {
    const router = useRouter();
    const studentNumber = ref(null);
    const nationalCode = ref(null);

    const langStore = useLangStore();
    const studentStore = useStudentStore();

    const { getStudentLogin } = storeToRefs(langStore);

    const onSubmit = async () => {
      api
        .post("/student/login", {
          student_code: studentNumber.value,
          national_code: nationalCode.value,
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            localStorage.setItem("s-access", resp.data.token);
            localStorage.setItem("s-refresh", resp.data.refresh);
            studentStore.studentAccessToken = resp.data.token;
            studentStore.studentRefreshToken = resp.data.refresh;
            studentStore.student = resp.data.student;
            studentStore.isAuth = true;
          }
        })
        .then(() => {
          router.push("/student/home");
        });
    };

    return {
      studentNumber,
      nationalCode,
      getStudentLogin,

      onSubmit,

      onReset() {
        studentNumber.value = null;
        nationalCode.value = null;
      },
    };
  },
};
</script>

<style scoped></style>
