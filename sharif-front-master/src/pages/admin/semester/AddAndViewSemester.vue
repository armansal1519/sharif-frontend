<template>
  <div style="padding: 16px; width: 90%; display: flex; flex-direction: column">
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="faName"
      label="نام نیمسال (مانند 13971)"
    />


    <q-btn
      @click="onSubmit"
      style="width: 120px; margin-top: 24px"
      color="primary"
      label="ارسال"
    />


    <div style="margin: 64px 0" v-if="semesterNames.length">
      <q-chip style="margin: 0 0 0 16px" v-for="name in semesterNames" square  removable :key="name" @remove="onRemove(name)">
        {{ name }}
      </q-chip>
    </div>
  </div>
</template>

<script>
import { ref,onMounted } from "vue";
import { api } from "boot/adminAxios";
import { useQuasar } from "quasar";

export default {
  name: "AddSemester",
  setup() {
    const $q = useQuasar();

    const faName = ref("");
    const data = ref([]);
    const semesterNames=ref([])

    onMounted(async () => {
      console.log("on maounted")
      await getData();
    });

    const getData = async () => {
      const resp = await api.get("semester");
      if (resp.status === 200) {
        data.value = resp.data;
        semesterNames.value=resp.data.map(item=>item.name)

        console.log(semesterNames.value)
      }
    };

    const onRemove =async (name) => {
      const semester=data.value.find(item=>{
        return  item.name===name
      })
      console.log(semester)

      const resp = await api.delete(`/semester/${semester.ID}`);
      if (resp.status === 200) {
        semesterNames.value=resp.data.map(item=>item.name)



        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "نیمسال با موفقیت حذف شد",
        });

        faName.value = "";

      }    }


    const onSubmit = async () => {
      if (faName.value === "") return;

      const resp = await api.post("/semester", {
       name: faName.value,
      });
      if (resp.status === 200) {
        semesterNames.value=resp.data.map(item=>item.name)



        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "نیمسال با موفقیت ثبت شد",
        });

        faName.value = "";

      }
    };

    return {
      faName,
      semesterNames,
      onSubmit,
      onRemove
    };
  },
};
</script>

<style scoped></style>
