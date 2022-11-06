<template>
  <div style="padding: 16px; width: 90%; display: flex; flex-direction: column">
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="faName"
      label="نام فارسی"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="enName"
      label="نام انگلیسی"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="shortName"
      label="حروف اختصار انگلیسی (مانند cs یرای رشته کامپیوتر)"
    />

    <q-btn
      @click="onSubmit"
      style="width: 120px; margin-top: 24px"
      color="primary"
      label="ارسال"
    />
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/adminAxios";
import { useQuasar } from "quasar";

export default {
  name: "AddField",
  setup() {
    const $q = useQuasar();

    const faName = ref("");
    const enName = ref("");
    const shortName = ref("");

    const onSubmit = async () => {
      if (faName.value === "") return;
      if (enName.value === "") return;
      if (shortName.value === "") return;

      const resp = await api.post("/field", {
        farsi_name: faName.value,
        english_name: enName.value,
        value: shortName.value,
      });
      if (resp.status === 200) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "رشته با موفقیت ثبت شد",
        });

        faName.value = "";
        enName.value = "";
        shortName.value = "";
      }
    };

    return {
      faName,
      enName,
      shortName,
      onSubmit,
    };
  },
};
</script>

<style scoped></style>
