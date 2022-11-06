<template>
  <q-card flat style="width: 95%">
    <div style="display: flex; justify-content: space-between">
      <div style="width: 200px">ترتیب</div>
      <div style="width: 400px">نام</div>
      <div style="width: 400px">فرم توسط حوضه دیده شده است</div>

      <div style="width: 400px">فرم توسط حوضه تایید شده است</div>
      <div style="width: 400px">فرم مشکل داشته</div>
      <div style="width: 400px">توضیح مشکل</div>
      <div style="width: 400px">عمل صورت گرفته</div>
    </div>
    <div v-for="fs in formStatus" :key="fs.ID" style="margin: 12px 0">
      <div style="display: flex; justify-content: center">
        <div style="width: 200px">{{ fs.position }}</div>
        <div style="width: 400px; word-break: break-all">{{ fs.name }}</div>
        <!--      <div style="width: 400px;">{{fs.is_seen_by_area_manger}}</div>-->
        <q-checkbox
          style="width: 400px"
          :model-value="fs.is_seen_by_area_manger"
          disable
        />
        <q-checkbox
          style="width: 400px"
          color="green"
          :model-value="fs.is_form_ok"
          disable
        />
        <!--      <div style="width: 400px;">{{fs.is_form_ok}}</div>-->
        <!--      <div style="width: 400px;">{{fs.have_problem}}</div>-->
        <q-checkbox
          color="red"
          style="width: 400px"
          :model-value="fs.have_problem"
          disable
        />

        <div style="width: 400px; word-break: break-all">
          {{ fs.problem_desc === "" ? "-" : fs.problem_desc }}
        </div>
        <div style="width: 400px">{{ getAction(fs.action) }}</div>
      </div>

      <q-separator />
    </div>
  </q-card>
</template>

<script>
export default {
  name: "FormStatus",
  props: {
    formStatus: Array,
  },
  setup() {
    const getAction = (a) => {
      if (a === "next") return "ارسال به حوضه بعدی";
      else if (a === "to_administration") return "ارسال برای آموزش";
      else if (a === "to_student") return "ارسال برای دانشجو";
      else return "-";
    };
    return {
      getAction,
    };
  },
};
</script>

<style scoped></style>
