<template>
  <show-form v-if="isLoaded" :form="form"> </show-form>
  <div style="display: flex; flex-direction: column; margin: 12px">

    <div style="margin: 12px">
      <q-btn
        @click="sendMsgDialog=true"
        label="ارسال پیام"
        color="primary"
      ></q-btn>
    </div>

    <div>


      <q-checkbox
        :disable="isFormNotOk"
        size="md"
        v-model="isFormOk"
        label="فرم مشکلی ندارد"
        color="green"
      />
    </div>
    <div>
      <q-checkbox
        :disable="isFormOk"
        size="md"
        v-model="isFormNotOk"
        label="فرم مشکل دارد"
        color="red"
      />
    </div>
    <div style="margin: 12px">
      <q-btn
        @click="onIsOk"
        v-if="isFormOk"
        label="ارسال برای مرحله بعدی"
        color="primary"
      ></q-btn>
      <div v-if="isFormNotOk">
        <q-input v-model="formProblem" label="مشکل را توضیح دهید" outlined />
        <q-checkbox
          v-if="aoa.send_to_student"
          :disable="toAdministration"
          size="md"
          v-model="toStudent"
          label="ارسال برای دانشچو "
        />
        <q-checkbox
          v-if="aoa.send_to_administration"
          :disable="toStudent"
          size="md"
          v-model="toAdministration"
          label="ارسال برای آموزش"
        />
        <div style="margin: 24px 0">
          <q-btn
            @click="onIsNotOk"
            v-if="formProblem !== '' && (toStudent || toAdministration)"
            label="اجرا"
            color="primary"
          ></q-btn>
        </div>
      </div>
    </div>
    <q-dialog v-model="sendMsgDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"> ارسال پیام برای {{data.student.first_name}} {{data.student.last_name}} </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input  v-model="msgTitle" autofocus label="عنوان" />
          <q-input  v-model="msgTxt" type="textarea"  autofocus label="متن" />
        </q-card-section>

        <q-card-actions align="left" class="text-primary">
          <q-btn flat color="red" label="لغو" v-close-popup />
          <q-btn @click="sendMsg" color="primary" label="ارسال"  />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { api } from "boot/facultyAxios";
import ShowForm from "components/ShowForm";
import { useFacultyStore } from "stores/faculty";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: "FormPage",
  components: { ShowForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useFacultyStore();

    const { faculty, aoa } = storeToRefs(store);

    const data = ref(null);
    const form = ref({});
    const isLoaded = ref(false);

    const isFormOk = ref(false);
    const isFormNotOk = ref(false);
    const formProblem = ref("");
    const toStudent = ref(false);
    const toAdministration = ref(false);

    const sendMsgDialog =ref(false)
    const msgTitle =ref("")
    const msgTxt =ref("")

    const getForm = async () => {
      const resp = await api.get(`/form/faculty/${route.params.id}`);
      if (resp.status === 200) {
        data.value = resp.data;
        for (let i = 0; i < resp.data.formItems.length; i++) {
          if (form.value.hasOwnProperty(resp.data.formItems[i].group_name)) {
            form.value[resp.data.formItems[i].group_name].push(
              resp.data.formItems[i]
            );
          } else {
            form.value[resp.data.formItems[i].group_name] = [
              resp.data.formItems[i],
            ];
          }
        }

        console.log(form.value);
        isLoaded.value = true;
      }
    };

    const onIsOk = async () => {
      const payload = {
        is_ok: true,
        action: "",
        problem_desc: "",
      };
      await sendRequest(payload);
    };
    const onIsNotOk = async () => {
      let action = "";
      if (toAdministration.value) action = "to_administration";
      else if (toStudent.value) action = "to_student";

      const payload = {
        is_ok: false,
        action: action,
        problem_desc: formProblem.value,
      };
      await sendRequest(payload);
    };

    const sendRequest = async (payload) => {
      const resp = await api.patch(
        `/form/form-status/${data.value.form.ID}`,
        payload
      );
      console.log(resp);
      if (resp.status === 200) {
        await router.push("/faculty/form-list");
      }
    };

    const sendMsg = async () => {
      if (msgTxt.value==="")return
      if (msgTitle.value==="")return

      console.log("in send msg")

      const resp =await api.post('/msg',{
        receiver_id: `${data.value.student.ID}`,
        title: msgTitle.value,
        text: msgTxt.value,
      })
      if (resp.status===200){

        console.log(resp)
        sendMsgDialog.value=false
      }
    }

    onMounted(async () => {
      await getForm();
    });

    return {
      faculty,
      aoa,
      route,
      data,
      form,
      isLoaded,
      isFormOk,
      isFormNotOk,
      formProblem,
      toStudent,
      toAdministration,

      sendMsgDialog,
      msgTitle,
      msgTxt,


      onIsOk,
      onIsNotOk,
      sendMsg
    };
  },
};
</script>

<style scoped></style>
