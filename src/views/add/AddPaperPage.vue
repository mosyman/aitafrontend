<template>
  <div id="AddPaperPage">
    <h2 class="header">{{ updatePage ? "修改论文" : "添加论文" }}</h2>
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
      <!--    发布时间-->
      <a-form-item field="publishTime" label="发布时间">
        <a-date-picker
          v-model="form.publishTime"
          placeholder="请选择发布时间"
        />
      </a-form-item>
      <a-form-item field="keywords" label="关键词">
        <a-input v-model="form.keywords" placeholder="请输入关键词(逗号分隔)" />
      </a-form-item>
      <a-form-item field="citation_count" label="引用次数">
        <a-input v-model="form.citation_count" placeholder="请输入引用次数" />
      </a-form-item>
      <!--    论文来源-->
      <a-form-item field="source" label="论文来源">
        <a-input v-model="form.source" placeholder="请输入论文来源" />
      </a-form-item>
      <a-form-item field="doi" label="DOI">
        <a-input v-model="form.doi" placeholder="请输入DOI" />
      </a-form-item>
      <a-form-item field="pdf_url" label="PDF文件URL">
        <FileUpload :file_path="uploadPath" @update:file-name="afterUpload" />
        <!--        <a-input v-model="form.pdf_url" placeholder="请输入PDF文件URL" />-->
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
import router from "@/router";
import { useRoute } from "vue-router";
import { AddPaperParams } from "@/api/types/papers";
import { addPaper, getPaperById, updatePaper } from "@/api/services/papers";
import { parseToUTC } from "@/plugins/utils";
import FileUpload from "@/components/FileUpload.vue";

const uploadPath = ref("paper");
const afterUpload = (fileName: string) => {
  form.value.pdf_url = fileName;
};

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const form = ref<AddPaperParams>({});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await getPaperById(Number(id));
  if (res.data.code === 200) {
    form.value = res.data.data;
    console.log("form.value---" + form.value);
  } else {
    Message.error("获取论文失败");
  }
};
onMounted(() => {
  loadData();
});
/**
 * 提交表单
 */

const doSubmit = async () => {
  if (form.value.publishTime) {
    form.value.publishTime = parseToUTC(form.value.publishTime);
  }
  // 区分更新还是创建
  if (updatePage) {
    const res = await updatePaper({
      id: Number(route.query.id) ?? 0,
      ...form.value,
    });
    if (res.data.code === 200) {
      Message.success("更新成功");
      router.push("/admin/paper");
    } else {
      Message.error(res.data.message);
    }
  } else {
    const res = await addPaper(form.value);
    if (res.data.code === 200) {
      Message.success("创建成功");
      router.push("/admin/paper");
    } else {
      Message.error(res.data.message);
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
#AddPaperPage {
  .header {
    padding: 20px;
  }
}
</style>
