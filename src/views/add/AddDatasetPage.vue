<template>
  <div id="addQuestionView">
    <h2 class="header">{{ updatePage ? "修改数据集" : "添加数据集" }}</h2>
    <a-divider />
    <a-form :model="form" :style="{ width: '900px' }" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="abstract" label="摘要">
        <MdEditor :value="form.abstract" :handle-change="onAbstractChange" />
      </a-form-item>
      <a-form-item field="author" label="作者">
        <a-input v-model="form.author" placeholder="请输入作者" />
      </a-form-item>
      <!--    链接-->
      <a-form-item field="link" label="数据集">
        <FileUpload
          :file_path="uploadDatasetPath"
          @update:file-name="afterDatasetUpload"
        />
        <!--        <a-input v-model="form.link" placeholder="请输入链接" />-->
      </a-form-item>
      <!--    图片url-->
      <a-form-item field="image" label="图片">
        <FileUpload
          :file_path="uploadDatasetImgPath"
          @update:file-name="afterDatasetImgUpload"
        />
        <!--        <a-input v-model="form.image" placeholder="请输入图片url" />-->
      </a-form-item>
      <a-form-item field="type" label="数据集类型">
        <a-select v-model="form.type" placeholder="请选择" allow-clear>
          <a-option
            v-for="(item, index) in typeList"
            :key="index"
            :value="item.value"
            :label="item.label"
          />
        </a-select>
      </a-form-item>
      <div style="margin-top: 16px"></div>
      <a-form-item>
        <a-button type="primary" style="min-width: 200px" @click="doSubmit()"
          >提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { AddDatasetParams } from "@/api/types/datasets";
import { typeList } from "@/plugins/constant";
import router from "@/router";
import {
  addDataset,
  getDatasetById,
  updateDataset,
} from "@/api/services/datasets";
import { useRoute } from "vue-router";
import FileUpload from "@/components/FileUpload.vue";
const uploadDatasetPath = ref("dataset");
const afterDatasetUpload = (fileName: string) => {
  form.value.link = fileName;
};
const uploadDatasetImgPath = ref("datasetImg");
const afterDatasetImgUpload = (fileName: string) => {
  form.value.image_url = fileName;
};

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const form = ref<AddDatasetParams>({
  content: "",
  title: "",
  type: "云计算",
});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await getDatasetById(Number(id));
  if (res.data.code === 200) {
    form.value = res.data.data;
  } else {
    Message.error("获取数据集失败");
  }
};
onMounted(() => {
  loadData();
});
/**
 * 提交表单
 */

const doSubmit = async () => {
  // 区分更新还是创建
  if (updatePage) {
    const res = await updateDataset({
      id: Number(route.query.id) ?? 0,
      ...form.value,
    });
    if (res.data.code === 200) {
      Message.success("更新成功");
      router.push("/admin/dataset");
    } else {
      Message.error("更新失败," + res.data.message);
    }
  } else {
    const res = await addDataset(form.value);
    if (res.data.code === 200) {
      Message.success("创建成功");
      router.push("/admin/dataset");
    } else {
      Message.error("创建失败," + res.data.message);
    }
  }
};
const handleSubmit = () => {
  console.log(1);
};
const onContentChange = (value: string) => {
  form.value.content = value;
};
const onAbstractChange = (value: string) => {
  form.value.abstract = value;
};
</script>
<style scoped>
#addQuestionView {
  .header {
    padding: 20px;
  }
}
</style>
