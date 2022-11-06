<template>
  <h1>student page</h1>

  <div
    style="
      display: flex;
      align-items: center;
      flex-direction: column;
      padding: 16px;
    "
  >
    <div>{{ student }}</div>
    <div>{{ form }}</div>

    <div style="width: 90%" v-if="form_status.length > 0">
      <FormStatus :form-status="form_status" />
    </div>
    <div style="width: 90%" v-if="getFormItem(form_items)">
      <show-form :form="getFormItem(form_items)" />
    </div>
  </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useQuasar } from "quasar";
import { onMounted, ref } from "vue";
import ShowForm from "components/ShowForm";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { api } from "boot/adminAxios";
import FormStatus from "components/FormStatus";

export default {
  name: "StudentPage",
  components: {
    FormStatus,
    ShowForm,
  },

  setup() {
    const route = useRoute();
    const $q = useQuasar();

    const form_items = ref([]);
    const form = ref(null);
    const student = ref(null);
    const form_status = ref([]);

    const getStudent = async () => {
      const resp = await api.get(`/student/${route.params.id}`);
      if (resp.status === 200) {
        form_items.value = resp.data.formItems;
        form.value = resp.data.form;
        form_status.value = resp.data.formStatuses;
        student.value = resp.data.student;
      }
    };

    const getFormItem = (formData) => {
      if (formData.length === 0) return false;
      let data = formData;
      let res = {};
      for (let i = 0; i < data.length; i++) {
        if (res.hasOwnProperty(data[i].group_name)) {
          res[data[i].group_name].push(data[i]);
        } else {
          res[data[i].group_name] = [data[i]];
        }
      }
      return res;
    };

    onMounted(async () => {
      await getStudent();
    });

    return {
      student,
      form_items,
      form_status,
      form,
      getFormItem,
    };
  },
};
</script>

<style scoped></style>
