<template>


  <div style="padding: 24px">
    <div v-for="(v, k, i) in form" :key="i" style="margin: 16px 0">
      <q-table
        :title="k"
        :rows="v"
        :columns="columns"
        row-key="name"
        hide-bottom
      />
    </div>
  </div>
</template>

<script>
import FormSummery from "components/FormSummery";
const columns = [
  {
    name: "name",
    label: "درس",
    align: "left",
    field: "name",
  },
  {
    name: "latin_name",
    align: "left",
    label: "نام لاتین",
    field: "latin_name",
  },
  { name: "code", align: "left", label: "کد", field: "code" },
  {
    name: "nameTakenByStudent",
    align: "left",
    label: "نام درس",
    field: "nameTakenByStudent",
  },
  {
    name: "codeTakenByStudent",
    align: "left",
    label: "کد درس",
    field: "codeTakenByStudent",
  },
  { name: "mark", align: "left", label: "نمره", field: "mark" },
  { name: "semester", align: "left", label: "نیمسال", field: "semester" },
  { name: "vahed", align: "left", label: "واحد", field: "vahed" },
  {
    name: "considerations",
    align: "left",
    label: "ملاحظات",
    field: "considerations",
  },
];

export default {
  name: "ShowForm",
  props: {
    form: Object,
  },
  setup() {
    return {
      columns,
    };
  },
};
</script>

<style scoped></style>
