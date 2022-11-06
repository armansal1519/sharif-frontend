<template>
  <div style="padding: 24px">
<!--    <div v-for="(v, i) in form" :key="i" style="margin: 16px 0">-->
      <q-table
        :title="''"
        :rows="form"
        :columns="columns"
        row-key="name"
        hide-bottom
      />
<!--    </div>-->
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

const columns = [
  {
    name: "number",
    label: "ردیف",
    align: "left",
    field: "number",
  },
  {
    name: "group_name",
    align: "left",
    label: "واحد لازم",
    field: "group_name",
  },
  {
    name: "group_count",
    align: "left",
    label: "واحد",
    field: "group_count",
  },
  {
    name: "student_count",
    align: "left",
    label: "واحد اخذ شده",
    field: "student_count",
  }


];

export default {
  name: "FormSummery",
  // props: {
  //   form: Object,
  // },
  setup() {


    const form=ref([
      {
        number:1,
        student_count: 6,
        group_count: 21,
        group_name: "دروس اجباری"
      },
      {
        number:2,
        student_count: 9,
        group_count: 25,
        group_name: "دروس تخصصی"
      }
    ])

//     function amount(item){
//       return item.group_count;
//     }
//
//     function sum(prev, next){
//       return prev + next;
//     }
//
//     traveler.map(amount).reduce(sum);
// // => 235;
//
// // or use arrow functions
//     traveler.map(item => item.Amount).reduce((prev, next) => prev + next);

    onMounted(()=>{
      getForm()
    })

    const getForm=()=>{

      const sum=form.value.map(item => item.group_count).reduce((prev, next) => prev + next);
      const student_sum=form.value.map(item => item.student_count).reduce((prev, next) => prev + next);

      form.value.push({
        "student_count": student_sum,
        "group_count": sum,
        "group_name": "كل دروس براي فراغت از تحصيل"
      })

    }
    return {
      columns,
      form,
      getForm
    };
  },
};
</script>

<style scoped></style>
