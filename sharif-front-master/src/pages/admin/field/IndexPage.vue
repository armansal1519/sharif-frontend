<template>
  <div style="padding: 24px">
    <q-card
      style="
        width: 90%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        padding: 8px;
        margin: 16px 0;
      "
      v-for="d in data"
      :key="d.ID"
    >
      <div style="display: flex; align-items: center;justify-content: space-around;width: 100%" >
        <div class="field">{{ d.farsi_name }}</div>
        <div class="field">{{ d.english_name }}</div>
        <div class="field">{{ d.value }}</div>
        <q-btn
          flat
          round
          color="red"
          @click="onDialog(d.farsi_name, d.ID)"
          icon="delete"
        ></q-btn>
      </div>


    </q-card>

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card style="width: 300px">
        <q-card-section>
          <div class="text-h6">حذف {{ deletedName }}</div>
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat color="red" label="انصراف" v-close-popup />
          <q-btn flat color="primary" label="تایید" @click="onDelete" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "boot/adminAxios";
import { useQuasar } from "quasar";

export default {
  name: "IndexPage",
  setup() {
    const $q = useQuasar();
    const data = ref([]);
    const persistent = ref(false);
    const deletedName = ref("");
    const deletedId = ref("");

    onMounted(async () => {
      await getData();
    });

    const getData = async () => {
      const resp = await api.get("field");
      if (resp.status === 200) {
        data.value = resp.data;
        console.log("fields",resp.data)
      }
    };

    const onDialog = (name, id) => {
      persistent.value = true;
      deletedName.value = name;
      deletedId.value = id;
    };

    const onDelete = async () => {
      const resp = await api.delete(`field/${deletedId.value}`);
      if (resp.status === 200) {
        persistent.value = false;
        deletedName.value = "";
        deletedId.value = "";
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "رشته با موفقیت حدف شد",
        });
        await getData();
      }
    };

    return {
      data,
      persistent,
      deletedName,
      onDelete,
      onDialog,
    };
  },
};
</script>

<style scoped>
.field {
  width: 100px;
}
</style>
