<template>
  <div style="padding: 16px; width: 90%; display: flex; flex-direction: column">

    <q-input
      style="margin: 6px 0"
      outlined
      v-model="fullName"
      label="نام کامل"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="code"
      label="کد یوزر"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="password"
      label="رمز عبور"
    />
    <q-input
      style="margin: 6px 0"
      outlined
      v-model="phoneNumber"
      label="شماره تلفن"
    />
    <q-select
      style="width: 300px; margin: 16px"
      outlined
      v-model="selectedAoa"
      :options="aoasNames"
      label="حوضه فعالیت را انتخاب کنید"
      emit-value
      map-options
    />
    <div style="display: flex" >
      <q-select
        style="width: 300px; margin: 16px"
        outlined
        v-model="filed"
        :options="getFields"
        label="رشته را انتخاب کنید"
        multiple
        emit-value
        map-options
      />
      <q-checkbox v-model="allFields" label="همه ی رشته ها " />
    </div>

    <q-btn
      @click="onSubmit"
      style="width: 120px; margin-top: 24px"
      color="primary"
      label="ارسال"
    />
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import {api} from "boot/adminAxios";
import {useFieldStore} from "stores/field";
import {storeToRefs} from "pinia/dist/pinia";
import {useQuasar} from "quasar";

export default {
  name: "AddFaculty",

  setup(){
    const $q = useQuasar();

    const aoas=ref([])
    const aoasNames=ref([])
    const selectedAoa=ref()
    const fullName=ref("")
    const code=ref("")
    const password=ref("")
    const phoneNumber=ref("")

    const fieldStore=useFieldStore()



    const filed = ref([]);
    const { getFields }=storeToRefs(fieldStore)
    const allFields=ref(false)



    onMounted(async ()=>{
      const resp = await api.get('/aoa');
      if (resp.status === 200) {
        aoas.value = resp.data
        aoasNames.value = resp.data.map(item=>item.name);

      }
    })

    const onSubmit = async () => {
      if (fullName.value === "") return;
      if (code.value === "") return;
      if (password.value === "") return;
      if (selectedAoa.value.length===0) return
      if (filed.value.length===0 && allFields.value===false)return

      let related_field_arr=[];
      if (allFields.value){
        related_field_arr.push("all")
      }else {
        related_field_arr=filed.value
      }

      const aoa=aoas.value.find(item=>{
        return item.name===selectedAoa.value
      })
      console.log(aoa)

      const resp = await api.post("/faculty/create", {
        full_name: fullName.value,
        code: code.value,
        phone_number: phoneNumber.value,
        password: password.value,
        aoa_id: aoa.ID,
        related_field_arr
      });
      if (resp.status === 200) {
        $q.notify({
          color: "green-4",
          textColor: "white",
          icon: "cloud_done",
          message: "رشته با موفقیت ثبت شد",
        });

        // faName.value = "";
        // enName.value = "";
        // shortName.value = "";
      }
    };

    return{
      aoas,
      aoasNames,
      selectedAoa,
      fullName,
      code,
      password,
      phoneNumber,
      onSubmit,
      getFields,
      filed,
      allFields
    }
  }
};
</script>

<style scoped></style>
