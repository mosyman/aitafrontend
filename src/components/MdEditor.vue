<template>
  <div class="md-editor">
    <Editor
      :value="value || ''"
      :plugins="plugins"
      @change="handleChange"
      :mode="mode"
      class="bytemd"
      placeholder="请输入markdown格式"
    />
  </div>
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "highlight.js/styles/vs.css";
import mermaid from "@bytemd/plugin-mermaid";
import mediumZoom from "@bytemd/plugin-medium-zoom";
import math from "@bytemd/plugin-math";
import "katex/dist/katex.css";
import gemoji from "@bytemd/plugin-gemoji";
import breaks from "@bytemd/plugin-breaks";
import frontmatter from "@bytemd/plugin-frontmatter";
import { Editor } from "@bytemd/vue-next";

import { defineProps, ref, withDefaults } from "vue";
const mode = ref("split");

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});
const plugins = [
  gfm(),
  highlight(),
  mermaid(),
  mediumZoom(),
  math(),
  gemoji(),
  breaks(),
  frontmatter(),
];
</script>

<style scoped>
.md-editor {
  .bytemd {
    height: 300px;
  }
  .bytemd-toolbar-icon.bytemd-tippy.bytemd-tippy-right:last-child {
    display: none;
  }
}
</style>
