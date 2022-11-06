<template>
  <q-page class="flex flex-center">
    <div style="position: relative">

      <transition
        appear
        enter-active-class="animated scale"
        leave-active-class="animated fadeOut"

      >
        <q-img
          src="/logo1.png"
          width="200"
          height="200"
          style="position: absolute; top : -147px;width: 320px;right: 50px; z-index: 100"
        />
      </transition>


      <q-card class="card">
        <div style="height: 100px"></div>
        <div v-if="stage === 1" style="width: 100%">
          <q-btn
            style="width: 305px"
            class="btn"
            to="student"
            color="primary"
            label="پر کردن فرم به عنوان دانشجو"
          ></q-btn>
          <div style="display: flex; justify-content: space-evenly">
            <q-btn
              flat
              color="primary"
              label="ورود دانشجو"
              @click="stage = 2"
            ></q-btn>
            <q-btn
              flat
              color="primary"
              label="ورود کارکنان"
              @click="stage = 3"
            ></q-btn>
          </div>
        </div>

        <q-form
          v-else-if="stage === 2"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <q-input
            outlined
            v-model="studentNumber"
            :label="getStudentLogin.student_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="nationalCode"
            :label="getStudentLogin.national_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div style="width: 95.5%; display: flex; flex-direction: column">
            <q-btn
              :label="getStudentLogin['submit']"
              @click="onSubmit"
              type="submit"
              color="primary"
              style="margin-bottom: 8px"
            />
            <q-btn
              flat
              :label="getStudentLogin['back']"
              @click="stage = 1"
              type="submit"
              color="red"
            />
          </div>
        </q-form>

        <q-form
          v-else-if="stage === 3"
          @submit="onSubmit2"
          @reset="onReset2"
          class="q-gutter-md"
        >
          <q-input
            outlined
            v-model="f_code"
            :label="getStudentLogin.user_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="f_password"
            :label="getStudentLogin.password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div style="width: 95.5%; display: flex; flex-direction: column">
            <q-btn
              :label="getStudentLogin['submit']"
              @click="onSubmit2"
              type="submit"
              color="primary"
              style="margin-bottom: 8px"
            />
            <q-btn
              flat
              :label="getStudentLogin['admin']"
              @click="stage = 4"
              type="submit"
              color="primary"
              style="margin-bottom: 8px"
            />
            <q-btn
              flat
              :label="getStudentLogin['back']"
              @click="stage = 1"
              type="submit"
              color="red"
            />
          </div>
        </q-form>
        <q-form
          v-else-if="stage === 4"
          @submit="onSubmit3"
          @reset="onReset3"
          class="q-gutter-md"
        >
          <q-input
            outlined
            v-model="code"
            :label="getStudentLogin.user_code"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <q-input
            outlined
            v-model="password"
            :label="getStudentLogin.password"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />

          <div style="width: 95.5%; display: flex; flex-direction: column">
            <q-btn
              :label="getStudentLogin['submit']"
              @click="onSubmit3"
              color="primary"
              style="margin-bottom: 8px"
            />
            <q-btn
              flat
              :label="getStudentLogin['faculty']"
              @click="stage = 3"
              type="submit"
              color="primary"
              style="margin-bottom: 8px"
            />
            <q-btn
              flat
              :label="getStudentLogin['back']"
              @click="stage = 1"
              type="submit"
              color="red"
            />
          </div>
        </q-form>
      </q-card>
    </div>

    <!--    <q-card class="card">-->
    <!--      <q-btn-->
    <!--        to="/auth/student"-->
    <!--        class="btn"-->
    <!--        color="primary"-->
    <!--        label="ورود دانشجو"-->
    <!--      ></q-btn>-->
    <!--      <q-btn class="btn" color="primary" label="ورود کارکنان"></q-btn>-->
    <!--      <q-btn-->
    <!--        to="/auth/admin"-->
    <!--        class="btn"-->
    <!--        color="primary"-->
    <!--        label="ورود ادمین"-->
    <!--      ></q-btn>-->
    <!--    </q-card>-->
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import { useLangStore } from "stores/lang";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { api } from "boot/axios";
import { useAdminStore } from "stores/admin";
import { useFacultyStore } from "stores/faculty";
import {useQuasar} from "quasar";

export default defineComponent({
  name: "IndexPage",
  setup() {
    const stage = ref(1);
    const $q=useQuasar()

    //student auth
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
        }).catch(()=>{
        $q.notify({
          color: "red-4",
          textColor: "white",
          message: "اطلاعات وارد شده اشتباه است",
        });
      })
    };

    //faculty-----------------------------------------------------------------------------------------------------------
    const f_code = ref(null);
    const f_password = ref(null);

    const facultyStore = useFacultyStore();
    const onSubmit2 = async () => {
      api
        .post("/faculty/login", {
          code: f_code.value,
          password: f_password.value,
        })
        .then((resp) => {
          if (resp.status === 200) {
            console.log(resp.data);
            localStorage.setItem("f-access", resp.data.access);
            localStorage.setItem("f-refresh", resp.data.refresh);
            facultyStore.facultyAccessToken = resp.data.token;
            facultyStore.facultyRefreshToken = resp.data.refresh;
            facultyStore.faculty = resp.data.faculty;
            facultyStore.isAuth = true;
          }
        })
        .then(() => {
          router.push("/faculty");
        }).catch(()=>{
        $q.notify({
          color: "red-4",
          textColor: "white",
          message: "اطلاعات وارد شده اشتباه است",
        });
      })
    };
    //admin-------------------------------------------------------------------------------------------------------------
    const code = ref(null);
    const password = ref(null);

    const adminStore = useAdminStore();

    const onSubmit3 = async () => {
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
        })
        .then(() => {
          router.push("/admin/home");
        }).catch(()=>{
        $q.notify({
          color: "red-4",
          textColor: "white",
          message: "اطلاعات وارد شده اشتباه است",
        });
      })
    };

    return {
      stage,

      studentNumber,
      nationalCode,
      getStudentLogin,

      onSubmit,
      onSubmit2,
      onSubmit3,
      code,
      password,

      f_code,
      f_password,

      onReset() {
        studentNumber.value = null;
        nationalCode.value = null;
      },
      onReset2() {
        studentNumber.value = null;
        nationalCode.value = null;
      },
      onReset3() {
        studentNumber.value = null;
        nationalCode.value = null;
      },
    };
  },
});
</script>

<style scoped>
.card {
  width: 360px;
  padding: 32px 8px;
  margin: 24px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1;
  background: rgba(255, 255, 255, 0.38);
  border-radius: 16px;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.btn {
  height: 48px;
  font-weight: bold;
  margin: 16px;
  border-radius: 8px;
}
</style>
