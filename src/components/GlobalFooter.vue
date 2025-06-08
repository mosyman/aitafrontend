<template>
  <div id="GlobalFooter">
    <a-row class="grid" :gutter="24">
      <a-col flex="400px">
        <div class="left">
          <img src="@/assets/logo.png" alt="" class="logo" />
        </div>
      </a-col>
      <a-divider :size="2" direction="vertical" />
      <a-col flex="600px">
        <div class="right">
          <a-descriptions
            :data="data"
            :title="title"
            layout="inline-horizontal"
            size="small"
          />
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const title = ref("庞善臣教授带领的人工智能理论与应用创新研究团队");
const data = [
  {
    label: "版权所有：",
    value: "中国石油大学（华东）",
  },
  {
    label: "办公地址：",
    value: "青岛黄岛区长江西路66号",
  },
  {
    label: "联系电话：",
    value: "0532-86983553",
  },
  {
    label: "邮编：",
    value: "266580",
  },
];
</script>

<style scoped>
#GlobalFooter {
  .left {
    text-align: right;
    .logo {
      height: 62px;
    }
  }
  .right {
    padding: 0 20px;
  }
}
</style>
