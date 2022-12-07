<template>
  <show-form v-if="isLoaded" :form="form"> </show-form>
  <div style="display: flex; flex-direction: column; margin: 12px">

    <div style="display: flex;">

      <div style="margin: 12px">
        <q-btn
          @click="okDialog=true"
          label="فرم مشکلی ندارد"
          color="green"
        ></q-btn>
      </div>
      <div style="margin: 12px">
        <q-btn
          @click="notOkDialog=true"
          label="فرم مشکل دارد"
          color="red"
        ></q-btn>
      </div>
      <div style="margin: 12px">
        <q-btn
          @click="sendMsgDialog=true"
          label="ارسال پیام"
          color="primary"
        ></q-btn>
      </div>
    </div>

    <div>
      <div style="font-size: 20px;padding: 16px;margin-top: 24px">
        پیام های ارسال شده برای این فرم
      </div>
      <div v-if="msgForThisForm.length > 0" style="padding: 8px">
        <q-card
          v-for="msg in msgForThisForm"
          :key="msg.ID"
          style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 6px 0;
        height: 48px;
        padding: 0 16px;
      "
        >
          <div style="min-width: 200px">
            {{ msg.receiver_name }}
          </div>
          <div style="min-width: 200px">
            {{ msg.title }}
          </div>

          <div style="min-width: 200px">
            {{ msg.text }}
          </div>
          <div style="min-width: 100px">

            <q-icon v-if="msg.is_seen" size="1.8rem" name="done_all"/>

            <q-icon v-else size="1.8rem" name="done"/>

          </div>


        </q-card>
      </div>
    </div>

<!--    <div>-->


<!--      <q-checkbox-->
<!--        :disable="isFormNotOk"-->
<!--        size="md"-->
<!--        v-model="isFormOk"-->
<!--        label="فرم مشکلی ندارد"-->
<!--        color="green"-->
<!--      />-->
<!--    </div>-->
<!--    <div>-->
<!--      <q-checkbox-->
<!--        :disable="isFormOk"-->
<!--        size="md"-->
<!--        v-model="isFormNotOk"-->
<!--        label="فرم مشکل دارد"-->
<!--        color="red"-->
<!--      />-->
<!--    </div>-->
<!--    <div style="margin: 12px">-->
<!--      <q-btn-->
<!--        @click="onIsOk"-->
<!--        v-if="isFormOk"-->
<!--        label="ارسال برای مرحله بعدی"-->
<!--        color="primary"-->
<!--      ></q-btn>-->
<!--      <div v-if="isFormNotOk">-->
<!--        <q-input v-model="formProblem" label="مشکل را توضیح دهید" outlined />-->
<!--        <q-checkbox-->
<!--          v-if="aoa.send_to_student"-->
<!--          :disable="toAdministration"-->
<!--          size="md"-->
<!--          v-model="toStudent"-->
<!--          label="ارسال برای دانشچو "-->
<!--        />-->
<!--        <q-checkbox-->
<!--          v-if="aoa.send_to_administration"-->
<!--          :disable="toStudent"-->
<!--          size="md"-->
<!--          v-model="toAdministration"-->
<!--          label="ارسال برای آموزش"-->
<!--        />-->
<!--        <div style="margin: 24px 0">-->
<!--          <q-btn-->
<!--            @click="onIsNotOk"-->
<!--            v-if="formProblem !== '' && (toStudent || toAdministration)"-->
<!--            label="اجرا"-->
<!--            color="primary"-->
<!--          ></q-btn>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
    <q-dialog v-model="sendMsgDialog" persistent>
      <q-card style="min-width: 450px">
        <q-card-section>
          <div class="text-h6"> ارسال پیام برای {{data.student.first_name}} {{data.student.last_name}} </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input  v-model="msgTitle" autofocus label="عنوان" />
          <q-input  style="margin-top: 12px" v-model="msgTxt" type="textarea"  outlined autofocus label="متن" />
        </q-card-section>

        <q-card-actions align="left" class="text-primary">
          <q-btn flat color="red" label="لغو" v-close-popup />
          <q-btn @click="sendMsg" color="primary" label="ارسال"  />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="okDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"> تایید فرم و ارسال برای حوضه فعالیتی بعدی </div>
        </q-card-section>

        <q-card-actions align="left" class="text-primary">
          <q-btn flat color="red" label="لغو" v-close-popup />
          <q-btn @click="onIsOk" color="primary" label="ارسال"  />
        </q-card-actions>
      </q-card>
    </q-dialog>


    <q-dialog v-model="notOkDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6"> ارسال پیام برای {{data.student.first_name}} {{data.student.last_name}} </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input v-model="formProblem" type="textarea"  label="مشکل را توضیح دهید" outlined />
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
<!--          <div style="margin: 24px 0">-->
<!--            <q-btn-->
<!--              @click="onIsNotOk"-->
<!--              v-if="formProblem !== '' && (toStudent || toAdministration)"-->
<!--              label="اجرا"-->
<!--              color="primary"-->
<!--            ></q-btn>-->
<!--            </div>-->
        </q-card-section>

        <q-card-actions align="left" class="text-primary">
          <q-btn flat color="red" label="لغو" v-close-popup />
          <q-btn :disable="!(formProblem !== '' && (toStudent || toAdministration))" @click="onIsNotOk" color="primary" label="ارسال"  />
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
import {useQuasar} from "quasar";

