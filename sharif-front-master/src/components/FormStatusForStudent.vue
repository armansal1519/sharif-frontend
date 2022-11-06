<template>
  <div>
    <div v-if="!isError">
      <div v-if="currentIndex === 0 ">
        <q-card
          style="
        height: 200px;
        width: 400px;
        background-color: #88888888;
        display: flex;
        flex-direction: column;
        padding: 16px;
        font-size: 18px;
        justify-content: space-between;
      "
        >
          <div style="color: white;">
            حوضه فعالیت فعلی : {{ formStatus[currentIndex].name }}
            <div v-if="formStatus[currentIndex].is_ok===false">
              وضعیت : در انتظار تایید
            </div>
            <div v-else>
              وضعیت : تایید شده
            </div>

          </div>
          <div style="color: white;">
            حوضه فعالیت بعدی : {{ formStatus[currentIndex+1].name }}
          </div>

        </q-card>

      </div>

      <div v-else-if="currentIndex === formStatus.length - 1 ">length</div>
      <div v-else>
        <q-card
          style="
        height: 200px;
        width: 400px;
        background-color: #00067a88;
        display: flex;
        flex-direction: column;
        padding: 16px;
        font-size: 18px;
        justify-content: space-between;
      "
        >
          <div style="color: white;">
            حوضه فعالیت فعلی : {{ formStatus[currentIndex].name }}
            <div v-if="formStatus[currentIndex].is_ok===false">
               وضعیت : در انتظار تایید
            </div>
            <div v-else>
              وضعیت : تایید شده
            </div>

          </div>
          <div style="color: white;">
            حوضه فعالیت بعدی : {{ formStatus[currentIndex+1].name }}
          </div>

        </q-card>
      </div>
    </div>
    <div v-else>

      <q-card
        style="
        height: 200px;
        width: 400px;
        background-color: #c10015aa;
        display: flex;
        flex-direction: column;
        padding: 16px;
        font-size: 18px;
        justify-content: space-between;
      "
      >
        <div style="color: white;">
          حوضه فعالیت : {{ formStatus[errorIndex].name }}
        </div>
        <div style="color: white;overflow-wrap: break-word;">
          مشکل فرم : {{ formStatus[errorIndex].problem_desc }}
        </div>
        <div style="color: white">
          <div v-if="formStatus[errorIndex].action === 'to_student'">
            برای بازبینی به دانشجو فرستاده شده
          </div>
          <div v-else>به آموزش فرستاده شده</div>
        </div>
      </q-card>
    </div>

  </div>
</template>

<script>
import { onMounted, ref, toRefs, watch } from "vue";

export default {
  name: "FormStatusForStudent",
  props: {
    formStatus: Array,
    currentIndex: Number,
    isError: Boolean,
    errorIndex: Number,
  },
  setup(props) {
    const prevState = ref(null);
    const currentState = ref(null);
    // const nextState=ref({3:4})
    // const currentIndex=ref(-1)

    // const { data } = toRefs(props)

    // onMounted(()=>{
    //   for (let i = 0; i < props; i++) {
    //     if (props[i].is_seen_by_area_manger && i===0){
    //       prevState.value=null
    //       currentState.value=data[i]
    //
    //     }
    //   }
    // })

    const getCurrentState = () => {};

    // watch([...data.value],(current,old)=>{
    //   console.log("form watch",data.value)
    // })

    return {
      prevState,
      currentState,
    };
  },
};
</script>

<style scoped></style>
