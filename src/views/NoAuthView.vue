<template>
  <div class="permission-container">
    <!-- 顶部图标和标题 -->
    <div class="icon-wrapper">
      <icon-close-circle-fill />
      <h1 class="title">权限不足</h1>
    </div>

    <!-- 提示信息 -->
    <p class="message">你没有权限访问该页面，请联系管理员</p>

    <!-- 返回按钮 -->
    <a-button
      type="primary"
      size="large"
      @click="goBack"
      class="return-btn"
      :icon="ArrowLeft"
    >
      返回上一页
    </a-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.go(-1); // 返回上一页
};
</script>

<style scoped>
.permission-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 40px 20px;
  background-color: #f8f9fa;
}

.icon-wrapper {
  margin-bottom: 30px;
  text-align: center;
}

.icon-wrapper .icon {
  font-size: 80px;
  margin-bottom: 20px;
}

.title {
  font-size: 32px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.message {
  font-size: 18px;
  color: #666;
  margin-bottom: 40px;
  line-height: 1.5;
  text-align: center;
  max-width: 600px;
}

.return-btn {
  margin-top: 30px;
  padding: 12px 32px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.return-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}
</style>
