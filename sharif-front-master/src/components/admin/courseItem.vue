<template>
  <q-card
    style="
      width: 98%;
      min-height: 64px;
      margin: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      padding: 0 24px;
    "
  >
    <div
      style="
        display: flex;
        justify-content: right;
        align-items: center;
        flex-wrap: wrap;
      "
    >
      <div style="width: 30px">{{ index + 1 }}</div>
      <div style="width: 300px">{{ course.name }}</div>
      <div style="width: 300px">{{ course.latin_name }}</div>
      <div style="width: 100px">{{ course.code }}</div>
      <div style="width: 30px">{{ course.vahed }}</div>
      <div style="width: 300px">{{ course.group_name }}</div>
      <div style="width: 150px">{{ fieldTranslate[course.field] }}</div>
      <div style="width: 150px">{{ course.degree }}</div>
    </div>

    <div>
      <q-btn
        v-if="del"
        flat
        round
        color="red"
        @click="persistent = true"
        icon="delete"
      ></q-btn>
      <q-btn
        v-if="edit"
        flat
        round
        color="accent"
        @click="editDialog = true"
        icon="edit"
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
import { ref } from "vue";
import { api } from "boot/adminAxios";

export default {
  name: "courseItem",
  props: {
    course: Object,
    index: Number,
    edit: Boolean,
    del: Boolean,
    // id:Number
  },
  emits: ["delete"],
  setup(props, context) {
    const fieldTranslate = {
      cs: "مهندسی کامپیوتر",
      ce: "مهندسی عمران",
      me: "مهندسی مکانیک",
      ie: "مهندسی صتایع",
      ae: "مهندسی هوافضا",
    };

    const persistent = ref(false);
    const editDialog = ref(false);
    const editDialogData = ref({
      code: props.course.code,
      name: props.course.name,
      latin_name: props.course.latin_name,
      field: props.course.field,
      degree: props.course.degree,
      vahed: props.course.vahed,
    });

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

    return {
      fieldTranslate,
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