export default {
  name: "FormPage",
  components: { ShowForm },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const $q = useQuasar();

    const store = useFacultyStore();

    const { faculty, aoa } = storeToRefs(store);

    const data = ref(null);
    const form = ref({});
    const isLoaded = ref(false);

    const okDialog=ref(false)


    const notOkDialog = ref(false);
    const formProblem = ref("");
    const toStudent = ref(false);
    const toAdministration = ref(false);

    const sendMsgDialog =ref(false)
    const msgTitle =ref("")
    const msgTxt =ref("")

    const msgForThisForm=ref([])


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

    const getMsgForThisForm = async () => {
      const resp=await api.get(`/msg/faculty/${route.params.id}`)
      if (resp.status===200){
        msgForThisForm.value=resp.data
        console.log(msgForThisForm.value)
      }

    }

    // const onIsOk = async () => {
    //   const payload = {
    //     is_ok: true,
    //     action: "",
    //     problem_desc: "",
    //   };
    //   await sendRequest(payload);
    // };
    const onIsOk = async () => {
     try {
       const resp=await api.post(`/form-action/send-next/${data.value.form.ID}`)

       if (resp.status === 200) {
         $q.notify({
           color: "green-4",
           textColor: "white",
           icon: "cloud_done",
           message: "فرم با موفقیت به مرحله بعدی رفت",
         });
         await router.push("/faculty/form-list");
       }
     }catch (e) {
       console.log(e)
     }
    };
    // const onIsNotOk = async () => {
    //   let action = "";
    //   if (toAdministration.value) action = "to_administration";
    //   else if (toStudent.value) action = "to_student";
    //
    //   const payload = {
    //     is_ok: false,
    //     action: action,
    //     problem_desc: formProblem.value,
    //   };
    //   await sendRequest(payload);
    // };
    const onIsNotOk = async () => {
      let action = "";
      if (toAdministration.value) {
        const resp=await api.post(`/form-action/send-to-administration/${data.value.form.ID}`,{
          problem_desc:formProblem.value
        })
        if (resp.status === 200) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "فرم با موفقیت برای آموزش فرستاده شد",
          });
          await router.push("/faculty/form-list");
          }
      } else if (toStudent.value) {
        const resp=await api.post(`/form-action/send-to-student/${data.value.form.ID}`,{
          problem_desc:formProblem.value
        })
        if (resp.status === 200) {
          $q.notify({
            color: "green-4",
            textColor: "white",
            icon: "cloud_done",
            message: "فرم با موفقیت برای دانشجو فرستاده شد",
          });
          await router.push("/faculty/form-list");
        }
      };
      //
    };

    // const sendRequest = async (payload) => {
    //   const resp = await api.patch(
    //     `/form/form-status/${data.value.form.ID}`,
    //     payload
    //   );
    //   console.log(resp);
    //   if (resp.status === 200) {
    //     await router.push("/faculty/form-list");
    //   }
    // };

    const sendMsg = async () => {
      if (msgTxt.value==="")return
      if (msgTitle.value==="")return

      console.log("in send msg")

      const resp =await api.post('/msg',{
        receiver_id: `${data.value.student.ID}`,
        title: msgTitle.value,
        text: msgTxt.value,
        form_id:route.params.id
      })
      if (resp.status===200){

        console.log(resp)
        sendMsgDialog.value=false
      }
    }

    onMounted(async () => {
      await getForm();
      await getMsgForThisForm()
    });

    return {
      faculty,
      aoa,
      route,
      data,
      form,
      isLoaded,
      okDialog,
      notOkDialog,
      formProblem,
      toStudent,
      toAdministration,

      sendMsgDialog,
      msgTitle,
      msgTxt,
      msgForThisForm,


      onIsOk,
      onIsNotOk,
      sendMsg
    };
  },
};
</script>

<style scoped></style>
