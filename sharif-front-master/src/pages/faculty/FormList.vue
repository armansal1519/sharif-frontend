<template>
  <div v-if="formList.length > 0" style="padding: 16px">
    <q-card
      @click="onClick(form.form.ID)"
      v-for="form in formList"
      :key="form.form.ID"
      style="
        display: flex;
        justify-content: right;
        align-items: center;
        margin: 24px 0;
        height: 48px;
        padding: 0 16px;
      "
    >
      <div style="min-width: 200px">
        {{ form.student.first_name }} {{ form.student.last_name }}
      </div>
      <div style="min-width: 200px">
        {{ fieldItems[form.student.field] }}
      </div>
    </q-card>
  </div>
  <div v-else>
    <h2>فرمی برای شما ارسال نشده</h2>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "boot/facultyAxios";
import { useRouter } from "vue-router";

export default {
  name: "FormList",
  setup() {
    const router = useRouter();

    const formList = ref([]);

    const getFormList = async () => {
      const resp = await api.get("/form/pos");
      if (resp.status === 200) {
        formList.value = resp.data;
        console.log(resp.data);
      }
    };

    const onClick = (id) => {
      router.push(`/faculty/form/${id}`);
    };

    onMounted(async () => {
      await getFormList();
    });

    return {
      fieldItems: {
        cs: "مهندسی کامپیوتر",
        ce: "مهندسی عمران",
        me: "مهندسی مکانیک",
        ie: "مهندسی صتایع",
        ae: "مهندسی هوافضا",
      },
      formList,
      onClick,
    };
  },
};
</script>

<style scoped></style>
