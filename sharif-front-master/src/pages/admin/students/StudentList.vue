<template>
  <div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="width: 90%; margin-top: 16px">
        <q-input
          v-model="searchText"
          @update:model-value="onSearch"
          style="width: 100%; position: relative"
          outlined
          label="نام یا شماره دانشجویی"
        >
        </q-input>
      </div>
    </div>
  </div>
  <q-infinite-scroll
    style="padding: 16px"
    :disable="infScrollDisable"
    @load="onLoad"
    :offset="250"
  >
    <!--    <course-item-->
    <!--      v-for="(c, i) in studentList"-->
    <!--      :key="c.ID"-->
    <!--      :course="c"-->
    <!--      :index="i"-->
    <!--      :del="true"-->
    <!--      :edit="true"-->
    <!--      @delete="onDelete"-->
    <!--    ></course-item>-->

    <q-card
      style="
        width: 90%;
        height: 56px;
        display: flex;
        justify-content: space-between;
        padding: 12px;
        margin: 8px;
      "
      v-for="c in studentList"
      :key="c.ID"
    >
      <div       @click="onClickCard(`/admin/students/${c.ID}`)"
                 style="display: flex; justify-content: right">
        <div class="s">
          {{ c.first_name + " " + c.last_name }}
        </div>
        <div class="s">
          {{ c.student_code }}
        </div>
        <div class="s">
          {{ c.national_code }}
        </div>
      </div>
      <div style="display: flex; align-items: center">
        <q-btn
          flat
          round
          color="red"
          @click="onDialog(c.ID)"
          icon="delete"
        ></q-btn>
      </div>
    </q-card>

    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>

  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">حذف دانشجو</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="red" label="انصراف" v-close-popup />
        <q-btn flat color="primary" label="تایید" @click="onDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { useQuasar } from "quasar";
import { useLangStore } from "stores/lang";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { api } from "boot/adminAxios";
import { useRouter } from "vue-router";

export default {
  name: "StudentList",
  setup() {
    const studentList = ref([]);
    const $q = useQuasar();
    const router = useRouter();
    const langStore = useLangStore();
    const studentStore = useStudentStore();
    const { getStudentForm, lang } = storeToRefs(langStore);
    const formItemObj = ref({});

    const searchText = ref("");
    const infScrollDisable = ref(false);

    const persistent = ref(false);
    const studentID = ref("");

    onMounted(async () => {
      await getStudents(0);
    });

    const getStudents = async () => {
      const resp = await api.post(`/student/all?offset=0&limit=200`, {
        search: "",
      });
      if (resp.status === 200) {
        const temp = resp.data;
        if (temp.length < 20) infScrollDisable.value = true;
        studentList.value.push(...temp);
        console.log(studentList.value);
      }
    };

    const onSearch = async () => {
      if (searchText.value === "") return;
      console.log(searchText.value);
      const resp = await api.post(`/student/all?offset=0&limit=500`, {
        search: searchText.value,
      });
      console.log(resp.data);
      studentList.value = resp.data;
    };

    const onDelete = async () => {
      const resp = await api.delete(`student/${studentID.value}`);
      if (resp.status === 200) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "دانشجو با موفقیت حدف شد",
        });
        persistent.value = false;
        studentList.value = [];
        await getStudents();
      }
    };

    const onDialog = (id) => {
      studentID.value = id;
      persistent.value = true;
    };

    const onLoad = (index, done) => {
      // getStudents(index);
      done();
    };

    const onClickCard = async (link) => {
      await router.push(link);
    };

    return {
      getStudentForm,
      searchText,
      studentList,
      formItemObj,
      lang,
      infScrollDisable,
      onSearch,
      onDelete,
      onLoad,
      onDialog,
      onClickCard,
      // onClickItem,
      // onType,
      // sumNumberOfUnit,
      persistent,
    };
  },
};
</script>

<style scoped>
.s {
  display: flex;
  align-items: center;

  width: 300px;
}
</style>
