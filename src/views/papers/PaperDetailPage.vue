<template>
  <div id="PaperDetailPage">
    <div class="header">
      <a-row justify="start">
        <a-col flex="20px" />
        <a-col flex="auto">
          <h3 class="title">
            {{ paper?.title }}
          </h3>
          <div class="meta-info">
            <a-descriptions
              style="margin-top: 20px"
              :data="metaList"
              size="small"
              :column="1"
            />
          </div>
        </a-col>
      </a-row>
    </div>
    <div class="content">
      <!-- 导航标签 -->
      <a-tabs v-model:active-key="activeKey" class="tabs">
        <a-tab-pane key="content" title="内容预览">
          <div v-if="paper">
            <MdViewer :value="paper.content || ''" />
          </div>
        </a-tab-pane>
        <a-tab-pane key="link" title="下载链接">
          <div v-if="paper">
            <a-link :href="paper.pdf_url" icon>{{ paper.title }}</a-link>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import { Props } from "@/api/types/base";
import { Message } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import { PaperItem } from "@/api/types/papers";
import { getPaperById } from "@/api/services/papers";

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const paper = ref<PaperItem>();
const metaList = ref<any[]>([]);
const loadData = async () => {
  const res = await getPaperById(Number(props.id));
  if (res.data.code === 200) {
    paper.value = res.data.data;
    // 构造metaList
    metaList.value = [
      { label: "发布时间", value: paper.value?.publishTime },
      { label: "作者", value: paper.value?.author },
      { label: "摘要", value: paper.value?.abstract },
      { label: "关键词", value: paper.value?.keywords },
      { label: "被引用次数", value: paper.value?.citation_count },
      { label: "来源", value: paper.value?.source },
      { label: "DOI", value: paper.value?.doi },
      // { label: "PDF链接", value: paper.value?.pdf_url },
    ];
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
const activeKey = ref("content");
</script>

<style scoped>
#PaperDetailPage {
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
}
</style>
