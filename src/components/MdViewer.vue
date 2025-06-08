<template>
  <div class="md-viewer">
    <Viewer :value="value || ''" :plugins="plugins" />
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
import { Viewer } from "@bytemd/vue-next";
import { withDefaults, defineProps } from "vue";

/**
 * 定义组件属性类型
 */
interface Props {
  value: string;
}

const plugins = [
  gfm(),
  highlight(),
  mermaid(),
  mediumZoom(),
  math(),
  gemoji(),
  breaks(),
  frontmatter(),
  // Add more plugins here
];

/**
 * 给组件指定初始值
 */
const props = withDefaults(defineProps<Props>(), {
  value: () => "",
});
</script>

<style scoped>
.md-editor {
}
</style>
