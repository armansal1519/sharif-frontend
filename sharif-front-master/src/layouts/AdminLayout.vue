<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn
          dense
          flat
          round
          icon="menu"
          :disable="!getIsAuth"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>

        </q-toolbar-title>

        <q-btn flat round dense :label="lang" @click="changeLange(lang)" />
      </q-toolbar>
    </q-header>

    <q-drawer v-if="getIsAuth" v-model="leftDrawerOpen" side="left" bordered>
      <div
        v-if="student"
        style="
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 64px;
        "
      >
        <div style="font-size: 24px">
          {{ student.first_name + " " + student.last_name }}
        </div>
        <div style="font-size: 20px">{{ student.student_code }}</div>
      </div>
      <div v-if="getAdminMenu">
        <q-expansion-item
          style="width: 100%; margin: 10px 5px"
          v-for="(m, i) in getAdminMenu"
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
import { api } from "boot/adminAxios";
import {useFieldStore} from "stores/field";

export default {
  name: "AdminLayout",
  setup() {
    const store = useAdminStore();
    const langStore = useLangStore();
    const fieldStore=useFieldStore()

    const { getIsAuth, student } = storeToRefs(store);
    const { lang, getAdminMenu } = storeToRefs(langStore);
    const leftDrawerOpen = ref(true);

    const changeLange = (l) => {
      if (l === "fa") langStore.lang = "en";
      if (l === "en") langStore.lang = "fa";
    };

    onMounted(async () => {
      if (
        localStorage.getItem("a-access") !== null &&
        localStorage.getItem("a-access") !== ""
      ) {
        const resp = await api.get("/admin/by-token");
        if (resp.status === 200) {
          store.student = resp.data;
          store.isAuth = true;
        }
      }

      const fieldResp=await api.get("field")
      fieldStore.fields=fieldResp.data
    });

    return {
      lang,
      changeLange,
      getAdminMenu,
      getIsAuth,
      student,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>

<style scoped></style>
