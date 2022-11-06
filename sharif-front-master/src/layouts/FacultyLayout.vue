<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>

        </q-toolbar-title>

        <q-btn flat round dense :label="lang" @click="changeLange(lang)" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="getIsAuth" v-model="leftDrawerOpen" side="left" bordered>
      <div
        v-if="faculty"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 64px;
        "
      >
        <div style="font-size: 24px">
          {{ faculty.full_name }}
        </div>
        <!--        <div style="font-size: 20px">{{ student.student_code }}</div>-->
      </div>
      <div v-if="getFacultyMenu">
        <q-expansion-item
          style="width: 100%; margin: 10px 5px"
          v-for="(m, i) in getFacultyMenu"
          :key="i"
          :label="m.title"
        >
          <q-list v-for="(sm, index) in m.subMenu" :key="index">
            <q-item clickable v-close-popup :to="sm.link">
              <q-item-section>
                <q-item-label>{{ sm.title }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-expansion-item>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { onMounted, ref } from "vue";
import { useStudentStore } from "stores/student";
import { storeToRefs } from "pinia/dist/pinia";
import { useLangStore } from "stores/lang";
import { useAdminStore } from "stores/admin";
import { api } from "boot/facultyAxios";
import { useFacultyStore } from "stores/faculty";

export default {
  name: "FacultyLayout",
  setup() {
    const store = useFacultyStore();
    const langStore = useLangStore();

    const { getIsAuth, faculty } = storeToRefs(store);
    const { lang, getFacultyMenu } = storeToRefs(langStore);
    const leftDrawerOpen = ref(true);

    const changeLange = (l) => {
      if (l === "fa") langStore.lang = "en";
      if (l === "en") langStore.lang = "fa";
    };

    onMounted(async () => {
      if (
        localStorage.getItem("f-access") !== null &&
        localStorage.getItem("f-access") !== ""
      ) {
        const resp = await api.get("/faculty/by-token");
        if (resp.status === 200) {
          store.faculty = resp.data.faculty;
          store.aoa = resp.data.aoa;
          store.isAuth = true;
        }
      }
    });

    return {
      lang,
      changeLange,
      getFacultyMenu,
      getIsAuth,
      faculty,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped></style>
