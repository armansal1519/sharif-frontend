<template>
  <div style="padding: 16px">
    <h2>وضعیت فرم</h2>
    <div v-if="hasSendForm">
      <!--      <form-status v-if="formData" :form-status="formData.formStatuses" />-->


      <form-status-for-student
        v-if="formData"
        :form-status="formData.formStatuses"
        :current-index="getCurrentIndex(formData.formStatuses)"
        :is-error="getIsError(formData.formStatuses)"
        :error-index="getErrorIndex(formData.formStatuses)"
      />
    </div>
    <div v-else>
      <h3>شما هنوز فرمی ارسال نکرده اید</h3>
    </div>
  </div>
</template>

<script>
import { useStudentStore } from "stores/student";
import { useLangStore } from "stores/lang";
import { storeToRefs } from "pinia/dist/pinia";
import FormStatusForStudent from "components/FormStatusForStudent";

export default {
  name: "HomePage",
  components: { FormStatusForStudent },

  setup() {
    const store = useStudentStore();
    const langStore = useLangStore();

    const { getIsAuth, student, hasSendForm, formData } = storeToRefs(store);
    const { lang, getMenu } = storeToRefs(langStore);

    const getCurrentIndex = (fs) => {
      console.log('from index', fs)
      for (let i = 0; i < fs.length; i++) {
        console.log(fs[i].is_seen_by_area_manger)
        if (!fs[i].is_seen_by_area_manger) {
          if (i===0)return i
          else return i - 1
        }


      }

    };

    const getIsError = (fs) => {
      for (let i = 0; i < fs.length; i++) {
        if (fs[i].have_problem) return true;
      }
      return false;
    };

    const getErrorIndex = (fs) => {
      for (let i = 0; i < fs.length; i++) {
        if (fs[i].have_problem) return i;
      }
      return -1
    };

    return {
      hasSendForm,
      formData,
      getCurrentIndex,
      getIsError,
      getErrorIndex,
    };
  },
};
</script>

<style scoped></style>
