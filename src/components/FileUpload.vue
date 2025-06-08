<template>
  <div class="FileUpload">
    <a-upload draggable :custom-request="customRequest" />
  </div>
</template>

<script lang="ts" setup>
import { isCancel } from "axios";
import service from "@/plugins/axios";
import { withDefaults, defineProps, defineEmits } from "vue";
import { RequestOption } from "@arco-design/web-vue";
import { AxiosProgressEvent } from "axios";
interface Props {
  file_path?: string;
}

const props = withDefaults(defineProps<Props>(), {
  file_path: () => "test",
});

const emit = defineEmits<{
  (e: "update:file-name", fileName: string): void;
}>();

// 自定义上传请求
const customRequest = (option: RequestOption) => {
  const { onProgress, onError, onSuccess, fileItem } = option;

  // 使用 AbortController 实现取消上传
  const controller = new AbortController();

  // 构造 formData
  const formData = new FormData();
  formData.append("file", fileItem.file);

  // 添加额外参数：file_path
  formData.append("file_path", props.file_path);

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
    .post("/file/upload", formData, config)
    .then((res) => {
      if (res.data.code === 200) {
        const path = res.data.data.path;
        emit("update:file-name", path);
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
};
</script>

<style>
.FileUpload {
  width: 300px;
}
</style>
