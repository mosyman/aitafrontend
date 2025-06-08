<template>
  <div id="DatasetDetailView">
    <div class="header">
      <h3 class="title">
        {{ dataset?.title }}
      </h3>
      <div class="meta-info">
        <span>
          <icon-user />
          <span class="author">{{ dataset?.author }}</span>
        </span>
        <span v-if="dataset"
          ><icon-calendar /> {{ formatDate(dataset.createTime) }}</span
        >
        <span><icon-message /> {{ dataset?.type }}</span>
      </div>
    </div>

    <!-- 导航标签 -->
    <a-tabs v-model:active-key="activeKey" class="tabs">
      <a-tab-pane key="abstract" title="摘要">
        <div v-if="dataset">
          <MdViewer :value="dataset.abstract || ''" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="content" title="内容">
        <div v-if="dataset">
          <MdViewer :value="dataset.content || ''" />
        </div>
      </a-tab-pane>
      <a-tab-pane key="link" title="链接">
        <div v-if="dataset">
          <a-link :href="dataset.link" icon>{{ dataset.title }}</a-link>
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import { Props } from "@/api/types/base";
import { getDatasetById } from "@/api/services/datasets";
import { DatasetItem } from "@/api/types/datasets";
import { Message } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import { IconCalendar, IconMessage } from "@arco-design/web-vue/es/icon";
import { formatDate } from "@/plugins/utils";

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const dataset = ref<DatasetItem>();
const loadData = async () => {
  const res = await getDatasetById(Number(props.id));
  if (res.data.code === 200) {
    dataset.value = res.data.data;
  } else {
    Message.error("获取数据集失败, " + res.data.message);
  }
};

/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});

// 激活的标签
const activeKey = ref("abstract");
</script>

<style scoped>
#DatasetDetailView {
  margin: 20px;
  /* 页面头部样式 */
  .header {
    .title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    /* 元信息（作者、时间等）布局 */
    .meta-info {
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 16px;
      color: var(--color-text-2);
      .author {
        margin-left: 4px;
      }
    }
  }

  /* 标签栏样式 */
  .tabs {
    margin-bottom: 20px;
  }
}
</style>
