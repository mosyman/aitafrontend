<template>
  <div id="AddUserPage">
    <h2 class="header">{{ updatePage ? "修改用户" : "添加用户" }}</h2>
    <a-divider />
    <a-form :model="form" :style="{ width: '900px' }" @submit="handleSubmit">
      <a-form-item field="account" label="账号">
        <a-input v-model="form.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input-password v-model="form.password" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item field="name" label="用户昵称">
        <a-input v-model="form.name" placeholder="请输入用户昵称" />
      </a-form-item>
      <a-form-item field="avatar" label="用户头像">
        <FileUpload :file_path="uploadPath" @update:file-name="afterUpload" />
        <!--        <a-input v-model="form.avatar" placeholder="请输入用户头像URL" />-->
      </a-form-item>
      <a-form-item field="profile" label="用户简介">
        <MdEditor :value="form.profile" :handle-change="onProfileChange" />
      </a-form-item>
      <a-form-item field="role" label="用户角色">
        <a-select v-model="form.role" placeholder="请选择" allow-clear>
          <a-option
            v-for="(item, index) in roleList"
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
import router from "@/router";
import { useRoute } from "vue-router";
import { AddUserParams } from "@/api/types/user";
import { addUser, getUserById, updateUser } from "@/api/services/user";
import { roleList } from "@/plugins/constant";
import FileUpload from "@/components/FileUpload.vue";

const uploadPath = ref("user");
const afterUpload = (fileName: string) => {
  form.value.avatar = fileName;
};

const route = useRoute();
// 如果页面地址包含 update，视为更新页面
const updatePage = route.path.includes("update");

const form = ref<AddUserParams>({});

/**
 * 根据题目 id 获取老的数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await getUserById(Number(id));
  if (res.data.code === 200) {
    form.value = res.data.data;
  } else {
    Message.error("获取用户失败");
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
    const res = await updateUser({
      id: Number(route.query.id) ?? 0,
      ...form.value,
    });
    if (res.data.code === 200) {
      Message.success("更新成功");
      router.push("/admin/user");
    } else {
      Message.error("更新失败," + res.data.message);
    }
  } else {
    const res = await addUser(form.value);
    if (res.data.code === 200) {
      Message.success("创建成功");
      router.push("/admin/user");
    } else {
      Message.error("创建失败," + res.data.message);
    }
  }
};
const handleSubmit = () => {
  console.log(1);
};
const onProfileChange = (value: string) => {
  form.value.profile = value;
};
</script>
<style scoped>
#AddUserPage {
  .header {
    padding: 20px;
  }
}
</style>
