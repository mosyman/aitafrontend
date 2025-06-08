<template>
  <div id="AddNewsPage">
    <h2 class="header">{{ updatePage ? "修改新闻" : "添加新闻" }}</h2>
    <a-divider />
    <a-form :model="form" :style="{ width: '900px' }" @submit="handleSubmit">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-item>
      <a-form-item field="content" label="内容">
        <MdEditor :value="form.content" :handle-change="onContentChange" />
      </a-form-item>
      <a-form-item field="author" label="作者">
        <a-input v-model="form.author" placeholder="请输入作者" />
      </a-form-item>
      <!--    链接-->
      <a-form-item field="link" label="链接">
        <a-input v-model="form.link" placeholder="请输入链接" />
      </a-form-item>
      <!--    图片url-->
      <a-form-item field="image" label="图片">
        <FileUpload :file_path="uploadPath" @update:file-name="afterUpload" />
        <!--        <a-input v-model="form.image_url" placeholder="请输入图片url" />-->
      </a-form-item>
      <!--    发布时间-->
      <a-form-item field="publish_time" label="发布时间">
        <a-date-picker
          v-model="form.publish_time"
          placeholder="请选择发布时间"
        />
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
import { useRoute } from "vue-router";
import router from "@/router";
import { addNews, getNewsById, updateNews } from "@/api/services/news";
import { AddNewsParams } from "@/api/types/news";
import { parseToUTC } from "@/plugins/utils";
import FileUpload from "@/components/FileUpload.vue";

const uploadPath = ref("news");
const afterUpload = (fileName: string) => {
  form.value.image_url = fileName;
};

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const form = ref<AddNewsParams>({});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await getNewsById(Number(id));
  if (res.data.code === 200) {
    form.value = res.data.data;
  } else {
    Message.error("获取新闻失败");
  }
};
onMounted(() => {
  loadData();
});
/**
 * 提交表单
 */

const doSubmit = async () => {
  if (form.value.publish_time) {
    form.value.publish_time = parseToUTC(form.value.publish_time);
  }
  // 区分更新还是创建
  if (updatePage) {
    const res = await updateNews({
      id: Number(route.query.id) ?? 0,
      ...form.value,
    });
    if (res.data.code === 200) {
      Message.success("更新成功");
      router.push("/admin/news");
    } else {
      Message.error("更新失败," + res.data.message);
    }
  } else {
    const res = await addNews(form.value);
    if (res.data.code === 200) {
      Message.success("创建成功");
      router.push("/admin/news");
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
</script>
<style scoped>
#AddNewsPage {
  .header {
    padding: 20px;
  }
}
</style>
