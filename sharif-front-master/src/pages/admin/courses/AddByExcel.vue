<template>
  <div style="padding: 16px">
    <q-select
      style="width: 300px; margin: 16px"
      outlined
      v-model="filed"
      :options="getFields"
      label="رشته را انتخاب کنید"
      emit-value
      map-options
    />
    <div v-if="filed !== ''" style="padding: 16px">
      <q-file
        v-model="file"
        label="فایل اکسل را انتخاب کنید"
        filled
        outlined
        style="max-width: 300px"
      />
    </div>
    <q-btn label="ارسال" color="primary" @click="submitFile"></q-btn>

    <q-dialog v-model="showPreview" full-height full-width persistent>
      <div style="width: 100%; background-color: white">
        <q-separator />

        <q-card-section class="scroll">
          <course-item
            v-for="(p, i) in previewList"
            :course="p"
            :index="i"
            :del="false"
            :edit="false"
            :key="p.ID"
          ></course-item>
        </q-card-section>

        <q-separator />

        <q-card-actions align="left">
          <q-btn
            flat
            label="انصراف"
            @click="showPreview = false"
            color="primary"
            v-close-popup
          />
          <q-btn
            flat
            label="تایید"
            @click="finalSubmit"
            color="primary"
            v-close-popup
          />
        </q-card-actions>
      </div>
    </q-dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { api } from "boot/adminAxios";
import CourseItem from "components/admin/courseItem";
import {storeToRefs} from "pinia/dist/pinia";
import {useFieldStore} from "stores/field";

export default {
  name: "AddByExcel",
  components: { CourseItem },
  setup() {
    const fieldStore=useFieldStore()



    const filed = ref("");
    const { getFields }=storeToRefs(fieldStore)
    console.log("fields",getFields)
    const file = ref();
    const previewList = ref([]);
    const preview = true;
    const showPreview = ref(false);

    const submitFile = async () => {
      const formData = new FormData();
      formData.append("file", file.value);
      const resp = await api.post(
        `/form-item/excel?field=${filed.value}&preview=${preview}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(resp.data);
      if (resp.status === 200) {
        previewList.value = resp.data.map((item) => {
          return {
            name: item.name,
            latin_name: item.latin_name,

            code: item.code,
            vahed: item.vahed,
            group_name: item.group_name,
            // group_count: item.group_count ,

            field: item.field,
            degree: item.degree,
          };
        });
        showPreview.value = true;
      }
    };
    const finalSubmit = async () => {
      const formData = new FormData();
      formData.append("file", file.value);
      const resp = await api.post(
        `/form-item/excel?field=${filed.value}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (resp.status === 200) {
        console.log("ok");
      }
    };

    return {
      // fieldItems: [
      //   { label: "مهندسی کامپیوتر", value: "cs" },
      //   { label: "مهندسی عمران", value: "ce" },
      //   { label: "مهندسی مکانیک", value: "me" },
      //   { label: "مهندسی صتایع", value: "ie" },
      //   { label: "مهندسی هوافضا", value: "ae" },
      // ],
      getFields,
      filed,
      file,
      submitFile,
      showPreview,
      previewList,
      finalSubmit,
    };
  },
};
</script>

<style scoped></style>
