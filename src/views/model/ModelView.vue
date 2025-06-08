<template>
  <div id="Model">
    <h3>模型效果演示</h3>
    <a-row class="grid" :gutter="36">
      <a-col :span="12">
        <h3>上传目标文件</h3>
        <a-divider />
        <div class="upload">
          <a-upload
            draggable
            tip="该模型仅支持上传.h5文件"
            :custom-request="customRequest"
          />
        </div>
      </a-col>
      <a-col :span="12">
        <a-space>
          <h3>模型处理结果</h3>
          <div v-if="modelResult?.cosPath">
            <a-link :href="modelResult?.cosPath" icon>结果下载</a-link>
          </div>
        </a-space>
        <a-divider />
        <div class="img">
          <a-spin v-if="loading" tip="模型正在处理，请稍后..." />
          <div v-if="modelResult">
            <a-image
              width="300"
              :src="modelResult.cosPath"
              :show-loader="true"
            />
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script setup lang="ts">
import { isCancel } from "axios";
import service from "@/plugins/axios";
import { RequestOption } from "@arco-design/web-vue";
import { AxiosProgressEvent } from "axios";
import { ModelUploadResult } from "@/api/types/model";
import { ref } from "vue";

const loading = ref(false);
const modelResult = ref<ModelUploadResult>();

// 自定义上传请求
const customRequest = (option: RequestOption) => {
  loading.value = true;
  const { onProgress, onError, onSuccess, fileItem } = option;

  // 使用 AbortController 实现取消上传
  const controller = new AbortController();

  // 构造 formData
  const formData = new FormData();
  formData.append("file", fileItem.file);

  // 添加额外参数：file_path
  formData.append("file_path", "modelResult");

  // 配置 axios 请求
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent: AxiosProgressEvent) => {
      let percent = 0;
      if (progressEvent.total && progressEvent.loaded) {
        percent =
          Math.round((progressEvent.loaded * 100) / progressEvent.total) / 100;
      }
      onProgress(percent, progressEvent);
    },
    signal: controller.signal,
  };

  // 发起 axios 请求
  service
    .post("/model/upload", formData, config)
    .then((res) => {
      if (res.data.code === 200) {
        modelResult.value = res.data.data;
        onSuccess(res.data.message);
      } else {
        onError(res.data.message || "上传失败");
      }
    })
    .catch((err) => {
      if (isCancel(err)) {
        console.log("上传已取消:", err.message);
      } else {
        onError(err.response?.data?.message || err.message || "上传出错");
      }
    });
  loading.value = false;
};
</script>

<style scoped>
#Model {
  padding: 30px;
  .grid {
    margin: 30px;
    .upload {
      width: 400px;
      padding: 20px;
      margin: 0 auto;
    }
    .img {
      padding: 20px;
      margin: 0 auto;
    }
  }
}
</style>
