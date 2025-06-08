<template>
  <div id="AdminPapersPage">
    <div class="header">
      <h2>论文管理</h2>
      <a-button type="primary" @click="doAdd">添加论文</a-button>
    </div>
    <a-divider />
    <a-table
      :columns="paper_columns"
      :data="dataList || []"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
      :scroll="paper_scroll"
      @page-change="onPageChange"
    >
      <template #publishTime="{ record }">
        {{ formatTime(record.publishTime) }}
      </template>
      <template #createTime="{ record }">
        {{ formatTime(record.createTime) }}
      </template>
      <template #updateTime="{ record }">
        {{ formatTime(record.updateTime) }}
      </template>
      <template #optional="{ record }">
        <a-space>
          <a-button type="primary" @click="doUpdate(record)">修改</a-button>
          <a-button status="danger" @click="doDelete(record)">删除</a-button>
        </a-space>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";
import { Message } from "@arco-design/web-vue";
import { deletePaper, getPapers } from "@/api/services/papers";
import { GetPapersParams, PaperItem } from "@/api/types/papers";
import { paper_columns, paper_scroll } from "@/plugins/constant";
import { formatTime } from "@/plugins/utils";
import router from "@/router";
const dataList = ref<PaperItem[]>([]);
const total = ref(0);
const searchParams = ref<GetPapersParams>({
  pageSize: 10,
  pageNum: 1,
});
const loadData = async () => {
  const res = await getPapers(searchParams.value);
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

const doAdd = () => {
  router.push("/add/paper");
};

const doDelete = async (paper: PaperItem) => {
  const res = await deletePaper({
    id: paper.id,
  });
  if (res.data.code === 200) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("操作失败" + res.data.message);
  }
};

const doUpdate = (paper: PaperItem) => {
  router.push({
    path: "/update/paper",
    query: {
      id: paper.id,
    },
  });
};
</script>

<style scoped>
#AdminPapersPage {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
