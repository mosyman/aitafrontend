<template>
  <div id="UserRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      :model="form"
      :style="{ width: '480px', margin: '0 auto' }"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="account" tooltip="账号不少于4位" label="账号">
        <a-input v-model="form.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" tooltip="密码不小于 6 位" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item
        field="check_password"
        tooltip="确认密码不小于 6 位"
        label="确认密码"
      >
        <a-input-password
          v-model="form.check_password"
          placeholder="请输入确认密码"
        />
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
            注册
          </a-button>
          <a-link href="/user/login">老用户登录</a-link>
        </div>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { register } from "@/api/services/user";
import { AuthParams } from "@/api/types/user";

const router = useRouter();

const form = reactive<AuthParams>({
  account: "",
  password: "",
  check_password: "",
});
/**
 * 提交
 */
const handleSubmit = async () => {
  const res = await register(form);
  if (res.data.code === 200) {
    message.success("注册成功,请通知或等待管理员审核");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败，" + res.data.message);
  }
};
</script>
