<template>
  <div style="padding: 24px">
    <q-card
      flat
      style="
        height: 48px;
        width: 90%;
        margin: 24px 12px;
        display: flex;
        justify-content: right;
        align-items: center;
      "
    >
      <div class="aoa-item">اسم</div>

      <div class="aoa-item">موقعیت</div>

      <div class="aoa-item">توانایی نوشتن</div>
      <div class="aoa-item">توانایی ویرایش</div>
    </q-card>
    <q-card
      flat
      style="
        height: 48px;
        width: 90%;
        margin: 24px 12px;
        display: flex;
        justify-content: right;
        align-items: center;
      "
      v-for="d in data"
      :key="d.ID"
    >
      <div class="aoa-item">{{ d.name }}</div>

      <div class="aoa-item">{{ d.position }}</div>

      <q-checkbox class="aoa-item" disable v-model="d.write_access" />
      <q-checkbox class="aoa-item" disable v-model="d.edit_access" />
    </q-card>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "boot/adminAxios";

export default {
  name: "IndexPage",
  setup() {
    const data = ref([]);

    onMounted(async () => {
      await getAOA();
    });

    const getAOA = async () => {
      const resp = await api.get("/aoa");
      if (resp.status === 200) {
        data.value = resp.data;
      }
    };

    return {
      data,
    };
  },
};
</script>

<style scoped>
.aoa-item {
  width: 200px;
}
</style>
