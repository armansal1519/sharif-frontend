<template>
  <div style="width: 90%; margin: 16px; display: flex; flex-direction: column">
    <q-input v-model="data.name" label="اسم"></q-input>
    <q-checkbox v-model="data.write_access" label="توانایی نوشتن"></q-checkbox>
    <q-checkbox v-model="data.edit_access" label="توانایی ویرایش"></q-checkbox>
    <q-input type="number" v-model="data.position" label="موقعیت"></q-input>

    <q-btn
      @click="submit"
      color="primary"
      style="width: 80px; margin: 24px 0"
      label="ارسال"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/adminAxios";
import { useQuasar } from "quasar";

export default {
  name: "AddManual",
  setup() {
    const $q = useQuasar();

    const data = ref({
      name: "",
      is_parallel: false,
      write_access: false,
      edit_access: false,
      position: -1,
    });

    const submit = async () => {
      data.value.position = parseInt(data.value.position);
      const resp = await api.post("/aoa", data.value);
      if (resp.status === 200) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "حوضه ی فغالیت ساخته شد",
        });
      }
    };

    return {
      data,
      submit,
    };
  },
};
</script>

<style scoped></style>
