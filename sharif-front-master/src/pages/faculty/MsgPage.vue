<template>
  <div v-if="msgList.length > 0" style="padding: 16px">
    <q-card
      v-for="msg in msgList"
      :key="msg.ID"
      style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 24px 0;
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
      <div style="min-width: 200px">

          <q-icon v-if="msg.is_seen" size="1.8rem" name="done_all"/>

          <q-icon v-else size="1.8rem" name="done"/>

      </div>


    </q-card>
  </div>
  <div v-else>
    <h2>شما پیامی ارسال نکردید</h2>
  </div>
</template>


<script>
import {onMounted, ref} from "vue";
import { api } from "boot/facultyAxios";


export default {
  name: "MsgPage",
  setup(){
    const msgList=ref([])


    const getMsgs = async () => {
      const resp= await api.get(`/msg/faculty?offset=0&limit=1000`)
      msgList.value=resp.data
      console.log(resp.data)
    }

    onMounted(async () => {
      await getMsgs();
    });

    return{
      msgList
    }

  }
}
</script>

<style scoped>

</style>
