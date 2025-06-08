<template>
  <div class="custom-list">
    <a-list
      :bordered="false"
      :data="dataList"
      :pagination-props="{
        showTotal: true,
        total: total,
        current: searchParams.pageNum,
        pageSize: searchParams.pageSize,
      }"
      @page-change="onPageChange"
    >
      <template #item="{ item }">
        <div class="list-item" @click="doClick(item)">
          <!-- 标题 + 操作标签区域 -->
          <div class="item-header">
            <!-- 标题 -->
            <h3 class="item-title">
              {{ item.title }}
            </h3>
          </div>

          <!-- 描述信息 -->
          <p class="item-desc">
            {{ item.content }}
          </p>

          <!-- 统计信息（作者、时间、下载、浏览等） -->
          <div class="stats">
            <span class="stat-item"> <icon-user /> {{ item.author }} </span>
            <span class="stat-item">
              <icon-calendar /> {{ formatDate(item.publish_time) }}
            </span>
          </div>
        </div>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import { Message } from "@arco-design/web-vue";
import { IconUser, IconCalendar } from "@arco-design/web-vue/es/icon";
import { formatDate } from "@/plugins/utils";
import { GetNewsParams, NewsItem } from "@/api/types/news";
import { getNewsList } from "@/api/services/news";
const router = useRouter();
const dataList = ref<NewsItem[]>([]);
const total = ref(0);
const searchParams = ref<GetNewsParams>({
  pageSize: 10,
  pageNum: 1,
});
const loadData = async () => {
  const res = await getNewsList(searchParams.value);
  if (res.data.code === 200) {
    dataList.value = res.data.data.items;
    total.value = res.data.data.total;
  } else {
    Message.error("加载失败" + res.data.message);
  }
};
/**
 * 监听 searchParams 变量，改变时触发数据的重新加载
 */
watchEffect(() => {
  loadData();
});

/**
 * 当分页变化时，改变搜索条件，触发数据加载
 * @param page
 */
const onPageChange = (page: number) => {
  searchParams.value = {
    ...searchParams.value,
    pageNum: page,
  };
};

const doClick = (item: NewsItem) => {
  router.push(`/news/detail/${item.id}`);
};
</script>

<style scoped>
.custom-list {
  width: 100%;
  max-width: 1100px; /* 可根据需求调整宽度 */
  margin: 20px auto;
}

.list-item {
  border-bottom: 1px solid #ebeef5;
  padding: 16px;
  background-color: #fff;
  transition: background-color 0.2s ease; /* 可选：添加过渡动画 */
}
/* 鼠标悬停时改变背景色 */
.list-item:hover {
  background-color: #fcfcfc;
}

.item-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.item-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0;
}

.item-desc {
  color: #666;
  line-height: 1.6;
  margin: 8px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}

.stats {
  display: flex;
  align-items: center;
  gap: 36px;
  color: #999;
  font-size: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
