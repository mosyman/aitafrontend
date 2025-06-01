<template>
  <div id="manageQuestionView">
    <h2>题目管理</h2>
    <a-table
      :columns="dataset_columns"
      :data="dataList"
      :pagination="{
        pageSize: searchParams.pageSize,
        current: searchParams.pageNum,
        showTotal: true,
      }"
    >
      <!--      <template #optional="{ record }">-->
      <!--        <a-space>-->
      <!--          <a-button type="primary" @click="doUpdate(record)">修改</a-button>-->
      <!--          <a-button status="danger" @click="doDelete(record)">删除</a-button>-->
      <!--        </a-space>-->
      <!--      </template>-->
    </a-table>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Message } from "@arco-design/web-vue";
import { DatasetItem, GetDatasetsParams } from "@/api/types/datasets";
import { getDatasets } from "@/api/services/datasets";
import { dataset_columns } from "@/plugins/common";
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
const show = ref(true);
onMounted(() => {
  loadData();
});

// const doDelete = async (question: Question) => {
//   const res = await QuestionControllerService.deleteQuestionUsingPost({
//     id: question.id,
//   });
//   if (res.code === 0) {
//     Message.success("删除成功");
//   } else {
//     Message.error("操作失败" + res.message);
//   }
// };
// const doUpdate = (question: Question) => {
//   console.log(question);
// };
</script>
<style scoped>
#manageQuestionView {
}
</style>
