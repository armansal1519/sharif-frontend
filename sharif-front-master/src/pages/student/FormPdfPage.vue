<template>
<form-pdf field="مهندسی مکانیک"
  last-name="صالحی"
  first-name="آرمان"
          student-number="97150023"
          :form-summery="formSummery"
          :form-avg="formAvg"
          total-avg="19"


/>

</template>

<!--<script>-->
<!--export default {-->
<!--  name: "FormPdfPage"-->
<!--}-->
<!--</script>-->
<script>



import FormPdf from "components/FormPdf";
import {ref} from "vue";
export default {
  components: {FormPdf},
  setup(){
    const formSummery=ref([
      {
        student_count: 3,
        group_count: 21,
        group_name: "دروس اجباری"
      },
      {
        student_count: 3,
        group_count: 25,
        group_name: "دروس تخصصی"
      },
      {
        student_count: 3,
        group_count: 25,
        group_name: "دروس تخصصی"
      },
      {
        student_count: 3,
        group_count: 25,
        group_name: "دروس تخصصی"
      },
      {
        student_count: 3,
        group_count: 25,
        group_name: "دروس تخصصی"
      },
      {
        student_count: 3,
        group_count: 25,
        group_name: "دروس تخصصی"
      }
    ])
    const formAvg=ref({
      1397: {
        t_1: 0,
        t_2: 12,
        t_3: 17.5
      },
      1398: {
        t_1: 12,
        t_2: 0,
        t_3: 0
      },
      1399: {
        t_1: 0,
        t_2: 0,
        t_3: 0
      },
      1400: {
        t_1: 0,
        t_2: 0,
        t_3: 0
      },
      1401: {
        t_1: 0,
        t_2: 0,
        t_3: 0
      },
      1402: {
        t_1: 0,
        t_2: 0,
        t_3: 0
      }
    })

    return{
      formSummery,
      formAvg
    }
  }
}
</script>

<style scoped>

</style>
