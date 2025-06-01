<template>
  <div class="home">
    <MdEditor :value="value" :handle-change="onChange"></MdEditor>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
const value = ref("");
const onChange = (v: string) => {
  value.value = v;
};
</script>
