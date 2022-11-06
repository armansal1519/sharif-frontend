<template>
  <div
    style="
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
    v-if="formDataLoaded"
  >
    <div style="width: 90%" v-if="hasSendForm">
      <form-summery></form-summery>

      <show-form v-if="getFormItem" :form="getFormItem"></show-form>
    </div>
    <div v-else style="width: 90%; margin-top: 16px">
      <q-input
        v-model="searchText"
        @update:model-value="onSearch"
        style="width: 100%; position: relative"
        outlined
        :label="getStudentForm.search"
      >
        <q-list
          v-if="courseList.length > 0"
          dense
          bordered
          padding
          class="rounded-borders"
          style="
            z-index: 2;
            position: absolute;
            top: 56px;
            width: 100%;
            background-color: #fff;
          "
        >
          <q-item
            v-for="(c, i) in courseList"
            :key="i"
            clickable
            v-ripple
            @click="onClickItem(c.ID)"
            style=""
          >
            <q-item-section>
              <div>
                {{ lang == "fa" ? c.name : c.latin_name }} - {{ c.code }}
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-input>

      <div v-if="formItemObj">
        <q-expansion-item
          style="width: 100%; margin: 20px 5px; border-top: #00067a solid 1px"
          v-for="(item, key, i) in formItemObj"
          :key="key + i"
          :label="
            lang === 'fa'
              ? `  ${key} ${item.length}-درس ${sumNumberOfUnit(item)}  واحد انتخاب شده - تعداد واحد کل ${item[0].group_count} `
              : `${key} ${item.length} course ${sumNumberOfUnit(item)} unit `
          "
          default-opened
        >
          <div
            v-for="(course, index) in item"
            :key="index"
            style="margin-top: 8px"
          >
            <div>
              <div
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  flex-wrap: wrap;
                "
              >
                <div>
                  {{ index + 1 }}
                </div>
                <div>
                  <div v-if="course.is_free_item">
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].name"
                      :label="getStudentForm.course_name"
                    ></q-input>
                  </div>
                  <div v-else>
                    {{ course.name }}
                  </div>
                  <!--                  {{ course.name }}-->
                </div>
                <div>
                  <div v-if="course.is_free_item">
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].latin_name"
                      :label="getStudentForm.course_name"
                    ></q-input>
                  </div>
                  <div v-else>
                    {{ course.latin_name }}
                  </div>
                </div>
                <div>
                  <div v-if="course.is_free_item">
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].vahed"
                      :label="getStudentForm.vahed"
                    ></q-input>
                  </div>
                  <div v-else>
                    {{ course.vahed }}
                  </div>
                </div>

                <div style="display: flex; justify-content: stretch">
                  <div>
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].nameTakenByStudent"
                      :label="getStudentForm.course_name"
                      @dblclick="onDbClickItemName(course.name ,key,index)"
                    ></q-input>
                  </div>
                  <div>
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].codeTakenByStudent"
                      :label="getStudentForm.course_code"
                      @dblclick="onDbClickItemCode(course.code ,key,index)"

                    ></q-input>
                  </div>
                  <div>
                    <q-select
                      filled
                      dense
                      style="width: 100px"
                      @change="onType"
                      v-model="formItemObj[key][index].semester"
                      :options="semesterList"
                      :label="getStudentForm.semester"
                    ></q-select>
                  </div>
                  <div>
                    <q-input
                      filled
                      dense
                      class="txt"
                      type="number"
                      @change="onType"
                      v-model="formItemObj[key][index].mark"
                      :label="getStudentForm.course_mark"
                    ></q-input>
                  </div>
                  <div>
                    <q-input
                      filled
                      dense
                      class="txt"
                      @change="onType"
                      v-model="formItemObj[key][index].considerations"
                      :label="getStudentForm.considerations"
                    ></q-input>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </q-expansion-item>
      </div>
      <q-btn
        style="margin: 12px 0"
        color="primary"
        @click="onSubmit"
        :label="getStudentForm.submit"
      ></q-btn>
    </div>
  </div>
</template>

