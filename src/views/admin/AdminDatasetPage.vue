<template>
  <div id="manageQuestionView">
    <div class="header">
      <h2>数据集管理</h2>
      <a-button type="primary" @click="doAdd">添加数据集</a-button>
    </div>
    <a-divider />
    <a-table
      :columns="dataset_columns"
      :data="dataList || []"
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        total,
      }"
      :scroll="dataset_scroll"
      @page-change="onPageChange"
    >
      <template #image_url="{ record }">
        <a-image :src="record.image_url" height="100" />
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
import { DatasetItem, GetDatasetsParams } from "@/api/types/datasets";
import { deleteDataset, getDatasets } from "@/api/services/datasets";
import { dataset_columns, dataset_scroll } from "@/plugins/constant";
import router from "@/router";
import { formatTime } from "@/plugins/utils";
const dataList = ref<DatasetItem[]>([]);
const total = ref(0);
const searchParams = ref<GetDatasetsParams>({
  pageSize: 10,
  pageNum: 1,
});
const loadData = async () => {
  const res = await getDatasets(searchParams.value);
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
  router.push("/add/datasets");
};

const doDelete = async (dataset: DatasetItem) => {
  const res = await deleteDataset({
    id: dataset.id,
  });
  if (res.data.code === 200) {
    Message.success("删除成功");
    loadData();
  } else {
    Message.error("操作失败" + res.data.message);
  }
};
const doUpdate = (dataset: DatasetItem) => {
  router.push({
    path: "/update/datasets",
    query: {
      id: dataset.id,
    },
  });
};
</script>
<style scoped>
#manageQuestionView {
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
}
</style>
