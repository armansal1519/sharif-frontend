<template>
  <router-view />
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { api } from "boot/axios";
import { useStudentStore } from "stores/student";

export default defineComponent({
  name: "App",
  setup() {},
});
</script>
