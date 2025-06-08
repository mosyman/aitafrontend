<template>
  <div id="NewsDetailPage">
    <div class="header">
      <h3 class="title">
        {{ news?.title }}
      </h3>
      <div class="meta-info">
        <span>
          <icon-user />
          <span class="author">{{ news?.author }}</span>
        </span>
        <span v-if="news"
          ><icon-calendar /> {{ formatDate(news.createTime) }}</span
        >
        <span v-if="news"
          ><a-link :href="news.link" icon>{{ news.title }}</a-link></span
        >
      </div>
    </div>
    <div v-if="news">
      <MdViewer :value="news.content || ''" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, withDefaults, defineProps, watchEffect } from "vue";
import { Props } from "@/api/types/base";
import { Message } from "@arco-design/web-vue";
import MdViewer from "@/components/MdViewer.vue";
import { IconCalendar } from "@arco-design/web-vue/es/icon";
import { formatDate } from "@/plugins/utils";
import { NewsItem } from "@/api/types/news";
import { getNewsById } from "@/api/services/news";

const props = withDefaults(defineProps<Props>(), {
  id: () => "",
});

const news = ref<NewsItem>();
const loadData = async () => {
  const res = await getNewsById(Number(props.id));
  if (res.data.code === 200) {
    news.value = res.data.data;
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
</script>

<style scoped>
#NewsDetailPage {
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
