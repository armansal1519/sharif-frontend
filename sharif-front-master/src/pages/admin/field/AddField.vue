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
      v-model="addInfoFa"
      label="اطلاعات اضافی فارسی"
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
      v-model="addInfoEn"
      label="اطلاعات اضافی انگلیسی"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="shortName"
      label="حروف اختصار انگلیسی (مانند cs یرای رشته کامپیوتر)"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      type="number"

      v-model="fromYear"
      label="از سال(1300 تا 1500)"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      type="number"
      v-model="toYear"
      label="تا سال(1300 تا 1500)"
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
    const addInfoFa=ref("")
    const enName = ref("");
    const addInfoEn =ref("")
    const shortName = ref("");
    const fromYear=ref("")
    const toYear =ref("")

    const onSubmit = async () => {
      if (faName.value === "") return;
      if (enName.value === "") return;
      if (shortName.value === "") return;
      if (fromYear.value>1500 || fromYear.value<1300)return
      if (toYear.value>1500 || toYear.value<1300)return

      const resp = await api.post("/field", {
        farsi_name: faName.value,
        add_info_farsi:addInfoFa.value,
        english_name: enName.value,
        add_info_english:addInfoEn.value,
        value: shortName.value,
        from_year:parseInt(fromYear.value),
        to_year:parseInt(toYear.value)
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
        fromYear.value=0
        toYear.value=0
      }
    };

    return {
      faName,
      addInfoFa,
      enName,
      addInfoEn,
      shortName,
      fromYear,
      toYear,
      onSubmit,
    };
  },
};
</script>

<style scoped></style>
