<template>
  <div style="display: flex; justify-content: center; margin: 16px">
    <q-card
      v-if="langObj"
      style="
        min-height: 400px;
        display: flex;
        width: 80%;
        flex-direction: column;
        position: absolute;
      "
    >
      <div style="width: 100%; margin: 16px; height: 48px">
        <div style="font-weight: bold; font-size: 24px; color: #00067a">
          {{ langObj.title }}
        </div>
      </div>
      <div style="display: flex; flex-wrap: wrap">
        <q-input
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.first_name"
          :label="langObj.first_name"
        ></q-input>
        <q-input
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.last_name"
          :label="langObj.last_name"
        ></q-input>
        <q-input
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.national_code"
          :label="langObj.national_code"
        ></q-input>
        <q-input
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.student_code"
          :label="langObj.student_code"
        ></q-input>
        <q-select
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.sex"
          :options="langObj.sexItems"
          :label="langObj.sex"
          emit-value
          map-options
        />
        <q-select
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.field"
          :options="getFields"
          :label="langObj.field"
          emit-value
          map-options
        />
        <q-select
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.degree"
          :options="langObj.degreeItems"
          :label="langObj.degree"
          emit-value
          map-options
        />
        <q-select
          style="width: 300px; margin: 16px"
          outlined
          v-model="postData.semester"
          :options="semesterList"
          :label="langObj.semester"
          emit-value
          map-options
        />
      </div>
      <div
        style="
          height: 48px;
          display: flex;
          justify-content: flex-end;
          width: 100%;
          align-self: flex-end;
          margin-top: 16px;
        "
      >
        <q-btn
          style="width: 144px; position: absolute; bottom: 16px; left: 16px"
          color="primary"
          :label="langObj.submit"
          @click="onSubmit"
        />
      </div>
<!--      {{ postData }}-->
    </q-card>
  </div>
</template>

<script>
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { useLangStore } from "stores/lang";
import { onMounted, ref, watch } from "vue";
import { api } from "boot/axios";
import { useRouter } from "vue-router";
import {useFieldStore} from "stores/field";

export default {
  name: "IndexPage",
  setup() {
    const langStore = useLangStore();
    const studentStore = useStudentStore();
    const fieldStore=useFieldStore()

    const { getFields }=storeToRefs(fieldStore)

    const router = useRouter();

    const { getBasicInfoForm } = storeToRefs(langStore);
    const langObj = getBasicInfoForm;

    const semesterList = ref([]);

    const postData = ref({
      first_name: "",
      last_name: "",
      field: "",
      degree: "",
      sex: "",
      semester: "",
      student_code: "",
      national_code: "",
    });

    const onSubmit = async () => {
      const resp = await api.post("/student", postData.value);
      if (resp.status === 200) {
        studentStore.studentAccessToken = resp.data.token;
        studentStore.studentRefreshToken = resp.data.refresh;
        studentStore.student = resp.data.student;
        studentStore.isAuth = true;
        localStorage.setItem("s-access", resp.data.token);
        localStorage.setItem("s-refresh", resp.data.refresh);

        await router.push("/student/home");
      }
    };

    const getSemester = async () => {
      const resp = await api.get("/semester");
      if (resp.status === 200) {
        semesterList.value = resp.data.map((item) => item.name);
      }
    };

    onMounted(async () => {
      await getSemester();
    });

    return {
      postData,
      langObj,
      semesterList,
      onSubmit,
      getFields
    };
  },
};
</script>

<style scoped></style>
