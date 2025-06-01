<template>
  <div id="UserLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      style="max-width: 480px; margin: 0 auto"
      :model="form"
      @submit="handleSubmit"
      label-align="left"
      auto-label-width
    >
      <a-form-item field="userAccount" tooltip="账号不少于4位" label="账号">
        <a-input v-model="form.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" tooltip="密码不少于6位">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <div
          style="
            display: flex;
            width: 100%;
            align-items: center;
            justify-content: space-between;
          "
        >
          <a-button type="primary" html-type="submit" style="width: 120px">
            登录
          </a-button>
          <a-link href="/user/register">新用户注册</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { Message } from "@arco-design/web-vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { AuthParams } from "@/api/types/user";
import { login } from "@/api/services/user";

const form = reactive<AuthParams>({
  account: "",
  password: "",
});
const router = useRouter();
const store = useStore();
const handleSubmit = async () => {
  const res = await login(form);
  //登录成功，跳转到主页
  if (res.data.code === 200) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    Message.error("登录失败," + res.data.message);
  }
};
</script>
