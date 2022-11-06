<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title>

        </q-toolbar-title>
        <q-btn flat round dense :label="lang" @click="changeLange(lang)" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useLangStore } from "stores/lang";
import { storeToRefs } from "pinia/dist/pinia";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    const langStore = useLangStore();

    const { lang } = storeToRefs(langStore);

    const changeLange = (l) => {
      if (l === "fa") langStore.lang = "en";
      if (l === "en") langStore.lang = "fa";
    };

    return {
      lang,
      changeLange,
    };
  },
});
</script>
