<template>
  <div id="addQuestionView"><h2>创建数据集</h2></div>
  <a-form :model="form" :style="{ width: '600px' }" @submit="handleSubmit">
    <a-form-item field="title">
      <a-input v-model="form.title" placeholder="请输入标题"></a-input>
    </a-form-item>
    <a-form-item field="content" label="内容">
      <MdEditor
        :value="form.content"
        :handle-change="onContentChange"
      ></MdEditor>
    </a-form-item>
    <a-form-item field="abstract" label="摘要">
      <MdEditor
        :value="form.abstract"
        :handle-change="onAbstractChange"
      ></MdEditor>
    </a-form-item>
    <a-form-item field="author" label="作者">
      <a-input-tag v-model="form.author" placeholder="请输入作者" allow-clear />
    </a-form-item>
    <!--    链接-->
    <a-form-item field="link" label="链接">
      <a-input v-model="form.link" placeholder="请输入链接"></a-input>
    </a-form-item>
    <!--    图片url-->
    <a-form-item field="image" label="图片url">
      <a-input v-model="form.image" placeholder="请输入图片url"></a-input>
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
</template>
<script setup lang="ts">
import { reactive } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { Message } from "@arco-design/web-vue";
import { AddDatasetParams } from "@/api/types/datasets";
import { typeList } from "@/plugins/common";
import { addDataset } from "@/api/services/datasets";

const form = reactive<AddDatasetParams>({
  content: "",
  title: "",
  type: "云计算",
});
const doSubmit = async () => {
  console.log(form);
  const res = await addDataset(form);
  if (res.data.code === 200) {
    Message.success("创建成功");
  } else {
    Message.error("创建失败," + res.data.message);
  }
};
const handleSubmit = () => {
  console.log(1);
};
const onContentChange = (value: string) => {
  form.content = value;
};
const onAbstractChange = (value: string) => {
  form.abstract = value;
};
</script>
<style scoped></style>
