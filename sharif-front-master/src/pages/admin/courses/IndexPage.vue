<template>
  <div>
    <div
      style="
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="width: 90%; margin-top: 16px">
        <q-input
          v-model="searchText"
          @update:model-value="onSearch"
          style="width: 100%; position: relative"
          outlined
          :label="getStudentForm.search"
        >
        </q-input>
      </div>
    </div>
  </div>
  <q-infinite-scroll :disable="infScrollDisable" @load="onLoad" :offset="250">
    <course-item
      v-for="(c, i) in courseList"
      :key="c.ID"
      :course="c"
      :index="i"
      :del="true"
      :edit="true"
      @delete="onDelete"
    ></course-item>

    <template v-slot:loading>
      <div class="row justify-center q-my-md">
        <q-spinner-dots color="primary" size="40px" />
      </div>
    </template>
  </q-infinite-scroll>
</template>

<script>
import { onMounted, ref } from "vue";
import { api } from "boot/adminAxios";
import courseItem from "components/admin/courseItem";
import { useQuasar } from "quasar";
import { useLangStore } from "stores/lang";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";

export default {
  name: "IndexPage",
  components: {
    courseItem,
  },

  setup() {
    const courseList = ref([]);
    const $q = useQuasar();
    const langStore = useLangStore();
    const studentStore = useStudentStore();
    const { getStudentForm, lang } = storeToRefs(langStore);
    const formItemObj = ref({});

    const searchText = ref("");
    const infScrollDisable = ref(false);

    onMounted(async () => {
      await getCourseItem(0);
    });

    const getCourseItem = async (index) => {
      const resp = await api.get(`/form-item?offset=${index * 20}&limit=20`);
      if (resp.status === 200) {
        const temp = resp.data.map((item) => {
          return {
            ID: item.ID,
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
        if (temp.length < 20) infScrollDisable.value = true;
        courseList.value.push(...temp);
        console.log(courseList.value);
      }
    };

    const onSearch = async () => {
      if (searchText.value === "") return;
      const resp = await api.post(`/form-item/search`, { s: searchText.value });
      console.log(resp.data);
      courseList.value = resp.data;
    };

    const onDelete = () => {
      courseList.value = [];
      getCourseItem(0);
    };

    const onLoad = (index, done) => {
      getCourseItem(index);
      done();
    };

    return {
      getStudentForm,
      searchText,
      courseList,
      formItemObj,
      lang,
      infScrollDisable,
      onSearch,
      onDelete,
      onLoad,
      // onClickItem,
      // onType,
      // sumNumberOfUnit,
    };
  },
};
</script>

<style scoped></style>