<script>
import { useLangStore } from "stores/lang";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { api } from "boot/axios";
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useQuasar } from "quasar";
import ShowForm from "components/ShowForm";
import FormSummery from "components/FormSummery";
import { useRouter } from "vue-router";

export default {
  name: "FormPage",
  components: { ShowForm ,FormSummery},
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const langStore = useLangStore();
    const studentStore = useStudentStore();
    const { getStudentForm, lang } = storeToRefs(langStore);
    const { form, hasSendForm, getFormItem, formDataLoaded } =
      storeToRefs(studentStore);
    const courseList = ref([]);
    const formItemObj = ref({});

    const searchText = ref("");

    const semesterList = ref([]);

    onMounted(async () => {
      if (localStorage.getItem("form")) {
        formItemObj.value = JSON.parse(localStorage.getItem("form"));
      }

      const resp = await api.get("semester/student");
      console.log(11111111, resp.data);
      semesterList.value = resp.data.map((item) => item.name);
    });

    const onSearch = async () => {
      if (searchText.value === "") return;
      const resp = await api.post(`/form-item/search`, { s: searchText.value });
      console.log(resp.data);
      courseList.value = resp.data;
    };

    const onClickItem = (id) => {
      const item = courseList.value.find((item) => item.ID === id);
      console.log(item.ID);
      if (formItemObj.value.hasOwnProperty(item.group_name)) {
        console.log(123, formItemObj.value[item.group_name]);
        if (formItemObj.value[item.group_name].some((item) => item.ID === id)) {
          courseList.value = [];
          searchText.value = "";
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: getStudentForm.value.notify_error_add_before,
            position: "top",
          });

          return;
        } else {
          formItemObj.value[item.group_name].push({
            ID: item.ID,
            group_name: item.group_name,
            group_count: item.group_count,
            student_id: "",
            code: item.code,
            mark: 0,
            name: item.name,
            latin_name: item.latin_name,
            field: "",
            degree: "",
            vahed: item.vahed,
            semester: "",
            considerations: "",
            codeTakenByStudent: "",
            nameTakenByStudent: "",
            is_free_item: false,
          });
        }
      } else {
        formItemObj.value[item.group_name] = [
          {
            ID: item.ID,
            group_name: item.group_name,
            group_count: item.group_count,
            student_id: "",
            code: item.code,
            mark: 0,
            name: item.name,
            latin_name: item.latin_name,
            field: "",
            degree: "",
            vahed: item.vahed,
            semester: "",
            considerations: "",
            codeTakenByStudent: "",
            nameTakenByStudent: "",
            is_free_item: false,
          },
        ];
      }
      courseList.value = [];
      searchText.value = "";
    };

    const onDbClickItemName=(name, key, index)=>{
      console.log(name)
      formItemObj.value[key][index].nameTakenByStudent=name
    }

    const onDbClickItemCode=(code, key, index)=>{
      console.log(code)
      formItemObj.value[key][index].codeTakenByStudent=code
    }

    const onType = () => {
      // console.log(formItemObj.value)
      localStorage.setItem("form", JSON.stringify(formItemObj.value));
    };

    const sumNumberOfUnit = (itemArr) => {
      let sum = 0;
      for (let i = 0; i < itemArr.length; i++) {
        sum += itemArr[i].vahed;
      }
      return sum;
    };

    const onSubmit = async () => {
      console.log("in form submit")

      let array = [];
      for (const p in formItemObj.value) {
        array.push(...formItemObj.value[p]);
      }

      for (let i = 0; i < array.length; i++) {
        array[i].mark=parseInt(array[i].mark)
      }

      const resp = await api.post("/form/submit", { data: array });
      if (resp.status === 200) {
        router.go(0);
      }
    };

    return {
      getStudentForm,
      searchText,
      courseList,
      formItemObj,
      lang,
      onSearch,
      onClickItem,
      onType,
      sumNumberOfUnit,
      onSubmit,

      form,
      hasSendForm,
      getFormItem,
      formDataLoaded,
      semesterList,

      onDbClickItemName,
      onDbClickItemCode,
    };
  },
};
</script>

<style scoped>
.txt {
  margin: 0 4px;
}
</style>
