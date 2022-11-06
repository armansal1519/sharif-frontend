<template>
  <div style="padding: 24px 16px">
    <div v-for="d in data" :key="d.ID">
      <q-card
        style="
          width: 90%;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        "
      >
        <div>{{ d.full_name }}</div>
        <div>{{ d.phone_number }}</div>
        <div>{{ d.code }}</div>
        <div>{{ d.aoa_id }}</div>

        <div>
          <q-btn
            flat
            round
            color="red"
            @click="persistent = true"
            icon="delete"
          ></q-btn>
          <q-btn
            flat
            round
            color="accent"
            @click="editDialog = true"
            icon="edit"
          ></q-btn>
        </div>
      </q-card>
    </div>
  </div>
  <q-dialog
    v-model="persistent"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 300px">
      <q-card-section>
        <div class="text-h6">حذف {{ course.name }}</div>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="red" label="انصراف" v-close-popup />
        <q-btn flat color="primary" label="تایید" @click="onDelete" />
      </q-card-actions>
    </q-card>
  </q-dialog>

  <q-dialog
    v-model="editDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <q-card style="width: 600px; padding: 16px">
      <q-card-section>
        <div class="text-h6">ویرایش {{ course.name }}</div>
      </q-card-section>
      <q-input
        outlined
        style="padding: 4px"
        v-model="editDialogData.name"
        label=""
      />
      <q-input
        outlined
        style="padding: 4px"
        v-model="editDialogData.latin_name"
        label=""
      />
      <q-input
        outlined
        style="padding: 4px"
        v-model="editDialogData.code"
        label=""
      />
      <q-input
        outlined
        style="padding: 4px"
        v-model="editDialogData.degree"
        label=""
      />
      <!--      <q-input outlined style="padding: 4px" v-model="editDialogData.field" label=""/>-->
      <q-input
        outlined
        style="padding: 4px"
        v-model="editDialogData.vahed"
        label=""
      />

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat color="red" label="انصراف" v-close-popup />
        <q-btn flat color="primary" label="تایید" @click="onEdit" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "boot/adminAxios";

export default {
  name: "IndexPage",
  setup(props, context) {
    const data = ref([]);
    const persistent = ref(false);
    const editDialog = ref(false);
    const editDialogData = ref({});

    const onDelete = async () => {
      persistent.value = false;
      console.log(props.course.ID);
      const resp = await api.delete(`/form-item/${props.course.ID}`);
      if (resp.status === 200) {
        console.log("ok");

        context.emit("delete");
      }
    };

    const onEdit = async () => {
      editDialog.value = false;
      console.log(props.course.ID);
      const resp = await api.put(
        `/form-item/${props.course.ID}`,
        editDialogData.value
      );
      if (resp.status === 200) {
        console.log("ok");

        context.emit("delete");
      }
    };

    onMounted(async () => {
      await getFaculties();
    });

    const getFaculties = async () => {
      const resp = await api.get("/faculty");
      if (resp.status === 200) {
        data.value = resp.data;
        console.log(resp.data);
      }
    };

    return {
      data,
      persistent,
      editDialog,
      editDialogData,
      onDelete,
      onEdit,
    };
  },
};
</script>

<style scoped></style>
